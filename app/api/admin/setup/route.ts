import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { normaliseEmail, validPassword } from "@/lib/auth/validation";

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ message: "Database is not configured. Add DATABASE_URL to .env, restart the development server, then run npm run db:init." }, { status: 503 });
  const body = await request.json().catch(() => null) as { email?: unknown; password?: unknown; setupToken?: unknown; displayName?: unknown } | null;
  const email = normaliseEmail(body?.email);
  const password = body?.password;
  const allowed = [
    normaliseEmail(process.env.INITIAL_SUPER_ADMIN_EMAIL ?? "shubham.arc11@gmail.com"),
    ...(process.env.ADDITIONAL_SUPER_ADMINS ?? "pawan@scsi.in|PAWAN")
      .split(",")
      .map((entry) => normaliseEmail(entry.split("|")[0])),
  ];
  if (body?.setupToken !== process.env.ADMIN_SETUP_TOKEN || !email || !allowed.includes(email)) return NextResponse.json({ message: "Setup is not authorised." }, { status: 403 });
  if (!validPassword(password)) return NextResponse.json({ message: "Use a password with at least 12 characters." }, { status: 400 });
  const displayName = typeof body?.displayName === "string" ? body.displayName.trim().slice(0, 100) : null;
  const passwordHash = await hashPassword(password);
  const result = await db.query("UPDATE users SET password_hash = $1, display_name = $2, updated_at = now() WHERE email = $3 AND password_hash IS NULL RETURNING id", [passwordHash, displayName || null, email]);
  if (!result.rowCount) return NextResponse.json({ message: "This account has already been set up or has not been seeded." }, { status: 409 });
  return NextResponse.json({ ok: true });
}

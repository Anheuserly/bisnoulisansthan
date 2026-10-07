import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sessionCookie, sessionToken } from "@/lib/auth/session";
import { normaliseEmail, validPassword } from "@/lib/auth/validation";
import { verifyPassword } from "@/lib/auth/password";

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL || !process.env.SESSION_SECRET) return NextResponse.json({ message: "Admin portal configuration is incomplete. Add DATABASE_URL and SESSION_SECRET to .env, then restart the server." }, { status: 503 });
  const body = await request.json().catch(() => null) as { email?: unknown; password?: unknown } | null;
  const email = normaliseEmail(body?.email);
  if (!email || !validPassword(body?.password)) return NextResponse.json({ message: "Enter a valid email and password." }, { status: 400 });
  const { rows } = await db.query<{ id: string; password_hash: string | null }>("SELECT id, password_hash FROM users WHERE email = $1 AND is_active = true", [email]);
  const admin = rows[0];
  if (!admin?.password_hash || !(await verifyPassword(body!.password as string, admin.password_hash))) return NextResponse.json({ message: "Email or password is incorrect." }, { status: 401 });
  await db.query("UPDATE users SET last_login_at = now(), updated_at = now() WHERE id = $1", [admin.id]);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookie(sessionToken(admin.id)));
  return response;
}

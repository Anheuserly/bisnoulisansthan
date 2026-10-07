import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { normaliseEmail, validPassword, validRole } from "@/lib/auth/validation";

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL || !process.env.SESSION_SECRET) return NextResponse.json({ message: "Admin portal configuration is incomplete." }, { status: 503 });
  const actor = await getCurrentAdmin();
  if (!actor || actor.role !== "super_admin") return NextResponse.json({ message: "Only a super admin can add users." }, { status: 403 });
  const body = await request.json().catch(() => null) as { email?: unknown; password?: unknown; displayName?: unknown; role?: unknown } | null;
  const email = normaliseEmail(body?.email);
  if (!email || !validPassword(body?.password) || !validRole(body?.role)) return NextResponse.json({ message: "Provide a valid email, role and temporary password of at least 12 characters." }, { status: 400 });
  const displayName = typeof body?.displayName === "string" ? body.displayName.trim().slice(0, 100) : null;
  try {
    await db.query("INSERT INTO users (email, display_name, password_hash, role) VALUES ($1, $2, $3, $4)", [email, displayName || null, await hashPassword(body.password as string), body.role]);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if ((error as { code?: string }).code === "23505") return NextResponse.json({ message: "A user with this email already exists." }, { status: 409 });
    throw error;
  }
}

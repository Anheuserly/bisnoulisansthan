import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { validPassword } from "@/lib/auth/validation";

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL || !process.env.SESSION_SECRET) {
    return NextResponse.json({ message: "Admin portal configuration is incomplete." }, { status: 503 });
  }

  const actor = await getCurrentAdmin();
  if (!actor) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    currentPassword?: unknown;
    newPassword?: unknown;
  } | null;

  const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : "";
  const newPassword = body?.newPassword;

  if (!currentPassword) {
    return NextResponse.json({ message: "Current password is required." }, { status: 400 });
  }

  if (!validPassword(newPassword)) {
    return NextResponse.json({ message: "New password must be at least 12 characters long." }, { status: 400 });
  }

  if (currentPassword === newPassword) {
    return NextResponse.json({ message: "New password must be different from your current password." }, { status: 400 });
  }

  const { rows } = await db.query<{ password_hash: string | null }>(
    "SELECT password_hash FROM users WHERE id = $1 AND is_active = true",
    [actor.id]
  );

  const user = rows[0];
  if (!user?.password_hash) {
    return NextResponse.json({ message: "Account has no password set. Please use initial setup." }, { status: 400 });
  }

  const isCurrentValid = await verifyPassword(currentPassword, user.password_hash);
  if (!isCurrentValid) {
    return NextResponse.json({ message: "Current password is incorrect." }, { status: 403 });
  }

  const newHash = await hashPassword(newPassword);
  await db.query("UPDATE users SET password_hash = $1, updated_at = now() WHERE id = $2", [newHash, actor.id]);

  return NextResponse.json({ ok: true, message: "Your password has been changed successfully." });
}

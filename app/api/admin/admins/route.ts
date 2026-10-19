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
    await db.query(
      "INSERT INTO users (email, display_name, password_hash, role) VALUES ($1, $2, $3, $4)",
      [email, displayName || null, await hashPassword(body?.password as string), body?.role]
    );
    return NextResponse.json({ ok: true, message: "User added successfully." }, { status: 201 });
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      return NextResponse.json({ message: "A user with this email already exists." }, { status: 409 });
    }
    throw error;
  }
}

export async function PATCH(request: Request) {
  if (!process.env.DATABASE_URL || !process.env.SESSION_SECRET) {
    return NextResponse.json({ message: "Admin portal configuration is incomplete." }, { status: 503 });
  }
  const actor = await getCurrentAdmin();
  if (!actor || actor.role !== "super_admin") {
    return NextResponse.json({ message: "Only a super admin can modify user roles or permissions." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as {
    userId?: string;
    role?: string;
    isActive?: boolean;
    displayName?: string;
  } | null;

  if (!body?.userId || typeof body.userId !== "string") {
    return NextResponse.json({ message: "User ID is required." }, { status: 400 });
  }

  // Prevent super_admin from demoting themselves to prevent lock-out
  if (body.userId === actor.id && body.role && body.role !== "super_admin") {
    return NextResponse.json({ message: "You cannot demote your own super administrator account." }, { status: 400 });
  }

  try {
    const updates: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (body.role && ["super_admin", "admin", "editor"].includes(body.role)) {
      updates.push(`role = $${idx++}`);
      values.push(body.role);
    }

    if (body.isActive !== undefined) {
      // Prevent disabling own account
      if (body.userId === actor.id && body.isActive === false) {
        return NextResponse.json({ message: "You cannot deactivate your own account." }, { status: 400 });
      }
      updates.push(`is_active = $${idx++}`);
      values.push(Boolean(body.isActive));
    }

    if (typeof body.displayName === "string") {
      updates.push(`display_name = $${idx++}`);
      values.push(body.displayName.trim().slice(0, 100));
    }

    if (updates.length === 0) {
      return NextResponse.json({ message: "No valid fields to update." }, { status: 400 });
    }

    values.push(body.userId);
    const query = `UPDATE users SET ${updates.join(", ")}, updated_at = now() WHERE id = $${idx} RETURNING id, email, display_name AS "displayName", role, is_active AS "isActive"`;
    const { rows } = await db.query(query, values);

    if (rows.length === 0) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, user: rows[0], message: "User updated successfully." });
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json({ message: "Database error while updating user." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!process.env.DATABASE_URL || !process.env.SESSION_SECRET) {
    return NextResponse.json({ message: "Admin portal configuration is incomplete." }, { status: 503 });
  }
  const actor = await getCurrentAdmin();
  if (!actor || actor.role !== "super_admin") {
    return NextResponse.json({ message: "Only a super admin can delete users." }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ message: "User ID is required." }, { status: 400 });
  }

  // Prevent deleting oneself
  if (userId === actor.id) {
    return NextResponse.json({ message: "You cannot delete your own account." }, { status: 400 });
  }

  try {
    const { rowCount } = await db.query("DELETE FROM users WHERE id = $1", [userId]);
    if (!rowCount || rowCount === 0) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, message: "User removed successfully." });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json({ message: "Database error while deleting user." }, { status: 500 });
  }
}

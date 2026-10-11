import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { db } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = (await request.json().catch(() => null)) as {
      status?: string;
      notes?: string;
    } | null;

    const allowed = ["new", "in_review", "accepted", "contacted", "archived"];
    if (!body?.status || !allowed.includes(body.status)) {
      return NextResponse.json({ message: "Invalid status value." }, { status: 400 });
    }

    const { rowCount } = await db.query(
      `UPDATE join_applications
       SET status = $1,
           notes = COALESCE($2, notes),
           updated_at = now()
       WHERE id = $3`,
      [body.status, body.notes ?? null, id]
    );

    if (!rowCount) {
      return NextResponse.json({ message: "Application not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, status: body.status });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unauthorized or server error";
    return NextResponse.json({ message: errorMsg }, { status: 401 });
  }
}

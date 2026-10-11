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
    const body = (await request.json().catch(() => null)) as { status?: string } | null;

    const allowed = ["new", "in_progress", "closed", "spam"];
    if (!body?.status || !allowed.includes(body.status)) {
      return NextResponse.json({ message: "Invalid status value." }, { status: 400 });
    }

    const { rowCount } = await db.query(
      "UPDATE contact_inquiries SET status = $1, updated_at = now() WHERE id = $2",
      [body.status, id]
    );

    if (!rowCount) {
      return NextResponse.json({ message: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, status: body.status });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unauthorized or server error";
    return NextResponse.json({ message: errorMsg }, { status: 401 });
  }
}

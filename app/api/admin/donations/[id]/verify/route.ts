import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.DATABASE_URL || !process.env.SESSION_SECRET) {
    return NextResponse.json({ message: "Admin portal configuration is incomplete." }, { status: 503 });
  }

  const actor = await getCurrentAdmin();
  if (!actor || !["admin", "super_admin"].includes(actor.role)) {
    return NextResponse.json({ message: "Administrator approval is required." }, { status: 403 });
  }

  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ message: "Invalid donation request." }, { status: 400 });
  }

  const client = await db.connect();
  try {
    await client.query("BEGIN");

    // Ensure audit table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        actor_id UUID,
        action TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id UUID,
        metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    const { rows } = await client.query<{ id: string; certificateNumber: string }>(
      `UPDATE donation_requests
       SET
         status = 'certificate_issued',
         certificate_number = COALESCE(
           certificate_number,
           'BSGSS-' || to_char(now(), 'YYYY') || '-' || upper(substr(replace(id::text, '-', ''), 1, 8))
         ),
         certificate_issued_at = COALESCE(certificate_issued_at, now()),
         verified_at = now(),
         verified_by = $2
       WHERE id::text = $1 AND status <> 'certificate_issued'
       RETURNING id, certificate_number AS "certificateNumber"`,
      [id, actor.id]
    );

    if (!rows[0]) {
      await client.query("ROLLBACK");
      return NextResponse.json({ message: "This request was already issued or could not be found." }, { status: 404 });
    }

    try {
      await client.query(
        `INSERT INTO admin_audit_logs (actor_id, action, entity_type, entity_id, metadata)
         VALUES ($1, 'issue_donation_certificate', 'donation_request', $2, jsonb_build_object('certificate_number', $3::text))`,
        [actor.id, id, rows[0].certificateNumber]
      );
    } catch (auditErr) {
      console.warn("Audit log insertion non-fatal warning:", auditErr);
    }

    await client.query("COMMIT");
    return NextResponse.json({
      ok: true,
      certificateNumber: rows[0].certificateNumber,
      certificateUrl: `/support/certificate/${id}`,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Donation certificate issue failed", error);
    return NextResponse.json({ message: "The certificate could not be issued." }, { status: 500 });
  } finally {
    client.release();
  }
}

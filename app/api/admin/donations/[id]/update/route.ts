import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!process.env.DATABASE_URL || !process.env.SESSION_SECRET) {
    return NextResponse.json(
      { message: "Admin portal configuration is incomplete." },
      { status: 503 }
    );
  }

  const actor = await getCurrentAdmin();
  if (!actor || !["admin", "super_admin"].includes(actor.role)) {
    return NextResponse.json(
      { message: "Administrator approval is required." },
      { status: 403 }
    );
  }

  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json(
      { message: "Invalid donation request ID." },
      { status: 400 }
    );
  }

  const body = (await request.json().catch(() => null)) as {
    certificateNumber?: string;
    donorName?: string;
    donorEmail?: string;
    donorPhone?: string;
    donorAddress?: string;
    amount?: number | string;
    currency?: string;
    status?: string;
    paymentReference?: string;
    notes?: string;
  } | null;

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { message: "Invalid payload provided." },
      { status: 400 }
    );
  }

  const client = await db.connect();
  try {
    await client.query("BEGIN");

    // Fetch existing donation
    const { rows: existingRows } = await client.query(
      `SELECT * FROM donation_requests WHERE id::text = $1 LIMIT 1`,
      [id]
    );

    if (!existingRows[0]) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { message: "Donation record not found." },
        { status: 404 }
      );
    }

    const current = existingRows[0];

    const certificateNumber =
      body.certificateNumber !== undefined
        ? String(body.certificateNumber).trim() || null
        : current.certificate_number;

    const donorName =
      body.donorName !== undefined
        ? String(body.donorName).trim()
        : current.donor_name;

    const donorEmail =
      body.donorEmail !== undefined
        ? String(body.donorEmail).trim()
        : current.donor_email;

    const donorPhone =
      body.donorPhone !== undefined
        ? String(body.donorPhone).trim() || null
        : current.donor_phone;

    const donorAddress =
      body.donorAddress !== undefined
        ? String(body.donorAddress).trim() || null
        : current.donor_address;

    const amount =
      body.amount !== undefined && !isNaN(Number(body.amount))
        ? Number(body.amount)
        : current.amount;

    const currency =
      body.currency !== undefined
        ? String(body.currency).trim().slice(0, 3).toUpperCase()
        : current.currency;

    const status =
      body.status !== undefined
        ? String(body.status).trim()
        : current.status;

    const paymentReference =
      body.paymentReference !== undefined
        ? String(body.paymentReference).trim()
        : current.payment_reference;

    const notes =
      body.notes !== undefined
        ? String(body.notes).trim() || null
        : current.notes;

    const certificateIssuedAt =
      status === "certificate_issued" && !current.certificate_issued_at
        ? new Date().toISOString()
        : current.certificate_issued_at;

    const { rows: updatedRows } = await client.query(
      `UPDATE donation_requests
       SET
         certificate_number = $1,
         donor_name = $2,
         donor_email = $3,
         donor_phone = $4,
         donor_address = $5,
         amount = $6,
         currency = $7,
         status = $8,
         payment_reference = $9,
         notes = $10,
         certificate_issued_at = $11,
         updated_at = now()
       WHERE id::text = $12
       RETURNING
         id,
         donor_name AS "donorName",
         donor_email AS "donorEmail",
         donor_phone AS "donorPhone",
         amount::text,
         currency,
         payment_method AS "paymentMethod",
         payment_reference AS "paymentReference",
         payment_date::text AS "paymentDate",
         status,
         certificate_number AS "certificateNumber",
         certificate_issued_at::text AS "issuedAt",
         created_at::text AS "createdAt"`,
      [
        certificateNumber,
        donorName,
        donorEmail,
        donorPhone,
        donorAddress,
        amount,
        currency,
        status,
        paymentReference,
        notes,
        certificateIssuedAt,
        id,
      ]
    );

    // Write audit log
    try {
      await client.query(
        `INSERT INTO admin_audit_logs (actor_id, action, entity_type, entity_id, metadata)
         VALUES ($1, 'update_donation_certificate', 'donation_request', $2, jsonb_build_object(
           'certificate_number', $3::text,
           'donor_name', $4::text,
           'amount', $5::text
         ))`,
        [actor.id, id, certificateNumber, donorName, String(amount)]
      );
    } catch (auditErr) {
      console.warn("Audit log non-fatal error:", auditErr);
    }

    await client.query("COMMIT");

    try {
      revalidatePath(`/support/certificate/${id}`);
      if (certificateNumber) {
        revalidatePath(`/support/certificate/${certificateNumber}`);
      }
      revalidatePath("/admin/donations");
    } catch (revalErr) {
      console.warn("Revalidation non-fatal error:", revalErr);
    }

    return NextResponse.json({
      ok: true,
      message: "Certificate and donation details successfully updated.",
      donation: updatedRows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Failed to update donation certificate:", error);
    return NextResponse.json(
      { message: "Could not update donation details." },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

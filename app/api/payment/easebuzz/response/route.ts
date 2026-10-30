import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getEasebuzzSettings, verifyEasebuzzResponseHash } from "@/lib/payment/easebuzz";
import { sendDonationCertificateEmail, sendAdminDonationAlert } from "@/lib/mail/mailer";

async function handleEasebuzzResponse(
  params: Record<string, string | undefined>,
  baseUrl: string
): Promise<Response> {
  const status = (params.status || "").toLowerCase();
  const txnid = params.txnid || "";
  const easepayid = params.easepayid || txnid;
  const donationId = params.udf2 || params.donationId;
  const isSimulated = params.simulated === "true";

  const settings = await getEasebuzzSettings();

  // If not simulated, verify the SHA512 reverse hash
  if (!isSimulated && params.hash) {
    const isValid = verifyEasebuzzResponseHash(params, settings.salt, settings.merchantKey);
    if (!isValid) {
      console.error("Easebuzz payment response hash mismatch!", params);
      return NextResponse.redirect(`${baseUrl}/support?status=failed&reason=security_hash_mismatch`);
    }
  }

  if (process.env.DATABASE_URL) {
    try {
      // Find the donation request
      const { rows } = await db.query<{
        id: string;
        donor_name: string;
        donor_email: string;
        donor_phone: string | null;
        amount: string;
        donor_pan: string | null;
        donor_gst: string | null;
        certificate_number: string | null;
      }>(
        `SELECT id, donor_name, donor_email, donor_phone, amount::text, donor_pan, donor_gst, certificate_number
         FROM donation_requests
         WHERE id::text = $1 OR payment_reference = $2
         LIMIT 1`,
        [donationId || "", txnid]
      );

      const donation = rows[0];

      if (donation) {
        if (status === "success") {
          // Generate certificate number if missing
          let certNumber = donation.certificate_number;
          if (!certNumber) {
            const countRes = await db.query<{ count: string }>(
              "SELECT count(*) FROM donation_requests WHERE certificate_number IS NOT NULL"
            );
            const nextIndex = (Number(countRes.rows[0]?.count) || 0) + 1;
            certNumber = `BSGSS-2026-${nextIndex}`;
          }

          await db.query(
            `UPDATE donation_requests
             SET status = 'certificate_issued',
                 payment_reference = $1,
                 certificate_number = $2,
                 certificate_issued_at = COALESCE(certificate_issued_at, now()),
                 updated_at = now()
             WHERE id = $3`,
            [easepayid, certNumber, donation.id]
          );

          const certUrl = `${baseUrl}/support/certificate/${donation.id}`;

          // Automatically send official 80G Certificate email to donor
          sendDonationCertificateEmail({
            donorEmail: donation.donor_email,
            donorName: donation.donor_name,
            amount: donation.amount,
            certificateNumber: certNumber,
            certificateUrl: certUrl,
            donorPan: donation.donor_pan,
            donorGst: donation.donor_gst,
            paymentReference: easepayid,
          }).catch((err) => console.error("Auto certificate mail error:", err));

          // Automatically send admin notification to admin@bsgssindia.org
          sendAdminDonationAlert({
            donorName: donation.donor_name,
            donorEmail: donation.donor_email,
            donorPhone: donation.donor_phone || undefined,
            amount: donation.amount,
            paymentMethod: "gateway (easebuzz)",
            paymentReference: easepayid,
            donorPan: donation.donor_pan,
            certificateNumber: certNumber,
          }).catch((err) => console.error("Auto admin donation alert error:", err));

          return NextResponse.redirect(`${baseUrl}/support/certificate/${donation.id}?payment=success`);
        } else {
          await db.query(
            `UPDATE donation_requests
             SET status = 'rejected',
                 updated_at = now()
             WHERE id = $1`,
            [donation.id]
          );
        }
      }
    } catch (err) {
      console.error("Failed to update donation after Easebuzz response:", err);
    }
  }

  if (status === "success") {
    if (donationId) {
      return NextResponse.redirect(`${baseUrl}/support/certificate/${donationId}?payment=success`);
    }
    return NextResponse.redirect(`${baseUrl}/support?status=success&txnid=${encodeURIComponent(txnid)}`);
  }

  return NextResponse.redirect(`${baseUrl}/support?status=failed&txnid=${encodeURIComponent(txnid)}`);
}

export async function POST(request: Request) {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3000";
  const proto = request.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${proto}://${host}`;

  let params: Record<string, string | undefined> = {};
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const formData = await request.formData().catch(() => null);
    if (formData) {
      formData.forEach((value, key) => {
        params[key] = String(value);
      });
    }
  } else if (contentType.includes("application/json")) {
    const json = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (json) {
      for (const [key, value] of Object.entries(json)) {
        params[key] = String(value);
      }
    }
  }

  return handleEasebuzzResponse(params, baseUrl);
}

export async function GET(request: Request) {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3000";
  const proto = request.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${proto}://${host}`;

  const { searchParams } = new URL(request.url);
  const params: Record<string, string | undefined> = {};
  searchParams.forEach((val, key) => {
    params[key] = val;
  });

  return handleEasebuzzResponse(params, baseUrl);
}

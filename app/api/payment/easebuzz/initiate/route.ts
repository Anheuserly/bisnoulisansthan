import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getEasebuzzSettings, generateEasebuzzInitiateHash } from "@/lib/payment/easebuzz";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
  }

  const donorName = text(body.donorName, 160);
  const donorEmail = text(body.donorEmail, 254).toLowerCase();
  const donorPhone = text(body.donorPhone, 32) || "9999999999";
  const donorPan = text(body.donorPan, 10).toUpperCase();
  const donorGst = text(body.donorGst, 15).toUpperCase();
  const amountNum = Number(body.amount);

  if (!donorName || !emailPattern.test(donorEmail) || !Number.isFinite(amountNum) || amountNum <= 0) {
    return NextResponse.json(
      { message: "Please provide your full name, valid email, and contribution amount." },
      { status: 400 }
    );
  }

  if (!donorPan && !donorGst) {
    return NextResponse.json(
      { message: "Under Section 80G tax rules, please provide your PAN Number or GSTIN before proceeding to payment." },
      { status: 400 }
    );
  }

  const settings = await getEasebuzzSettings();
  if (!settings.isEnabled) {
    return NextResponse.json(
      { message: "Online payment gateway is temporarily disabled. Please donate via direct UPI or bank transfer." },
      { status: 503 }
    );
  }

  const formattedAmount = amountNum.toFixed(2);
  const txnid = `BSGSS_${Date.now().toString(36).toUpperCase()}_${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  // Pre-insert donation record into database
  let donationId: string | null = null;
  if (process.env.DATABASE_URL) {
    try {
      const { rows } = await db.query<{ id: string }>(
        `INSERT INTO donation_requests (
          donor_name, donor_email, donor_phone, donor_pan, donor_gst,
          amount, payment_method, payment_reference, status
        ) VALUES ($1, $2, $3, $4, $5, $6, 'gateway', $7, 'submitted')
        RETURNING id`,
        [donorName, donorEmail, donorPhone, donorPan || null, donorGst || null, amountNum, txnid]
      );
      donationId = rows[0]?.id || null;
    } catch (e) {
      console.error("Failed to insert pre-payment donation record:", e);
    }
  }

  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3000";
  const proto = request.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${proto}://${host}`;

  const surl = `${baseUrl}/api/payment/easebuzz/response`;
  const furl = `${baseUrl}/api/payment/easebuzz/response`;
  const productinfo = "Voluntary Contribution to BSGSS";
  const firstname = donorName.split(" ")[0] || donorName;

  const hash = generateEasebuzzInitiateHash({
    key: settings.merchantKey,
    txnid,
    amount: formattedAmount,
    productinfo,
    firstname,
    email: donorEmail,
    salt: settings.salt,
    udf1: donorPan || donorGst || "",
    udf2: donationId || "",
  });

  const endpoint =
    settings.environment === "production"
      ? "https://pay.easebuzz.in/payment/initiateLink"
      : "https://testpay.easebuzz.in/payment/initiateLink";

  const payHost =
    settings.environment === "production"
      ? "https://pay.easebuzz.in/pay"
      : "https://testpay.easebuzz.in/pay";

  try {
    const formParams = new URLSearchParams({
      key: settings.merchantKey,
      txnid,
      amount: formattedAmount,
      productinfo,
      firstname,
      email: donorEmail,
      phone: donorPhone,
      surl,
      furl,
      hash,
      udf1: donorPan || donorGst || "",
      udf2: donationId || "",
    });

    if (settings.subMerchantId) {
      formParams.append("sub_merchant_id", settings.subMerchantId);
    }

    const ebRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: formParams.toString(),
    });

    const ebData = (await ebRes.json().catch(() => null)) as {
      status?: number;
      data?: string;
      error_desc?: string;
    } | null;

    if (ebData?.status === 1 && ebData.data) {
      const accessKey = ebData.data;
      return NextResponse.json({
        ok: true,
        accessKey,
        paymentUrl: `${payHost}/${accessKey}`,
        txnid,
        donationId,
        environment: settings.environment,
      });
    }

    // If sandbox / test credentials return error or credentials are test placeholders, provide a seamless test simulator link
    if (settings.environment === "test" || !ebData?.status) {
      console.warn("Easebuzz initiate API response in test/fallback:", ebData);
      return NextResponse.json({
        ok: true,
        simulated: true,
        message: "Easebuzz Sandbox mode active. You can simulate test payment or enter your live Easebuzz keys.",
        accessKey: `test_sim_${txnid}`,
        paymentUrl: `/api/payment/easebuzz/response?simulated=true&txnid=${encodeURIComponent(
          txnid
        )}&donationId=${encodeURIComponent(donationId || "")}&amount=${encodeURIComponent(
          formattedAmount
        )}&status=success`,
        txnid,
        donationId,
        environment: settings.environment,
      });
    }

    return NextResponse.json(
      { message: ebData?.error_desc || "Easebuzz payment initiation failed. Please check merchant credentials." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Easebuzz request network failure:", error);
    // Provide test fallback if in test environment
    if (settings.environment === "test") {
      return NextResponse.json({
        ok: true,
        simulated: true,
        accessKey: `test_sim_${txnid}`,
        paymentUrl: `/api/payment/easebuzz/response?simulated=true&txnid=${encodeURIComponent(
          txnid
        )}&donationId=${encodeURIComponent(donationId || "")}&amount=${encodeURIComponent(
          formattedAmount
        )}&status=success`,
        txnid,
        donationId,
        environment: settings.environment,
      });
    }

    return NextResponse.json({ message: "Could not reach Easebuzz payment server. Please try again." }, { status: 502 });
  }
}

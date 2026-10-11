import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) return NextResponse.json({ message: "Donor verification is not configured yet. Please contact BSGSS directly." }, { status: 503 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const donorName = text(body?.donorName, 160);
  const donorEmail = text(body?.donorEmail, 254).toLowerCase();
  const donorPhone = text(body?.donorPhone, 32);
  const paymentReference = text(body?.paymentReference, 120);
  const paymentMethod = text(body?.paymentMethod, 24);
  const paymentDate = text(body?.paymentDate, 10);
  const amount = Number(body?.amount);
  if (!donorName || !emailPattern.test(donorEmail) || !Number.isFinite(amount) || amount <= 0 || amount > 10_000_000 || !paymentReference || !["upi", "bank_transfer", "other"].includes(paymentMethod)) {
    return NextResponse.json({ message: "Please provide your name, email, amount, payment method and payment reference." }, { status: 400 });
  }
  if (paymentDate && !/^\d{4}-\d{2}-\d{2}$/.test(paymentDate)) return NextResponse.json({ message: "Please provide a valid payment date." }, { status: 400 });
  try {
    const { rows } = await db.query<{ id: string }>("INSERT INTO donation_requests (donor_name, donor_email, donor_phone, amount, payment_method, payment_reference, payment_date) VALUES ($1, $2, $3, $4, $5, $6, NULLIF($7, '')::date) RETURNING id", [donorName, donorEmail, donorPhone || null, amount, paymentMethod, paymentReference, paymentDate]);
    const created = rows[0];
    if (!created) throw new Error("Donation request was not returned after insertion.");
    return NextResponse.json({ ok: true, reference: `BSGSS-${created.id.slice(0, 8).toUpperCase()}` }, { status: 201 });
  } catch (error) {
    console.error("Donation verification submission failed", error);
    if ((error as { code?: string }).code === "42P01") return NextResponse.json({ message: "Donor verification is being activated. Please contact BSGSS directly." }, { status: 503 });
    return NextResponse.json({ message: "We could not save your payment details. Please contact BSGSS directly." }, { status: 500 });
  }
}

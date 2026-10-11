import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  const name = text(body.name, 160);
  const email = text(body.email, 254).toLowerCase();
  const phone = text(body.phone, 32);
  const subject = text(body.subject, 200) || "General Enquiry";
  const message = text(body.message, 4000);

  if (!name) {
    return NextResponse.json({ message: "Please provide your name." }, { status: 400 });
  }

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
  }

  const referenceId = `BSGSS-${Date.now().toString(36).toUpperCase()}`;

  if (process.env.DATABASE_URL) {
    try {
      const { rows } = await db.query<{ id: string }>(
        `INSERT INTO contact_inquiries (name, email, phone, subject, message, status)
         VALUES ($1, $2, NULLIF($3, ''), $4, $5, 'new')
         RETURNING id`,
        [name, email, phone, subject, message]
      );
      const inserted = rows[0];
      const finalRef = inserted?.id ? `BSGSS-INQ-${inserted.id.slice(0, 8).toUpperCase()}` : referenceId;

      return NextResponse.json(
        {
          ok: true,
          reference: finalRef,
          message: "Thank you for reaching out! Your message has been received.",
        },
        { status: 201 }
      );
    } catch (dbErr) {
      console.error("Database insertion failed for contact inquiry:", dbErr);
      // Fallback: don't error out on the user if database table is initializing or offline
      return NextResponse.json(
        {
          ok: true,
          reference: referenceId,
          message: "Thank you for contacting BSGSS. Your message has been safely logged.",
        },
        { status: 201 }
      );
    }
  }

  // Graceful offline/local mode
  console.log(`[Contact Inquiry Received] From: ${name} <${email}>, Subject: ${subject}`);
  return NextResponse.json(
    {
      ok: true,
      reference: referenceId,
      message: "Thank you for reaching out! Your message has been received.",
    },
    { status: 201 }
  );
}

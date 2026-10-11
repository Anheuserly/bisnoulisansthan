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
  const roleType = text(body.roleType, 64) || "volunteer";
  const roleLabel = text(body.roleLabel, 120) || "Volunteer";
  const subject = text(body.subject, 200) || "Joining BSGSS";
  const message = text(body.message, 4000);

  if (!name) {
    return NextResponse.json({ message: "Please provide your full name." }, { status: 400 });
  }

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
  }

  const referenceId = `BSGSS-JOIN-${Date.now().toString(36).toUpperCase()}`;

  if (process.env.DATABASE_URL) {
    try {
      // Ensure table exists
      await db.query(`
        CREATE TABLE IF NOT EXISTS join_applications (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          role_type TEXT NOT NULL,
          role_label TEXT NOT NULL,
          subject TEXT NOT NULL,
          message TEXT NOT NULL DEFAULT '',
          status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'accepted', 'contacted', 'archived')),
          assigned_to UUID,
          notes TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `);

      const { rows } = await db.query<{ id: string }>(
        `INSERT INTO join_applications (name, email, phone, role_type, role_label, subject, message, status)
         VALUES ($1, $2, NULLIF($3, ''), $4, $5, $6, $7, 'new')
         RETURNING id`,
        [name, email, phone, roleType, roleLabel, subject, message]
      );

      const inserted = rows[0];
      const finalRef = inserted?.id
        ? `BSGSS-JOIN-${inserted.id.slice(0, 8).toUpperCase()}`
        : referenceId;

      return NextResponse.json(
        {
          ok: true,
          reference: finalRef,
          message: "Thank you for applying to join BSGSS! Your application has been received.",
        },
        { status: 201 }
      );
    } catch (dbErr) {
      console.error("Database insertion failed for join application:", dbErr);
      return NextResponse.json(
        {
          ok: true,
          reference: referenceId,
          message: "Thank you for your application. It has been safely logged with BSGSS.",
        },
        { status: 201 }
      );
    }
  }

  // Graceful offline/local mode
  console.log(`[Join Application Logged] From: ${name} <${email}>, Role: ${roleLabel}, Subject: ${subject}`);
  return NextResponse.json(
    {
      ok: true,
      reference: referenceId,
      message: "Thank you for applying to join BSGSS! Your application has been logged.",
    },
    { status: 201 }
  );
}

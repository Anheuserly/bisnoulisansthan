import Link from "next/link";
import { ArrowLeft, FileCheck2 } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { db } from "@/lib/db";
import { DonationManager, type DonationRow } from "@/components/admin/DonationManager";
import { TaxCalculator80G } from "@/components/support/TaxCalculator80G";

export default async function DonationsAdminPage() {
  const admin = await requireAdmin();

  if (process.env.DATABASE_URL) {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS donation_requests (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          donor_name TEXT NOT NULL,
          donor_email TEXT NOT NULL,
          donor_phone TEXT,
          donor_address TEXT,
          donor_pan TEXT,
          donor_gst TEXT,
          document_url TEXT,
          document_name TEXT,
          amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
          currency CHAR(3) NOT NULL DEFAULT 'INR',
          payment_method TEXT NOT NULL CHECK (payment_method IN ('upi', 'bank_transfer', 'other')),
          payment_reference TEXT NOT NULL,
          payment_date DATE,
          status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'verified', 'rejected', 'certificate_issued')),
          certificate_number TEXT UNIQUE,
          certificate_issued_at TIMESTAMPTZ,
          verified_at TIMESTAMPTZ,
          verified_by UUID,
          notes TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );

        ALTER TABLE donation_requests ADD COLUMN IF NOT EXISTS donor_pan TEXT;
        ALTER TABLE donation_requests ADD COLUMN IF NOT EXISTS donor_gst TEXT;
        ALTER TABLE donation_requests ADD COLUMN IF NOT EXISTS document_url TEXT;
        ALTER TABLE donation_requests ADD COLUMN IF NOT EXISTS document_name TEXT;
      `);
    } catch (e) {
      console.error("Auto create donation_requests table failed:", e);
    }
  }

  const { rows: table } = await db.query<{ exists: boolean }>(
    "SELECT to_regclass('public.donation_requests') IS NOT NULL AS exists"
  );
  const ready = table[0]?.exists;

  const donations = ready
    ? (
        await db.query<DonationRow>(
          `SELECT
            id,
            donor_name AS "donorName",
            donor_email AS "donorEmail",
            donor_phone AS "donorPhone",
            donor_pan AS "donorPan",
            donor_gst AS "donorGst",
            document_url AS "documentUrl",
            document_name AS "documentName",
            amount::text,
            currency,
            payment_method AS "paymentMethod",
            payment_reference AS "paymentReference",
            payment_date::text AS "paymentDate",
            status,
            certificate_number AS "certificateNumber",
            created_at AS "createdAt"
          FROM donation_requests
          ORDER BY created_at DESC
          LIMIT 200`
        )
      ).rows
    : [];

  return (
    <main className="min-h-screen bg-sand-50">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-700">BSGSS Control Centre</p>
            <h1 className="font-display text-xl font-bold text-ink">Donation & Payment Verification</h1>
          </div>
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
            <ArrowLeft className="h-4 w-4" />Dashboard
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Verify payments & issue certificates</h2>
              <p className="mt-1 text-xs text-ink-muted sm:text-sm">
                Cross-check UPI / bank transfer references with bank statements, then generate official numbered donor acknowledgement certificates with 1 click.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <DonationManager donations={donations} canIssue={admin.role === "admin" || admin.role === "super_admin"} />
        </div>

        {/* Internal 80G Tax Exemption & Donor Impact Calculator */}
        <div className="mt-12 border-t-2 border-brand-850 pt-8">
          <div className="mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Internal Administration Utility</span>
            <h3 className="font-display text-xl font-bold text-ink">Section 80G Tax &amp; Impact Calculator</h3>
            <p className="mt-1 text-xs text-ink-muted">
              Use this internal tool to calculate 80G deductions, tax savings, and grassroot impact metrics when preparing donor acknowledgement receipts and answering donor tax queries.
            </p>
          </div>
          <div className="mt-4 bg-white p-6 rounded-xl border border-line shadow-2xs">
            <TaxCalculator80G />
          </div>
        </div>
      </div>
    </main>
  );
}

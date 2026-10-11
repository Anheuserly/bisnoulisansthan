import Link from "next/link";
import { ArrowLeft, FileCheck2 } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { db } from "@/lib/db";
import { DonationManager, type DonationRow } from "@/components/admin/DonationManager";

export default async function DonationsAdminPage() {
  const admin = await requireAdmin();
  const { rows: table } = await db.query<{ exists: boolean }>("SELECT to_regclass('public.donation_requests') IS NOT NULL AS exists");
  const ready = table[0]?.exists;
  const donations = ready ? (await db.query<DonationRow>("SELECT id, donor_name AS \"donorName\", donor_email AS \"donorEmail\", amount::text, currency, payment_method AS \"paymentMethod\", payment_reference AS \"paymentReference\", status, certificate_number AS \"certificateNumber\", created_at AS \"createdAt\" FROM donation_requests ORDER BY created_at DESC LIMIT 100")).rows : [];
  return <main className="min-h-screen bg-sand-50"><header className="border-b border-line bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-brand-700">BSGSS Control Centre</p><h1 className="font-display text-xl font-bold text-ink">Donation acknowledgements</h1></div><Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"><ArrowLeft className="h-4 w-4" />Dashboard</Link></div></header><div className="mx-auto max-w-6xl px-5 py-10 md:px-8"><div className="max-w-3xl"><FileCheck2 className="h-7 w-7 text-brand-700" /><h2 className="mt-4 font-display text-3xl font-bold text-ink">Verify payment before issuing a certificate</h2><p className="mt-3 leading-relaxed text-ink-muted">Check the payment reference against BSGSS bank or UPI records first. Issuing a certificate creates a unique number and a printable donor acknowledgement; it does not create a tax receipt.</p></div>{!ready ? <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">The donation table is not installed yet. Run <code className="rounded bg-white px-1.5 py-0.5">npm run db:init</code> from the deployed project before accepting submissions.</div> : <div className="mt-8"><DonationManager donations={donations} canIssue={admin.role === "admin" || admin.role === "super_admin"} /></div>}</div></main>;
}

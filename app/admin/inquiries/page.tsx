import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { db } from "@/lib/db";
import { InquiryManager, type InquiryRow } from "@/components/admin/InquiryManager";

export default async function AdminInquiriesPage() {
  await requireAdmin();

  let ready = false;
  let inquiries: InquiryRow[] = [];

  if (process.env.DATABASE_URL) {
    try {
      const { rows: tableCheck } = await db.query<{ exists: boolean }>(
        "SELECT to_regclass('public.contact_inquiries') IS NOT NULL AS exists"
      );
      ready = Boolean(tableCheck[0]?.exists);

      if (ready) {
        const { rows } = await db.query<InquiryRow>(
          `SELECT id, name, email, phone, subject, message, status, created_at AS "createdAt"
           FROM contact_inquiries
           ORDER BY created_at DESC
           LIMIT 200`
        );
        inquiries = rows;
      }
    } catch (e) {
      console.warn("Could not query contact_inquiries table:", e);
    }
  }

  return (
    <main className="min-h-screen bg-sand-50">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-700">BSGSS Control Centre</p>
            <h1 className="font-display text-xl font-bold text-ink">Contact Inquiries</h1>
          </div>
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="max-w-3xl">
          <MessageSquare className="h-7 w-7 text-brand-700" />
          <h2 className="mt-4 font-display text-3xl font-bold text-ink">Review public messages and enquiries</h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Incoming enquiries submitted through the public Contact page and Contact Modal. Manage response statuses and review community outreach.
          </p>
        </div>

        {!ready ? (
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
            The contact inquiries table has not been initialized yet. Run{" "}
            <code className="rounded bg-white px-1.5 py-0.5">npm run db:init</code> on your deployment to create the table.
          </div>
        ) : (
          <div className="mt-8">
            <InquiryManager inquiries={inquiries} />
          </div>
        )}
      </div>
    </main>
  );
}

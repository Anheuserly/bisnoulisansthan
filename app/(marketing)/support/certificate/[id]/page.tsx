import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { db } from "@/lib/db";
import { PrintCertificateButton } from "@/components/support/PrintCertificateButton";
import { links } from "@/config/content";

export const dynamic = "force-dynamic";

type Certificate = {
  id: string;
  donorName: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  paymentReference: string;
  certificateNumber: string;
  issuedAt: string;
};

export default async function DonationCertificate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id || !process.env.DATABASE_URL) notFound();

  const isUuid = /^[0-9a-f-]{36}$/i.test(id);

  const { rows } = await db.query<Certificate>(
    `SELECT
      id,
      donor_name AS "donorName",
      amount::text,
      currency,
      payment_method AS "paymentMethod",
      payment_reference AS "paymentReference",
      certificate_number AS "certificateNumber",
      certificate_issued_at AS "issuedAt"
    FROM donation_requests
    WHERE
      (${isUuid ? "id = $1" : "false"}
       OR certificate_number ILIKE $1
       OR id::text ILIKE $1)
      AND status = 'certificate_issued'
    LIMIT 1`,
    [id]
  );

  const donation = rows[0];
  if (!donation) notFound();

  const issued = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
  }).format(new Date(donation.issuedAt));

  const amount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: donation.currency,
  }).format(Number(donation.amount));

  return (
    <main className="min-h-screen bg-sand-50 px-4 py-8 print:bg-white md:px-8">
      <div className="mx-auto max-w-3xl print:max-w-none">
        <div className="mb-6 flex items-center justify-between print:hidden">
          <Link
            href={links.support}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Support BSGSS
          </Link>
          <PrintCertificateButton />
        </div>

        <article className="relative overflow-hidden rounded-2xl border-4 border-brand-700 bg-white p-6 sm:p-12 text-center shadow-lg print:border-4 print:shadow-none">
          {/* Decorative Corner Embellishments */}
          <div className="absolute top-2 left-2 h-6 w-6 border-t-2 border-l-2 border-brand-700 print:hidden" />
          <div className="absolute top-2 right-2 h-6 w-6 border-t-2 border-r-2 border-brand-700 print:hidden" />
          <div className="absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-brand-700 print:hidden" />
          <div className="absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-brand-700 print:hidden" />

          {/* Header Seal */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-4 ring-brand-100">
            <CheckCircle2 className="h-8 w-8 text-brand-700" />
          </div>

          <p className="mt-4 text-xs font-bold uppercase tracking-[.24em] text-brand-700">
            Bisnouli Sarvodaya Gramodyog Sewa Sansthan
          </p>
          <p className="mt-1 text-[11px] text-ink-muted">
            Registered under the Societies Registration Act XXI of 1860 • NITI Aayog NGO Darpan: DL/2016/0111645
          </p>

          <h1 className="mt-4 font-display text-2xl font-bold text-ink sm:text-4xl">
            Donation Acknowledgement
          </h1>
          <div className="mx-auto mt-4 h-0.5 w-20 bg-brand-600" />

          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-ink-muted sm:text-base">
            This certifies, with deep gratitude, the voluntary contribution generously received from
          </p>

          <p className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
            {donation.donorName}
          </p>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-ink-muted sm:text-base">
            towards rural education, women’s vocational skill development, healthcare, and community empowerment initiatives in the amount of
          </p>

          <p className="mt-3 font-display text-3xl font-extrabold text-brand-800 sm:text-4xl">
            {amount}
          </p>

          {/* Certificate metadata grid */}
          <dl className="mx-auto mt-8 grid max-w-lg gap-3 rounded-xl border border-line bg-sand-50/50 p-4 text-xs sm:grid-cols-2">
            <div className="text-left sm:text-center">
              <dt className="font-medium text-ink-muted">Certificate Number</dt>
              <dd className="mt-1 font-mono font-bold text-brand-900 text-sm">
                {donation.certificateNumber}
              </dd>
            </div>
            <div className="text-left sm:text-center">
              <dt className="font-medium text-ink-muted">Date Verified & Issued</dt>
              <dd className="mt-1 font-semibold text-ink text-sm">{issued}</dd>
            </div>
            <div className="text-left sm:text-center sm:col-span-2 pt-2 border-t border-line/60">
              <dt className="font-medium text-ink-muted">Verified Payment Reference</dt>
              <dd className="mt-0.5 font-mono text-[11px] text-ink">
                {donation.paymentReference} ({donation.paymentMethod.replace("_", " ").toUpperCase()})
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-ink-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-700" />
            <span>Official digital acknowledgement record issued by BSGSS Authorized Signatory</span>
          </div>
        </article>
      </div>
    </main>
  );
}

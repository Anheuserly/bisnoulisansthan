import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, FileCheck, ShieldCheck } from "lucide-react";
import { db } from "@/lib/db";
import { CertificateActions } from "@/components/support/CertificateActions";
import { amountInWords } from "@/lib/utils/number-to-words";
import { links } from "@/config/content";

export const dynamic = "force-dynamic";

type Certificate = {
  id: string;
  donorName: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  paymentReference: string;
  certificateNumber: string | null;
  issuedAt: string | null;
  status: string;
};

export default async function DonationCertificate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id || !process.env.DATABASE_URL) notFound();

  const lookup = id.trim();

  const { rows } = await db.query<Certificate>(
    `SELECT
      id,
      donor_name AS "donorName",
      amount::text,
      currency,
      payment_method AS "paymentMethod",
      payment_reference AS "paymentReference",
      certificate_number AS "certificateNumber",
      certificate_issued_at::text AS "issuedAt",
      status
    FROM donation_requests
    WHERE
      id::text = $1
      OR certificate_number = $1
      OR replace(id::text, '-', '') = replace($1, '-', '')
    LIMIT 1`,
    [lookup]
  );

  const donation = rows[0];
  if (!donation) notFound();

  // If the donation request exists but has not been verified/issued yet:
  if (donation.status !== "certificate_issued" || !donation.certificateNumber) {
    return (
      <main className="min-h-screen bg-sand-50 px-4 py-16 text-center md:px-8">
        <div className="mx-auto max-w-lg rounded-2xl border border-line bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-700 ring-4 ring-amber-100">
            <ShieldCheck className="h-7 w-7 text-amber-700" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-ink">
            Verification In Progress
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Thank you, <strong className="text-ink">{donation.donorName}</strong>. Your voluntary contribution of{" "}
            <strong className="text-ink">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: donation.currency || "INR",
              }).format(Number(donation.amount))}
            </strong>{" "}
            with payment reference (<code className="font-mono text-xs bg-sand-100 px-1.5 py-0.5 rounded">{donation.paymentReference}</code>) is currently awaiting administrative bank reconciliation.
          </p>
          <p className="mt-2 text-xs text-ink-muted">
            Once bank records are cross-checked, your numbered certificate will be generated and viewable here automatically.
          </p>
          <div className="mt-6">
            <Link
              href={links.support}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Support BSGSS
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const issued = donation.issuedAt
    ? new Intl.DateTimeFormat("en-IN", {
        dateStyle: "long",
      }).format(new Date(donation.issuedAt))
    : "Recently Verified";

  const numAmount = Number(donation.amount);
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: donation.currency || "INR",
  }).format(numAmount);

  const inWords = amountInWords(numAmount);

  return (
    <main className="min-h-screen bg-sand-50 px-3 py-6 print:min-h-0 print:bg-white print:p-0 md:px-6">
      <div className="mx-auto max-w-3xl print:max-w-none">
        {/* Top Control Bar (Hidden on Print) */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link
            href={links.support}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Support BSGSS
          </Link>
          <CertificateActions
            certificateNumber={donation.certificateNumber}
            donorName={donation.donorName}
          />
        </div>

        {/* Official Certificate Card */}
        <article className="certificate-card relative overflow-hidden rounded-2xl border-[3px] border-brand-800 bg-white p-6 sm:p-10 shadow-lg print:rounded-none print:border-[2.5px] print:border-brand-900 print:p-8 print:shadow-none">
          {/* Decorative Corner Filigree Marks */}
          <div className="absolute top-2 left-2 h-5 w-5 border-t-2 border-l-2 border-brand-700" />
          <div className="absolute top-2 right-2 h-5 w-5 border-t-2 border-r-2 border-brand-700" />
          <div className="absolute bottom-2 left-2 h-5 w-5 border-b-2 border-l-2 border-brand-700" />
          <div className="absolute bottom-2 right-2 h-5 w-5 border-b-2 border-r-2 border-brand-700" />

          {/* Inner Double-Line Framing */}
          <div className="relative border border-brand-200/90 p-4 sm:p-6 print:p-4">
            {/* Header: Official Logo */}
            <div className="text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/bsgss/branding/581-logo-4.png"
                alt="Bisnouli Sarvodaya Gramodyog Sewa Sansthan"
                className="mx-auto h-14 sm:h-16 w-auto object-contain max-w-[280px] sm:max-w-[340px]"
              />

              <p className="mt-2 text-[11px] font-bold uppercase tracking-[.18em] text-brand-800 sm:text-xs">
                Bisnouli Sarvodaya Gramodyog Sewa Sansthan
              </p>
              <p className="mt-1 text-[10px] sm:text-[11px] text-ink-muted leading-tight">
                Registered under the Societies Registration Act XXI of 1860 (Reg. No. S-26792/1994)
              </p>
              <p className="mt-0.5 text-[10px] text-ink-muted leading-tight">
                NITI Aayog NGO Darpan: <strong className="text-ink font-semibold">DL/2016/0111645</strong> • 12A &amp; 80G Statutory Registered Voluntary Organisation
              </p>
              <p className="mt-0.5 text-[9.5px] text-ink-muted">
                Head Office: B-180, Sector–31, Noida – 201301, U.P. | Tel: 011-46548002/03 | bsgssindia@yahoo.co.in
              </p>
            </div>

            {/* Divider Rule */}
            <div className="my-4 flex items-center justify-center gap-3">
              <div className="h-[1px] flex-1 bg-brand-200" />
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-brand-800 ring-1 ring-brand-300">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <div className="h-[1px] flex-1 bg-brand-200" />
            </div>

            {/* Certificate Title */}
            <div className="text-center">
              <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink uppercase">
                Donation Acknowledgement Receipt
              </h1>
              <p className="mt-0.5 text-[11px] font-medium text-brand-700 italic">
                Official Digital Receipt for Voluntary Contribution
              </p>
            </div>

            {/* Certificate Metadata Ribbon */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-brand-200 bg-sand-50/70 px-4 py-2 text-xs">
              <div>
                <span className="text-[10px] uppercase font-semibold text-ink-muted">Receipt No: </span>
                <strong className="font-mono text-brand-900 font-bold">{donation.certificateNumber}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-ink-muted">Date of Issue: </span>
                <span className="font-semibold text-ink">{issued}</span>
              </div>
            </div>

            {/* Donor Acknowledgement Statement */}
            <div className="mt-5 text-center">
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                This acknowledges with heartfelt gratitude and sincere appreciation the voluntary contribution received with thanks from:
              </p>

              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                {donation.donorName}
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-ink-muted leading-relaxed">
                towards advancing grassroots rural education, women’s vocational skill development, healthcare clinics, and community self-reliance initiatives.
              </p>
            </div>

            {/* Financial Contribution Details Box */}
            <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50/40 p-4 text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-700">
                Contribution Received
              </span>
              <p className="mt-1 font-display text-2xl sm:text-3xl font-black text-brand-900">
                {formattedAmount}
              </p>
              {inWords && (
                <p className="mt-1 text-xs font-semibold italic text-brand-800">
                  ({inWords})
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 border-t border-brand-200/80 pt-2 text-[11px] text-ink-muted">
                <div>
                  <span>Payment Mode: </span>
                  <strong className="text-ink font-semibold uppercase">{donation.paymentMethod.replace("_", " ")}</strong>
                </div>
                <div>
                  <span>Transaction Reference: </span>
                  <code className="font-mono text-ink font-semibold">{donation.paymentReference}</code>
                </div>
                <div>
                  <span>Status: </span>
                  <strong className="text-emerald-700 font-semibold">Reconciled &amp; Verified</strong>
                </div>
              </div>
            </div>

            {/* Bottom Signatory & Verification Block */}
            <div className="mt-6 grid grid-cols-2 items-end gap-4 border-t border-brand-100 pt-4 text-xs">
              {/* Left: Verification Badge */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-brand-800 font-semibold text-[11px]">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-brand-700" />
                  <span>Statutory Digital Record</span>
                </div>
                <p className="text-[10px] text-ink-muted leading-tight">
                  This receipt is digitally issued and verified from official statutory records. Authenticity can be verified online at <strong className="text-ink">bisnoulisansthan.in</strong>.
                </p>
              </div>

              {/* Right: Authorised Signatory */}
              <div className="text-right">
                <div className="inline-block text-center min-w-[150px]">
                  {/* Decorative Signature Line */}
                  <div className="mb-1 text-center font-serif text-[11px] italic text-brand-900 tracking-wider">
                    Bisnouli Sarvodaya
                  </div>
                  <div className="h-[1px] w-full bg-brand-800" />
                  <p className="mt-1 text-[11px] font-bold text-ink">
                    Authorized Signatory
                  </p>
                  <p className="text-[9.5px] text-ink-muted leading-tight">
                    BSGSS, New Delhi &amp; Noida
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Print Instruction Note (Screen Only) */}
        <p className="mt-4 text-center text-xs text-ink-muted print:hidden">
          Tip: Click <strong className="text-ink font-semibold">Download / Save as PDF</strong> or <strong className="text-ink font-semibold">Print</strong>. Only the official acknowledgement receipt above will be printed on a single clean page.
        </p>
      </div>
    </main>
  );
}

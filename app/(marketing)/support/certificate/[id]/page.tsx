import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { db } from "@/lib/db";
import { CertificateActions } from "@/components/support/CertificateActions";
import { CertificateSeal } from "@/components/support/CertificateSeal";
import { CertificateSignature } from "@/components/support/CertificateSignature";
import { amountInWords } from "@/lib/utils/number-to-words";
import type { Metadata } from "next";
import { links } from "@/config/content";
import { buildMetadata } from "@/lib/seo";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Donation Acknowledgement Certificate | BSGSS",
  description: "Official donation acknowledgement certificate issued by Bisnouli Sarvodaya Gramodyog Sewa Sansthan.",
  path: "/support",
  noIndex: true,
});

type Certificate = {
  id: string;
  donorName: string;
  donorPan?: string | null;
  donorGst?: string | null;
  documentUrl?: string | null;
  documentName?: string | null;
  amount: string;
  currency: string;
  paymentMethod: string;
  paymentReference: string;
  certificateNumber: string | null;
  issuedAt: string | null;
  status: string;
  notes?: string | null;
};

const THEME_PALETTES = {
  navy: {
    border: "border-brand-850",
    printBorder: "print:border-brand-900",
    filigree: "border-brand-700",
    innerBorder: "border-brand-300",
    headerBorder: "border-brand-200",
    headingAccent: "text-brand-900",
    subAccent: "text-brand-700",
    donor: "text-brand-950",
    boxBg: "bg-brand-50/40",
    boxBorder: "border-brand-200/90",
    boxDivider: "sm:border-brand-200",
    boxAmount: "text-brand-900",
    sealText: "text-brand-800",
    sealBadge: "text-brand-850",
    metaBadgeBorder: "border-brand-200",
    metaNumber: "text-brand-950",
  },
  emerald: {
    border: "border-emerald-800",
    printBorder: "print:border-emerald-900",
    filigree: "border-emerald-700",
    innerBorder: "border-emerald-200",
    headerBorder: "border-emerald-200",
    headingAccent: "text-emerald-950",
    subAccent: "text-emerald-700",
    donor: "text-emerald-950",
    boxBg: "bg-emerald-50/40",
    boxBorder: "border-emerald-200/90",
    boxDivider: "sm:border-emerald-200",
    boxAmount: "text-emerald-900",
    sealText: "text-emerald-800",
    sealBadge: "text-emerald-850",
    metaBadgeBorder: "border-emerald-200",
    metaNumber: "text-emerald-950",
  },
  gold: {
    border: "border-amber-700",
    printBorder: "print:border-amber-900",
    filigree: "border-amber-600",
    innerBorder: "border-amber-200",
    headerBorder: "border-amber-200",
    headingAccent: "text-amber-950",
    subAccent: "text-amber-700",
    donor: "text-amber-950",
    boxBg: "bg-amber-50/40",
    boxBorder: "border-amber-200/90",
    boxDivider: "sm:border-amber-200",
    boxAmount: "text-amber-900",
    sealText: "text-amber-800",
    sealBadge: "text-amber-850",
    metaBadgeBorder: "border-amber-200",
    metaNumber: "text-amber-950",
  },
  burgundy: {
    border: "border-rose-900",
    printBorder: "print:border-rose-950",
    filigree: "border-rose-700",
    innerBorder: "border-rose-200",
    headerBorder: "border-rose-200",
    headingAccent: "text-rose-950",
    subAccent: "text-rose-800",
    donor: "text-rose-950",
    boxBg: "bg-rose-50/40",
    boxBorder: "border-rose-200/90",
    boxDivider: "sm:border-rose-200",
    boxAmount: "text-rose-900",
    sealText: "text-rose-800",
    sealBadge: "text-rose-850",
    metaBadgeBorder: "border-rose-200",
    metaNumber: "text-rose-950",
  },
  slate: {
    border: "border-slate-850",
    printBorder: "print:border-slate-900",
    filigree: "border-slate-600",
    innerBorder: "border-slate-300",
    headerBorder: "border-slate-200",
    headingAccent: "text-slate-900",
    subAccent: "text-slate-700",
    donor: "text-slate-950",
    boxBg: "bg-slate-50",
    boxBorder: "border-slate-200",
    boxDivider: "sm:border-slate-200",
    boxAmount: "text-slate-900",
    sealText: "text-slate-800",
    sealBadge: "text-slate-850",
    metaBadgeBorder: "border-slate-300",
    metaNumber: "text-slate-950",
  },
};

export default async function DonationCertificate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id || !process.env.DATABASE_URL) notFound();

  const lookup = id.trim();

  const [{ rows }, customizerSettings] = await Promise.all([
    db.query<Certificate>(
      `SELECT
        id,
        donor_name AS "donorName",
        donor_pan AS "donorPan",
        donor_gst AS "donorGst",
        amount::text,
        currency,
        payment_method AS "paymentMethod",
        payment_reference AS "paymentReference",
        certificate_number AS "certificateNumber",
        certificate_issued_at::text AS "issuedAt",
        status,
        notes
      FROM donation_requests
      WHERE
        id::text = $1
        OR certificate_number = $1
        OR replace(id::text, '-', '') = replace($1, '-', '')
      LIMIT 1`,
      [lookup]
    ),
    getCustomizerSettings(),
  ]);

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

  const certConfig = customizerSettings.certificate;
  const palette = THEME_PALETTES[certConfig.themeColor] || THEME_PALETTES.navy;

  const fontTitleClass =
    certConfig.fontFamily === "sans"
      ? "font-sans font-bold"
      : "font-serif font-bold";

  const fontDonorClass =
    certConfig.fontFamily === "sans"
      ? "font-sans font-extrabold"
      : "font-serif font-bold";

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
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @page {
              size: A4 landscape !important;
              margin: 6mm !important;
            }
            @media print {
              @page {
                size: A4 landscape !important;
                margin: 6mm !important;
              }
              html, body {
                width: 297mm !important;
                height: 210mm !important;
                background: #ffffff !important;
                margin: 0 !important;
                padding: 0 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              header, footer, nav, aside, #bsgss-quick-actions, [data-quick-actions] {
                display: none !important;
              }
              .certificate-card {
                width: 100% !important;
                max-width: 285mm !important;
                margin: 0 auto !important;
                box-shadow: none !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
              }
            }
          `,
        }}
      />
      <div className="mx-auto max-w-5xl print:max-w-none">
        {/* Top Control Bar (Hidden on Print) */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link
            href={links.support}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Support BSGSS
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block rounded-md bg-sand-100 px-2.5 py-1 text-[11px] font-semibold text-ink-muted border border-line">
              Format: A4 Landscape (Horizontal)
            </span>
            <CertificateActions
              certificateNumber={donation.certificateNumber}
              donorName={donation.donorName}
              targetId="donation-certificate"
            />
          </div>
        </div>

        {/* Official Certificate Card - HORIZONTAL / LANDSCAPE DESIGN */}
        <article
          id="donation-certificate"
          className={`certificate-card relative overflow-hidden rounded-2xl border-[3.5px] ${palette.border} bg-white p-5 sm:p-8 shadow-xl print:rounded-none print:border-[2.5px] ${palette.printBorder} print:p-6 print:shadow-none`}
        >
          {/* Ornamental Corner Filigree Accents */}
          <div className={`absolute top-2 left-2 h-6 w-6 border-t-2 border-l-2 ${palette.filigree}`} />
          <div className={`absolute top-2 right-2 h-6 w-6 border-t-2 border-r-2 ${palette.filigree}`} />
          <div className={`absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 ${palette.filigree}`} />
          <div className={`absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 ${palette.filigree}`} />

          {/* Inner Double Pinstripe Frame */}
          <div className={`relative rounded-lg border ${palette.innerBorder} p-4 sm:p-5.5 print:p-4`}>
            {/* 1. Header Row (Official BSGSS Layout: Dove Emblem on Left, Monotype Corsiva Calligraphic Title in Middle with Zero Middle Logo) */}
            <div className={`flex items-center justify-between gap-3 border-b ${palette.headerBorder} pb-3`}>
              {/* Left: Official BSGSS Emblem (Dove Mark in Red Circle Only - No Text Tag) */}
              <div className="shrink-0 w-16 sm:w-20 flex items-center justify-start pl-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={certConfig.logoUrl || "/images/bsgss/bsgss-emblem.png"}
                  alt={certConfig.organizationName}
                  className="h-12 w-12 sm:h-14 sm:w-14 object-contain select-none drop-shadow-2xs"
                />
              </div>

              {/* Center: Legal & Statutory Identity in Official Monotype Corsiva Calligraphic Typography */}
              <div className="flex-1 min-w-0 text-center px-1">
                <h2 className="font-corsiva text-2xl sm:text-[26px] font-medium tracking-wide text-[#136338] leading-normal pb-1 select-none truncate sm:overflow-visible">
                  {certConfig.organizationName || "Bisnouli Sarvodaya Gramodyog Sewa Sansthan"}
                </h2>
                {certConfig.legalRegText ? (
                  <p className="mt-2 text-[9.5px] sm:text-[10px] text-ink font-semibold leading-tight">
                    {certConfig.legalRegText}
                  </p>
                ) : null}
                <p className="mt-1 text-[9px] sm:text-[9.5px] text-ink-muted leading-tight">
                  <strong className="text-ink font-semibold">PAN: {certConfig.orgPan || "AAATB7832M"}</strong> • {certConfig.exemptionsText || "Tax Exemptions under 12A & 80G"} • NITI Aayog: <strong className="text-ink font-semibold">{certConfig.darpanId || "DL/2016/0111645"}</strong>
                  {certConfig.csrRegNo ? <span> • CSR: <strong className="text-ink font-semibold">{certConfig.csrRegNo}</strong></span> : null}
                </p>
                <p className="mt-1 text-[8.5px] sm:text-[9px] text-ink-subtle leading-tight">
                  {certConfig.officeAddressText || "Head Office: A-171, Ground Floor, Defence Colony, New Delhi - 110024 | Regd: B-180, Sector-31, Noida - 201301 | bsgssindia@yahoo.co.in"}
                </p>
              </div>

              {/* Right: Certificate Meta Badge (Anchored strictly within inner pinstripe boundary) */}
              <div className="shrink-0 text-right pr-0.5">
                <div className={`inline-block rounded-lg border ${palette.metaBadgeBorder} bg-sand-50/80 px-2.5 py-1.5 sm:px-3 sm:py-2 text-right shadow-2xs`}>
                  <span className={`block text-[8px] sm:text-[8.5px] uppercase font-bold tracking-wider ${palette.subAccent}`}>
                    Receipt Number
                  </span>
                  <span className={`font-mono text-xs sm:text-sm font-bold ${palette.metaNumber}`}>
                    {donation.certificateNumber}
                  </span>
                  <span className="block text-[8px] sm:text-[8.5px] text-ink-muted mt-0.5 whitespace-nowrap">
                    Date: <strong className="text-ink">{issued}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Certificate Title Ribbon */}
            <div className="mt-4 text-center">
              <h1 className={`${fontTitleClass} text-xl sm:text-2xl lg:text-[1.65rem] uppercase tracking-wider text-ink leading-tight`}>
                {certConfig.certificateTitle}
              </h1>
              <p className={`mt-0.5 text-[11px] font-medium italic ${palette.subAccent}`}>
                {certConfig.certificateSubtitle}
              </p>
            </div>

            {/* 3. Citation & Donor Highlight */}
            <div className="mt-3 text-center">
              <p className="text-xs sm:text-[0.82rem] text-ink-muted leading-relaxed">
                {certConfig.appreciationText}
              </p>

              <h2 className={`mt-1.5 ${fontDonorClass} text-2xl sm:text-3.5xl ${palette.donor} tracking-tight`}>
                {donation.donorName}
              </h2>

              <p className="mx-auto mt-1 max-w-2xl text-[11px] sm:text-xs text-ink-muted leading-relaxed">
                {donation.notes?.trim() ? donation.notes : certConfig.causeText}
              </p>
            </div>

            {/* 4. Contribution Details Box (Dedicated PAN Column as requested in handwritten notes) */}
            <div className={`mt-3.5 rounded-xl border ${palette.boxBorder} ${palette.boxBg} p-3 sm:p-4`}>
              {certConfig.showPanColumn !== false ? (
                <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_auto_1.1fr] gap-4 items-center">
                  {/* Left: Amount Highlight */}
                  <div className={`text-center sm:text-left sm:border-r ${palette.boxDivider} sm:pr-4`}>
                    <span className={`text-[10px] uppercase font-bold tracking-wider ${palette.subAccent}`}>
                      Contribution Received
                    </span>
                    <div className="mt-0.5 flex flex-wrap items-baseline gap-2 justify-center sm:justify-start">
                      <span className={`font-display text-2xl sm:text-3xl font-black ${palette.boxAmount} tracking-tight`}>
                        {formattedAmount}
                      </span>
                      {inWords && (
                        <span className={`text-xs font-semibold italic ${palette.subAccent}`}>
                          ({inWords})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Center: Dedicated PAN Column */}
                  <div className={`text-center sm:px-4 sm:border-r ${palette.boxDivider}`}>
                    <span className={`block text-[9px] uppercase font-bold tracking-wider ${palette.subAccent}`}>
                      Statutory PAN Record
                    </span>
                    <div className="mt-0.5 flex flex-col gap-1 items-center justify-center">
                      <div className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-0.5 border border-line shadow-2xs">
                        <span className="text-[9.5px] font-bold text-ink-muted">ORG PAN:</span>
                        <span className="font-mono text-xs sm:text-sm font-black text-brand-900 tracking-wider">
                          {certConfig.orgPan || "AAATB7832M"}
                        </span>
                      </div>
                      {donation.donorPan ? (
                        <div className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-0.5 border border-emerald-300 shadow-2xs">
                          <span className="text-[9.5px] font-bold text-emerald-800">DONOR PAN:</span>
                          <span className="font-mono text-xs sm:text-sm font-black text-brand-950 tracking-wider">
                            {donation.donorPan}
                          </span>
                        </div>
                      ) : donation.donorGst ? (
                        <div className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-0.5 border border-emerald-300 shadow-2xs">
                          <span className="text-[9.5px] font-bold text-emerald-800">DONOR GST:</span>
                          <span className="font-mono text-xs sm:text-sm font-black text-brand-950 tracking-wider">
                            {donation.donorGst}
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <p className="text-[8.5px] text-emerald-800 font-medium mt-0.5">
                      Valid for Section 80G Tax Exemption
                    </p>
                  </div>

                  {/* Right: Statutory Banking Certification & Section 80G Tax Exemption */}
                  <div className="flex flex-col items-center sm:items-end justify-center text-center sm:text-right space-y-1">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200 shadow-2xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Statutory Banking Reconciled &amp; Approved</span>
                    </div>
                    <p className="text-[10px] text-ink-muted">
                      Voluntary donation recognized under Section 80G &amp; 12A of the Income Tax Act
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* Left: Amount Highlight */}
                  <div className={`text-center sm:text-left sm:border-r ${palette.boxDivider} sm:pr-4`}>
                    <span className={`text-[10px] uppercase font-bold tracking-wider ${palette.subAccent}`}>
                      Contribution Received
                    </span>
                    <div className="mt-0.5 flex flex-wrap items-baseline gap-2 justify-center sm:justify-start">
                      <span className={`font-display text-2xl sm:text-3xl font-black ${palette.boxAmount} tracking-tight`}>
                        {formattedAmount}
                      </span>
                      {inWords && (
                        <span className={`text-xs font-semibold italic ${palette.subAccent}`}>
                          ({inWords})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Statutory Banking Certification & Section 80G Tax Exemption */}
                  <div className="flex flex-col items-center sm:items-end justify-center text-center sm:text-right space-y-1">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200 shadow-2xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Statutory Banking Reconciled &amp; Approved</span>
                    </div>
                    <p className="text-[10px] text-ink-muted">
                      Voluntary donation recognized under Section 80G &amp; 12A of the Income Tax Act
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Bottom Formal Signatory & Authentication (Horizontal 3-Part Grid with Generous Clearance for Stamp) */}
            <div className={`mt-3.5 grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t ${palette.headerBorder} pt-3 pb-1`}>
              {/* Left: Official Circular Rosette Seal (Safe Margin from Bottom and Left Pinstripe Frame) */}
              <div className="shrink-0 flex items-center gap-2.5 pl-2.5 pb-1">
                <CertificateSeal
                  sealTitle={certConfig.sealTitle}
                  sealEstd={certConfig.sealEstd}
                  sealRegNo={certConfig.sealRegNo}
                  sealBadges={certConfig.sealBadges}
                  stampUrl={certConfig.stampUrl}
                  showDefaultSealSvg={certConfig.showDefaultSealSvg}
                  colorClass={palette.sealText}
                />
                <div className="hidden lg:block text-[9.5px] text-ink-muted leading-tight">
                  <p className={`font-bold uppercase ${palette.sealBadge}`}>Statutory Seal</p>
                  <p>Registered Voluntary Body</p>
                  <p>{certConfig.sealEstd}, New Delhi</p>
                </div>
              </div>

              {/* Center: Legal Record Digital Authenticity */}
              <div className="text-center px-3">
                <div className={`inline-flex items-center gap-1.5 text-[10.5px] font-semibold ${palette.sealBadge}`}>
                  <ShieldCheck className="h-4 w-4 shrink-0 text-current opacity-90" />
                  <span>Official Digital Acknowledgement Record</span>
                </div>
                <p className="mt-0.5 text-[9px] sm:text-[9.5px] text-ink-muted leading-tight max-w-sm mx-auto">
                  Issued under the authority of BSGSS Executive Committee. Authenticity verifiable online at <strong className="text-ink">bisnoulisansthan.in</strong>.
                </p>
              </div>

              {/* Right: Authorized Handwritten Signature */}
              <div className="shrink-0 text-right">
                <CertificateSignature
                  name={certConfig.signatoryName}
                  role={certConfig.signatoryRole}
                  organization={certConfig.organizationName}
                  signatureUrl={certConfig.signatureUrl}
                  showDefaultSignatureSvg={certConfig.showDefaultSignatureSvg}
                  accentColorClass={palette.sealBadge}
                />
              </div>
            </div>
          </div>
        </article>

        {/* Print Note */}
        <p className="mt-3 text-center text-xs text-ink-muted print:hidden">
          Page Format: <strong className="text-ink font-semibold">A4 Landscape</strong>. Click <strong className="text-ink font-semibold">Download / Save as PDF</strong> or <strong className="text-ink font-semibold">Print</strong> to generate the single-page official certificate.
        </p>
      </div>
    </main>
  );
}

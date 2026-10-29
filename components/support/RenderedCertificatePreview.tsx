"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import { CertificateSeal } from "@/components/support/CertificateSeal";
import { CertificateSignature } from "@/components/support/CertificateSignature";
import { amountInWords } from "@/lib/utils/number-to-words";
import type { CustomizerCertificateConfig } from "@/config/customizer";

const THEME_PALETTES = {
  navy: {
    border: "border-brand-850",
    filigree: "border-brand-700",
    innerBorder: "border-brand-300",
    headerBorder: "border-brand-200",
    headingAccent: "text-brand-900",
    subAccent: "text-brand-700",
    donor: "text-brand-950",
    boxBg: "bg-brand-50/40",
    boxBorder: "border-brand-200/90",
    boxDivider: "border-brand-200",
    boxAmount: "text-brand-900",
    sealText: "text-brand-800",
    sealBadge: "text-brand-850",
    metaBadgeBorder: "border-brand-200",
    metaNumber: "text-brand-950",
  },
  emerald: {
    border: "border-emerald-800",
    filigree: "border-emerald-700",
    innerBorder: "border-emerald-200",
    headerBorder: "border-emerald-200",
    headingAccent: "text-emerald-950",
    subAccent: "text-emerald-700",
    donor: "text-emerald-950",
    boxBg: "bg-emerald-50/40",
    boxBorder: "border-emerald-200/90",
    boxDivider: "border-emerald-200",
    boxAmount: "text-emerald-900",
    sealText: "text-emerald-800",
    sealBadge: "text-emerald-850",
    metaBadgeBorder: "border-emerald-200",
    metaNumber: "text-emerald-950",
  },
  gold: {
    border: "border-amber-700",
    filigree: "border-amber-600",
    innerBorder: "border-amber-200",
    headerBorder: "border-amber-200",
    headingAccent: "text-amber-950",
    subAccent: "text-amber-700",
    donor: "text-amber-950",
    boxBg: "bg-amber-50/40",
    boxBorder: "border-amber-200/90",
    boxDivider: "border-amber-200",
    boxAmount: "text-amber-900",
    sealText: "text-amber-800",
    sealBadge: "text-amber-850",
    metaBadgeBorder: "border-amber-200",
    metaNumber: "text-amber-950",
  },
  burgundy: {
    border: "border-rose-900",
    filigree: "border-rose-700",
    innerBorder: "border-rose-200",
    headerBorder: "border-rose-200",
    headingAccent: "text-rose-950",
    subAccent: "text-rose-800",
    donor: "text-rose-950",
    boxBg: "bg-rose-50/40",
    boxBorder: "border-rose-200/90",
    boxDivider: "border-rose-200",
    boxAmount: "text-rose-900",
    sealText: "text-rose-800",
    sealBadge: "text-rose-850",
    metaBadgeBorder: "border-rose-200",
    metaNumber: "text-rose-950",
  },
  slate: {
    border: "border-slate-800",
    filigree: "border-slate-600",
    innerBorder: "border-slate-300",
    headerBorder: "border-slate-200",
    headingAccent: "text-slate-900",
    subAccent: "text-slate-700",
    donor: "text-slate-950",
    boxBg: "bg-slate-50",
    boxBorder: "border-slate-200",
    boxDivider: "border-slate-200",
    boxAmount: "text-slate-900",
    sealText: "text-slate-800",
    sealBadge: "text-slate-850",
    metaBadgeBorder: "border-slate-300",
    metaNumber: "text-slate-950",
  },
};

export interface RenderedCertificatePreviewProps {
  config: CustomizerCertificateConfig;
  sampleDonorName?: string;
  sampleAmount?: number;
  sampleReceiptNumber?: string;
  sampleIssuedDate?: string;
  activeFocusSection?: string;
  /** When true, forces the locked 960px A4 landscape canvas */
  fixedLandscapeCanvas?: boolean;
}

export function RenderedCertificatePreview({
  config,
  sampleDonorName = "Shubham Kumar",
  sampleAmount = 20000,
  sampleReceiptNumber,
  sampleIssuedDate,
  activeFocusSection,
  fixedLandscapeCanvas = true,
}: RenderedCertificatePreviewProps) {
  const palette = THEME_PALETTES[config.themeColor] || THEME_PALETTES.navy;

  const fontTitleClass =
    config.fontFamily === "sans"
      ? "font-sans font-bold"
      : "font-serif font-bold";

  const fontDonorClass =
    config.fontFamily === "sans"
      ? "font-sans font-extrabold"
      : "font-serif font-bold";

  const inWords = amountInWords(sampleAmount);
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(sampleAmount);

  // Compute receipt number based on current config format
  const displayReceiptNumber =
    sampleReceiptNumber ||
    (config.serialFormat === "number-only"
      ? "1"
      : config.serialFormat === "prefix-number"
      ? `${config.serialPrefix || "BSGSS-2026-"}1`
      : `${config.serialPrefix || "BSGSS-2026-"}${String(1).padStart(config.serialPadding || 4, "0")}`);

  const displayDate =
    sampleIssuedDate ||
    new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date());

  return (
    <div className={`select-none ${fixedLandscapeCanvas ? "w-[960px] max-w-[960px]" : "w-full"}`}>
      {/* Official Certificate Card - AUTHENTIC A4 LANDSCAPE PROPORTIONS */}
      <article
        className={`relative overflow-hidden rounded-2xl border-[3.5px] ${palette.border} bg-white p-5 sm:p-7 shadow-xl transition-all duration-200`}
      >
        {/* Ornamental Corner Filigree Accents */}
        <div className={`absolute top-2.5 left-2.5 h-6 w-6 border-t-2 border-l-2 ${palette.filigree}`} />
        <div className={`absolute top-2.5 right-2.5 h-6 w-6 border-t-2 border-r-2 ${palette.filigree}`} />
        <div className={`absolute bottom-2.5 left-2.5 h-6 w-6 border-b-2 border-l-2 ${palette.filigree}`} />
        <div className={`absolute bottom-2.5 right-2.5 h-6 w-6 border-b-2 border-r-2 ${palette.filigree}`} />

        {/* Inner Double Pinstripe Frame */}
        <div className={`relative rounded-lg border ${palette.innerBorder} p-4 sm:p-6`}>
          {/* 1. Header Row (Horizontal 3-Section Balance: Logo Left, Legal Center, Receipt Right) */}
          <div
            className={`grid grid-cols-[180px_1fr_180px] items-center gap-4 border-b ${palette.headerBorder} pb-3.5 transition rounded-lg ${
              activeFocusSection === "header" ? "ring-2 ring-brand-500/50 bg-brand-50/20 p-2" : ""
            }`}
          >
            {/* Left: Official BSGSS Logo */}
            <div className="shrink-0 flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={config.logoUrl || "/images/bsgss/branding/581-logo-4.png"}
                alt={config.organizationName}
                className="h-12 w-auto object-contain max-h-12 max-w-[175px]"
              />
            </div>

            {/* Center: Legal & Statutory Identity */}
            <div className="text-center px-2">
              <p className={`text-[11.5px] font-extrabold uppercase tracking-[.18em] ${palette.headingAccent} leading-tight whitespace-nowrap`}>
                {config.organizationName || "Bisnouli Sarvodaya Gramodyog Sewa Sansthan"}
              </p>
              <p className="mt-1 text-[9.5px] text-ink-muted leading-tight font-medium whitespace-nowrap">
                {config.legalRegText || "Registered under the Societies Registration Act XXI of 1860 (Registration No. S-26792/1994)"}
              </p>
              <p className="mt-0.5 text-[9.5px] text-ink-muted leading-tight whitespace-nowrap">
                NITI Aayog NGO Darpan: <strong className="text-ink font-semibold">{config.darpanId || "DL/2016/0111645"}</strong> • {config.exemptionsText || "Tax Exemptions under 12A & 80G"}
              </p>
              <p className="mt-0.5 text-[9px] text-ink-subtle leading-tight whitespace-nowrap">
                {config.officeAddressText || "Head Office: B-180, Sector–31, Noida – 201301, U.P. | Tel: 011-46548002/03 | bsgssindia@yahoo.co.in"}
              </p>
            </div>

            {/* Right: Certificate Meta Badge */}
            <div className="shrink-0 text-right">
              <div className={`inline-block rounded-lg border ${palette.metaBadgeBorder} bg-sand-50/80 px-3 py-1.5 text-right shadow-2xs`}>
                <span className={`block text-[8.5px] uppercase font-bold tracking-wider ${palette.subAccent}`}>
                  Receipt Number
                </span>
                <span className={`font-mono text-xs sm:text-sm font-bold whitespace-nowrap ${palette.metaNumber}`}>
                  {displayReceiptNumber}
                </span>
                <span className="block text-[8.5px] text-ink-muted mt-0.5 whitespace-nowrap">
                  Date: <strong className="text-ink">{displayDate}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* 2. Certificate Title Ribbon */}
          <div
            className={`mt-4 text-center transition rounded-lg ${
              activeFocusSection === "wording" ? "ring-2 ring-brand-500/50 bg-brand-50/20 p-2" : ""
            }`}
          >
            <h1 className={`${fontTitleClass} text-xl sm:text-2xl uppercase tracking-wider text-ink leading-tight`}>
              {config.certificateTitle || "Donation Acknowledgement Certificate"}
            </h1>
            <p className={`mt-0.5 text-[11px] font-medium italic ${palette.subAccent}`}>
              {config.certificateSubtitle || "Official Receipt Issued for Voluntary Support Towards Social & Community Welfare"}
            </p>
          </div>

          {/* 3. Citation & Donor Highlight */}
          <div className="mt-3 text-center">
            <p className="text-xs text-ink-muted leading-relaxed">
              {config.appreciationText || "This certifies with deepest appreciation and heartfelt gratitude that a voluntary contribution has been generously received from"}
            </p>

            <h2 className={`mt-1.5 ${fontDonorClass} text-2xl sm:text-3xl ${palette.donor} tracking-tight`}>
              {sampleDonorName}
            </h2>

            <p className="mx-auto mt-1.5 max-w-2xl text-[11px] text-ink-muted leading-relaxed">
              {config.causeText || "towards advancing rural healthcare clinics, women's vocational skill training, education, and community self-reliance initiatives across underprivileged regions."}
            </p>
          </div>

          {/* 4. Contribution Details Box (Horizontal Split - Clean without UPI/Ref) */}
          <div className={`mt-3.5 rounded-xl border ${palette.boxBorder} ${palette.boxBg} p-3.5`}>
            <div className="grid grid-cols-[1.3fr_1fr] gap-4 items-center">
              {/* Left: Amount Highlight */}
              <div className={`text-left border-r ${palette.boxDivider} pr-4`}>
                <span className={`text-[9.5px] uppercase font-bold tracking-wider ${palette.subAccent}`}>
                  Contribution Received
                </span>
                <div className="mt-0.5 flex items-baseline gap-2.5">
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
              <div className="flex flex-col items-end justify-center text-right space-y-1">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 border border-emerald-200 shadow-2xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Statutory Banking Reconciled &amp; Approved</span>
                </div>
                <p className="text-[9.5px] text-ink-muted">
                  Voluntary donation recognized under Section 80G &amp; 12A of the Income Tax Act
                </p>
              </div>
            </div>
          </div>

          {/* 5. Bottom Formal Signatory & Authentication (Horizontal 3-Part Grid) */}
          <div className={`mt-4 grid grid-cols-[auto_1fr_auto] items-end gap-4 border-t ${palette.headerBorder} pt-3.5`}>
            {/* Left: Official Circular Rosette Seal */}
            <div
              className={`shrink-0 flex items-center gap-3 transition rounded-lg ${
                activeFocusSection === "seal" ? "ring-2 ring-brand-500/50 bg-brand-50/20 p-1" : ""
              }`}
            >
              <CertificateSeal
                sealTitle={config.sealTitle}
                sealEstd={config.sealEstd}
                sealRegNo={config.sealRegNo}
                sealBadges={config.sealBadges}
                stampUrl={config.stampUrl}
                showDefaultSealSvg={config.showDefaultSealSvg}
                colorClass={palette.sealText}
              />
              <div className="text-[9px] text-ink-muted leading-tight">
                <p className={`font-bold uppercase ${palette.sealBadge}`}>Statutory Seal</p>
                <p>Registered Voluntary Body</p>
                <p>{config.sealEstd || "ESTD. 1994"}, New Delhi</p>
              </div>
            </div>

            {/* Center: Legal Record Digital Authenticity */}
            <div className="text-center px-2">
              <div className={`inline-flex items-center gap-1.5 text-[10.5px] font-semibold ${palette.sealBadge}`}>
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-current opacity-90" />
                <span>Official Digital Acknowledgement Record</span>
              </div>
              <p className="mt-0.5 text-[9px] text-ink-muted leading-tight max-w-sm mx-auto">
                Issued under the authority of BSGSS Executive Committee. Authenticity verifiable online at <strong className="text-ink">bisnoulisansthan.in</strong>.
              </p>
            </div>

            {/* Right: Authorized Handwritten Signature */}
            <div
              className={`shrink-0 text-right transition rounded-lg ${
                activeFocusSection === "signatory" ? "ring-2 ring-brand-500/50 bg-brand-50/20 p-1" : ""
              }`}
            >
              <CertificateSignature
                name={config.signatoryName}
                role={config.signatoryRole}
                organization={config.organizationName}
                signatureUrl={config.signatureUrl}
                showDefaultSignatureSvg={config.showDefaultSignatureSvg}
                accentColorClass={palette.sealBadge}
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

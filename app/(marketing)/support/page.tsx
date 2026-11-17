import type { Metadata } from "next";
import { Heart, Mail, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { BankDetailsCard } from "@/components/support/BankDetailsCard";
import { DonationVerificationForm } from "@/components/support/DonationVerificationForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FaqSection } from "@/components/seo/FaqSection";
import { content, links } from "@/config/content";
import { buildMetadata, type FaqItem } from "@/lib/seo";

const SUPPORT_FAQS: FaqItem[] = [
  {
    question: "Are donations to BSGSS eligible for Section 80G tax deduction?",
    answer:
      "Yes. Bisnouli Sarvodaya Gramodyog Sewa Sansthan (BSGSS) is registered under Section 12A and Section 80G of the Income Tax Act, 1961. Donors receive an official 80G acknowledgement certificate and Form 10BE compliance support.",
  },
  {
    question: "How do I receive my official 80G donation receipt?",
    answer:
      "After completing your contribution via UPI, NEFT/RTGS, or online payment, submit your transaction reference and PAN details in the verification form on this page. Once verified, your digital certificate is emailed and verifiable online at bsgssindia.org.",
  },
  {
    question: "How does BSGSS allocate donated funds?",
    answer:
      "BSGSS maintains lean overheads: ₹88 (88%) goes directly to grassroots programmes (medicines, training kits, educators), ₹7 (7%) to field operations & auditing, and ₹5 (5%) to statutory & administrative compliance.",
  },
  {
    question: "Which states and communities does my contribution support?",
    answer:
      "Your contribution supports rural communities across 350+ villages in 7 states: Delhi NCR, Uttar Pradesh, Haryana, Punjab, Rajasthan, Chhattisgarh, and Uttarakhand.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Support Our Work | 80G Tax Exemption | BSGSS",
  description:
    "Support rural empowerment and healthcare with BSGSS. Donate securely via NEFT/RTGS or UPI with eligible Section 80G tax exemptions.",
  path: "/support",
});

export default function SupportPage() {
  const support = content.support;

  return (
    <>
      <PageHeader
        title={support.title}
        lead={support.lead}
        crumbs={[{ name: "Support us", path: links.support }]}
      />
      <div className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-14">
          <section className="grid gap-10 lg:grid-cols-[1fr_0.78fr]">
            <ScrollReveal direction="up" delay={40}>
              <div className="border-t-2 border-brand-850 pt-6">
                <Heart className="h-6 w-6 text-ink" />
                <p className="mt-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
                  {support.eyebrow}
                </p>
                <h2 className="mt-2 max-w-2xl font-display text-2xl font-bold leading-tight text-ink sm:text-3xl lg:text-4xl">
                  {support.heading}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  {support.text}
                </p>

                {/* Unified All-in-One Donation & 80G Statutory Form */}
                <DonationVerificationForm />
              </div>
            </ScrollReveal>

            <aside className="space-y-6">
              <ScrollReveal direction="scale" delay={100}>
                {/* Instant 0% MDR UPI Donation */}
                <div className="border-t-2 border-brand-850 pt-6 text-center rounded-2xl border border-line bg-sand-50/40 p-5">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>0% Transaction Fee • Direct UPI</span>
                  </div>
                  <h3 className="mt-3 text-base sm:text-lg font-bold text-ink">
                    {support.upiEyebrow}
                  </h3>
                  <div className="relative mx-auto mt-3 w-full max-w-[17rem] overflow-hidden rounded-xl border border-line bg-white p-2.5 shadow-2xs">
                    <img
                      src={support.qrImage}
                      alt="BSGSS UPI donation QR code"
                      className="mx-auto w-full rounded-lg"
                    />
                  </div>
                  <p className="mt-3 text-xs font-semibold text-ink sm:text-sm">{support.upiText}</p>
                  <p className="mt-1 text-xs font-mono font-bold text-brand-800">
                    UPI ID: bsgssindia@yahoo.co.in
                  </p>
                </div>

                {/* Official Bank Transfer Details */}
                <div className="mt-6">
                  <BankDetailsCard
                    bankTitle={support.bankTitle}
                    bankName={support.bankName}
                    branchName={support.branchName}
                    accountName={support.accountName}
                    accountNumber={support.accountNumber}
                    accountType={support.accountType}
                    ifsc={support.ifsc}
                  />
                </div>

                <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-line bg-white p-4 text-left">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                  <p className="text-xs leading-relaxed text-ink-muted">{support.assurance}</p>
                </div>

                <a
                  href="mailto:bsgssindia@yahoo.co.in?subject=Support%20BSGSS"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-700 bg-white px-5 py-2.5 text-xs font-semibold text-brand-800 shadow-2xs transition hover:bg-brand-50 sm:text-sm"
                >
                  <Mail className="h-4 w-4 text-brand-700" />
                  <span>{support.contactCta}</span>
                </a>
              </ScrollReveal>
            </aside>
          </section>

          <FaqSection
            heading="80G tax exemption, receipts & fund transparency"
            items={SUPPORT_FAQS}
          />
        </div>
      </div>
    </>
  );
}

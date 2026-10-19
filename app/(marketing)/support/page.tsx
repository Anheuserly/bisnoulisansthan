import type { Metadata } from "next";
import { Heart, Mail, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { BankDetailsCard } from "@/components/support/BankDetailsCard";
import { DonationVerificationForm } from "@/components/support/DonationVerificationForm";
import { RupeeAllocationBreakdown } from "@/components/transparency/RupeeAllocationBreakdown";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { content, links } from "@/config/content";
import { buildMetadata } from "@/lib/seo";

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


                <div className="mt-10">
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

                <a
                  href="mailto:bsgssindia@yahoo.co.in?subject=Support%20BSGSS"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
                >
                  <Mail className="h-4 w-4" />
                  <span>{support.contactCta}</span>
                </a>
                <DonationVerificationForm />
              </div>
            </ScrollReveal>

            <aside>
              <ScrollReveal direction="scale" delay={100}>
                <div className="border-t-2 border-brand-850 pt-6 text-center">
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
                    {support.upiEyebrow}
                  </p>
                  <div className="relative mx-auto mt-4 w-full max-w-[18rem] overflow-hidden rounded-xl border border-line bg-white p-2">
                    <img
                      src={support.qrImage}
                      alt="BSGSS UPI donation QR code"
                      className="mx-auto w-full rounded-lg"
                    />
                  </div>
                  <p className="mt-4 text-xs font-semibold text-ink sm:text-sm">{support.upiText}</p>
                  <div className="mt-5 flex items-start gap-2.5 border-t border-line/60 pt-4 text-left">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                    <p className="text-xs leading-relaxed text-ink-muted">{support.assurance}</p>
                  </div>
                </div>
              </ScrollReveal>
            </aside>
          </section>

          {/* Fund Efficiency Breakdown: Where Every ₹100 Goes */}
          <ScrollReveal direction="up" delay={80}>
            <RupeeAllocationBreakdown />
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}

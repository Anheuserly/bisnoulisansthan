import type { Metadata } from "next";
import { Heart, Mail, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { BankDetailsCard } from "@/components/support/BankDetailsCard";
import { DonationVerificationForm } from "@/components/support/DonationVerificationForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { content, links } from "@/config/content";

export const metadata: Metadata = {
  title: content.support.metadataTitle,
  description: "Support BSGSS community development work through bank transfer or UPI.",
};

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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <section className="grid gap-8 lg:grid-cols-[1fr_0.78fr]">
            <ScrollReveal direction="up" delay={40}>
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 shadow-2xs">
                  <Heart className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-700">
                  {support.eyebrow}
                </p>
                <h2 className="mt-1 max-w-2xl font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {support.heading}
                </h2>
                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                  {support.text}
                </p>

                <BankDetailsCard
                  bankTitle={support.bankTitle}
                  bankName={support.bankName}
                  branchName={support.branchName}
                  accountName={support.accountName}
                  accountNumber={support.accountNumber}
                  accountType={support.accountType}
                  ifsc={support.ifsc}
                />

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
                <div className="rounded-2xl border border-brand-200/80 bg-sand-50/80 p-5 sm:p-6 text-center shadow-2xs">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                    {support.upiEyebrow}
                  </p>
                  <div className="relative mx-auto mt-4 w-full max-w-[18rem] overflow-hidden rounded-xl border-2 border-white bg-white p-2 shadow-sm">
                    <img
                      src={support.qrImage}
                      alt="BSGSS UPI donation QR code"
                      className="mx-auto w-full rounded-lg"
                    />
                  </div>
                  <p className="mt-4 text-xs font-semibold text-ink sm:text-sm">{support.upiText}</p>
                  <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-brand-100 bg-white p-4 text-left shadow-2xs">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                    <p className="text-xs leading-relaxed text-ink-muted">{support.assurance}</p>
                  </div>
                </div>
              </ScrollReveal>
            </aside>
          </section>
        </div>
      </div>
    </>
  );
}

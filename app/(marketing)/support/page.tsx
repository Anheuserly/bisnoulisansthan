import type { Metadata } from "next";
import { Heart, Landmark, Mail, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { DonationVerificationForm } from "@/components/support/DonationVerificationForm";
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
      <div className="pt-6 pb-14 sm:pt-8 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <section className="grid gap-8 lg:grid-cols-[1fr_0.78fr]">
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

              <div className="mt-6 overflow-hidden rounded-xl border border-brand-200/80 bg-white shadow-2xs">
                <div className="flex items-center gap-2.5 border-b border-brand-100 bg-sand-50/80 px-4 py-3">
                  <Landmark className="h-4 w-4 text-brand-700" />
                  <h3 className="font-display text-sm font-bold text-ink sm:text-base">
                    {support.bankTitle}
                  </h3>
                </div>
                <dl className="text-xs sm:text-sm">
                  <div className="grid gap-1 border-b border-line px-4 py-3 sm:grid-cols-[11rem_1fr]">
                    <dt className="font-semibold text-ink">Account name</dt>
                    <dd className="text-ink-muted">{support.accountName}</dd>
                  </div>
                  <div className="grid gap-1 border-b border-line px-4 py-3 sm:grid-cols-[11rem_1fr]">
                    <dt className="font-semibold text-ink">Current account no.</dt>
                    <dd className="font-mono font-medium text-ink-muted">{support.accountNumber}</dd>
                  </div>
                  <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr]">
                    <dt className="font-semibold text-ink">IFSC code</dt>
                    <dd className="font-mono font-medium text-ink-muted">{support.ifsc}</dd>
                  </div>
                </dl>
              </div>

              <a
                href="mailto:bsgssindia@yahoo.co.in?subject=Support%20BSGSS"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
              >
                <Mail className="h-4 w-4" />
                {support.contactCta}
              </a>
              <DonationVerificationForm />
            </div>

            <aside className="rounded-2xl border border-brand-200/80 bg-sand-50/80 p-5 sm:p-6 text-center shadow-2xs">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                {support.upiEyebrow}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={support.qrImage}
                alt="BSGSS UPI donation QR code"
                className="mx-auto mt-4 w-full max-w-[18rem] rounded-xl border border-line bg-white shadow-2xs"
              />
              <p className="mt-4 text-xs font-semibold text-ink sm:text-sm">{support.upiText}</p>
              <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-brand-100 bg-white p-3.5 text-left shadow-2xs">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                <p className="text-xs leading-relaxed text-ink-muted">{support.assurance}</p>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </>
  );
}

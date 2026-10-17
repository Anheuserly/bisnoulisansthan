import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, HeartHandshake, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { HomeManagementSection } from "@/components/home/HomeManagementSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Message from the Management | BSGSS",
  description: "Leadership addresses, vision, and core values of Bisnouli Sarvodaya Gramodyog Sewa Sansthan.",
};

export default function ManagementPage() {
  return (
    <>
      <PageHeader
        title="Message from the Management"
        lead="The values, institutional vision, and grassroots purpose guiding BSGSS service with communities since 1994."
        crumbs={[
          { name: "About", path: "/about" },
          { name: "Management", path: "/management" },
        ]}
      />
      <div>
        <div className="pt-6 pb-4 sm:pt-8 sm:pb-6">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
            <ScrollReveal direction="up" delay={40}>
              <section className="design-card rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 to-brand-50/60 p-6 sm:p-8 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-700 shadow-2xs">
                    <HeartHandshake className="h-6 w-6" />
                  </span>
                  <div className="flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/90 px-3 py-1 text-xs font-semibold text-brand-800 shadow-2xs">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Statutory Board of Governance</span>
                  </div>
                </div>
                <h2 className="mt-4 max-w-3xl font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                  Leadership that keeps people, dignity, and practical progress at the centre.
                </h2>
                <p className="mt-2.5 max-w-3xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                  The BSGSS leadership vision is rooted in equal opportunity and community participation, shaping programmes in healthcare, education, livelihoods and women’s empowerment.
                </p>
              </section>
            </ScrollReveal>
          </div>
        </div>

        {/* Master Leadership Component with Interactive Address Modals & Highlights */}
        <HomeManagementSection />

        <div className="pb-14 sm:pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
            <ScrollReveal direction="up" delay={40}>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <p className="max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                  Learn more about the programmes that turn this vision into practical, daily support for communities.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/about/legal-status"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-xs font-semibold text-brand-700 shadow-2xs transition hover:bg-brand-50 sm:text-sm"
                  >
                    <span>View Legal Transparency</span>
                  </Link>
                  <Link
                    href="/our-work"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
                  >
                    <span>Explore our work</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </>
  );
}

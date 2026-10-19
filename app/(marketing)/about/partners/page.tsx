import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Download, Handshake, Landmark } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PartnersSection } from "@/components/partners/PartnersSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { partners } from "@/components/partners/partners-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "CSR & Institutional Partners Directory | BSGSS",
  description:
    "Browse 30+ public sector enterprises and government departments partnered with BSGSS for impactful community development.",
  path: "/about/partners",
});

const governmentPartners = [
  "Ministry of Women & Child Development, Govt. of India",
  "Rashtriya Mahila Kosh, Ministry of Women & Child Development, Govt. of India",
  "Office of the Development Commissioner (Handicrafts), Ministry of Textiles, Govt. of India",
  "Ministry of Youth Affairs & Sports, Govt. of India",
  "National Horticultural Board, Ministry of Agriculture, Govt. of India",
  "Department of Secondary & Higher Education, EHV Cell, Ministry of HRD",
  "Municipal Corporation of Delhi, Govt. of NCT of Delhi",
  "Delhi Social Welfare Advisory Board, Govt. of NCT of Delhi",
  "Delhi SC/ST/OBC/Minority/Handicapped/Financial Development Corporation, Govt. of NCT of Delhi",
  "Gender Resource Centre, Department of Social Welfare, Govt. of NCT of Delhi",
  "The Transport Department, Govt. of NCT of Delhi",
  "Welfare for Scheduled Caste & Backward Classes, Govt. of Punjab",
];

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        title="Our partners"
        lead="Recognising the institutions and enterprises that have supported BSGSS social-development work through the years."
        crumbs={[
          { name: "About", path: "/about" },
          { name: "Our partners", path: "/about/partners" },
        ]}
      />
      <PartnersSection />
      <div className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <ScrollReveal direction="up" delay={40}>
            <section className="border-t-2 border-brand-850 pt-6 text-ink sm:flex sm:items-center sm:justify-between sm:gap-8">
              <div>
                <div className="flex items-center gap-2 text-brand-700">
                  <Handshake className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-800">CSR & Statutory Alliances</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                  Partners in social development
                </h2>
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                  Select a CSR partner to see the BSGSS programme focus and locations recorded for that relationship. Names are transcribed from BSGSS&apos;s supplied funding-partners document, revised 08 July 2024.
                </p>
              </div>
              <a
                href="/documents/bsgss-funding-partners-2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:mt-0 sm:text-sm"
              >
                <Download className="h-4 w-4" />
                <span>Download source PDF</span>
              </a>
            </section>
          </ScrollReveal>

          <PartnerDirectory />
          <PartnerList title="Government partners" items={governmentPartners} />
        </div>
      </div>
    </>
  );
}

function PartnerDirectory() {
  return (
    <section className="mt-12 sm:mt-14">
      <ScrollReveal direction="up" delay={40}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-line pb-3">
          <div>
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">CSR partners</h2>
            <p className="mt-1 text-xs text-ink-muted sm:text-sm">Every partner link opens its dedicated statutory partnership profile.</p>
          </div>
          <p className="text-xs font-semibold text-ink-muted">
            {partners.length} verified partner profiles
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner, idx) => (
          <ScrollReveal key={partner.id} staggerIndex={idx % 6} direction="up">
            <Link
              href={partner.href}
              className="group flex min-h-12 items-center justify-between gap-4 border-t border-line/70 py-3 text-xs sm:text-sm font-semibold text-ink transition-colors hover:text-brand-800"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Building2 className="h-4 w-4 shrink-0 text-brand-600 transition group-hover:scale-110" />
                <span className="truncate">{partner.name}</span>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand-700 transition group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function PartnerList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-12 sm:mt-14">
      <ScrollReveal direction="up" delay={40}>
        <div className="border-b border-line pb-3">
          <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">{title}</h2>
          <p className="mt-1 text-xs text-ink-muted sm:text-sm">Public sector ministries, commissions, and civic departments.</p>
        </div>
      </ScrollReveal>

      <div className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((partner, idx) => (
          <ScrollReveal key={partner} staggerIndex={idx % 6} direction="up">
            <div
              className="flex min-h-12 items-center gap-2.5 border-t border-line/70 py-3 text-xs sm:text-sm font-medium text-ink"
            >
              <Landmark className="h-4 w-4 shrink-0 text-brand-600" />
              <span>{partner}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

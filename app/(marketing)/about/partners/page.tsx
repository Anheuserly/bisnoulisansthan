import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Handshake } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PartnersSection } from "@/components/partners/PartnersSection";
import { partners } from "@/components/partners/partners-data";

export const metadata: Metadata = {
  title: "Our Partners",
  description: "BSGSS partners in social development through the years.",
};

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
        lead="Recognising the institutions that have supported BSGSS social-development work through the years."
        crumbs={[
          { name: "About", path: "/about" },
          { name: "Our partners", path: "/about/partners" },
        ]}
      />
      <PartnersSection />
      <div className="pt-5 pb-10 sm:pt-6 sm:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          {/* Light Card Replacing Previous Dark Card */}
          <section className="rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 to-brand-50/60 p-6 sm:p-8 text-ink sm:flex sm:items-center sm:justify-between sm:gap-8 shadow-2xs">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-700 shadow-2xs">
                <Handshake className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-display text-xl font-bold text-ink sm:text-2xl">
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
              className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:mt-0 sm:text-sm"
            >
              <Download className="h-4 w-4" />
              Download source PDF
            </a>
          </section>

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
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-line pb-3">
        <div>
          <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">CSR partners</h2>
          <p className="mt-1 text-xs text-ink-muted sm:text-sm">Every card opens its dedicated partnership profile.</p>
        </div>
        <p className="text-xs font-semibold text-brand-700">{partners.length} partner profiles</p>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <Link
            key={partner.id}
            href={partner.href}
            className="group flex min-h-16 items-center justify-between gap-4 rounded-xl border border-line bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-ink shadow-2xs transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
          >
            <span>{partner.name}</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-brand-700 transition group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function PartnerList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-12 sm:mt-14">
      <div className="border-b border-line pb-3">
        <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">{title}</h2>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((partner) => (
          <div
            key={partner}
            className="flex min-h-16 items-center rounded-xl border border-line bg-white px-4 py-3 text-xs sm:text-sm font-semibold text-ink shadow-2xs"
          >
            {partner}
          </div>
        ))}
      </div>
    </section>
  );
}

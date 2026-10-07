import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, Handshake, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { getPartner, partners } from "@/components/partners/partners-data";

type PageProps = { params: Promise<{ partner: string }> };

export function generateStaticParams() {
  return partners.map(({ id }) => ({ partner: id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { partner: partnerId } = await params;
  const partner = getPartner(partnerId);
  if (!partner) return { title: "Partner not found" };

  return {
    title: `${partner.name} partnership`,
    description: `BSGSS partnership profile for ${partner.name}.`,
  };
}

export default async function PartnerStoryPage({ params }: PageProps) {
  const { partner: partnerId } = await params;
  const partner = getPartner(partnerId);
  if (!partner) notFound();

  const hasProgrammeDetail = partner.focusAreas.length > 0 || partner.locations.length > 0;

  return (
    <>
      <PageHeader
        title={`${partner.name} & BSGSS`}
        lead="A partnership profile drawn from BSGSS public organisation records."
        crumbs={[
          { name: "About", path: "/about" },
          { name: "Our partners", path: "/about/partners" },
          { name: partner.name, path: partner.href },
        ]}
      />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Link href="/about/partners" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-900">
            <ArrowLeft className="h-4 w-4" /> All partners
          </Link>

          <section className="mt-6 grid overflow-hidden rounded-2xl border border-line bg-sand-50 md:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="p-7 sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Partnership profile</p>
              <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">Working together for stronger communities.</h1>
              <p className="mt-5 max-w-2xl leading-relaxed text-ink-muted">
                {hasProgrammeDetail
                  ? `BSGSS records ${partner.name} in connection with ${partner.focusAreas.map((area) => area.toLowerCase()).join(" and ")} programmes.`
                  : `${partner.name} is recognised in BSGSS's public funding-partners record.`}
              </p>
            </div>
            <div className="relative min-h-52 border-t border-line bg-white md:border-l md:border-t-0">
              <Image src={partner.logo} alt={partner.alt} fill sizes="(min-width: 768px) 20rem, 100vw" className="object-contain p-10" priority />
            </div>
          </section>

          {hasProgrammeDetail ? (
            <section className="mt-14 grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">What we worked on</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-ink">Partnership focus</h2>
                <div className="mt-6 grid gap-3">
                  {partner.focusAreas.map((focus) => (
                    <div key={focus} className="flex items-center gap-3 rounded-xl border border-line bg-white p-5 shadow-sm">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"><Handshake className="h-5 w-5" /></span>
                      <p className="font-semibold text-ink">{focus}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Where the work is recorded</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-ink">Programme locations</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {partner.locations.map((location) => (
                    <div key={location} className="flex min-h-20 items-center gap-3 rounded-xl border border-line bg-white p-5 shadow-sm">
                      <MapPin className="h-5 w-5 shrink-0 text-brand-700" />
                      <p className="text-sm font-semibold text-ink">{location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section className="mt-14 rounded-2xl border border-line bg-white p-7 sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Public record</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink">A recognised BSGSS funding partner</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink-muted">The public funding-partners document confirms this relationship. The available summary does not name a programme or location for this partner, so those details are intentionally not inferred here.</p>
            </section>
          )}

          <section className="mt-14 grid gap-7 rounded-2xl bg-brand-900 p-7 text-white sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-200">Source and transparency</p>
              <h2 className="mt-3 font-display text-2xl font-bold !text-white">Read the BSGSS partnership record.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-100">Programme and location information on this page is transcribed from BSGSS&apos;s public legal-status summary. The partner acknowledgement appears in the funding-partners document revised 08 July 2024.</p>
            </div>
            <a href="/documents/bsgss-funding-partners-2024.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-brand-900 transition hover:bg-sand-100"><Download className="h-4 w-4" /> View source PDF</a>
          </section>

          <section className="mt-14 flex flex-col gap-5 rounded-2xl border border-line bg-brand-50 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div><h2 className="font-display text-2xl font-bold text-ink">Interested in partnering with BSGSS?</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">Connect with the team to explore a responsible, community-centred partnership.</p></div>
            <Link href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-brand-700 px-5 py-3 font-semibold text-white transition hover:bg-brand-900">Talk to BSGSS <ArrowRight className="h-4 w-4" /></Link>
          </section>
        </div>
      </main>
    </>
  );
}

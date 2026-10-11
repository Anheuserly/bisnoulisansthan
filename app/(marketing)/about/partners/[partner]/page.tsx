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

      <div className="pt-6 pb-14 sm:pt-8 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <Link
            href="/about/partners"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 transition hover:text-brand-900 sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> All partners
          </Link>

          <section className="mt-5 grid overflow-hidden rounded-2xl border border-line bg-sand-50/70 shadow-2xs md:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Partnership profile</p>
              <h1 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                Working together for stronger communities.
              </h1>
              <p className="mt-3 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                {hasProgrammeDetail
                  ? `BSGSS records ${partner.name} in connection with ${partner.focusAreas.map((area) => area.toLowerCase()).join(" and ")} programmes.`
                  : `${partner.name} is recognised in BSGSS's public funding-partners record.`}
              </p>
            </div>
            <div className="relative min-h-44 border-t border-line bg-white md:border-l md:border-t-0">
              <Image
                src={partner.logo}
                alt={partner.alt}
                fill
                sizes="(min-width: 768px) 18rem, 100vw"
                className="object-contain p-8"
                priority
              />
            </div>
          </section>

          {hasProgrammeDetail ? (
            <section className="mt-10 sm:mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">What we worked on</p>
                <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">Partnership focus</h2>
                <div className="mt-5 grid gap-3">
                  {partner.focusAreas.map((focus) => (
                    <div
                      key={focus}
                      className="flex items-center gap-3 rounded-xl border border-line bg-white p-4 shadow-2xs"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                        <Handshake className="h-4 w-4" />
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-ink">{focus}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Where the work is recorded</p>
                <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">Programme locations</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {partner.locations.map((location) => (
                    <div
                      key={location}
                      className="flex min-h-16 items-center gap-3 rounded-xl border border-line bg-white p-4 shadow-2xs"
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-brand-700" />
                      <p className="text-xs sm:text-sm font-semibold text-ink">{location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section className="mt-10 sm:mt-12 rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-2xs">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Public record</p>
              <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">A recognised BSGSS funding partner</h2>
              <p className="mt-3 max-w-3xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                The public funding-partners document confirms this relationship. The available summary does not name a programme or location for this partner, so those details are intentionally not inferred here.
              </p>
            </section>
          )}

          {/* Light Card Replacing Previous Dark Card */}
          <section className="mt-10 sm:mt-12 grid gap-6 rounded-2xl border border-brand-200/80 bg-sand-50/80 p-6 sm:p-8 text-ink shadow-2xs md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Source and transparency</p>
              <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
                Read the BSGSS partnership record.
              </h2>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                Programme and location information on this page is transcribed from BSGSS&apos;s public legal-status summary. The partner acknowledgement appears in the funding-partners document revised 08 July 2024.
              </p>
            </div>
            <a
              href="/documents/bsgss-funding-partners-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
            >
              <Download className="h-4 w-4" /> View source PDF
            </a>
          </section>

          <section className="mt-8 flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 shadow-2xs">
            <div>
              <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
                Interested in partnering with BSGSS?
              </h2>
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                Connect with the team to explore a responsible, community-centred partnership.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
            >
              Talk to BSGSS <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { ExternalLink, Eye, Newspaper, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { content, links } from "@/config/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Press Coverage & Media Archives | BSGSS",
  description:
    "Read print journalism records, newspaper reports, and media coverage spotlighting BSGSS grassroots social initiatives.",
  path: "/activities/work-in-media",
});

export default function WorkInMediaPage() {
  const { media, clippings } = content.activities;

  return (
    <>
      <PageHeader
        title={media.title}
        lead={media.lead}
        crumbs={[
          { name: "Activities", path: links.activities },
          { name: "Work in media", path: links.media },
        ]}
      />
      <div className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <ScrollReveal direction="up" delay={40}>
            <section className="border-t-2 border-brand-850 pt-6">
              <div className="flex items-center gap-2 text-brand-700 mb-2">
                <Newspaper className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-800">{media.eyebrow}</span>
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">{media.heading}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted">{media.text}</p>
            </section>
          </ScrollReveal>

          <section className="mt-12 sm:mt-16">
            <ScrollReveal direction="up" delay={40}>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{media.archiveEyebrow}</p>
                  <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">{media.archiveHeading}</h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-850">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>{clippings.length} Verified Press Records</span>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {clippings.map((clipping, idx) => (
                <ScrollReveal key={clipping.image} staggerIndex={idx % 6} direction="up">
                  <a
                    href={`/images/bsgss/gallery-community/${clipping.image}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col border-t-2 border-brand-850 pt-4"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand-100">
                      <img
                        src={`/images/bsgss/gallery-community/${clipping.image}`}
                        alt={`${clipping.outlet}: ${clipping.title}`}
                        className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-900 shadow-md">
                          <Eye className="h-3.5 w-3.5" />
                          <span>View Full Clipping</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between pt-4">
                      <div>
                        <span className="rounded-full bg-sand-100 px-2.5 py-0.5 text-[0.6875rem] font-bold text-brand-800">
                          {clipping.outlet}
                        </span>
                        <h3 className="mt-2.5 font-display text-base font-bold text-ink group-hover:text-brand-800">
                          {clipping.title}
                        </h3>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-xs font-semibold text-brand-700">
                        <span>Open Archive Original</span>
                        <ExternalLink className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

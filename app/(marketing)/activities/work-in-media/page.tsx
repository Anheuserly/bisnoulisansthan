import type { Metadata } from "next";
import { ExternalLink, Newspaper } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { content, links } from "@/config/content";

export const metadata: Metadata = {
  title: content.activities.media.metadataTitle,
  description: content.activities.media.lead,
};

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
      <div className="pt-5 pb-10 sm:pt-6 sm:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <section className="grid gap-6 rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 to-brand-50/60 p-6 sm:grid-cols-[auto_1fr] sm:p-8 shadow-2xs">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-700 shadow-2xs">
              <Newspaper className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{media.eyebrow}</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">{media.heading}</h2>
              <p className="mt-3 max-w-3xl text-xs leading-relaxed text-ink-muted sm:text-sm">{media.text}</p>
            </div>
          </section>

          <section className="mt-12 sm:mt-14">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{media.archiveEyebrow}</p>
                <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">{media.archiveHeading}</h2>
              </div>
              <p className="text-xs text-ink-muted">{clippings.length} press records</p>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {clippings.map((clipping) => (
                <a
                  key={clipping.image}
                  href={`/images/bsgss/gallery-community/${clipping.image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-xl border border-line bg-white shadow-2xs transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-sand-50">
                    <img
                      src={`/images/bsgss/gallery-community/${clipping.image}`}
                      alt={`${clipping.outlet}: ${clipping.title}`}
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
                    <div>
                      <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-brand-700">{clipping.outlet}</p>
                      <h3 className="mt-1.5 font-display text-base font-bold text-ink group-hover:text-brand-800">{clipping.title}</h3>
                    </div>
                    <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-700" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

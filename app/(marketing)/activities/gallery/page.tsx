import type { Metadata } from "next";
import { ExternalLink, Images } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { content, links } from "@/config/content";

export const metadata: Metadata = {
  title: content.activities.photoGallery.metadataTitle,
  description: content.activities.photoGallery.lead,
};

export default function GalleryPage() {
  const gallery = content.activities.photoGallery;

  return <>
    <PageHeader title={gallery.title} lead={gallery.lead} crumbs={[{ name: "Activities", path: links.activities }, { name: "Photo gallery", path: links.gallery }]} />
    <div className="pt-6 pb-14 sm:pt-8 sm:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <section className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-brand-200/80 bg-sand-50/80 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-700 shadow-2xs">
              <Images className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-ink sm:text-xl">{gallery.images.length} photo moments</p>
              <p className="mt-0.5 text-xs text-ink-muted sm:text-sm">Community programmes, people and outreach captured by BSGSS.</p>
            </div>
          </div>
          <a
            href={gallery.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline sm:text-sm"
          >
            View source gallery <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </section>
        <section className="mt-8 sm:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.images.map((image, index) => (
            <a
              key={image.src}
              href={image.src}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border border-line bg-white shadow-2xs transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
            >
              <div className="aspect-square overflow-hidden bg-sand-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.title}
                  loading={index < 6 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="text-xs font-semibold text-ink sm:text-sm">{image.title}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-brand-700" />
              </div>
            </a>
          ))}
        </section>
      </div>
    </div>
  </>;
}

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
    <main className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <section className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:p-8">
          <div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-brand-700 shadow-sm"><Images className="h-6 w-6" /></span><div><p className="font-display text-xl font-bold text-ink">{gallery.images.length} photo moments</p><p className="mt-1 text-sm text-ink-muted">Community programmes, people and outreach captured by BSGSS.</p></div></div>
          <a href={gallery.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">View source gallery <ExternalLink className="h-4 w-4" /></a>
        </section>
        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.images.map((image, index) => <a key={image.src} href={image.src} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"><div className="aspect-square overflow-hidden bg-sand-50">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={image.src} alt={image.title} loading={index < 6 ? "eager" : "lazy"} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="flex items-center justify-between gap-3 px-5 py-4"><span className="text-sm font-semibold text-ink">{image.title}</span><ExternalLink className="h-4 w-4 shrink-0 text-brand-700" /></div></a>)}
        </section>
      </div>
    </main>
  </>;
}

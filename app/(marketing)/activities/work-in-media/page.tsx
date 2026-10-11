import type { Metadata } from "next";
import { ExternalLink, Newspaper } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Work in Media", description: "Public media clippings featuring BSGSS community activities and programmes." };

const clippings = [
  { image: "191-whatsapp-image-2025-10-09-at-15-55-32-c60ee022.jpg", outlet: "Dainik Bhaskar", title: "Cleanliness fortnight campaign in Noida" },
  { image: "192-whatsapp-image-2025-10-09-at-15-55-32-dd874b0a.jpg", outlet: "Veer Arjun", title: "Joint cleanliness campaign in Noida" },
  { image: "193-whatsapp-image-2025-10-09-at-15-55-33-3c50f567.jpg", outlet: "Jagat Kranti", title: "Free health camp in Bastar" },
  { image: "194-whatsapp-image-2025-10-09-at-15-55-33-532afc9f.jpg", outlet: "Media coverage", title: "BSGSS community programme" },
  { image: "196-whatsapp-image-2025-10-09-at-16-49-28-cc32c34a.jpg", outlet: "Media coverage", title: "Community outreach activity" },
  { image: "197-whatsapp-image-2025-10-09-at-16-49-29-e802fef2.jpg", outlet: "Media coverage", title: "BSGSS programme coverage" },
  { image: "199-whatsapp-image-2025-10-09-at-16-49-32-aab7df99.jpg", outlet: "Media coverage", title: "Community-development initiative" },
  { image: "201-whatsapp-image-2025-10-09-at-16-49-34-40e80876.jpg", outlet: "Media coverage", title: "Local community activity" },
  { image: "202-whatsapp-image-2025-10-09-at-16-49-35-5e1b9a12.jpg", outlet: "Media coverage", title: "BSGSS field work" },
  { image: "203-whatsapp-image-2025-10-09-at-16-49-35-618e38b6.jpg", outlet: "Media coverage", title: "Community support programme" },
  { image: "204-whatsapp-image-2025-10-09-at-16-49-35-fd267bae.jpg", outlet: "Media coverage", title: "Public-interest initiative" },
  { image: "205-whatsapp-image-2025-10-09-at-16-49-36-3cba5966.jpg", outlet: "Media coverage", title: "BSGSS in the media" },
  { image: "206-whatsapp-image-2025-10-09-at-16-49-36-d00f56ee.jpg", outlet: "Media coverage", title: "Community programme coverage" },
];

export default function WorkInMediaPage() {
  return <><PageHeader title="Work in Media" lead="A collection of public media clippings featuring BSGSS community activities, campaigns and health outreach." crumbs={[{ name: "Activities", path: "/activities" }, { name: "Work in media", path: "/activities/work-in-media" }]} /><main className="py-16 sm:py-24"><div className="mx-auto max-w-6xl px-5 md:px-8"><section className="grid gap-8 rounded-2xl border border-brand-200 bg-brand-50 p-7 sm:grid-cols-[auto_1fr] sm:p-10"><span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-brand-700 shadow-sm"><Newspaper className="h-7 w-7" /></span><div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Public coverage</p><h2 className="mt-3 font-display text-3xl font-bold text-ink">Community work, recognised in the public record.</h2><p className="mt-4 max-w-3xl leading-relaxed text-ink-muted">These source clippings document public coverage of BSGSS-supported activities. They include reporting on health outreach, cleanliness campaigns and local community programmes. Open any clipping to read it at full size.</p></div></section><section className="mt-16"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Media archive</p><h2 className="mt-3 font-display text-3xl font-bold text-ink">Selected press clippings</h2></div><p className="text-sm text-ink-muted">{clippings.length} items</p></div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{clippings.map((clipping) => <a key={clipping.image} href={`/images/bsgss/gallery-community/${clipping.image}`} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"><div className="aspect-[4/3] overflow-hidden bg-sand-50"><img src={`/images/bsgss/gallery-community/${clipping.image}`} alt={`${clipping.outlet}: ${clipping.title}`} className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" /></div><div className="flex items-start justify-between gap-4 p-5"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-brand-700">{clipping.outlet}</p><h3 className="mt-2 font-display text-lg font-bold text-ink">{clipping.title}</h3></div><ExternalLink className="mt-1 h-4 w-4 shrink-0 text-brand-700" /></div></a>)}</div></section></div></main></>;
}

import type { Metadata } from "next";
import { Youtube } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Video Gallery", description: "Watch BSGSS programme activities, community outreach and health camps." };

const videos = [
  { id: "_SNsmlEd_Cs", title: "RITES · J.A. Khora Colony" },
  { id: "PCewFDAH_js", title: "RITES · Khora community activity" },
  { id: "2G9Xs6SQt2M", title: "RITES · Hilalpur cancer camp" },
  { id: "C4B4k2lgheo", title: "RITES · Hilalpur community outreach" },
  { id: "_NJEaW31PMQ", title: "BSGSS programme highlights" },
];

export default function VideosPage() {
  return <><PageHeader title="Video Gallery" lead="Watch BSGSS community outreach, health camps and programme activities." crumbs={[{ name: "Activities", path: "/activities" }, { name: "Videos", path: "/activities/videos" }]} /><main className="py-16 sm:py-24"><div className="mx-auto max-w-6xl px-5 md:px-8"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Watch BSGSS in action</p><h2 className="mt-3 font-display text-3xl font-bold text-ink">Community stories, directly from the field.</h2></div><a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"><Youtube className="h-5 w-5" />Open YouTube</a></div><div className="mt-10 grid gap-7 md:grid-cols-2">{videos.map((video) => <article key={video.id} className="overflow-hidden rounded-xl border border-line bg-white shadow-sm"><div className="aspect-video bg-brand-900"><iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${video.id}`} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><h3 className="px-5 py-4 font-display text-lg font-semibold text-ink">{video.title}</h3></article>)}</div></div></main></>;
}

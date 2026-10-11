import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { VideoGallery } from "@/components/activities/VideoGallery";
import { content, links } from "@/config/content";
import { getChannelVideos } from "@/lib/youtube";

export const metadata: Metadata = { title: "Video Gallery", description: "Watch BSGSS programme activities, community outreach and health camps." };

export const revalidate = 300;

export default async function VideosPage() {
  const { videos: fallbackVideos, videoGallery } = content.activities;
  const videos = await getChannelVideos(fallbackVideos);
  return <><PageHeader title={videoGallery.title} lead={videoGallery.lead} crumbs={[{ name: "Activities", path: links.activities }, { name: "Videos", path: links.videos }]} /><main className="py-16 sm:py-24"><div className="mx-auto max-w-6xl px-5 md:px-8"><div className="mb-10"><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">{videoGallery.eyebrow}</p><h1 className="mt-3 font-display text-3xl font-bold text-ink">{videoGallery.heading}</h1></div><VideoGallery videos={videos} youtubeUrl={content.site.youtubeUrl} /></div></main></>;
}

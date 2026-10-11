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
  return (
    <>
      <PageHeader
        title={videoGallery.title}
        lead={videoGallery.lead}
        crumbs={[{ name: "Activities", path: links.activities }, { name: "Videos", path: links.videos }]}
      />
      <div className="pt-5 pb-10 sm:pt-6 sm:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{videoGallery.eyebrow}</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">{videoGallery.heading}</h2>
          </div>
          <VideoGallery videos={videos} youtubeUrl={content.site.youtubeUrl} />
        </div>
      </div>
    </>
  );
}

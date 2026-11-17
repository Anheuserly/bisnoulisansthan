import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { VideoGallery } from "@/components/activities/VideoGallery";
import { content, links } from "@/config/content";
import { getChannelVideos } from "@/lib/youtube";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Video Archives & Field Films | BSGSS",
  description:
    "Watch documented field videos of BSGSS free oncology screening vans, women sewing clusters, and village development drives.",
  path: "/activities/videos",
});

export const revalidate = 300;

export default async function VideosPage() {
  const [customizer] = await Promise.all([getCustomizerSettings()]);
  const { videos: fallbackVideos, videoGallery } = content.activities;
  const videos = await getChannelVideos(fallbackVideos, customizer.videos);

  return (
    <>
      <PageHeader
        title={videoGallery.title}
        lead={videoGallery.lead}
        crumbs={[
          { name: "Activities", path: links.activities },
          { name: "Videos", path: links.videos },
        ]}
      />
      <div className="pt-5 pb-12 sm:pt-7 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <VideoGallery videos={videos} youtubeUrl={content.site.youtubeUrl} />
        </div>
      </div>
    </>
  );
}

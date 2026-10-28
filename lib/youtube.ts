import type { CustomizerVideoItem } from "@/config/customizer";

export type ChannelVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  category?: string;
  featured?: boolean;
};

export function extractYouTubeVideoId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match && match[1] ? match[1] : null;
}

const channelId = "UCjj3-e9Lq3KevXdjs_ebETg";
const channelUrl = "https://www.youtube.com/@BISNOULISANSTHAN/videos";
const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

const textIn = (entry: string, tag: string) =>
  entry.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1]?.trim() ?? "";

const decodeXml = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

/**
 * Fetches all public videos from the official BSGSS YouTube channel.
 *
 * 1. Scrapes the complete video list directly from YouTube's channel page
 *    (bypassing the RSS 15-video hard cap).
 * 2. Cross-references with the YouTube Atom feed for real-time fresh uploads.
 * 3. Revalidates every 5 minutes (300s) so new uploads appear automatically.
 * 4. Falls back to static video archive if network is unavailable.
 */
export async function getChannelVideos(
  fallback: readonly { id: string; title: string }[],
  customVideos?: CustomizerVideoItem[]
): Promise<ChannelVideo[]> {
  const videoMap = new Map<string, ChannelVideo>();
  const disabledIds = new Set<string>();

  // 1. If custom videos are provided from the database / customizer settings,
  // insert the enabled ones first so they appear at the top of the gallery!
  if (Array.isArray(customVideos) && customVideos.length > 0) {
    for (const cv of customVideos) {
      if (cv.enabled === false) {
        disabledIds.add(cv.id);
        continue;
      }
      if (cv.id) {
        videoMap.set(cv.id, {
          id: cv.id,
          title: cv.title || "BSGSS Field Video",
          publishedAt: cv.publishedAt || (cv.featured ? "Featured Document" : "Field Archive"),
          thumbnail: `https://i.ytimg.com/vi/${cv.id}/hqdefault.jpg`,
          category: cv.category || "Field Archive",
          featured: Boolean(cv.featured),
        });
      }
    }
  }

  // 2. Fetch channel videos page to get the full catalog
  try {
    const response = await fetch(channelUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 300 },
    });

    if (response.ok) {
      const html = await response.text();
      const match =
        html.match(/var ytInitialData = ({.*?});<\/script>/s) ||
        html.match(/ytInitialData\s*=\s*({.*?});/s);

      if (match && match[1]) {
        const data = JSON.parse(match[1]);
        const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
        const videosTab =
          tabs.find((t: Record<string, unknown>) => (t?.tabRenderer as { title?: string })?.title === "Videos") ||
          tabs[1];
        const items =
          (videosTab?.tabRenderer as { content?: { richGridRenderer?: { contents?: unknown[] } } })?.content
            ?.richGridRenderer?.contents || [];

        for (const rawItem of items) {
          const item = rawItem as Record<string, unknown>;
          // Modern YouTube layout (lockupViewModel)
          const lockup = (item?.richItemRenderer as Record<string, unknown>)?.content as {
            lockupViewModel?: {
              contentId?: string;
              metadata?: {
                lockupMetadataViewModel?: {
                  title?: { content?: string };
                  metadata?: {
                    contentMetadataViewModel?: {
                      metadataRows?: { metadataParts?: { text?: { content?: string } }[] }[];
                    };
                  };
                };
              };
            };
          };

          if (lockup?.lockupViewModel?.contentId) {
            const id = lockup.lockupViewModel.contentId;
            const title = lockup.lockupViewModel.metadata?.lockupMetadataViewModel?.title?.content || "";
            const publishedAt =
              lockup.lockupViewModel.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel
                ?.metadataRows?.[1]?.metadataParts?.[1]?.text?.content || "";
            const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

            if (id && title && !disabledIds.has(id) && !videoMap.has(id)) {
              videoMap.set(id, { id, title, publishedAt, thumbnail });
            }
          }

          // Legacy YouTube layout (videoRenderer)
          const legacy = (item?.richItemRenderer as Record<string, unknown>)?.content as {
            videoRenderer?: {
              videoId?: string;
              title?: { runs?: { text: string }[]; simpleText?: string };
              publishedTimeText?: { simpleText?: string };
            };
          };

          if (legacy?.videoRenderer?.videoId) {
            const id = legacy.videoRenderer.videoId;
            const title =
              legacy.videoRenderer.title?.runs?.[0]?.text || legacy.videoRenderer.title?.simpleText || "";
            const publishedAt = legacy.videoRenderer.publishedTimeText?.simpleText || "";
            const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

            if (id && title && !disabledIds.has(id) && !videoMap.has(id)) {
              videoMap.set(id, { id, title, publishedAt, thumbnail });
            }
          }
        }
      }
    }
  } catch (error) {
    console.warn("Failed to scrape YouTube channel page:", error);
  }

  // 3. Also check RSS feed to catch immediate new uploads
  try {
    const rssRes = await fetch(feedUrl, { next: { revalidate: 300 } });
    if (rssRes.ok) {
      const feed = await rssRes.text();
      const entries = feed.split("<entry>").slice(1);
      for (const entry of entries) {
        const id = textIn(entry, "yt:videoId");
        const title = decodeXml(textIn(entry, "title"));
        const publishedAt = textIn(entry, "published");
        const thumbnail =
          entry.match(/<media:thumbnail url="([^"]+)"/)?.[1] ??
          `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

        if (id && title && !disabledIds.has(id) && !videoMap.has(id)) {
          videoMap.set(id, { id, title, publishedAt, thumbnail });
        }
      }
    }
  } catch (rssError) {
    console.warn("Failed to query YouTube RSS feed:", rssError);
  }

  // 4. Also incorporate any fallback videos that aren't disabled or already in map
  for (const video of fallback) {
    if (!disabledIds.has(video.id) && !videoMap.has(video.id)) {
      videoMap.set(video.id, {
        ...video,
        publishedAt: "Field Archive",
        thumbnail: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
      });
    }
  }

  return Array.from(videoMap.values());
}

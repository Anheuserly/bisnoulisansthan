export type ChannelVideo = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
};

const channelId = "UCjj3-e9Lq3KevXdjs_ebETg";
const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

const textIn = (entry: string, tag: string) => entry.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1]?.trim() ?? "";

const decodeXml = (value: string) => value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

/**
 * Reads YouTube's public channel feed. No API key is required; the page is
 * revalidated every five minutes so newly published public videos appear.
 */
export async function getChannelVideos(fallback: readonly { id: string; title: string }[]): Promise<ChannelVideo[]> {
  try {
    const response = await fetch(feedUrl, { next: { revalidate: 300 } });
    if (!response.ok) throw new Error(`YouTube feed returned ${response.status}`);

    const feed = await response.text();
    const videos = feed.split("<entry>").slice(1).map((entry) => {
      const id = textIn(entry, "yt:videoId");
      const title = decodeXml(textIn(entry, "title"));
      const publishedAt = textIn(entry, "published");
      const thumbnail = entry.match(/<media:thumbnail url="([^"]+)"/)?.[1] ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      return { id, title, publishedAt, thumbnail };
    }).filter((video): video is ChannelVideo => Boolean(video.id && video.title));

    return videos.length ? videos : fallback.map((video) => ({ ...video, publishedAt: "", thumbnail: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` }));
  } catch {
    return fallback.map((video) => ({ ...video, publishedAt: "", thumbnail: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` }));
  }
}

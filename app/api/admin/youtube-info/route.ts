import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { extractYouTubeVideoId } from "@/lib/youtube";

export async function GET(request: Request) {
  const actor = await getCurrentAdmin();
  if (!actor) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const input = searchParams.get("url") || searchParams.get("id") || "";
  const videoId = extractYouTubeVideoId(input);

  if (!videoId) {
    return NextResponse.json(
      { ok: false, message: "Invalid YouTube URL or video ID." },
      { status: 400 }
    );
  }

  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const res = await fetch(oembedUrl, {
      headers: { "User-Agent": "BSGSS-Admin/1.0" },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({
        ok: true,
        id: videoId,
        title: data.title || "",
        author: data.author_name || "",
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      });
    }
  } catch (err) {
    console.warn("Could not query YouTube oEmbed for ID:", videoId, err);
  }

  return NextResponse.json({
    ok: true,
    id: videoId,
    title: "",
    author: "",
    thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  });
}

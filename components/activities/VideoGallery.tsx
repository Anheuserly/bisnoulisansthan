"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ListVideo, Play, Youtube } from "lucide-react";
import type { ChannelVideo } from "@/lib/youtube";

declare global {
  interface Window {
    YT?: { Player: new (element: HTMLDivElement, options: Record<string, unknown>) => YouTubePlayer };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type YouTubePlayer = { destroy: () => void; loadVideoById: (id: string) => void };

export function VideoGallery({ videos, youtubeUrl }: { videos: readonly ChannelVideo[]; youtubeUrl: string }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeId, setActiveId] = useState<string>(videos[0]?.id ?? "");
  const [hasStarted, setHasStarted] = useState(false);
  const [autoNext, setAutoNext] = useState(true);
  const playerTarget = useRef<HTMLDivElement>(null);
  const player = useRef<YouTubePlayer | null>(null);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    for (const v of videos) {
      if (v.category?.trim()) unique.add(v.category.trim());
    }
    return unique.size > 0 ? ["All", ...Array.from(unique)] : [];
  }, [videos]);

  const filteredVideos = useMemo(() => {
    if (selectedCategory === "All") return videos;
    return videos.filter((v) => v.category?.trim() === selectedCategory);
  }, [videos, selectedCategory]);

  const activeIndex = useMemo(() => {
    const idx = filteredVideos.findIndex((v) => v.id === activeId);
    return idx >= 0 ? idx : 0;
  }, [filteredVideos, activeId]);

  const activeVideo = filteredVideos[activeIndex] ?? videos[0];
  const activeIndexRef = useRef(activeIndex);
  const filteredVideosRef = useRef(filteredVideos);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    filteredVideosRef.current = filteredVideos;
  }, [activeIndex, filteredVideos]);

  useEffect(() => {
    if (!hasStarted || !activeVideo || !playerTarget.current) return;

    const startPlayer = () => {
      if (!window.YT?.Player || !playerTarget.current) return;
      player.current?.destroy();
      player.current = new window.YT.Player(playerTarget.current, {
        videoId: activeVideo.id,
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onStateChange: (event: { data: number }) => {
            if (event.data !== 0 || !autoNext) return;
            const list = filteredVideosRef.current;
            if (list.length === 0) return;
            const next = (activeIndexRef.current + 1) % list.length;
            const nextVideo = list[next];
            if (nextVideo) setActiveId(nextVideo.id);
          },
        },
      });
    };

    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (window.YT?.Player) startPlayer();
    else if (existing) window.onYouTubeIframeAPIReady = startPlayer;
    else {
      window.onYouTubeIframeAPIReady = startPlayer;
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }

    return () => {
      player.current?.destroy();
      player.current = null;
    };
  }, [activeVideo?.id, autoNext, hasStarted]);

  if (!activeVideo) return null;

  const selectVideo = (video: ChannelVideo) => {
    setActiveId(video.id);
    setHasStarted(true);
  };

  const stepVideo = (delta: number) => {
    if (filteredVideos.length <= 1) return;
    const nextIdx = (activeIndex + delta + filteredVideos.length) % filteredVideos.length;
    const nextVideo = filteredVideos[nextIdx];
    if (nextVideo) selectVideo(nextVideo);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_23.5rem] lg:items-start">
      {/* Primary Video Theater */}
      <section className="flex flex-col">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 shadow-md ring-1 ring-slate-900/10">
          {hasStarted ? (
            <div ref={playerTarget} className="h-full w-full" />
          ) : (
            <button
              type="button"
              onClick={() => setHasStarted(true)}
              className="group relative h-full w-full text-left focus:outline-none cursor-pointer"
              aria-label={`Play ${activeVideo.title}`}
            >
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-red-600 text-white shadow-xl ring-4 ring-white/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-red-700">
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </span>
              </span>
              <span className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/45 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-sand-100 backdrop-blur-xs">
                  <span>{activeVideo.category || "Field Film"}</span>
                </span>
                <span className="mt-2 block font-display text-lg sm:text-2xl font-bold leading-snug line-clamp-2">
                  {activeVideo.title}
                </span>
              </span>
            </button>
          )}
        </div>

        {/* Compact Theater Info & Navigation Bar */}
        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-line bg-white p-4 sm:flex-row sm:items-center sm:justify-between shadow-2xs">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-brand-700">
              <span>
                Video {String(activeIndex + 1).padStart(2, "0")} of {String(filteredVideos.length).padStart(2, "0")}
              </span>
              {activeVideo.category && (
                <span className="rounded bg-sand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-800">
                  {activeVideo.category}
                </span>
              )}
              {hasStarted && (
                <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Playing
                </span>
              )}
            </div>
            <h2 className="mt-1 font-display text-base sm:text-lg font-bold text-ink leading-snug line-clamp-2">
              {activeVideo.title}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {filteredVideos.length > 1 && (
              <div className="inline-flex items-center rounded-xl border border-line bg-sand-50/70 p-0.5">
                <button
                  type="button"
                  onClick={() => stepVideo(-1)}
                  className="rounded-lg p-1.5 text-ink-muted transition hover:bg-white hover:text-ink hover:shadow-2xs cursor-pointer"
                  aria-label="Previous video"
                  title="Previous video"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => stepVideo(1)}
                  className="rounded-lg p-1.5 text-ink-muted transition hover:bg-white hover:text-ink hover:shadow-2xs cursor-pointer"
                  aria-label="Next video"
                  title="Next video"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
            <a
              href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink transition hover:bg-sand-50 hover:border-brand-300"
            >
              <Youtube className="h-4 w-4 text-red-600" />
              <span>Watch on YouTube</span>
            </a>
          </div>
        </div>
      </section>

      {/* Smart Playlist Sidebar */}
      <aside className="overflow-hidden rounded-2xl border border-line bg-white shadow-2xs lg:sticky lg:top-24">
        <div className="border-b border-line bg-sand-50/60 px-4 py-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ListVideo className="h-4 w-4 text-brand-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-ink">
                Playlist ({filteredVideos.length})
              </span>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-ink-muted select-none">
              <span>Autoplay</span>
              <input
                type="checkbox"
                checked={autoNext}
                onChange={(event) => setAutoNext(event.target.checked)}
                className="h-3.5 w-3.5 rounded-sm accent-brand-700 cursor-pointer"
              />
            </label>
          </div>

          {categories.length > 2 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isSelected = cat === selectedCategory;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${
                      isSelected
                        ? "bg-brand-800 text-white shadow-2xs"
                        : "bg-white text-ink-muted border border-line hover:text-ink hover:border-brand-300"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="max-h-[30rem] divide-y divide-slate-100 overflow-y-auto">
          {filteredVideos.map((video, index) => {
            const isActive = video.id === activeVideo.id;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => selectVideo(video)}
                aria-pressed={isActive}
                className={`flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors cursor-pointer ${
                  isActive
                    ? "bg-brand-50/80 border-l-3 border-l-brand-700"
                    : "hover:bg-sand-50/70"
                }`}
              >
                <span className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg bg-slate-900">
                  <img
                    src={video.thumbnail}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span
                    className={`absolute inset-0 grid place-items-center transition-opacity ${
                      isActive ? "bg-brand-900/40 text-white" : "bg-black/20 text-white/90"
                    }`}
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        isActive ? "text-brand-700" : "text-ink-muted"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {video.category && (
                      <span className="rounded bg-sand-100 px-1.5 py-0.5 text-[10px] font-medium text-brand-800">
                        {video.category}
                      </span>
                    )}
                    {video.featured && (
                      <span className="rounded bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800">
                        Featured
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-0.5 block line-clamp-2 text-xs font-semibold leading-snug ${
                      isActive ? "text-brand-950" : "text-ink"
                    }`}
                  >
                    {video.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <a
          href={youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 border-t border-line bg-sand-50/40 px-4 py-3 text-xs font-semibold text-brand-800 transition hover:bg-brand-50"
        >
          <Youtube className="h-4 w-4 text-red-600" />
          <span>Explore All Channel Videos</span>
        </a>
      </aside>
    </div>
  );
}

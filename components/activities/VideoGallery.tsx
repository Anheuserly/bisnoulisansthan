"use client";

import { useEffect, useRef, useState } from "react";
import { ListVideo, Play, Youtube } from "lucide-react";
import type { ChannelVideo } from "@/lib/youtube";

declare global {
  interface Window {
    YT?: { Player: new (element: HTMLDivElement, options: Record<string, unknown>) => YouTubePlayer };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type YouTubePlayer = { destroy: () => void; loadVideoById: (id: string) => void };

export function VideoGallery({ videos, youtubeUrl }: { videos: readonly ChannelVideo[]; youtubeUrl: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [autoNext, setAutoNext] = useState(true);
  const playerTarget = useRef<HTMLDivElement>(null);
  const player = useRef<YouTubePlayer | null>(null);
  const activeIndexRef = useRef(0);
  const activeVideo = videos[activeIndex];

  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

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
            const next = (activeIndexRef.current + 1) % videos.length;
            setActiveIndex(next);
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

    return () => { player.current?.destroy(); player.current = null; };
  }, [activeVideo?.id, autoNext, hasStarted, videos.length]);

  if (!activeVideo) return null;

  const selectVideo = (index: number) => { setActiveIndex(index); setHasStarted(true); };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-start">
      {/* Primary Video Theater */}
      <section className="border-t-2 border-brand-850 pt-6">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950">
          {hasStarted ? (
            <div ref={playerTarget} className="h-full w-full" />
          ) : (
            <button
              type="button"
              onClick={() => setHasStarted(true)}
              className="group relative h-full w-full text-left focus:outline-none"
            >
              <img
                src={activeVideo.thumbnail}
                alt=""
                className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-red-600 text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-700">
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </span>
              </span>
              <span className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-sand-200">
                  Featured Documentary Video
                </span>
                <span className="mt-2 block font-display text-2xl sm:text-3xl font-black leading-tight">
                  {activeVideo.title}
                </span>
              </span>
            </button>
          )}
        </div>

        {/* Player Controls & Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
              Now Playing
            </p>
            <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {activeVideo.title}
            </h2>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-sand-100 px-4 py-2 text-xs sm:text-sm font-semibold text-brand-800 transition hover:bg-brand-50 hover:text-brand-900"
          >
            <Youtube className="h-4 w-4 text-red-600" />
            <span>Watch on YouTube</span>
          </a>
        </div>
      </section>

      {/* Playlist Sidebar */}
      <aside className="border-t-2 border-brand-850 pt-6 lg:sticky lg:top-24">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
              Playlist ({videos.length})
            </p>
            <p className="mt-0.5 text-xs text-slate-600">
              Official BSGSS video channel archive
            </p>
          </div>
          <ListVideo className="h-5 w-5 text-brand-700" />
        </div>

        <label className="flex cursor-pointer items-center justify-between border-b border-slate-200/80 py-3 text-xs sm:text-sm font-medium text-slate-700 hover:text-brand-850">
          <span>Continuous playback</span>
          <input
            type="checkbox"
            checked={autoNext}
            onChange={(event) => setAutoNext(event.target.checked)}
            className="h-4 w-4 rounded-sm accent-brand-700"
          />
        </label>

        <div className="max-h-[38rem] space-y-1.5 overflow-y-auto p-2">
          {videos.map((video, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => selectVideo(index)}
                aria-pressed={isActive}
                className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-brand-50/90 ring-1.5 ring-brand-600/30 shadow-2xs"
                    : "hover:bg-sand-50/80"
                }`}
              >
                <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-slate-900 shadow-2xs">
                  <img
                    src={video.thumbnail}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span
                    className={`absolute inset-0 grid place-items-center transition-opacity ${
                      isActive ? "bg-brand-900/40 text-white" : "bg-black/25 text-white/90"
                    }`}
                  >
                    <Play className="h-4 w-4 fill-current" />
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        isActive ? "text-brand-700" : "text-slate-600"
                      }`}
                    >
                      Video {String(index + 1).padStart(2, "0")}
                    </span>
                    {video.category && (
                      <span className="rounded bg-sand-100 px-1.5 py-0.5 text-[10px] font-semibold text-brand-800">
                        {video.category}
                      </span>
                    )}
                    {video.featured && (
                      <span className="rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                        Featured
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-1 block line-clamp-2 text-xs sm:text-sm font-semibold leading-snug ${
                      isActive ? "text-brand-950 font-bold" : "text-slate-800"
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
          className="flex items-center justify-center gap-2 border-t border-slate-200/80 bg-white px-5 py-4 text-xs sm:text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
        >
          <Youtube className="h-4 w-4 text-red-600" />
          <span>Explore All Channel Videos</span>
        </a>
      </aside>
    </div>
  );
}

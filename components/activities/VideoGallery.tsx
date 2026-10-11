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
    <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-start">
      <section className="overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
        <div className="relative aspect-video overflow-hidden bg-brand-950">
          {hasStarted ? <div ref={playerTarget} className="h-full w-full" /> : <button type="button" onClick={() => setHasStarted(true)} className="group relative h-full w-full text-left"><img src={activeVideo.thumbnail} alt="" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" /><span className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-950/10 to-transparent" /><span className="absolute inset-0 grid place-items-center"><span className="grid h-16 w-16 place-items-center rounded-full bg-white text-brand-800 shadow-lift transition group-hover:scale-110"><Play className="ml-1 h-7 w-7 fill-current" /></span></span><span className="absolute bottom-6 left-6 right-6 text-white"><span className="text-xs font-bold uppercase tracking-[.16em] text-brand-100">Play featured video</span><span className="mt-2 block font-display text-2xl font-bold leading-tight">{activeVideo.title}</span></span></button>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-brand-700">Now playing</p><h2 className="mt-2 font-display text-2xl font-bold text-ink">{activeVideo.title}</h2></div><a href={`https://www.youtube.com/watch?v=${activeVideo.id}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"><Youtube className="h-5 w-5" />Watch on YouTube</a></div>
      </section>

      <aside className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm lg:sticky lg:top-5"><div className="flex items-center justify-between border-b border-line bg-sand-50 px-5 py-4"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-brand-700">Up next</p><p className="mt-1 text-xs text-ink-muted">Latest videos from the official channel</p></div><ListVideo className="h-5 w-5 text-brand-700" /></div><label className="flex cursor-pointer items-center justify-between border-b border-line px-5 py-3 text-sm font-semibold text-ink"><span>Play next automatically</span><input type="checkbox" checked={autoNext} onChange={(event) => setAutoNext(event.target.checked)} className="h-4 w-4 accent-brand-700" /></label><div className="max-h-[42rem] overflow-y-auto p-2">{videos.map((video, index) => { const isActive = index === activeIndex; return <button key={video.id} type="button" onClick={() => selectVideo(index)} aria-pressed={isActive} className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${isActive ? "bg-brand-50 ring-1 ring-brand-200" : "hover:bg-sand-50"}`}><span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-brand-900"><img src={video.thumbnail} alt="" className="h-full w-full object-cover" loading="lazy" /><span className="absolute inset-0 grid place-items-center bg-brand-950/35 text-white"><Play className="h-5 w-5 fill-current" /></span></span><span className="min-w-0"><span className={`block text-xs font-bold uppercase tracking-[.12em] ${isActive ? "text-brand-700" : "text-ink-muted"}`}>Video {String(index + 1).padStart(2, "0")}</span><span className="mt-1 block line-clamp-2 font-display text-base font-bold leading-snug text-ink">{video.title}</span></span></button>; })}</div><a href={youtubeUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border-t border-line px-5 py-4 text-sm font-semibold text-brand-700 hover:bg-brand-50"><Youtube className="h-5 w-5" />View all channel videos</a></aside>
    </div>
  );
}

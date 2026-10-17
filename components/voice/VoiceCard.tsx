"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, MapPin, Pause, Play, Volume2 } from "lucide-react";
import type { VoiceEntry } from "@/lib/voices";
import { cn } from "@/lib/utils/cn";

interface VoiceCardProps {
  voice: VoiceEntry;
  className?: string;
}

export function VoiceCard({ voice, className }: VoiceCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [lang, setLang] = useState<"hi" | "en">(voice.language || "hi");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleToggle = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setAudioError(false);
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback failed for", voice.id, err);
          setAudioError(true);
          setIsPlaying(false);
        });
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleError = () => {
    setAudioError(true);
    setIsPlaying(false);
  };

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const activeTranscript = lang === "hi" ? voice.transcriptHi : voice.transcriptEn;

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-200 hover:border-brand-300",
        className
      )}
    >
      {/* Top Header: Photo, Name, Village */}
      <div className="flex items-center gap-4 p-5 sm:p-6 border-b border-line/60 bg-sand-50/50">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white bg-sand-200 shadow-2xs">
          <img
            src={voice.photo}
            alt={`${voice.name} from ${voice.village}`}
            width={64}
            height={64}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-bold text-ink truncate">
            {voice.name}
          </h3>
          <p className="flex items-center gap-1 text-xs text-ink-muted">
            <MapPin className="h-3 w-3 text-brand-600 shrink-0" aria-hidden="true" />
            <span>{voice.village}, Uttar Pradesh</span>
          </p>
        </div>

        {/* Audio Player Control */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          <button
            type="button"
            onClick={handleToggle}
            aria-pressed={isPlaying}
            aria-label={
              isPlaying
                ? `Pause audio story from ${voice.name}`
                : `Play audio story from ${voice.name} (${voice.durationSec} seconds)`
            }
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-white shadow-2xs transition hover:bg-brand-800 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" aria-hidden="true" />
            )}
          </button>
          <span className="text-[0.6875rem] font-semibold text-ink-muted">
            {formatDuration(voice.durationSec)}
          </span>
        </div>
      </div>

      {/* Hidden Audio Tag (Strictly preload="none") */}
      <audio
        ref={audioRef}
        preload="none"
        src={hasInteracted ? voice.audio : undefined}
        onEnded={handleEnded}
        onError={handleError}
      />

      {/* Audio Error Fallback */}
      {audioError && (
        <div
          role="status"
          className="mx-5 sm:mx-6 mt-4 flex items-center gap-2 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-800 border border-amber-200"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          <span>Audio clip temporarily unavailable. Full verified transcript provided below.</span>
        </div>
      )}

      {/* Transcript Section (Visible by Default) */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2 border-b border-line/50 pb-2 mb-3">
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-brand-700">
            Recorded Dispatch Transcript
          </span>

          {/* Hindi / English Toggle */}
          <div className="inline-flex rounded-lg border border-line bg-sand-50 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setLang("hi")}
              aria-pressed={lang === "hi"}
              className={cn(
                "rounded-md px-2.5 py-1 text-[0.6875rem] font-semibold transition",
                lang === "hi"
                  ? "bg-white text-brand-900 shadow-2xs"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              हिंदी
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={cn(
                "rounded-md px-2.5 py-1 text-[0.6875rem] font-semibold transition",
                lang === "en"
                  ? "bg-white text-brand-900 shadow-2xs"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              English
            </button>
          </div>
        </div>

        {/* Real Text Transcript */}
        <p className="flex-1 text-xs sm:text-sm text-ink-muted leading-relaxed italic">
          &ldquo;{activeTranscript}&rdquo;
        </p>

        {/* No-JS Fallback using noscript */}
        <noscript>
          <div className="mt-4 border-t border-line pt-2 text-xs text-ink-muted">
            <p><strong>हिंदी:</strong> {voice.transcriptHi}</p>
            <p className="mt-2"><strong>English:</strong> {voice.transcriptEn}</p>
          </div>
        </noscript>
      </div>
    </article>
  );
}

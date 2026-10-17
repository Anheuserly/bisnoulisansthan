"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sharedAudioController } from "@/lib/audio-controller";
import { cn } from "@/lib/utils/cn";

interface SoundToggleProps {
  className?: string;
  variant?: "header" | "footer";
}

export function SoundToggle({ className, variant = "header" }: SoundToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    sharedAudioController.init();
    const unsubscribe = sharedAudioController.subscribe((state) => {
      setIsPlaying(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  const handleClick = () => {
    sharedAudioController.toggle();
  };

  const label = isPlaying ? "Sound off" : "Sound on";

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-pressed="false"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold opacity-60",
          variant === "footer"
            ? "border border-brand-700 bg-brand-800 text-brand-200"
            : "border border-line bg-white/90 text-ink-muted",
          className
        )}
      >
        <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Sound on</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isPlaying}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 active:scale-95",
        variant === "footer"
          ? isPlaying
            ? "border border-emerald-400 bg-emerald-950/80 text-emerald-200 hover:bg-emerald-900 shadow-2xs"
            : "border border-brand-700 bg-brand-850 text-brand-200 hover:bg-brand-800 hover:text-white"
          : isPlaying
            ? "border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 shadow-2xs"
            : "border border-line bg-white/90 text-ink-muted hover:bg-sand-50 hover:text-ink shadow-2xs",
        className
      )}
      title={isPlaying ? "Stop ambient sound" : "Play calming ambient sound"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="h-3.5 w-3.5 text-emerald-600 animate-pulse" aria-hidden="true" />
          <span>{label}</span>
        </>
      ) : (
        <>
          <VolumeX className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

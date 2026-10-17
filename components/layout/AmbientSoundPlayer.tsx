"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX, Play, Pause, SlidersHorizontal, Sparkles } from "lucide-react";
import { AMBIENT_TRACK_PRESETS, type AmbientAudioConfig } from "@/config/customizer";

interface AmbientSoundPlayerProps {
  initialConfig?: Partial<AmbientAudioConfig>;
}

// Global subtle UI click sound effect
export function playUiClickTone(enabled = true) {
  if (!enabled || typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(540, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {}
}

export function AmbientSoundPlayer({ initialConfig }: AmbientSoundPlayerProps) {
  const [audioConfig, setAudioConfig] = useState<AmbientAudioConfig>({
    enabled: initialConfig?.enabled ?? true,
    trackId: initialConfig?.trackId || "sarvodaya-flute",
    customUrl: initialConfig?.customUrl || "",
    defaultVolume: initialConfig?.defaultVolume ?? 0.25,
    clickSounds: initialConfig?.clickSounds ?? true,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(audioConfig.defaultVolume);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [startedByGesture, setStartedByGesture] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load customizer settings from API on mount
  useEffect(() => {
    fetch("/api/customize")
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings?.audio) {
          setAudioConfig(data.settings.audio);
          setVolume(data.settings.audio.defaultVolume ?? 0.25);
        }
      })
      .catch(() => {});
  }, []);

  // Restore saved visitor preference
  useEffect(() => {
    try {
      const savedVolume = localStorage.getItem("bsgss_ambient_volume");
      if (savedVolume) setVolume(Number(savedVolume));
      const savedMuted = localStorage.getItem("bsgss_ambient_muted");
      if (savedMuted) setIsMuted(savedMuted === "true");
    } catch {}
  }, []);

  // Determine active track audio source URL
  const selectedPreset = AMBIENT_TRACK_PRESETS.find((t) => t.id === audioConfig.trackId) || AMBIENT_TRACK_PRESETS[0];
  const audioSrc = audioConfig.customUrl || selectedPreset?.audioUrl || "/audio/bansuri-meditation.mp3";

  // Initialize Audio Element
  useEffect(() => {
    if (typeof window === "undefined" || !audioConfig.enabled) return;

    if (!audioRef.current) {
      const audio = new Audio(audioSrc);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = isMuted ? 0 : volume;
      audioRef.current = audio;
    } else {
      if (audioRef.current.src !== audioSrc && !audioRef.current.src.endsWith(audioSrc)) {
        const wasPlaying = isPlaying;
        audioRef.current.src = audioSrc;
        if (wasPlaying) {
          audioRef.current.play().catch(() => {});
        }
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioSrc, audioConfig.enabled]);

  // Handle Volume & Mute sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Auto-Start on First User Interaction (Click/Scroll/Tap) to comply with browser autoplay
  useEffect(() => {
    if (startedByGesture || !audioConfig.enabled) return;

    const handleFirstGesture = () => {
      setStartedByGesture(true);
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);

      try {
        const userExplicitlyStopped = localStorage.getItem("bsgss_ambient_stopped") === "true";
        if (!userExplicitlyStopped && audioRef.current) {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      } catch {}
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
    };
  }, [startedByGesture, audioConfig.enabled]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      try {
        localStorage.setItem("bsgss_ambient_stopped", "true");
      } catch {}
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          try {
            localStorage.removeItem("bsgss_ambient_stopped");
          } catch {}
        })
        .catch((err) => {
          console.warn("Audio playback error:", err);
        });
    }
  };

  // Adjust volume
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    try {
      localStorage.setItem("bsgss_ambient_volume", String(newVol));
    } catch {}
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVol;
    }
  };

  // Toggle mute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    try {
      localStorage.setItem("bsgss_ambient_muted", String(nextMuted));
    } catch {}
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
  };

  if (!audioConfig.enabled) {
    return null;
  }

  return (
    <aside
      aria-label="Relaxing ambient audio player"
      className="fixed bottom-4 left-4 z-40 select-none animate-fadeIn"
    >
      <div className="relative flex items-center gap-2.5 rounded-full border border-brand-200/90 bg-white/95 px-3.5 py-2 shadow-2xl backdrop-blur-xl transition-all hover:border-brand-300 hover:shadow-soft">
        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pause ambient sound" : "Play ambient relaxation sound"}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-white shadow-2xs transition hover:bg-brand-800 hover:scale-105 active:scale-95"
          title={isPlaying ? "Pause soothing music" : "Play soothing Sarvodaya flute music"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>

        {/* Animated Sound Wave Equalizer Bars */}
        <div
          onClick={handleTogglePlay}
          className="flex cursor-pointer items-center gap-2 pr-1"
        >
          <div className="flex h-5 items-end gap-1">
            <span
              className={`w-1 rounded-full bg-brand-700 transition-all ${
                isPlaying ? "h-5 animate-[pulse_0.7s_ease-in-out_infinite]" : "h-1.5 opacity-40"
              }`}
            />
            <span
              className={`w-1 rounded-full bg-brand-600 transition-all ${
                isPlaying ? "h-3.5 animate-[pulse_1.0s_ease-in-out_infinite_0.2s]" : "h-2.5 opacity-40"
              }`}
            />
            <span
              className={`w-1 rounded-full bg-brand-800 transition-all ${
                isPlaying ? "h-5 animate-[pulse_0.8s_ease-in-out_infinite_0.4s]" : "h-1 opacity-40"
              }`}
            />
            <span
              className={`w-1 rounded-full bg-brand-700 transition-all ${
                isPlaying ? "h-3 animate-[pulse_1.2s_ease-in-out_infinite_0.1s]" : "h-2 opacity-40"
              }`}
            />
          </div>

          {/* Track Name & Status */}
          <div className="hidden sm:block text-left">
            <div className="text-[0.6875rem] font-bold text-ink truncate max-w-[150px]">
              {selectedPreset?.name || "Sarvodaya Flute Serenity"}
            </div>
            <div className="text-[0.625rem] text-brand-700 font-semibold flex items-center gap-1">
              {isPlaying ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Relaxing Ambient Playing</span>
                </>
              ) : (
                <span>Tap to Play Flute Ambient</span>
              )}
            </div>
          </div>
        </div>

        {/* Mute Button */}
        <button
          type="button"
          onClick={handleToggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-sand-100 hover:text-brand-800 transition"
          title={isMuted ? "Unmute" : "Mute sound"}
        >
          {isMuted ? <VolumeX className="h-4 w-4 text-amber-700" /> : <Volume2 className="h-4 w-4" />}
        </button>

        {/* Volume Slider Popout Toggle */}
        <button
          type="button"
          onClick={() => setShowControls((prev) => !prev)}
          aria-label="Adjust volume"
          className={`flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-sand-100 transition ${
            showControls ? "bg-sand-100 text-brand-800" : ""
          }`}
          title="Adjust volume"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Popout Volume Controls */}
      {showControls && (
        <div className="absolute bottom-14 left-0 mb-1 w-60 rounded-2xl border border-brand-200 bg-white p-4 shadow-2xl backdrop-blur-xl animate-scaleUp">
          <div className="flex items-center justify-between text-xs font-semibold text-ink">
            <span>Ambient Volume</span>
            <span className="text-brand-700 font-bold">{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="1.0"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-sand-200 accent-brand-700"
          />
          <p className="mt-2.5 text-[0.6875rem] text-ink-muted leading-relaxed">
            Gentle authentic Indian flute melody played in the classical Mayamalavagowla/Bansuri tradition.
          </p>
        </div>
      )}
    </aside>
  );
}

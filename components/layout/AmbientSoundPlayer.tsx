"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX, Play, Pause, SlidersHorizontal, Sparkles } from "lucide-react";
import { AMBIENT_TRACK_PRESETS, type AmbientAudioConfig } from "@/config/customizer";
import { sharedAudioController } from "@/lib/audio-controller";

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
    trackId: initialConfig?.trackId || "santoor-serenity",
    customUrl: initialConfig?.customUrl || "",
    defaultVolume: initialConfig?.defaultVolume ?? 0.22,
    clickSounds: initialConfig?.clickSounds ?? true,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(audioConfig.defaultVolume);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Load customizer settings from API on mount
  useEffect(() => {
    fetch("/api/customize")
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings?.audio) {
          setAudioConfig(data.settings.audio);
          if (data.settings.audio.defaultVolume !== undefined) {
            sharedAudioController.setVolume(data.settings.audio.defaultVolume);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Subscribe to shared single audio controller & initiate autoplay on open
  useEffect(() => {
    sharedAudioController.init();
    sharedAudioController.autoPlayOnOpen();
    const unsubscribe = sharedAudioController.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setVolume(state.volume);
      setIsMuted(state.isMuted);
    });
    return unsubscribe;
  }, []);

  // Determine active track audio source URL
  const selectedPreset = AMBIENT_TRACK_PRESETS.find((t) => t.id === audioConfig.trackId) || AMBIENT_TRACK_PRESETS[0];
  const audioSrc = audioConfig.customUrl || selectedPreset?.audioUrl || "/audio/gramodyog-santoor-serenity.m4a";

  // Cycle to Next Track
  const handleNextTrack = () => {
    const currentIndex = AMBIENT_TRACK_PRESETS.findIndex((t) => t.id === audioConfig.trackId);
    const nextIndex = (currentIndex + 1) % AMBIENT_TRACK_PRESETS.length;
    const nextTrack = AMBIENT_TRACK_PRESETS[nextIndex] || AMBIENT_TRACK_PRESETS[0];
    if (nextTrack) {
      setAudioConfig((prev) => ({
        ...prev,
        trackId: nextTrack.id,
        customUrl: "",
      }));
      sharedAudioController.setTrack(nextTrack.audioUrl || "/audio/gramodyog-santoor-serenity.m4a");
      try {
        localStorage.setItem("bsgss_ambient_track_id", nextTrack.id);
      } catch {}
    }
  };

  // Cycle to Previous Track
  const handlePrevTrack = () => {
    const currentIndex = AMBIENT_TRACK_PRESETS.findIndex((t) => t.id === audioConfig.trackId);
    const prevIndex = (currentIndex - 1 + AMBIENT_TRACK_PRESETS.length) % AMBIENT_TRACK_PRESETS.length;
    const prevTrack = AMBIENT_TRACK_PRESETS[prevIndex] || AMBIENT_TRACK_PRESETS[0];
    if (prevTrack) {
      setAudioConfig((prev) => ({
        ...prev,
        trackId: prevTrack.id,
        customUrl: "",
      }));
      sharedAudioController.setTrack(prevTrack.audioUrl || "/audio/gramodyog-santoor-serenity.m4a");
      try {
        localStorage.setItem("bsgss_ambient_track_id", prevTrack.id);
      } catch {}
    }
  };

  // Select Specific Track
  const handleSelectTrack = (trackId: string) => {
    const target = AMBIENT_TRACK_PRESETS.find((t) => t.id === trackId);
    setAudioConfig((prev) => ({
      ...prev,
      trackId,
      customUrl: "",
    }));
    if (target?.audioUrl) {
      sharedAudioController.setTrack(target.audioUrl);
    }
    try {
      localStorage.setItem("bsgss_ambient_track_id", trackId);
    } catch {}
    if (!isPlaying) {
      sharedAudioController.play();
    }
  };

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    sharedAudioController.toggle();
  };

  // Adjust volume
  const handleVolumeChange = (newVol: number) => {
    sharedAudioController.setVolume(newVol);
  };

  // Toggle mute
  const handleToggleMute = () => {
    sharedAudioController.toggleMute();
  };

  if (!audioConfig.enabled) {
    return null;
  }

  return (
    <>
      {/* Floating Ambient Sound Controller Pill */}
      <aside
        aria-label="Relaxing ambient audio player"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 select-none animate-fadeIn"
      >
        <div className="relative flex items-center gap-1.5 sm:gap-2.5 rounded-full border border-slate-200/90 bg-white/95 px-3 py-2 shadow-2xl backdrop-blur-xl transition-all hover:border-brand-300 hover:shadow-soft ring-1 ring-black/5">
          {/* Play / Pause Toggle Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? "Pause ambient sound" : "Play ambient relaxation sound"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-white shadow-2xs transition hover:bg-brand-800 hover:scale-105 active:scale-95"
            title={isPlaying ? "Pause relaxing music" : "Play relaxing soundscape"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </button>

          {/* Previous Track Button */}
          <button
            type="button"
            onClick={handlePrevTrack}
            aria-label="Previous music soundscape track"
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-brand-800 transition active:scale-95"
            title="Previous track"
          >
            <span className="text-xs font-bold">⏮</span>
          </button>

          {/* Next Track Button */}
          <button
            type="button"
            onClick={handleNextTrack}
            aria-label="Next music soundscape track"
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-brand-800 transition active:scale-95"
            title="Next track"
          >
            <span className="text-xs font-bold">⏭</span>
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
              <div className="text-[0.6875rem] font-bold text-slate-900 truncate max-w-[155px]">
                {selectedPreset?.name || "Gramodyog Santoor Serenity"}
              </div>
              <div className="text-[0.625rem] text-brand-700 font-semibold flex items-center gap-1">
                {isPlaying ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="truncate max-w-[120px]">{selectedPreset?.genre || "Playing"}</span>
                  </>
                ) : (
                  <span>Tap to Play Sound</span>
                )}
              </div>
            </div>
          </div>

          {/* Mute Button */}
          <button
            type="button"
            onClick={handleToggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-brand-800 transition"
            title={isMuted ? "Unmute" : "Mute sound"}
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-amber-700" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* Track List & Settings Popout Toggle */}
          <button
            type="button"
            onClick={() => setShowControls((prev) => !prev)}
            aria-label="Choose from 112 music tracks and adjust volume"
            className={`flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition ${
              showControls ? "bg-slate-200 text-brand-900 font-bold" : ""
            }`}
            title="Browse 112+ soothing soundscapes"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Popout Soundscape Selector & Volume Controls - Elevated Isolated Layer */}
      {showControls && (
        <SoundscapeDrawer
          volume={volume}
          currentTrackId={audioConfig.trackId}
          isPlaying={isPlaying}
          onVolumeChange={handleVolumeChange}
          onSelectTrack={handleSelectTrack}
          onClose={() => setShowControls(false)}
        />
      )}
    </>
  );
}

function SoundscapeDrawer({
  volume,
  currentTrackId,
  isPlaying,
  onVolumeChange,
  onSelectTrack,
  onClose,
}: {
  volume: number;
  currentTrackId: string;
  isPlaying: boolean;
  onVolumeChange: (vol: number) => void;
  onSelectTrack: (trackId: string) => void;
  onClose: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Tracks (112)" },
    { id: "raga", label: "Classical Ragas" },
    { id: "nature", label: "Nature & Rivers" },
    { id: "solfeggio", label: "Healing 432Hz/Om" },
    { id: "instrument", label: "Sitar & Flute Solo" },
    { id: "ambient", label: "Ambient Pads" },
  ];

  const filteredTracks = AMBIENT_TRACK_PRESETS.filter((t) => {
    if (t.id === "custom-stream") return false;

    // Category match
    if (selectedCategory === "raga") {
      if (!t.genre.toLowerCase().includes("raga") && !t.name.toLowerCase().includes("raga")) return false;
    } else if (selectedCategory === "nature") {
      if (
        !t.genre.toLowerCase().includes("nature") &&
        !t.description.toLowerCase().includes("water") &&
        !t.description.toLowerCase().includes("wind") &&
        !t.description.toLowerCase().includes("rain")
      )
        return false;
    } else if (selectedCategory === "solfeggio") {
      if (!t.genre.toLowerCase().includes("solfeggio") && !t.id.includes("hz") && !t.id.includes("om") && !t.id.includes("drone"))
        return false;
    } else if (selectedCategory === "instrument") {
      if (
        !t.genre.toLowerCase().includes("acoustic") &&
        !t.genre.toLowerCase().includes("flute") &&
        !t.genre.toLowerCase().includes("sitar") &&
        !t.genre.toLowerCase().includes("santoor") &&
        !t.genre.toLowerCase().includes("sarod")
      )
        return false;
    } else if (selectedCategory === "ambient") {
      if (!t.genre.toLowerCase().includes("ambient") && !t.genre.toLowerCase().includes("pad") && !t.genre.toLowerCase().includes("soundscape"))
        return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.genre.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeTrackObj = AMBIENT_TRACK_PRESETS.find((t) => t.id === currentTrackId);

  return (
    <>
      {/* Light Backdrop Scrim for Focus & Dismissal */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px] transition-opacity"
      />

      {/* Floating Dialog Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Grand Soundscape Library"
        className="fixed bottom-20 left-4 sm:bottom-24 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-[28rem] h-[34rem] max-h-[85vh] flex flex-col rounded-3xl border border-line bg-white p-5 shadow-2xl ring-1 ring-black/5 animate-scaleUp text-slate-900"
      >
        {/* Header - Fixed Height */}
        <div className="shrink-0 flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 text-white shadow-sm">
              <Music className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 leading-tight">
                Grand Soundscape Library
              </h3>
              <p className="text-[0.6875rem] font-semibold text-brand-700">
                {AMBIENT_TRACK_PRESETS.length - 1} Master Heritage &amp; Ambient Tracks
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 font-bold transition"
            aria-label="Close sound library"
          >
            ✕
          </button>
        </div>

        {/* Top Controls Container - Fixed Height */}
        <div className="shrink-0 pt-3 pb-2 space-y-2.5 border-b border-slate-100">
          {/* Now Playing Banner */}
          {activeTrackObj && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-3 flex items-center justify-between gap-3 shadow-xs">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-[0.6875rem] font-extrabold uppercase tracking-wider text-emerald-800">
                    Now Playing
                  </span>
                </div>
                <p className="mt-0.5 text-xs font-bold text-slate-900 truncate">
                  {activeTrackObj.name}
                </p>
                <p className="text-[0.6875rem] font-semibold text-emerald-700 truncate">
                  {activeTrackObj.genre}
                </p>
              </div>
              <span
                className={`shrink-0 text-xs px-3 py-1 rounded-full font-bold shadow-xs ${
                  isPlaying ? "bg-emerald-700 text-white" : "bg-slate-300 text-slate-800"
                }`}
              >
                {isPlaying ? "Playing" : "Paused"}
              </span>
            </div>
          )}

          {/* Volume Control */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
              <span>Master Sound Volume</span>
              <span className="font-extrabold text-brand-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                {Math.round(volume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1.0"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-brand-700"
              aria-label="Master volume slider"
            />
          </div>

          {/* Live Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by instrument, raga, frequency, or river..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:bg-white focus:outline-none transition shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex gap-1.5 overflow-x-auto pt-1 pb-0.5 no-scrollbar">
            {categories.map((c) => {
              const isActive = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className={`shrink-0 rounded-lg px-2.5 py-1 text-[0.6875rem] font-bold transition border ${
                    isActive
                      ? "bg-brand-700 text-white border-brand-700 shadow-xs"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Track List - Dedicated Scrollable Viewport (Zero Overlap Guaranteed) */}
        <div className="flex-1 overflow-y-auto pt-2.5 pb-2 pr-1 space-y-2">
          {filteredTracks.map((track, idx) => {
            const isCurrent = currentTrackId === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => onSelectTrack(track.id)}
                className={`w-full text-left rounded-2xl p-3 transition flex items-start gap-3 ${
                  isCurrent
                    ? "bg-brand-50/90 border border-brand-500 text-slate-900 shadow-xs"
                    : "bg-sand-50/60 hover:bg-sand-100/80 text-slate-900 border border-transparent hover:border-line/70"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold mt-0.5 ${
                    isCurrent
                      ? "bg-brand-700 text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200"
                  }`}
                >
                  {isCurrent && isPlaying ? "▶" : idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className="truncate text-xs font-bold text-slate-900 leading-tight">
                      {track.name}
                    </p>
                    {isCurrent && (
                      <span className="shrink-0 text-[0.5625rem] font-extrabold text-brand-800 uppercase tracking-wider bg-brand-100 px-2 py-0.5 rounded-full border border-brand-300">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="truncate text-[0.6875rem] font-semibold text-brand-700 mt-0.5">
                    {track.genre}
                  </p>
                  <p className="line-clamp-2 text-[0.625rem] text-slate-600 mt-1 leading-snug">
                    {track.description}
                  </p>
                </div>
              </button>
            );
          })}
          {filteredTracks.length === 0 && (
            <div className="py-12 text-center text-xs font-semibold text-slate-500">
              No soundscapes matched &ldquo;{searchQuery}&rdquo;. Try another term!
            </div>
          )}
        </div>

        {/* Footer - Fixed Height */}
        <div className="shrink-0 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>
            Displaying <strong className="text-slate-900 font-bold">{filteredTracks.length}</strong> of {AMBIENT_TRACK_PRESETS.length - 1} soundscapes
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-brand-700 px-4 py-1.5 font-bold text-white hover:bg-brand-800 transition shadow-xs active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}

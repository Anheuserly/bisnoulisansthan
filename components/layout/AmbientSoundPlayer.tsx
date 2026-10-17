"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX, Play, Pause, SlidersHorizontal, Sparkles } from "lucide-react";
import { AMBIENT_TRACK_PRESETS, type AmbientAudioConfig } from "@/config/customizer";

interface AmbientSoundPlayerProps {
  initialConfig?: Partial<AmbientAudioConfig>;
}

// Global helper for optional UI click sound effects
export function playUiClickTone(enabled = true) {
  if (!enabled || typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.09);
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
  const [hasInteracted, setHasInteracted] = useState(false);

  // Audio Context & Nodes refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const synthNodesRef = useRef<Array<OscillatorNode | GainNode>>([]);
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Stop all active synthesized voices
  const stopSynthesis = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    synthNodesRef.current.forEach((node) => {
      try {
        if ("stop" in node) (node as OscillatorNode).stop();
        node.disconnect();
      } catch {}
    });
    synthNodesRef.current = [];
  };

  // Start peaceful procedural Indian meditation / flute soundscape using Web Audio API
  const startProceduralSoundscape = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      stopSynthesis();

      // Master Gain Node
      const masterGain = ctx.createGain();
      const currentEffectiveVol = isMuted ? 0 : volume;
      masterGain.gain.setValueAtTime(currentEffectiveVol, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Warm Meditative Drone (Tanpura Root & Fifth: C# 136.1Hz & G# 204.1Hz)
      const rootFreq = audioConfig.trackId === "tanpura-peace" ? 136.1 : 146.83;
      const droneOsc1 = ctx.createOscillator();
      const droneGain1 = ctx.createGain();
      droneOsc1.type = "sine";
      droneOsc1.frequency.setValueAtTime(rootFreq, ctx.currentTime);
      droneGain1.gain.setValueAtTime(0.08, ctx.currentTime);
      droneOsc1.connect(droneGain1);
      droneGain1.connect(masterGain);
      droneOsc1.start();
      synthNodesRef.current.push(droneOsc1, droneGain1);

      const droneOsc2 = ctx.createOscillator();
      const droneGain2 = ctx.createGain();
      droneOsc2.type = "triangle";
      droneOsc2.frequency.setValueAtTime(rootFreq * 1.5, ctx.currentTime); // Perfect fifth harmonic
      droneGain2.gain.setValueAtTime(0.04, ctx.currentTime);
      droneOsc2.connect(droneGain2);
      droneGain2.connect(masterGain);
      droneOsc2.start();
      synthNodesRef.current.push(droneOsc2, droneGain2);

      // 2. Procedural Bamboo Flute / Serene Melody Phrases
      const ragaNotes = [
        rootFreq * 2,         // Sa (293.6 Hz)
        rootFreq * 2 * 1.125, // Re (330.3 Hz)
        rootFreq * 2 * 1.25,  // Ga (367.0 Hz)
        rootFreq * 2 * 1.333, // Ma (391.5 Hz)
        rootFreq * 2 * 1.5,   // Pa (440.5 Hz)
        rootFreq * 2 * 1.666, // Dha (489.3 Hz)
        rootFreq * 2 * 1.875, // Ni (550.6 Hz)
        rootFreq * 4,         // High Sa (587.3 Hz)
      ];

      const playFluteNote = () => {
        if (!audioCtxRef.current || isPlaying === false) return;
        const now = ctx.currentTime;
        const note = ragaNotes[Math.floor(Math.random() * ragaNotes.length)] ?? (rootFreq * 2);
        const duration = 2.4 + Math.random() * 2.0;

        const fluteOsc = ctx.createOscillator();
        const fluteGain = ctx.createGain();

        fluteOsc.type = "sine";
        fluteOsc.frequency.setValueAtTime(note, now);
        // Soft Indian flute vibrato
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(4.8, now); // 4.8 Hz vibrato rate
        vibratoGain.gain.setValueAtTime(2.2, now);
        vibrato.connect(fluteOsc.frequency);
        vibratoGain.connect(fluteOsc.frequency);
        vibrato.start(now);
        vibrato.stop(now + duration);

        // Slow soft attack and natural decay
        fluteGain.gain.setValueAtTime(0.001, now);
        fluteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.6);
        fluteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        fluteOsc.connect(fluteGain);
        fluteGain.connect(masterGain);

        fluteOsc.start(now);
        fluteOsc.stop(now + duration);
      };

      // Play an initial note immediately, then loop with organic pacing
      playFluteNote();
      synthIntervalRef.current = setInterval(playFluteNote, 3200);
    } catch (err) {
      console.warn("Ambient audio error:", err);
    }
  };

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    setHasInteracted(true);
    if (isPlaying) {
      setIsPlaying(false);
      stopSynthesis();
      if (htmlAudioRef.current) htmlAudioRef.current.pause();
    } else {
      setIsPlaying(true);
      if (audioConfig.customUrl) {
        if (!htmlAudioRef.current) {
          htmlAudioRef.current = new Audio(audioConfig.customUrl);
          htmlAudioRef.current.loop = true;
        }
        htmlAudioRef.current.volume = isMuted ? 0 : volume;
        htmlAudioRef.current.play().catch(() => startProceduralSoundscape());
      } else {
        startProceduralSoundscape();
      }
    }
  };

  // Adjust volume
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    try {
      localStorage.setItem("bsgss_ambient_volume", String(newVol));
    } catch {}

    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(isMuted ? 0 : newVol, audioCtxRef.current.currentTime);
    }
    if (htmlAudioRef.current) {
      htmlAudioRef.current.volume = isMuted ? 0 : newVol;
    }
  };

  // Toggle mute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    try {
      localStorage.setItem("bsgss_ambient_muted", String(nextMuted));
    } catch {}

    const effectiveVol = nextMuted ? 0 : volume;
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(effectiveVol, audioCtxRef.current.currentTime);
    }
    if (htmlAudioRef.current) {
      htmlAudioRef.current.volume = effectiveVol;
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSynthesis();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  if (!audioConfig.enabled) {
    return null;
  }

  const currentTrack = AMBIENT_TRACK_PRESETS.find((t) => t.id === audioConfig.trackId) || AMBIENT_TRACK_PRESETS[0];

  return (
    <aside
      aria-label="Ambient sound player"
      className="fixed bottom-4 left-4 z-40 select-none animate-fadeIn"
    >
      <div className="relative flex items-center gap-2 rounded-full border border-brand-200/90 bg-white/95 px-3 py-1.5 shadow-lift backdrop-blur-md transition-all hover:border-brand-300 hover:shadow-2xl">
        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pause ambient sound" : "Play ambient relaxation sound"}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-white shadow-2xs transition hover:bg-brand-800 hover:scale-105 active:scale-95"
          title={isPlaying ? "Pause relaxing music" : "Play relaxing Sarvodaya ambient music"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>

        {/* Animated Sound Wave Equalizer Bars */}
        <div
          onClick={handleTogglePlay}
          className="flex cursor-pointer items-center gap-1.5 pr-1"
        >
          <div className="flex h-4 items-end gap-0.5">
            <span
              className={`w-0.5 rounded-full bg-brand-700 transition-all ${
                isPlaying ? "h-4 animate-[pulse_0.8s_ease-in-out_infinite]" : "h-1.5 opacity-50"
              }`}
            />
            <span
              className={`w-0.5 rounded-full bg-brand-600 transition-all ${
                isPlaying ? "h-3 animate-[pulse_1.1s_ease-in-out_infinite_0.2s]" : "h-2 opacity-50"
              }`}
            />
            <span
              className={`w-0.5 rounded-full bg-brand-800 transition-all ${
                isPlaying ? "h-4 animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" : "h-1 opacity-50"
              }`}
            />
            <span
              className={`w-0.5 rounded-full bg-brand-700 transition-all ${
                isPlaying ? "h-2.5 animate-[pulse_1.3s_ease-in-out_infinite_0.1s]" : "h-2 opacity-50"
              }`}
            />
          </div>

          {/* Track Name & Genre Pill */}
          <div className="hidden sm:block text-left">
            <div className="text-[0.6875rem] font-bold text-ink truncate max-w-[140px]">
              {currentTrack?.name || "Sarvodaya Ambient"}
            </div>
            <div className="text-[0.625rem] text-brand-700 font-medium">
              {isPlaying ? "Relaxing Ambient Playing" : "Tap to Play Relaxing Ambient"}
            </div>
          </div>
        </div>

        {/* Mute Button */}
        <button
          type="button"
          onClick={handleToggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="flex h-7 w-7 items-center justify-center rounded-full text-ink-muted hover:bg-sand-100 hover:text-brand-800 transition"
          title={isMuted ? "Unmute" : "Mute sound"}
        >
          {isMuted ? <VolumeX className="h-3.5 w-3.5 text-amber-700" /> : <Volume2 className="h-3.5 w-3.5" />}
        </button>

        {/* Popout Volume Controls Button */}
        <button
          type="button"
          onClick={() => setShowControls((prev) => !prev)}
          aria-label="Adjust volume"
          className={`flex h-7 w-7 items-center justify-center rounded-full text-ink-muted hover:bg-sand-100 transition ${
            showControls ? "bg-sand-100 text-brand-800" : ""
          }`}
          title="Adjust volume"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Floating Volume Slider Dropdown */}
      {showControls && (
        <div className="absolute bottom-12 left-0 mb-1 w-56 rounded-xl border border-brand-200 bg-white p-3 shadow-2xl backdrop-blur-md animate-scaleUp">
          <div className="flex items-center justify-between text-xs font-semibold text-ink">
            <span>Relaxation Volume</span>
            <span className="text-brand-700 font-bold">{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="1.0"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-sand-200 accent-brand-700"
          />
          <p className="mt-2 text-[0.6875rem] text-ink-muted leading-relaxed">
            Gentle meditative soundscapes to relax visitors while exploring village development stories.
          </p>
        </div>
      )}
    </aside>
  );
}

"use client";

export const SOUND_STORAGE_KEY = "bsgss_ambient_sound_opt_in";
export const VOLUME_STORAGE_KEY = "bsgss_ambient_volume";

const DEFAULT_AUDIO_SRC = "/audio/gramodyog-santoor-serenity.m4a";

export interface AudioState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTrackSrc: string;
}

export type AudioStateListener = (state: AudioState) => void;

class AudioController {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.25;
  private isMuted: boolean = false;
  private currentTrackSrc: string = DEFAULT_AUDIO_SRC;
  private listeners: Set<AudioStateListener> = new Set();
  private initialized: boolean = false;

  private getAudio(): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.loop = true;
      this.audio.preload = "none";
      this.audio.src = this.currentTrackSrc;
      this.audio.volume = this.isMuted ? 0 : this.volume;

      this.audio.addEventListener("play", () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener("pause", () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener("ended", () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener("error", (e) => {
        console.warn("Ambient audio element error:", e);
        this.isPlaying = false;
        this.notify();
      });
    }
    return this.audio;
  }

  public init() {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;

    // Restore volume
    try {
      const savedVol = localStorage.getItem(VOLUME_STORAGE_KEY);
      if (savedVol !== null) {
        const v = parseFloat(savedVol);
        if (!isNaN(v) && v >= 0 && v <= 1) {
          this.volume = v;
        }
      }
    } catch {}

    // Check opt-in: STRICTLY opt-in. Default is false/null.
    try {
      const optIn = localStorage.getItem(SOUND_STORAGE_KEY);
      if (optIn === "true") {
        // User explicitly enabled sound in a previous session
        const audio = this.getAudio();
        if (audio) {
          audio.play().catch(() => {
            const resumeHandler = () => {
              if (localStorage.getItem(SOUND_STORAGE_KEY) === "true") {
                audio.play().catch(() => {});
              }
              window.removeEventListener("click", resumeHandler);
              window.removeEventListener("keydown", resumeHandler);
              window.removeEventListener("touchstart", resumeHandler);
            };
            window.addEventListener("click", resumeHandler, { once: true });
            window.addEventListener("keydown", resumeHandler, { once: true });
            window.addEventListener("touchstart", resumeHandler, { once: true });
          });
        }
      }
    } catch {}

    this.notify();
  }

  public getState(): AudioState {
    return {
      isPlaying: this.isPlaying,
      volume: this.volume,
      isMuted: this.isMuted,
      currentTrackSrc: this.currentTrackSrc,
    };
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    for (const listener of this.listeners) {
      listener(state);
    }
  }

  public setTrack(src: string) {
    this.currentTrackSrc = src;
    const audio = this.getAudio();
    if (audio) {
      const wasPlaying = this.isPlaying;
      audio.src = src;
      if (wasPlaying) {
        audio.play().catch(() => {});
      }
    }
    this.notify();
  }

  public play() {
    const audio = this.getAudio();
    if (!audio) return;
    try {
      localStorage.setItem(SOUND_STORAGE_KEY, "true");
    } catch {}
    audio.play().catch((err) => {
      console.warn("Audio play prevented:", err);
    });
  }

  public pause() {
    const audio = this.getAudio();
    if (!audio) return;
    try {
      localStorage.setItem(SOUND_STORAGE_KEY, "false");
    } catch {}
    audio.pause();
  }

  public stop() {
    this.pause();
    const audio = this.getAudio();
    if (audio) {
      audio.currentTime = 0;
    }
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, String(this.volume));
    } catch {}
    const audio = this.getAudio();
    if (audio) {
      audio.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    const audio = this.getAudio();
    if (audio) {
      audio.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  /**
   * Ducks or pauses ambient music when spoken voice dispatches play
   * so speech is crisp, clear, and unhindered by background tracks.
   */
  private preDuckPlaying: boolean = false;
  private preDuckVolume: number = 0.25;

  public duckForSpeech(pauseCompletely: boolean = true) {
    const audio = this.getAudio();
    if (!audio) return;

    if (this.isPlaying) {
      this.preDuckPlaying = true;
      this.preDuckVolume = this.volume;

      if (pauseCompletely) {
        audio.pause();
      } else {
        // Soft duck to 5% volume
        audio.volume = Math.min(0.05, this.volume);
      }
    }
  }

  public unduckAfterSpeech() {
    const audio = this.getAudio();
    if (!audio) return;

    if (this.preDuckPlaying) {
      this.preDuckPlaying = false;
      audio.volume = this.isMuted ? 0 : this.preDuckVolume;
      // Resume only if user still has opt-in active
      try {
        if (localStorage.getItem(SOUND_STORAGE_KEY) === "true") {
          audio.play().catch(() => {});
        }
      } catch {}
    }
  }
}

export const sharedAudioController = new AudioController();

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, Radio, Activity, CheckCircle2 } from "lucide-react";
import { type LiveTypingConfig } from "@/config/customizer";

interface HomeLiveTypingProps {
  data?: LiveTypingConfig;
}

const defaultPhrases = [
  "Empowering 1,00,000+ rural women through skill training & economic self-reliance.",
  "Conducting free cancer screenings & preventive healthcare in 350+ villages.",
  "Nurturing sustainable livelihoods with Khadi, embroidery & Self Help Groups.",
  "Delivering transparent, verified grassroots change alongside 30+ CSR partners.",
  "Serving communities with dedication, dignity & equal opportunity since 1994.",
];

export function HomeLiveTyping({ data }: HomeLiveTypingProps) {
  const phrases = data?.phrases && data.phrases.length > 0 ? data.phrases : defaultPhrases;
  const eyebrow = data?.eyebrow || "LIVE SARVODAYA MISSION · ACTIVE ACROSS 5 STATES";
  const statusText = data?.statusText || "Field Operations Active in Delhi NCR · Haryana · UP · Punjab · Rajasthan";

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex] || "";
    let timeoutId: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayText.length < currentPhrase.length) {
        // Natural human keystroke timing with slight variance
        const variance = Math.floor(Math.random() * 25);
        timeoutId = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 45 + variance);
      } else {
        // Full phrase displayed — hold comfortably for 3600ms so user can read with ease
        timeoutId = setTimeout(() => {
          setPhase("deleting");
        }, 3600);
      }
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        // Crisp, steady backspacing
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 20);
      } else {
        // Transition cleanly to next phrase
        setPhase("typing");
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, phase, phraseIndex, phrases]);

  return (
    <section className="relative isolate overflow-hidden border-y border-line bg-sand-50/80 py-5 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Column: Clean Beacon & Dynamic Typewriter */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                Live Movement
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
                {eyebrow}
              </p>
            </div>

            {/* Typewriter Display Area with Editorial Polish */}
            <div className="mt-2.5 flex min-h-[3.75rem] items-start sm:items-center">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs font-bold text-slate-700 bg-sand-100 px-2 py-0.5 rounded-md border border-line">
                  {String(phraseIndex + 1).padStart(2, "0")} / {String(phrases.length).padStart(2, "0")}
                </span>
                <p className="font-display text-base font-bold text-ink sm:text-xl md:text-[1.35rem] leading-snug tracking-tight">
                  <span className="text-ink">{displayText}</span>
                  <span className="ml-1 inline-block h-5 w-[2px] bg-slate-900 align-middle" />
                </p>
              </div>
            </div>

            {/* Real-Time Operational Breadcrumb */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5 font-medium text-ink-muted">
                <MapPin className="h-3.5 w-3.5 text-brand-700 shrink-0" />
                {statusText}
              </span>
              <span className="hidden sm:inline text-brand-300">•</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[0.6875rem] text-emerald-700 font-semibold">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Ground Verified
              </span>
            </div>
          </div>

          {/* Right Column: Quick Action Pills */}
          <div className="flex shrink-0 flex-wrap items-center gap-2 pt-1 lg:pt-0">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200/90 bg-white px-3 py-1.5 text-xs font-semibold text-brand-800 shadow-2xs transition hover:bg-brand-50"
            >
              <Activity className="h-3.5 w-3.5 text-brand-700" />
              <span>Our Impact Record</span>
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800"
            >
              <span>Support a Cause</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(45);

  useEffect(() => {
    const currentFullText = phrases[phraseIndex] || "";

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing characters
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
        setTypingSpeed(40 + Math.random() * 20);

        if (displayText.length + 1 >= currentFullText.length) {
          // Pause at end of phrase
          setTimeout(() => setIsDeleting(true), 2800);
        }
      } else {
        // Backspacing characters
        setDisplayText(currentFullText.slice(0, displayText.length - 1));
        setTypingSpeed(22);

        if (displayText.length <= 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed]);

  return (
    <section className="relative isolate overflow-hidden border-y border-brand-200/80 bg-gradient-to-r from-sand-50 via-white to-brand-50/50 py-5 sm:py-6 shadow-2xs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Column: Live Pulse Beacon & Dynamic Typewriter */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-emerald-800 ring-1 ring-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                </span>
                Live Movement
              </span>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-brand-700">
                {eyebrow}
              </p>
            </div>

            {/* Typewriter Display Area */}
            <div className="mt-2 flex min-h-[3.25rem] items-center">
              <p className="font-display text-base font-bold text-ink sm:text-xl md:text-[1.35rem] leading-snug">
                <span>{displayText}</span>
                <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-brand-700 align-middle" />
              </p>
            </div>

            {/* Real-Time Operational Breadcrumb */}
            <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
              <MapPin className="h-3.5 w-3.5 text-brand-700 shrink-0" />
              <span className="font-medium text-ink-muted">{statusText}</span>
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

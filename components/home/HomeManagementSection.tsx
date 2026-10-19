"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Maximize2,
  Quote,
  Sparkles,
  UserCheck,
  X,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface LeaderMessage {
  id: string;
  name: string;
  role: string;
  titleBadge: string;
  image: string;
  shortQuote: string;
  fullMessage: string[];
  keyHighlights: string[];
  tenure: string;
}

const LEADERS: LeaderMessage[] = [
  {
    id: "chairperson",
    name: "Vijay Kumar Jha",
    role: "Ex-IPS · Chairperson, BSGSS, New Delhi",
    titleBadge: "Chairperson's Address",
    image: "/images/bsgss/other-source-assets/335-11111.jpg",
    shortQuote:
      "Our mission is practical and sustainable: empower communities, support women and enable access to quality healthcare.",
    fullMessage: [
      "Our purpose is to create positive, measurable change for poor and marginalised communities through practical, sustainable, and community-led solutions.",
      "By maintaining stringent statutory transparency, direct grassroots contact with village panchayats, and robust partnerships with India's leading public sector enterprises, we ensure that every initiative in healthcare, skill training, and potable water delivery delivers lasting dignity.",
      "Equal opportunity is not an abstract slogan—it is built clinic by clinic, training machine by machine, across the villages we serve.",
    ],
    keyHighlights: [
      "Grassroots accountability across 350+ villages",
      "Pioneering mobile oncology & diagnostic screening clinics",
      "Long-standing CSR collaborations with RITES, IRCON, REC & NTPC",
    ],
    tenure: "Serving as Chairperson since foundational expansion",
  },
  {
    id: "ceo",
    name: "Nandita Bakshi",
    role: "Ex-IRS · CEO, BSGSS, New Delhi",
    titleBadge: "Chief Executive's Vision",
    image: "/images/bsgss/other-source-assets/334-111.jpg",
    shortQuote:
      "BSGSS is grounded in dignity, justice and equal opportunity—creating meaningful change for people who are often left out, especially women.",
    fullMessage: [
      "BSGSS is fundamentally grounded in the values of dignity, justice, and equal economic opportunity. Its steady, persistent work in villages and small towns creates meaningful change for people who are too often left out of mainstream conversations—especially rural women.",
      "Through Action for Micro-Finance and Rehabilitation (AMAR), we nurture self-help craft guilds, vocational tailoring centers, and micro-savings networks where women transition from dependence to confident economic leadership in their families.",
      "When a woman earns and holds savings in her own name, the future of the entire household transforms.",
    ],
    keyHighlights: [
      "1,00,000+ women empowered through skill pathways",
      "AMAR Micro-Finance & craft cooperative federation",
      "Certified 12A & 80G governance with 30 years unbroken service",
    ],
    tenure: "Leading executive operations & rural enterprise",
  },
];

export function HomeManagementSection() {
  const [activeLeader, setActiveLeader] = useState<LeaderMessage | null>(null);
  const [typedChars, setTypedChars] = useState(0);

  // Live Typewriter Effect when modal opens
  useEffect(() => {
    if (!activeLeader) {
      setTypedChars(0);
      return;
    }

    const fullFirstParagraph = activeLeader.fullMessage[0] || "";
    setTypedChars(0);

    const interval = setInterval(() => {
      setTypedChars((prev) => {
        if (prev < fullFirstParagraph.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 18);

    // Lock background scroll
    document.body.style.overflow = "hidden";

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, [activeLeader]);

  return (
    <section
      className="relative isolate overflow-hidden border-b border-brand-100 bg-gradient-to-b from-white via-sand-50/60 to-white py-14 sm:py-20"
      id="management"
    >
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-brand-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header Block */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
              Leadership &amp; Governance
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              Dignity, justice and equal opportunity guide our work.
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-700">
              BSGSS leadership brings together decades of distinguished public administration, policy expertise, and grassroots empathy.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/management"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-2xs transition-all hover:bg-brand-800 hover:shadow-soft"
            >
              <span>Full Leadership Messages</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 2 Seamless Leadership Profiles - NO BOXED CARDS / NO SIDE BORDERS */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {LEADERS.map((leader) => (
            <div
              key={leader.id}
              onClick={() => setActiveLeader(leader)}
              className="group relative cursor-pointer border-t border-slate-200/80 pt-6 pb-2 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Profile Layout */}
              <div className="grid gap-6 sm:grid-cols-[10rem_1fr] sm:items-center">
                {/* Portrait Plate */}
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-sand-100 shadow-sm sm:aspect-[4/5]">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 sm:opacity-30" />

                  {/* Corner Expand Indicator */}
                  <div className="absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-2xs backdrop-blur-md transition-transform group-hover:scale-110 group-hover:bg-brand-700 group-hover:text-white">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-brand-800 uppercase tracking-wider">
                        {leader.titleBadge}
                      </span>
                      <span className="text-[0.625rem] font-mono font-medium text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        <span>Executive</span>
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 group-hover:text-brand-800 transition-colors">
                      {leader.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold text-brand-700">
                      {leader.role}
                    </p>

                    <blockquote className="mt-3.5 text-sm leading-relaxed text-slate-700 italic border-l-2 border-brand-400 pl-3">
                      &ldquo;{leader.shortQuote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Interactive CTA Cue */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-200/70 pt-3 text-xs font-semibold text-brand-700 group-hover:text-brand-900">
                    <span className="flex items-center gap-1 text-xs text-brand-700 font-bold tracking-wide">
                      <Sparkles className="h-3 w-3" />
                      <span>Click to view speech &amp; live address</span>
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Luxury Smart Pop-Up Modal View with Live Typewriter Narrative */}
      {activeLeader && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveLeader(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header */}
            <div className="flex items-center justify-between border-b border-brand-100 bg-sand-50/80 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  {activeLeader.titleBadge} · Direct Address
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveLeader(null)}
                aria-label="Close modal"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-200/80 text-ink-muted transition hover:bg-rose-600 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-[11rem_1fr] sm:items-start">
                {/* Leader Portrait */}
                <div className="space-y-3">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-brand-200 bg-sand-100 shadow-md">
                    <img
                      src={activeLeader.image}
                      alt={activeLeader.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="rounded-xl border border-brand-100 bg-sand-50 p-3 text-center text-xs text-ink-muted">
                    <p className="font-bold text-ink">{activeLeader.name}</p>
                    <p className="mt-0.5 text-[0.6875rem] text-brand-700">{activeLeader.role}</p>
                  </div>
                </div>

                {/* Live Speech & Typewriter Text */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
                    <Quote className="h-3.5 w-3.5 text-brand-600" />
                    <span>Executive Transcript</span>
                  </div>

                  {/* Paragraph 1 with Live Typing Indicator */}
                  <div className="min-h-[5.5rem] rounded-xl border border-brand-200/70 bg-sand-50/50 p-4">
                    <p className="font-display text-base font-bold leading-relaxed text-ink sm:text-lg">
                      &ldquo;
                      <span>{activeLeader.fullMessage[0]?.slice(0, typedChars)}</span>
                      {typedChars < (activeLeader.fullMessage[0]?.length || 0) && (
                        <span className="ml-0.5 inline-block h-4 w-[2.5px] animate-pulse rounded-full bg-brand-700 align-middle shadow-[0_0_6px_rgba(35,104,115,0.7)]" />
                      )}
                      &rdquo;
                    </p>
                  </div>

                  {/* Following Paragraphs */}
                  {activeLeader.fullMessage.slice(1).map((para, idx) => (
                    <p key={idx} className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                      {para}
                    </p>
                  ))}

                  {/* Key Highlights */}
                  <div className="border-t border-brand-100 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-700 mb-2">
                      Key Strategic Pillars
                    </p>
                    <div className="space-y-1.5">
                      {activeLeader.keyHighlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-ink">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-100 bg-sand-50/60 px-6 py-3.5 text-xs text-ink-muted">
              <span className="font-medium">{activeLeader.tenure}</span>
              <div className="flex items-center gap-2">
                <Link
                  href="/management"
                  className="inline-flex items-center gap-1.5 font-bold text-brand-700 hover:text-brand-900 transition underline-offset-4 hover:underline"
                >
                  <span>Read complete leadership charter →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

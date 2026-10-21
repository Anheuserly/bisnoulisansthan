"use client";

import { ArrowDown, Download } from "lucide-react";

export function StoryHero() {
  const explore = () => document.getElementById("story-experience")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="relative isolate overflow-hidden border-b border-brand-800 bg-brand-900 text-white">
      <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full border border-brand-200/15" />
      <div className="pointer-events-none absolute -right-2 top-10 h-64 w-64 rounded-full border border-brand-200/15" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-brand-200/0 via-brand-200/40 to-brand-200/0" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20 md:px-8 md:py-24">
        <p className="motion-safe:animate-rise text-xs font-bold uppercase tracking-[.22em] text-brand-200 sm:text-sm">Our story · Since 1994</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-[-.025em] !text-white sm:text-5xl lg:text-6xl">
              A journey of practical change, shaped with communities.
            </h1>
            <p className="motion-safe:animate-rise mt-5 max-w-2xl text-base leading-relaxed text-brand-100 sm:text-lg [animation-delay:150ms]">
              Since 1994, BSGSS has worked alongside people across North India to turn access to learning, health and livelihoods into lasting opportunity.
            </p>
          </div>
          <div className="border-l border-brand-200/40 pl-5 lg:pb-1">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[.16em] text-brand-200">Grassroots record</p>
            <p className="mt-2 font-display text-3xl font-bold text-white">30+ years</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-100">Village-rooted work across education, healthcare, livelihoods and women’s agency.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={explore}
            className="motion-safe:animate-rise inline-flex items-center gap-3 text-sm font-semibold text-white [animation-delay:300ms] hover:text-brand-100 cursor-pointer"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-200/60">
              <ArrowDown className="h-4 w-4" />
            </span>
            <span>Explore Chronology</span>
          </button>
          <a
            href="/documents/bsgss-organisational-profile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="motion-safe:animate-rise inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 [animation-delay:350ms]"
          >
            <Download className="h-4 w-4 text-emerald-300" />
            <span>Download Profile (PDF)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

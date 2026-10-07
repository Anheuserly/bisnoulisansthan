"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";

export function StoryHero() {
  const explore = () => document.getElementById("story-experience")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-end overflow-hidden bg-brand-900 text-white md:min-h-[calc(100vh-4.5rem)]">
    <Image src="/images/bsgss/legacy-page-assets/44-homepage-aboutus.jpg" alt="BSGSS community work" fill priority sizes="100vw" className="z-0 object-cover object-center" />
    <div className="absolute inset-0 z-0 bg-gradient-to-t from-brand-900 via-brand-900/70 to-brand-900/25" />
    <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 pt-32 md:px-8 md:pb-16">
      <p className="motion-safe:animate-rise text-sm font-bold uppercase tracking-[.22em] text-brand-100">Our story</p>
      <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[.96] tracking-[-.03em] !text-white sm:text-6xl lg:text-8xl">A journey of practical change, shaped with communities.</h1>
      <p className="motion-safe:animate-rise mt-7 max-w-2xl text-lg leading-relaxed text-brand-100 [animation-delay:150ms]">Since 1994, BSGSS has worked alongside people across North India to turn access to learning, health and livelihoods into lasting opportunity.</p>
      <button type="button" onClick={explore} className="motion-safe:animate-rise mt-10 inline-flex items-center gap-3 text-sm font-semibold text-white [animation-delay:300ms] hover:text-brand-100"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50"><ArrowDown className="h-4 w-4" /></span>Scroll to explore</button>
    </div>
  </section>;
}

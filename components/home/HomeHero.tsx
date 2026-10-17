"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { content, links } from "@/config/content";

const { hero } = content.home;
const defaultSlides = hero.slides;

interface HomeHeroProps {
  slides?: string[];
}

export function HomeHero({ slides: customSlides }: HomeHeroProps = {}) {
  const activeSlides = customSlides && customSlides.length > 0 ? customSlides : defaultSlides;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % activeSlides.length), 4000);
    return () => window.clearInterval(interval);
  }, [activeSlides.length]);

  return (
    <section className="home-hero relative isolate overflow-hidden bg-[#0F172A] text-white">
      {/* Background Slideshow with Parallax Depth */}
      <div className="absolute inset-0">
        {activeSlides.map((src: string, index: number) => (
          <img
            key={src}
            src={src}
            alt="BSGSS Grassroots Impact and Field Activities"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
              activeSlide === index ? "scale-105 opacity-100" : "scale-100 opacity-0 pointer-events-none"
            }`}
          />
        ))}
      </div>

      {/* Luxury Cinematic Contrast Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/40 backdrop-blur-[0.5px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

      {/* Hero Shell */}
      <div className="relative mx-auto grid min-h-[30rem] max-w-6xl items-center px-4 py-14 sm:px-6 md:px-8 lg:min-h-[36rem]">
        <div className="max-w-3xl">
          {/* Institutional Credibility Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-4 py-1.5 text-xs font-bold tracking-widest text-amber-200 uppercase backdrop-blur-md shadow-xs">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span>EST. 1994 · REG. NO. S/26477 · 30 YEARS OF GRASSROOTS SARVODAYA</span>
          </div>

          <p className="mb-2.5 text-xs sm:text-sm font-extrabold uppercase tracking-[0.22em] text-teal-300">
            {hero.eyebrow}
          </p>

          <h1 className="font-display text-3xl font-extrabold leading-[1.12] text-white sm:text-4xl lg:text-5xl drop-shadow-md">
            {hero.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-200 font-medium">
            {hero.text}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={links.support}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-xs sm:text-sm font-extrabold text-slate-900 shadow-lift transition-all hover:bg-slate-100 hover:scale-105 active:scale-95"
            >
              <span>{hero.supportCta}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={links.about}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/70 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white"
            >
              <span>{hero.aboutCta}</span>
            </Link>
          </div>

          {/* Slide Indicator Bar & Mini-Thumbnail Navigation */}
          <div className="mt-10 flex items-center gap-2" aria-label={`Slide ${activeSlide + 1} of ${activeSlides.length}`}>
            {activeSlides.map((src: string, index: number) => {
              const isCurrent = activeSlide === index;
              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Switch to slide ${index + 1}`}
                  aria-current={isCurrent}
                  onClick={() => setActiveSlide(index)}
                  className={`group relative overflow-hidden rounded-lg transition-all duration-300 ${
                    isCurrent
                      ? "h-8 w-14 ring-2 ring-white shadow-md opacity-100 scale-105"
                      : "h-5 w-8 opacity-40 hover:opacity-80"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <div className={`absolute inset-0 ${isCurrent ? "bg-black/0" : "bg-black/40"}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { content, links } from "@/config/content";

const { hero } = content.home;
const defaultSlides = hero.slides;

const slideLabels = [
  "Village community mobilisation and health camp outreach",
  "Women vocational training in tailoring and apparel craft",
  "Computer literacy and digital education for rural youth",
  "Self-help group microfinance and women entrepreneurship",
];

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
            alt={slideLabels[index] || "BSGSS Grassroots Impact and Field Activities"}
            fetchPriority={index === 0 ? "high" : "low"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
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
      <div className="relative mx-auto grid min-h-[30rem] max-w-7xl items-center px-4 py-14 sm:px-6 md:px-8 lg:min-h-[36rem]">
        <div className="max-w-3xl">
          {/* Institutional Credibility Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-4 py-1.5 text-xs font-bold tracking-widest text-amber-200 uppercase backdrop-blur-md shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
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
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-xs sm:text-sm font-extrabold text-slate-900 shadow-lift transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{hero.supportCta}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={links.about}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/70 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{hero.aboutCta}</span>
            </Link>
          </div>

          {/* Slide Indicator Bar & Mini-Thumbnail Navigation with Prev/Next Controls (WCAG 2.2 AA) */}
          <div className="mt-10 flex flex-wrap items-center gap-3" aria-label="Hero Slideshow Controls">
            {/* Non-drag prev/next tap buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveSlide((current) => (current - 1 + activeSlides.length) % activeSlides.length)}
                aria-label="Previous slide"
                className="flex h-8 w-8 min-h-[32px] min-w-[32px] items-center justify-center rounded-lg border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((current) => (current + 1) % activeSlides.length)}
                aria-label="Next slide"
                className="flex h-8 w-8 min-h-[32px] min-w-[32px] items-center justify-center rounded-lg border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:scale-95"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Direct Thumbnail Selection with ≥ 24x24 px tap targets and descriptive aria-labels */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Slideshow thumbnail navigation">
              {activeSlides.map((src: string, index: number) => {
                const isCurrent = activeSlide === index;
                const label = slideLabels[index] || `BSGSS field photo ${index + 1}`;
                return (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={`Show slide ${index + 1}: ${label}`}
                    onClick={() => setActiveSlide(index)}
                    className={`group relative overflow-hidden rounded-lg transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${
                      isCurrent
                        ? "h-8 w-14 min-h-[28px] min-w-[32px] ring-2 ring-white shadow-md opacity-100 scale-105"
                        : "h-7 w-10 min-h-[28px] min-w-[32px] opacity-50 hover:opacity-90"
                    }`}
                  >
                    <img src={src} alt="" aria-hidden="true" className="h-full w-full object-cover" />
                    <div className={`absolute inset-0 ${isCurrent ? "bg-black/0" : "bg-black/40"}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

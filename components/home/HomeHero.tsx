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

      {/* Editorial contrast treatment: clear copy on the left, genuine field imagery on the right. */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/78 to-slate-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-slate-950/20 pointer-events-none" />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-teal-400/15 blur-3xl" />

      {/* Hero Shell */}
      <div className="relative mx-auto grid min-h-[34rem] max-w-7xl items-end gap-10 px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:min-h-[40rem] lg:grid-cols-[minmax(0,1fr)_15rem] lg:py-18">
        <div className="max-w-4xl">
          {/* Institution record — deliberately a typographic rail, not a promotional chip. */}
          <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-white/20 py-3 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-slate-200 sm:text-[0.6875rem]">
            <span className="text-amber-200">Established 1994</span>
            <span className="hidden h-3 w-px bg-white/30 sm:block" aria-hidden="true" />
            <span>Registration No. 226/1994-95, dated 15-06-1994</span>
            <span className="hidden h-3 w-px bg-white/30 sm:block" aria-hidden="true" />
            <span>30+ years of service</span>
          </div>

          <p className="mb-3 text-[0.6875rem] font-extrabold uppercase tracking-[0.24em] text-teal-300 sm:text-xs">
            {hero.eyebrow}
          </p>

          <h1 className="max-w-3xl font-display text-[2.7rem] font-extrabold leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.75rem] drop-shadow-md">
            {hero.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-100 sm:text-lg lg:text-xl">
            {hero.text}
          </p>

          {/* Primary actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={links.support}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-slate-900 shadow-lift transition-all hover:bg-slate-100 hover:scale-[1.02] active:scale-95 focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{hero.supportCta}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={links.about}
              className="inline-flex items-center gap-2 border-b border-white/70 px-1 py-3 text-sm font-bold text-white transition-all hover:border-white hover:text-teal-100 focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{hero.aboutCta}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Field-story navigator: an editorial control line replaces the small thumbnail-chip row. */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/20 pt-4" aria-label="Hero Slideshow Controls">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveSlide((current) => (current - 1 + activeSlides.length) % activeSlides.length)}
                aria-label="Previous slide"
                className="flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center border border-white/30 text-white transition hover:border-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((current) => (current + 1) % activeSlides.length)}
                aria-label="Next slide"
                className="flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center border border-white/30 text-white transition hover:border-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:scale-95"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center gap-3" role="tablist" aria-label="Slideshow thumbnail navigation">
              <span className="font-mono text-xs font-bold tracking-[0.14em] text-teal-200">
                {String(activeSlide + 1).padStart(2, "0")} / {String(activeSlides.length).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1.5">
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
                    className={`h-2.5 rounded-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${
                      isCurrent
                        ? "w-10 bg-teal-300"
                        : "w-4 bg-white/35 hover:bg-white/80"
                    }`}
                  />
                );
              })}
              </div>
            </div>
          </div>
        </div>

        {/* The image retains meaning on large screens, rather than becoming empty visual space. */}
        <div className="hidden self-end border-l border-white/30 pb-1 pl-5 lg:block">
          <p className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-teal-200">In focus</p>
          <p className="mt-2 font-display text-xl font-bold leading-snug text-white">
            {slideLabels[activeSlide] || "BSGSS field activities"}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-200">
            Documentary field imagery from BSGSS programmes across North India.
          </p>
        </div>
      </div>
    </section>
  );
}

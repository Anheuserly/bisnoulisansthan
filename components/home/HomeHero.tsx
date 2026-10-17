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
    <section className="home-hero relative isolate overflow-hidden bg-[#182226] text-white">
      <div className="absolute inset-0">
        {activeSlides.map((src: string, index: number) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
              activeSlide === index ? "scale-105 opacity-100" : "scale-100 opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="home-hero-overlay absolute inset-0 bg-gradient-to-r from-[#141d20]/95 via-[#182226]/85 to-[#182226]/30 backdrop-blur-[0.5px]" />
      <div className="home-hero-shell relative mx-auto grid min-h-[26rem] max-w-6xl items-center px-4 py-12 sm:px-6 md:px-8 lg:min-h-[32rem]">
        <div className="home-hero-content max-w-3xl">
          {/* Institutional Credibility Badge */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-[0.6875rem] font-bold tracking-wider text-amber-200 uppercase backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>EST. 1994 · REG. NO. S/26477 · 30 YEARS OF GRASSROOTS SARVODAYA</span>
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl drop-shadow-sm">
            {hero.title}
          </h1>
          <p className="mt-3.5 max-w-3xl text-sm leading-relaxed text-white/90 sm:text-[15px]">
            {hero.text}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={links.support}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-[#182226] shadow-2xs transition hover:bg-brand-50 sm:text-sm"
            >
              {hero.supportCta} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={links.about}
              className="inline-flex items-center gap-2 rounded-lg border border-white/50 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10 sm:text-sm"
            >
              {hero.aboutCta}
            </Link>
          </div>
          <div
            className="mt-6 flex gap-2"
            aria-label={`Slide ${activeSlide + 1} of ${activeSlides.length}`}
          >
            {activeSlides.map((_: string, index: number) => (
              <button
                key={index}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                aria-current={activeSlide === index}
                onClick={() => setActiveSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  activeSlide === index ? "w-8 bg-white" : "w-3.5 bg-white/45 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

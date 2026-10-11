"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { content, links } from "@/config/content";

const { hero } = content.home;
const slides = hero.slides;

export function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 4000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#182226] text-white">
      <div className="absolute inset-0">
        {slides.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#182226]/95 via-[#182226]/76 to-[#182226]/20" />
      <div className="relative mx-auto grid min-h-[26rem] max-w-6xl items-center px-4 py-10 sm:px-6 md:px-8 lg:min-h-[30rem]">
        <div className="max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            {hero.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-[15px]">
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
            aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}
          >
            {slides.map((_, index) => (
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

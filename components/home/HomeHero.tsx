"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const slides = [
  "/images/bsgss/banners/589-banner-1.webp",
  "/images/bsgss/banners/590-banner-2.webp",
  "/images/bsgss/banners/592-banner-3.webp",
  "/images/bsgss/banners/593-untitled-4.webp",
];

export function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 4000);
    return () => window.clearInterval(interval);
  }, []);

  return <section className="relative isolate overflow-hidden bg-[#182226] text-white"><div className="absolute inset-0">{slides.map((src, index) => <img key={src} src={src} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${activeSlide === index ? "opacity-100" : "opacity-0"}`} />)}</div><div className="absolute inset-0 bg-gradient-to-r from-[#182226]/95 via-[#182226]/76 to-[#182226]/20" /><div className="relative mx-auto grid min-h-[34rem] max-w-6xl items-center px-5 py-20 md:px-8 lg:min-h-[39rem]"><div className="max-w-3xl"><p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-white/75">Bisnouli Sarvodaya Gramodyog Sewa Sansthan</p><h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">Empowering communities. Creating opportunities.</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">Since 1994, BSGSS has worked with underprivileged families across Uttar Pradesh, Delhi, Haryana and Punjab through education, healthcare, skills and women’s empowerment.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/support" className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-[#182226] transition hover:bg-brand-50">Support our work <ArrowRight className="h-4 w-4" /></Link><Link href="/about" className="inline-flex items-center gap-2 rounded-md border border-white/50 px-5 py-3 font-semibold text-white transition hover:bg-white/10">About BSGSS</Link></div><div className="mt-10 flex gap-2" aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}>{slides.map((_, index) => <button key={index} type="button" aria-label={`Show slide ${index + 1}`} aria-current={activeSlide === index} onClick={() => setActiveSlide(index)} className={`h-1.5 rounded-full transition-all ${activeSlide === index ? "w-9 bg-white" : "w-4 bg-white/45 hover:bg-white/80"}`} />)}</div></div></div></section>;
}

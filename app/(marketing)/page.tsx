import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Handshake,
  HeartPulse,
  Landmark,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { InteractiveIndiaMap } from "@/components/impact/InteractiveIndiaMap";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeLiveTyping } from "@/components/home/HomeLiveTyping";
import { HomePhotoCollage } from "@/components/home/HomePhotoCollage";
import { HomeMediaShowcase } from "@/components/home/HomeMediaShowcase";
import { HomeImpactCounters } from "@/components/home/HomeImpactCounters";
import { HomeManagementSection } from "@/components/home/HomeManagementSection";
import { PartnerLogoWall } from "@/components/partners/PartnerLogoWall";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { site } from "@/config/site";
import { content, links } from "@/config/content";
import { DEFAULT_CUSTOMIZER_SETTINGS } from "@/config/customizer";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";
import { getConsentedVoices } from "@/lib/voices";
import { VoiceCard } from "@/components/voice/VoiceCard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Bisnouli Sarvodaya | Community Development Since 1994",
  description:
    "Discover BSGSS community development across North India since 1994. Supporting rural women, healthcare camps, skill training, and village self-reliance.",
  path: "/",
});

const programs = content.home.programmes.map((programme) => ({
  ...programme,
  href: links.programmes,
}));

export default async function HomePage() {
  const customizer = await getCustomizerSettings();
  const voices = getConsentedVoices().slice(0, 3);

  // Dynamic texts from customizer with resilient fallback
  const texts = customizer.texts || DEFAULT_CUSTOMIZER_SETTINGS.texts;
  const { about, government, programmes: progTexts, partners: partnerTexts, support: supportTexts } = texts;

  const orderedSections = [...customizer.sections]
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "hero":
        return (
          <div key="hero-group">
            <HomeHero slides={customizer.images.heroSlides} />
            {/* International Institutional Credibility & Statutory Trust Strip */}
            <div className="border-b border-brand-200/60 bg-white py-3.5 shadow-2xs">
              <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-12">
                <div className="flex flex-wrap items-center gap-6 text-[0.8125rem] font-semibold text-brand-950">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-700" />
                    <span>NITI Aayog Darpan Verified (DL/2016/0107779)</span>
                  </span>
                  <span className="hidden sm:inline text-brand-300">|</span>
                  <span className="flex items-center gap-2">
                    <Landmark className="h-4 w-4 text-brand-700" />
                    <span>Income Tax 12A &amp; 80G Certified</span>
                  </span>
                  <span className="hidden md:inline text-brand-300">|</span>
                  <span className="hidden md:flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-brand-700" />
                    <span>MCA Registered for CSR (CSR00004514)</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[0.75rem] font-bold tracking-wider text-brand-800 uppercase">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-800" />
                  <span>Audited Grassroots Accountability</span>
                </div>
              </div>
            </div>

            {/* UN Sustainable Development Goals (SDG) Alignment Bar */}
            <div className="border-b border-line bg-sand-50/50 py-2.5">
              <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 xl:px-12 text-xs">
                <span className="font-bold uppercase tracking-[0.16em] text-brand-850">
                  Global Humanitarian Alignment
                </span>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-700 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="font-bold text-ink">SDG 1:</span>
                    <span>No Poverty</span>
                  </span>
                  <span className="hidden sm:inline text-slate-300">·</span>
                  <span className="flex items-center gap-1.5">
                    <span className="font-bold text-ink">SDG 3:</span>
                    <span>Good Health &amp; Well-being</span>
                  </span>
                  <span className="hidden sm:inline text-slate-300">·</span>
                  <span className="flex items-center gap-1.5">
                    <span className="font-bold text-ink">SDG 5:</span>
                    <span>Gender Equality</span>
                  </span>
                  <span className="hidden sm:inline text-slate-300">·</span>
                  <span className="flex items-center gap-1.5">
                    <span className="font-bold text-ink">SDG 8:</span>
                    <span>Decent Work &amp; Economic Growth</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "live_ticker":
        return (
          <ScrollReveal key="live_ticker" direction="up" delay={60} distance={18}>
            <HomeLiveTyping data={customizer.typing} />
          </ScrollReveal>
        );

      case "photo_collage":
        return (
          <ScrollReveal key="photo_collage" direction="up" delay={80}>
            <HomePhotoCollage photos={customizer.images.collagePhotos} />
          </ScrollReveal>
        );

      case "about":
        return (
          <section key="about" className="relative isolate overflow-hidden border-b border-brand-100 bg-gradient-to-b from-white via-sand-50/50 to-white py-12 sm:py-16" id="about">
            {/* Ambient subtle backdrops */}
            <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-brand-200/25 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
              {/* Top Section: Narrative Column Left + High-Impact Documentary Photo Right */}
              <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                {/* Left Text & Mission Column (7 cols) - Upgraded Visibility Standard */}
                <ScrollReveal direction="up" delay={50} className="lg:col-span-7">
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
                    {about.eyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.12] tracking-tight">
                    {about.title}
                  </h2>
                  <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-800 font-normal leading-relaxed">
                    {about.text}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href={links.about}
                      className="inline-flex items-center gap-2.5 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-2xs transition-all hover:bg-brand-800 hover:shadow-soft"
                    >
                      <span>Explore BSGSS Institutional Profile</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={links.story}
                      className="inline-flex items-center gap-2.5 rounded-xl border border-brand-200/90 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                    >
                      <span>Our 30-Year Story</span>
                    </Link>
                  </div>
                </ScrollReveal>

                {/* Right Photographic Visual: Real Village Empowerment Photo with Authentic Washi Pin (5 cols) */}
                <ScrollReveal direction="scale" delay={150} className="relative lg:col-span-5">
                  <div className="group relative overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                    {/* Washi-Tape / Polaroid Pin */}
                    <div className="absolute left-1/2 -top-2.5 z-20 h-5 w-20 -translate-x-1/2 rounded-xs bg-amber-100/90 shadow-xs backdrop-blur-xs border border-amber-200/80" />

                    <div className="relative aspect-[4/3] overflow-hidden bg-sand-100 sm:aspect-[16/11]">
                      <img
                        src="/images/bsgss/other-source-assets/233-1.jpg"
                        alt="Village women learning vocational tailoring at BSGSS centre"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-106"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Top location tag */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-white backdrop-blur-md border border-white/20">
                          <MapPin className="h-3 w-3 text-emerald-400" />
                          <span>Bisnouli Village, Dadri</span>
                        </span>
                      </div>

                      {/* Bottom caption */}
                      <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                        <p className="font-display text-sm font-bold sm:text-base">
                          Grassroots Self-Reliance in Action
                        </p>
                        <p className="mt-0.5 text-xs text-white/80 line-clamp-2">
                          Vocational training and micro-finance bringing economic agency to rural households since 1994.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Bottom 4 Institutional Credibility Highlights - NO VISIBLE CARD, NO SIDE BORDERS, NO COLOR ICONS */}
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {(about.highlights || []).map((item, idx) => (
                  <ScrollReveal key={item.title} staggerIndex={idx} direction="up">
                    <div className="group h-full border-t border-slate-200/80 pt-6 transition-all duration-200">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-700">
                        0{idx + 1} // STATUTORY RECORD
                      </span>
                      <p className="mt-2.5 font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        );

      case "programmes":
        return (
          <section key="programmes" className="py-12 sm:py-16" id="programs">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
              <ScrollReveal direction="up" delay={40}>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-brand-700">
                  {progTexts.eyebrow}
                </p>
                <div className="flex flex-wrap items-end justify-between gap-4 mt-2">
                  <h2 className="max-w-3xl font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                    {progTexts.title}
                  </h2>
                  <Link
                    href={links.programmes}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors"
                  >
                    <span>Explore all key programmes</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>

              {/* Programmes - NO VISIBLE CARDS / NO SIDE BORDERS, OPEN EDITORIAL LAYOUT */}
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {programs.map(({ title, text, image, imageAlt, href }, idx) => (
                  <ScrollReveal key={title} staggerIndex={idx} direction="up">
                    <Link
                      href={href}
                      className="group flex h-full flex-col overflow-hidden transition duration-200 hover:-translate-y-1"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-sand-100 shadow-sm">
                        <Image
                          src={image}
                          alt={imageAlt}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-brand-800 shadow-sm backdrop-blur-sm">
                          BSGSS programme
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col pt-5 pb-2">
                        <h3 className="font-display text-xl font-bold text-slate-900 transition-colors group-hover:text-brand-800">
                          {title}
                        </h3>
                        <p className="mt-2.5 flex-1 text-sm sm:text-base leading-relaxed text-slate-600 transition-colors group-hover:text-slate-900">
                          {text}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors group-hover:text-brand-900">
                          <span>Explore programme</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        );

      case "media_showcase":
        return (
          <ScrollReveal key="media_showcase" direction="up" delay={60}>
            <HomeMediaShowcase />
          </ScrollReveal>
        );

      case "government":
        return (
          <section key="government" className="border-b border-brand-100 bg-sand-50/70 py-12 sm:py-16" id="government">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:px-8 xl:px-12 md:grid-cols-[1fr_1.1fr] md:items-center">
              <ScrollReveal direction="up" delay={50}>
                {/* Left Column: Seamless & Borderless (NO BOXED CARD) */}
                <div className="text-ink">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-700">
                    GOVERNMENT INITIATIVES
                  </span>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wider text-brand-700">{government.eyebrow}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-slate-900 sm:text-3xl lg:text-4xl">{government.title}</h2>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">{government.text}</p>
                  <Link
                    href={links.government}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-2xs transition hover:bg-brand-800"
                  >
                    <span>{government.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={140}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{government.overviewEyebrow}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl">{government.overviewTitle}</h2>
                  <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-700">{government.overviewText}</p>
                  <Link
                    href={links.government}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 hover:underline"
                  >
                    <span>{government.overviewCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>
        );

      case "impact_stats":
        return (
          <ScrollReveal key="impact_stats" direction="up" delay={50}>
            <HomeImpactCounters />
          </ScrollReveal>
        );

      case "india_map":
        return (
          <ScrollReveal key="india_map" direction="scale" delay={80}>
            <InteractiveIndiaMap customizerConfig={customizer.footprint} />
          </ScrollReveal>
        );

      case "partners":
        return (
          <section key="partners" className="relative isolate overflow-hidden bg-gradient-to-b from-white via-sand-50/70 to-white py-12 sm:py-16 border-b border-brand-100" id="partners">
            {/* Ambient subtle backdrops */}
            <div className="pointer-events-none absolute -left-28 top-1/3 h-96 w-96 rounded-full bg-brand-200/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-28 bottom-1/4 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />

            {/* Header Content with Max Width */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr] md:items-end">
                <ScrollReveal direction="up" delay={40}>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
                    {partnerTexts.eyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                    {partnerTexts.title}
                  </h2>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                    {partnerTexts.description}
                  </p>
                </ScrollReveal>

                {/* 3 Stats - NO VISIBLE BOXED CARDS / NO SIDE BORDERS */}
                <div className="grid grid-cols-3 gap-4">
                  {(partnerTexts.stats || []).map((card, idx) => (
                    <ScrollReveal key={card.stat} staggerIndex={idx} direction="up">
                      <div className="border-t border-slate-200/80 pt-4">
                        <span className="font-mono text-[10px] font-bold text-brand-700 uppercase">
                          0{idx + 1} // CSR
                        </span>
                        <p className="mt-1 font-display text-2xl sm:text-3xl font-black text-slate-900">{card.stat}</p>
                        <p className="mt-1 text-xs sm:text-sm font-medium leading-snug text-slate-600">{card.desc}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>

            {/* Full-Width Edge-to-Edge Logo Wall (No Borders, Free Floating, Infinite Upward Motion) */}
            <ScrollReveal direction="up" delay={100} className="relative mt-9 w-full overflow-hidden px-2 sm:px-4 md:px-8">
              {/* Top & Bottom seamless gradient masks for luxury floating effect */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-16 bg-gradient-to-b from-white via-white/80 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-white via-white/80 to-transparent" />

              <div className="mx-auto max-w-[94rem]">
                <PartnerLogoWall />
              </div>
            </ScrollReveal>

            {/* Bottom Citation & Link */}
            <div className="mx-auto mt-6 flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 xl:px-12 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <ShieldCheck className="h-3.5 w-3.5 text-slate-700" />
                <span>Verified corporate partnerships from statutory records. Hover over any column to pause scrolling.</span>
              </span>
              <Link href="/about/partners" className="font-semibold text-brand-700 hover:text-brand-900 transition-colors underline-offset-4 hover:underline">
                View all 30 partner profiles &amp; projects →
              </Link>
            </div>
          </section>
        );

      case "management":
        return (
          <ScrollReveal key="management" direction="up" delay={60}>
            <HomeManagementSection />
          </ScrollReveal>
        );

      case "support_cta":
        return (
          <div key="support-and-voices">
            {voices.length > 0 && (
              <section className="py-12 sm:py-16 bg-sand-50/60 border-t border-line">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-line pb-4 mb-8">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                        Community Audio Dispatches
                      </span>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 mt-2">
                        Voice of the Village
                      </h2>
                      <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-2xl">
                        Listen directly to rural women artisans and community members in their own words. Audio loads only on tap.
                      </p>
                    </div>
                    <Link
                      href="/stories"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition underline-offset-4 hover:underline"
                    >
                      <span>View all stories</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {voices.map((voice) => (
                      <VoiceCard key={voice.id} voice={voice} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            <ScrollReveal direction="scale" delay={50}>
              <section className="py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
                  {/* Clean Expansive Band - NO BOXED CARD CONTAINER WITH SIDE BORDERS */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-t border-b border-brand-200/80 py-9">
                    <div className="max-w-3xl">
                      <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand-700">
                        {supportTexts.eyebrow}
                      </p>
                      <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                        {supportTexts.title}
                      </h2>
                      <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                        {supportTexts.description}
                      </p>
                    </div>
                    <Link
                      href="/support"
                      className="inline-flex shrink-0 items-center justify-center rounded-xl bg-brand-700 px-7 py-4 text-base font-semibold text-white shadow-2xs transition-all hover:bg-brand-800 hover:shadow-soft"
                    >
                      <span>{supportTexts.buttonText}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {orderedSections.map((s) => renderSection(s.id))}
    </>
  );
}

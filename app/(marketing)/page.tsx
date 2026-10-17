import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  HandHeart,
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
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";

export const metadata: Metadata = {
  title: content.home.metadataTitle,
  description: site.description,
};

const programmeIcons = [BookOpen, HeartPulse, HandHeart, Users];
const programs = content.home.programmes.map((programme, index) => ({
  ...programme,
  icon: programmeIcons[index] ?? BookOpen,
  href: links.programmes,
}));

export default async function HomePage() {
  const customizer = await getCustomizerSettings();
  const { about, government } = content.home;

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
            <div className="border-b border-brand-200/60 bg-white py-3 shadow-2xs">
              <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
                <div className="flex flex-wrap items-center gap-6 text-[0.75rem] font-semibold text-brand-950">
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
                <div className="flex items-center gap-2 text-[0.6875rem] font-bold tracking-wider text-brand-800 uppercase">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Audited Grassroots Accountability</span>
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
          <section key="about" className="relative isolate overflow-hidden border-b border-brand-100 bg-gradient-to-b from-white via-sand-50/50 to-white py-14 sm:py-20" id="about">
            {/* Ambient subtle backdrops */}
            <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-brand-200/25 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
              {/* Top Section: Narrative Column Left + High-Impact Documentary Photo Right */}
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                {/* Left Text & Mission Column (7 cols) */}
                <ScrollReveal direction="up" delay={50} className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/90 bg-white/95 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-800 shadow-2xs backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
                    <span>{about.eyebrow}</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl lg:text-[2.35rem]">
                    {about.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                    {about.text}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      href={links.about}
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-brand-800 hover:shadow-soft sm:text-sm"
                    >
                      <span>Explore BSGSS Institutional Profile</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={links.story}
                      className="inline-flex items-center gap-2 rounded-xl border border-brand-200/90 bg-white px-4 py-2.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-50 sm:text-sm"
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

              {/* Bottom 4 Institutional Credibility Highlights */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Since 1994",
                    desc: "Registered under Societies Registration Act XXI of 1860 with 12A & 80G tax exemptions.",
                  },
                  {
                    icon: Users,
                    title: "350+ Villages",
                    desc: "Community-based reach across Delhi NCR, Haryana, UP, Punjab and Rajasthan.",
                  },
                  {
                    icon: HeartPulse,
                    title: "Healthcare & Skills",
                    desc: "Mobile clinics, cancer check-ups and vocational pathways for rural women.",
                  },
                  {
                    icon: Handshake,
                    title: "30+ CSR Partners",
                    desc: "Trusted collaboration with leading public sector enterprises and institutions.",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <ScrollReveal key={item.title} staggerIndex={idx} direction="up">
                      <div className="group h-full rounded-2xl border border-brand-200/80 bg-white p-5 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:scale-110">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="mt-3.5 font-display text-lg font-bold text-ink">{item.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-ink-muted">{item.desc}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>
        );

      case "programmes":
        return (
          <section key="programmes" className="py-12 sm:py-16" id="programs">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <ScrollReveal direction="up" delay={40}>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">Our key programmes</p>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <h2 className="mt-2 max-w-2xl font-display text-2xl font-bold text-ink sm:text-3xl">
                    Development that meets people where they are.
                  </h2>
                  <Link
                    href={links.programmes}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors"
                  >
                    Explore all key programmes <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {programs.map(({ title, text, icon: Icon, href }, idx) => (
                  <ScrollReveal key={title} staggerIndex={idx} direction="up">
                    <Link
                      href={href}
                      className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold text-ink group-hover:text-brand-800 transition-colors">
                        {title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted group-hover:text-brand-900/80 transition-colors">
                        {text}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition-colors">
                        Explore programme <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
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
          <section key="government" className="border-b border-brand-100 bg-sand-50/70 py-10 sm:py-14" id="government">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-8">
              <ScrollReveal direction="up" delay={50}>
                <div className="rounded-2xl border border-brand-200/80 bg-white p-6 sm:p-8 text-ink shadow-2xs">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 shadow-2xs">
                    <Building2 className="h-6 w-6" />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-brand-700">{government.eyebrow}</p>
                  <h2 className="mt-2 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">{government.title}</h2>
                  <p className="mt-3 text-xs leading-relaxed text-ink-muted sm:text-sm">{government.text}</p>
                  <Link
                    href={links.government}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
                  >
                    {government.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={140}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{government.overviewEyebrow}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">{government.overviewTitle}</h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">{government.overviewText}</p>
                  <Link
                    href={links.government}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline sm:text-sm"
                  >
                    {government.overviewCta} <ArrowRight className="h-4 w-4" />
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
            <InteractiveIndiaMap />
          </ScrollReveal>
        );

      case "partners":
        return (
          <section key="partners" className="relative isolate overflow-hidden bg-gradient-to-b from-white via-sand-50/70 to-white py-14 sm:py-20 border-b border-brand-100" id="partners">
            {/* Ambient subtle backdrops */}
            <div className="pointer-events-none absolute -left-28 top-1/3 h-96 w-96 rounded-full bg-brand-200/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-28 bottom-1/4 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />

            {/* Header Content with Max Width */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
              <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr] md:items-end">
                <ScrollReveal direction="up" delay={40}>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-800 shadow-2xs">
                    <Handshake className="h-3.5 w-3.5 text-brand-700" />
                    <span>Institutional CSR Alliances</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl lg:text-4xl">
                    Collaboration that turns institutional trust into grassroots action.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                    BSGSS collaborates with public sector giants and national leaders to deliver preventive oncology checkups, women&apos;s vocational tailoring guilds, and decentralized potable water plants.
                  </p>
                </ScrollReveal>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      icon: Handshake,
                      iconColor: "text-brand-700",
                      stat: "30+",
                      desc: "PSU & Corporate CSR Records",
                    },
                    {
                      icon: HeartPulse,
                      iconColor: "text-rose-600",
                      stat: "Healthcare",
                      desc: "Oncology, Eyes & General Meds",
                    },
                    {
                      icon: Users,
                      iconColor: "text-brand-700",
                      stat: "Khadi Skills",
                      desc: "Self Help Groups & Micro-Credit",
                    },
                  ].map((card, idx) => {
                    const CardIcon = card.icon;
                    return (
                      <ScrollReveal key={card.stat} staggerIndex={idx} direction="up">
                        <div className="h-full rounded-xl border border-brand-200/80 bg-white/90 p-4 shadow-2xs backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1">
                          <CardIcon className={`h-5 w-5 ${card.iconColor}`} />
                          <p className="mt-2 font-display text-xl font-bold text-ink sm:text-2xl">{card.stat}</p>
                          <p className="mt-0.5 text-[0.6875rem] font-medium leading-snug text-ink-muted">{card.desc}</p>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Full-Width Edge-to-Edge Logo Wall (No Borders, Free Floating, Infinite Upward Motion) */}
            <ScrollReveal direction="up" delay={100} className="relative mt-10 w-full overflow-hidden px-2 sm:px-4 md:px-8">
              {/* Top & Bottom seamless gradient masks for luxury floating effect */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-16 bg-gradient-to-b from-white via-white/80 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-white via-white/80 to-transparent" />

              <div className="mx-auto max-w-[94rem]">
                <PartnerLogoWall />
              </div>
            </ScrollReveal>

            {/* Bottom Citation & Link */}
            <div className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 md:px-8 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5 font-medium text-ink-muted">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
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
          <ScrollReveal key="support_cta" direction="scale" delay={50}>
            <section className="py-10 sm:py-14">
              <div className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-brand-200 bg-brand-50 px-7 py-8 md:grid-cols-[1fr_auto] md:items-center md:px-12 shadow-2xs">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-700 shadow-sm">
                    <Landmark className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Support BSGSS</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">Your contribution can strengthen a community.</h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-ink-muted">Explore secure support options, including bank transfer and UPI donation details.</p>
                </div>
                <Link href="/support" className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white shadow-2xs transition-all hover:bg-brand-800 hover:shadow-soft">
                  Support us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </section>
          </ScrollReveal>
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

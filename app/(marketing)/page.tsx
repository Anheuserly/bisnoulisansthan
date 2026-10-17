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
  ShieldCheck,
  Users,
} from "lucide-react";
import { InteractiveIndiaMap } from "@/components/impact/InteractiveIndiaMap";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeLiveTyping } from "@/components/home/HomeLiveTyping";
import { HomePhotoCollage } from "@/components/home/HomePhotoCollage";
import { HomeMediaShowcase } from "@/components/home/HomeMediaShowcase";
import { PartnerLogoWall } from "@/components/partners/PartnerLogoWall";
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
  const { about, government, impact, management } = content.home;

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
                    <span>Income Tax 12A & 80G Certified</span>
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
        return <HomeLiveTyping key="live_ticker" data={customizer.typing} />;

      case "photo_collage":
        return <HomePhotoCollage key="photo_collage" photos={customizer.images.collagePhotos} />;

      case "about":
        return (
          <section key="about" className="border-b border-brand-100 bg-sand-50/70 py-10 sm:py-14" id="about">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">{about.eyebrow}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                    {about.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                    {about.text}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href={links.about}
                      className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
                    >
                      Learn about BSGSS <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={links.story}
                      className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-50 sm:text-sm"
                    >
                      Our story since 1994
                    </Link>
                  </div>
                </div>

                {/* Trust and Scope Highlights */}
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div className="rounded-xl border border-brand-200/80 bg-white p-5 shadow-2xs">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <p className="mt-3.5 font-display text-lg font-bold text-ink">Since 1994</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">Registered under Societies Registration Act XXI of 1860 with 12A & 80G tax exemptions.</p>
                  </div>
                  <div className="rounded-xl border border-brand-200/80 bg-white p-5 shadow-2xs">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Users className="h-5 w-5" />
                    </span>
                    <p className="mt-3.5 font-display text-lg font-bold text-ink">350+ Villages</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">Community-based reach across Delhi NCR, Haryana, UP, Punjab and Rajasthan.</p>
                  </div>
                  <div className="rounded-xl border border-brand-200/80 bg-white p-5 shadow-2xs">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <HeartPulse className="h-5 w-5" />
                    </span>
                    <p className="mt-3.5 font-display text-lg font-bold text-ink">Healthcare & Skills</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">Mobile clinics, cancer check-ups and vocational pathways for rural women.</p>
                  </div>
                  <div className="rounded-xl border border-brand-200/80 bg-white p-5 shadow-2xs">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Handshake className="h-5 w-5" />
                    </span>
                    <p className="mt-3.5 font-display text-lg font-bold text-ink">30+ CSR Partners</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">Trusted collaboration with leading public sector enterprises and institutions.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "programmes":
        return (
          <section key="programmes" className="py-10 sm:py-14" id="programs">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
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
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {programs.map(({ title, text, icon: Icon, href }) => (
                  <Link
                    key={title}
                    href={href}
                    className="group rounded-xl border border-line bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink group-hover:text-brand-800 transition-colors">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted group-hover:text-brand-900/80 transition-colors">
                      {text}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:text-brand-900 transition-colors">
                      Explore programme <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );

      case "media_showcase":
        return <HomeMediaShowcase key="media_showcase" />;

      case "government":
        return (
          <section key="government" className="border-b border-brand-100 bg-sand-50/70 py-8 sm:py-10" id="government">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-8">
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
            </div>
          </section>
        );

      case "impact_stats":
        return (
          <section key="impact_stats" className="border-b border-brand-100 bg-brand-50 py-10 sm:py-14" id="impact">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">{impact.eyebrow}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">{impact.title}</h2>
                </div>
                <Link href={links.impact} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">
                  {impact.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {impact.stats.map((stat) => (
                  <Stat key={stat.label} {...stat} />
                ))}
              </div>
            </div>
          </section>
        );

      case "india_map":
        return <InteractiveIndiaMap key="india_map" />;

      case "partners":
        return (
          <section key="partners" className="bg-brand-50 py-10 sm:py-14 border-b border-brand-100" id="partners">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <div className="grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">Partnerships</p>
                  <h2 className="mt-2 max-w-xl font-display text-2xl font-bold text-ink sm:text-3xl">Collaboration that turns support into local action.</h2>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">BSGSS works alongside CSR and institutional partners to bring healthcare, women&apos;s vocational training and practical community support to places where it is needed most.</p>
                  <Link href="/about/partners" className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-700 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-900">Explore partner stories <ArrowRight className="h-4 w-4" /></Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
                  <div className="rounded-xl border border-brand-200 bg-white p-5 shadow-sm"><Handshake className="h-6 w-6 text-brand-700" /><p className="mt-4 font-display text-3xl font-bold text-ink">30</p><p className="mt-1 text-sm leading-relaxed text-ink-muted">CSR partner profiles with an individual BSGSS record.</p></div>
                  <div className="rounded-xl border border-brand-200 bg-white p-5 shadow-sm"><HeartPulse className="h-6 w-6 text-brand-700" /><p className="mt-4 font-display text-xl font-bold text-ink">Healthcare</p><p className="mt-1 text-sm leading-relaxed text-ink-muted">A central focus across many recorded partnerships.</p></div>
                  <div className="rounded-xl border border-brand-200 bg-white p-5 shadow-sm"><Users className="h-6 w-6 text-brand-700" /><p className="mt-4 font-display text-xl font-bold text-ink">Skills for women</p><p className="mt-1 text-sm leading-relaxed text-ink-muted">Vocational pathways that support income and agency.</p></div>
                </div>
              </div>

              {/* Interactive Marquee Wall */}
              <div className="mt-10 rounded-2xl border border-brand-200/80 bg-white p-3.5 shadow-2xs sm:p-5">
                <PartnerLogoWall />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
                <p>Logos reproduced from official statutory records. Hover over any column to pause scrolling, or select to view partnership details.</p>
                <Link href="/about/partners" className="font-semibold text-brand-700 hover:text-brand-900 transition-colors">
                  View all 30 partner profiles →
                </Link>
              </div>
            </div>
          </section>
        );

      case "management":
        return (
          <section key="management" className="py-10 sm:py-14 border-b border-brand-100">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">{management.eyebrow}</p>
                <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">{management.title}</h2>
                <p className="mt-4 leading-relaxed text-ink-muted">{management.text}</p>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <ManagementCard name="Vijay Kumar Jha" role="Ex-IPS · Chairperson, BSGSS, New Delhi" image="/images/bsgss/other-source-assets/335-11111.jpg" message="Our mission is practical and sustainable: empower communities, support women and enable access to quality healthcare." />
                <ManagementCard name="Nandita Bakshi" role="Ex-IRS · CEO, BSGSS, New Delhi" image="/images/bsgss/other-source-assets/334-111.jpg" message="BSGSS is grounded in dignity, justice and equal opportunity—creating meaningful change for people who are often left out, especially women." />
              </div>
              <Link href={links.management} className="mt-6 inline-flex items-center gap-2 rounded-md border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50">
                {management.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        );

      case "support_cta":
        return (
          <section key="support_cta" className="py-10 sm:py-12">
            <div className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-brand-200 bg-brand-50 px-7 py-8 md:grid-cols-[1fr_auto] md:items-center md:px-12">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-700 shadow-sm">
                  <Landmark className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Support BSGSS</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">Your contribution can strengthen a community.</h2>
                <p className="mt-2 max-w-2xl leading-relaxed text-ink-muted">Explore secure support options, including bank transfer and UPI donation details.</p>
              </div>
              <Link href="/support" className="inline-flex items-center justify-center rounded-md bg-brand-700 px-5 py-2.5 font-semibold text-white hover:bg-brand-800">
                Support us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>
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

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl border border-brand-100 bg-white p-6 shadow-sm">
      <p className="font-display text-4xl font-bold text-brand-800">{number}</p>
      <p className="mt-2 max-w-48 text-sm leading-relaxed text-ink-muted">{label}</p>
    </div>
  );
}

function ManagementCard({ name, role, image, message }: { name: string; role: string; image: string; message: string }) {
  return (
    <article className="group grid overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-white to-brand-50/70 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:grid-cols-[10rem_1fr]">
      <div className="overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={name} className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="relative p-6">
        <span className="absolute left-6 top-0 h-1 w-12 rounded-b-full bg-brand-500" />
        <p className="mt-2 font-display text-xl font-semibold text-ink">{name}</p>
        <p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-[.14em] text-brand-700">{role}</p>
        <p className="mt-4 border-t border-brand-100 pt-4 text-sm leading-relaxed text-ink-muted">{message}</p>
      </div>
    </article>
  );
}

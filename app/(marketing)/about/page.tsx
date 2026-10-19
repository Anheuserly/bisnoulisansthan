import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileCheck2,
  Handshake,
  HeartPulse,
  MapPin,
  Route,
  ShieldCheck,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { site } from "@/config/site";
import { content, links } from "@/config/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About BSGSS | Mission, Values & History",
  description:
    "Learn about BSGSS, founded in 1994 to empower rural communities through healthcare, women's self-help groups, and vocational training.",
  path: "/about",
});

const exploreIcons = [Route, Users, FileCheck2, Handshake, BookOpen];
const cards = content.about.explore.map((card, index) => ({
  ...card,
  icon: exploreIcons[index] ?? BookOpen,
}));

export default function AboutPage() {
  const about = content.about;

  return (
    <div>
      {/* Intro hero band */}
      <section className="relative isolate overflow-hidden border-b border-line bg-gradient-to-b from-white via-sand-50/70 to-white py-10 sm:py-14 md:py-16">
        {/* Subtle decorative radial backdrop */}
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-8">
          <ScrollReveal direction="up" delay={40}>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
              {about.eyebrow}
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-ink">
              {about.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-ink">
              {about.introduction[0]}
            </p>
            <p className="mt-3.5 max-w-2xl text-base sm:text-lg leading-relaxed text-ink/90">
              {about.introduction[1]}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={links.work}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-brand-800 hover:shadow-soft sm:text-sm"
              >
                <span>Explore our work</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={links.story}
                className="inline-flex items-center gap-2 rounded-xl border border-brand-200/90 bg-white px-4 py-2.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-50 sm:text-sm"
              >
                <span>30-Year History</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Documentary side-by-side archival photographs */}
          <div className="grid grid-cols-[1.05fr_0.95fr] gap-4 sm:gap-5">
            <ScrollReveal direction="scale" delay={80}>
              <figure className="group relative overflow-hidden rounded-2xl border-2 border-white bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="relative aspect-[4/5] overflow-hidden bg-sand-100 sm:min-h-[19rem]">
                  <img
                    src={about.images.skills}
                    alt="Women participating in BSGSS tailoring, skills and learning activities"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[0.625rem] font-semibold text-white backdrop-blur-md border border-white/20">
                      <MapPin className="h-2.5 w-2.5 text-emerald-400" />
                      <span>Skill Center</span>
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3.5 text-white">
                    <p className="font-display text-xs font-bold sm:text-sm">Vocational Agency</p>
                    <p className="text-[0.6875rem] text-white/80 line-clamp-1">Tailoring &amp; self-help guilds</p>
                  </div>
                </div>
              </figure>
            </ScrollReveal>

            <ScrollReveal direction="scale" delay={160} className="mt-8">
              <figure className="group relative overflow-hidden rounded-2xl border-2 border-white bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="relative aspect-[4/5] overflow-hidden bg-sand-100 sm:min-h-[17rem]">
                  <img
                    src={about.images.health}
                    alt="A community healthcare consultation supported through BSGSS activity"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[0.625rem] font-semibold text-white backdrop-blur-md border border-white/20">
                      <HeartPulse className="h-2.5 w-2.5 text-rose-400" />
                      <span>Health Camp</span>
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3.5 text-white">
                    <p className="font-display text-xs font-bold sm:text-sm">Preventive Care</p>
                    <p className="text-[0.6875rem] text-white/80 line-clamp-1">Screening &amp; medicine access</p>
                  </div>
                </div>
              </figure>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How it began & Journey */}
      <section className="py-16 sm:py-20 border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] md:items-start md:px-8">
          <ScrollReveal direction="up" delay={50}>
            <div className="border-t-2 border-brand-850 pt-6 text-ink">
              <span className="flex h-10 w-10 items-center justify-center text-slate-900">
                <Route className="h-6 w-6" />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink-muted">
                {about.journey.eyebrow}
              </p>
              <p className="mt-2 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                {about.journey.title}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted sm:text-sm">
                Rooted in village industries, expanding into institutional community empowerment.
              </p>

              <div className="mt-6 border-t border-line pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <ShieldCheck className="h-4 w-4 text-slate-900" />
                  <span>30 Years Uninterrupted Operation</span>
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={120}>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">How it began</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
                {about.journey.heading}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                {about.journey.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Link
                href={links.story}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline sm:text-sm"
              >
                <span>Read our full 30-year archival story</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Purpose */}
      <section className="border-y border-line bg-sand-50/50 py-12 sm:py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-8">
          <ScrollReveal direction="up" delay={40}>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
              {about.mission.eyebrow}
            </p>
            <h2 className="mt-2 max-w-2xl font-display text-2xl font-bold leading-tight text-ink sm:text-3xl lg:text-4xl">
              {about.mission.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/90 sm:text-lg">
              {about.mission.text}
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2">
            <ScrollReveal staggerIndex={1} direction="up">
              <MissionCard icon={HeartPulse} {...about.missionCards[0]} />
            </ScrollReveal>
            <ScrollReveal staggerIndex={2} direction="up">
              <MissionCard icon={Sprout} {...about.missionCards[1]} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Explore BSGSS (Borderless, Open Editorial) */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <ScrollReveal direction="up" delay={40}>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700">Explore BSGSS</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
              Learn more about our work and organisation.
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map(({ title, text, href, icon: Icon }, idx) => (
              <ScrollReveal key={href} staggerIndex={idx} direction="up">
                <Link
                  href={href}
                  className="group flex h-full flex-col border-t-2 border-line pt-6 transition hover:border-brand-700"
                >
                  <Icon className="h-6 w-6 text-ink transition group-hover:text-brand-800" />
                  <h3 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-brand-800">
                    {title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 group-hover:text-brand-900">
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function MissionCard({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <article className="border-t-2 border-line pt-5">
      <Icon className="h-6 w-6 text-ink" />
      <h3 className="mt-4 font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
    </article>
  );
}

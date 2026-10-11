import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileCheck2, Handshake, HeartPulse, Route, Sprout, Users, type LucideIcon } from "lucide-react";
import { site } from "@/config/site";
import { content, links } from "@/config/content";

export const metadata: Metadata = {
  title: content.about.metadataTitle,
  description: site.description,
};

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
      <section className="border-b border-line bg-sand-50/70 py-8 sm:py-12 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{about.eyebrow}</p>
            <h1 className="mt-2 max-w-2xl font-display text-2xl font-bold leading-tight text-ink sm:text-3xl md:text-4xl">
              {about.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
              {about.introduction[0]}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
              {about.introduction[1]}
            </p>
            <Link
              href={links.work}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
            >
              Explore our work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-[1.05fr_0.95fr] gap-3 sm:gap-4">
            <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-2xs">
              <img
                src={about.images.skills}
                alt="Women participating in BSGSS tailoring, skills and learning activities"
                className="h-full min-h-[16rem] w-full object-cover sm:min-h-[20rem]"
              />
            </figure>
            <figure className="mt-6 overflow-hidden rounded-2xl border border-line bg-white shadow-2xs">
              <img
                src={about.images.health}
                alt="A community healthcare consultation supported through BSGSS activity"
                className="h-full min-h-[14rem] w-full object-cover sm:min-h-[17rem]"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* How it began & Journey (Light theme) */}
      <section className="py-8 sm:py-12 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] md:items-start md:px-8">
          {/* Light Card Replacing Previous Dark Card */}
          <div className="rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 via-white to-brand-50/50 p-6 sm:p-8 text-ink shadow-2xs">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 shadow-2xs">
              <Route className="h-6 w-6" />
            </span>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-brand-700">
              {about.journey.eyebrow}
            </p>
            <p className="mt-2 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
              {about.journey.title}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted sm:text-sm">
              Rooted in village industries, expanding into institutional community empowerment.
            </p>
          </div>

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
              Read our full story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Purpose */}
      <section className="border-y border-brand-100 bg-brand-50/50 py-8 sm:py-12 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
              {about.mission.eyebrow}
            </p>
            <h2 className="mt-2 max-w-2xl font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
              {about.mission.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
              {about.mission.text}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <MissionCard icon={HeartPulse} {...about.missionCards[0]} />
            <MissionCard icon={Sprout} {...about.missionCards[1]} />
          </div>
        </div>
      </section>

      {/* Explore BSGSS */}
      <section className="py-8 sm:py-12 md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Explore BSGSS</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
            Learn more about our work and organisation.
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map(({ title, text, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-xl border border-line bg-white p-5 shadow-2xs transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-brand-800">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted sm:text-sm">{text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
                  Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
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
    <article className="rounded-xl border border-brand-200/80 bg-white p-5 shadow-2xs">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-base font-bold text-ink sm:text-lg">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-ink-muted sm:text-sm">{text}</p>
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, HeartPulse, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { content, links } from "@/config/content";
import { buildMetadata } from "@/lib/seo";

const programmeIcons = [UsersRound, HeartPulse, BriefcaseBusiness];

export const metadata: Metadata = buildMetadata({
  title: "Key Programmes & Initiatives | BSGSS",
  description:
    "Explore core BSGSS initiatives: mobile health clinics, self-help group microfinance, vocational training, and youth literacy.",
  path: "/activities/key-programmes",
});

export default function KeyProgrammesPage() {
  const programmes = content.activities.keyProgrammes;

  return (
    <>
      <PageHeader
        title={programmes.title}
        lead={programmes.lead}
        crumbs={[
          { name: "Activities", path: links.activities },
          { name: "Our Key Programmes", path: links.programmes },
        ]}
      />
      <div className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <ScrollReveal direction="up" delay={40}>
            <section className="grid gap-6 rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 to-brand-50/60 p-6 sm:grid-cols-[auto_1fr] sm:p-8 shadow-2xs">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-brand-700 shadow-2xs">
                <HeartPulse className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{programmes.eyebrow}</p>
                <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {programmes.heading}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  {programmes.text}
                </p>
              </div>
            </section>
          </ScrollReveal>

          <section className="mt-10 sm:mt-12 grid gap-6 lg:grid-cols-3">
            {programmes.programmes.map((programme, index) => {
              const Icon = programmeIcons[index] ?? HeartPulse;
              return (
                <ScrollReveal key={programme.title} staggerIndex={index} direction="up">
                  <article className="design-card group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xs transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft">
                    <div className="relative aspect-[4/3] overflow-hidden bg-sand-50">
                      <img
                        src={programme.image}
                        alt={programme.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700">
                        <Icon className="h-3.5 w-3.5" />
                        {programme.focus}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink sm:text-xl">
                        {programme.title}
                      </h3>
                      <p className="mt-2.5 flex-1 text-xs leading-relaxed text-ink-muted sm:text-sm">
                        {programme.text}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </section>

          <ScrollReveal direction="up" delay={60}>
            <section className="mt-10 sm:mt-12 rounded-2xl border border-brand-200/80 bg-sand-50/80 p-6 sm:p-8 text-ink shadow-2xs">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Explore the work in action
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-ink sm:text-2xl">
                See the people and partnerships behind these programmes.
              </h2>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                Discover field photographs, video documentation, and ways to collaborate with BSGSS.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={links.gallery}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
                >
                  <span>View photo gallery</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={links.support}
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-5 py-2.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-50 sm:text-sm"
                >
                  <span>Support BSGSS</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}

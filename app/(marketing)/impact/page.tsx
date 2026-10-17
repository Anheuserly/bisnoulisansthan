import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InteractiveIndiaMap } from "@/components/impact/InteractiveIndiaMap";
import { HomeImpactCounters } from "@/components/home/HomeImpactCounters";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { content, links } from "@/config/content";

export const metadata: Metadata = {
  title: content.impact.metadataTitle,
  description: "How BSGSS creates change with communities.",
};

export default function ImpactPage() {
  const impact = content.impact;

  return (
    <>
      <PageHeader
        title={impact.title}
        lead={impact.lead}
        crumbs={[{ name: "Impact", path: links.impact }]}
      />
      <div>
        <div className="pt-8 pb-12 sm:pt-10 sm:pb-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] md:px-8">
            {/* Executive Impact Vision Card */}
            <ScrollReveal direction="up" delay={40}>
              <div className="h-full rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 via-white to-brand-50/50 p-6 sm:p-8 text-ink shadow-2xs">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  {impact.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {impact.heading}
                </h2>
                <p className="mt-4 text-xs leading-relaxed text-ink-muted sm:text-sm">
                  {impact.text}
                </p>
              </div>
            </ScrollReveal>

            {/* 4 Outcome Pillars with Staggered Rise */}
            <div className="grid gap-4 sm:grid-cols-2">
              {impact.outcomes.map(([title, text], index) => (
                <ScrollReveal key={title} staggerIndex={index} direction="up">
                  <article className="h-full rounded-xl border border-line bg-white p-5 shadow-2xs transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft">
                    <span className="font-display text-2xl font-bold text-brand-500">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 text-base font-bold text-ink sm:text-lg">{title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">{text}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Animated Impact Counters */}
        <ScrollReveal direction="up" delay={60}>
          <HomeImpactCounters />
        </ScrollReveal>

        {/* Interactive Geographical Map */}
        <ScrollReveal direction="scale" delay={80}>
          <InteractiveIndiaMap />
        </ScrollReveal>
      </div>
    </>
  );
}

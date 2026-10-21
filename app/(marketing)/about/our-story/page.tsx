import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Compass, Download, FileText, Handshake, HeartPulse, MapPin, Sparkles } from "lucide-react";
import { StoryExperience } from "@/components/about/StoryExperience";
import { StoryHero } from "@/components/about/StoryHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our 30-Year Grassroots Story | Chronology of Growth & Development | BSGSS",
  description:
    "Explore the 30-year journey of BSGSS since 1994, advancing village self-reliance, women empowerment, and healthcare milestones.",
  path: "/about/our-story",
});

export default async function OurStoryPage() {
  const settings = await getCustomizerSettings();
  const milestones = settings.storyMilestones || [];

  return (
    <>
      <StoryHero />
      <StoryExperience milestones={milestones} presentation={settings.storyPresentation} />

      {/* Complete Chronology of Growth & Development Archive Section */}
      <section className="bg-white py-14 sm:py-20 border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <ScrollReveal direction="up" delay={40}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-line pb-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-800">
                  <Calendar className="h-3.5 w-3.5 text-brand-600" />
                  <span>Verified 30-Year Journey</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
                  Chronology of Growth &amp; Development
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-ink-muted max-w-2xl">
                  Four landmark chapters marking BSGSS’s trajectory from village-rooted grassroots craft initiatives in 1994 to multi-state healthcare, education, and PSU CSR partnerships.
                </p>
              </div>

              <a
                href="/documents/bsgss-organisational-profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-sand-50/80 px-4 py-2.5 text-xs font-semibold text-brand-800 transition hover:bg-brand-50 shrink-0"
              >
                <Download className="h-4 w-4 text-brand-600" />
                <span>Download Profile Dossier (PDF)</span>
              </a>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {milestones.map((era, index) => (
              <ScrollReveal key={era.id} staggerIndex={index} direction="up">
                <article className="flex flex-col justify-between rounded-2xl border border-line bg-sand-50/40 p-6 sm:p-7 transition hover:border-brand-300 hover:shadow-soft h-full">
                  <div>
                    <div className="flex items-center justify-between gap-3 border-b border-line/60 pb-3">
                      <span className="font-display text-2xl font-bold text-brand-900">
                        {index + 1}) {era.year}
                      </span>
                      <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-700 shadow-2xs border border-line/60">
                        {era.category}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-lg font-bold text-ink">
                      {era.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-muted">
                      {era.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-line/60 pt-3 text-xs text-brand-800 font-medium">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                    <span>{era.location}</span>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-50/80 py-16 sm:py-20 border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-start md:px-8">
          <ScrollReveal direction="up" delay={40}>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800">
              <Compass className="h-4 w-4 text-slate-900" />
              <span>Institutional Direction</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
              A future built on local strength and dignity.
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
              <p>
                BSGSS continues to build practical, sustainable responses to the challenges rural communities face—with access, technical capability, and women’s equal participation at the centre.
              </p>
              <p>
                Our work unites local panchayats, dedicated public servants, leading CSR enterprises, and village self-help councils to help communities create stronger futures on their own terms.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={80}>
            <div className="border-t-2 border-brand-850 pt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Explore next</p>
              <div className="mt-5 space-y-4">
                <Link
                  href="/our-work"
                  className="group block border-t border-line pt-4 transition hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <HeartPulse className="h-5 w-5 text-slate-900" />
                      <div>
                        <p className="font-display text-base font-bold text-ink group-hover:text-brand-800">Explore Our Programmes</p>
                        <p className="text-xs text-ink-muted">Healthcare, tailoring, literacy, and self-help groups</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-900 transition group-hover:translate-x-1" />
                  </div>
                </Link>

                <Link
                  href="/about/partners"
                  className="group block border-t border-line pt-4 transition hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Handshake className="h-5 w-5 text-slate-900" />
                      <div>
                        <p className="font-display text-base font-bold text-ink group-hover:text-brand-800">CSR &amp; Statutory Partners</p>
                        <p className="text-xs text-ink-muted">30+ leading PSU collaborations and public ministries</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-900 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

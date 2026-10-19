import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Handshake, HeartPulse } from "lucide-react";
import { StoryExperience } from "@/components/about/StoryExperience";
import { StoryHero } from "@/components/about/StoryHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our 30-Year Grassroots Story | BSGSS",
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

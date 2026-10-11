import type { Metadata } from "next";
import { StoryExperience } from "@/components/about/StoryExperience";
import { StoryHero } from "@/components/about/StoryHero";

export const metadata: Metadata = { title: "Our Story", description: "The journey of Bisnouli Sarvodaya Gramodyog Sewa Sansthan." };

export default function OurStoryPage() {
  return (
    <>
      <StoryHero />
      <StoryExperience />
      <section className="bg-sand-50/80 py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-8">
          <div>
            <p className="eyebrow">Where we are going</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">A future built on local strength.</h2>
            <div className="prose-content mt-4 space-y-3 text-xs leading-relaxed text-ink-muted sm:text-sm">
              <p>BSGSS continues to build practical, sustainable responses to the challenges communities face - with access, capability and participation at the centre.</p>
              <p>Our work brings together local people, professionals, institutions and partners to help communities create stronger futures on their own terms.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-brand-200/80 bg-white p-6 sm:p-8 shadow-2xs">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Explore next</p>
            <a href="/our-work" className="mt-4 block font-display text-lg font-bold text-ink transition hover:text-brand-700 sm:text-xl">See our work →</a>
            <a href="/about/partners" className="mt-3 block font-display text-lg font-bold text-ink transition hover:text-brand-700 sm:text-xl">Meet our partners →</a>
          </div>
        </div>
      </section>
    </>
  );
}

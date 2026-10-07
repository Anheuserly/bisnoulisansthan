import type { Metadata } from "next";
import { StoryExperience } from "@/components/about/StoryExperience";
import { StoryHero } from "@/components/about/StoryHero";

export const metadata: Metadata = { title: "Our Story", description: "The journey of Bisnouli Sarvodaya Gramodyog Sewa Sansthan." };

export default function OurStoryPage() {
  return <><StoryHero /><StoryExperience /><section className="bg-sand-50 py-16 sm:py-24"><div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.1fr_.9fr] md:items-center md:px-8"><div><p className="eyebrow">Where we are going</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">A future built on local strength.</h2><div className="prose-content mt-6"><p>BSGSS continues to build practical, sustainable responses to the challenges communities face - with access, capability and participation at the centre.</p><p>Our work brings together local people, professionals, institutions and partners to help communities create stronger futures on their own terms.</p></div></div><div className="rounded-2xl border border-brand-100 bg-white p-8 shadow-soft"><p className="text-sm font-bold uppercase tracking-[.16em] text-brand-700">Explore next</p><a href="/our-work" className="mt-5 block font-display text-2xl font-bold hover:text-brand-700">See our work →</a><a href="/about/partners" className="mt-5 block font-display text-2xl font-bold hover:text-brand-700">Meet our partners →</a></div></div></section></>;
}

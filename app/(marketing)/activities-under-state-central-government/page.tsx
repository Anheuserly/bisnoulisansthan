import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, HeartPulse, Lightbulb, Sprout } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Activities under State & Central Government",
  description: "BSGSS awareness, education, health and livelihood activities supported through State and Central Government schemes.",
};

const areas = [
  { title: "Government-linked awareness", text: "Awareness programmes help rural women and communities understand available welfare support across health, education, social security and livelihoods.", icon: Lightbulb },
  { title: "Grant-in-aid and skills projects", text: "Education, literacy and vocational initiatives strengthen learning pathways and skill development for young people and women.", icon: Sprout },
  { title: "Health and social welfare", text: "Community-health outreach, preventive-care information, nutrition awareness and public-service connections support stronger local wellbeing.", icon: HeartPulse },
];

export default function GovernmentActivitiesPage() {
  return <>
    <PageHeader title="Activities under State & Central Government" lead="Community-based programmes connecting awareness, education, health and livelihoods." crumbs={[{ name: "Activities", path: "/activities" }, { name: "Government programmes", path: "/activities-under-state-central-government" }]} />
    <main className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Programme overview</p><h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">Working with communities to make public support more accessible.</h2><p className="mt-6 leading-relaxed text-ink-muted">BSGSS has implemented community-oriented activities supported through Central and State Government schemes. The work brings mobilisation together with awareness, training, health and livelihood components across Uttar Pradesh and neighbouring states.</p><p className="mt-4 leading-relaxed text-ink-muted">The aim is practical: help individuals and groups understand their rights, build skills, access relevant services and take part in their own development.</p></div><div className="rounded-2xl bg-brand-700 p-8 text-white sm:p-10"><Building2 className="h-9 w-9 text-brand-200" /><p className="mt-7 font-display text-2xl font-bold leading-snug">A bridge between community needs and public opportunities.</p><p className="mt-4 text-sm leading-relaxed text-brand-100">Activities span awareness of welfare schemes, consumer rights, capacity-building for self-help groups and links to health and social-welfare services.</p></div></section>
        <section className="mt-16"><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Focus areas</p><div className="mt-7 grid gap-5 md:grid-cols-3">{areas.map(({ title, text, icon: Icon }) => <article key={title} className="rounded-xl border border-line bg-white p-7 shadow-sm"><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Icon className="h-5 w-5" /></span><h3 className="mt-5 font-display text-xl font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-relaxed text-ink-muted">{text}</p></article>)}</div></section>
        <section className="mt-16 rounded-2xl border border-brand-100 bg-brand-50 p-7 sm:p-10"><h2 className="font-display text-2xl font-bold text-ink">Explore the work in action</h2><p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">See the community outreach, camps and training moments behind these programmes.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/activities/gallery" className="inline-flex items-center gap-2 rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800">View activity gallery <ArrowRight className="h-4 w-4" /></Link><Link href="/activities/videos" className="inline-flex items-center gap-2 rounded-md border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-100">Watch videos <ArrowRight className="h-4 w-4" /></Link></div></section>
      </div>
    </main>
  </>;
}

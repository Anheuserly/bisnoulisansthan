import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileCheck2, Handshake, HeartPulse, Route, Sprout, Users, type LucideIcon } from "lucide-react";
import { site } from "@/config/site";
import { content, links } from "@/config/content";

export const metadata: Metadata = { title: content.about.metadataTitle, description: site.description };

const exploreIcons = [Route, Users, FileCheck2, Handshake, BookOpen];
const cards = content.about.explore.map((card, index) => ({ ...card, icon: exploreIcons[index] ?? BookOpen }));

export default function AboutPage() {
  const about = content.about;
  return <main>
    <section className="border-b border-line bg-sand-50 py-16 sm:py-24"><div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.02fr_.98fr] md:items-center md:px-8"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">{about.eyebrow}</p><h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">{about.title}</h1><p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">{about.introduction[0]}</p><p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{about.introduction[1]}</p><Link href={links.work} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">Explore our work <ArrowRight className="h-4 w-4" /></Link></div><div className="grid grid-cols-[1.08fr_.92fr] gap-4"><figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm"><img src={about.images.skills} alt="Women participating in BSGSS tailoring, skills and learning activities" className="h-full min-h-[22rem] w-full object-cover" /></figure><figure className="mt-10 overflow-hidden rounded-2xl border border-line bg-white shadow-sm"><img src={about.images.health} alt="A community healthcare consultation supported through BSGSS activity" className="h-full min-h-[18rem] w-full object-cover" /></figure></div></div></section>

    <section className="py-16 sm:py-20"><div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[.9fr_1.1fr] md:items-start md:px-8"><div className="rounded-2xl bg-brand-900 p-8 text-white sm:p-10"><Route className="h-8 w-8 text-brand-200" /><p className="mt-7 text-sm font-bold uppercase tracking-[.18em] text-brand-200">{about.journey.eyebrow}</p><p className="mt-4 font-display text-3xl font-bold leading-snug text-white">{about.journey.title}</p></div><div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">How it began</p><h2 className="mt-3 font-display text-3xl font-bold text-ink">{about.journey.heading}</h2><div className="mt-6 space-y-4 leading-relaxed text-ink-muted">{about.journey.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><Link href={links.story} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">Read our full story <ArrowRight className="h-4 w-4" /></Link></div></div></section>

    <section className="border-y border-brand-100 bg-brand-50 py-16 sm:py-20"><div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.05fr_.95fr] md:items-center md:px-8"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">{about.mission.eyebrow}</p><h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{about.mission.title}</h2><p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">{about.mission.text}</p></div><div className="grid gap-4 sm:grid-cols-2"><MissionCard icon={HeartPulse} {...about.missionCards[0]} /><MissionCard icon={Sprout} {...about.missionCards[1]} /></div></div></section>

    <section className="py-16 sm:py-20"><div className="mx-auto max-w-6xl px-5 md:px-8"><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Explore BSGSS</p><h2 className="mt-3 font-display text-3xl font-bold text-ink">Learn more about our work and organisation.</h2><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{cards.map(({ title, text, href, icon: Icon }) => <Link key={href} href={href} className="group rounded-xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"><Icon className="h-6 w-6 text-brand-700" /><h3 className="mt-5 font-display text-xl font-bold text-ink">{title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>)}</div></div></section>
  </main>;
}

function MissionCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return <article className="rounded-xl border border-brand-200 bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Icon className="h-5 w-5" /></span><h3 className="mt-5 font-display text-xl font-bold text-ink">{title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p></article>;
}

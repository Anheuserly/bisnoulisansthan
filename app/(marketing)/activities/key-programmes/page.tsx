import type { Metadata } from "next";
import { ArrowRight, BriefcaseBusiness, HeartPulse, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { content, links } from "@/config/content";

const programmeIcons = [UsersRound, HeartPulse, BriefcaseBusiness];

export const metadata: Metadata = {
  title: content.activities.keyProgrammes.metadataTitle,
  description: content.activities.keyProgrammes.lead,
};

export default function KeyProgrammesPage() {
  const programmes = content.activities.keyProgrammes;

  return <>
    <PageHeader title={programmes.title} lead={programmes.lead} crumbs={[{ name: "Activities", path: links.activities }, { name: "Our Key Programmes", path: links.programmes }]} />
    <main className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <section className="grid gap-7 rounded-2xl border border-brand-200 bg-brand-50 p-7 sm:grid-cols-[auto_1fr] sm:p-10">
          <span className="grid h-14 w-14 place-items-center rounded-xl bg-white text-brand-700 shadow-sm"><HeartPulse className="h-7 w-7" /></span>
          <div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">{programmes.eyebrow}</p><h1 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{programmes.heading}</h1><p className="mt-4 max-w-3xl leading-relaxed text-ink-muted">{programmes.text}</p></div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          {programmes.programmes.map((programme, index) => {
            const Icon = programmeIcons[index] ?? HeartPulse;
            return <article key={programme.title} className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"><div className="aspect-[4/3] overflow-hidden bg-sand-50">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={programme.image} alt={programme.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-6"><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-brand-700"><Icon className="h-4 w-4" />{programme.focus}</span><h2 className="mt-4 font-display text-2xl font-bold leading-tight text-ink">{programme.title}</h2><p className="mt-4 leading-relaxed text-ink-muted">{programme.text}</p></div></article>;
          })}
        </section>

        <section className="mt-12 rounded-2xl bg-brand-900 p-7 text-white sm:p-10"><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-200">Explore the work in action</p><h2 className="mt-3 font-display text-3xl font-bold !text-white">See the people and partnerships behind these programmes.</h2><div className="mt-7 flex flex-wrap gap-3"><a href={links.gallery} className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-brand-900 hover:bg-sand-100">View photo gallery <ArrowRight className="h-4 w-4" /></a><a href={links.support} className="inline-flex items-center gap-2 rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Support BSGSS <ArrowRight className="h-4 w-4" /></a></div></section>
      </div>
    </main>
  </>;
}

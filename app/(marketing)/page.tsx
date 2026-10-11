import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Building2, HandHeart, Handshake, HeartPulse, Landmark, Users } from "lucide-react";
import { InteractiveIndiaMap } from "@/components/impact/InteractiveIndiaMap";
import { HomeHero } from "@/components/home/HomeHero";
import { site } from "@/config/site";
import { content, links } from "@/config/content";

export const metadata: Metadata = {
  title: content.home.metadataTitle,
  description: site.description,
};

const programmeIcons = [BookOpen, HeartPulse, HandHeart, Users];
const programs = content.home.programmes.map((programme, index) => ({ ...programme, icon: programmeIcons[index] ?? BookOpen, href: links.programmes }));

export default function HomePage() {
  const { about, government, impact, management } = content.home;
  return (
    <>
      <HomeHero />

      <section className="border-y border-brand-100 bg-brand-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[.9fr_1.1fr] md:items-center md:px-8">
          <div className="rounded-2xl bg-brand-700 p-8 text-white sm:p-10"><Building2 className="h-9 w-9 text-brand-200" /><p className="mt-6 text-sm font-bold uppercase tracking-[.18em] text-brand-200">{government.eyebrow}</p><h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white">{government.title}</h2><p className="mt-5 leading-relaxed text-brand-100">{government.text}</p><Link href={links.government} className="mt-7 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-brand-900 hover:bg-brand-50">{government.cta} <ArrowRight className="h-4 w-4" /></Link></div>
          <div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">{government.overviewEyebrow}</p><h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{government.overviewTitle}</h2><p className="mt-5 max-w-2xl leading-relaxed text-ink-muted">{government.overviewText}</p><Link href={links.government} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">{government.overviewCta} <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      <section className="bg-sand-50 py-16" id="about">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:items-center md:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">{about.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">{about.title}</h2>
          </div>
          <p className="text-base leading-relaxed text-ink-muted">{about.text}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20" id="programs">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">Our key programmes</p>
          <div className="flex flex-wrap items-end justify-between gap-4"><h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-ink sm:text-4xl">Development that meets people where they are.</h2><Link href={links.programmes} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">Explore our key programmes <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map(({ title, text, icon: Icon, href }) => <Link key={title} href={href} className="group rounded-xl border border-line bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft"><div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Icon className="h-5 w-5" /></div><h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">Explore programme <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-100 bg-brand-50 py-16 sm:py-20" id="impact">
        <div className="mx-auto max-w-6xl px-5 md:px-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">{impact.eyebrow}</p><h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">{impact.title}</h2></div><Link href={links.impact} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">{impact.cta} <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-10 grid gap-4 sm:grid-cols-3">{impact.stats.map((stat) => <Stat key={stat.label} {...stat} />)}</div></div>
      </section>

      <InteractiveIndiaMap />

      <section className="bg-brand-50 py-16 sm:py-20" id="partners">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.1fr_.9fr] md:items-center md:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">Partnerships</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold text-ink sm:text-4xl">Collaboration that turns support into local action.</h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-ink-muted">BSGSS works alongside CSR and institutional partners to bring healthcare, women&apos;s vocational training and practical community support to places where it is needed most.</p>
            <Link href="/about/partners" className="mt-7 inline-flex items-center gap-2 rounded-md bg-brand-700 px-5 py-3 font-semibold text-white transition hover:bg-brand-900">Explore partner stories <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
            <div className="rounded-xl border border-brand-200 bg-white p-5 shadow-sm"><Handshake className="h-6 w-6 text-brand-700" /><p className="mt-4 font-display text-3xl font-bold text-ink">30</p><p className="mt-1 text-sm leading-relaxed text-ink-muted">CSR partner profiles with an individual BSGSS record.</p></div>
            <div className="rounded-xl border border-brand-200 bg-white p-5 shadow-sm"><HeartPulse className="h-6 w-6 text-brand-700" /><p className="mt-4 font-display text-xl font-bold text-ink">Healthcare</p><p className="mt-1 text-sm leading-relaxed text-ink-muted">A central focus across many recorded partnerships.</p></div>
            <div className="rounded-xl border border-brand-200 bg-white p-5 shadow-sm"><Users className="h-6 w-6 text-brand-700" /><p className="mt-4 font-display text-xl font-bold text-ink">Skills for women</p><p className="mt-1 text-sm leading-relaxed text-ink-muted">Vocational pathways that support income and agency.</p></div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">{management.eyebrow}</p><h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{management.title}</h2><p className="mt-5 leading-relaxed text-ink-muted">{management.text}</p></div><div className="mt-10 grid gap-6 md:grid-cols-2"><ManagementCard name="Nandita Bakshi" role="Ex-IRS · CEO, BSGSS, New Delhi" image="/images/bsgss/other-source-assets/334-111.jpg" message="BSGSS is grounded in dignity, justice and equal opportunity—creating meaningful change for people who are often left out, especially women." /><ManagementCard name="Vijay Kumar Jha" role="Ex-IPS · Chairperson, BSGSS, New Delhi" image="/images/bsgss/other-source-assets/335-11111.jpg" message="Our mission is practical and sustainable: empower communities, support women and enable access to quality healthcare." /></div><Link href={links.management} className="mt-8 inline-flex items-center gap-2 rounded-md border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50">{management.cta} <ArrowRight className="h-4 w-4" /></Link></div>
      </section>

      <section className="py-16 sm:py-20"><div className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-brand-200 bg-brand-50 px-7 py-10 md:grid-cols-[1fr_auto] md:items-center md:px-12"><div><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-700 shadow-sm"><Landmark className="h-6 w-6" /></div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Support BSGSS</p><h2 className="mt-3 font-display text-3xl font-bold text-ink">Your contribution can strengthen a community.</h2><p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">Explore secure support options, including bank transfer and UPI donation details.</p></div><Link href="/support" className="inline-flex items-center justify-center rounded-md bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-800">Support us <ArrowRight className="ml-2 h-4 w-4" /></Link></div></section>
    </>
  );
}

function Stat({ number, label }: { number: string; label: string }) { return <div className="rounded-xl border border-brand-100 bg-white p-6 shadow-sm"><p className="font-display text-4xl font-bold text-brand-800">{number}</p><p className="mt-2 max-w-48 text-sm leading-relaxed text-ink-muted">{label}</p></div>; }

function ManagementCard({ name, role, image, message }: { name: string; role: string; image: string; message: string }) { return <article className="group grid overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-white to-brand-50/70 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:grid-cols-[10rem_1fr]"><div className="overflow-hidden">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={image} alt={name} className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="relative p-6"><span className="absolute left-6 top-0 h-1 w-12 rounded-b-full bg-brand-500" /><p className="mt-2 font-display text-xl font-semibold text-ink">{name}</p><p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-[.14em] text-brand-700">{role}</p><p className="mt-4 border-t border-brand-100 pt-4 text-sm leading-relaxed text-ink-muted">{message}</p></div></article>; }

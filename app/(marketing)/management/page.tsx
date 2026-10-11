import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartHandshake, Quote } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Message from the Management",
  description: "Messages from the leadership of Bisnouli Sarvodaya Gramodyog Sewa Sansthan.",
};

const messages = [
  {
    name: "Nandita Bakshi",
    role: "Ex-IRS · CEO, BSGSS, New Delhi",
    image: "/images/bsgss/other-source-assets/334-111.jpg",
    message: "BSGSS is grounded in the values of dignity, justice and equal opportunity. Its steady work in villages and small towns creates meaningful change for people who are too often left out of mainstream conversations, especially women.",
  },
  {
    name: "Vijay Kumar Jha",
    role: "Ex-IPS · Chairperson, BSGSS, New Delhi",
    image: "/images/bsgss/other-source-assets/335-11111.jpg",
    message: "Our purpose is to create positive change for poor and marginalised communities through practical, sustainable and community-led solutions—with special focus on women’s empowerment and access to quality healthcare.",
  },
];

export default function ManagementPage() {
  return <>
    <PageHeader title="Message from the Management" lead="The values and purpose guiding BSGSS work with communities." crumbs={[{ name: "About", path: "/about" }, { name: "Management", path: "/management" }]} />
    <main className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <section className="rounded-2xl border border-brand-100 bg-brand-50 px-6 py-8 sm:px-10 sm:py-12">
          <HeartHandshake className="h-8 w-8 text-brand-700" />
          <p className="mt-6 max-w-3xl font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">Leadership that keeps people, dignity and practical progress at the centre.</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-muted">The BSGSS leadership vision is rooted in equal opportunity and community participation, shaping programmes in healthcare, education, livelihoods and women’s empowerment.</p>
        </section>
        <div className="mt-14 space-y-10">
          {messages.map((person, index) => <article key={person.name} className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-sm md:grid-cols-[minmax(15rem,.7fr)_1fr]">
            <div className={index % 2 ? "md:order-2" : ""}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={person.image} alt={person.name} className="aspect-square h-full w-full object-cover" /></div>
            <div className="flex flex-col justify-center p-7 sm:p-10"><Quote className="h-7 w-7 text-brand-600" /><blockquote className="mt-5 font-display text-2xl font-semibold leading-snug text-ink">“{person.message}”</blockquote><footer className="mt-7 border-t border-line pt-5"><p className="font-semibold text-ink">{person.name}</p><p className="mt-1 text-sm text-ink-muted">{person.role}</p></footer></div>
          </article>)}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8"><p className="max-w-2xl text-sm leading-relaxed text-ink-muted">Learn more about the programmes that turn this vision into practical support for communities.</p><Link href="/our-work" className="inline-flex items-center gap-2 rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800">Explore our work <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </main>
  </>;
}

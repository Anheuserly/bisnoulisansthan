import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, HandHeart, Handshake, HeartPulse, Landmark, Users } from "lucide-react";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Community development since 1994",
  description: site.description,
};

const programs = [
  { title: "Education & digital literacy", text: "Supporting learning opportunities and practical digital skills for children, young people and families.", icon: BookOpen },
  { title: "Healthcare initiatives", text: "Mobile clinics, free health check-up camps, immunisation, nutrition drives and health awareness programmes.", icon: HeartPulse },
  { title: "Skills & livelihoods", text: "Vocational training in tailoring, computer literacy, beauty culture, English communication and entrepreneurship.", icon: HandHeart },
  { title: "Women’s empowerment", text: "Action for Micro-Finance and Rehabilitation (AMAR), self-help groups and income-generation opportunities.", icon: Users },
];

const gallery = [
  "banners/589-banner-1.webp", "banners/590-banner-2.webp", "banners/591-banner-2-1.webp", "banners/592-banner-3.webp",
  "banners/593-untitled-4.webp", "branding/579-logo-3.webp", "branding/573-logo-2-png-1.png", "branding/565-logo-2-png.png",
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand-900 text-white">
        <div className="absolute inset-0 opacity-35">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/bsgss/banners/589-banner-1.webp" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/90 to-brand-900/35" />
        <div className="relative mx-auto grid min-h-[34rem] max-w-6xl items-center px-5 py-20 md:px-8 lg:min-h-[39rem]">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-brand-200">Bisnouli Sarvodaya Gramodyog Sewa Sansthan</p>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Empowering communities. Creating opportunities.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100">Since 1994, BSGSS has worked with underprivileged families across Uttar Pradesh, Delhi, Haryana and Punjab through education, healthcare, skills and women’s empowerment.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#support" className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-brand-900 transition hover:bg-sand-100">Support our work <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/about" className="inline-flex items-center gap-2 rounded-md border border-white/50 px-5 py-3 font-semibold text-white transition hover:bg-white/10">About BSGSS</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand-50 py-16" id="about">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:items-center md:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">About us</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">A practical commitment to dignity and self-reliance.</h2>
          </div>
          <p className="text-base leading-relaxed text-ink-muted">Founded in Bisnouli village, Dadri Tehsil, BSGSS is a registered voluntary organisation. Its community-led work brings together education, healthcare, vocational training, micro-finance and support for women so that families can create sustainable futures.</p>
        </div>
      </section>

      <section className="py-20" id="programs">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">Our key programmes</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-ink sm:text-4xl">Development that meets people where they are.</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map(({ title, text, icon: Icon }) => <article key={title} className="rounded-xl border border-line bg-white p-6 shadow-sm"><div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Icon className="h-5 w-5" /></div><h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-20 text-white" id="impact">
        <div className="mx-auto max-w-6xl px-5 md:px-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-200">Our reach and measurable outcomes</p><div className="mt-8 grid gap-8 sm:grid-cols-3"><Stat number="50,000+" label="individuals reached across North India" /><Stat number="30,000+" label="patients treated and counselled" /><Stat number="5,000+" label="women trained in 60+ villages" /></div></div>
      </section>

      <section className="bg-brand-50 py-20" id="partners">
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

      <section className="py-20" id="management">
        <div className="mx-auto max-w-6xl px-5 md:px-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">Message from the management</p><div className="mt-8 grid gap-6 md:grid-cols-2"><blockquote className="rounded-xl border border-line bg-sand-50 p-7 text-ink"><p className="font-display text-xl leading-relaxed">“Our work resonates with dignity, justice and equal opportunity for all.”</p><footer className="mt-6 text-sm text-ink-muted"><strong className="text-ink">Nandita Bakshi</strong><br />Ex-IRS · CEO, BSGSS, New Delhi</footer></blockquote><blockquote className="rounded-xl border border-line bg-sand-50 p-7 text-ink"><p className="font-display text-xl leading-relaxed">“We bring positive change through practical, sustainable, community-driven solutions.”</p><footer className="mt-6 text-sm text-ink-muted"><strong className="text-ink">Vijay Kumar Jha</strong><br />Ex-IPS · Chairperson, BSGSS, New Delhi</footer></blockquote></div></div>
      </section>

      <section className="bg-sand-50 py-20" id="gallery"><div className="mx-auto max-w-6xl px-5 md:px-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">Gallery</p><h2 className="mt-3 font-display text-3xl font-bold text-ink">The work, in action.</h2><div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">{gallery.map((image, i) => <div key={image} className="aspect-square overflow-hidden rounded-lg bg-brand-100">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/images/bsgss/${image}`} alt={`BSGSS community programme ${i + 1}`} className="h-full w-full object-cover" /></div>)}</div></div></section>

      <section className="py-20" id="support"><div className="mx-auto grid max-w-6xl gap-8 rounded-2xl bg-brand-700 px-7 py-10 text-white md:grid-cols-[1fr_auto] md:items-center md:px-12"><div><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15"><Landmark className="h-6 w-6" /></div><h2 className="font-display text-3xl font-bold">Support Us</h2><p className="mt-3 max-w-2xl leading-relaxed text-brand-100">Your contribution helps strengthen healthcare, education, livelihood and women’s empowerment initiatives in underserved communities.</p></div><a href="mailto:bsgssindia@yahoo.co.in?subject=Support%20BSGSS" className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 font-semibold text-brand-900 hover:bg-sand-100">Get involved</a></div></section>
    </>
  );
}

function Stat({ number, label }: { number: string; label: string }) { return <div><p className="font-display text-4xl font-bold text-white">{number}</p><p className="mt-2 max-w-48 text-sm leading-relaxed text-brand-200">{label}</p></div>; }

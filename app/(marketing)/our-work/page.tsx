import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, HandHeart, HeartPulse, Laptop, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Our Work", description: "BSGSS programmes in education, healthcare, livelihoods and women’s empowerment." };
const work = [
  { title: "Education & digital inclusion", icon: BookOpen, text: "Learning support, digital literacy and practical educational opportunities for children and young people.", image: "education/146-class1.jpeg" },
  { title: "Healthcare & awareness", icon: HeartPulse, text: "Health check-up camps, preventive-health awareness and access-oriented community outreach.", image: "healthcare-camps/149-camp1.jpeg" },
  { title: "Skills & livelihoods", icon: Laptop, text: "Vocational learning, computer literacy, tailoring, communication and pathways towards income generation.", image: "gallery-training/185-tal1.jpeg" },
  { title: "Women’s empowerment", icon: UsersRound, text: "Self-help, micro-finance awareness and economic opportunities that support agency and resilience.", image: "gallery-community/191-whatsapp-image-2025-10-09-at-15-55-32-c60ee022.jpg" },
];

export default function OurWorkPage() { return <><PageHeader title="Our work" lead="Integrated programmes that support learning, health, livelihoods and the leadership of women." crumbs={[{ name: "Our work", path: "/our-work" }]} /><main className="py-16 sm:py-24"><div className="mx-auto max-w-6xl px-5 md:px-8"><div className="grid gap-6 md:grid-cols-2">{work.map(({ title, icon: Icon, text, image }) => <article key={title} className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm"><div className="aspect-[16/8] overflow-hidden bg-brand-100">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/images/bsgss/${image}`} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-7"><Icon className="h-6 w-6 text-brand-700" /><h2 className="mt-4 font-display text-2xl font-bold">{title}</h2><p className="mt-3 leading-relaxed text-ink-muted">{text}</p></div></article>)}</div><section className="mt-14 rounded-2xl bg-sand-50 p-8 sm:p-10"><HandHeart className="h-7 w-7 text-brand-700" /><h2 className="mt-4 font-display text-2xl font-bold">Work with BSGSS</h2><p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">CSR partners, institutions and volunteers can help strengthen programmes where they are needed most.</p><Link href="/about/partners" className="mt-5 inline-flex font-semibold text-brand-700 hover:underline">Explore our partners →</Link></section></div></main></> }

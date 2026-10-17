import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, HandHeart, HeartPulse, Laptop, MapPin, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Our Work | Integrated Grassroots Programmes",
  description: "BSGSS programmes in education, healthcare, livelihoods and women’s empowerment across North India.",
};

const work = [
  {
    title: "Education & digital inclusion",
    icon: BookOpen,
    tag: "Grassroots Learning",
    location: "North India Centres",
    text: "Learning support, digital literacy and practical educational opportunities for children and young people.",
    image: "education/146-class1.jpeg",
  },
  {
    title: "Healthcare & awareness",
    icon: HeartPulse,
    tag: "Preventive Care",
    location: "Mobile Diagnostic Units",
    text: "Health check-up camps, preventive-health awareness, oncology screening and access-oriented community outreach.",
    image: "healthcare-camps/149-camp1.jpeg",
  },
  {
    title: "Skills & livelihoods",
    icon: Laptop,
    tag: "Economic Agency",
    location: "Village Guilds",
    text: "Vocational learning, computer literacy, tailoring, communication and sustainable pathways towards income generation.",
    image: "gallery-training/185-tal1.jpeg",
  },
  {
    title: "Women’s empowerment",
    icon: UsersRound,
    tag: "Self-Help Councils",
    location: "350+ Villages",
    text: "Self-help groups, micro-finance awareness and cooperative economic opportunities that support agency and dignity.",
    image: "gallery-community/191-whatsapp-image-2025-10-09-at-15-55-32-c60ee022.jpg",
  },
];

export default function OurWorkPage() {
  return (
    <>
      <PageHeader
        title="Our work"
        lead="Integrated grassroots programmes that support learning, healthcare, livelihoods, and the leadership of rural women."
        crumbs={[{ name: "Our work", path: "/our-work" }]}
      />
      <div className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {work.map(({ title, icon: Icon, tag, location, text, image }, index) => (
              <ScrollReveal key={title} staggerIndex={index} direction="up">
                <article className="design-card group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft">
                  <div className="relative aspect-[16/9] overflow-hidden bg-sand-50">
                    <img
                      src={`/images/bsgss/${image}`}
                      alt={title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[0.6875rem] font-bold text-brand-950 shadow-2xs backdrop-blur-sm">
                        {tag}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[0.625rem] font-medium text-white backdrop-blur-md border border-white/20">
                        <MapPin className="h-2.5 w-2.5 text-emerald-400" />
                        {location}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="font-display text-sm font-bold text-white sm:text-base">
                        {title}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition group-hover:bg-brand-700 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="mt-3.5 font-display text-lg font-bold text-ink sm:text-xl">{title}</h2>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-muted sm:text-sm">{text}</p>
                    
                    <div className="mt-5 border-t border-line/60 pt-4">
                      <Link
                        href="/activities/key-programmes"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors"
                      >
                        <span>View programme activities</span>
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={80}>
            <section className="mt-12 rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 via-white to-brand-50/50 p-6 sm:p-8 shadow-2xs">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-700 shadow-2xs">
                <HandHeart className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-xl font-bold text-ink sm:text-2xl">Partner with BSGSS</h2>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                Public sector enterprises, corporate CSR boards, and individual philanthropists can help scale grassroots programmes where they create lasting community self-reliance.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/about/partners"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
                >
                  <span>Explore our 30+ CSR Partners</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-50 sm:text-sm"
                >
                  <span>Initiate CSR Discussion</span>
                </Link>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}

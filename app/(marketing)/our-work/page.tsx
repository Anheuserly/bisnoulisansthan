import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, HandHeart, HeartPulse, Laptop, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Our Work",
  description: "BSGSS programmes in education, healthcare, livelihoods and women’s empowerment.",
};

const work = [
  {
    title: "Education & digital inclusion",
    icon: BookOpen,
    text: "Learning support, digital literacy and practical educational opportunities for children and young people.",
    image: "education/146-class1.jpeg",
  },
  {
    title: "Healthcare & awareness",
    icon: HeartPulse,
    text: "Health check-up camps, preventive-health awareness and access-oriented community outreach.",
    image: "healthcare-camps/149-camp1.jpeg",
  },
  {
    title: "Skills & livelihoods",
    icon: Laptop,
    text: "Vocational learning, computer literacy, tailoring, communication and pathways towards income generation.",
    image: "gallery-training/185-tal1.jpeg",
  },
  {
    title: "Women’s empowerment",
    icon: UsersRound,
    text: "Self-help, micro-finance awareness and economic opportunities that support agency and resilience.",
    image: "gallery-community/191-whatsapp-image-2025-10-09-at-15-55-32-c60ee022.jpg",
  },
];

export default function OurWorkPage() {
  return (
    <>
      <PageHeader
        title="Our work"
        lead="Integrated programmes that support learning, health, livelihoods and the leadership of women."
        crumbs={[{ name: "Our work", path: "/our-work" }]}
      />
      <div className="pt-5 pb-10 sm:pt-6 sm:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {work.map(({ title, icon: Icon, text, image }) => (
              <article
                key={title}
                className="group overflow-hidden rounded-2xl border border-line bg-white shadow-2xs transition-all hover:border-brand-300 hover:shadow-soft"
              >
                <div className="aspect-[16/8] overflow-hidden bg-sand-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/bsgss/${image}`}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-3 font-display text-lg font-bold text-ink sm:text-xl">{title}</h2>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">{text}</p>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-12 rounded-2xl border border-brand-200/70 bg-sand-50/80 p-6 sm:p-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <HandHeart className="h-5 w-5" />
            </span>
            <h2 className="mt-3 font-display text-lg font-bold text-ink sm:text-xl">Work with BSGSS</h2>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
              CSR partners, institutions and volunteers can help strengthen programmes where they are needed most.
            </p>
            <Link
              href="/about/partners"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:underline sm:text-sm"
            >
              Explore our partners →
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

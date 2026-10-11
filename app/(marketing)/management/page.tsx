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
    imageSide: "right",
    message: "BSGSS is grounded in the values of dignity, justice and equal opportunity. Its steady work in villages and small towns creates meaningful change for people who are too often left out of mainstream conversations, especially women.",
  },
  {
    name: "Vijay Kumar Jha",
    role: "Ex-IPS · Chairperson, BSGSS, New Delhi",
    image: "/images/bsgss/other-source-assets/335-11111.jpg",
    imageSide: "left",
    message: "Our purpose is to create positive change for poor and marginalised communities through practical, sustainable and community-led solutions—with special focus on women’s empowerment and access to quality healthcare.",
  },
];

export default function ManagementPage() {
  return (
    <>
      <PageHeader
        title="Message from the Management"
        lead="The values and purpose guiding BSGSS work with communities."
        crumbs={[
          { name: "About", path: "/about" },
          { name: "Management", path: "/management" },
        ]}
      />
      <div className="pt-6 pb-14 sm:pt-8 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <section className="rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 to-brand-50/60 p-6 sm:p-8 shadow-2xs">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-700 shadow-2xs">
              <HeartHandshake className="h-6 w-6" />
            </span>
            <h2 className="mt-4 max-w-3xl font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
              Leadership that keeps people, dignity and practical progress at the centre.
            </h2>
            <p className="mt-2.5 max-w-3xl text-xs leading-relaxed text-ink-muted sm:text-sm">
              The BSGSS leadership vision is rooted in equal opportunity and community participation, shaping programmes in healthcare, education, livelihoods and women’s empowerment.
            </p>
          </section>

          <div className="mt-10 sm:mt-12 space-y-8">
            {messages.map((person) => {
              const isImageRight = person.imageSide === "right";
              return (
                <article
                  key={person.name}
                  className={`grid overflow-hidden rounded-2xl border border-line bg-white shadow-2xs transition hover:border-brand-300 hover:shadow-soft ${
                    isImageRight
                      ? "md:grid-cols-[1fr_minmax(15rem,0.68fr)]"
                      : "md:grid-cols-[minmax(15rem,0.68fr)_1fr]"
                  }`}
                >
                  <div
                    className={`overflow-hidden ${
                      isImageRight ? "order-1 md:order-2" : "order-1 md:order-1"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={person.image}
                      alt={person.name}
                      className="aspect-square h-full w-full object-cover"
                    />
                  </div>
                  <div
                    className={`flex flex-col justify-center p-6 sm:p-8 ${
                      isImageRight ? "order-2 md:order-1" : "order-2 md:order-2"
                    }`}
                  >
                    <Quote className="h-6 w-6 text-brand-600" />
                    <blockquote className="mt-3 font-display text-lg font-semibold leading-relaxed text-ink sm:text-xl">
                      “{person.message}”
                    </blockquote>
                    <footer className="mt-5 border-t border-line/60 pt-4">
                      <p className="font-semibold text-ink text-sm sm:text-base">{person.name}</p>
                      <p className="mt-0.5 text-xs text-ink-muted">{person.role}</p>
                    </footer>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
              Learn more about the programmes that turn this vision into practical support for communities.
            </p>
            <Link
              href="/our-work"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
            >
              Explore our work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

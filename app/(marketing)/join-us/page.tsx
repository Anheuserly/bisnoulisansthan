import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  Building2,
  HandHeart,
  Heart,
  Mail,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { JoinUsForm } from "@/components/join/JoinUsForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { content, links } from "@/config/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Volunteer, Intern & Partner With Us | BSGSS",
  description:
    "Collaborate with BSGSS. Join as a grassroots volunteer, student intern, medical professional, or institutional CSR partner.",
  path: "/join-us",
});

export default function JoinUsPage() {
  const { join } = content;

  return (
    <>
      <PageHeader
        title={join.title}
        lead={join.lead}
        crumbs={[{ name: "Join us", path: links.join }]}
      />

      <div className="pt-8 pb-16 sm:pt-10 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Top Mission Overview */}
          <ScrollReveal direction="up" delay={40}>
            <section className="grid gap-8 border-t-2 border-brand-850 pt-6 md:grid-cols-[1.2fr_0.8fr] md:items-start">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <HandHeart className="h-4 w-4 text-slate-900" />
                  {join.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl lg:text-4xl">
                  {join.heading}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  {join.description}
                </p>
              </div>

              <div className="border-t border-line pt-4 sm:pt-0">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Why Join BSGSS?
                </p>
                <ul className="mt-4 space-y-3 text-xs text-ink-muted sm:text-sm">
                  <li className="flex items-center gap-2.5 text-ink">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-slate-900" />
                    <span className="font-medium">30+ Years of Ground-Level Community Work</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-ink">
                    <Award className="h-4 w-4 shrink-0 text-slate-900" />
                    <span className="font-medium">Recognised NGO Darpan &amp; 12A/80G Compliant</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-ink">
                    <UsersRound className="h-4 w-4 shrink-0 text-slate-900" />
                    <span className="font-medium">5,000+ Women Trained across 60+ Villages</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-ink">
                    <Building2 className="h-4 w-4 shrink-0 text-slate-900" />
                    <span className="font-medium">Trusted CSR Implementation Partner</span>
                  </li>
                </ul>
              </div>
            </section>
          </ScrollReveal>

          {/* Interactive Fast Join Us Form */}
          <ScrollReveal direction="up" delay={80}>
            <section className="mt-12 sm:mt-16 border-t border-line pt-8" id="application-form">
              <JoinUsForm />
            </section>
          </ScrollReveal>

          {/* Additional Ways to Support */}
          <ScrollReveal direction="up" delay={100}>
            <section className="mt-16 sm:mt-20 border-t-2 border-brand-850 pt-8 text-ink">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Alternative ways to help
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
                    Support BSGSS with financial or material contributions
                  </h3>
                  <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                    If you prefer supporting our field outreach through direct bank transfers, UPI contributions, or corporate grant funding, explore our dedicated channels.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={links.support}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-slate-800 sm:text-sm"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Donate &amp; Support</span>
                  </Link>
                  <Link
                    href={links.contact}
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 transition hover:bg-sand-50 sm:text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact office</span>
                  </Link>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Building2,
  HandHeart,
  Heart,
  Mail,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { JoinUsForm } from "@/components/join/JoinUsForm";
import { content, links } from "@/config/content";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: content.join.metadataTitle,
  description: content.join.lead,
};

export default function JoinUsPage() {
  const { join } = content;

  return (
    <>
      <PageHeader
        title={join.title}
        lead={join.lead}
        crumbs={[{ name: "Join us", path: links.join }]}
      />

      <div className="pt-6 pb-14 sm:pt-8 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          {/* Top Mission Banner */}
          <section className="grid gap-6 rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 via-white to-brand-50/50 p-6 sm:p-8 md:grid-cols-[1.15fr_0.85fr] md:items-center shadow-2xs">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 shadow-2xs">
                <HandHeart className="h-3.5 w-3.5 text-brand-600" />
                {join.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                {join.heading}
              </h2>
              <p className="mt-3 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                {join.description}
              </p>
            </div>

            <div className="rounded-xl border border-brand-100 bg-white/90 p-5 shadow-2xs">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Why Join BSGSS?
              </p>
              <ul className="mt-3 space-y-2.5 text-xs text-ink-muted sm:text-sm">
                <li className="flex items-center gap-2 text-ink">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-brand-600" />
                  <span>30+ Years of Ground-Level Community Work</span>
                </li>
                <li className="flex items-center gap-2 text-ink">
                  <Award className="h-4 w-4 shrink-0 text-brand-600" />
                  <span>Recognised NGO Darpan & 12A/80G Compliant</span>
                </li>
                <li className="flex items-center gap-2 text-ink">
                  <UsersRound className="h-4 w-4 shrink-0 text-brand-600" />
                  <span>5,000+ Women Trained across 60+ Villages</span>
                </li>
                <li className="flex items-center gap-2 text-ink">
                  <Building2 className="h-4 w-4 shrink-0 text-brand-600" />
                  <span>Trusted CSR Implementation Partner</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Interactive Fast Join Us Form */}
          <section className="mt-10 sm:mt-12" id="application-form">
            <JoinUsForm />
          </section>

          {/* Additional Ways to Support */}
          <section className="mt-12 sm:mt-14 rounded-2xl border border-brand-200/80 bg-sand-50/80 p-6 sm:p-8 text-ink shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
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
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
                >
                  <Heart className="h-4 w-4" />
                  Donate & Support
                </Link>
                <Link
                  href={links.contact}
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-50 sm:text-sm"
                >
                  <Mail className="h-4 w-4" />
                  Contact office
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

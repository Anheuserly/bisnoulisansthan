import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, GraduationCap, HandHeart, Heart, Mail, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Volunteer, partner, intern or support Bisnouli Sarvodaya Gramodyog Sewa Sansthan.",
};

const ways = [
  {
    title: "Be a volunteer",
    description: "Join education, women’s empowerment, healthcare and rural-development activities. You can contribute on the ground, in awareness campaigns or through a professional skill.",
    icon: UsersRound,
    cta: "Volunteer with BSGSS",
    href: "/contact",
  },
  {
    title: "Partner with us",
    description: "Organisations, educational institutions and corporates can work with BSGSS on CSR partnerships, training, outreach and practical community-development projects.",
    icon: BriefcaseBusiness,
    cta: "Discuss a partnership",
    href: "/contact",
  },
  {
    title: "Apply for an internship",
    description: "Build meaningful experience while contributing to programme support, research, communications and development work that serves communities.",
    icon: GraduationCap,
    cta: "Enquire about internships",
    href: "/contact",
  },
  {
    title: "Support the work",
    description: "A financial contribution, educational materials or technical resources can help BSGSS continue vital work with people who need it most.",
    icon: Heart,
    cta: "Support BSGSS",
    href: "/support",
  },
];

export default function JoinUsPage() {
  return (
    <>
      <PageHeader
        title="Join Us"
        lead="Bring your time, skills, ideas or support to a community-led mission for a more inclusive and self-reliant society."
        crumbs={[{ name: "Join us", path: "/join-us" }]}
      />
      <div className="pt-6 pb-14 sm:pt-8 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Make a practical difference</p>
              <h2 className="mt-1 max-w-2xl font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                Positive change starts when compassionate people work together.
              </h2>
              <p className="mt-4 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                BSGSS brings people together around education, healthcare, skill development and women’s empowerment. Whether you are a student, professional, social worker or part of a corporate group, there is a meaningful way to contribute.
              </p>
              <p className="mt-2.5 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                Tell us how you would like to be involved and our team can connect you with an opportunity that matches your interests and skills.
              </p>
              <a
                href={`mailto:${site.contact.email}?subject=Joining%20BSGSS`}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
              >
                <Mail className="h-4 w-4" /> Email BSGSS to join
              </a>
            </div>
            <aside className="rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 to-brand-50/60 p-6 sm:p-8 shadow-2xs">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-700 shadow-2xs">
                <HandHeart className="h-6 w-6" />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-700">Our shared purpose</p>
              <p className="mt-2 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                Educate, empower and uplift communities—together.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted sm:text-sm">
                Your contribution helps create opportunities for people and communities to grow with dignity, confidence and greater independence.
              </p>
            </aside>
          </section>

          <section className="mt-12 sm:mt-14">
            <div className="border-b border-line pb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Ways to get involved</p>
              <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">Choose the contribution that fits you.</h2>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {ways.map(({ title, description, icon: Icon, cta, href }) => (
                <article
                  key={title}
                  className="group flex flex-col justify-between rounded-xl border border-line bg-white p-6 shadow-2xs transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
                >
                  <div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-brand-800">{title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">{description}</p>
                  </div>
                  <Link
                    href={href}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 sm:text-sm"
                  >
                    {cta}
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Light Card Replacing Previous Dark Card */}
          <section className="mt-12 sm:mt-14 rounded-2xl border border-brand-200/80 bg-sand-50/80 p-6 sm:p-8 text-ink shadow-2xs">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Start a conversation</p>
            <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
              One shared effort can open up new possibilities.
            </h2>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
              For volunteering, internships, CSR and institutional partnerships, write to the BSGSS team with a short note about how you would like to help.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
            >
              Contact BSGSS <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

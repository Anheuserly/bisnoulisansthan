import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, HeartPulse, Lightbulb, Sprout } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Activities under State & Central Government",
  description:
    "BSGSS awareness, education, health and livelihood activities supported through State and Central Government schemes.",
};

const areas = [
  {
    title: "Government-linked awareness",
    text: "Awareness programmes help rural women and communities understand available welfare support across health, education, social security and livelihoods.",
    icon: Lightbulb,
  },
  {
    title: "Grant-in-aid and skills projects",
    text: "Education, literacy and vocational initiatives strengthen learning pathways and skill development for young people and women.",
    icon: Sprout,
  },
  {
    title: "Health and social welfare",
    text: "Community-health outreach, preventive-care information, nutrition awareness and public-service connections support stronger local wellbeing.",
    icon: HeartPulse,
  },
];

export default function GovernmentActivitiesPage() {
  return (
    <>
      <PageHeader
        title="Activities under State & Central Government"
        lead="Community-based programmes connecting awareness, education, health and livelihoods."
        crumbs={[
          { name: "Activities", path: "/activities" },
          { name: "Government programmes", path: "/activities-under-state-central-government" },
        ]}
      />
      <div className="pt-5 pb-10 sm:pt-6 sm:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Programme overview</p>
              <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
                Working with communities to make public support more accessible.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                BSGSS has implemented community-oriented activities supported through Central and State Government schemes. The work brings mobilisation together with awareness, training, health and livelihood components across Uttar Pradesh and neighbouring states.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                The aim is practical: help individuals and groups understand their rights, build skills, access relevant services and take part in their own development.
              </p>
            </div>

            {/* Light Card Replacing Previous Dark Card */}
            <div className="rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 via-white to-brand-50/40 p-6 sm:p-8 text-ink shadow-2xs">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 shadow-2xs">
                <Building2 className="h-6 w-6" />
              </span>
              <p className="mt-5 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                A bridge between community needs and public opportunities.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted sm:text-sm">
                Activities span awareness of welfare schemes, consumer rights, capacity-building for self-help groups and links to health and social-welfare services.
              </p>
              <div className="mt-5 border-t border-brand-100 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
                  Collaborative Public Welfare Initiative
                </span>
              </div>
            </div>
          </section>

          <section className="mt-12 sm:mt-14">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Focus areas</p>
            <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
              Key Community Pillars
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {areas.map(({ title, text, icon: Icon }) => (
                <article key={title} className="design-card rounded-xl border border-line bg-white p-6 shadow-2xs transition-all hover:border-brand-300 hover:shadow-soft">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 sm:mt-14 rounded-2xl border border-brand-100 bg-sand-50/80 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">Explore the work in action</h2>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
              See the community outreach, camps and training moments behind these programmes.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/activities/gallery"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
              >
                View photo gallery <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/activities/videos"
                className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-50 sm:text-sm"
              >
                Watch videos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

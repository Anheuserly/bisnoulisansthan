import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, HeartPulse, Lightbulb, MapPin, ShieldCheck, Sprout } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Government-Supported Programmes | BSGSS",
  description:
    "Review BSGSS grassroots welfare initiatives implemented in partnership with State and Central Government schemes across India.",
  path: "/activities-under-state-central-government",
});

const areas = [
  {
    title: "Government-linked awareness",
    text: "Awareness programmes help rural women and communities understand available welfare support across health, education, social security and livelihoods.",
    icon: Lightbulb,
    badge: "Welfare Schemes",
  },
  {
    title: "Grant-in-aid and skills projects",
    text: "Education, literacy and vocational initiatives strengthen learning pathways and skill development for young people and women.",
    icon: Sprout,
    badge: "Vocational Skills",
  },
  {
    title: "Health and social welfare",
    text: "Community-health outreach, preventive-care information, nutrition awareness and public-service connections support stronger local wellbeing.",
    icon: HeartPulse,
    badge: "Preventive Health",
  },
];

const documentaryMoments = [
  {
    title: "Community Literacy & Scheme Awareness",
    location: "Dadri, Gautam Buddha Nagar",
    image: "/images/bsgss/education/146-class1.jpeg",
    tag: "Awareness Mission",
    desc: "Educating rural households on central welfare rights and entitlements.",
  },
  {
    title: "Mobile Diagnostic & Cancer Screening",
    location: "Rural NCR & Haryana",
    image: "/images/bsgss/healthcare-camps/149-camp1.jpeg",
    tag: "Health Outreach",
    desc: "Preventive oncology and general medical consultations with specialists.",
  },
  {
    title: "Vocational Tailoring Guilds for Women",
    location: "Bisnouli Craft Centre",
    image: "/images/bsgss/gallery-training/185-tal1.jpeg",
    tag: "Livelihood Scheme",
    desc: "Certified sewing and micro-enterprise training for rural women.",
  },
];

export default function GovernmentActivitiesPage() {
  return (
    <>
      <PageHeader
        title="Activities under State & Central Government"
        lead="Community-based programmes connecting grassroots mobilisation with awareness, education, healthcare, and sustainable livelihoods."
        crumbs={[
          { name: "Activities", path: "/activities" },
          { name: "Government programmes", path: "/activities-under-state-central-government" },
        ]}
      />
      <div className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <ScrollReveal direction="up" delay={40}>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
                Statutory Implementation Body
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl lg:text-4xl">
                Working with communities to make public support directly accessible.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                BSGSS implements community-oriented activities supported through Central and State Government schemes. The work brings community mobilisation together with awareness, training, healthcare, and livelihood components across Uttar Pradesh, Delhi NCR, and neighbouring states.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                The aim is practical: help individuals and women&apos;s self-help groups understand statutory rights, build technical skills, access public services, and participate in their own self-reliance.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="scale" delay={80}>
              <div className="border-t-2 border-brand-850 pt-6 text-ink">
                <Building2 className="h-6 w-6 text-ink" />
                <p className="mt-4 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                  A bridge between community needs and public opportunities.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Activities span awareness of welfare schemes, consumer rights, capacity-building for self-help groups and links to health and social-welfare services.
                </p>
                <div className="mt-5 border-t border-line/60 pt-4 flex items-center gap-2 text-xs font-semibold text-brand-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>NITI Aayog Darpan &amp; MCA CSR-1 Registered</span>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Key Community Pillars (Borderless, Open Editorial) */}
          <section className="mt-12 sm:mt-16">
            <ScrollReveal direction="up" delay={40}>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700">Focus areas</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
                Key Community Pillars
              </h2>
            </ScrollReveal>

            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {areas.map(({ title, text, icon: Icon, badge }, idx) => (
                <ScrollReveal key={title} staggerIndex={idx} direction="up">
                  <article className="group flex h-full flex-col border-t-2 border-line pt-6 transition hover:border-brand-700">
                    <div className="flex items-center justify-between gap-2">
                      <Icon className="h-6 w-6 text-ink transition group-hover:text-brand-800" />
                      <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">
                        {badge}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-brand-800">{title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{text}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Documentary Photographs of Field Action */}
          <section className="mt-12 sm:mt-16">
            <ScrollReveal direction="up" delay={40}>
              <div className="border-b border-line pb-3">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Documentary Record</p>
                <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
                  Field execution across rural districts
                </h2>
              </div>
            </ScrollReveal>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {documentaryMoments.map((moment, idx) => (
                <ScrollReveal key={moment.title} staggerIndex={idx} direction="up">
                  <figure className="group overflow-hidden rounded-2xl border-2 border-white bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
                      <img
                        src={moment.image}
                        alt={moment.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-106"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[0.6875rem] font-bold text-brand-950 shadow-2xs">
                          {moment.tag}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[0.625rem] font-medium text-white backdrop-blur-md border border-white/20">
                          <MapPin className="h-2.5 w-2.5 text-emerald-400" />
                          <span>{moment.location}</span>
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                        <p className="font-display text-sm font-bold">{moment.title}</p>
                        <p className="text-[0.6875rem] text-white/80 line-clamp-1">{moment.desc}</p>
                      </div>
                    </div>
                  </figure>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <ScrollReveal direction="up" delay={60}>
            <section className="mt-12 sm:mt-16 rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 via-white to-brand-50/50 p-6 sm:p-8 shadow-2xs">
              <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">Explore community work in action</h2>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                See the community outreach, health camps, and women&apos;s vocational training behind these programmes.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/activities/gallery"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
                >
                  <span>View photo chronicle</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/activities/videos"
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-5 py-2.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-50 sm:text-sm"
                >
                  <span>Watch videos</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, HeartPulse, Image as ImageIcon, Newspaper, ShoppingBag, Video } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Activities & Field Initiatives | BSGSS",
  description:
    "Discover field initiatives by BSGSS: medical screening camps, vocational guilds, women's empowerment drives, and rural workshops.",
  path: "/activities",
});

const activities = [
  {
    title: "Community Mobilisation & Councils",
    tag: "Grassroots Assembly",
    image: "gallery-community/192-whatsapp-image-2025-10-09-at-15-55-32-dd874b0a.jpg",
    desc: "Facilitating village discussions on rights, education, and collective savings.",
  },
  {
    title: "Preventive Healthcare & Cancer Camps",
    tag: "Mobile Health",
    image: "healthcare-camps/150-camp3.jpeg",
    desc: "Free oncology checkups, eye testing, and essential medicine distributions.",
  },
  {
    title: "Vocational Tailoring & Craft Guilds",
    tag: "Women Livelihood",
    image: "gallery-training/186-tal2.jpeg",
    desc: "Skill certification and self-reliance for rural women and youth.",
  },
  {
    title: "Education & Literacy Programmes",
    tag: "Child Empowerment",
    image: "education/153-class4.jpeg",
    desc: "Remedial schooling, digital training, and learning material distributions.",
  },
  {
    title: "Youth Leadership & Citizenship",
    tag: "Youth Development",
    image: "gallery-jac/161-jac3.jpg",
    desc: "Community service and environmental awareness drives for village youth.",
  },
  {
    title: "Institutional Outreach & Events",
    tag: "Statutory Outreach",
    image: "gallery-events/355-1-1.jpg",
    desc: "Annual convocation, felicitation of artisans, and partner CSR reviews.",
  },
];

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader
        title="Activities & Field Initiatives"
        lead="A comprehensive view into BSGSS programmes, vocational training, community healthcare, and women-led rural enterprise."
        crumbs={[{ name: "Activities", path: "/activities" }]}
      />
      <div className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          {/* 6 Direct Activity Pillars */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                href: "/activities/key-programmes",
                icon: HeartPulse,
                title: "Our Key Programmes",
                text: "Explore BSGSS healthcare, livelihoods, and skill-development programmes in depth.",
                cta: "Explore programmes",
              },
              {
                href: "/activities/gallery",
                icon: ImageIcon,
                title: "Photo Gallery & Chronicle",
                text: "30-year photographic archive from community outreach, healthcare camps, and craft centres.",
                cta: "View photo archive",
              },
              {
                href: "/activities/videos",
                icon: Video,
                title: "Video Documentation",
                text: "Watch BSGSS medical camps, training guilds, and village outreach on our official YouTube collection.",
                cta: "Watch videos",
              },
              {
                href: "/activities/work-in-media",
                icon: Newspaper,
                title: "Work in Media & Press",
                text: "Read authentic newspaper clippings and independent media coverage documenting BSGSS impact.",
                cta: "View coverage",
              },
              {
                href: "/activities/shg-products",
                icon: ShoppingBag,
                title: "Women SHG Products",
                text: "Discover handcrafted shawls, mufflers, stoles, and eco-totes created by rural women artisans.",
                cta: "Explore catalog",
              },
              {
                href: "/activities-under-state-central-government",
                icon: FileCheck2,
                title: "Government Programmes",
                text: "Review Central and State Government-supported awareness, grant-in-aid, and development initiatives.",
                cta: "Learn more",
              },
            ].map((linkItem, idx) => (
              <ScrollReveal key={linkItem.href} staggerIndex={idx} direction="up">
                <ActivityLink {...linkItem} />
              </ScrollReveal>
            ))}
          </div>

          {/* Documentary Moments Exhibition */}
          <section className="mt-14 sm:mt-18">
            <ScrollReveal direction="up" delay={40}>
              <div className="border-b border-line pb-3">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Programme Moments</p>
                <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
                  Community work in daily action
                </h2>
              </div>
            </ScrollReveal>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map((item, idx) => (
                <ScrollReveal key={item.title} staggerIndex={idx} direction="up">
                  <figure className="group overflow-hidden rounded-2xl border-2 border-white bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
                      <img
                        src={`/images/bsgss/${item.image}`}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-106"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute top-2.5 left-2.5">
                        <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[0.6875rem] font-bold text-brand-950 shadow-2xs">
                          {item.tag}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                        <p className="font-display text-sm font-bold sm:text-base">{item.title}</p>
                        <p className="mt-0.5 text-[0.6875rem] text-white/80 line-clamp-1">{item.desc}</p>
                      </div>
                    </div>
                  </figure>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function ActivityLink({
  href,
  icon: Icon,
  title,
  text,
  cta,
}: {
  href: string;
  icon: typeof ImageIcon;
  title: string;
  text: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="design-card group flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition group-hover:bg-brand-700 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-brand-800">{title}</h2>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-muted sm:text-sm">{text}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 group-hover:text-brand-900 transition-colors">
        <span>{cta}</span>
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

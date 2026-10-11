import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, HeartPulse, Image as ImageIcon, Newspaper, ShoppingBag, Video } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Activities",
  description: "BSGSS activities and community programmes in action.",
};

const activities = [
  ["Community programmes", "gallery-community/192-whatsapp-image-2025-10-09-at-15-55-32-dd874b0a.jpg"],
  ["Healthcare camps", "healthcare-camps/150-camp3.jpeg"],
  ["Vocational training", "gallery-training/186-tal2.jpeg"],
  ["Education initiatives", "education/153-class4.jpeg"],
  ["Youth activities", "gallery-jac/161-jac3.jpg"],
  ["Events and outreach", "gallery-events/355-1-1.jpg"],
] as const;

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader
        title="Activities"
        lead="A view into BSGSS programmes, training, community outreach and women-led enterprise."
        crumbs={[{ name: "Activities", path: "/activities" }]}
      />
      <div className="pt-5 pb-10 sm:pt-6 sm:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <ActivityLink
              href="/activities/key-programmes"
              icon={HeartPulse}
              title="Our Key Programmes"
              text="Explore BSGSS healthcare, livelihoods and skill-development programmes."
              cta="Explore programmes"
            />
            <ActivityLink
              href="/activities/gallery"
              icon={ImageIcon}
              title="Photo gallery"
              text="Programme moments from community outreach, healthcare, skills training, education and events."
              cta="View photos"
            />
            <ActivityLink
              href="/activities/videos"
              icon={Video}
              title="Video gallery"
              text="Watch BSGSS camps, training and community outreach through the official YouTube collection."
              cta="Watch videos"
            />
            <ActivityLink
              href="/activities/work-in-media"
              icon={Newspaper}
              title="Work in media"
              text="Read public media clippings featuring BSGSS community activities."
              cta="View coverage"
            />
            <ActivityLink
              href="/activities/shg-products"
              icon={ShoppingBag}
              title="SHG products"
              text="Discover handmade products created through women's self-help groups."
              cta="Explore products"
            />
            <ActivityLink
              href="/activities-under-state-central-government"
              icon={FileCheck2}
              title="Government programmes"
              text="Read about State and Central Government-supported awareness and development initiatives."
              cta="Learn more"
            />
          </div>

          <section className="mt-12 sm:mt-14">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Programme moments</p>
            <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">Community work, in action.</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map(([title, image]) => (
                <figure key={image} className="group overflow-hidden rounded-xl border border-line bg-sand-50 shadow-2xs">
                  <div className="aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/bsgss/${image}`}
                      alt={title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="bg-white px-4 py-3 text-sm font-semibold text-ink">{title}</figcaption>
                </figure>
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
      className="group rounded-xl border border-line bg-white p-5 sm:p-6 shadow-2xs transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-brand-800">{title}</h2>
      <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">{text}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
        {cta} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

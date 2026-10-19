import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InteractiveActivitiesGallery } from "@/components/gallery/InteractiveActivitiesGallery";
import { links } from "@/config/content";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Field Photo Gallery & Archive | BSGSS",
  description:
    "View authentic field photographs of BSGSS rural healthcare camps, women self-help councils, and youth vocational workshops.",
  path: "/activities/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Living Sarvodaya Photo Chronicle"
        lead="A curated visual archive capturing 30 years of dignity, grassroots healthcare, women's self-reliance, and village development."
        crumbs={[
          { name: "Activities", path: links.activities },
          { name: "Photo gallery", path: links.gallery },
        ]}
      />
      <div className="pt-6 pb-16 sm:pt-8 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <InteractiveActivitiesGallery />
        </div>
      </div>
    </>
  );
}

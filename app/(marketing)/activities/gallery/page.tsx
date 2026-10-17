import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InteractiveActivitiesGallery } from "@/components/gallery/InteractiveActivitiesGallery";
import { links } from "@/config/content";

export const metadata: Metadata = {
  title: "Field Photo Chronicle & Gallery | BSGSS",
  description:
    "An authentic photographic archive of Bisnouli Sarvodaya Gramodyog Sewa Sansthan field programs, healthcare camps, tailoring craft centers, and women self-help councils since 1994.",
};

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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <InteractiveActivitiesGallery />
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Camera, Sparkles, X, ZoomIn, Heart, MapPin, Tag, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { type CollagePhotoItem } from "@/config/customizer";

interface HomePhotoCollageProps {
  photos?: CollagePhotoItem[];
}

export function HomePhotoCollage({ photos = [] }: HomePhotoCollageProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<CollagePhotoItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Field Moments" },
    { id: "Skill Development", label: "Skills & Tailoring" },
    { id: "Healthcare", label: "Medical Camps" },
    { id: "Empowerment", label: "Women SHGs" },
    { id: "Social Justice", label: "Village Councils" },
  ];

  const filteredPhotos = activeCategory === "all"
    ? photos
    : photos.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section className="relative overflow-hidden bg-sand-50/60 py-12 sm:py-16 border-b border-brand-100" id="photo-collage">
      {/* Decorative ambient background accents */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-brand-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-800">
              <Camera className="h-3.5 w-3.5 text-brand-700" />
              <span>Photographic Chronicle</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
              Authentic faces, real dignity, lived change.
            </h2>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-ink-muted">
              A curated photographic mosaic from BSGSS field centres, mobile clinics, and village self-help craft guilds across North India.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-brand-200/80 bg-white/90 p-1 shadow-2xs backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-lg px-3 py-1 text-xs font-semibold transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-brand-700 text-white shadow-2xs"
                    : "text-ink-muted hover:text-brand-800 hover:bg-brand-50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stylish Magazine Collage Grid (Asymmetric Editorial Layout) */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((photo, index) => {
            const isFirst = index === 0 && activeCategory === "all";
            return (
              <div
                key={photo.id || photo.src}
                onClick={() => setSelectedPhoto(photo)}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-white bg-white shadow-soft transition-all duration-300 hover:z-20 hover:scale-[1.02] hover:shadow-2xl hover:rotate-0",
                  photo.tilt || "rotate-0",
                  isFirst ? "sm:col-span-2 lg:col-span-2 sm:row-span-2" : ""
                )}
                style={{
                  boxShadow: "0 10px 30px -10px rgba(27, 35, 38, 0.15), 0 0 0 1px rgba(35, 104, 115, 0.08)"
                }}
              >
                {/* Washi-Tape / Polaroid Header Pin */}
                <div className="absolute left-1/2 -top-2.5 z-10 h-5 w-16 -translate-x-1/2 rounded-xs bg-amber-100/80 shadow-xs backdrop-blur-xs border border-amber-200/60" />

                {/* Photo Image Container */}
                <div className={cn("relative overflow-hidden bg-sand-100", isFirst ? "aspect-[16/10] sm:aspect-[16/11]" : "aspect-[4/3]")}>
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 transition-opacity group-hover:opacity-95" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[0.6875rem] font-bold text-brand-900 shadow-2xs backdrop-blur-md">
                      <Tag className="h-3 w-3 text-brand-700" />
                      {photo.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {photo.tag && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-white/95 backdrop-blur-md border border-white/20">
                          <MapPin className="h-3 w-3 text-emerald-400" />
                          {photo.tag}
                        </span>
                      )}
                      <span className="hidden sm:inline-flex items-center rounded-xs bg-amber-500/20 px-1.5 py-0.5 text-[0.6rem] font-mono font-bold tracking-widest text-amber-200 uppercase border border-amber-400/30">
                        DOC #{String(index + 1).padStart(3, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-base font-bold text-white drop-shadow-xs sm:text-lg">
                        {photo.title}
                      </h3>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition group-hover:bg-brand-600 group-hover:scale-110">
                        <ZoomIn className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/85">
                      {photo.caption}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between border-t border-white/15 pt-2 text-[0.6875rem] font-medium text-white/70">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>{photo.year || "BSGSS Field Chronicle"}</span>
                      </div>
                      <span className="text-[0.625rem] font-mono tracking-wider text-white/60 uppercase">
                        Grassroots Archival
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to view full archive */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-brand-200/80 bg-white p-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <p className="text-xs sm:text-sm text-ink-muted">
              Over <strong>500+ verified activity photos</strong> and field reports documented since 1994.
            </p>
          </div>
          <Link
            href="/activities/gallery"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors"
          >
            Explore Complete Activity Albums <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal Dialog */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-scaleUp"
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black"
              aria-label="Close photo view"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative max-h-[65vh] w-full overflow-hidden bg-sand-900">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="h-full max-h-[65vh] w-full object-contain mx-auto"
              />
            </div>

            <div className="p-5 sm:p-6 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-ink">
                    {selectedPhoto.title}
                  </h3>
                </div>
                {selectedPhoto.tag && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-ink-muted">
                    <MapPin className="h-3.5 w-3.5 text-brand-700" />
                    {selectedPhoto.tag}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

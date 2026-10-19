"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Camera,
  Compass,
  Filter,
  Heart,
  Images,
  MapPin,
  Maximize2,
  Search,
  Sparkles,
  Tag,
  ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { GALLERY_ARCHIVE_DATA, type GalleryItem } from "./gallery-data";
import { GalleryLightbox } from "./GalleryLightbox";

const CATEGORIES = [
  { id: "all", label: "All Chronicles" },
  { id: "healthcare", label: "Medical & Cancer Camps" },
  { id: "skills", label: "Tailoring & Handloom Guilds" },
  { id: "community", label: "Village Councils & SHGs" },
  { id: "education", label: "Education & Literacy" },
  { id: "csr", label: "CSR Alliances & Governance" },
];

export function InteractiveActivitiesGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Filtered dataset based on category pill and search query
  const filteredItems = useMemo(() => {
    return GALLERY_ARCHIVE_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.archiveRef.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Interactive Command & Search Strip */}
      <div className="flex flex-col gap-4 rounded-2xl border border-brand-200/80 bg-white p-5 shadow-2xs sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Summary Metric */}
        <div className="flex items-center gap-3">
          <Camera className="h-6 w-6 text-slate-700 shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
                Living Sarvodaya Field Chronicle
              </h2>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.6875rem] font-bold text-emerald-800 ring-1 ring-emerald-300">
                {filteredItems.length} Photographs
              </span>
            </div>
            <p className="text-xs text-ink-muted sm:text-sm">
              Documenting 30 years of village healthcare, women&apos;s micro-enterprise, and grassroots education.
            </p>
          </div>
        </div>

        {/* Right: Instant Field Search Input */}
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by village, camp, or keyword..."
            className="w-full rounded-xl border border-line bg-sand-50/70 py-2 pl-9 pr-4 text-xs font-medium text-ink placeholder:text-ink-muted/70 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-muted hover:text-ink"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Thematic Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-brand-100 pb-4">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200",
                isActive
                  ? "bg-brand-700 text-white shadow-soft"
                  : "border border-brand-200/80 bg-white text-ink-muted hover:border-brand-300 hover:bg-brand-50/60 hover:text-brand-900"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Magazine Collage Exhibition Grid */}
      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-sand-50/60 p-12 text-center">
          <Compass className="mx-auto h-8 w-8 text-brand-600" />
          <p className="mt-3 font-display text-lg font-bold text-ink">No photographs found</p>
          <p className="mt-1 text-xs text-ink-muted">
            Try adjusting your search keywords or select &quot;All Chronicles&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-800 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => {
            const isFeatured = item.featured && activeCategory === "all" && !searchQuery;
            return (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-white bg-white shadow-soft transition-all duration-300 hover:z-20 hover:scale-[1.025] hover:shadow-2xl hover:rotate-0",
                  item.tilt || "rotate-0",
                  isFeatured ? "sm:col-span-2 lg:col-span-2 sm:row-span-2" : ""
                )}
                style={{
                  boxShadow:
                    "0 12px 32px -10px rgba(27, 35, 38, 0.16), 0 0 0 1px rgba(35, 104, 115, 0.08)",
                }}
              >
                {/* Washi-Tape / Polaroid Header Pin */}
                <div className="absolute left-1/2 -top-2.5 z-10 h-5 w-16 -translate-x-1/2 rounded-xs bg-amber-100/85 shadow-xs backdrop-blur-xs border border-amber-200/70" />

                {/* Photo Image Frame */}
                <div
                  className={cn(
                    "relative overflow-hidden bg-sand-100",
                    isFeatured ? "aspect-[16/10] sm:aspect-[16/11]" : "aspect-[4/3]"
                  )}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading={index < 4 ? "eager" : "lazy"}
                  />

                  {/* Gradient Readability Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[0.6875rem] font-bold text-brand-950 shadow-2xs backdrop-blur-md">
                      <Tag className="h-3 w-3 text-brand-700" />
                      {item.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-white backdrop-blur-md border border-white/20">
                        <MapPin className="h-3 w-3 text-emerald-400" />
                        {item.location}
                      </span>
                      <span className="hidden sm:inline-flex items-center rounded-xs bg-amber-500/25 px-1.5 py-0.5 text-[0.625rem] font-mono font-bold tracking-widest text-amber-200 uppercase border border-amber-400/30">
                        {item.archiveRef}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-base font-bold text-white drop-shadow-xs sm:text-lg">
                        {item.title}
                      </h3>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-brand-600 group-hover:scale-110">
                        <ZoomIn className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/85 sm:text-[13px]">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-2 text-[0.6875rem] font-medium text-white/70">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{item.year} · Field Record</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[0.625rem] font-mono uppercase tracking-wider text-white/70 group-hover:text-emerald-300 transition">
                        <span>Click to Expand</span>
                        <Maximize2 className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full-Screen Interactive Lightbox with Zoom Controls */}
      <GalleryLightbox
        item={lightboxItem}
        items={filteredItems}
        onClose={() => setLightboxItem(null)}
        onNavigate={(newItem) => setLightboxItem(newItem)}
      />
    </div>
  );
}

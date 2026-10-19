"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Camera, ExternalLink, Newspaper, Play, Video, Youtube } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { content, links } from "@/config/content";

type TabKey = "photos" | "videos" | "media";

export function HomeMediaShowcase() {
  const [activeTab, setActiveTab] = useState<TabKey>("photos");

  const photos = content.activities.photoGallery.images.slice(0, 4);
  const videos = content.activities.videos.slice(0, 3);
  const clippings = content.activities.clippings.slice(0, 3);

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-brand-100" id="media-showcase">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
              Community Action &amp; Public Record
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              Moments, stories and media from the field.
            </h2>
            <p className="mt-3 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-700">
              Authentic glimpses of BSGSS programmes, YouTube video documentation, and public newspaper coverage.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-brand-200/80 bg-sand-50/80 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("photos")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                activeTab === "photos"
                  ? "bg-white text-brand-800 shadow-2xs ring-1 ring-brand-200"
                  : "text-ink-muted hover:text-brand-700",
              )}
            >
              <Camera className="h-3.5 w-3.5" />
              <span>Photos</span>
              <span className="rounded-full bg-brand-50 px-1.5 py-0.2 text-[0.6875rem] font-bold text-brand-700">
                {content.activities.photoGallery.images.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("videos")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                activeTab === "videos"
                  ? "bg-white text-brand-800 shadow-2xs ring-1 ring-brand-200"
                  : "text-ink-muted hover:text-brand-700",
              )}
            >
              <Video className="h-3.5 w-3.5" />
              <span>Videos</span>
              <span className="rounded-full bg-brand-50 px-1.5 py-0.2 text-[0.6875rem] font-bold text-brand-700">
                {content.activities.videos.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("media")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                activeTab === "media"
                  ? "bg-white text-brand-800 shadow-2xs ring-1 ring-brand-200"
                  : "text-ink-muted hover:text-brand-700",
              )}
            >
              <Newspaper className="h-3.5 w-3.5" />
              <span>Media</span>
              <span className="rounded-full bg-brand-50 px-1.5 py-0.2 text-[0.6875rem] font-bold text-brand-700">
                {content.activities.clippings.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab 1: Photo Moments Preview */}
        {activeTab === "photos" && (
          <div className="mt-8 animate-fadeIn">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {photos.map((image, index) => (
                <a
                  key={image.src}
                  href={image.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-xl border border-line bg-white shadow-2xs transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-sand-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.src}
                      alt={image.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 p-3">
                    <span className="text-xs font-semibold text-ink group-hover:text-brand-800 transition-colors">
                      {image.title}
                    </span>
                    <ExternalLink className="h-3 w-3 shrink-0 text-brand-700" />
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
              <p className="text-xs text-ink-muted">
                Showing 4 of {content.activities.photoGallery.images.length} community photos from BSGSS archives
              </p>
              <Link
                href={links.gallery}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors sm:text-sm"
              >
                View all 23 photo moments <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Tab 2: Videos in Action Preview */}
        {activeTab === "videos" && (
          <div className="mt-8 animate-fadeIn">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((vid) => (
                <a
                  key={vid.id}
                  href={`https://www.youtube.com/watch?v=${vid.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-xl border border-line bg-white shadow-2xs transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft"
                >
                  <div className="relative aspect-video overflow-hidden bg-sand-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://i.ytimg.com/vi/${vid.id}/hqdefault.jpg`}
                      alt={vid.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition group-hover:scale-110">
                        <Play className="ml-0.5 h-4 w-4 fill-white" />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 p-3.5">
                    <div className="min-w-0">
                      <span className="block truncate text-xs font-semibold text-ink group-hover:text-brand-800 transition-colors sm:text-sm">
                        {vid.title}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-[0.6875rem] text-ink-muted">
                        <Youtube className="h-3 w-3 text-red-600" /> Official BSGSS Channel
                      </span>
                    </div>
                    <ExternalLink className="h-3 w-3 shrink-0 text-brand-700" />
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
              <p className="text-xs text-ink-muted">
                Showing 3 of {content.activities.videos.length} videos recorded across rural programmes
              </p>
              <Link
                href={links.videos}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors sm:text-sm"
              >
                Watch all 23 videos in gallery <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Tab 3: Work in Media (Press Clippings Preview) */}
        {activeTab === "media" && (
          <div className="mt-8 animate-fadeIn">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {clippings.map((clip) => (
                <a
                  key={clip.image}
                  href={`/images/bsgss/gallery-community/${clip.image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-xl border border-line bg-white shadow-2xs transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-sand-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/bsgss/gallery-community/${clip.image}`}
                      alt={`${clip.outlet}: ${clip.title}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-3 p-3.5">
                    <div>
                      <span className="inline-block rounded bg-sand-100 px-1.5 py-0.5 text-[0.6875rem] font-bold text-brand-800">
                        {clip.outlet}
                      </span>
                      <h3 className="mt-1 font-display text-xs font-bold text-ink group-hover:text-brand-800 transition-colors sm:text-sm">
                        {clip.title}
                      </h3>
                    </div>
                    <ExternalLink className="mt-1 h-3 w-3 shrink-0 text-brand-700" />
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
              <p className="text-xs text-ink-muted">
                Showing 3 of {content.activities.clippings.length} public newspaper coverage archives
              </p>
              <Link
                href={links.media}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors sm:text-sm"
              >
                Explore full media archive <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

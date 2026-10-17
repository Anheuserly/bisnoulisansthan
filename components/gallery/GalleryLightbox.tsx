"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  Tag,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Calendar,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import type { GalleryItem } from "./gallery-data";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
}

export function GalleryLightbox({
  item,
  items,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPanActive, setIsPanActive] = useState(false);

  // Keyboard navigation & Esc key handler
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-") {
        handleZoomOut();
      } else if (e.key === "0") {
        handleResetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Prevent body scrolling

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [item, items]);

  // Reset zoom whenever item changes
  useEffect(() => {
    setZoomLevel(1);
  }, [item?.id]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const totalCount = items.length;

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onNavigate(items[currentIndex + 1]!);
    } else {
      onNavigate(items[0]!); // Loop back to start
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(items[currentIndex - 1]!);
    } else {
      onNavigate(items[items.length - 1]!); // Loop back to end
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 2.75));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.35, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md animate-fadeIn select-none"
    >
      {/* Top Controls Toolbar */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
        {/* Left: Counter & Archival Tag */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
            {String(currentIndex + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
          </span>
          <span className="hidden sm:inline-block font-mono text-xs font-semibold text-white/70">
            {item.archiveRef}
          </span>
        </div>

        {/* Center: Live Zoom Controls */}
        <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2 py-1 backdrop-blur-md">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            aria-label="Zoom out"
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition hover:bg-white/20 hover:text-white disabled:opacity-40"
            title="Zoom Out (-)"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="px-1 font-mono text-xs font-bold text-white min-w-[3.25rem] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 2.75}
            aria-label="Zoom in"
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition hover:bg-white/20 hover:text-white disabled:opacity-40"
            title="Zoom In (+)"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          {zoomLevel > 1 && (
            <button
              type="button"
              onClick={handleResetZoom}
              aria-label="Reset zoom"
              className="ml-1 flex h-7 items-center gap-1 rounded-full bg-white/20 px-2 text-[0.6875rem] font-semibold text-white transition hover:bg-white/30"
              title="Reset Zoom (0)"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: Actions & Close */}
        <div className="flex items-center gap-2">
          <a
            href={item.src}
            download={`${item.id}.jpg`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download high resolution original photo"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-white/20 hover:text-white"
            title="Open / Download Full Resolution Image"
          >
            <Download className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close full screen gallery view"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-rose-600 hover:scale-105 active:scale-95"
            title="Close (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Viewport: Large Image Canvas with Prev / Next Triggers */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-8">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous photograph"
          className="absolute left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-2xl backdrop-blur-md transition hover:scale-110 hover:bg-brand-600 active:scale-95"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Scalable Photographic Plate */}
        <div
          className="relative max-h-full max-w-full overflow-hidden transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${zoomLevel})`,
            cursor: zoomLevel > 1 ? "grab" : "default",
          }}
        >
          <img
            src={item.src}
            alt={item.title}
            className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10"
            draggable={false}
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next photograph"
          className="absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-2xl backdrop-blur-md transition hover:scale-110 hover:bg-brand-600 active:scale-95"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Bottom Metadata Narrative Banner */}
      <div className="shrink-0 border-t border-white/10 bg-black/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-700/80 px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-white">
                {item.categoryLabel}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <MapPin className="h-3 w-3" />
                {item.location}
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1 text-xs font-medium text-white/70">
                <Calendar className="h-3 w-3" />
                {item.year}
              </span>
            </div>
            <h2 className="mt-1 font-display text-lg font-bold text-white sm:text-xl">
              {item.title}
            </h2>
            <p className="mt-0.5 text-xs leading-relaxed text-white/80 sm:text-sm">
              {item.description}
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2 sm:pt-0">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-right">
              <span className="block text-[0.625rem] font-mono tracking-wider text-white/50 uppercase">
                Status
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Field Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

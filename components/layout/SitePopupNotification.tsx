"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Megaphone,
  Newspaper,
  PartyPopper,
  Radio,
  Tag,
  X,
  ArrowRight,
} from "lucide-react";
import type { CustomizerPopupConfig, PopupNotificationType } from "@/config/customizer";

const POPUP_DISMISS_KEY = "bsgss_popup_dismissed_title";

export function SitePopupNotification() {
  const [config, setConfig] = useState<CustomizerPopupConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    async function loadPopup() {
      try {
        const res = await fetch("/api/customize", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const popup = data?.settings?.popup as CustomizerPopupConfig | undefined;

        if (!popup || !popup.enabled || !popup.title) return;

        // Check expiry date if specified
        if (popup.expiryDate) {
          const expiryTime = new Date(popup.expiryDate).getTime();
          if (!isNaN(expiryTime) && Date.now() > expiryTime) {
            return;
          }
        }

        // Check sessionStorage to not annoy user repeatedly in the same session
        const dismissed = sessionStorage.getItem(POPUP_DISMISS_KEY);
        if (dismissed === popup.title) {
          return;
        }

        setConfig(popup);
        const delayMs = (popup.delaySeconds || 1) * 1000;
        timer = setTimeout(() => {
          setIsOpen(true);
        }, delayMs);
      } catch (err) {
        console.error("Could not fetch popup notification:", err);
      }
    }

    loadPopup();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    if (config?.title) {
      sessionStorage.setItem(POPUP_DISMISS_KEY, config.title);
    }
    setIsOpen(false);
  };

  if (!isOpen || !config) return null;

  const typeConfig: Record<
    PopupNotificationType,
    { label: string; icon: React.ComponentType<{ className?: string }> }
  > = {
    announcement: {
      label: "Official Announcement",
      icon: Megaphone,
    },
    news: {
      label: "Institutional News",
      icon: Newspaper,
    },
    activity: {
      label: "Grassroots Activity",
      icon: PartyPopper,
    },
    advertisement: {
      label: "Special Posting / Campaign",
      icon: Tag,
    },
  };

  const currentType = typeConfig[config.type] || typeConfig.announcement;
  const IconComponent = currentType.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-popup-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Dimmed backdrop */}
      <div
        onClick={handleDismiss}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-line animate-in zoom-in-95 duration-200">
        {/* Top Accent Line */}
        <div className="h-1.5 w-full bg-slate-900" />

        {/* Optional Media Banner */}
        {config.imageUrl && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand-100">
            <Image
              src={config.imageUrl}
              alt={config.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 512px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-xs hover:bg-white hover:text-slate-950 transition cursor-pointer"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-7">
          {/* Badge & Type indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800">
              <IconComponent className="h-3.5 w-3.5 text-slate-900" />
              <span>{config.badge || currentType.label}</span>
            </div>
            <span className="text-xs text-ink-muted">·</span>
            <span className="text-[11px] font-medium text-ink-muted capitalize">
              {config.type}
            </span>
          </div>

          {/* Title */}
          <h2
            id="site-popup-title"
            className="mt-2.5 font-display text-xl sm:text-2xl font-bold leading-tight text-ink"
          >
            {config.title}
          </h2>

          {/* Description */}
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink-muted">
            {config.description}
          </p>

          {/* Action CTAs */}
          <div className="mt-6 pt-5 border-t border-line flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              {config.primaryButtonText && config.primaryButtonUrl && (
                <Link
                  href={config.primaryButtonUrl}
                  onClick={handleDismiss}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800 transition"
                >
                  <span>{config.primaryButtonText}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}

              {config.secondaryButtonText && config.secondaryButtonUrl && (
                <Link
                  href={config.secondaryButtonUrl}
                  onClick={handleDismiss}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-sand-50 transition"
                >
                  <span>{config.secondaryButtonText}</span>
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              className="text-xs font-medium text-ink-muted hover:text-ink transition cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

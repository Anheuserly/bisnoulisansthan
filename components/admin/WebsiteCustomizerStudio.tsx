"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Award,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  FileText,
  GripVertical,
  Globe,
  HelpCircle,
  Image as ImageIcon,
  Layers,
  MapPin,
  MessageCircle,
  Music,
  Palette,
  Pause,
  Play,
  Plus,
  RefreshCw,
  RotateCcw,
  Sliders,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Type,
  Volume2,
  VolumeX,
  Bell,
  Megaphone,
  Route,
  Share2,
  ListVideo,
  Maximize2,
  Minimize2,
  PanelLeftClose,
  PanelLeftOpen,
  Star,
  Film,
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { RenderedCertificatePreview } from "@/components/support/RenderedCertificatePreview";
import {
  AMBIENT_TRACK_PRESETS,
  DEFAULT_CUSTOMIZER_SETTINGS,
  type CustomizerSettings,
  type CustomizerVideoItem,
  type SectionConfig,
  type CollagePhotoItem,
  type PopupNotificationType,
  type StoryMilestoneConfig,
} from "@/config/customizer";
import { extractYouTubeVideoId } from "@/lib/youtube";

interface WebsiteCustomizerStudioProps {
  initialSettings: CustomizerSettings;
  initialTab?: string;
  admin?: {
    displayName: string;
    email: string;
    role?: string;
  };
}

const GALLERY_PRESET_IMAGES = [
  { label: "Community Center Gathering", src: "/images/bsgss/gallery-community/203-whatsapp-image-2025-10-09-at-16-49-35-618e38b6.jpg" },
  { label: "Mobile Cancer Screening Camp", src: "/images/bsgss/healthcare-camps/149-camp1.jpeg" },
  { label: "Vocational Tailoring Center", src: "/images/bsgss/gallery-training/185-tal1.jpeg" },
  { label: "Village Women Empowerment Circle", src: "/images/bsgss/gallery-community/200-whatsapp-image-2025-10-09-at-16-49-32-aab7df99.jpg" },
  { label: "Digital Literacy & Youth Skills", src: "/images/bsgss/gallery-community/196-whatsapp-image-2025-10-09-at-16-49-28-cc32c34a.jpg" },
  { label: "Doctor Consultations & Free Meds", src: "/images/bsgss/healthcare-camps/150-camp3.jpeg" },
  { label: "Women Training Workshop", src: "/images/bsgss/gallery-training/186-tal2.jpeg" },
  { label: "Village Outreach & Dialogue", src: "/images/bsgss/gallery-community/199-whatsapp-image-2025-10-09-at-16-49-32-991a8f3a.jpg" },
  { label: "Rural Class Literacy", src: "/images/bsgss/education/146-class1.jpeg" },
  { label: "Banner 1 - Women Enterprise", src: "/images/bsgss/banners/589-banner-1.webp" },
  { label: "Banner 2 - Healthcare Outreach", src: "/images/bsgss/banners/590-banner-2.webp" },
  { label: "Banner 3 - Khadi Gramodyog", src: "/images/bsgss/banners/592-banner-3.webp" },
];

type CustomizerTabId =
  | "sections"
  | "videos"
  | "certificate"
  | "story"
  | "social"
  | "popup"
  | "texts"
  | "layout"
  | "offices"
  | "footprint"
  | "collage"
  | "audio"
  | "typing";

export const CUSTOMIZER_MODULES: {
  id: CustomizerTabId;
  label: string;
  icon: any;
  badge?: string;
  category: string;
}[] = [
  { id: "certificate", label: "Donation Certificate", icon: Award, badge: "Live Preview", category: "DONATIONS" },
  { id: "videos", label: "Video Archives & Films", icon: ListVideo, category: "MEDIA" },
  { id: "sections", label: "Homepage Sections & Order", icon: Layers, category: "STRUCTURE" },
  { id: "story", label: "Our Story & Milestones", icon: Route, category: "CONTENT" },
  { id: "popup", label: "Pop-up Announcements", icon: Bell, category: "ENGAGEMENT" },
  { id: "texts", label: "Website Texts & Copy", icon: FileText, category: "CONTENT" },
  { id: "layout", label: "Header, Nav & Footer Size", icon: Sliders, category: "STRUCTURE" },
  { id: "offices", label: "Offices & WhatsApp Setup", icon: Building2, category: "CONTACT" },
  { id: "footprint", label: "Footprint & Reach", icon: Globe, category: "STRUCTURE" },
  { id: "collage", label: "Photo Collage & Gallery", icon: Camera, category: "MEDIA" },
  { id: "audio", label: "Relaxing Ambient Music", icon: Music, category: "MEDIA" },
  { id: "typing", label: "Live Mission Ticker", icon: Type, category: "CONTENT" },
  { id: "social", label: "Social Media Channels", icon: Share2, category: "ENGAGEMENT" },
];

export function WebsiteCustomizerStudio({ initialSettings, initialTab, admin }: WebsiteCustomizerStudioProps) {
  const [settings, setSettings] = useState<CustomizerSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState<CustomizerTabId>(
    initialTab &&
    [
      "sections",
      "videos",
      "certificate",
      "story",
      "social",
      "popup",
      "texts",
      "layout",
      "offices",
      "footprint",
      "collage",
      "audio",
      "typing",
    ].includes(initialTab as CustomizerTabId)
      ? (initialTab as CustomizerTabId)
      : "certificate"
  );
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isStudioNavCollapsed, setIsStudioNavCollapsed] = useState(false);
  const [sampleDonor, setSampleDonor] = useState("Shubham Kumar");
  const [sampleAmount, setSampleAmount] = useState(20000);
  const [activeCertSection, setActiveCertSection] = useState<"header" | "appearance" | "signatory" | "seal" | "wording" | "numbering">("header");

  // Video Management Studio State
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoCategory, setNewVideoCategory] = useState("Healthcare Camp");
  const [newVideoPublished, setNewVideoPublished] = useState("");
  const [newVideoFeatured, setNewVideoFeatured] = useState(false);
  const [fetchingVideoInfo, setFetchingVideoInfo] = useState(false);
  const [videoFetchError, setVideoFetchError] = useState<string | null>(null);
  const [previewVideoId, setPreviewVideoId] = useState<string | null>(null);

  // Audio preview state inside admin
  const [testAudioPlaying, setTestAudioPlaying] = useState(false);
  const testAudioCtxRef = useState<AudioContext | null>(null);

  // Video Management Helpers
  const handleFetchVideoInfo = async (urlToFetch?: string) => {
    const target = (urlToFetch || newVideoUrl).trim();
    if (!target) return;
    setFetchingVideoInfo(true);
    setVideoFetchError(null);

    try {
      const res = await fetch(`/api/admin/youtube-info?url=${encodeURIComponent(target)}`);
      const data = await res.json();
      if (data.ok && data.id) {
        if (!newVideoTitle || newVideoTitle.trim() === "") {
          setNewVideoTitle(data.title || "");
        }
        if (data.author && (!newVideoPublished || newVideoPublished.trim() === "")) {
          setNewVideoPublished(data.author);
        }
      } else {
        setVideoFetchError(data.message || "Could not resolve YouTube video details.");
      }
    } catch {
      setVideoFetchError("Failed to connect to YouTube metadata service.");
    } finally {
      setFetchingVideoInfo(false);
    }
  };

  const handleAddVideo = () => {
    const target = newVideoUrl.trim();
    if (!target) {
      setVideoFetchError("Please provide a valid YouTube video URL or ID.");
      return;
    }
    const id = extractYouTubeVideoId(target);
    if (!id) {
      setVideoFetchError("Invalid YouTube URL. Please check the link.");
      return;
    }

    if (settings.videos?.some((v) => v.id === id)) {
      setVideoFetchError("This video is already in your archive list.");
      return;
    }

    const newVideo: CustomizerVideoItem = {
      id,
      title: newVideoTitle.trim() || "BSGSS Field Video",
      category: newVideoCategory.trim() || "Healthcare Camp",
      url: target.startsWith("http") ? target : `https://www.youtube.com/watch?v=${id}`,
      publishedAt: newVideoPublished.trim() || "Field Video",
      featured: newVideoFeatured,
      enabled: true,
    };

    setSettings((prev) => ({
      ...prev,
      videos: [newVideo, ...(prev.videos || [])],
    }));

    setNewVideoUrl("");
    setNewVideoTitle("");
    setNewVideoPublished("");
    setNewVideoFeatured(false);
    setVideoFetchError(null);
  };

  const handleMoveVideo = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const list = [...(settings.videos || [])];
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const current = list[index];
    const target = list[targetIndex];
    if (!current || !target) return;
    list[index] = target;
    list[targetIndex] = current;
    setSettings((prev) => ({ ...prev, videos: list }));
  };

  const handleToggleVideo = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      videos: (prev.videos || []).map((v) =>
        v.id === id ? { ...v, enabled: v.enabled === false ? true : false } : v
      ),
    }));
  };

  const handleToggleVideoFeatured = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      videos: (prev.videos || []).map((v) =>
        v.id === id ? { ...v, featured: !v.featured } : v
      ),
    }));
  };

  const handleDeleteVideo = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      videos: (prev.videos || []).filter((v) => v.id !== id),
    }));
  };

  const handleUpdateVideo = (id: string, updates: Partial<CustomizerVideoItem>) => {
    setSettings((prev) => ({
      ...prev,
      videos: (prev.videos || []).map((v) =>
        v.id === id ? { ...v, ...updates } : v
      ),
    }));
  };

  // Section Reordering Helpers
  const handleMoveSection = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= settings.sections.length) return;

    const updated = [...settings.sections];
    const currentItem = updated[index];
    const targetItem = updated[targetIndex];
    if (!currentItem || !targetItem) return;

    updated[index] = targetItem;
    updated[targetIndex] = currentItem;

    // Normalize order index
    const normalized = updated.map((s, idx) => ({ ...s, order: idx + 1 }));
    setSettings((prev) => ({ ...prev, sections: normalized }));
  };

  const handleToggleSection = (sectionId: string) => {
    setSettings((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === sectionId ? { ...s, enabled: !s.enabled } : s)),
    }));
  };

  // Collage Photo Helpers
  const handleUpdatePhoto = (idx: number, updates: Partial<CollagePhotoItem>) => {
    setSettings((prev) => {
      const updatedPhotos = [...prev.images.collagePhotos];
      const existing = updatedPhotos[idx];
      if (existing) {
        updatedPhotos[idx] = { ...existing, ...updates } as CollagePhotoItem;
      }
      return {
        ...prev,
        images: { ...prev.images, collagePhotos: updatedPhotos },
      };
    });
  };

  // Hero Slide Helpers
  const handleAddHeroSlide = (src: string) => {
    if (!src.trim()) return;
    setSettings((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        heroSlides: [...prev.images.heroSlides, src.trim()],
      },
    }));
  };

  const handleRemoveHeroSlide = (slideIndex: number) => {
    setSettings((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        heroSlides: prev.images.heroSlides.filter((_, idx) => idx !== slideIndex),
      },
    }));
  };

  // Typing Phrase Helpers
  const handleAddTypingPhrase = () => {
    setSettings((prev) => ({
      ...prev,
      typing: {
        ...prev.typing,
        phrases: [...prev.typing.phrases, "New inspiring mission statement about BSGSS..."],
      },
    }));
  };

  const handleUpdateTypingPhrase = (idx: number, text: string) => {
    setSettings((prev) => {
      const updated = [...prev.typing.phrases];
      updated[idx] = text;
      return {
        ...prev,
        typing: { ...prev.typing, phrases: updated },
      };
    });
  };

  const handleRemoveTypingPhrase = (idx: number) => {
    if (settings.typing.phrases.length <= 1) return;
    setSettings((prev) => ({
      ...prev,
      typing: {
        ...prev.typing,
        phrases: prev.typing.phrases.filter((_, i) => i !== idx),
      },
    }));
  };

  // Save changes to API
  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/customize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setStatusMessage({ type: "success", text: "Homepage customization successfully published live!" });
      } else {
        setStatusMessage({ type: "error", text: data.message || "Failed to save settings." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  // Reset to defaults
  const handleReset = async () => {
    if (!window.confirm("Are you sure you want to reset homepage sections, photos, and music to defaults?")) {
      return;
    }

    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/customize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset: true }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setSettings(DEFAULT_CUSTOMIZER_SETTINGS);
        setStatusMessage({ type: "success", text: "Reset to default layout, sound, and imagery." });
      } else {
        setStatusMessage({ type: "error", text: data.message || "Failed to reset." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error occurred during reset." });
    } finally {
      setSaving(false);
    }
  };

  // Test ambient tone in admin
  const handleTestChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(293.66, ctx.currentTime); // D4 (Indian Sa)
      osc.frequency.exponentialRampToValueAtTime(440.0, ctx.currentTime + 0.3); // A4 (Pa)

      gain.gain.setValueAtTime(settings.audio.defaultVolume * 0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {}
  };

  return (
    <div className="space-y-4">
      {/* Single Compact Studio Header Bar with User Pill & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsStudioNavCollapsed(!isStudioNavCollapsed)}
            title={isStudioNavCollapsed ? "Show Studio Modules Menu" : "Collapse Menu (Full Screen)"}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-sand-50 text-ink-muted hover:text-ink hover:bg-sand-100 transition"
          >
            {isStudioNavCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-base sm:text-lg font-bold text-ink">
                Website Studio &amp; Customizer
              </h1>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                Live Studio
              </span>
            </div>
            <p className="text-[11px] text-ink-muted">
              Active Module: <strong className="text-brand-900">{CUSTOMIZER_MODULES.find((m) => m.id === activeTab)?.label}</strong>
            </p>
          </div>
        </div>

        {/* Right Side: Who is logged in + Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {admin && (
            <div className="hidden md:flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50/50 px-2.5 py-1 text-xs">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-brand-950">{admin.displayName || admin.email.split("@")[0]}</span>
              <span className="text-[10px] text-brand-700 uppercase font-semibold">({admin.role || "Admin"})</span>
            </div>
          )}

          <Link
            href="/admin/theme"
            className="inline-flex items-center gap-1 rounded-lg border border-line bg-sand-50 px-2.5 py-1.5 text-xs font-semibold text-ink-muted hover:text-ink hover:bg-sand-100 transition"
          >
            <span>Theme Studio</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-brand-850 hover:bg-brand-50 transition"
          >
            <span>Live Site</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>

          <button
            type="button"
            onClick={handleReset}
            disabled={saving}
            className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink-muted hover:text-red-700 hover:border-red-200 hover:bg-red-50 transition"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs transition hover:bg-brand-800 disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Save &amp; Publish</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Feedback Notification */}
      {statusMessage && (
        <div
          className={`flex items-center gap-2.5 rounded-xl border p-3.5 text-xs font-medium animate-fadeIn ${
            statusMessage.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          ) : (
            <HelpCircle className="h-4 w-4 text-red-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Studio Two-Pane Layout */}
      <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
        {/* Left Side Sub-Navigation Drawer / Module List */}
        {!isStudioNavCollapsed && (
          <aside className="w-full lg:w-64 shrink-0 rounded-xl border border-line bg-white p-2.5 shadow-2xs space-y-1">
            <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-line mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Studio Modules</span>
              <button
                type="button"
                onClick={() => setIsStudioNavCollapsed(true)}
                title="Collapse into full screen"
                className="text-ink-muted hover:text-ink text-[11px] font-semibold"
              >
                Hide ✕
              </button>
            </div>
            {CUSTOMIZER_MODULES.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold text-left transition",
                    active
                      ? "bg-brand-700 text-white shadow-2xs"
                      : "text-ink-muted hover:bg-sand-100 hover:text-ink"
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    <Icon className={cn("h-3.5 w-3.5 shrink-0", active ? "text-white" : "text-brand-700")} />
                    <span className="truncate">{tab.label}</span>
                  </span>
                  {tab.badge && (
                    <span
                      className={cn(
                        "text-[9px] font-bold px-1.5 py-0.2 rounded-full",
                        active ? "bg-white/20 text-white" : "bg-brand-50 text-brand-800 border border-brand-200"
                      )}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>
        )}

        {/* Right Side Main Content Workspace */}
        <div className="flex-1 min-w-0 w-full space-y-6">

      {/* Tab Content 1: Homepage Section Reordering & Visibility */}
      {activeTab === "sections" && (
        <div className="rounded-b-xl border border-t-0 border-line bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">
                Homepage Layout Flow &amp; Visibility
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-ink-muted">
                Move sections up or down to change the order they appear on the homepage. Use the eye toggle to show or hide any section.
              </p>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-800">
              {settings.sections.filter((s) => s.enabled).length} of {settings.sections.length} Sections Active
            </span>
          </div>

          <div className="space-y-2.5">
            {settings.sections.map((section, idx) => (
              <div
                key={section.id}
                className={`flex items-center justify-between rounded-xl border p-3.5 transition-all ${
                  section.enabled
                    ? "border-line bg-white shadow-2xs hover:border-brand-300"
                    : "border-dashed border-sand-300 bg-sand-50/70 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-sand-100 text-xs font-bold text-ink-muted">
                    {section.order}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-ink">{section.name}</span>
                      <span className="rounded-full bg-sand-100 px-2 py-0.2 text-[0.625rem] font-semibold uppercase text-ink-muted">
                        {section.category}
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted leading-tight mt-0.5">{section.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Reorder Up */}
                  <button
                    type="button"
                    onClick={() => handleMoveSection(idx, "up")}
                    disabled={idx === 0}
                    title="Move section up"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-muted transition hover:bg-sand-100 hover:text-ink disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>

                  {/* Reorder Down */}
                  <button
                    type="button"
                    onClick={() => handleMoveSection(idx, "down")}
                    disabled={idx === settings.sections.length - 1}
                    title="Move section down"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-muted transition hover:bg-sand-100 hover:text-ink disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>

                  {/* Toggle Visibility */}
                  <button
                    type="button"
                    onClick={() => handleToggleSection(section.id)}
                    title={section.enabled ? "Hide section from homepage" : "Show section on homepage"}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                      section.enabled
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "border-sand-300 bg-sand-100 text-ink-muted hover:bg-sand-200"
                    }`}
                  >
                    {section.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Video Archives & Field Documentaries */}
      {activeTab === "videos" && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                    <ListVideo className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    Public Video Archives &amp; Field Documentaries
                  </h3>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-ink-muted">
                  Add, reorder, feature, and manage videos displayed on the public{" "}
                  <Link href="/activities/videos" target="_blank" className="text-brand-700 underline font-semibold">
                    /activities/videos
                  </Link>{" "}
                  page. Add any YouTube video URL or ID (including national news broadcasts like DD News, CSR documentaries, and field camps).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/activities/videos"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sand-50 transition"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  View Public Video Page
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSettings((prev) => ({
                      ...prev,
                      videos: [...DEFAULT_CUSTOMIZER_SETTINGS.videos],
                    }));
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sand-50 transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset to Defaults
                </button>
              </div>
            </div>

            {/* Form: Add New Video */}
            <div className="mt-6 rounded-xl border border-line bg-sand-50/50 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-line/60 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-850">
                  + Add New Video by YouTube Link or Video ID
                </span>
                <span className="text-[11px] text-ink-muted">
                  Supports: youtu.be, youtube.com/watch?v=..., shorts, or raw 11-char ID
                </span>
              </div>

              {videoFetchError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-800">
                  {videoFetchError}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                    YouTube URL or Video ID <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex gap-2">
                    <input
                      type="text"
                      value={newVideoUrl}
                      onChange={(e) => {
                        setNewVideoUrl(e.target.value);
                        setVideoFetchError(null);
                      }}
                      onBlur={() => {
                        if (newVideoUrl.trim() && !newVideoTitle) {
                          handleFetchVideoInfo(newVideoUrl.trim());
                        }
                      }}
                      placeholder="e.g. https://youtu.be/W9Eou84OxXM?si=UK2R0uwip96olM5f or W9Eou84OxXM"
                      className="flex-1 rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink placeholder:text-ink-muted/50 focus:border-brand-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleFetchVideoInfo()}
                      disabled={fetchingVideoInfo || !newVideoUrl.trim()}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-ink hover:bg-sand-100 disabled:opacity-50 transition"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${fetchingVideoInfo ? "animate-spin" : ""}`} />
                      <span>{fetchingVideoInfo ? "Fetching..." : "Fetch Info"}</span>
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-ink-muted">
                    Paste any YouTube link and click &ldquo;Fetch Info&rdquo; to automatically retrieve the exact title and thumbnail.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Category Tag
                  </label>
                  <select
                    value={newVideoCategory}
                    onChange={(e) => setNewVideoCategory(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Healthcare Camp &amp; News Coverage">Healthcare Camp &amp; News Coverage</option>
                    <option value="Healthcare &amp; Oncology">Healthcare &amp; Oncology</option>
                    <option value="Swachhata &amp; Sanitation">Swachhata &amp; Sanitation</option>
                    <option value="Livelihood &amp; Micro-Credit">Livelihood &amp; Micro-Credit</option>
                    <option value="Women Empowerment &amp; SHG">Women Empowerment &amp; SHG</option>
                    <option value="Skill Training &amp; Tailoring">Skill Training &amp; Tailoring</option>
                    <option value="DD News &amp; Media Coverage">DD News &amp; Media Coverage</option>
                    <option value="CSR Partner Alliance">CSR Partner Alliance</option>
                    <option value="Rural Community Drive">Rural Community Drive</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Video Title (Displayed on Public Page) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    placeholder="e.g. खोड़ा कॉलोनी के आदर्श नगर में निःशुल्क स्वास्थ्य जांच शिविर | DD News"
                    className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink placeholder:text-ink-muted/50 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Source / Producer
                  </label>
                  <input
                    type="text"
                    value={newVideoPublished}
                    onChange={(e) => setNewVideoPublished(e.target.value)}
                    placeholder="e.g. DD News, BPCL Jan Arogyam, RITES Van"
                    className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink placeholder:text-ink-muted/50 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-ink">
                  <input
                    type="checkbox"
                    checked={newVideoFeatured}
                    onChange={(e) => setNewVideoFeatured(e.target.checked)}
                    className="h-4 w-4 rounded accent-brand-700"
                  />
                  <span>Pin as Featured Documentary (Highlighted at Top)</span>
                </label>

                <button
                  type="button"
                  onClick={handleAddVideo}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-brand-800 transition"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Video to Public Archives</span>
                </button>
              </div>
            </div>

            {/* List of Videos */}
            <div className="mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-sm font-bold text-ink">
                    Active Video Catalog ({(settings.videos || []).length} videos)
                  </h4>
                  <span className="rounded-full bg-sand-200 px-2 py-0.5 text-[10px] font-bold text-ink">
                    {(settings.videos || []).filter((v) => v.enabled !== false).length} Visible
                  </span>
                </div>
                <p className="text-[11px] text-ink-muted">
                  Videos at the top appear first on the public video theater &amp; playlist.
                </p>
              </div>

              <div className="space-y-3">
                {(settings.videos || []).map((video, idx) => {
                  const isVisible = video.enabled !== false;
                  return (
                    <div
                      key={video.id + idx}
                      className={`rounded-xl border p-4 transition-all ${
                        isVisible
                          ? "border-line bg-white shadow-2xs"
                          : "border-sand-300 bg-sand-100/50 opacity-60"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Left: Reorder + Thumbnail + Metadata */}
                        <div className="flex items-start sm:items-center gap-3 min-w-0">
                          {/* Order buttons */}
                          <div className="flex flex-col gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleMoveVideo(idx, "up")}
                              disabled={idx === 0}
                              className="rounded p-1 text-ink-muted hover:bg-sand-100 disabled:opacity-30 transition"
                              title="Move Up"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveVideo(idx, "down")}
                              disabled={idx === (settings.videos || []).length - 1}
                              className="rounded p-1 text-ink-muted hover:bg-sand-100 disabled:opacity-30 transition"
                              title="Move Down"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* Thumbnail with quick preview trigger */}
                          <div className="relative aspect-video w-24 sm:w-28 shrink-0 overflow-hidden rounded-lg bg-slate-900 border border-line">
                            <img
                              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                              alt={video.title}
                              className="h-full w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setPreviewVideoId(video.id)}
                              className="absolute inset-0 grid place-items-center bg-black/30 hover:bg-black/50 text-white transition"
                              title="Preview player"
                            >
                              <Play className="h-4 w-4 fill-current" />
                            </button>
                          </div>

                          {/* Titles & Info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[11px] font-bold text-brand-700">
                                #{String(idx + 1).padStart(2, "0")}
                              </span>
                              {video.category && (
                                <span className="rounded bg-sand-100 px-1.5 py-0.5 text-[10px] font-semibold text-brand-800">
                                  {video.category}
                                </span>
                              )}
                              {video.featured && (
                                <span className="rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                                  ★ Featured
                                </span>
                              )}
                              <span
                                className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                                  isVisible
                                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                    : "bg-sand-200 text-ink-muted"
                                }`}
                              >
                                {isVisible ? "Live on site" : "Hidden"}
                              </span>
                            </div>

                            <input
                              type="text"
                              value={video.title}
                              onChange={(e) => handleUpdateVideo(video.id, { title: e.target.value })}
                              className="mt-1 w-full rounded border border-transparent hover:border-line focus:border-brand-500 bg-transparent px-1.5 py-0.5 text-xs font-bold text-ink focus:bg-white focus:outline-none"
                            />

                            <div className="mt-0.5 flex flex-wrap items-center gap-3 text-[11px] text-ink-muted">
                              <span>ID: <code className="font-mono text-ink">{video.id}</code></span>
                              {video.publishedAt && <span>Source: {video.publishedAt}</span>}
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            type="button"
                            onClick={() => handleToggleVideoFeatured(video.id)}
                            className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
                              video.featured
                                ? "border-amber-300 bg-amber-50 text-amber-900"
                                : "border-line bg-white text-ink hover:bg-sand-50"
                            }`}
                            title={video.featured ? "Unpin featured" : "Pin as featured"}
                          >
                            <Star className={`h-3.5 w-3.5 ${video.featured ? "fill-current" : ""}`} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setPreviewVideoId(video.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink hover:bg-sand-50 transition"
                            title="Preview video"
                          >
                            <Play className="h-3 w-3 fill-current" />
                            <span>Preview</span>
                          </button>

                          <a
                            href={`https://www.youtube.com/watch?v=${video.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink hover:bg-sand-50 transition"
                            title="Watch on YouTube"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
                            <span className="hidden sm:inline">YouTube</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleToggleVideo(video.id)}
                            className="rounded-lg border border-line bg-white p-2 text-ink hover:bg-sand-50 transition"
                            title={isVisible ? "Hide video" : "Show video"}
                          >
                            {isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5 text-ink-muted" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteVideo(video.id)}
                            className="rounded-lg border border-line bg-white p-2 text-red-600 hover:bg-red-50 hover:border-red-200 transition"
                            title="Delete video"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Preview of Playlist */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-2xs">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <h4 className="font-display text-sm font-bold text-ink">
                  Live Public Playlist Preview
                </h4>
                <p className="text-xs text-ink-muted">
                  How the playlist order appears to visitors on{" "}
                  <code className="text-brand-700">/activities/videos</code>
                </p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-800">
                {(settings.videos || []).filter((v) => v.enabled !== false).length} Videos Live
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(settings.videos || [])
                .filter((v) => v.enabled !== false)
                .slice(0, 6)
                .map((video, idx) => (
                  <div
                    key={video.id}
                    className="flex items-start gap-3 rounded-xl border border-line bg-sand-50/40 p-3"
                  >
                    <div className="relative aspect-video w-20 shrink-0 overflow-hidden rounded-md bg-slate-900">
                      <img
                        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-700">
                        Video {String(idx + 1).padStart(2, "0")} {video.featured ? "· Featured" : ""}
                      </span>
                      <p className="mt-0.5 line-clamp-2 text-xs font-bold text-ink leading-snug">
                        {video.title}
                      </p>
                      {video.category && (
                        <p className="mt-1 text-[10px] text-ink-muted">{video.category}</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Video Preview Modal */}
          {previewVideoId && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xs"
              onClick={() => setPreviewVideoId(null)}
            >
              <div
                className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white">
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 fill-current text-red-500" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      YouTube Field Video Preview ({previewVideoId})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewVideoId(null)}
                    className="rounded-lg bg-slate-800 p-1.5 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                  >
                    ✕
                  </button>
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${previewVideoId}?autoplay=1&rel=0`}
                    title="Video Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Donation Acknowledgement Certificate Studio */}
      {activeTab === "certificate" && (
        <div className="rounded-xl border border-line bg-white p-4 sm:p-6 shadow-2xs space-y-6">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-line">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-850 text-white">
                  <Award className="h-4 w-4" />
                </span>
                <h2 className="font-display text-lg font-bold text-ink">
                  Donation Certificate Design &amp; Template Studio
                </h2>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                  Live Interactive Editor
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-muted">
                Live interactive designer for certificate header, statutory seal, authorized handwritten signature, and sequential numbering.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/admin/donations"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-sand-50 px-3 py-1.5 text-xs font-semibold text-ink-muted hover:border-brand-500 hover:text-brand-800 transition"
              >
                Manage Donors &amp; Verify
              </Link>
              <Link
                href="/support"
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-muted hover:border-brand-500 hover:text-brand-800 transition"
              >
                Public Support Page <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Side-by-Side Split Studio: Left = Editing Controls, Right = Live Rendered Certificate */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Left Column (Inputs & Controls) */}
            <div className="xl:col-span-6 space-y-5">
              {/* SECTION 1: HEADER & LEGAL CREDENTIALS (Addresses user's uploaded image directly) */}
              <div
                onFocus={() => setActiveCertSection("header")}
                className="rounded-xl border border-line bg-sand-50/40 p-4 space-y-3.5 shadow-2xs"
              >
                <div className="flex items-center justify-between border-b border-line/80 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-900 flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-brand-700" />
                    1. Certificate Header &amp; Legal Identity
                  </h3>
                  <span className="text-[10px] text-ink-muted">Rendered at top of certificate</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Organization Full Name</label>
                  <input
                    type="text"
                    value={settings.certificate?.organizationName || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        certificate: {
                          ...settings.certificate,
                          organizationName: e.target.value,
                        },
                      })
                    }
                    placeholder="Bisnouli Sarvodaya Gramodyog Sewa Sansthan"
                    className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-ink outline-none transition focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Societies Registration Act Text</label>
                  <input
                    type="text"
                    value={settings.certificate?.legalRegText || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        certificate: {
                          ...settings.certificate,
                          legalRegText: e.target.value,
                        },
                      })
                    }
                    placeholder="Registered under the Societies Registration Act XXI of 1860 (Registration No. S-26792/1994)"
                    className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink">NITI Aayog NGO Darpan ID</label>
                    <input
                      type="text"
                      value={settings.certificate?.darpanId || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          certificate: {
                            ...settings.certificate,
                            darpanId: e.target.value,
                          },
                        })
                      }
                      placeholder="DL/2016/0111645"
                      className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">Tax Exemptions Label</label>
                    <input
                      type="text"
                      value={settings.certificate?.exemptionsText || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          certificate: {
                            ...settings.certificate,
                            exemptionsText: e.target.value,
                          },
                        })
                      }
                      placeholder="Tax Exemptions under 12A & 80G"
                      className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Head Office Address &amp; Contact String</label>
                  <input
                    type="text"
                    value={settings.certificate?.officeAddressText || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        certificate: {
                          ...settings.certificate,
                          officeAddressText: e.target.value,
                        },
                      })
                    }
                    placeholder="Head Office: B-180, Sector–31, Noida – 201301, U.P. | Tel: 011-46548002/03 | bsgssindia@yahoo.co.in"
                    className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Official Logo Image URL</label>
                  <input
                    type="text"
                    value={settings.certificate?.logoUrl || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        certificate: {
                          ...settings.certificate,
                          logoUrl: e.target.value,
                        },
                      })
                    }
                    placeholder="/images/bsgss/branding/581-logo-4.png"
                    className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs text-ink outline-none transition focus:border-brand-600"
                  />
                </div>
              </div>

              {/* SECTION 2: COLORS & TYPOGRAPHY */}
              <div
                onFocus={() => setActiveCertSection("appearance")}
                className="rounded-xl border border-line bg-sand-50/40 p-4 space-y-3.5 shadow-2xs"
              >
                <div className="flex items-center justify-between border-b border-line/80 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-900 flex items-center gap-1.5">
                    <Palette className="h-4 w-4 text-brand-700" />
                    2. Certificate Frame Color &amp; Typography
                  </h3>
                  <span className="text-[10px] text-ink-muted">Accent, filigree &amp; font styling</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">Theme Palette</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: "navy", name: "Classic Navy & Teal", badge: "bg-cyan-900" },
                      { id: "emerald", name: "Forest Emerald", badge: "bg-emerald-800" },
                      { id: "gold", name: "Royal Amber Gold", badge: "bg-amber-700" },
                      { id: "burgundy", name: "Regal Maroon", badge: "bg-rose-900" },
                      { id: "slate", name: "Executive Slate", badge: "bg-slate-800" },
                    ].map((pal) => (
                      <div
                        key={pal.id}
                        onClick={() =>
                          setSettings({
                            ...settings,
                            certificate: {
                              ...settings.certificate,
                              themeColor: pal.id as any,
                            },
                          })
                        }
                        className={`cursor-pointer rounded-lg border p-2 transition ${
                          settings.certificate?.themeColor === pal.id
                            ? "border-brand-700 bg-brand-50/70 ring-2 ring-brand-700/20"
                            : "border-line bg-white hover:border-sand-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`h-3.5 w-3.5 rounded-full ${pal.badge} shadow-xs border border-white`} />
                          <p className="font-semibold text-xs text-ink">{pal.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">Typography Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "formal", name: "Formal Serif", cls: "font-serif" },
                      { id: "sans", name: "Clean Sans", cls: "font-sans" },
                      { id: "serif", name: "Traditional", cls: "font-serif" },
                    ].map((fnt) => (
                      <div
                        key={fnt.id}
                        onClick={() =>
                          setSettings({
                            ...settings,
                            certificate: {
                              ...settings.certificate,
                              fontFamily: fnt.id as any,
                            },
                          })
                        }
                        className={`cursor-pointer rounded-lg border p-2 text-center transition ${
                          settings.certificate?.fontFamily === fnt.id
                            ? "border-brand-700 bg-brand-50/70 ring-2 ring-brand-700/20"
                            : "border-line bg-white hover:border-sand-300"
                        }`}
                      >
                        <p className={`text-xs font-bold text-ink ${fnt.cls}`}>{fnt.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 3: SIGNATORY & SIGNATURE */}
              <div
                onFocus={() => setActiveCertSection("signatory")}
                className="rounded-xl border border-line bg-sand-50/40 p-4 space-y-3.5 shadow-2xs"
              >
                <div className="flex items-center justify-between border-b border-line/80 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-900 flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-brand-700" />
                    3. Authorized Signatory &amp; Handwritten Signature
                  </h3>
                  <span className="text-[10px] text-ink-muted">Bottom-right signature</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink">Signatory Full Name</label>
                    <input
                      type="text"
                      value={settings.certificate?.signatoryName || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          certificate: {
                            ...settings.certificate,
                            signatoryName: e.target.value,
                          },
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">Designation / Role Title</label>
                    <input
                      type="text"
                      value={settings.certificate?.signatoryRole || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          certificate: {
                            ...settings.certificate,
                            signatoryRole: e.target.value,
                          },
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Custom Signature Image URL (Optional)</label>
                  <input
                    type="text"
                    value={settings.certificate?.signatureUrl || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        certificate: {
                          ...settings.certificate,
                          signatureUrl: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. /images/signatures/nandita-bakshi.png or https://..."
                    className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs text-ink outline-none transition focus:border-brand-600"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showDefaultSignatureSvg_interactive"
                    checked={settings.certificate?.showDefaultSignatureSvg !== false}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        certificate: {
                          ...settings.certificate,
                          showDefaultSignatureSvg: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-line text-brand-700"
                  />
                  <label htmlFor="showDefaultSignatureSvg_interactive" className="text-xs font-medium text-ink cursor-pointer">
                    Display authentic blue-ink cursive SVG signature if no custom image is provided
                  </label>
                </div>
              </div>

              {/* SECTION 4: STATUTORY SEAL / RUBBER STAMP */}
              <div
                onFocus={() => setActiveCertSection("seal")}
                className="rounded-xl border border-line bg-sand-50/40 p-4 space-y-3.5 shadow-2xs"
              >
                <div className="flex items-center justify-between border-b border-line/80 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-900 flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-brand-700" />
                    4. Statutory Seal &amp; Stamp
                  </h3>
                  <span className="text-[10px] text-ink-muted">Bottom-left circular seal</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Seal Circular Rim Text</label>
                  <input
                    type="text"
                    value={settings.certificate?.sealTitle || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        certificate: {
                          ...settings.certificate,
                          sealTitle: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs uppercase font-medium text-ink outline-none transition focus:border-brand-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-ink">Estd. Text</label>
                    <input
                      type="text"
                      value={settings.certificate?.sealEstd || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          certificate: {
                            ...settings.certificate,
                            sealEstd: e.target.value,
                          },
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">Registration Badge</label>
                    <input
                      type="text"
                      value={settings.certificate?.sealRegNo || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          certificate: {
                            ...settings.certificate,
                            sealRegNo: e.target.value,
                          },
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">Tax Badges</label>
                    <input
                      type="text"
                      value={settings.certificate?.sealBadges || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          certificate: {
                            ...settings.certificate,
                            sealBadges: e.target.value,
                          },
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Custom Scanned Rubber Stamp Image URL (Optional)</label>
                  <input
                    type="text"
                    value={settings.certificate?.stampUrl || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        certificate: {
                          ...settings.certificate,
                          stampUrl: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. /images/stamps/bsgss-seal.png or https://..."
                    className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs text-ink outline-none transition focus:border-brand-600"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showDefaultSealSvg_interactive"
                    checked={settings.certificate?.showDefaultSealSvg !== false}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        certificate: {
                          ...settings.certificate,
                          showDefaultSealSvg: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-line text-brand-700"
                  />
                  <label htmlFor="showDefaultSealSvg_interactive" className="text-xs font-medium text-ink cursor-pointer">
                    Render authentic rosette circular seal SVG if no custom rubber stamp image is provided
                  </label>
                </div>
              </div>

              {/* SECTION 5: SEQUENTIAL NUMBERING */}
              <div
                onFocus={() => setActiveCertSection("numbering")}
                className="rounded-xl border border-line bg-sand-50/40 p-4 space-y-3.5 shadow-2xs"
              >
                <div className="flex items-center justify-between border-b border-line/80 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-900 flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-brand-700" />
                    5. Sequential Receipt Numbering Scheme
                  </h3>
                  <span className="text-[10px] text-ink-muted">Automatic generation order</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: "number-only", title: "Number Only", example: "1, 2, 3...", desc: "Natural counter" },
                    { id: "prefix-number", title: "Prefix + Natural", example: "BSGSS-2026-1", desc: "Unpadded" },
                    { id: "prefix-padded", title: "Prefix + Padded", example: "BSGSS-2026-0001", desc: "Zero-padded" },
                  ].map((fmt) => (
                    <div
                      key={fmt.id}
                      onClick={() =>
                        setSettings({
                          ...settings,
                          certificate: {
                            ...settings.certificate,
                            serialFormat: fmt.id as any,
                          },
                        })
                      }
                      className={`cursor-pointer rounded-lg border p-2 transition ${
                        settings.certificate?.serialFormat === fmt.id
                          ? "border-brand-700 bg-brand-50/70 ring-2 ring-brand-700/20"
                          : "border-line bg-white hover:border-sand-300"
                      }`}
                    >
                      <p className="font-semibold text-xs text-ink">{fmt.title}</p>
                      <p className="mt-0.5 font-mono text-xs font-bold text-brand-850">{fmt.example}</p>
                    </div>
                  ))}
                </div>

                {settings.certificate?.serialFormat !== "number-only" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-ink">Receipt Prefix String</label>
                      <input
                        type="text"
                        value={settings.certificate?.serialPrefix || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            certificate: {
                              ...settings.certificate,
                              serialPrefix: e.target.value,
                            },
                          })
                        }
                        placeholder="e.g. BSGSS-2026-"
                        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs text-ink outline-none transition focus:border-brand-600"
                      />
                    </div>

                    {settings.certificate?.serialFormat === "prefix-padded" && (
                      <div>
                        <label className="block text-xs font-semibold text-ink">Zero-Padding Digits</label>
                        <input
                          type="number"
                          min={1}
                          max={8}
                          value={settings.certificate?.serialPadding || 4}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              certificate: {
                                ...settings.certificate,
                                serialPadding: Number(e.target.value) || 4,
                              },
                            })
                          }
                          className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* SECTION 6: TITLES & CITATION WORDING */}
              <div
                onFocus={() => setActiveCertSection("wording")}
                className="rounded-xl border border-line bg-sand-50/40 p-4 space-y-3.5 shadow-2xs"
              >
                <div className="flex items-center justify-between border-b border-line/80 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-900 flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-brand-700" />
                    6. Certificate Titles &amp; Citation Copy
                  </h3>
                  <span className="text-[10px] text-ink-muted">Headings and body description</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink">Certificate Title</label>
                    <input
                      type="text"
                      value={settings.certificate?.certificateTitle || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          certificate: {
                            ...settings.certificate,
                            certificateTitle: e.target.value,
                          },
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs uppercase font-bold text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">Subtitle Ribbon</label>
                    <input
                      type="text"
                      value={settings.certificate?.certificateSubtitle || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          certificate: {
                            ...settings.certificate,
                            certificateSubtitle: e.target.value,
                          },
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs italic text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Appreciation Intro Line</label>
                  <textarea
                    rows={2}
                    value={settings.certificate?.appreciationText || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        certificate: {
                          ...settings.certificate,
                          appreciationText: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-line bg-white p-2.5 text-xs text-ink outline-none transition focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Default Social Welfare Cause Text</label>
                  <textarea
                    rows={2}
                    value={settings.certificate?.causeText || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        certificate: {
                          ...settings.certificate,
                          causeText: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-line bg-white p-2.5 text-xs text-ink outline-none transition focus:border-brand-600"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Live Rendered Certificate Preview */}
            <div className="xl:col-span-6 xl:sticky xl:top-4 space-y-3">
              {/* Preview Controller Bar */}
              <div className="rounded-xl border border-brand-200 bg-sand-50/90 p-3 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4 text-brand-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-900">
                      Live Rendered Certificate Preview
                    </span>
                  </div>
                  <span className="rounded-md bg-brand-100 text-brand-900 font-bold px-2 py-0.5 text-[10px]">
                    A4 Landscape Live
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-brand-200/60">
                  <span className="text-[11px] font-semibold text-ink-muted">Test Recipient:</span>
                  <input
                    type="text"
                    value={sampleDonor}
                    onChange={(e) => setSampleDonor(e.target.value)}
                    className="rounded border border-line bg-white px-2 py-1 text-xs font-medium text-ink w-36 outline-none focus:border-brand-600"
                  />
                  <span className="text-[11px] font-semibold text-ink-muted">Amount:</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSampleAmount(1000)}
                      className={`px-1.5 py-0.5 text-[10px] font-bold rounded border ${sampleAmount === 1000 ? "bg-brand-700 text-white border-brand-700" : "bg-white text-ink-muted border-line"}`}
                    >
                      ₹1k
                    </button>
                    <button
                      type="button"
                      onClick={() => setSampleAmount(10000)}
                      className={`px-1.5 py-0.5 text-[10px] font-bold rounded border ${sampleAmount === 10000 ? "bg-brand-700 text-white border-brand-700" : "bg-white text-ink-muted border-line"}`}
                    >
                      ₹10k
                    </button>
                    <button
                      type="button"
                      onClick={() => setSampleAmount(20000)}
                      className={`px-1.5 py-0.5 text-[10px] font-bold rounded border ${sampleAmount === 20000 ? "bg-brand-700 text-white border-brand-700" : "bg-white text-ink-muted border-line"}`}
                    >
                      ₹20k
                    </button>
                  </div>
                </div>
              </div>

              {/* The Live Rendered Certificate */}
              <div className="rounded-xl border border-line p-1.5 bg-sand-100/40 shadow-inner">
                <RenderedCertificatePreview
                  config={settings.certificate}
                  sampleDonorName={sampleDonor}
                  sampleAmount={sampleAmount}
                  activeFocusSection={activeCertSection}
                />
              </div>

              <p className="text-[11px] text-center text-ink-muted italic">
                Rendered preview above synchronizes instantly with any changes made in the inputs. Click &ldquo;Save &amp; Publish&rdquo; in the top bar to apply live to all certificates.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Website Texts & Editorial Copy */}
      {activeTab === "texts" && (
        <div className="rounded-b-xl border border-t-0 border-line bg-white p-6 shadow-sm space-y-8">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">
              Website Texts, Headlines &amp; Editorial Copy
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-ink-muted">
              Centrally manage and customize all headlines, narrative paragraphs, and highlight copy across the website. Changes update live upon saving.
            </p>
          </div>

          {/* 0. Hero Section Copy */}
          <div className="rounded-xl border border-brand-200/80 bg-sand-50/50 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-200/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                1. Homepage Hero Section &amp; Main Headline
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Live Above Fold
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Badge / Top Rail Eyebrow
                </label>
                <input
                  type="text"
                  value={settings.texts?.hero?.badge ?? "Established in 1994 · 30+ Years of Public Service"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        hero: {
                          ...DEFAULT_CUSTOMIZER_SETTINGS.texts.hero,
                          ...(prev.texts?.hero || {}),
                          badge: e.target.value,
                        },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  placeholder="Established in 1994 · 30+ Years of Public Service"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Section Subheading / Eyebrow
                </label>
                <input
                  type="text"
                  value={settings.texts?.hero?.eyebrow ?? "Grassroots Community Development"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        hero: {
                          ...DEFAULT_CUSTOMIZER_SETTINGS.texts.hero,
                          ...(prev.texts?.hero || {}),
                          eyebrow: e.target.value,
                        },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  placeholder="Grassroots Community Development"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Primary Main Headline
              </label>
              <input
                type="text"
                value={settings.texts?.hero?.title ?? "Empowering communities through sustainable grassroots action."}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    texts: {
                      ...prev.texts,
                      hero: {
                        ...DEFAULT_CUSTOMIZER_SETTINGS.texts.hero,
                        ...(prev.texts?.hero || {}),
                        title: e.target.value,
                      },
                    },
                  }))
                }
                className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink font-semibold focus:border-brand-500 focus:outline-none"
                placeholder="Empowering communities through sustainable grassroots action."
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Main Hero Narrative (Lead Copy)
              </label>
              <textarea
                rows={3}
                value={settings.texts?.hero?.text ?? "Bisnouli Sarvodaya Gramodyog Sewa Sansthan works across education, healthcare, vocational training, and women's empowerment to build self-reliant communities across India."}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    texts: {
                      ...prev.texts,
                      hero: {
                        ...DEFAULT_CUSTOMIZER_SETTINGS.texts.hero,
                        ...(prev.texts?.hero || {}),
                        text: e.target.value,
                      },
                    },
                  }))
                }
                className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs sm:text-sm text-ink leading-relaxed focus:border-brand-500 focus:outline-none"
                placeholder="Bisnouli Sarvodaya Gramodyog Sewa Sansthan works across..."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-brand-200/50">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Primary Button Text (CTA)
                </label>
                <input
                  type="text"
                  value={settings.texts?.hero?.supportCta ?? "Support Our Work"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        hero: {
                          ...DEFAULT_CUSTOMIZER_SETTINGS.texts.hero,
                          ...(prev.texts?.hero || {}),
                          supportCta: e.target.value,
                        },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  placeholder="Support Our Work"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Secondary Button Text (CTA)
                </label>
                <input
                  type="text"
                  value={settings.texts?.hero?.aboutCta ?? "Explore Our Story"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        hero: {
                          ...DEFAULT_CUSTOMIZER_SETTINGS.texts.hero,
                          ...(prev.texts?.hero || {}),
                          aboutCta: e.target.value,
                        },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  placeholder="Explore Our Story"
                />
              </div>
            </div>
          </div>

          {/* 0.1 Impact Counters & Key Numbers */}
          <div className="rounded-xl border border-brand-200/80 bg-sand-50/50 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-200/60 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                  2. Impact Metric Counters (Homepage Hero Rail)
                </span>
                <p className="text-[11px] text-ink-muted mt-0.5">
                  Live verified statistics displayed directly below the hero banner (e.g., 50 Lac +, 20 Lac +, 36,000 +).
                </p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                6 Verified Cards
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(settings.impactMetrics || DEFAULT_CUSTOMIZER_SETTINGS.impactMetrics).map((metric, idx) => (
                <div key={idx} className="rounded-lg border border-line bg-white p-3.5 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                      Card #{idx + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                        Number / Value
                      </label>
                      <input
                        type="text"
                        value={metric.target}
                        onChange={(e) => {
                          const updated = [...(settings.impactMetrics || DEFAULT_CUSTOMIZER_SETTINGS.impactMetrics)];
                          const numVal = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10) || 0;
                          updated[idx] = { ...updated[idx]!, target: numVal };
                          setSettings((prev) => ({ ...prev, impactMetrics: updated }));
                        }}
                        className="mt-1 w-full rounded border border-line bg-white px-2 py-1.5 text-xs font-bold text-ink focus:border-brand-500 focus:outline-none"
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                        Unit / Suffix
                      </label>
                      <input
                        type="text"
                        value={metric.suffix}
                        onChange={(e) => {
                          const updated = [...(settings.impactMetrics || DEFAULT_CUSTOMIZER_SETTINGS.impactMetrics)];
                          updated[idx] = { ...updated[idx]!, suffix: e.target.value };
                          setSettings((prev) => ({ ...prev, impactMetrics: updated }));
                        }}
                        className="mt-1 w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand-500 focus:outline-none"
                        placeholder="Lac +"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                      Primary Label
                    </label>
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => {
                        const updated = [...(settings.impactMetrics || DEFAULT_CUSTOMIZER_SETTINGS.impactMetrics)];
                        updated[idx] = { ...updated[idx]!, label: e.target.value };
                        setSettings((prev) => ({ ...prev, impactMetrics: updated }));
                      }}
                      className="mt-1 w-full rounded border border-line bg-white px-2 py-1.5 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                      placeholder="Beneficiaries Empowered"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                      Sublabel / Description
                    </label>
                    <input
                      type="text"
                      value={metric.sublabel}
                      onChange={(e) => {
                        const updated = [...(settings.impactMetrics || DEFAULT_CUSTOMIZER_SETTINGS.impactMetrics)];
                        updated[idx] = { ...updated[idx]!, sublabel: e.target.value };
                        setSettings((prev) => ({ ...prev, impactMetrics: updated }));
                      }}
                      className="mt-1 w-full rounded border border-line bg-white px-2 py-1.5 text-[11px] text-ink-muted focus:border-brand-500 focus:outline-none"
                      placeholder="Across all program areas"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 1. About Us Section Copy */}
          <div className="rounded-xl border border-brand-200/80 bg-sand-50/50 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-200/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                3. About Us Section (Homepage)
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Live on Homepage
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Badge / Eyebrow
                </label>
                <input
                  type="text"
                  value={settings.texts?.about?.eyebrow ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        about: { ...prev.texts.about, eyebrow: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  placeholder="About us"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Primary Headline
                </label>
                <input
                  type="text"
                  value={settings.texts?.about?.title ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        about: { ...prev.texts.about, title: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink font-semibold focus:border-brand-500 focus:outline-none"
                  placeholder="A practical commitment to dignity and self-reliance."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Narrative Paragraph (High-Visibility Lead Text)
              </label>
              <textarea
                rows={3}
                value={settings.texts?.about?.text ?? ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    texts: {
                      ...prev.texts,
                      about: { ...prev.texts.about, text: e.target.value },
                    },
                  }))
                }
                className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs sm:text-sm text-ink leading-relaxed focus:border-brand-500 focus:outline-none"
                placeholder="Founded in Bisnouli village..."
              />
            </div>

            {/* 4 About Highlights */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                4 Institutional Highlights (Displayed Borderless Under About Narrative)
              </label>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {(settings.texts?.about?.highlights || []).map((h, hIdx) => (
                  <div key={hIdx} className="rounded-lg border border-line bg-white p-3 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-brand-700">
                      HIGHLIGHT 0{hIdx + 1}
                    </span>
                    <input
                      type="text"
                      value={h.title}
                      onChange={(e) => {
                        const updated = [...(settings.texts?.about?.highlights || [])];
                        const currentItem = updated[hIdx];
                        updated[hIdx] = {
                          title: e.target.value,
                          desc: currentItem?.desc || "",
                        };
                        setSettings((prev) => ({
                          ...prev,
                          texts: {
                            ...prev.texts,
                            about: { ...prev.texts.about, highlights: updated },
                          },
                        }));
                      }}
                      className="w-full rounded border border-line px-2 py-1 text-xs font-bold text-ink focus:border-brand-500 focus:outline-none"
                      placeholder="Title"
                    />
                    <textarea
                      rows={2}
                      value={h.desc}
                      onChange={(e) => {
                        const updated = [...(settings.texts?.about?.highlights || [])];
                        const currentItem = updated[hIdx];
                        updated[hIdx] = {
                          title: currentItem?.title || "",
                          desc: e.target.value,
                        };
                        setSettings((prev) => ({
                          ...prev,
                          texts: {
                            ...prev.texts,
                            about: { ...prev.texts.about, highlights: updated },
                          },
                        }));
                      }}
                      className="w-full rounded border border-line px-2 py-1 text-[11px] text-ink-muted focus:border-brand-500 focus:outline-none"
                      placeholder="Description"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Key Programmes Section Copy */}
          <div className="rounded-xl border border-brand-200/80 bg-sand-50/50 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-200/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                2. Key Development Programmes
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Badge / Eyebrow
                </label>
                <input
                  type="text"
                  value={settings.texts?.programmes?.eyebrow ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        programmes: { ...prev.texts.programmes, eyebrow: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  placeholder="Our key programmes"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Primary Headline
                </label>
                <input
                  type="text"
                  value={settings.texts?.programmes?.title ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        programmes: { ...prev.texts.programmes, title: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink font-semibold focus:border-brand-500 focus:outline-none"
                  placeholder="Development that meets people where they are."
                />
              </div>
            </div>
          </div>

          {/* 3. Government Programmes Copy */}
          <div className="rounded-xl border border-brand-200/80 bg-sand-50/50 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-200/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                3. State &amp; Central Government Initiatives
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Left Column Eyebrow
                </label>
                <input
                  type="text"
                  value={settings.texts?.government?.eyebrow ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        government: { ...prev.texts.government, eyebrow: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Left Column Headline
                </label>
                <input
                  type="text"
                  value={settings.texts?.government?.title ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        government: { ...prev.texts.government, title: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink font-semibold focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Left Column Narrative
                </label>
                <textarea
                  rows={2}
                  value={settings.texts?.government?.text ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        government: { ...prev.texts.government, text: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Left Column CTA Button Text
                </label>
                <input
                  type="text"
                  value={settings.texts?.government?.cta ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        government: { ...prev.texts.government, cta: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="border-t border-brand-200/60 pt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Right Column Eyebrow
                </label>
                <input
                  type="text"
                  value={settings.texts?.government?.overviewEyebrow ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        government: { ...prev.texts.government, overviewEyebrow: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Right Column Headline
                </label>
                <input
                  type="text"
                  value={settings.texts?.government?.overviewTitle ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        government: { ...prev.texts.government, overviewTitle: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink font-semibold focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Right Column Overview Text
              </label>
              <textarea
                rows={2}
                value={settings.texts?.government?.overviewText ?? ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    texts: {
                      ...prev.texts,
                      government: { ...prev.texts.government, overviewText: e.target.value },
                    },
                  }))
                }
                className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* 4. CSR Alliances Copy */}
          <div className="rounded-xl border border-brand-200/80 bg-sand-50/50 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-200/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                4. CSR Partnerships &amp; Alliances
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Badge / Eyebrow
                </label>
                <input
                  type="text"
                  value={settings.texts?.partners?.eyebrow ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        partners: { ...prev.texts.partners, eyebrow: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  placeholder="Institutional CSR Alliances"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Primary Headline
                </label>
                <input
                  type="text"
                  value={settings.texts?.partners?.title ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        partners: { ...prev.texts.partners, title: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink font-semibold focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Narrative Description
              </label>
              <textarea
                rows={2}
                value={settings.texts?.partners?.description ?? ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    texts: {
                      ...prev.texts,
                      partners: { ...prev.texts.partners, description: e.target.value },
                    },
                  }))
                }
                className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
              />
            </div>

            {/* 3 Partner Stats */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                3 Stats Highlights
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                {(settings.texts?.partners?.stats || []).map((st, sIdx) => (
                  <div key={sIdx} className="rounded-lg border border-line bg-white p-3 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-brand-700">
                      STAT 0{sIdx + 1}
                    </span>
                    <input
                      type="text"
                      value={st.stat}
                      onChange={(e) => {
                        const updated = [...(settings.texts?.partners?.stats || [])];
                        const currentItem = updated[sIdx];
                        updated[sIdx] = {
                          stat: e.target.value,
                          desc: currentItem?.desc || "",
                        };
                        setSettings((prev) => ({
                          ...prev,
                          texts: {
                            ...prev.texts,
                            partners: { ...prev.texts.partners, stats: updated },
                          },
                        }));
                      }}
                      className="w-full rounded border border-line px-2 py-1 text-xs font-bold text-ink focus:border-brand-500 focus:outline-none"
                      placeholder="e.g. 30+"
                    />
                    <input
                      type="text"
                      value={st.desc}
                      onChange={(e) => {
                        const updated = [...(settings.texts?.partners?.stats || [])];
                        const currentItem = updated[sIdx];
                        updated[sIdx] = {
                          stat: currentItem?.stat || "",
                          desc: e.target.value,
                        };
                        setSettings((prev) => ({
                          ...prev,
                          texts: {
                            ...prev.texts,
                            partners: { ...prev.texts.partners, stats: updated },
                          },
                        }));
                      }}
                      className="w-full rounded border border-line px-2 py-1 text-[11px] text-ink-muted focus:border-brand-500 focus:outline-none"
                      placeholder="Description"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Support Call to Action Copy */}
          <div className="rounded-xl border border-brand-200/80 bg-sand-50/50 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-200/60 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                5. Support BSGSS Contribution Call-to-Action
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Badge / Eyebrow
                </label>
                <input
                  type="text"
                  value={settings.texts?.support?.eyebrow ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        support: { ...prev.texts.support, eyebrow: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Primary Headline
                </label>
                <input
                  type="text"
                  value={settings.texts?.support?.title ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        support: { ...prev.texts.support, title: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink font-semibold focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Description Text
                </label>
                <input
                  type="text"
                  value={settings.texts?.support?.description ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        support: { ...prev.texts.support, description: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Button Label
                </label>
                <input
                  type="text"
                  value={settings.texts?.support?.buttonText ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      texts: {
                        ...prev.texts,
                        support: { ...prev.texts.support, buttonText: e.target.value },
                      },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs font-bold text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Stylish Collage Exhibition & Imagery */}
      {activeTab === "collage" && (
        <div className="rounded-b-xl border border-t-0 border-line bg-white p-6 shadow-sm space-y-8">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">
              Stylish Photo Collage Tiles (6 Editorial Photos)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-ink-muted">
              Customize the images, titles, categories, village tags, and tilt angles for the stylish photographic collage.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {settings.images.collagePhotos.map((photo, idx) => (
              <div
                key={photo.id || idx}
                className="flex flex-col justify-between rounded-xl border border-line bg-white p-4 shadow-2xs space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-brand-700 uppercase">
                      Tile #{idx + 1} {idx === 0 && "(Featured 2-Span)"}
                    </span>
                    <span className="text-xs text-ink-muted font-mono">{photo.tilt}</span>
                  </div>

                  {/* Preview Thumbnail */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-sand-100 border border-line mb-3">
                    <img src={photo.src} alt={photo.title} className="h-full w-full object-cover" />
                  </div>

                  {/* Photo Title */}
                  <label className="block text-xs font-semibold text-ink mb-1">Title</label>
                  <input
                    type="text"
                    value={photo.title}
                    onChange={(e) => handleUpdatePhoto(idx, { title: e.target.value })}
                    className="w-full rounded-md border border-line px-2.5 py-1.5 text-xs text-ink focus:border-brand-500 focus:outline-none mb-2"
                  />

                  {/* Category & Tag */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <label className="block text-[0.6875rem] font-semibold text-ink-muted mb-0.5">Category</label>
                      <input
                        type="text"
                        value={photo.category}
                        onChange={(e) => handleUpdatePhoto(idx, { category: e.target.value })}
                        className="w-full rounded-md border border-line px-2 py-1 text-xs text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.6875rem] font-semibold text-ink-muted mb-0.5">Village / Tag</label>
                      <input
                        type="text"
                        value={photo.tag}
                        onChange={(e) => handleUpdatePhoto(idx, { tag: e.target.value })}
                        className="w-full rounded-md border border-line px-2 py-1 text-xs text-ink"
                      />
                    </div>
                  </div>

                  {/* Caption */}
                  <label className="block text-xs font-semibold text-ink mb-1">Story Caption</label>
                  <textarea
                    rows={2}
                    value={photo.caption}
                    onChange={(e) => handleUpdatePhoto(idx, { caption: e.target.value })}
                    className="w-full rounded-md border border-line px-2.5 py-1.5 text-xs text-ink focus:border-brand-500 focus:outline-none mb-2 resize-none"
                  />

                  {/* Image Source URL / Dropdown Preset */}
                  <label className="block text-xs font-semibold text-ink mb-1">Image Source (URL / Path)</label>
                  <input
                    type="text"
                    value={photo.src}
                    onChange={(e) => handleUpdatePhoto(idx, { src: e.target.value })}
                    className="w-full rounded-md border border-line px-2 py-1 text-xs font-mono text-ink mb-2"
                  />

                  {/* Quick Preset Selector */}
                  <select
                    onChange={(e) => {
                      if (e.target.value) handleUpdatePhoto(idx, { src: e.target.value });
                    }}
                    className="w-full rounded-md border border-line bg-sand-50 px-2 py-1 text-xs text-ink"
                  >
                    <option value="">Choose from verified gallery photos...</option>
                    {GALLERY_PRESET_IMAGES.map((img) => (
                      <option key={img.src} value={img.src}>
                        {img.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tilt Selector */}
                <div className="pt-2 border-t border-line flex items-center justify-between text-xs">
                  <span className="text-ink-muted">Angle Tilt:</span>
                  <div className="flex gap-1">
                    {(["-rotate-2", "-rotate-1", "rotate-0", "rotate-1", "rotate-2"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleUpdatePhoto(idx, { tilt: t })}
                        className={`px-1.5 py-0.5 rounded text-[0.625rem] font-bold ${
                          photo.tilt === t ? "bg-brand-700 text-white" : "bg-sand-100 text-ink-muted"
                        }`}
                      >
                        {t.replace("rotate-", "")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hero Carousel Slides Section */}
          <div className="pt-6 border-t border-line space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold text-ink">Hero Banner Carousel Slides</h3>
                <p className="text-xs text-ink-muted">Images that rotate in the primary top hero section.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {settings.images.heroSlides.map((slide, sIdx) => (
                <div key={sIdx} className="relative rounded-lg border border-line overflow-hidden group">
                  <img src={slide} alt={`Slide ${sIdx + 1}`} className="aspect-[16/9] w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveHeroSlide(sIdx)}
                    className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition"
                    title="Remove slide"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                  <div className="p-1.5 bg-white text-[0.6875rem] font-mono truncate text-ink-muted">{slide}</div>
                </div>
              ))}
            </div>

            {/* Quick Add Slide */}
            <div className="flex items-center gap-2 max-w-xl">
              <select
                id="hero-slide-select"
                className="flex-1 rounded-md border border-line bg-white px-3 py-1.5 text-xs text-ink"
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddHeroSlide(e.target.value);
                    e.target.value = "";
                  }
                }}
              >
                <option value="">+ Add a verified banner slide to carousel...</option>
                {GALLERY_PRESET_IMAGES.map((img) => (
                  <option key={img.src} value={img.src}>
                    {img.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Ambient Music & Relaxation Sound Effects */}
      {activeTab === "audio" && (
        <div className="rounded-b-xl border border-t-0 border-line bg-white p-6 shadow-sm space-y-6">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">
              Relaxing Ambient Music &amp; Audio Feedback
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-ink-muted">
              Configure gentle, meditative background Indian soundscapes (flute, tanpura, nature) to create a serene visitor experience.
            </p>
          </div>

          {/* Master Sound Enable / Disable */}
          <div className="flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50/50 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-white">
                <Music className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">Enable Ambient Audio Widget on Website</p>
                <p className="text-xs text-ink-muted">
                  Displays the floating audio player widget at the bottom of public pages.
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.audio.enabled}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    audio: { ...prev.audio, enabled: e.target.checked },
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-sand-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-sand-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-700" />
            </label>
          </div>

          {/* Track Presets Grid */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
              Select Soundscape Theme
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {AMBIENT_TRACK_PRESETS.map((track) => {
                const isSelected = settings.audio.trackId === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        audio: { ...prev.audio, trackId: track.id },
                      }))
                    }
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      isSelected
                        ? "border-brand-600 bg-brand-50/70 shadow-xs ring-1 ring-brand-500"
                        : "border-line bg-white hover:border-brand-200 hover:bg-sand-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold text-ink">{track.name}</p>
                        <p className="text-xs font-semibold text-brand-700 mt-0.5">{track.genre}</p>
                      </div>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          isSelected ? "border-brand-700 bg-brand-700 text-white" : "border-sand-300"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-ink-muted leading-relaxed">{track.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Stream URL if custom selected */}
          {settings.audio.trackId === "custom-stream" && (
            <div className="rounded-xl border border-line bg-sand-50 p-4 space-y-2">
              <label className="block text-xs font-semibold text-ink">Custom Hosted MP3 / Stream URL</label>
              <input
                type="url"
                placeholder="https://example.com/audio/sarvodaya-ambient.mp3"
                value={settings.audio.customUrl}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    audio: { ...prev.audio, customUrl: e.target.value },
                  }))
                }
                className="w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink font-mono"
              />
            </div>
          )}

          {/* Volume Slider & Test Sound */}
          <div className="rounded-xl border border-line bg-sand-50/70 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1 flex-1 max-w-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-ink">
                <span>Default Visitor Volume</span>
                <span className="font-bold text-brand-700">{Math.round(settings.audio.defaultVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1.0"
                step="0.05"
                value={settings.audio.defaultVolume}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    audio: { ...prev.audio, defaultVolume: parseFloat(e.target.value) },
                  }))
                }
                className="w-full h-1.5 bg-sand-200 accent-brand-700 rounded-lg cursor-pointer"
              />
            </div>

            <button
              type="button"
              onClick={handleTestChime}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-white px-4 py-2 text-xs font-semibold text-brand-800 shadow-2xs hover:bg-brand-50 transition"
            >
              <Volume2 className="h-4 w-4 text-brand-700" />
              <span>♫ Test Audio Chime</span>
            </button>
          </div>

          {/* Click Sound Effects Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-line p-4">
            <div>
              <p className="text-sm font-semibold text-ink">Subtle UI Click Sound Effects</p>
              <p className="text-xs text-ink-muted">Play a gentle wooden/sitar micro-tap when buttons and tabs are pressed.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.audio.clickSounds}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  audio: { ...prev.audio, clickSounds: e.target.checked },
                }))
              }
              className="h-4 w-4 rounded accent-brand-700"
            />
          </div>
        </div>
      )}

      {/* Tab Content 4: Live Mission & Typing Ticker */}
      {activeTab === "typing" && (
        <div className="rounded-b-xl border border-t-0 border-line bg-white p-6 shadow-sm space-y-6">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">
              Live Mission Typewriter &amp; Status Ticker
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-ink-muted">
              Configure the real-time typewriter sentences and operational status badge displayed on the homepage.
            </p>
          </div>

          {/* Eyebrow and Status Text */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Header Eyebrow Tag</label>
              <input
                type="text"
                value={settings.typing.eyebrow}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    typing: { ...prev.typing, eyebrow: e.target.value },
                  }))
                }
                className="w-full rounded-md border border-line px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink mb-1">Live Operational Location Badge</label>
              <input
                type="text"
                value={settings.typing.statusText}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    typing: { ...prev.typing, statusText: e.target.value },
                  }))
                }
                className="w-full rounded-md border border-line px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Rotating Phrases List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Rotating Typewriter Sentences ({settings.typing.phrases.length})
              </label>
              <button
                type="button"
                onClick={handleAddTypingPhrase}
                className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Sentence</span>
              </button>
            </div>

            <div className="space-y-2">
              {settings.typing.phrases.map((phrase, pIdx) => (
                <div key={pIdx} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sand-100 text-xs font-bold text-ink-muted shrink-0">
                    {pIdx + 1}
                  </span>
                  <input
                    type="text"
                    value={phrase}
                    onChange={(e) => handleUpdateTypingPhrase(pIdx, e.target.value)}
                    className="flex-1 rounded-md border border-line px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTypingPhrase(pIdx)}
                    disabled={settings.typing.phrases.length <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-muted hover:text-red-700 hover:bg-red-50 disabled:opacity-30"
                    title="Remove sentence"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Footprint & Global Reach Configuration */}
      {activeTab === "footprint" && (
        <div className="space-y-6 rounded-b-xl border border-t-0 border-line bg-white p-6 shadow-sm">
          <div>
            <h3 className="font-display text-lg font-bold text-ink">
              Interactive Map &amp; Global Outreach Horizon
            </h3>
            <p className="mt-1 text-xs text-ink-muted">
              Configure the headline narrative, default view mode, and strategic vision statements for both the World Map and India Grassroots Network.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Section Eyebrow Pill
              </label>
              <input
                type="text"
                value={settings.footprint?.eyebrow ?? ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    footprint: { ...prev.footprint, eyebrow: e.target.value },
                  }))
                }
                className="mt-1.5 w-full rounded-md border border-line px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                placeholder="Global Alliances & Verified Grassroots Footprint"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Default Map View Mode
              </label>
              <select
                value={settings.footprint?.defaultMode ?? "world"}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    footprint: {
                      ...prev.footprint,
                      defaultMode: e.target.value as "world" | "india",
                    },
                  }))
                }
                className="mt-1.5 w-full rounded-md border border-line px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none bg-white"
              >
                <option value="world">🌍 World / International Map (Default)</option>
                <option value="india">🇮🇳 India Grassroots Network</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
              Main Display Heading
            </label>
            <input
              type="text"
              value={settings.footprint?.heading ?? ""}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  footprint: { ...prev.footprint, heading: e.target.value },
                }))
              }
              className="mt-1.5 w-full rounded-md border border-line px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
              placeholder="Where grassroots action meets international vision."
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
              Institutional Narrative Description
            </label>
            <textarea
              rows={3}
              value={settings.footprint?.description ?? ""}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  footprint: { ...prev.footprint, description: e.target.value },
                }))
              }
              className="mt-1.5 w-full rounded-md border border-line px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
              placeholder="Describe BSGSS's 30+ years of verified grassroots field execution..."
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                World Map Context Explanatory Note
              </label>
              <textarea
                rows={2}
                value={settings.footprint?.worldNote ?? ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    footprint: { ...prev.footprint, worldNote: e.target.value },
                  }))
                }
                className="mt-1.5 w-full rounded-md border border-line px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                placeholder="Uncolored international territories represent our strategic global outreach roadmap..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                India Grassroots Context Explanatory Note
              </label>
              <textarea
                rows={2}
                value={settings.footprint?.indiaNote ?? ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    footprint: { ...prev.footprint, indiaNote: e.target.value },
                  }))
                }
                className="mt-1.5 w-full rounded-md border border-line px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                placeholder="Grassroots presence verified through official statutory filings..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
              Global Vision Target Goal Banner
            </label>
            <input
              type="text"
              value={settings.footprint?.globalVisionGoal ?? ""}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  footprint: { ...prev.footprint, globalVisionGoal: e.target.value },
                }))
              }
              className="mt-1.5 w-full rounded-md border border-line px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
              placeholder="Target: Expanding grassroots Indian handloom, health vans & micro-credit to 10+ international diaspora alliances."
            />
          </div>

          {/* Grassroots Telemetry Numbers */}
          <div className="rounded-xl border border-brand-200/80 bg-sand-50/50 p-5 space-y-4">
            <div className="border-b border-brand-200/60 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                Grassroots Field Telemetry Metrics (Displayed on India Map Cockpit)
              </span>
              <p className="text-[11px] text-ink-muted mt-0.5">
                Controls the 4 live count badges displayed next to the interactive map (7 states, 20+ districts, 350+ villages, 35 CSR partners).
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  States Covered
                </label>
                <input
                  type="text"
                  value={settings.footprint?.statesCount ?? "7 states"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      footprint: { ...prev.footprint, statesCount: e.target.value },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                  placeholder="7 states"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Districts Covered
                </label>
                <input
                  type="text"
                  value={settings.footprint?.districtsCount ?? "20+ districts"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      footprint: { ...prev.footprint, districtsCount: e.target.value },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                  placeholder="20+ districts"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Villages / Panchayats
                </label>
                <input
                  type="text"
                  value={settings.footprint?.villagesCount ?? "350+ villages"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      footprint: { ...prev.footprint, villagesCount: e.target.value },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                  placeholder="350+ villages"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  CSR PSU Partners
                </label>
                <input
                  type="text"
                  value={settings.footprint?.csrPartnersCount ?? "35 CSR PSU Partners"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      footprint: { ...prev.footprint, csrPartnersCount: e.target.value },
                    }))
                  }
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                  placeholder="35 CSR PSU Partners"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: Header, Navigation & Footer Layout Settings */}
      {activeTab === "layout" && (
        <div className="space-y-6 rounded-b-xl border border-t-0 border-line bg-white p-6 shadow-sm animate-fadeIn">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Header, Navigation &amp; Footer Sizing</h2>
            <p className="mt-1 text-xs text-ink-muted">
              Control logo dimensions, navigation proportions, maximum content width, and section header styling across the entire website.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Header Logo Size */}
            <div className="rounded-xl border border-line p-4 bg-sand-50/50">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Header Logo Display Size
              </label>
              <p className="mt-1 text-xs text-slate-500">
                Adjusts the official BSGSS horizontal crest in the top navigation bar.
              </p>
              <select
                value={settings.layout?.headerLogoSize ?? "large"}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    layout: {
                      ...prev.layout,
                      headerLogoSize: e.target.value as "default" | "large" | "xlarge",
                    },
                  }))
                }
                className="mt-3 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-ink focus:border-brand-500 focus:outline-none"
              >
                <option value="default">Standard (11rem - 20rem)</option>
                <option value="large">Enlarged / Prominent (15rem - 24rem) [Recommended]</option>
                <option value="xlarge">Maximum Prominence (17rem - 28rem)</option>
              </select>
            </div>

            {/* Footer Logo Size */}
            <div className="rounded-xl border border-line p-4 bg-sand-50/50">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Footer Logo Card Size
              </label>
              <p className="mt-1 text-xs text-slate-500">
                Controls the inverted white emblem container at the bottom of every page.
              </p>
              <select
                value={settings.layout?.footerLogoSize ?? "xlarge"}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    layout: {
                      ...prev.layout,
                      footerLogoSize: e.target.value as "default" | "large" | "xlarge",
                    },
                  }))
                }
                className="mt-3 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-ink focus:border-brand-500 focus:outline-none"
              >
                <option value="default">Standard Size (22rem - 30rem)</option>
                <option value="large">Large Size (24rem - 32rem)</option>
                <option value="xlarge">Extra Large High-Visibility (26rem - 38rem) [Recommended]</option>
              </select>
            </div>

            {/* Content Width Standard */}
            <div className="rounded-xl border border-line p-4 bg-sand-50/50">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Global Container Width
              </label>
              <p className="mt-1 text-xs text-slate-500">
                Prevents awkward side margins and expands content across modern displays.
              </p>
              <select
                value={settings.layout?.containerWidth ?? "wide"}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    layout: {
                      ...prev.layout,
                      containerWidth: e.target.value as "standard" | "wide" | "expanded",
                    },
                  }))
                }
                className="mt-3 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-ink focus:border-brand-500 focus:outline-none"
              >
                <option value="standard">Standard Boxed (max-w-6xl)</option>
                <option value="wide">Modern Full Reach (max-w-7xl) [Standard]</option>
                <option value="expanded">Edge Showcase (max-w-[94rem])</option>
              </select>
            </div>

            {/* Section Eyebrow Appearance */}
            <div className="rounded-xl border border-line p-4 bg-sand-50/50">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Section Eyebrow Typography Standard
              </label>
              <p className="mt-1 text-xs text-slate-500">
                Eliminates blue dots and rounded chip pill borders in favor of bold clean editorial headings.
              </p>
              <select
                value={settings.layout?.eyebrowStyle ?? "modern_track"}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    layout: {
                      ...prev.layout,
                      eyebrowStyle: e.target.value as "plain_bold" | "modern_track",
                    },
                  }))
                }
                className="mt-3 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-ink focus:border-brand-500 focus:outline-none"
              >
                <option value="modern_track">Modern Bold Tracking (No Dots, No Pills) [Active Standard]</option>
                <option value="plain_bold">Clean Monospace Tag (No Dots)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: Offices (Registered & Admin) & WhatsApp Action Configuration */}
      {activeTab === "offices" && (
        <div className="space-y-8 rounded-b-xl border border-t-0 border-line bg-white p-6 shadow-sm animate-fadeIn">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Two Official Addresses &amp; WhatsApp Integration</h2>
            <p className="mt-1 text-xs text-ink-muted">
              Centrally manage the Registered Office (statutory village seat) and Admin Office (executive coordination hub), plus the WhatsApp direct action button.
            </p>
          </div>

          {/* Section 1: WhatsApp Action Button Settings */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
            <div className="flex items-center gap-2 text-emerald-800">
              <MessageCircle className="h-5 w-5 text-emerald-600" />
              <h3 className="font-display text-base font-bold">WhatsApp Action Button Settings</h3>
            </div>
            <p className="mt-1 text-xs text-emerald-900/80">
              Directly controls the WhatsApp action button shown in the top header, floating quick actions, and footer.
            </p>

            <div className="mt-4 grid gap-5 md:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  WhatsApp Contact Number (with Country Code)
                </label>
                <input
                  type="text"
                  value={settings.contactActions?.whatsappNumber ?? "919910243454"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      contactActions: {
                        ...prev.contactActions,
                        whatsappNumber: e.target.value,
                      },
                    }))
                  }
                  placeholder="e.g. 919910243454"
                  className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                />
                <span className="mt-1 block text-[11px] text-slate-500">
                  Enter numeric format with country code (e.g., 919910243454 for India +91 99102 43454).
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Default Pre-filled WhatsApp Message
                </label>
                <input
                  type="text"
                  value={settings.contactActions?.whatsappMessage ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      contactActions: {
                        ...prev.contactActions,
                        whatsappMessage: e.target.value,
                      },
                    }))
                  }
                  placeholder="Namaste BSGSS Team, I am reaching out through the official website..."
                  className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-6 pt-3 border-t border-emerald-200/80 text-xs font-semibold text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.contactActions?.showInHeader ?? true}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      contactActions: {
                        ...prev.contactActions,
                        showInHeader: e.target.checked,
                      },
                    }))
                  }
                  className="h-4 w-4 rounded-sm accent-emerald-600"
                />
                <span>Display in Top Navigation Header</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.contactActions?.showInQuickActions ?? true}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      contactActions: {
                        ...prev.contactActions,
                        showInQuickActions: e.target.checked,
                      },
                    }))
                  }
                  className="h-4 w-4 rounded-sm accent-emerald-600"
                />
                <span>Display in Floating Quick Actions</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.contactActions?.showInFooter ?? true}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      contactActions: {
                        ...prev.contactActions,
                        showInFooter: e.target.checked,
                      },
                    }))
                  }
                  className="h-4 w-4 rounded-sm accent-emerald-600"
                />
                <span>Display in Footer Contact Strip</span>
              </label>
            </div>
          </div>

          {/* Section 2: Two Addresses (Registered & Admin) */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Registered Office */}
            <div className="rounded-xl border border-line bg-sand-50/40 p-5 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800">
                <Building2 className="h-5 w-5 text-emerald-600" />
                <div>
                  <h3 className="font-display text-base font-bold">1. Registered Office (Statutory)</h3>
                  <p className="text-[11px] text-slate-500">Official registered seat in Bisnouli Village, Dadri Tehsil</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">Display Title</label>
                <input
                  type="text"
                  value={settings.offices?.registeredOffice?.title ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      offices: {
                        ...prev.offices,
                        registeredOffice: { ...prev.offices.registeredOffice, title: e.target.value },
                      },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">Address Line 1</label>
                  <input
                    type="text"
                    value={settings.offices?.registeredOffice?.line1 ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          registeredOffice: { ...prev.offices.registeredOffice, line1: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">Address Line 2</label>
                  <input
                    type="text"
                    value={settings.offices?.registeredOffice?.line2 ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          registeredOffice: { ...prev.offices.registeredOffice, line2: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">City / District</label>
                  <input
                    type="text"
                    value={settings.offices?.registeredOffice?.city ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          registeredOffice: { ...prev.offices.registeredOffice, city: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">State</label>
                  <input
                    type="text"
                    value={settings.offices?.registeredOffice?.state ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          registeredOffice: { ...prev.offices.registeredOffice, state: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">PIN Code</label>
                  <input
                    type="text"
                    value={settings.offices?.registeredOffice?.pincode ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          registeredOffice: { ...prev.offices.registeredOffice, pincode: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">Office Phone</label>
                  <input
                    type="text"
                    value={settings.offices?.registeredOffice?.phone ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          registeredOffice: { ...prev.offices.registeredOffice, phone: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">Email</label>
                  <input
                    type="email"
                    value={settings.offices?.registeredOffice?.email ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          registeredOffice: { ...prev.offices.registeredOffice, email: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">Google Maps Destination URL</label>
                <input
                  type="text"
                  value={settings.offices?.registeredOffice?.mapsUrl ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      offices: {
                        ...prev.offices,
                        registeredOffice: { ...prev.offices.registeredOffice, mapsUrl: e.target.value },
                      },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Admin Office */}
            <div className="rounded-xl border border-line bg-sand-50/40 p-5 space-y-4">
              <div className="flex items-center gap-2 text-brand-800">
                <MapPin className="h-5 w-5 text-brand-700" />
                <div>
                  <h3 className="font-display text-base font-bold">2. Head &amp; Administrative Office</h3>
                  <p className="text-[11px] text-slate-500">Executive centre in Noida Sector 31</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">Display Title</label>
                <input
                  type="text"
                  value={settings.offices?.adminOffice?.title ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      offices: {
                        ...prev.offices,
                        adminOffice: { ...prev.offices.adminOffice, title: e.target.value },
                      },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs font-semibold text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">Address Line 1</label>
                  <input
                    type="text"
                    value={settings.offices?.adminOffice?.line1 ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          adminOffice: { ...prev.offices.adminOffice, line1: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">Address Line 2</label>
                  <input
                    type="text"
                    value={settings.offices?.adminOffice?.line2 ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          adminOffice: { ...prev.offices.adminOffice, line2: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">City / District</label>
                  <input
                    type="text"
                    value={settings.offices?.adminOffice?.city ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          adminOffice: { ...prev.offices.adminOffice, city: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">State</label>
                  <input
                    type="text"
                    value={settings.offices?.adminOffice?.state ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          adminOffice: { ...prev.offices.adminOffice, state: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">PIN Code</label>
                  <input
                    type="text"
                    value={settings.offices?.adminOffice?.pincode ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          adminOffice: { ...prev.offices.adminOffice, pincode: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">Office Phone</label>
                  <input
                    type="text"
                    value={settings.offices?.adminOffice?.phone ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          adminOffice: { ...prev.offices.adminOffice, phone: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">Email</label>
                  <input
                    type="email"
                    value={settings.offices?.adminOffice?.email ?? ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        offices: {
                          ...prev.offices,
                          adminOffice: { ...prev.offices.adminOffice, email: e.target.value },
                        },
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">Google Maps Destination URL</label>
                <input
                  type="text"
                  value={settings.offices?.adminOffice?.mapsUrl ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      offices: {
                        ...prev.offices,
                        adminOffice: { ...prev.offices.adminOffice, mapsUrl: e.target.value },
                      },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Pop-up & Announcements */}
      {activeTab === "popup" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                    <Bell className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    Website Pop-up Notification &amp; Announcement
                  </h3>
                </div>
                <p className="mt-1 text-xs text-ink-muted">
                  Publish a smart, interactive pop-up modal on the website for breaking announcements, news updates, upcoming grassroots activities, or campaigns.
                </p>
              </div>

              {/* Enable / Disable Toggle */}
              <label className="inline-flex items-center gap-3 cursor-pointer">
                <span className="text-xs font-bold uppercase tracking-wider text-ink">
                  {settings.popup?.enabled ? "Pop-up Active" : "Pop-up Disabled"}
                </span>
                <input
                  type="checkbox"
                  checked={Boolean(settings.popup?.enabled)}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      popup: { ...prev.popup, enabled: e.target.checked },
                    }))
                  }
                  className="h-5 w-5 rounded border-line text-brand-700 focus:ring-brand-500 cursor-pointer"
                />
              </label>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Notification Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Notification Type / Category
                </label>
                <select
                  value={settings.popup?.type || "announcement"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      popup: { ...prev.popup, type: e.target.value as PopupNotificationType },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs font-medium text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="announcement">📢 Announcement (Special Notice / Notice Board)</option>
                  <option value="activity">🎉 Activity (Field Camp / Workshop / Training)</option>
                  <option value="news">📰 News (Media Coverage / Milestone / Legal)</option>
                  <option value="advertisement">🏷️ Advertisement / Posting (Appeal / Product Launch)</option>
                </select>
                <p className="mt-1 text-[11px] text-ink-muted">
                  Sets the default visual badge icon and institutional context.
                </p>
              </div>

              {/* Custom Badge Label */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Badge Chip Text (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Special Notice, Free Health Camp, Breaking News"
                  value={settings.popup?.badge ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      popup: { ...prev.popup, badge: e.target.value },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Headline / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Free Eye Check-up &amp; Medicine Distribution Camp in Dadri"
                  value={settings.popup?.title ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      popup: { ...prev.popup, title: e.target.value },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              {/* Description Body */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Details / Body Text <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide essential details, date, location, or instructions for website visitors..."
                  value={settings.popup?.description ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      popup: { ...prev.popup, description: e.target.value },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs leading-relaxed text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              {/* Media Image URL */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Featured Image (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. /images/bsgss/healthcare-camps/149-camp1.jpeg"
                  value={settings.popup?.imageUrl ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      popup: { ...prev.popup, imageUrl: e.target.value },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-ink-muted">
                  <span className="font-semibold text-ink">Presets:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        popup: { ...prev.popup, imageUrl: "/images/bsgss/healthcare-camps/149-camp1.jpeg" },
                      }))
                    }
                    className="hover:text-brand-700 underline cursor-pointer"
                  >
                    Health Camp
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        popup: { ...prev.popup, imageUrl: "/images/bsgss/gallery-training/185-tal1.jpeg" },
                      }))
                    }
                    className="hover:text-brand-700 underline cursor-pointer"
                  >
                    Tailoring Workshop
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        popup: { ...prev.popup, imageUrl: "/images/bsgss/banners/589-banner-1.webp" },
                      }))
                    }
                    className="hover:text-brand-700 underline cursor-pointer"
                  >
                    Community Banner
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        popup: { ...prev.popup, imageUrl: "" },
                      }))
                    }
                    className="hover:text-red-700 underline cursor-pointer"
                  >
                    No Image (Text only)
                  </button>
                </div>
              </div>

              {/* Primary Action Button */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. Read Full Notice / Register"
                  value={settings.popup?.primaryButtonText ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      popup: { ...prev.popup, primaryButtonText: e.target.value },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Primary Button Link URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. /our-work, /contact, or https://..."
                  value={settings.popup?.primaryButtonUrl ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      popup: { ...prev.popup, primaryButtonUrl: e.target.value },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              {/* Secondary Action Button */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Secondary Button Text (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Contact Desk / View Details"
                  value={settings.popup?.secondaryButtonText ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      popup: { ...prev.popup, secondaryButtonText: e.target.value },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Secondary Button Link URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. /contact"
                  value={settings.popup?.secondaryButtonUrl ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      popup: { ...prev.popup, secondaryButtonUrl: e.target.value },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
              </div>

              {/* Timing & Expiry */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Appearance Delay (seconds)
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={settings.popup?.delaySeconds ?? 1}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      popup: { ...prev.popup, delaySeconds: parseInt(e.target.value, 10) || 0 },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-ink-muted">
                  Delay after visitor opens the site before displaying modal (e.g. 1 or 2 seconds).
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Automatic Expiry Date (Optional)
                </label>
                <input
                  type="date"
                  value={settings.popup?.expiryDate ?? ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      popup: { ...prev.popup, expiryDate: e.target.value },
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-ink-muted">
                  Pop-up will automatically stop displaying after this date.
                </p>
              </div>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="rounded-2xl border border-line bg-sand-50/70 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              Live Preview
            </p>
            <div className="mt-3 max-w-md rounded-xl border border-line bg-white p-5 shadow-lg">
              <div className="h-1 w-full bg-slate-900 rounded-full mb-3" />
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                <Bell className="h-3.5 w-3.5 text-slate-900" />
                <span>{settings.popup?.badge || "Notice"}</span>
                <span className="text-ink-muted">·</span>
                <span className="capitalize text-[11px] font-normal text-ink-muted">{settings.popup?.type || "announcement"}</span>
              </div>
              <p className="mt-2 font-display text-base font-bold text-ink">
                {settings.popup?.title || "Your Headline Will Appear Here"}
              </p>
              <p className="mt-1.5 text-xs text-ink-muted leading-relaxed line-clamp-3">
                {settings.popup?.description || "Your announcement body text will be displayed here for visitors to read."}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-block rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">
                  {settings.popup?.primaryButtonText || "Learn More"}
                </span>
                {settings.popup?.secondaryButtonText && (
                  <span className="inline-block rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-slate-800">
                    {settings.popup.secondaryButtonText}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Our Story & Milestones */}
      {activeTab === "story" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-line bg-white p-6 shadow-2xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <Route className="h-4 w-4" />
                </span>
                <h3 className="font-display text-lg font-bold text-ink">
                  Our 30-Year Grassroots Story &amp; Milestone Timeline
                </h3>
              </div>
              <p className="mt-1 text-xs text-ink-muted">
                Manage the historical milestones, community dates, descriptions, locations, and authentic photographs shown on the interactive <code>/about/our-story</code> timeline.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const newMilestone: StoryMilestoneConfig = {
                  id: `milestone-${Date.now()}`,
                  year: "2026",
                  category: "New Chapter",
                  title: "New Grassroots Milestone",
                  description: "Describe the community impact, field program, or partnership milestone here.",
                  image: "/images/bsgss/banners/589-banner-1.webp",
                  imageAlt: "BSGSS community achievement",
                  location: "Uttar Pradesh & Delhi NCR",
                };
                setSettings((prev) => ({
                  ...prev,
                  storyMilestones: [...(prev.storyMilestones || []), newMilestone],
                }));
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800 transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Milestone</span>
            </button>
          </div>

          <section className="rounded-2xl border border-line bg-sand-50/70 p-5 sm:p-6">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Timeline visual treatment</p>
              <h4 className="mt-1 font-display text-lg font-bold text-ink">Choose how the story milestones are presented</h4>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                Editorial removes the large photograph panel and uses a refined location-and-record layout. Photographic displays the image selected for each milestone.
              </p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: "editorial",
                  title: "Editorial record",
                  description: "Recommended: a focused, timeless milestone panel without a large image.",
                },
                {
                  value: "photographic",
                  title: "Documentary photography",
                  description: "Show the individual milestone photograph managed below.",
                },
              ].map((option) => {
                const selected = (settings.storyPresentation ?? "editorial") === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSettings((prev) => ({ ...prev, storyPresentation: option.value as "editorial" | "photographic" }))}
                    className={`rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-brand-700 bg-white shadow-xs"
                        : "border-line bg-white/70 hover:border-brand-300"
                    }`}
                  >
                    <span className={`block text-sm font-bold ${selected ? "text-brand-800" : "text-ink"}`}>{option.title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-ink-muted">{option.description}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Milestones List */}
          <div className="space-y-4">
            {(settings.storyMilestones || []).map((milestone, idx) => (
              <div
                key={milestone.id || idx}
                className="rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-2xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-display text-base font-bold text-ink">
                        {milestone.year} · {milestone.title}
                      </span>
                      <span className="ml-2 text-xs text-ink-muted">({milestone.category})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Move Up */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => {
                        if (idx === 0) return;
                        const updated = [...(settings.storyMilestones || [])];
                        const curr = updated[idx];
                        const prevM = updated[idx - 1];
                        if (!curr || !prevM) return;
                        updated[idx - 1] = curr;
                        updated[idx] = prevM;
                        setSettings((prev) => ({ ...prev, storyMilestones: updated }));
                      }}
                      className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      disabled={idx === (settings.storyMilestones || []).length - 1}
                      onClick={() => {
                        if (idx >= (settings.storyMilestones || []).length - 1) return;
                        const updated = [...(settings.storyMilestones || [])];
                        const curr = updated[idx];
                        const nextM = updated[idx + 1];
                        if (!curr || !nextM) return;
                        updated[idx + 1] = curr;
                        updated[idx] = nextM;
                        setSettings((prev) => ({ ...prev, storyMilestones: updated }));
                      }}
                      className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>

                    {/* Remove */}
                    <button
                      type="button"
                      disabled={(settings.storyMilestones || []).length <= 2}
                      onClick={() => {
                        if (!window.confirm(`Delete milestone "${milestone.title}"?`)) return;
                        setSettings((prev) => ({
                          ...prev,
                          storyMilestones: (prev.storyMilestones || []).filter((_, i) => i !== idx),
                        }));
                      }}
                      className="p-1.5 text-red-600 hover:text-red-800 disabled:opacity-30 cursor-pointer"
                      title="Delete milestone"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                      Year / Period
                    </label>
                    <input
                      type="text"
                      value={milestone.year}
                      onChange={(e) => {
                        const updated = [...(settings.storyMilestones || [])];
                        const target = updated[idx];
                        if (!target) return;
                        updated[idx] = { ...target, year: e.target.value };
                        setSettings((prev) => ({ ...prev, storyMilestones: updated }));
                      }}
                      className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                      Category
                    </label>
                    <input
                      type="text"
                      value={milestone.category}
                      onChange={(e) => {
                        const updated = [...(settings.storyMilestones || [])];
                        const target = updated[idx];
                        if (!target) return;
                        updated[idx] = { ...target, category: e.target.value };
                        setSettings((prev) => ({ ...prev, storyMilestones: updated }));
                      }}
                      className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                      Field Location / Territory
                    </label>
                    <input
                      type="text"
                      value={milestone.location}
                      onChange={(e) => {
                        const updated = [...(settings.storyMilestones || [])];
                        const target = updated[idx];
                        if (!target) return;
                        updated[idx] = { ...target, location: e.target.value };
                        setSettings((prev) => ({ ...prev, storyMilestones: updated }));
                      }}
                      className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                      Milestone Title
                    </label>
                    <input
                      type="text"
                      value={milestone.title}
                      onChange={(e) => {
                        const updated = [...(settings.storyMilestones || [])];
                        const target = updated[idx];
                        if (!target) return;
                        updated[idx] = { ...target, title: e.target.value };
                        setSettings((prev) => ({ ...prev, storyMilestones: updated }));
                      }}
                      className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                      Detailed Narrative
                    </label>
                    <textarea
                      rows={2}
                      value={milestone.description}
                      onChange={(e) => {
                        const updated = [...(settings.storyMilestones || [])];
                        const target = updated[idx];
                        if (!target) return;
                        updated[idx] = { ...target, description: e.target.value };
                        setSettings((prev) => ({ ...prev, storyMilestones: updated }));
                      }}
                      className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs leading-relaxed text-ink focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                      Photograph URL (Authentic Community Activities &amp; Events)
                    </label>
                    <input
                      type="text"
                      value={milestone.image}
                      onChange={(e) => {
                        const updated = [...(settings.storyMilestones || [])];
                        const target = updated[idx];
                        if (!target) return;
                        updated[idx] = { ...target, image: e.target.value };
                        setSettings((prev) => ({ ...prev, storyMilestones: updated }));
                      }}
                      className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-xs text-ink focus:border-brand-500 focus:outline-none"
                    />
                    <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-ink-muted">
                      <span className="font-semibold text-ink">Authentic Field Presets:</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(settings.storyMilestones || [])];
                          const target = updated[idx];
                          if (!target) return;
                          updated[idx] = { ...target, image: "/images/bsgss/legacy-page-assets/44-homepage-aboutus.jpg" };
                          setSettings((prev) => ({ ...prev, storyMilestones: updated }));
                        }}
                        className="hover:text-brand-700 underline cursor-pointer"
                      >
                        1994 Founding
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(settings.storyMilestones || [])];
                          const target = updated[idx];
                          if (!target) return;
                          updated[idx] = { ...target, image: "/images/bsgss/education/146-class1.jpeg" };
                          setSettings((prev) => ({ ...prev, storyMilestones: updated }));
                        }}
                        className="hover:text-brand-700 underline cursor-pointer"
                      >
                        Village Literacy
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(settings.storyMilestones || [])];
                          const target = updated[idx];
                          if (!target) return;
                          updated[idx] = { ...target, image: "/images/bsgss/gallery-training/185-tal1.jpeg" };
                          setSettings((prev) => ({ ...prev, storyMilestones: updated }));
                        }}
                        className="hover:text-brand-700 underline cursor-pointer"
                      >
                        Tailoring Center
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(settings.storyMilestones || [])];
                          const target = updated[idx];
                          if (!target) return;
                          updated[idx] = { ...target, image: "/images/bsgss/healthcare-camps/150-camp3.jpeg" };
                          setSettings((prev) => ({ ...prev, storyMilestones: updated }));
                        }}
                        className="hover:text-brand-700 underline cursor-pointer"
                      >
                        Medical Camp
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(settings.storyMilestones || [])];
                          const target = updated[idx];
                          if (!target) return;
                          updated[idx] = { ...target, image: "/images/bsgss/gallery-events/355-1-1.jpg" };
                          setSettings((prev) => ({ ...prev, storyMilestones: updated }));
                        }}
                        className="hover:text-brand-700 underline cursor-pointer"
                      >
                        CSR Partnerships
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                      Image Preview
                    </label>
                    <div className="mt-1 relative h-20 w-32 rounded-lg border border-line overflow-hidden bg-sand-100">
                      {milestone.image ? (
                        <img
                          src={milestone.image}
                          alt={milestone.imageAlt || milestone.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-ink-muted">
                          No image
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Social Media Channels */}
      {activeTab === "social" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                    <Share2 className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    Official Social Media Channels &amp; Public Links
                  </h3>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-ink-muted">
                  Centrally manage official social profiles across YouTube, Facebook, Instagram, Twitter / X, and LinkedIn. Changes reflect instantly in the public website footer.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSettings((prev) => ({
                      ...prev,
                      socialLinks: { ...DEFAULT_CUSTOMIZER_SETTINGS.socialLinks },
                    }));
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sand-50 transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset to Defaults
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {[
                {
                  id: "youtube" as const,
                  label: "YouTube Channel",
                  subtext: "Official video repository for documentaries, skill workshops, and field footage.",
                  icon: Youtube,
                  urlKey: "youtube" as const,
                  enabledKey: "youtubeEnabled" as const,
                  placeholder: "https://www.youtube.com/@BISNOULISANSTHAN",
                },
                {
                  id: "facebook" as const,
                  label: "Facebook Page",
                  subtext: "Community updates, beneficiary stories, and grassroots program notices.",
                  icon: Facebook,
                  urlKey: "facebook" as const,
                  enabledKey: "facebookEnabled" as const,
                  placeholder: "https://www.facebook.com/bisnoulisansthan/",
                },
                {
                  id: "instagram" as const,
                  label: "Instagram Profile",
                  subtext: "Visual galleries, artisan handloom spotlights, and field visit reels.",
                  icon: Instagram,
                  urlKey: "instagram" as const,
                  enabledKey: "instagramEnabled" as const,
                  placeholder: "https://www.instagram.com/bisnoulisansthan/",
                },
                {
                  id: "twitter" as const,
                  label: "Twitter / X Profile",
                  subtext: "Policy advocacy, institutional announcements, and national partner mentions.",
                  icon: Twitter,
                  urlKey: "twitter" as const,
                  enabledKey: "twitterEnabled" as const,
                  placeholder: "https://twitter.com/bisnoulisansthan",
                },
                {
                  id: "linkedin" as const,
                  label: "LinkedIn Company Page",
                  subtext: "CSR alliances, institutional governance, career opportunities, and reports.",
                  icon: Linkedin,
                  urlKey: "linkedin" as const,
                  enabledKey: "linkedinEnabled" as const,
                  placeholder: "https://www.linkedin.com/company/bisnouli-sarvodaya-gramodyog-sewa-sansthan/",
                },
              ].map((channel) => {
                const Icon = channel.icon;
                const isEnabled = Boolean(settings.socialLinks?.[channel.enabledKey]);
                const currentUrl = settings.socialLinks?.[channel.urlKey] || "";

                return (
                  <div
                    key={channel.id}
                    className="rounded-xl border border-line bg-sand-50/40 p-4 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-line text-ink">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-ink">{channel.label}</span>
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                                isEnabled
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : "bg-sand-200 text-ink-muted border border-sand-300"
                              }`}
                            >
                              {isEnabled ? "Visible on Site" : "Hidden"}
                            </span>
                          </div>
                          <p className="text-xs text-ink-muted">{channel.subtext}</p>
                        </div>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer self-start sm:self-center">
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSettings((prev) => ({
                              ...prev,
                              socialLinks: {
                                ...prev.socialLinks,
                                [channel.enabledKey]: checked,
                              },
                            }));
                          }}
                          className="h-4 w-4 rounded accent-brand-700"
                        />
                        <span className="text-xs font-semibold text-ink">Enable</span>
                      </label>
                    </div>

                    <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="url"
                        value={currentUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSettings((prev) => ({
                            ...prev,
                            socialLinks: {
                              ...prev.socialLinks,
                              [channel.urlKey]: val,
                            },
                          }));
                        }}
                        placeholder={channel.placeholder}
                        className="flex-1 rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink placeholder:text-ink-muted/60 focus:border-brand-500 focus:outline-none"
                      />
                      {currentUrl && (
                        <a
                          href={currentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-ink-muted hover:text-ink hover:bg-sand-100 transition whitespace-nowrap"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          Test Link
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Footer Preview */}
          <div className="rounded-2xl border border-line bg-brand-900 p-6 text-brand-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-brand-800 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-300">
                  Live Footer Preview
                </p>
                <p className="text-xs text-brand-200">
                  Here is how the social icons render in the footer with current settings:
                </p>
              </div>
              <span className="rounded-full bg-brand-800 px-3 py-1 text-[11px] font-semibold text-brand-200">
                {[
                  settings.socialLinks?.youtubeEnabled && settings.socialLinks?.youtube,
                  settings.socialLinks?.facebookEnabled && settings.socialLinks?.facebook,
                  settings.socialLinks?.instagramEnabled && settings.socialLinks?.instagram,
                  settings.socialLinks?.twitterEnabled && settings.socialLinks?.twitter,
                  settings.socialLinks?.linkedinEnabled && settings.socialLinks?.linkedin,
                ].filter(Boolean).length}{" "}
                Active Channels
              </span>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[.14em] text-brand-300">Follow &amp; Connect</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {settings.socialLinks?.youtubeEnabled && settings.socialLinks?.youtube && (
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 text-brand-200"
                    title="YouTube Channel"
                  >
                    <Youtube className="h-4 w-4" />
                  </span>
                )}
                {settings.socialLinks?.facebookEnabled && settings.socialLinks?.facebook && (
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 text-brand-200"
                    title="Facebook Page"
                  >
                    <Facebook className="h-4 w-4" />
                  </span>
                )}
                {settings.socialLinks?.instagramEnabled && settings.socialLinks?.instagram && (
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 text-brand-200"
                    title="Instagram Profile"
                  >
                    <Instagram className="h-4 w-4" />
                  </span>
                )}
                {settings.socialLinks?.twitterEnabled && settings.socialLinks?.twitter && (
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 text-brand-200"
                    title="Twitter / X Profile"
                  >
                    <Twitter className="h-4 w-4" />
                  </span>
                )}
                {settings.socialLinks?.linkedinEnabled && settings.socialLinks?.linkedin && (
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 text-brand-200"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="h-4 w-4" />
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 border-t border-brand-800 pt-3 text-[11px] text-brand-300">
              Note: WhatsApp is intentionally excluded from the public footer social icons per organization design rules and is managed under the Offices &amp; WhatsApp tab.
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}

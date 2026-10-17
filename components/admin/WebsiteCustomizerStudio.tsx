"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  GripVertical,
  HelpCircle,
  Image as ImageIcon,
  Layers,
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
} from "lucide-react";
import {
  AMBIENT_TRACK_PRESETS,
  DEFAULT_CUSTOMIZER_SETTINGS,
  type CustomizerSettings,
  type SectionConfig,
  type CollagePhotoItem,
} from "@/config/customizer";

interface WebsiteCustomizerStudioProps {
  initialSettings: CustomizerSettings;
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

export function WebsiteCustomizerStudio({ initialSettings }: WebsiteCustomizerStudioProps) {
  const [settings, setSettings] = useState<CustomizerSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState<"sections" | "collage" | "audio" | "typing">("sections");
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Audio preview state inside admin
  const [testAudioPlaying, setTestAudioPlaying] = useState(false);
  const testAudioCtxRef = useState<AudioContext | null>(null);

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
    <div className="space-y-6">
      {/* Studio Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-brand-200 bg-white p-5 sm:p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
              <Sliders className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Customizer &amp; Studio</p>
              <h1 className="font-display text-2xl font-bold text-ink">Website &amp; Homepage Studio</h1>
            </div>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-ink-muted">
            Reorder homepage sections, manage the stylish photo collage, configure relaxing ambient audio, and customize live typing text.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-ink transition hover:bg-sand-50"
          >
            <span>View Public Site</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleReset}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-ink-muted hover:text-red-700 hover:border-red-200 hover:bg-red-50 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-2xs transition hover:bg-brand-800 disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>Save &amp; Publish Live</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Feedback Notification */}
      {statusMessage && (
        <div
          className={`flex items-center gap-2.5 rounded-xl border p-4 text-sm font-medium animate-fadeIn ${
            statusMessage.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          ) : (
            <HelpCircle className="h-5 w-5 text-red-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-line bg-white rounded-t-xl px-4 pt-2">
        {[
          { id: "sections", label: "Homepage Sections & Order", icon: Layers },
          { id: "collage", label: "Stylish Photo Collage & Imagery", icon: Camera },
          { id: "audio", label: "Relaxing Ambient Music & Sounds", icon: Music },
          { id: "typing", label: "Live Mission & Typing Ticker", icon: Type },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-semibold transition ${
                active
                  ? "border-brand-700 text-brand-800 bg-brand-50/50"
                  : "border-transparent text-ink-muted hover:text-ink hover:bg-sand-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

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
    </div>
  );
}

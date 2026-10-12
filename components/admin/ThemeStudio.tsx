"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  Handshake,
  HeartPulse,
  Layers,
  Palette,
  RotateCcw,
  Save,
  Sparkles,
  Type,
} from "lucide-react";
import {
  THEME_PRESETS,
  DEFAULT_THEME,
  themeToCssString,
  computeThemeCssVariables,
  type ThemeConfig,
  type ThemePresetId,
  type FontPairingId,
  type RadiusPreset,
  type ShadowPreset,
} from "@/config/themes";

export function ThemeStudio({ initialTheme }: { initialTheme: ThemeConfig }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(initialTheme);
  const [activePreset, setActivePreset] = useState<ThemePresetId>(
    (initialTheme.id as ThemePresetId) || "custom"
  );
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Apply real-time preview to DOM
  function applyLiveDom(theme: ThemeConfig) {
    const cssText = themeToCssString(theme);
    // @ts-expect-error global helper injected by ThemeScript
    if (typeof window !== "undefined" && window.__applyThemeCss) {
      // @ts-expect-error global helper
      window.__applyThemeCss(cssText);
    }
    // Store in localStorage for persistence across preview pages
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "bsgss_theme_preview",
        JSON.stringify({
          ...theme,
          cssString: cssText,
        })
      );
    }
  }

  // Switch to preset
  function selectPreset(presetId: Exclude<ThemePresetId, "custom">) {
    const preset = THEME_PRESETS[presetId];
    if (!preset) return;
    setActivePreset(presetId);
    setCurrentTheme({ ...preset });
    applyLiveDom(preset);
    setNotification({
      type: "success",
      message: `Selected preset: "${preset.name}". Preview updated. Click "Publish Site-wide" to make permanent.`,
    });
  }

  // Update specific property in custom mode
  function updateThemeProperty<K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) {
    setActivePreset("custom");
    const updated: ThemeConfig = {
      ...currentTheme,
      id: "custom",
      name: "Custom Theme",
      [key]: value,
    };
    setCurrentTheme(updated);
    applyLiveDom(updated);
  }

  // Publish to Database
  async function publishTheme() {
    setSaving(true);
    setNotification(null);
    try {
      const response = await fetch("/api/admin/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: currentTheme }),
      });
      const data = await response.json();
      if (!response.ok) {
        setNotification({
          type: "error",
          message: data.message || "Failed to publish theme.",
        });
      } else {
        setNotification({
          type: "success",
          message: "Theme successfully published site-wide! All visitors will now see these styles.",
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: "An unexpected error occurred while saving.",
      });
    } finally {
      setSaving(false);
    }
  }

  // Reset to BSGSS Signature
  async function resetTheme() {
    if (!confirm("Are you sure you want to reset the theme back to BSGSS original default?")) return;
    setSaving(true);
    setNotification(null);
    try {
      const response = await fetch("/api/admin/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset: true }),
      });
      if (response.ok) {
        setActivePreset("bsgss-classic");
        setCurrentTheme({ ...DEFAULT_THEME });
        applyLiveDom(DEFAULT_THEME);
        if (typeof window !== "undefined") {
          localStorage.removeItem("bsgss_theme_preview");
        }
        setNotification({
          type: "success",
          message: "Theme reset to original BSGSS default and published site-wide.",
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: "Failed to reset theme.",
      });
    } finally {
      setSaving(false);
    }
  }

  const computedVars = computeThemeCssVariables(currentTheme);

  return (
    <div className="space-y-10">
      {/* Notifications */}
      {notification && (
        <div
          role="alert"
          className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
            notification.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-semibold">
              {notification.type === "success" ? "Success" : "Error"}
            </p>
            <p className="mt-0.5">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-white p-5 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
            Active Theme
          </span>
          <h2 className="text-xl font-bold text-ink">
            {currentTheme.name}
            {activePreset === "custom" && (
              <span className="ml-2.5 inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200">
                Customized
              </span>
            )}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={resetTheme}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink transition hover:bg-sand-50 disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4 text-ink-muted" />
            Reset to Default
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink transition hover:bg-sand-50"
          >
            <Eye className="h-4 w-4 text-brand-700" />
            Preview Website
          </a>
          <button
            type="button"
            onClick={publishTheme}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-800 shadow-xs disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Publishing…" : "Publish Site-wide"}
          </button>
        </div>
      </div>

      {/* 1. Presets Selection Grid */}
      <section>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand-700" />
          <h3 className="font-display text-xl font-bold text-ink">
            1. Curated Theme Presets
          </h3>
        </div>
        <p className="mt-1 text-sm text-ink-muted">
          Select any expertly tuned institutional theme to instantly preview and test.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(THEME_PRESETS) as Array<Exclude<ThemePresetId, "custom">>).map(
            (presetKey) => {
              const preset = THEME_PRESETS[presetKey];
              const isSelected = activePreset === presetKey;

              return (
                <div
                  key={presetKey}
                  onClick={() => selectPreset(presetKey)}
                  className={`relative cursor-pointer rounded-xl border-2 p-4 transition ${
                    isSelected
                      ? "border-brand-700 bg-brand-50/40 shadow-sm"
                      : "border-line bg-white hover:border-brand-300 hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-ink text-sm sm:text-base">
                        {preset.name}
                      </h4>
                      <p className="mt-1 text-xs text-ink-muted leading-relaxed line-clamp-2">
                        {preset.description}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </div>

                  {/* Swatches */}
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className="h-6 w-6 rounded-md border border-black/10 shadow-2xs"
                      style={{ backgroundColor: preset.brandPrimary }}
                      title={`Primary: ${preset.brandPrimary}`}
                    />
                    <span
                      className="h-6 w-6 rounded-md border border-black/10 shadow-2xs"
                      style={{ backgroundColor: preset.brandSecondary }}
                      title={`Secondary: ${preset.brandSecondary}`}
                    />
                    <span
                      className="h-6 w-6 rounded-md border border-black/10 shadow-2xs"
                      style={{ backgroundColor: preset.canvas }}
                      title={`Canvas: ${preset.canvas}`}
                    />
                    <span
                      className="h-6 w-6 rounded-md border border-black/10 shadow-2xs"
                      style={{ backgroundColor: preset.line }}
                      title={`Line: ${preset.line}`}
                    />
                    <span className="ml-auto text-[11px] font-medium text-ink-muted uppercase">
                      {preset.radius} · {preset.shadow}
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* 2. Interactive Live Preview Sandbox */}
      <section className="rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Real-time Output
            </span>
            <h3 className="font-display text-xl font-bold text-ink">
              Interactive Design Sandbox
            </h3>
          </div>
          <span className="rounded-md bg-sand-50 px-2.5 py-1 text-xs font-semibold text-ink-muted border border-line">
            Renders with live CSS variables
          </span>
        </div>

        {/* Live Mockup Container */}
        <div
          className="mt-6 rounded-xl border p-6 transition-all"
          style={{
            backgroundColor: "var(--color-canvas)",
            borderColor: "var(--color-line)",
            color: "var(--color-ink)",
          }}
        >
          {/* Header Preview */}
          <div
            className="flex flex-wrap items-center justify-between gap-4 border-b pb-5"
            style={{ borderColor: "var(--color-line)" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white font-bold"
                style={{
                  backgroundColor: "var(--brand-700)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                BS
              </span>
              <div>
                <strong className="block text-sm sm:text-base font-bold">
                  Bisnouli Sarvodaya Gramodyog Sewa Sansthan
                </strong>
                <span className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
                  Grassroots Community Action · Since 1994
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: "var(--brand-50)",
                  color: "var(--brand-900)",
                  border: "1px solid var(--brand-200)",
                }}
              >
                Active Theme Demo
              </span>
            </div>
          </div>

          {/* Content Block */}
          <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: "var(--brand-700)" }}
              >
                Community Impact
              </p>
              <h4
                className="mt-2 font-display text-2xl font-bold leading-tight"
                style={{
                  color: "var(--color-ink)",
                  fontFamily: "var(--theme-font-display)",
                }}
              >
                Empowering women, youth, and communities across 5 states.
              </h4>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "var(--color-ink-muted)" }}
              >
                Every project connects healthcare, vocational training, and sustainable livelihood support with verified institutional transparency.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95"
                  style={{
                    backgroundColor: "var(--brand-700)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  Support Our Work <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition"
                  style={{
                    backgroundColor: "var(--brand-50)",
                    color: "var(--brand-900)",
                    border: "1px solid var(--brand-200)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  Explore Programmes
                </button>
              </div>
            </div>

            {/* Metric Cards Mockup */}
            <div className="grid gap-3">
              <div
                className="p-4"
                style={{
                  backgroundColor: "var(--color-mist)",
                  border: "1px solid var(--color-line)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-md"
                    style={{
                      backgroundColor: "var(--brand-100)",
                      color: "var(--brand-800)",
                    }}
                  >
                    <Handshake className="h-5 w-5" />
                  </span>
                  <div>
                    <strong className="block text-xl font-bold font-display">
                      30+
                    </strong>
                    <span className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
                      Institutional &amp; CSR Partners
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="p-4"
                style={{
                  backgroundColor: "var(--color-mist)",
                  border: "1px solid var(--color-line)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-md"
                    style={{
                      backgroundColor: "var(--sage-100)",
                      color: "var(--sage-700)",
                    }}
                  >
                    <HeartPulse className="h-5 w-5" />
                  </span>
                  <div>
                    <strong className="block text-xl font-bold font-display">
                      100,000+
                    </strong>
                    <span className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
                      Beneficiaries Supported
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Custom Theme Fine-Tuning */}
      <section className="rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-brand-700" />
          <h3 className="font-display text-xl font-bold text-ink">
            2. Custom Design &amp; Styling Controls
          </h3>
        </div>
        <p className="mt-1 text-sm text-ink-muted">
          Adjust brand colors, typography pairings, corner curvature, and shadow depth.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand Primary Color */}
          <div className="rounded-xl border border-line bg-sand-50/50 p-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
              Primary Brand Color
            </label>
            <p className="mt-0.5 text-xs text-ink-muted">
              Buttons, navigation highlights, badges
            </p>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="color"
                value={currentTheme.brandPrimary}
                onChange={(e) => updateThemeProperty("brandPrimary", e.target.value)}
                className="h-10 w-14 cursor-pointer rounded-md border border-line bg-white p-1"
              />
              <input
                type="text"
                value={currentTheme.brandPrimary}
                onChange={(e) => updateThemeProperty("brandPrimary", e.target.value)}
                className="h-10 flex-1 rounded-md border border-line bg-white px-3 font-mono text-xs uppercase text-ink outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
              />
            </div>
            {/* Quick Palettes */}
            <div className="mt-3 flex items-center gap-1.5">
              {["#236873", "#1E3A8A", "#065F46", "#9A3412", "#881337", "#0F172A"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => updateThemeProperty("brandPrimary", c)}
                  className="h-5 w-5 rounded-full border border-black/10 hover:scale-110 transition"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Secondary Color */}
          <div className="rounded-xl border border-line bg-sand-50/50 p-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
              Secondary / Accent Color
            </label>
            <p className="mt-0.5 text-xs text-ink-muted">
              Badges, secondary cards, icons
            </p>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="color"
                value={currentTheme.brandSecondary}
                onChange={(e) => updateThemeProperty("brandSecondary", e.target.value)}
                className="h-10 w-14 cursor-pointer rounded-md border border-line bg-white p-1"
              />
              <input
                type="text"
                value={currentTheme.brandSecondary}
                onChange={(e) => updateThemeProperty("brandSecondary", e.target.value)}
                className="h-10 flex-1 rounded-md border border-line bg-white px-3 font-mono text-xs uppercase text-ink outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
              />
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {["#4E7550", "#B45309", "#0D9488", "#78350F", "#475569", "#0284C7"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => updateThemeProperty("brandSecondary", c)}
                  className="h-5 w-5 rounded-full border border-black/10 hover:scale-110 transition"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Page Canvas Background */}
          <div className="rounded-xl border border-line bg-sand-50/50 p-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
              Canvas Background
            </label>
            <p className="mt-0.5 text-xs text-ink-muted">
              Main page body backdrop
            </p>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="color"
                value={currentTheme.canvas}
                onChange={(e) => updateThemeProperty("canvas", e.target.value)}
                className="h-10 w-14 cursor-pointer rounded-md border border-line bg-white p-1"
              />
              <input
                type="text"
                value={currentTheme.canvas}
                onChange={(e) => updateThemeProperty("canvas", e.target.value)}
                className="h-10 flex-1 rounded-md border border-line bg-white px-3 font-mono text-xs uppercase text-ink outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
              />
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {["#FCFBF8", "#FFFFFF", "#F8FAFC", "#FBFDFB", "#FCFAF6", "#FFFDF9"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => updateThemeProperty("canvas", c)}
                  className="h-5 w-5 rounded-full border border-black/20 hover:scale-110 transition"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Font Pairing */}
          <div className="rounded-xl border border-line bg-sand-50/50 p-4">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-muted">
              <Type className="h-4 w-4 text-brand-700" />
              Font Pairing
            </label>
            <p className="mt-0.5 text-xs text-ink-muted">
              Body &amp; Display typography combination
            </p>
            <select
              value={currentTheme.fontPairing}
              onChange={(e) =>
                updateThemeProperty("fontPairing", e.target.value as FontPairingId)
              }
              className="mt-3 h-10 w-full rounded-md border border-line bg-white px-3 text-xs font-medium text-ink outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
            >
              <option value="classic-editorial">
                Classic Editorial (Public Sans + Source Serif 4)
              </option>
              <option value="modern-grotesk">
                Modern Prestige (Inter + Playfair Display)
              </option>
              <option value="clean-geometric">
                Clean Geometric (Plus Jakarta Sans)
              </option>
              <option value="warm-humanist">
                Warm Humanist (Outfit + Merriweather)
              </option>
            </select>
          </div>

          {/* Border Radius */}
          <div className="rounded-xl border border-line bg-sand-50/50 p-4">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-muted">
              Corner Geometry (Radius)
            </label>
            <p className="mt-0.5 text-xs text-ink-muted">
              Cards, buttons, images curvature
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(["sharp", "balanced", "curved"] as RadiusPreset[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => updateThemeProperty("radius", r)}
                  className={`rounded-md border py-2 text-xs font-semibold capitalize transition ${
                    currentTheme.radius === r
                      ? "border-brand-700 bg-brand-700 text-white"
                      : "border-line bg-white text-ink hover:bg-sand-50"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Shadows / Depth */}
          <div className="rounded-xl border border-line bg-sand-50/50 p-4">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-muted">
              <Layers className="h-4 w-4 text-brand-700" />
              Shadow Depth &amp; Effects
            </label>
            <p className="mt-0.5 text-xs text-ink-muted">
              Card elevation and visual presence
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(["flat", "soft", "lifted"] as ShadowPreset[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => updateThemeProperty("shadow", s)}
                  className={`rounded-md border py-2 text-xs font-semibold capitalize transition ${
                    currentTheme.shadow === s
                      ? "border-brand-700 bg-brand-700 text-white"
                      : "border-line bg-white text-ink hover:bg-sand-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-xs text-ink-muted">
            All changes can be previewed immediately. Saving updates the live site for all users without restarting the application.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={publishTheme}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 shadow-xs disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Publishing…" : "Publish Site-wide"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

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
  DEFAULT_NEON_CARD_GLOW,
  themeToCssString,
  computeThemeCssVariables,
  type ThemeConfig,
  type ThemePresetId,
  type FontPairingId,
  type RadiusPreset,
  type ShadowPreset,
  type HeaderStyle,
  type HeroStyle,
  type PageHeaderStyle,
  type CardStyle,
  type DensityPreset,
  type NeonCardGlowConfig,
  type NeonGlowStyle,
  type NeonGlowIntensity,
  type NeonCornerPosition,
} from "@/config/themes";

export function ThemeStudio({ initialTheme }: { initialTheme: ThemeConfig }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(initialTheme);
  const [activePreset, setActivePreset] = useState<ThemePresetId>(
    (initialTheme.id as ThemePresetId) || "custom"
  );
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const currentNeon = currentTheme.cardNeonGlow ?? DEFAULT_NEON_CARD_GLOW;

  // Apply real-time preview to DOM
  function applyLiveDom(theme: ThemeConfig) {
    const cssText = themeToCssString(theme);
    // @ts-expect-error global helper injected by ThemeScript
    if (typeof window !== "undefined" && window.__applyThemeCss) {
      // @ts-expect-error global helper
      window.__applyThemeCss(cssText, theme);
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

  // Helper for updating neon card glow settings
  function updateNeonGlow(updates: Partial<NeonCardGlowConfig>) {
    const currentNeon = currentTheme.cardNeonGlow ?? DEFAULT_NEON_CARD_GLOW;
    const updatedNeon: NeonCardGlowConfig = {
      ...currentNeon,
      ...updates,
    };
    updateThemeProperty("cardNeonGlow", updatedNeon);
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
          Adjust brand colors, typography, shape and the shared layout treatment used across the public site.
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

          <DesignChoice
            title="Header Layout"
            description="Standard, compact or floating navigation shell"
            value={currentTheme.headerStyle ?? "standard"}
            choices={["standard", "compact", "floating"] as HeaderStyle[]}
            onChange={(value) => updateThemeProperty("headerStyle", value as HeaderStyle)}
          />

          <DesignChoice
            title="Home Hero Treatment"
            description="Choose the presentation of the homepage story and image"
            value={currentTheme.heroStyle ?? "immersive"}
            choices={["immersive", "framed", "editorial"] as HeroStyle[]}
            onChange={(value) => updateThemeProperty("heroStyle", value as HeroStyle)}
          />

          <DesignChoice
            title="Page Title Area"
            description="Control the introduction band across inner pages"
            value={currentTheme.pageHeaderStyle ?? "standard"}
            choices={["standard", "centred", "minimal"] as PageHeaderStyle[]}
            onChange={(value) => updateThemeProperty("pageHeaderStyle", value as PageHeaderStyle)}
          />

          <DesignChoice
            title="Programme & Activity Cards"
            description="Refine borders and elevation on shared content cards"
            value={currentTheme.cardStyle ?? "standard"}
            choices={["standard", "soft", "outlined"] as CardStyle[]}
            onChange={(value) => updateThemeProperty("cardStyle", value as CardStyle)}
          />

          <DesignChoice
            title="Header & Hero Spacing"
            description="Compact, balanced or more relaxed shared page rhythm"
            value={currentTheme.density ?? "comfortable"}
            choices={["compact", "comfortable", "spacious"] as DensityPreset[]}
            onChange={(value) => updateThemeProperty("density", value as DensityPreset)}
          />
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

      {/* 3. Luminous Card Border & Atmospheric Shadow Studio (Presentation Style) */}
      <section className="rounded-2xl border border-line bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-line pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                Presentation Card Style
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[0.6875rem] font-bold ${
                  currentNeon.enabled
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {currentNeon.enabled ? "🟢 Active on Public Cards" : "⚪ Disabled (Original Cards)"}
              </span>
            </div>
            <h3 className="mt-1 font-display text-xl font-bold text-ink">
              3. Luminous Card Border &amp; Atmospheric Shadow Option
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-ink-muted">
              Choose whether you want the glowing card effect from the presentation on or off across the website. Features an outer glowing border with atmospheric shadow radiating below each card.
            </p>
          </div>

          {/* Master Enable/Disable Toggle */}
          <div className="flex items-center gap-3 bg-sand-50 border border-line rounded-xl px-4 py-2.5 shrink-0">
            <div className="text-right">
              <div className="text-xs font-bold text-ink">
                {currentNeon.enabled ? "Card Effect is ON" : "Card Effect is OFF"}
              </div>
              <div className="text-[0.6875rem] text-ink-muted">
                {currentNeon.enabled ? "Glow & shadow active" : "Using standard clean cards"}
              </div>
            </div>
            <button
              type="button"
              onClick={() => updateNeonGlow({ enabled: !currentNeon.enabled })}
              aria-label={currentNeon.enabled ? "Turn Off Card Effect" : "Turn On Card Effect"}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                currentNeon.enabled ? "bg-emerald-600 ring-2 ring-emerald-500/30" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
                  currentNeon.enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Live Interactive Card Sandbox & Controls */}
        <div className="mt-6 grid gap-8 lg:grid-cols-12 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Color Swatches & Picker */}
            <div className="rounded-xl border border-line bg-sand-50/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Outer Border &amp; Below Shadow Color
                  </label>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    Color used for the 2px outer border and radiant lower atmospheric shadow
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                  {currentNeon.color || "#10b981"}
                </span>
              </div>

              {/* Swatch Grid */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {[
                  { name: "Emerald Green (Default)", color: "#10b981" },
                  { name: "Amber Gold (Reference)", color: "#ffaa00" },
                  { name: "Cyber Lime", color: "#22c55e" },
                  { name: "Electric Cyan", color: "#06b6d4" },
                  { name: "Royal Purple", color: "#8b5cf6" },
                  { name: "Coral Pink", color: "#f43f5e" },
                ].map((item) => (
                  <button
                    key={item.color}
                    type="button"
                    onClick={() => updateNeonGlow({ color: item.color })}
                    className={`group relative flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
                      (currentNeon.color || "#10b981").toLowerCase() === item.color.toLowerCase()
                        ? "border-emerald-700 bg-white shadow-xs ring-2 ring-emerald-500/40 text-ink"
                        : "border-line bg-white text-ink-muted hover:border-brand-300"
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full shadow-xs shrink-0"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
                    />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>

              {/* Custom Color Input */}
              <div className="mt-4 flex items-center gap-3 pt-3 border-t border-slate-200/60">
                <span className="text-xs font-medium text-ink-muted">Custom Hex:</span>
                <input
                  type="color"
                  value={currentNeon.color || "#10b981"}
                  onChange={(e) => updateNeonGlow({ color: e.target.value })}
                  className="h-8 w-12 cursor-pointer rounded border border-line bg-white p-0.5"
                />
                <input
                  type="text"
                  value={currentNeon.color || "#10b981"}
                  onChange={(e) => updateNeonGlow({ color: e.target.value })}
                  placeholder="#10b981"
                  className="h-8 w-32 rounded-md border border-line bg-white px-2.5 font-mono text-xs uppercase text-ink outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
                />
                <button
                  type="button"
                  onClick={() => updateNeonGlow({ color: "#10b981" })}
                  className="text-xs font-semibold text-emerald-700 hover:underline"
                >
                  Reset to Green Default
                </button>
              </div>
            </div>

            {/* Intensity Selection */}
            <div className="rounded-xl border border-line bg-sand-50/50 p-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">
                Shadow &amp; Glow Intensity
              </label>
              <p className="mt-0.5 text-xs text-ink-muted">
                Controls the spread and opacity of the atmospheric shadow below cards
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { id: "subtle", name: "Subtle", desc: "Soft ambient drop shadow" },
                  { id: "vibrant", name: "Vibrant", desc: "Balanced luminous glow" },
                  { id: "intense", name: "Intense", desc: "Deep high-contrast bloom" },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => updateNeonGlow({ intensity: lvl.id as NeonGlowIntensity })}
                    className={`flex flex-col text-left rounded-lg border p-3 transition ${
                      (currentNeon.intensity || "vibrant") === lvl.id
                        ? "border-emerald-600 bg-white text-ink shadow-xs ring-2 ring-emerald-500/30"
                        : "border-line bg-white text-ink-muted hover:bg-sand-50"
                    }`}
                  >
                    <span className="text-xs font-bold">{lvl.name}</span>
                    <span className="mt-0.5 text-[0.6875rem] text-ink-muted">{lvl.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Hover Checkbox */}
            <div className="rounded-xl border border-line bg-sand-50/50 p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-ink">Interactive Hover Elevation &amp; Lower Bloom</span>
                <p className="text-xs text-ink-muted">
                  Cards smoothly lift 5px and deepen their atmospheric glow underneath when hovered by the cursor.
                </p>
              </div>
              <input
                type="checkbox"
                checked={currentNeon.interactiveHover !== false}
                onChange={(e) => updateNeonGlow({ interactiveHover: e.target.checked })}
                className="h-4 w-4 rounded border-line text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Live Interactive Sandbox Card (Matches Presentation Reference Design) */}
          <div className="lg:col-span-5 bg-sand-50/80 rounded-2xl border border-line p-6 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">
                Live Card Sandbox (Try Hovering)
              </span>
              <span
                className="text-[0.6875rem] font-mono font-bold px-2 py-0.5 rounded"
                style={{
                  backgroundColor: currentNeon.enabled ? `${currentNeon.color || "#10b981"}22` : "#f1f5f9",
                  color: currentNeon.enabled ? (currentNeon.color || "#10b981") : "#64748b",
                }}
              >
                {currentNeon.enabled ? "Effect: ON" : "Effect: OFF"}
              </span>
            </div>

            {/* Presentation Spec Sample Card */}
            <div
              className="w-full max-w-sm rounded-[20px] bg-white p-3.5 transition-all duration-300 cursor-pointer select-none group"
              style={{
                border: currentNeon.enabled
                  ? `2px solid ${currentNeon.color || "#10b981"}`
                  : "1px solid #e2e8f0",
                boxShadow: currentNeon.enabled
                  ? `0 0 0 1px ${currentNeon.color || "#10b981"}66, 0 8px 24px -4px ${currentNeon.color || "#10b981"}88, 0 18px 36px -8px ${currentNeon.color || "#10b981"}44, 0 4px 12px rgba(0, 0, 0, 0.04)`
                  : "0 1px 3px rgba(0,0,0,0.05)",
                transform: "translateY(0px)",
              }}
              onMouseEnter={(e) => {
                if (currentNeon.enabled && currentNeon.interactiveHover !== false) {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = `0 0 0 1.5px ${currentNeon.color || "#10b981"}cc, 0 14px 32px -2px ${currentNeon.color || "#10b981"}aa, 0 24px 48px -10px ${currentNeon.color || "#10b981"}66, 0 8px 16px rgba(0, 0, 0, 0.06)`;
                }
              }}
              onMouseLeave={(e) => {
                if (currentNeon.enabled) {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${currentNeon.color || "#10b981"}66, 0 8px 24px -4px ${currentNeon.color || "#10b981"}88, 0 18px 36px -8px ${currentNeon.color || "#10b981"}44, 0 4px 12px rgba(0, 0, 0, 0.04)`;
                } else {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                }
              }}
            >
              {/* Media Container at Top with Rounded Corners */}
              <div className="aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/bsgss/healthcare-camps/149-camp1.jpeg"
                  alt="Rural Healthcare Clinic"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title & Body Below Image */}
              <div className="p-3 text-center">
                <span
                  className="text-[0.6875rem] font-bold uppercase tracking-wider block mb-1"
                  style={{ color: currentNeon.enabled ? (currentNeon.color || "#10b981") : "#236873" }}
                >
                  Healthcare Outreach
                </span>
                <h4 className="font-display text-sm font-bold text-ink leading-snug">
                  Mobile Cancer Screening &amp; Diagnostic Camp
                </h4>
              </div>
            </div>

            {/* Sandbox Details */}
            <div className="mt-6 w-full space-y-2 border-t border-slate-200/70 pt-4 text-xs text-ink-muted">
              <div className="flex justify-between">
                <span>Card Status:</span>
                <span className="font-bold text-ink">
                  {currentNeon.enabled ? "Enabled on Cards" : "Disabled (Original)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Selected Glow Color:</span>
                <span className="font-mono font-bold text-ink">{currentNeon.color || "#10b981"}</span>
              </div>
              <div className="flex justify-between">
                <span>Shadow Intensity:</span>
                <span className="font-semibold capitalize text-ink">
                  {currentNeon.intensity || "vibrant"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Save & Publish Button */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <p className="text-xs text-ink-muted">
            Click <strong>Publish Card Effect Site-wide</strong> to save and apply this setting across all public cards.
          </p>
          <button
            type="button"
            onClick={publishTheme}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 shadow-xs disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Publishing…" : "Publish Card Effect Site-wide"}
          </button>
        </div>
      </section>
    </div>
  );
}

function DesignChoice({
  title,
  description,
  value,
  choices,
  onChange,
}: {
  title: string;
  description: string;
  value: string;
  choices: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-xl border border-line bg-sand-50/50 p-4">
      <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted">{title}</label>
      <p className="mt-0.5 text-xs text-ink-muted">{description}</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {choices.map((choice) => (
          <button
            key={choice}
            type="button"
            onClick={() => onChange(choice)}
            className={`rounded-md border px-1 py-2 text-[0.6875rem] font-semibold capitalize transition sm:text-xs ${
              value === choice
                ? "border-brand-700 bg-brand-700 text-white"
                : "border-line bg-white text-ink hover:bg-sand-50"
            }`}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

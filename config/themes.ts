/**
 * BSGSS Theme System
 * Defines theme presets, custom configuration schemas, and color palette generators.
 */

export type ThemePresetId =
  | "bsgss-classic"
  | "royal-indigo"
  | "emerald-hope"
  | "terracotta-earth"
  | "crimson-sand"
  | "modern-slate"
  | "custom";

export type FontPairingId =
  | "classic-editorial" // Public Sans + Source Serif 4
  | "modern-grotesk"    // Inter + Playfair Display
  | "clean-geometric"   // Plus Jakarta Sans
  | "warm-humanist";    // Outfit + Merriweather

export type RadiusPreset = "sharp" | "balanced" | "curved";
export type ShadowPreset = "flat" | "soft" | "lifted";

export type ThemeConfig = {
  id: ThemePresetId;
  name: string;
  description: string;
  brandPrimary: string;    // Base brand color (e.g. #236873)
  brandSecondary: string;  // Base secondary/accent color (e.g. #4E7550)
  canvas: string;          // Page background (e.g. #FCFBF8)
  mist: string;            // Card subtle background (e.g. #F5F9F9)
  ink: string;             // Primary text color (e.g. #1B2326)
  inkMuted: string;        // Muted text color (e.g. #52616A)
  line: string;            // Border line color (e.g. #B9DDE0)
  fontPairing: FontPairingId;
  radius: RadiusPreset;
  shadow: ShadowPreset;
  // Optional full overrides
  customPalette?: {
    brand50?: string;
    brand100?: string;
    brand200?: string;
    brand300?: string;
    brand500?: string;
    brand600?: string;
    brand700?: string;
    brand800?: string;
    brand900?: string;
    sage50?: string;
    sage100?: string;
    sage200?: string;
    sage600?: string;
    sage700?: string;
  };
};

export const THEME_PRESETS: Record<Exclude<ThemePresetId, "custom">, ThemeConfig> = {
  "bsgss-classic": {
    id: "bsgss-classic",
    name: "BSGSS Signature (Ocean & Sage)",
    description: "The trusted original identity with calm teal, sage green, and warm ivory canvas.",
    brandPrimary: "#236873",
    brandSecondary: "#4E7550",
    canvas: "#FCFBF8",
    mist: "#F5F9F9",
    ink: "#1B2326",
    inkMuted: "#52616A",
    line: "#B9DDE0",
    fontPairing: "classic-editorial",
    radius: "balanced",
    shadow: "soft",
    customPalette: {
      brand50: "#F0F8F8",
      brand100: "#DDEEEF",
      brand200: "#B9DDE0",
      brand300: "#85C1C7",
      brand500: "#3B8E98",
      brand600: "#2D7D88",
      brand700: "#236873",
      brand800: "#195560",
      brand900: "#123F48",
      sage50: "#F3F6F1",
      sage100: "#E3EBDF",
      sage200: "#C6D6C0",
      sage600: "#4E7550",
      sage700: "#3D5E40",
    },
  },
  "royal-indigo": {
    id: "royal-indigo",
    name: "Royal Heritage Indigo",
    description: "Prestigious national institutional look with deep imperial indigo, gold ochre, and slate borders.",
    brandPrimary: "#1E3A8A",
    brandSecondary: "#B45309",
    canvas: "#F8FAFC",
    mist: "#F1F5F9",
    ink: "#0F172A",
    inkMuted: "#475569",
    line: "#CBD5E1",
    fontPairing: "modern-grotesk",
    radius: "balanced",
    shadow: "lifted",
  },
  "emerald-hope": {
    id: "emerald-hope",
    name: "Emerald Forest & Vitality",
    description: "Grassroots energy, environmental sustainability, and rural health empowerment.",
    brandPrimary: "#065F46",
    brandSecondary: "#0D9488",
    canvas: "#FBFDFB",
    mist: "#F0FDF4",
    ink: "#14281D",
    inkMuted: "#3D604D",
    line: "#A7F3D0",
    fontPairing: "classic-editorial",
    radius: "curved",
    shadow: "soft",
  },
  "terracotta-earth": {
    id: "terracotta-earth",
    name: "Terracotta & Gramodyog Khadi",
    description: "Warm artisan rust, rural handicrafts, handloom warmth, and organic desert tones.",
    brandPrimary: "#9A3412",
    brandSecondary: "#78350F",
    canvas: "#FCFAF6",
    mist: "#FFF7ED",
    ink: "#271E19",
    inkMuted: "#6B584E",
    line: "#FED7AA",
    fontPairing: "warm-humanist",
    radius: "curved",
    shadow: "soft",
  },
  "crimson-sand": {
    id: "crimson-sand",
    name: "Noble Crimson & Heritage Sand",
    description: "Dignified deep crimson with sandstone warmth, ideal for high-impact social ceremonies.",
    brandPrimary: "#881337",
    brandSecondary: "#B45309",
    canvas: "#FFFDF9",
    mist: "#FFF1F2",
    ink: "#24181B",
    inkMuted: "#664850",
    line: "#FECDD3",
    fontPairing: "classic-editorial",
    radius: "balanced",
    shadow: "lifted",
  },
  "modern-slate": {
    id: "modern-slate",
    name: "Modern CSR Clean Slate",
    description: "Ultra-sharp high-clarity slate navy with electric cyan accents and minimal lines.",
    brandPrimary: "#0F172A",
    brandSecondary: "#0284C7",
    canvas: "#FFFFFF",
    mist: "#F8FAFC",
    ink: "#020617",
    inkMuted: "#334155",
    line: "#E2E8F0",
    fontPairing: "clean-geometric",
    radius: "sharp",
    shadow: "flat",
  },
};

export const DEFAULT_THEME = THEME_PRESETS["bsgss-classic"];

/**
 * Color math helpers: convert hex to RGB and blend with white/black to generate full 50-900 palettes
 */
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "").trim();
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  return (
    "#" +
    [clamp(r), clamp(g), clamp(b)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
  );
}

function mix(c1: [number, number, number], c2: [number, number, number], weight: number): string {
  const r = c1[0] * (1 - weight) + c2[0] * weight;
  const g = c1[1] * (1 - weight) + c2[1] * weight;
  const b = c1[2] * (1 - weight) + c2[2] * weight;
  return rgbToHex(r, g, b);
}

/**
 * Generates brand 50-900 shades from a single primary hex color.
 */
export function generateBrandPalette(primaryHex: string) {
  const rgb = hexToRgb(primaryHex);
  const white: [number, number, number] = [255, 255, 255];
  const black: [number, number, number] = [0, 0, 0];

  return {
    50: mix(rgb, white, 0.94),
    100: mix(rgb, white, 0.86),
    200: mix(rgb, white, 0.72),
    300: mix(rgb, white, 0.52),
    500: mix(rgb, white, 0.18),
    600: mix(rgb, white, 0.08),
    700: primaryHex,
    800: mix(rgb, black, 0.22),
    900: mix(rgb, black, 0.38),
  };
}

/**
 * Generates secondary (sage) shades from a secondary hex color.
 */
export function generateSecondaryPalette(secHex: string) {
  const rgb = hexToRgb(secHex);
  const white: [number, number, number] = [255, 255, 255];
  const black: [number, number, number] = [0, 0, 0];

  return {
    50: mix(rgb, white, 0.93),
    100: mix(rgb, white, 0.84),
    200: mix(rgb, white, 0.70),
    600: secHex,
    700: mix(rgb, black, 0.20),
  };
}

/**
 * Generates the complete CSS variables dictionary for a given ThemeConfig.
 */
export function computeThemeCssVariables(theme: ThemeConfig): Record<string, string> {
  const brand =
    theme.customPalette?.brand700 && theme.customPalette?.brand50
      ? {
          50: theme.customPalette.brand50,
          100: theme.customPalette.brand100 || theme.customPalette.brand50,
          200: theme.customPalette.brand200 || theme.line,
          300: theme.customPalette.brand300 || theme.brandPrimary,
          500: theme.customPalette.brand500 || theme.brandPrimary,
          600: theme.customPalette.brand600 || theme.brandPrimary,
          700: theme.customPalette.brand700 || theme.brandPrimary,
          800: theme.customPalette.brand800 || theme.brandPrimary,
          900: theme.customPalette.brand900 || theme.brandPrimary,
        }
      : generateBrandPalette(theme.brandPrimary);

  const sage =
    theme.customPalette?.sage600 && theme.customPalette?.sage50
      ? {
          50: theme.customPalette.sage50,
          100: theme.customPalette.sage100 || theme.customPalette.sage50,
          200: theme.customPalette.sage200 || theme.line,
          600: theme.customPalette.sage600 || theme.brandSecondary,
          700: theme.customPalette.sage700 || theme.brandSecondary,
        }
      : generateSecondaryPalette(theme.brandSecondary);

  // Border radius map
  const radiusMap: Record<RadiusPreset, { sm: string; md: string; lg: string; xl: string; "2xl": string }> = {
    sharp: { sm: "2px", md: "4px", lg: "6px", xl: "8px", "2xl": "10px" },
    balanced: { sm: "6px", md: "8px", lg: "10px", xl: "14px", "2xl": "16px" },
    curved: { sm: "8px", md: "12px", lg: "16px", xl: "20px", "2xl": "24px" },
  };

  // Shadow map
  const shadowMap: Record<ShadowPreset, { soft: string; lift: string }> = {
    flat: {
      soft: "0 1px 2px rgba(0, 0, 0, 0.05)",
      lift: "0 2px 4px rgba(0, 0, 0, 0.08)",
    },
    soft: {
      soft: "0 1px 2px rgba(16, 40, 48, 0.04), 0 2px 8px rgba(16, 40, 48, 0.04)",
      lift: "0 4px 20px rgba(16, 40, 48, 0.08)",
    },
    lifted: {
      soft: "0 2px 6px rgba(15, 23, 42, 0.06), 0 4px 12px rgba(15, 23, 42, 0.06)",
      lift: "0 10px 30px -4px rgba(15, 23, 42, 0.12)",
    },
  };

  // Font family variables
  const fontMap: Record<FontPairingId, { sans: string; display: string }> = {
    "classic-editorial": {
      sans: 'var(--font-sans), "Public Sans", -apple-system, sans-serif',
      display: 'var(--font-display), "Source Serif 4", Georgia, serif',
    },
    "modern-grotesk": {
      sans: '"Inter", var(--font-sans), system-ui, sans-serif',
      display: '"Playfair Display", var(--font-display), Georgia, serif',
    },
    "clean-geometric": {
      sans: '"Plus Jakarta Sans", var(--font-sans), system-ui, sans-serif',
      display: '"Plus Jakarta Sans", var(--font-sans), system-ui, sans-serif',
    },
    "warm-humanist": {
      sans: '"Outfit", var(--font-sans), system-ui, sans-serif',
      display: '"Merriweather", var(--font-display), Georgia, serif',
    },
  };

  const currentRadius = radiusMap[theme.radius] ?? radiusMap.balanced;
  const currentShadow = shadowMap[theme.shadow] ?? shadowMap.soft;
  const currentFonts = fontMap[theme.fontPairing] ?? fontMap["classic-editorial"];

  return {
    "--brand-50": brand[50],
    "--brand-100": brand[100],
    "--brand-200": brand[200],
    "--brand-300": brand[300],
    "--brand-500": brand[500],
    "--brand-600": brand[600],
    "--brand-700": brand[700],
    "--brand-800": brand[800],
    "--brand-900": brand[900],

    "--sage-50": sage[50],
    "--sage-100": sage[100],
    "--sage-200": sage[200],
    "--sage-600": sage[600],
    "--sage-700": sage[700],

    "--color-canvas": theme.canvas,
    "--color-mist": theme.mist,
    "--color-ink": theme.ink,
    "--color-ink-muted": theme.inkMuted,
    "--color-line": theme.line,

    "--radius-sm": currentRadius.sm,
    "--radius-md": currentRadius.md,
    "--radius-lg": currentRadius.lg,
    "--radius-xl": currentRadius.xl,
    "--radius-2xl": currentRadius["2xl"],

    "--shadow-soft": currentShadow.soft,
    "--shadow-lift": currentShadow.lift,

    "--theme-font-sans": currentFonts.sans,
    "--theme-font-display": currentFonts.display,
  };
}

/**
 * Returns stringified CSS declarations suitable for embedding in a style block or script.
 */
export function themeToCssString(theme: ThemeConfig): string {
  const vars = computeThemeCssVariables(theme);
  return Object.entries(vars)
    .map(([prop, val]) => `${prop}: ${val};`)
    .join(" ");
}

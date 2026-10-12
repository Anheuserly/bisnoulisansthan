import type { Config } from "tailwindcss";

/**
 * BSGSS dynamic design tokens.
 * Powered by CSS custom properties with default fallbacks for instant theming.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" } },
    extend: {
      colors: {
        brand: {
          50: "var(--brand-50, #F0F8F8)",
          100: "var(--brand-100, #DDEEEF)",
          200: "var(--brand-200, #B9DDE0)",
          300: "var(--brand-300, #85C1C7)",
          500: "var(--brand-500, #3B8E98)",
          600: "var(--brand-600, #2D7D88)",
          700: "var(--brand-700, #236873)",
          800: "var(--brand-800, #195560)",
          900: "var(--brand-900, #123F48)",
        },
        sage: {
          50: "var(--sage-50, #F3F6F1)",
          100: "var(--sage-100, #E3EBDF)",
          200: "var(--sage-200, #C6D6C0)",
          600: "var(--sage-600, #4E7550)",
          700: "var(--sage-700, #3D5E40)",
        },
        canvas: "var(--color-canvas, #FCFBF8)",
        mist: "var(--color-mist, #F5F9F9)",
        ink: {
          DEFAULT: "var(--color-ink, #1B2326)",
          muted: "var(--color-ink-muted, #52616A)",
          subtle: "var(--color-ink-subtle, #7A878E)",
        },
        line: "var(--color-line, #B9DDE0)",
        success: "#1E7B4B",
        warning: "#9A6200",
        danger: "#B42318",
      },
      fontFamily: {
        sans: ["var(--theme-font-sans)", "var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--theme-font-display)", "var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        "display-lg": ["clamp(2.5rem, 4.6vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 3.4vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
      },
      borderRadius: {
        DEFAULT: "var(--radius-sm, 6px)",
        sm: "var(--radius-sm, 6px)",
        md: "var(--radius-md, 8px)",
        lg: "var(--radius-lg, 10px)",
        xl: "var(--radius-xl, 14px)",
        "2xl": "var(--radius-2xl, 16px)",
      },
      boxShadow: {
        soft: "var(--shadow-soft, 0 1px 2px rgba(16, 40, 48, 0.04), 0 2px 8px rgba(16, 40, 48, 0.04))",
        lift: "var(--shadow-lift, 0 4px 20px rgba(16, 40, 48, 0.08))",
      },
      maxWidth: { prose: "68ch" },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: { rise: "rise 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both" },
    },
  },
  plugins: [],
};

export default config;

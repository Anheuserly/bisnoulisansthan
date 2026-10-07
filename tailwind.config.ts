import type { Config } from "tailwindcss";

/**
 * BSGSS design tokens.
 * A calm teal, sage and warm-white palette for clear, trustworthy community communication.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" } },
    extend: {
      colors: {
        brand: {
          50: "#EEF6F7",
          100: "#D6EAEC",
          200: "#ADD4D9",
          300: "#7DB8C0",
          500: "#1F7A86",
          600: "#176571",
          700: "#12525C",
          800: "#0E414A",
          900: "#0A3038",
        },
        sage: {
          50: "#F3F6F1",
          100: "#E3EBDF",
          200: "#C6D6C0",
          600: "#4E7550",
          700: "#3D5E40",
        },
        canvas: "#FBFAF7",
        mist: "#F2F6F7",
        ink: { DEFAULT: "#1B2326", muted: "#52616A", subtle: "#7A878E" },
        line: "#E3E7E8",
        success: "#1E7B4B",
        warning: "#9A6200",
        danger: "#B42318",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        "display-lg": ["clamp(2.5rem, 4.6vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 3.4vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
      },
      borderRadius: { DEFAULT: "6px", md: "8px", lg: "10px", xl: "14px" },
      boxShadow: {
        soft: "0 1px 2px rgba(16, 40, 48, 0.04), 0 2px 8px rgba(16, 40, 48, 0.04)",
        lift: "0 4px 20px rgba(16, 40, 48, 0.08)",
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

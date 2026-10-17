import type { Metadata, Viewport } from "next";
import { Public_Sans, Source_Serif_4 } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { site } from "@/config/site";
import { organisationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getActiveTheme } from "@/lib/theme/get-active-theme";
import { ThemeScript } from "@/components/theme/ThemeScript";
import "./globals.css";

const sans = Public_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bisnouli Sarvodaya | Community Development Since 1994",
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: site.name,
    title: "Bisnouli Sarvodaya | Community Development Since 1994",
    description: site.description,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${site.name} - Community Development Since 1994`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bisnouli Sarvodaya | Community Development Since 1994",
    description: site.description,
    images: [`${SITE_URL}/og-image.jpg`],
  },
  formatDetection: { telephone: true, address: true, email: true },
  icons: { icon: "/images/bsgss/branding/11-cropped-logo-1.jpg" },
};

export const viewport: Viewport = {
  themeColor: "#0E414A",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const activeTheme = await getActiveTheme();

  return (
    <html
      lang="en-IN"
      className={`${sans.variable} ${display.variable}`}
      data-header-style={activeTheme.headerStyle ?? "standard"}
      data-hero-style={activeTheme.heroStyle ?? "immersive"}
      data-page-header-style={activeTheme.pageHeaderStyle ?? "standard"}
      data-card-style={activeTheme.cardStyle ?? "standard"}
    >
      <head>
        <ThemeScript initialTheme={activeTheme} />
      </head>
      <body className="min-h-screen font-sans">
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-brand-800 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        {children}
        <JsonLd data={organisationJsonLd()} />
      </body>
    </html>
  );
}

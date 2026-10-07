import type { Metadata, Viewport } from "next";
import { Public_Sans, Source_Serif_4 } from "next/font/google";
import { site } from "@/config/site";
import { organisationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const sans = Public_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#0E414A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${display.variable}`}>
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

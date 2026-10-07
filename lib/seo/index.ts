import type { Metadata } from "next";
import { fullAddress, site } from "@/config/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}

/** Builds consistent, unique per-page metadata with canonical + OG + Twitter tags. */
export function buildMetadata({ title, description, path, noIndex }: PageMeta): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url,
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

/** Organisation structured data — public BSGSS contact details only. */
export function organisationJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.name,
    url: site.url,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
      ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
    },
  };
  if (site.contact.phone) data.telephone = site.contact.phone;
  if (site.contact.email) data.email = site.contact.email;
  const sameAs = site.social.filter((s) => s.enabled).map((s) => s.url);
  if (sameAs.length) data.sameAs = sameAs;
  return data;
}

export function breadcrumbJsonLd(
  items: Array<{ name?: string; label?: string; path?: string; href?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name ?? item.label ?? "",
      item: new URL(item.path ?? item.href ?? "/", site.url).toString(),
    })),
  };
}

/** Aliases for consistent naming across page components */
export const buildOrganisationSchema = organisationJsonLd;
export const buildBreadcrumbSchema = breadcrumbJsonLd;

export { fullAddress };

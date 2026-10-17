import type { Metadata } from "next";
import { fullAddress, site } from "@/config/site";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  ogImage?: string;
}

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Builds consistent, unique per-page metadata with canonical + OG + Twitter tags.
 * Ensures the canonical always points to the production SITE_URL origin.
 */
export function buildMetadata({
  title,
  description,
  path,
  noIndex,
  ogImage,
}: PageMeta): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = ogImage || DEFAULT_OG_IMAGE;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${site.name} - Community Development Since 1994`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
        },
  };
}

/**
 * Unified JSON-LD structured data combining Organization/NGO and WebSite.
 * Uses real, verified statutory registrations (Society Reg, MCA CSR-1, NITI Aayog Darpan).
 */
export function rootJsonLd() {
  const sameAs = site.social.filter((s) => s.enabled).map((s) => s.url);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["NGO", "NonprofitOrganization"],
        "@id": `${SITE_URL}/#organization`,
        name: site.name,
        alternateName: site.shortName,
        url: SITE_URL,
        logo: `${SITE_URL}/images/bsgss/branding/11-cropped-logo-1.jpg`,
        image: DEFAULT_OG_IMAGE,
        description: site.description,
        foundingDate: "1994",
        address: {
          "@type": "PostalAddress",
          streetAddress: `${site.address.line1}, ${site.address.line2}`,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.countryCode,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.contact.phone || "+91-11-46548002",
          email: site.contact.email || "bsgssindia@yahoo.co.in",
          contactType: "administrative and donor relations",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
        sameAs: sameAs.length > 0 ? sameAs : undefined,
        identifier: [
          {
            "@type": "PropertyValue",
            name: "Societies Registration Act XXI of 1860",
            value: site.facts.registrationNumber,
          },
          {
            "@type": "PropertyValue",
            name: "MCA CSR-1 Registration Number",
            value: site.facts.csrRegistrationNumber,
          },
          {
            "@type": "PropertyValue",
            name: "NITI Aayog NGO Darpan Unique ID",
            value: site.facts.nitiAayogDarpanId,
          },
          {
            "@type": "PropertyValue",
            name: "Income Tax Act 1961 Exemption",
            value: site.facts.taxExemption,
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        alternateName: site.shortName,
        description: site.description,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "en-IN",
      },
    ],
  };
}

/** Legacy alias for backward compatibility */
export const organisationJsonLd = rootJsonLd;
export const buildOrganisationSchema = rootJsonLd;

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
      item: absoluteUrl(item.path ?? item.href ?? "/"),
    })),
  };
}

export const buildBreadcrumbSchema = breadcrumbJsonLd;

export { fullAddress };

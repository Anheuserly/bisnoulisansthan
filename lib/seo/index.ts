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
          email: site.contact.email || "bisnoulisansthan@gmail.com",
          contactType: "administrative and donor relations",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Delhi NCR" },
          { "@type": "State", name: "Uttar Pradesh" },
          { "@type": "State", name: "Haryana" },
          { "@type": "State", name: "Punjab" },
          { "@type": "State", name: "Rajasthan" },
          { "@type": "State", name: "Chhattisgarh" },
          { "@type": "State", name: "Uttarakhand" },
        ],
        location: [
          {
            "@type": "Place",
            name: "BSGSS Registered Office — Noida",
            address: {
              "@type": "PostalAddress",
              streetAddress: "B-180, Sector-31, Near Community Centre",
              addressLocality: "Noida",
              addressRegion: "Uttar Pradesh",
              postalCode: "201301",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 28.5752,
              longitude: 77.3452,
            },
          },
          {
            "@type": "Place",
            name: "BSGSS Administrative Office — New Delhi",
            address: {
              "@type": "PostalAddress",
              streetAddress: "A-171, Ground Floor, Defence Colony",
              addressLocality: "New Delhi",
              addressRegion: "Delhi",
              postalCode: "110024",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 28.5726,
              longitude: 77.2325,
            },
          },
        ],
        member: [
          {
            "@type": "Person",
            name: "Vijay Kumar Jha",
            jobTitle: "Patron (Ex-IPS)",
          },
          {
            "@type": "Person",
            name: "Nandita Bakshi",
            jobTitle: "Chief Executive Officer (Ex-IRS)",
          },
        ],
        knowsAbout: [
          "Corporate Social Responsibility (CSR) Schedule VII Implementation",
          "Women Empowerment & Village Self-Help Groups (SHGs)",
          "Mobile Healthcare & Cancer Screening Camps",
          "Vocational Skill Development & Tailoring Training",
          "Khadi & Handloom Rural Livelihoods",
          "Rural Elementary Education & Digital Literacy",
        ],
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

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Generates Schema.org FAQPage JSON-LD for Google Rich Results and AI/GEO Q&A engines.
 */
export function faqJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Generates Schema.org Product JSON-LD for individual SHG handcrafted products.
 */
export function productJsonLd(product: {
  name: string;
  description: string;
  image: string;
  slug: string;
  tag: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `${product.description} Handcrafted by rural women self-help group (SHG) artisans supported by Bisnouli Sarvodaya Gramodyog Sewa Sansthan (BSGSS).`,
    category: product.tag,
    image: absoluteUrl(product.image),
    url: absoluteUrl(`/activities/shg-products/${product.slug}`),
    brand: {
      "@type": "Brand",
      name: "BSGSS Women SHG Collective",
    },
    manufacturer: {
      "@id": `${SITE_URL}/#organization`,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      url: absoluteUrl(`/activities/shg-products/${product.slug}`),
      seller: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  };
}

/**
 * Generates Schema.org ItemList of VideoObject entries for Google Video search indexing.
 */
export function videoListJsonLd(
  videos: readonly { id: string; title: string; thumbnail: string; publishedAt?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: videos.slice(0, 20).map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: video.title,
        description: `${video.title} — Field documentary video by Bisnouli Sarvodaya Gramodyog Sewa Sansthan (BSGSS).`,
        thumbnailUrl: [video.thumbnail],
        uploadDate: video.publishedAt || "2025-01-01T00:00:00+05:30",
        embedUrl: `https://www.youtube.com/embed/${video.id}`,
        contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
    })),
  };
}

export { fullAddress };

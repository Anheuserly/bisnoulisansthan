import type { OpeningHours, SocialLink } from "@/types";
import { SITE_URL } from "@/lib/site";
import { content } from "./content";

const env = (key: string): string | null => {
  const value = process.env[key];
  return value && value.trim() ? value.trim() : null;
};

/** Public information imported from bisnoulisansthan.in. */
export const site = {
  name: "Bisnouli Sarvodaya Gramodyog Sewa Sansthan",
  shortName: "BSGSS",
  url: SITE_URL,
  description: content.site.description,
  address: {
    line1: "B-180, Sector–31", line2: "Noida – 201301", locality: "Noida", district: "Gautam Buddha Nagar",
    region: "Uttar Pradesh", country: "India", countryCode: "IN", postalCode: "201301",
  },
  contact: {
    phone: env("NEXT_PUBLIC_BSGSS_PHONE") ?? "011-46548002/03", emergencyPhone: null,
    email: env("NEXT_PUBLIC_BSGSS_EMAIL") ?? "bsgssindia@yahoo.co.in", whatsapp: env("NEXT_PUBLIC_BSGSS_WHATSAPP"),
  },
  maps: { embedUrl: env("NEXT_PUBLIC_MAPS_EMBED_URL"), directionsUrl: env("NEXT_PUBLIC_MAPS_DIRECTIONS_URL") },
  hours: [] as OpeningHours[],
  ownership: [
    { name: "Vijay Kumar Jha", relation: "Ex-IPS · Chairperson, BSGSS" },
    { name: "Nandita Bakshi", relation: "Ex-IRS · CEO, BSGSS" },
  ],
  facts: {
    established: 1994,
    registrationNumber: "226/1994-95",
    csrRegistrationNumber: "CSR00001405",
    nitiAayogDarpanId: "DL/2016/0111645",
    taxExemption: "Section 12A & 80G (IT Act 1961)",
    accreditations: ["Societies Registration Act XXI of 1860", "MCA CSR-1", "NITI Aayog NGO Darpan"] as string[],
  },
  social: [
    { platform: "youtube", label: "YouTube", url: content.site.social.youtube, enabled: true },
    { platform: "facebook", label: "Facebook", url: content.site.social.facebook, enabled: true },
    { platform: "instagram", label: "Instagram", url: content.site.social.instagram, enabled: true },
    { platform: "twitter", label: "Twitter", url: content.site.social.twitter, enabled: true },
  ] as SocialLink[],
} as const;

export const fullAddress = [site.address.line1, site.address.line2, `${site.address.locality}, ${site.address.region}`, site.address.country].join(", ");
const mapQuery = encodeURIComponent(fullAddress);
export const mapEmbedUrl = site.maps.embedUrl ?? `https://www.google.com/maps?q=${mapQuery}&output=embed`;
export const directionsUrl = site.maps.directionsUrl ?? `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export { SITE_URL } from "@/lib/site";

import { links } from "./content";

export const mainNav = [
  { label: "Home", href: links.home }, { label: "About", href: links.about }, { label: "Our work", href: links.work },
  { label: "Activities", href: links.activities }, { label: "Impact", href: links.impact }, { label: "Join us", href: links.join }, { label: "Contact", href: links.contact },
] as const;

export const aboutNav = [
  { label: "About us", href: "/about", description: "Mission, purpose and leadership" },
  { label: "Our story", href: "/about/our-story", description: "The journey since 1994" },
  { label: "Management", href: "/management", description: "Messages from BSGSS leadership" },
  { label: "Legal status", href: "/about/legal-status", description: "Registrations and public documents" },
  { label: "Our partners", href: "/about/partners", description: "Partners in social development" },
] as const;

export const legalNav = [{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }] as const;

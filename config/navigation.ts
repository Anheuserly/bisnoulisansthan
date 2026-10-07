export const mainNav = [
  { label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Our work", href: "/our-work" },
  { label: "Activities", href: "/activities" }, { label: "Impact", href: "/impact" }, { label: "Contact", href: "/contact" },
] as const;

export const aboutNav = [
  { label: "About BSGSS", href: "/about", description: "Mission, purpose and leadership" },
  { label: "Our story", href: "/about/our-story", description: "The journey since 1994" },
  { label: "Legal status", href: "/about/legal-status", description: "Registrations and public documents" },
  { label: "Our partners", href: "/about/partners", description: "Partners in social development" },
] as const;

export const legalNav = [{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }] as const;

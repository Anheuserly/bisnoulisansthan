"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Activity, ArrowRight, BookOpen, ChevronDown, FileCheck2, HandHeart, Handshake, Heart, HeartPulse, Image as ImageIcon, MapPin, Menu, Phone, Route, Search, ShoppingBag, Users, X } from "lucide-react";
import { aboutNav, mainNav } from "@/config/navigation";
import { directionsUrl, site, telHref } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { Logo } from "./Logo";
import { LinkButton } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<MegaMenuKey | null>(null);
  const [query, setQuery] = useState("");
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change.
  useEffect(() => {
    setOpen(false);
    setMegaOpen(null);
  }, [pathname]);

  // Drawer: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(drawerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const phone = site.contact.phone;
  const results = searchItems.filter((item) => `${item.title} ${item.keywords}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <header
      onMouseLeave={() => setMegaOpen(null)}
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-200",
        scrolled ? "border-b border-line bg-white/95 shadow-soft backdrop-blur" : "border-b border-transparent bg-canvas",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.slice(1).map((item) => {
              const megaLabel = isMegaMenu(item.label) ? item.label : null;
              return <li key={item.href}>
                {megaLabel ? <button type="button" onMouseEnter={() => { setMegaOpen(megaLabel); setSearchOpen(false); }} onFocus={() => setMegaOpen(megaLabel)} onClick={() => setMegaOpen((value) => value === megaLabel ? null : megaLabel)} aria-expanded={megaOpen === megaLabel} aria-haspopup="dialog" className={cn("inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-[0.9375rem] font-medium transition-colors", isActive(item.href) || megaOpen === megaLabel ? "text-brand-700" : "text-ink-muted hover:text-ink")}>
                  {item.label} <ChevronDown className={cn("h-4 w-4 transition-transform", megaOpen === megaLabel && "rotate-180")} />
                </button> : <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={cn("rounded-md px-2.5 py-2 text-[0.9375rem] font-medium transition-colors", isActive(item.href) ? "text-brand-700" : "text-ink-muted hover:text-ink")}>{item.label}</Link>}
              </li>;
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {phone && (
            <a
              href={telHref(phone)}
              className="hidden h-11 items-center gap-2 rounded-md px-3 text-sm font-semibold text-brand-800 hover:bg-brand-50 md:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>{phone}</span>
            </a>
          )}
          <LinkButton href="/#support" className="hidden sm:inline-flex">
            <Heart className="h-4 w-4" aria-hidden="true" />
            Support us
          </LinkButton>
          <button type="button" onClick={() => { setSearchOpen((value) => !value); setQuery(""); setMegaOpen(null); }} className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-brand-50" aria-label="Search this website" aria-expanded={searchOpen} aria-controls="site-search">
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-brand-50 xl:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="hidden xl:block">
        {megaOpen && <MegaMenu menu={megaMenus[megaOpen]} onNavigate={() => setMegaOpen(null)} />}
      </div>

      {searchOpen && (
        <div id="site-search" className="absolute inset-x-0 top-full border-b border-line bg-white shadow-lift">
          <div className="mx-auto max-w-6xl px-5 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") setSearchOpen(false); }} placeholder="Search programmes, impact, gallery, ways to help…" className="h-11 min-w-0 flex-1 rounded-md border border-line bg-sand-50 px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-brand-600 focus:ring-2 focus:ring-brand-100" />
              <button type="button" onClick={() => setSearchOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-brand-50" aria-label="Close search"><X className="h-5 w-5" aria-hidden="true" /></button>
            </div>
            <div className="mt-3 grid gap-1 sm:grid-cols-2">
              {results.slice(0, 6).map((item) => <Link key={item.href} href={item.href} onClick={() => setSearchOpen(false)} className="rounded-md px-3 py-2.5 text-sm hover:bg-brand-50"><span className="block font-semibold text-ink">{item.title}</span><span className="block text-xs text-ink-muted">{item.description}</span></Link>)}
              {results.length === 0 && <p className="px-3 py-2 text-sm text-ink-muted">No matching pages yet. Try “education”, “health”, “donate”, or “gallery”.</p>}
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 xl:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn("absolute inset-0 bg-brand-900/40 transition-opacity duration-200", open ? "opacity-100" : "opacity-0")}
          onClick={() => setOpen(false)}
        />
        <div
          id="mobile-nav"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-lift transition-transform duration-200 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
            <Logo />
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-brand-50"
              aria-label="Close menu"
              tabIndex={open ? 0 : -1}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
            <ul>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center rounded-md px-3 text-[1.0625rem] font-medium",
                      isActive(item.href) ? "bg-brand-50 text-brand-800" : "text-ink hover:bg-mist",
                    )}
                  >
                    {item.label}
                  </Link>
                  {mobileSubNavigation[item.label]?.length ? <ul className="ml-4 border-l border-line py-1">{(mobileSubNavigation[item.label] ?? []).map((subItem) => <li key={subItem.href}><Link href={subItem.href} tabIndex={open ? 0 : -1} className="flex min-h-10 items-center px-3 text-sm font-medium text-ink-muted hover:text-brand-700">{subItem.label}</Link></li>)}</ul> : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-2 border-t border-line p-5">
            <LinkButton href="/#support" size="lg" className="w-full" tabIndex={open ? 0 : -1}>
              <Heart className="h-5 w-5" aria-hidden="true" />
              Support us
            </LinkButton>
            <div className="grid grid-cols-2 gap-2">
              {phone ? (
                <LinkButton href={telHref(phone)} variant="secondary" tabIndex={open ? 0 : -1}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call
                </LinkButton>
              ) : (
                <LinkButton href="/contact" variant="secondary" tabIndex={open ? 0 : -1}>
                  Contact
                </LinkButton>
              )}
              <LinkButton href={directionsUrl} variant="secondary" tabIndex={open ? 0 : -1}>
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Directions
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

type MegaMenuKey = "About" | "Our work" | "Activities" | "Impact";

const megaMenus = {
  About: {
    eyebrow: "About BSGSS",
    title: "A community-led organisation, rooted in practical action.",
    description: "Learn about BSGSS, the journey since 1994, public registrations and the institutions that have supported our work.",
    href: "/about",
    cta: "Explore About BSGSS",
    feature: { icon: FileCheck2, title: "Transparency, made accessible", description: "Registrations, certificates and public documents in one place.", href: "/about/legal-status" },
    columns: [
      { title: "Discover", links: [{ label: "Our story", description: "The BSGSS journey since 1994.", href: "/about/our-story", icon: Route }, { label: "Legal status", description: "Registration and compliance documents.", href: "/about/legal-status", icon: FileCheck2 }] },
      { title: "Connect", links: [{ label: "Our partners", description: "CSR and institutional partnerships.", href: "/about/partners", icon: Handshake }, { label: "Contact BSGSS", description: "Speak with our team.", href: "/contact", icon: MapPin }] },
    ],
  },
  "Our work": {
    eyebrow: "What we do",
    title: "Integrated work that supports stronger, more self-reliant communities.",
    description: "BSGSS brings education, healthcare, livelihood pathways and women’s empowerment together around everyday community needs.",
    href: "/our-work",
    cta: "Explore our work",
    feature: { icon: HandHeart, title: "Work with BSGSS", description: "Explore CSR, institutional and community collaboration.", href: "/contact" },
    columns: [
      { title: "Programme areas", links: [{ label: "Education & digital inclusion", description: "Learning support and digital literacy.", href: "/our-work", icon: BookOpen }, { label: "Healthcare & awareness", description: "Camps, prevention and access-oriented outreach.", href: "/our-work", icon: HeartPulse }] },
      { title: "Economic opportunity", links: [{ label: "Skills & livelihoods", description: "Vocational pathways towards income.", href: "/our-work", icon: HandHeart }, { label: "Women’s empowerment", description: "Agency, self-help and economic opportunity.", href: "/our-work", icon: Users }] },
    ],
  },
  Activities: {
    eyebrow: "Activities & media",
    title: "See community work, skills and creativity in action.",
    description: "Explore programme moments and handmade products created through women’s self-help groups supported by BSGSS.",
    href: "/activities",
    cta: "Explore all activities",
    feature: { icon: ShoppingBag, title: "SHG products", description: "Handmade products that support women’s livelihoods and enterprise.", href: "/activities/shg-products" },
    columns: [
      { title: "Explore", links: [{ label: "Activity gallery", description: "Programme, training and outreach moments.", href: "/activities/gallery", icon: ImageIcon }, { label: "Programme activities", description: "Community, health, education and youth initiatives.", href: "/activities", icon: Activity }] },
      { title: "Community enterprise", links: [{ label: "SHG products", description: "Handmade items created by women’s self-help groups.", href: "/activities/shg-products", icon: ShoppingBag }, { label: "Partner stories", description: "See the partnerships behind community work.", href: "/about/partners", icon: Handshake }] },
    ],
  },
  Impact: {
    eyebrow: "Impact",
    title: "Useful change that communities can carry forward.",
    description: "See the outcomes BSGSS works towards—from access and awareness to livelihoods, women’s agency and community participation.",
    href: "/impact",
    cta: "Explore our impact",
    feature: { icon: Activity, title: "See work in action", description: "View programme moments, camps and community activity.", href: "/activities" },
    columns: [
      { title: "Impact overview", links: [{ label: "How we measure progress", description: "Practical outcomes beyond a one-time intervention.", href: "/impact", icon: Activity }, { label: "Our reach", description: "People reached through BSGSS programmes.", href: "/#impact", icon: Users }] },
      { title: "Explore the evidence", links: [{ label: "Activities in action", description: "A visual view of programmes and outreach.", href: "/activities", icon: Route }, { label: "Partner stories", description: "Programme focus and locations by CSR partner.", href: "/about/partners", icon: Handshake }] },
    ],
  },
} as const;

function isMegaMenu(label: string): label is MegaMenuKey {
  return label === "About" || label === "Our work" || label === "Activities" || label === "Impact";
}

function MegaMenu({ menu, onNavigate }: { menu: (typeof megaMenus)[MegaMenuKey]; onNavigate: () => void }) {
  const FeatureIcon = menu.feature.icon;
  return (
    <section role="dialog" aria-label={`${menu.eyebrow} navigation`} className="mega-menu-panel absolute inset-x-0 top-full z-50 border-y border-line bg-white shadow-lift">
      <div className="mx-auto grid max-w-6xl grid-cols-[1.05fr_1fr_1fr_.9fr] gap-8 px-8 py-8">
        <div className="border-r border-line pr-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-700">{menu.eyebrow}</p>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink">{menu.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{menu.description}</p>
          <Link href={menu.href} onClick={onNavigate} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-900">{menu.cta} <ArrowRight className="h-4 w-4" /></Link>
        </div>
        {menu.columns.map((column) => <div key={column.title}><p className="text-xs font-bold uppercase tracking-[.16em] text-ink-muted">{column.title}</p><div className="mt-3 space-y-1">{column.links.map((link) => { const Icon = link.icon; return <Link key={link.label} href={link.href} onClick={onNavigate} className="group flex gap-3 rounded-lg p-3 transition hover:bg-brand-50"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700 transition group-hover:bg-white"><Icon className="h-4 w-4" /></span><span><span className="block text-sm font-semibold text-ink">{link.label}</span><span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">{link.description}</span></span></Link>; })}</div></div>)}
        <Link href={menu.feature.href} onClick={onNavigate} className="group rounded-xl border border-brand-200 bg-brand-50 p-5 text-ink shadow-sm transition hover:border-brand-300 hover:bg-brand-100 hover:shadow-md"><FeatureIcon className="h-6 w-6 text-brand-700" /><p className="mt-6 font-display text-xl font-bold text-ink">{menu.feature.title}</p><p className="mt-2 text-sm leading-relaxed text-ink-muted">{menu.feature.description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>
      </div>
    </section>
  );
}

const searchItems = [
  { title: "About BSGSS", href: "/about", description: "Our purpose, mission and leadership.", keywords: "history mission leadership organisation" },
  { title: "Our story", href: "/about/our-story", description: "The BSGSS journey since 1994.", keywords: "history journey timeline bisnouli" },
  { title: "Legal status", href: "/about/legal-status", description: "Registrations, certificates and public documents.", keywords: "legal status mca csr 12a 80g ngo darpan gst registration" },
  { title: "Our partners", href: "/about/partners", description: "CSR and government partners.", keywords: "csr corporate government funders partnership" },
  { title: "Our work", href: "/our-work", description: "Education, healthcare, skills and women’s empowerment.", keywords: "education health livelihood training women microfinance" },
  { title: "Activities", href: "/activities", description: "Community programmes in action.", keywords: "photos events camps activities gallery" },
  { title: "Activity gallery", href: "/activities/gallery", description: "Programme, training and outreach moments.", keywords: "photos gallery community healthcare education events" },
  { title: "SHG products", href: "/activities/shg-products", description: "Handmade products created by women’s self-help groups.", keywords: "shg products handmade shawl muffler women livelihood enterprise" },
  { title: "Impact", href: "/impact", description: "How BSGSS creates change.", keywords: "beneficiaries outcomes statistics reach" },
  { title: "Support BSGSS", href: "/#support", description: "Donate, partner or volunteer.", keywords: "donate contribution csr volunteer internship partnership" },
  { title: "Contact us", href: "/contact", description: "Office, phone and email details.", keywords: "address phone email noida" },
];

const mobileSubNavigation: Record<string, Array<{ label: string; href: string }>> = {
  About: aboutNav.slice(1),
  Activities: [{ label: "Activity gallery", href: "/activities/gallery" }, { label: "SHG products", href: "/activities/shg-products" }],
};

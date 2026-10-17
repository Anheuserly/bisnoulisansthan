import Link from "next/link";
import {
  Facebook,
  FileText,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { directionsUrl, fullAddress, site, telHref } from "@/config/site";
import { content, links } from "@/config/content";
import { Logo } from "./Logo";
import { SoundToggle } from "./SoundToggle";

export function Footer() {
  const year = new Date().getFullYear();
  const social = content.site.social;

  return (
    <footer className="bg-brand-900 text-brand-100 print:hidden">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2">
            <Logo inverted />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-200">{content.site.footerDescription}</p>
            <Link href={links.support} className="mt-6 inline-flex rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-brand-900 hover:bg-sand-100 transition">Support BSGSS</Link>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[.14em] text-brand-300">Follow & Connect</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800/90 text-brand-200 transition hover:bg-red-600 hover:text-white"
                  title="YouTube"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800/90 text-brand-200 transition hover:bg-[#1877F2] hover:text-white"
                  title="Facebook"
                  aria-label="Facebook Page"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800/90 text-brand-200 transition hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white"
                  title="Instagram"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800/90 text-brand-200 transition hover:bg-black hover:text-white"
                  title="Twitter / X"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800/90 text-brand-200 transition hover:bg-[#25D366] hover:text-white"
                  title="WhatsApp"
                  aria-label="Connect on WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <FooterColumn title="Explore">
            <FooterLink href="/about">About BSGSS</FooterLink><FooterLink href="/about/our-story">Our story</FooterLink><FooterLink href="/management">Management</FooterLink><FooterLink href="/about/legal-status">Legal status</FooterLink><FooterLink href="/our-work">Our work</FooterLink><FooterLink href="/activities">Activities</FooterLink><FooterLink href="/activities/key-programmes">Our Key Programmes</FooterLink><FooterLink href="/activities/gallery">Photo gallery</FooterLink><FooterLink href="/activities/videos">Videos</FooterLink><FooterLink href="/activities/work-in-media">Work in media</FooterLink><FooterLink href="/activities/shg-products">SHG products</FooterLink><FooterLink href="/activities-under-state-central-government">Government programmes</FooterLink><FooterLink href="/impact">Impact</FooterLink><FooterLink href="/about/partners">Our partners</FooterLink><FooterLink href="/join-us">Join us</FooterLink>
          </FooterColumn>
          <FooterColumn title="Get involved">
            <FooterLink href="/sponsor">Sponsor a skill</FooterLink><FooterLink href="/support">Support us</FooterLink><FooterLink href="/contact">Volunteer with us</FooterLink><FooterLink href="/contact">Internships</FooterLink><FooterLink href="/contact">CSR partnerships</FooterLink><FooterLink href="/contact">Institutional partnerships</FooterLink>
          </FooterColumn>
          <FooterColumn title="Transparency">
            <FooterLink href="/transparency">Open Books &amp; Public Ledger</FooterLink><FooterLink href="/about/legal-status">Registration &amp; compliance</FooterLink><FooterLink href="/about/legal-status">12A &amp; 80G documents</FooterLink><FooterLink href="/about/legal-status">CSR-1 registration</FooterLink><FooterLink href="/documents/bsgss-funding-partners-2024.pdf">Funding partners list</FooterLink><FooterLink href="/about/legal-status">All public documents</FooterLink>
          </FooterColumn>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Contact</h2>
            <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-brand-200">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-white"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" /><span>{fullAddress}</span></a>
              <a href={telHref(site.contact.phone)} className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 shrink-0 text-brand-300" />{site.contact.phone}</a>
              <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white"><MessageCircle className="h-4 w-4 shrink-0 text-brand-300" />WhatsApp Chat</a>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 shrink-0 text-brand-300" />{site.contact.email}</a>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-brand-800 pt-6 text-xs text-brand-300 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>
            <a
              href={content.site.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300 hover:text-white hover:underline underline-offset-2 transition-colors"
            >
              {content.site.developerCredit}
            </a>
          </p>
          <div className="flex items-center gap-3">
            <SoundToggle variant="footer" />
            <a href="mailto:bsgssindia@yahoo.co.in?subject=Document%20request" className="inline-flex items-center gap-2 hover:text-white"><FileText className="h-4 w-4" />Request public documents or reports</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">{title}</h2><ul className="mt-4 space-y-2.5 text-sm text-brand-200">{children}</ul></div>;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <li><Link href={href} className="hover:text-white">{children}</Link></li>;
}

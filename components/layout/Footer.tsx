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
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2">
            <Logo inverted size="xlarge" />
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
              </div>
            </div>
          </div>

          <FooterColumn title="Explore">
            <FooterLink href="/about">About BSGSS</FooterLink>
            <FooterLink href="/about/our-story">Our Story</FooterLink>
            <FooterLink href="/management">Management</FooterLink>
            <FooterLink href="/impact">Audited Impact</FooterLink>
            <FooterLink href="/about/partners">Our Partners</FooterLink>
            <FooterLink href="/join-us">Join Our Team</FooterLink>
          </FooterColumn>
          <FooterColumn title="Programmes & Media">
            <FooterLink href="/activities/key-programmes">Key Programmes</FooterLink>
            <FooterLink href="/activities-under-state-central-government">Govt Programmes</FooterLink>
            <FooterLink href="/activities/gallery">Photo Moments</FooterLink>
            <FooterLink href="/activities/videos">Video Archives</FooterLink>
            <FooterLink href="/activities/work-in-media">Press & Media</FooterLink>
            <FooterLink href="/activities/shg-products">SHG Khadi Products</FooterLink>
          </FooterColumn>
          <FooterColumn title="Get Involved">
            <FooterLink href="/support">Support BSGSS</FooterLink>
            <FooterLink href="/sponsor">Sponsor a Skill</FooterLink>
            <FooterLink href="/contact">Volunteer With Us</FooterLink>
            <FooterLink href="/contact">Student Internships</FooterLink>
            <FooterLink href="/contact">CSR Alliances</FooterLink>
            <FooterLink href="/transparency">Public Ledger</FooterLink>
          </FooterColumn>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Contact &amp; Offices</h2>
            <div className="mt-4 space-y-4 text-xs sm:text-sm text-brand-200">
              {/* Registered Office */}
              <div className="border-l-2 border-brand-400/80 pl-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-300">Registered Office</p>
                <p className="mt-0.5 text-xs text-brand-100">Village &amp; Post Bisnouli, Tehsil Dadri, Gautam Buddha Nagar, UP – 203207</p>
              </div>

              {/* Administrative Office */}
              <div className="border-l-2 border-brand-400/80 pl-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-300">Admin &amp; Head Office</p>
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-0.5 block text-xs text-brand-100 hover:text-white hover:underline">
                  B-180, Sector–31, Noida, Gautam Buddha Nagar, UP – 201301
                </a>
              </div>

              {/* Direct channels */}
              <div className="space-y-1.5 pt-1 text-xs">
                <a href={telHref(site.contact.phone)} className="flex items-center gap-2 hover:text-white"><Phone className="h-3.5 w-3.5 shrink-0 text-brand-300" />{site.contact.phone}</a>
                <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 hover:text-white"><Mail className="h-3.5 w-3.5 shrink-0 text-brand-300" />{site.contact.email}</a>
              </div>
            </div>
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

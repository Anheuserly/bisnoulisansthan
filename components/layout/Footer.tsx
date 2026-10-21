import Link from "next/link";
import {
  Facebook,
  FileText,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { directionsUrl, fullAddress, site, telHref } from "@/config/site";
import { content, links } from "@/config/content";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";
import { Logo } from "./Logo";
import { SoundToggle } from "./SoundToggle";

export async function Footer() {
  const year = new Date().getFullYear();
  const customizer = await getCustomizerSettings();
  const social = customizer.socialLinks;
  const { registeredOffice, adminOffice } = customizer.offices;

  const regAddressParts = [
    registeredOffice.line1,
    registeredOffice.line2,
    registeredOffice.city,
    registeredOffice.state && registeredOffice.pincode
      ? `${registeredOffice.state} – ${registeredOffice.pincode}`
      : registeredOffice.state || registeredOffice.pincode,
  ].filter(Boolean);
  const regAddressString = regAddressParts.join(", ");

  const adminAddressParts = [
    adminOffice.line1,
    adminOffice.line2,
    adminOffice.city,
    adminOffice.state && adminOffice.pincode
      ? `${adminOffice.state} – ${adminOffice.pincode}`
      : adminOffice.state || adminOffice.pincode,
  ].filter(Boolean);
  const adminAddressString = adminAddressParts.join(", ");

  const activePhone = adminOffice.phone || registeredOffice.phone || site.contact.phone;
  const activeEmail = adminOffice.email || registeredOffice.email || site.contact.email || "bisnoulisansthan@gmail.com";

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
                {social.youtubeEnabled && social.youtube && (
                  <a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 text-brand-200 transition hover:bg-brand-700 hover:text-white"
                    title="YouTube Channel"
                    aria-label="YouTube Channel"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                )}
                {social.facebookEnabled && social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 text-brand-200 transition hover:bg-brand-700 hover:text-white"
                    title="Facebook Page"
                    aria-label="Facebook Page"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {social.instagramEnabled && social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 text-brand-200 transition hover:bg-brand-700 hover:text-white"
                    title="Instagram Profile"
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {social.twitterEnabled && social.twitter && (
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 text-brand-200 transition hover:bg-brand-700 hover:text-white"
                    title="Twitter / X Profile"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {social.linkedinEnabled && social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 text-brand-200 transition hover:bg-brand-700 hover:text-white"
                    title="LinkedIn Profile"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
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
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-300">
                  {registeredOffice.title || "Registered Office"}
                </p>
                {registeredOffice.mapsUrl ? (
                  <a
                    href={registeredOffice.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-xs text-brand-100 hover:text-white hover:underline"
                  >
                    {regAddressString}
                  </a>
                ) : (
                  <p className="mt-0.5 text-xs text-brand-100">{regAddressString}</p>
                )}
              </div>

              {/* Administrative Office */}
              <div className="border-l-2 border-brand-400/80 pl-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-300">
                  {adminOffice.title || "Administrative Office"}
                </p>
                {adminOffice.mapsUrl ? (
                  <a
                    href={adminOffice.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-xs text-brand-100 hover:text-white hover:underline"
                  >
                    {adminAddressString}
                  </a>
                ) : (
                  <p className="mt-0.5 text-xs text-brand-100">{adminAddressString}</p>
                )}
              </div>

              {/* Direct channels */}
              <div className="space-y-1.5 pt-1 text-xs">
                {activePhone && (
                  <a href={telHref(activePhone)} className="flex items-center gap-2 hover:text-white">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-brand-300" />
                    {activePhone}
                  </a>
                )}
                {activeEmail && (
                  <a href={`mailto:${activeEmail}`} className="flex items-center gap-2 hover:text-white">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-brand-300" />
                    {activeEmail}
                  </a>
                )}
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

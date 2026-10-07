import Link from "next/link";
import { FileText, Mail, MapPin, Phone } from "lucide-react";
import { directionsUrl, fullAddress, site, telHref } from "@/config/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2">
            <Logo inverted />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-200">A voluntary organisation advancing education, healthcare, skills and women’s empowerment through practical, community-led development since 1994.</p>
            <Link href="/#support" className="mt-6 inline-flex rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-brand-900 hover:bg-sand-100">Support BSGSS</Link>
          </div>

          <FooterColumn title="Explore">
            <FooterLink href="/about">About BSGSS</FooterLink><FooterLink href="/about/our-story">Our story</FooterLink><FooterLink href="/about/legal-status">Legal status</FooterLink><FooterLink href="/our-work">Our work</FooterLink><FooterLink href="/activities">Activities</FooterLink><FooterLink href="/impact">Impact</FooterLink><FooterLink href="/about/partners">Our partners</FooterLink>
          </FooterColumn>
          <FooterColumn title="Get involved">
            <FooterLink href="/#support">Donate</FooterLink><FooterLink href="/contact">Volunteer with us</FooterLink><FooterLink href="/contact">Internships</FooterLink><FooterLink href="/contact">CSR partnerships</FooterLink><FooterLink href="/contact">Institutional partnerships</FooterLink>
          </FooterColumn>
          <FooterColumn title="Transparency">
            <FooterLink href="/about/legal-status">Registration & compliance</FooterLink><FooterLink href="/about/legal-status">12A & 80G documents</FooterLink><FooterLink href="/about/legal-status">CSR-1 registration</FooterLink><FooterLink href="/documents/bsgss-funding-partners-2024.pdf">Funding partners list</FooterLink><FooterLink href="/about/legal-status">All public documents</FooterLink>
          </FooterColumn>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Contact</h2>
            <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-brand-200">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-white"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" /><span>{fullAddress}</span></a>
              <a href={telHref(site.contact.phone)} className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 shrink-0 text-brand-300" />{site.contact.phone}</a>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 shrink-0 text-brand-300" />{site.contact.email}</a>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-brand-800 pt-6 text-xs text-brand-300 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <a href="mailto:bsgssindia@yahoo.co.in?subject=Document%20request" className="inline-flex items-center gap-2 hover:text-white"><FileText className="h-4 w-4" />Request public documents or reports</a>
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

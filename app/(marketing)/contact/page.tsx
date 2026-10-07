import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { directionsUrl, fullAddress, site, telHref } from "@/config/site";

export const metadata: Metadata = { title: "Contact BSGSS", description: "Contact Bisnouli Sarvodaya Gramodyog Sewa Sansthan for partnerships, volunteering and donations." };

export default function ContactPage() {
  return <div className="bg-sand-50 py-16 sm:py-24"><div className="mx-auto max-w-4xl px-5 md:px-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">Get involved</p><h1 className="mt-3 font-display text-4xl font-bold text-ink">Contact BSGSS</h1><p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted">For partnerships, volunteer registration or donations, please contact Bisnouli Sarvodaya Gramodyog Sewa Sansthan.</p><div className="mt-10 grid gap-5 md:grid-cols-3"><a className="rounded-xl border border-line bg-white p-6 text-ink hover:border-brand-500" href={directionsUrl}><MapPin className="h-5 w-5 text-brand-700" /><h2 className="mt-4 font-semibold">Visit us</h2><p className="mt-2 text-sm leading-relaxed text-ink-muted">{fullAddress}</p></a><a className="rounded-xl border border-line bg-white p-6 text-ink hover:border-brand-500" href={telHref(site.contact.phone)}><Phone className="h-5 w-5 text-brand-700" /><h2 className="mt-4 font-semibold">Call us</h2><p className="mt-2 text-sm text-ink-muted">{site.contact.phone}</p></a><a className="rounded-xl border border-line bg-white p-6 text-ink hover:border-brand-500" href={`mailto:${site.contact.email}`}><Mail className="h-5 w-5 text-brand-700" /><h2 className="mt-4 font-semibold">Email us</h2><p className="mt-2 text-sm break-all text-ink-muted">{site.contact.email}</p></a></div></div></div>;
}

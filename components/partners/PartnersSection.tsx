import { PartnerLogoWall } from "./PartnerLogoWall";

export function PartnersSection() {
  return <section className="overflow-hidden bg-brand-100 py-16 sm:py-24"><div className="mx-auto max-w-6xl px-5 md:px-8"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Together in change</p><h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Our partners in social development</h2><p className="mt-5 leading-relaxed text-ink-muted">Institutions whose support has strengthened BSGSS programmes over the years.</p></div><div className="mt-12 rounded-2xl bg-brand-200/50 p-3 shadow-inner sm:p-5"><PartnerLogoWall /></div><p className="mt-6 text-center text-xs leading-relaxed text-ink-muted">Select a logo to read its partnership profile. Logos are reproduced from the BSGSS funding-partners document; hover over a column to pause its movement.</p></div></section>;
}

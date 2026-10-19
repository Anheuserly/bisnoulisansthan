import { PartnerLogoWall } from "./PartnerLogoWall";

export function PartnersSection() {
  return (
    <section className="overflow-hidden bg-sand-50/80 py-8 sm:py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Together in change</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
            Our partners in social development
          </h2>
          <p className="mt-2 max-w-xl mx-auto text-xs leading-relaxed text-ink-muted sm:text-sm">
            Institutions whose support has strengthened BSGSS programmes over the years.
          </p>
        </div>
        <div className="mt-8 border-t border-line/80 pt-6">
          <PartnerLogoWall />
        </div>
        <p className="mt-4 text-center text-xs leading-relaxed text-ink-muted">
          Select a logo to read its partnership profile. Logos are reproduced from the BSGSS funding-partners document; hover over a column to pause its movement.
        </p>
      </div>
    </section>
  );
}

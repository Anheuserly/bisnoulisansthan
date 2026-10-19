import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Heart,
  HeartHandshake,
  Receipt,
  Scissors,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { getSponsorTiers } from "@/lib/sponsor-tiers";

export const metadata: Metadata = buildMetadata({
  title: "Sponsor a Skill | Tiered Micro-Giving | BSGSS",
  description:
    "Fund a rural woman's vocational tailoring education, supplies, or sewing machine through transparent tiered micro-giving with Section 80G tax deduction.",
  path: "/sponsor",
});

function formatInr(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

export default function SponsorPage() {
  const tiers = getSponsorTiers();

  return (
    <>
      <PageHeader
        title="Sponsor-a-Skill Micro-Giving"
        lead="Direct, tangible sponsorship packages that fund vocational training days, course materials, and livelihood tools for rural women."
        crumbs={[
          { name: "Support", path: "/support" },
          { name: "Sponsor a Skill", path: "/sponsor" },
        ]}
      />

      <div className="pt-8 pb-16 sm:pt-10 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-12">
          {/* Mission & Guarantee Banner */}
          <section className="border-t-2 border-brand-850 pt-6">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
                  <Scissors className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  <span>Vocational Independence</span>
                </div>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink">
                  Every rupee creates measurable artisan agency.
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Unlike opaque generic funds, BSGSS Sponsor-a-Skill tiers map directly to concrete training costs—from single practice days to durable mechanical sewing machines that anchor household income for years.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-ink-muted">
                  <span className="flex items-center gap-1.5 text-brand-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                    <span>Eligible for Section 80G (50% Tax Deduction)</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-brand-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                    <span>Instant Shareable Impact Receipt Card</span>
                  </span>
                </div>
              </div>

              <div className="border-t border-line pt-4 md:border-t-0 md:border-l md:border-line md:pl-6 space-y-3">
                <div className="flex items-center gap-2 text-brand-800">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  <h3 className="font-display text-base font-bold text-ink">
                    100% Direct Field Allocation
                  </h3>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  All micro-giving funds are allocated directly to certified instructor compensation, practice textiles, and machinery maintenance in Dadri, UP, and Delhi NCR centers.
                </p>
                <div className="pt-2 border-t border-line/60 flex items-center justify-between text-xs text-ink-subtle">
                  <span>Tracked via Open Books</span>
                  <Link href="/transparency" className="font-semibold text-brand-700 hover:underline">
                    View Monthly Ledger &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Tier Cards Grid */}
          <section aria-label="Sponsorship Tiers">
            <div className="border-b border-line pb-3 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Choose a Sponsorship Package
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
                Select a tier to fund directly through our verified payment flow.
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {tiers.map((tier) => (
                <article
                  key={tier.id}
                  className="flex flex-col border-t-2 border-brand-850 pt-4"
                >
                  {/* Tier Image (sized & lazy-loaded) */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-sand-100">
                    <img
                      src={tier.image}
                      alt={tier.title}
                      loading="lazy"
                      width={400}
                      height={250}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[0.6875rem] font-bold text-brand-900 shadow-2xs">
                        {tier.outcome}
                      </span>
                    </div>
                  </div>

                  {/* Tier Details */}
                  <div className="flex flex-1 flex-col pt-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-display text-base font-bold text-ink">
                        {tier.title}
                      </h4>
                      <span className="font-display text-xl font-bold text-brand-850">
                        {formatInr(tier.amount)}
                      </span>
                    </div>

                    <div className="mt-3 flex-1">
                      <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-brand-700">
                        What this covers:
                      </p>
                      <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                        {tier.covers}
                      </p>
                    </div>

                    {/* Primary CTA Button Routing to Existing Payment Flow */}
                    <div className="mt-6 pt-4 border-t border-line/60 space-y-2">
                      <Link
                        href={`/support?amount=${tier.amount}&tier=${tier.id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 active:scale-95"
                      >
                        <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Sponsor for {formatInr(tier.amount)}</span>
                      </Link>

                      {/* Receipt Preview Link */}
                      <Link
                        href={`/sponsor/receipt/${tier.id}`}
                        className="inline-flex w-full items-center justify-center gap-1.5 text-[0.6875rem] font-medium text-ink-muted hover:text-brand-800 transition"
                      >
                        <Receipt className="h-3 w-3" aria-hidden="true" />
                        <span>Preview Impact Receipt</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CSR & Institutional Micro-Sponsorship Note */}
          <section className="border-t border-line pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="font-display text-base sm:text-lg font-bold text-ink">
                Looking to sponsor an entire village guild or batch?
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-ink-muted max-w-2xl leading-relaxed">
                Corporates and CSR partners can sponsor complete 30-woman batches with full compliance documentation, audited outcome reports, and branding rights on graduation kits.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-brand-300 bg-white px-5 py-2.5 text-xs font-semibold text-brand-800 shadow-2xs transition hover:bg-brand-50"
            >
              <span>CSR Partnerships Desk</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

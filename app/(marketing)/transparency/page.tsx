import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  HeartHandshake,
  HelpCircle,
  Info,
  Percent,
  Receipt,
  Scale,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { getLedgerOverview } from "@/lib/ledger";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = buildMetadata({
  title: "Open Books Transparency & Public Ledger | BSGSS",
  description:
    "Review BSGSS's monthly public donation ledger, audited income and expense categories, admin ratio, and verified receipts.",
  path: "/transparency",
});

interface TransparencyPageProps {
  searchParams?: Promise<{ month?: string }>;
}

function formatInr(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

export default async function TransparencyPage({ searchParams }: TransparencyPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const overview = getLedgerOverview();
  const { months, latestMonth, lastUpdatedDate, hasSampleData, isStale } = overview;

  // Selected month from query param or default to latest
  const requestedMonth = resolvedParams.month;
  const currentMonthData =
    (requestedMonth && months.find((m) => m.month === requestedMonth)) || latestMonth;

  if (!currentMonthData) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-ink">No ledger records available</h1>
        <p className="mt-2 text-sm text-ink-muted">Please check back soon for monthly reports.</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Open Books & Financial Transparency"
        lead="A public, monthly accounting of every rupee received and spent across our rural programmes."
        crumbs={[
          { name: "About", path: "/about" },
          { name: "Transparency", path: "/transparency" },
        ]}
      />

      <div className="pt-8 pb-16 sm:pt-10 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-8">
          {/* Sample Data Banner */}
          {hasSampleData && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-2xl border-2 border-amber-300 bg-amber-50/90 p-4 sm:p-5 text-amber-900 shadow-2xs"
            >
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
              <div>
                <p className="font-semibold text-sm sm:text-base">
                  Sample Data — Not Yet Published
                </p>
                <p className="mt-1 text-xs sm:text-sm text-amber-800 leading-relaxed">
                  The figures displayed below represent a prototype demonstration of our Open Books transparency system. Official verified accounts are currently under annual audit and will be published following chartered accountant certification.
                </p>
              </div>
            </div>
          )}

          {/* Staleness Guard Banner */}
          {isStale && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-2xl border border-rose-300 bg-rose-50/90 p-4 sm:p-5 text-rose-900 shadow-2xs"
            >
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" aria-hidden="true" />
              <div>
                <p className="font-semibold text-sm sm:text-base">
                  Figures Pending Update
                </p>
                <p className="mt-1 text-xs sm:text-sm text-rose-800 leading-relaxed">
                  The most recent published ledger ({latestMonth?.formattedMonth}) is more than 45 days old. Our accounting desk is currently compiling the latest monthly reconciliation.
                </p>
              </div>
            </div>
          )}

          {/* Dynamic Hero Metric Cards (Derived from Latest Month) */}
          <section aria-label="Latest Financial Summary">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line pb-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Latest Published Month Summary
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-ink">
                  {latestMonth?.formattedMonth} Overview
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-ink-muted">
                <Calendar className="h-4 w-4 text-brand-600" aria-hidden="true" />
                <span>Last updated: {lastUpdatedDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {/* Total Received */}
              <div className="border-t-2 border-brand-850 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                    Total Received
                  </span>
                  <ArrowDownRight className="h-5 w-5 text-ink" aria-hidden="true" />
                </div>
                <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink">
                  {formatInr(latestMonth ? latestMonth.totalIncome : 0)}
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  Across individual donations &amp; CSR partners
                </p>
              </div>

              {/* Total Spent */}
              <div className="border-t-2 border-brand-850 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                    Total Spent
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ink" aria-hidden="true" />
                </div>
                <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink">
                  {formatInr(latestMonth ? latestMonth.totalExpenses : 0)}
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  Direct field activities &amp; rural support
                </p>
              </div>

              {/* Admin Ratio */}
              <div className="border-t-2 border-brand-850 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                    Admin Ratio
                  </span>
                  <Percent className="h-5 w-5 text-ink" aria-hidden="true" />
                </div>
                <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-brand-900">
                  {latestMonth ? latestMonth.adminRatio : 0}%
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  Compliance, governance &amp; office upkeep
                </p>
              </div>
            </div>
          </section>

          {/* Month Selector to View History */}
          <section aria-label="Month Selector" className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-line bg-sand-50/80 p-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Select Reporting Period
                </p>
                <p className="text-sm text-ink-muted">
                  Showing ledger for:{" "}
                  <strong className="text-ink">{currentMonthData.formattedMonth}</strong>
                </p>
              </div>

              {/* Accessible HTML Links for Month Selection (Works without JS) */}
              <div className="flex flex-wrap items-center gap-2">
                {months.map((m) => {
                  const isSelected = m.month === currentMonthData.month;
                  return (
                    <Link
                      key={m.month}
                      href={`/transparency?month=${m.month}`}
                      aria-current={isSelected ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600",
                        isSelected
                          ? "bg-brand-700 text-white shadow-2xs"
                          : "border border-line bg-white text-ink-muted hover:border-brand-300 hover:text-ink"
                      )}
                    >
                      {m.formattedMonth}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Detailed Monthly Breakdown Table */}
          <section aria-label={`Ledger Details for ${currentMonthData.formattedMonth}`}>
            <div className="rounded-2xl border border-line bg-white shadow-soft overflow-hidden">
              <div className="border-b border-line bg-sand-50/60 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-ink">
                      Monthly Account Breakdown — {currentMonthData.formattedMonth}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-ink-muted">
                      {currentMonthData.summary}
                    </p>
                  </div>

                  {currentMonthData.receiptsPdf && (
                    <a
                      href={currentMonthData.receiptsPdf}
                      download
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Download Receipts Summary (PDF)</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Accessible Dual-Column Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-line">
                {/* Income Table */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                    <h4 className="font-display text-base font-bold text-ink">
                      Income Sources ({currentMonthData.currency})
                    </h4>
                  </div>

                  <table className="w-full text-left text-xs sm:text-sm">
                    <caption className="sr-only">
                      Income sources for {currentMonthData.formattedMonth}
                    </caption>
                    <thead>
                      <tr className="border-b border-line text-ink-muted text-xs font-semibold">
                        <th scope="col" className="pb-2">Category</th>
                        <th scope="col" className="pb-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {currentMonthData.income.map((item, idx) => (
                        <tr key={idx} className="hover:bg-sand-50/50">
                          <td className="py-2.5 text-ink">{item.label}</td>
                          <td className="py-2.5 text-right font-medium text-emerald-700">
                            {formatInr(item.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-line font-bold text-ink">
                        <td className="pt-3">Total Income</td>
                        <td className="pt-3 text-right text-emerald-800">
                          {formatInr(currentMonthData.totalIncome)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Expenses Table */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="h-4 w-4 text-blue-600" aria-hidden="true" />
                    <h4 className="font-display text-base font-bold text-ink">
                      Expenditure Allocation ({currentMonthData.currency})
                    </h4>
                  </div>

                  <table className="w-full text-left text-xs sm:text-sm">
                    <caption className="sr-only">
                      Expenditures for {currentMonthData.formattedMonth}
                    </caption>
                    <thead>
                      <tr className="border-b border-line text-ink-muted text-xs font-semibold">
                        <th scope="col" className="pb-2">Programme / Operational Area</th>
                        <th scope="col" className="pb-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {currentMonthData.expenses.map((item, idx) => (
                        <tr key={idx} className="hover:bg-sand-50/50">
                          <td className="py-2.5 text-ink">
                            <span>{item.label}</span>
                            {/admin|compliance/i.test(item.label) && (
                              <span className="ml-1.5 inline-block rounded bg-brand-100 px-1.5 py-0.5 text-[0.625rem] font-semibold text-brand-800">
                                Admin
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 text-right font-medium text-blue-700">
                            {formatInr(item.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-line font-bold text-ink">
                        <td className="pt-3">Total Expenses</td>
                        <td className="pt-3 text-right text-blue-800">
                          {formatInr(currentMonthData.totalExpenses)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Verification Footer */}
              <div className="border-t border-line bg-sand-50/40 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-ink-muted">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  <span>
                    Audit status:{" "}
                    <strong className="text-ink">
                      {currentMonthData.verifiedBy || "Internal accounts desk verification"}
                    </strong>
                  </span>
                </div>
                <div>
                  <span>
                    Net monthly balance:{" "}
                    <strong
                      className={
                        currentMonthData.netSavings >= 0 ? "text-emerald-700" : "text-rose-700"
                      }
                    >
                      {formatInr(currentMonthData.netSavings)}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Plain-Language Explainer: Where Money Comes From & Where It Goes */}
          <section aria-label="How BSGSS Finances Work" className="mt-12">
            <div className="border-b border-line pb-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Financial Philosophy
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-ink mt-1">
                Where the money comes from, and where it goes.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Where money comes from */}
              <div className="rounded-2xl border border-line bg-white p-6 shadow-2xs">
                <div className="flex items-center gap-2.5 text-brand-800 mb-3">
                  <Building2 className="h-5 w-5 text-brand-700" aria-hidden="true" />
                  <h4 className="font-display text-base sm:text-lg font-bold">
                    Where money comes from
                  </h4>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>
                      <strong className="text-ink">Individual Donors:</strong> Civic contributors across India supporting vocational education, women artisans, and rural health clinics.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>
                      <strong className="text-ink">Corporate CSR Foundations:</strong> Mandated Section 135 CSR grants for structured vocational training, computer centers, and mobile medical units.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>
                      <strong className="text-ink">Artisan Guild Fair Sales:</strong> Direct proceeds from SHG handwoven shawls and mufflers returned to rural women producers.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Where money goes */}
              <div className="rounded-2xl border border-line bg-white p-6 shadow-2xs">
                <div className="flex items-center gap-2.5 text-brand-800 mb-3">
                  <Scale className="h-5 w-5 text-brand-700" aria-hidden="true" />
                  <h4 className="font-display text-base sm:text-lg font-bold">
                    Where money goes
                  </h4>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                    <span>
                      <strong className="text-ink">Direct Skill Training:</strong> Certified tailoring instructors, raw fabric, sewing machine servicing, and exam accreditation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                    <span>
                      <strong className="text-ink">Health Camps &amp; Doctors:</strong> Physician stipends, generic medicines, optical kits, and ambulance logistics across rural villages.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                    <span>
                      <strong className="text-ink">Lean Administrative Overhead:</strong> Statutorily capped at minimal levels to ensure maximum capital touches village households directly.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Privacy & Governance Notice */}
          <div className="rounded-xl border border-line bg-sand-50/70 p-4 text-xs text-ink-muted leading-relaxed">
            <p>
              <strong>Donor Privacy Policy:</strong> In strict compliance with regulatory guidelines and individual privacy rights, BSGSS publishes only aggregate financial categories and program allocation figures. Individual donor identities, PAN details, and transaction references are never published publicly. For questions regarding financial filings, email us at{" "}
              <a href="mailto:bsgssindia@yahoo.co.in" className="text-brand-700 underline font-medium">
                bsgssindia@yahoo.co.in
              </a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

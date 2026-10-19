"use client";

import { useState } from "react";
import { Calculator, Check, Copy, Heart, ShieldCheck, Sparkles } from "lucide-react";

interface PresetTier {
  amount: number;
  label: string;
  impact: string;
  beneficiaries: string;
}

const PRESET_TIERS: PresetTier[] = [
  {
    amount: 2500,
    label: "₹2,500",
    impact: "Provides raw tailoring fabric, scissors, and design kits for 2 rural women trainee artisans for 1 full month.",
    beneficiaries: "2 Rural Women",
  },
  {
    amount: 5000,
    label: "₹5,000",
    impact: "Sponsors free preventive health check-up, vitals screening, and essential medicines for 25 village elders and children.",
    beneficiaries: "25 Village Residents",
  },
  {
    amount: 10000,
    label: "₹10,000",
    impact: "Funds a complete 6-month certified vocational course with master trainers and government-recognised certificate.",
    beneficiaries: "1 Certified Artisan",
  },
  {
    amount: 25000,
    label: "₹25,000",
    impact: "Equips an entire self-help guild with 2 industrial-grade sewing workstations and electric motor attachments.",
    beneficiaries: "1 Village SHG Unit",
  },
];

export function TaxCalculator80G() {
  const [selectedAmount, setSelectedAmount] = useState<number>(10000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [taxBracket, setTaxBracket] = useState<number>(30); // 30% standard bracket
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  const amount = customAmount ? Math.max(0, parseInt(customAmount, 10) || 0) : selectedAmount;

  // Under Section 80G of Income Tax Act 1961:
  // 50% of the donated amount is eligible as a deduction from total taxable income.
  const eligibleDeduction = Math.round(amount * 0.5);
  // Estimated tax saved = eligibleDeduction * (taxBracket / 100)
  const estimatedTaxSaving = Math.round(eligibleDeduction * (taxBracket / 100));
  const netEffectiveCost = Math.max(0, amount - estimatedTaxSaving);

  // Find matching preset or extrapolate
  const activePreset = PRESET_TIERS.find((p) => p.amount === amount);
  const impactNarrative = activePreset
    ? activePreset.impact
    : amount >= 25000
    ? "Directly establishes and equips rural vocational workstations, providing sustainable monthly self-reliance for village women."
    : amount >= 10000
    ? "Sponsors vocational certification and materials for rural youth and women artisans in Uttar Pradesh & Delhi NCR."
    : amount >= 5000
    ? "Funds preventive diagnostic camps and health awareness drives across high-need rural habitations."
    : "Supports classroom learning materials, digital literacy, and tailoring training supplies.";

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("bsgssindia@upi");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  return (
    <div className="border-t-2 border-brand-850 pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-brand-800">
            <Calculator className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-[0.18em]">
              Statutory Tax Benefit
            </span>
          </div>
          <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-ink">
            Section 80G Tax Deduction &amp; Impact Calculator
          </h3>
        </div>
        <span className="text-xs font-semibold text-brand-800">
          Section 80G · IT Act 1961
        </span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Every rupee donated to BSGSS qualifies for an official **50% tax deduction** under Section 80G. Calculate your effective donation cost and real-world grassroot outcome below.
      </p>

      {/* Preset Buttons */}
      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
          Select Donation Contribution
        </p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {PRESET_TIERS.map((tier) => {
            const isSelected = !customAmount && selectedAmount === tier.amount;
            return (
              <button
                key={tier.amount}
                type="button"
                onClick={() => {
                  setCustomAmount("");
                  setSelectedAmount(tier.amount);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  isSelected
                    ? "border-b-2 border-brand-850 font-bold text-ink"
                    : "border-b border-line text-ink-muted hover:border-ink hover:text-ink"
                }`}
              >
                {tier.label}
              </button>
            );
          })}
        </div>

        {/* Custom Amount Field */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label htmlFor="custom-amount-input" className="text-xs font-medium text-ink-muted">
            Or enter other amount (₹):
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-muted">
              ₹
            </span>
            <input
              id="custom-amount-input"
              type="number"
              min="500"
              step="500"
              placeholder="e.g. 15000"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-36 rounded-md border border-line bg-white py-1.5 pl-7 pr-3 text-xs sm:text-sm font-semibold text-ink focus:border-brand-700 focus:outline-none"
            />
          </div>

          {/* Tax Slab Selector */}
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <span>Your Income Tax Slab:</span>
            <select
              value={taxBracket}
              onChange={(e) => setTaxBracket(Number(e.target.value))}
              className="rounded-md border border-line bg-white px-2 py-1 text-xs font-semibold text-ink focus:border-brand-700 focus:outline-none"
              aria-label="Select income tax bracket"
            >
              <option value={10}>10% Slab</option>
              <option value={20}>20% Slab</option>
              <option value={30}>30% Slab (Standard)</option>
              <option value={39}>39% Slab (High Net Worth)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calculation Ledger Grid (Borderless, Open Editorial) */}
      <div className="mt-8 grid gap-6 sm:grid-cols-4 border-t border-line/70 pt-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            Donation Amount
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-ink">
            ₹{amount.toLocaleString("en-IN")}
          </p>
          <p className="mt-0.5 text-xs text-ink-muted">100% directly to mission</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-800">
            80G Eligible Deduction
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-brand-900">
            ₹{eligibleDeduction.toLocaleString("en-IN")}
          </p>
          <p className="mt-0.5 text-xs text-ink-muted">50% deducted from taxable income</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Estimated Tax Saved
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-emerald-900">
            ₹{estimatedTaxSaving.toLocaleString("en-IN")}
          </p>
          <p className="mt-0.5 text-xs text-ink-muted">Based on your {taxBracket}% tax slab</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            Net Effective Cost
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-ink">
            ₹{netEffectiveCost.toLocaleString("en-IN")}
          </p>
          <p className="mt-0.5 text-xs text-ink-muted">Actual out-of-pocket spend</p>
        </div>
      </div>

      {/* Real-World Grassroot Impact Narrative */}
      <div className="mt-6 border-t border-line/60 pt-4">
        <div className="flex items-start gap-2.5">
          <Sparkles className="h-4 w-4 text-brand-800 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Grassroots Impact Delivered
            </p>
            <p className="mt-1 text-sm font-medium leading-relaxed text-ink">
              {impactNarrative}
            </p>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopyUpi}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 cursor-pointer"
          >
            {copiedUpi ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedUpi ? "UPI ID Copied (bsgssindia@upi)" : "Copy Official UPI ID"}</span>
          </button>

          <span className="text-xs text-ink-muted">
            Instant 80G receipt issued with PAN &amp; 10BE filing.
          </span>
        </div>
      </div>
    </div>
  );
}

import { Activity, FileText, PieChart, Truck } from "lucide-react";

interface AllocationItem {
  rupees: number;
  percentage: number;
  category: string;
  description: string;
  examples: string[];
}

const ALLOCATION_DATA: AllocationItem[] = [
  {
    rupees: 88,
    percentage: 88,
    category: "Direct Grassroots Programmes",
    description: "Goes directly to rural community members, artisan training supplies, and preventive healthcare services.",
    examples: ["Sewing & tailoring raw material kits", "Doctor & diagnostic camp medicines", "Master artisan & educator honorariums"],
  },
  {
    rupees: 7,
    percentage: 7,
    category: "Field Operations & Quality Auditing",
    description: "Ensures projects reach interior habitations with active oversight, tracking, and village verification.",
    examples: ["Field coordinator rural transit", "Batch progress tracking & certification", "Community center electricals & equipment maintenance"],
  },
  {
    rupees: 5,
    percentage: 5,
    category: "Statutory & Administrative Compliance",
    description: "Maintains independent annual audits, MCA CSR-1 reporting, and institutional governance.",
    examples: ["Statutory CA audits & Form 10BE filing", "NITI Aayog Darpan compliance", "Secure website hosting & public transparency ledger"],
  },
];

export function RupeeAllocationBreakdown() {
  return (
    <section aria-label="Rupee Allocation Breakdown" className="border-t-2 border-brand-850 pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-brand-800">
            <PieChart className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-[0.18em]">
              Fund Efficiency Standard
            </span>
          </div>
          <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-ink">
            Where Every ₹100 Goes
          </h3>
        </div>
        <p className="text-xs text-ink-muted">
          Based on independent statutory audited financials
        </p>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-ink-muted max-w-3xl">
        BSGSS prioritises lean overheads. For every ₹100 received from corporate CSR partners and individual contributors, ₹88 directly reaches the rural community in concrete goods, health aid, and certified vocational training.
      </p>

      {/* Visual Multi-Segment Proportional Progress Bar */}
      <div className="mt-6">
        <div className="h-3 w-full overflow-hidden rounded-full bg-sand-200 flex">
          <div
            style={{ width: "88%" }}
            className="bg-brand-850 h-full transition-all"
            title="88% Direct Field Action"
          />
          <div
            style={{ width: "7%" }}
            className="bg-slate-500 h-full transition-all"
            title="7% Field Operations & Logistics"
          />
          <div
            style={{ width: "5%" }}
            className="bg-slate-300 h-full transition-all"
            title="5% Statutory Compliance & Admin"
          />
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap items-center gap-6 text-xs text-ink">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-850" />
            <span className="font-semibold">₹88 (88%) Direct Grassroots Action</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
            <span className="font-semibold">₹7 (7%) Field Operations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="font-semibold">₹5 (5%) Statutory Compliance</span>
          </div>
        </div>
      </div>

      {/* Detail Columns (Borderless, Open Editorial) */}
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {ALLOCATION_DATA.map((item, idx) => (
          <div key={item.category} className="border-t border-line pt-5">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-2xl sm:text-3xl font-bold text-ink">
                ₹{item.rupees}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                {item.percentage}%
              </span>
            </div>

            <h4 className="mt-2 text-sm font-bold text-ink">
              {item.category}
            </h4>

            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink-muted">
              {item.description}
            </p>

            <ul className="mt-3 space-y-1.5 text-xs text-ink/90 border-t border-line/60 pt-3">
              {item.examples.map((ex) => (
                <li key={ex} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-brand-800 shrink-0" />
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

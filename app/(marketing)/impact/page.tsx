import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InteractiveIndiaMap } from "@/components/impact/InteractiveIndiaMap";

export const metadata: Metadata = { title: "Impact", description: "How BSGSS creates change with communities." };
const outcomes = [
  ["Learning", "More access to learning support, digital exposure and skills that can expand a young person’s choices."],
  ["Wellbeing", "Health camps and awareness activities help communities access information and preventive support closer to home."],
  ["Livelihoods", "Vocational learning and local enterprise support turn capability into routes towards income and independence."],
  ["Women’s agency", "Women’s groups and economic participation create stronger voices, networks and financial resilience."],
];
export default function ImpactPage() { return <><PageHeader title="Our impact" lead="Change is most durable when it is useful, local and carried forward by the community." crumbs={[{ name: "Impact", path: "/impact" }]} /><main><div className="py-16 sm:py-24"><div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[.85fr_1.15fr] md:px-8"><div className="rounded-2xl bg-brand-900 p-8 text-white sm:p-10"><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-200">How we measure progress</p><h2 className="mt-4 font-display text-3xl font-bold !text-white">Beyond a one-time intervention.</h2><p className="mt-5 leading-relaxed text-brand-100">BSGSS looks for practical outcomes: people informed, skills applied, services reached, and communities better able to shape their own futures.</p></div><div className="grid gap-4 sm:grid-cols-2">{outcomes.map(([title, text], index) => <article key={title} className="rounded-xl border border-line bg-white p-6"><span className="font-display text-3xl font-bold text-brand-200">0{index + 1}</span><h2 className="mt-5 text-xl font-bold">{title}</h2><p className="mt-3 text-sm leading-relaxed text-ink-muted">{text}</p></article>)}</div></div></div><InteractiveIndiaMap /></main></> }

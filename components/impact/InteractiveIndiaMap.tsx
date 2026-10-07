"use client";

import India from "@svg-maps/india";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { getIndiaStateProgram, indiaProgrammeTotals, type IndiaStateProgram } from "@/data/india-program-data";

type TooltipState = { state: string; x: number; y: number } | null;
type IndiaLocation = { id: string; name: string; path: string };

const indiaLocations = India.locations as IndiaLocation[];

function useCountUp(value: number) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) { setCount(value); return; }
    const start = performance.now();
    const duration = 700;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return count;
}

function StateDetails({ state }: { state: IndiaStateProgram | undefined }) {
  if (!state) return <div className="rounded-xl border border-dashed border-line bg-white p-5 text-sm leading-relaxed text-ink-muted">Select a highlighted state to view BSGSS programme records.</div>;
  return <div className="rounded-xl border border-brand-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-[.16em] text-brand-700">Selected location</p><h3 className="mt-2 font-display text-2xl font-bold text-ink">{state.state}</h3><div className="mt-5 grid grid-cols-2 gap-3"><Detail label="Districts" value={state.districts.length} /><Detail label="Programme records" value={state.programs} /></div><p className="mt-5 text-xs leading-relaxed text-ink-muted">Village coverage is reported by BSGSS in aggregate, not by state. See the recorded districts below.</p><p className="mt-3 text-sm font-semibold text-ink">{state.districts.join(" · ")}</p></div>;
}

function Detail({ label, value }: { label: string; value: number }) {
  return <div className="rounded-lg bg-brand-50 p-3"><p className="font-display text-2xl font-bold text-brand-900">{value}</p><p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p></div>;
}

export function InteractiveIndiaMap() {
  const [selectedState, setSelectedState] = useState("Uttar Pradesh");
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const selected = getIndiaStateProgram(selectedState);

  // Hooks must run predictably; the values are exposed separately for the cards.
  const stateCount = useCountUp(indiaProgrammeTotals.states);
  const districtCount = useCountUp(indiaProgrammeTotals.districts);
  const villageCount = useCountUp(indiaProgrammeTotals.villages);

  const updateTooltip = (state: string, target: SVGPathElement) => {
    const map = target.ownerSVGElement?.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    if (!map) return;
    setTooltip({ state, x: Math.min(82, Math.max(18, ((box.left + box.width / 2 - map.left) / map.width) * 100)), y: Math.min(84, Math.max(12, ((box.top + box.height / 2 - map.top) / map.height) * 100)) });
  };

  return <section className="overflow-hidden bg-sand-50 py-16 sm:py-24"><div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[.82fr_1.18fr] md:items-start md:px-8"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Our footprint</p><h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">Where we work</h2><p className="mt-5 max-w-xl leading-relaxed text-ink-muted">BSGSS programme records span multiple states and districts in India, connecting healthcare, vocational learning and community-led support where it can make a practical difference.</p><div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4"><Stat value={stateCount} label="States" /><Stat value={districtCount} label="Districts" /><Stat value={`${villageCount}+`} label="Villages" /></div><div className="mt-8 hidden md:block"><StateDetails state={selected} /></div></div><div><div className="relative rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-6"><div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex items-center justify-between text-xs font-semibold text-ink-muted"><span>Interactive programme map</span><span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-brand-700" /> Active states</span></div><svg viewBox={India.viewBox} className="mt-7 h-auto w-full max-h-[39rem] overflow-visible" role="group" aria-label="Interactive map of India showing BSGSS programme states">{indiaLocations.map((location) => { const data = getIndiaStateProgram(location.name); const active = Boolean(data); const selected = selectedState === location.name; return <path key={location.id} d={location.path} role="button" tabIndex={0} aria-label={`${location.name}${data ? `, ${data.districts.length} districts and ${data.programs} programme records` : ", no BSGSS programme record currently listed"}`} aria-pressed={selected} onClick={() => setSelectedState(location.name)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedState(location.name); } }} onMouseEnter={(event) => updateTooltip(location.name, event.currentTarget)} onMouseMove={(event) => updateTooltip(location.name, event.currentTarget)} onMouseLeave={() => setTooltip(null)} onFocus={(event) => updateTooltip(location.name, event.currentTarget)} onBlur={() => setTooltip(null)} className={`cursor-pointer stroke-white stroke-[1.2] outline-none transition-[fill,filter,transform] duration-200 focus:stroke-brand-900 focus:stroke-[2.5] ${active ? "fill-brand-700 hover:scale-[1.015] hover:fill-brand-600 hover:drop-shadow-[0_2px_4px_rgba(9,83,92,.35)]" : "fill-slate-200 hover:fill-slate-300"} ${selected ? "fill-brand-900 !stroke-brand-200 stroke-[2.5]" : ""}`} />; })}</svg>{tooltip && <Tooltip state={tooltip.state} x={tooltip.x} y={tooltip.y} />}</div><div className="mt-5 md:hidden"><StateDetails state={selected} /></div><p className="mt-4 text-xs leading-relaxed text-ink-muted">Use hover, keyboard focus or tap to explore a state. Highlighted states have programme-location records in BSGSS public partnership data.</p></div></div></section>;
}

function Stat({ value, label }: { value: string | number; label: string }) { return <div className="border-l-2 border-brand-300 pl-3"><p className="font-display text-3xl font-bold text-ink sm:text-4xl">{value}</p><p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[.13em] text-ink-muted">{label}</p></div>; }

function Tooltip({ state, x, y }: { state: string; x: number; y: number }) { const data = getIndiaStateProgram(state); return <div role="status" className="pointer-events-none absolute z-20 w-48 -translate-x-1/2 -translate-y-[110%] rounded-lg bg-brand-900 p-3 text-white shadow-lift transition-opacity" style={{ left: `${x}%`, top: `${y}%` }}><p className="text-xs font-bold uppercase tracking-[.13em] text-brand-200">{state}</p>{data ? <><p className="mt-2 text-sm font-semibold">{data.districts.length} districts · {data.programs} programme records</p><p className="mt-1 text-xs text-brand-100">Village coverage is reported in aggregate.</p></> : <p className="mt-2 text-xs leading-relaxed text-brand-100">No BSGSS programme-location record is currently listed for this state.</p>}</div>; }

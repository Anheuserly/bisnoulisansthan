"use client";

import React, { useEffect, useState } from "react";
import India from "@svg-maps/india";
import {
  Handshake,
  HeartPulse,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import {
  getIndiaStateProgram,
  indiaProgramData,
  indiaProgrammeTotals,
} from "@/data/india-program-data";
import { type MapFootprintConfig } from "@/config/customizer";
import { cn } from "@/lib/utils/cn";

type TooltipState = { title: string; subtitle: string; x: number; y: number } | null;

interface IndiaLocation {
  id: string;
  name: string;
  path: string;
}

interface InteractiveIndiaMapProps {
  customizerConfig?: MapFootprintConfig;
}

const indiaLocations = (India.locations || []) as IndiaLocation[];

function useCountUp(value: number) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setCount(value);
      return;
    }
    const start = performance.now();
    const duration = 750;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Smooth cubic ease out
      setCount(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return count;
}

export function InteractiveIndiaMap({ customizerConfig }: InteractiveIndiaMapProps) {
  const [selectedStateName, setSelectedStateName] = useState<string>("Uttar Pradesh");
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  // Selected state entity
  const selectedState = getIndiaStateProgram(selectedStateName);

  // Animated metric counters with real, accurate data
  const indiaStatesCount = useCountUp(indiaProgrammeTotals.states);
  const indiaDistrictsCount = useCountUp(indiaProgrammeTotals.districts);
  const indiaVillagesCount = useCountUp(350);

  const handleIndiaStateClick = (stateName: string) => {
    setSelectedStateName(stateName);
  };

  const updateTooltip = (
    title: string,
    subtitle: string,
    event: React.MouseEvent<SVGElement>
  ) => {
    const svg = event.currentTarget.ownerSVGElement;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setTooltip({
      title,
      subtitle,
      x: Math.min(84, Math.max(16, x)),
      y: Math.min(82, Math.max(14, y)),
    });
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-sand-50/40 py-12 sm:py-16"
      id="interactive-map"
    >
      {/* Decorative ambient radial blurs */}
      <div className="pointer-events-none absolute -left-28 top-1/4 h-96 w-96 rounded-full bg-brand-200/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-1/4 h-96 w-96 rounded-full bg-emerald-200/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Main Cockpit Grid: Left Context & Telemetry (5 cols) + Right Map Canvas (7 cols) */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          
          {/* Left Column: Context & Metric Telemetry (Balanced with Map height) */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-8 shadow-soft lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sand-100/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-800">
                <MapPin className="h-4 w-4 text-brand-600" />
                <span>{customizerConfig?.eyebrow || "States Covered & Verified Grassroots Footprint"}</span>
              </div>

              <h2 className="mt-3.5 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl lg:text-[2.25rem]">
                {customizerConfig?.heading || "Grassroots field presence across Indian states."}
              </h2>

              <p className="mt-3.5 text-xs leading-relaxed text-ink-muted sm:text-sm">
                {customizerConfig?.description ||
                  "Bisnouli Sarvodaya Gramodyog Sewa Sansthan anchors 30+ years of verified grassroots field execution across 350+ villages in Delhi NCR, Uttar Pradesh, Haryana, Punjab, Rajasthan, Chhattisgarh, and Uttarakhand."}
              </p>

              {/* 3 High-Impact Numeric Badges with Accurate Verified Data */}
              <div className="mt-6 grid grid-cols-3 gap-2.5 border-y border-line/50 py-4">
                <div className="border-l-2 border-brand-400 pl-2.5">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-ink">
                    {customizerConfig?.statesCount || `${indiaStatesCount} states`}
                  </p>
                  <p className="mt-1 text-[0.625rem] font-bold uppercase tracking-wider text-ink-muted">
                    States Covered
                  </p>
                </div>
                <div className="border-l-2 border-brand-400 pl-2.5">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-ink">
                    {customizerConfig?.districtsCount || "20+ districts"}
                  </p>
                  <p className="mt-1 text-[0.625rem] font-bold uppercase tracking-wider text-ink-muted">
                    Districts
                  </p>
                </div>
                <div className="border-l-2 border-emerald-500 pl-2.5">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-800">
                    {customizerConfig?.villagesCount || "350+ villages"}
                  </p>
                  <p className="mt-1 text-[0.625rem] font-bold uppercase tracking-wider text-emerald-700">
                    Villages
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Interactive Selector Pills for Field States */}
            <div className="mt-6 pt-4 border-t border-line/40">
              <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">
                Quick Select Field State:
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {indiaProgramData.map((item) => {
                  const isSelected = selectedStateName === item.state;
                  return (
                    <button
                      key={item.state}
                      type="button"
                      onClick={() => handleIndiaStateClick(item.state)}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-150",
                        isSelected
                          ? "bg-brand-800 text-white shadow-2xs"
                          : "bg-sand-50 text-ink hover:bg-sand-100"
                      )}
                    >
                      <MapPin className="h-3 w-3" />
                      <span>{item.state}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map Canvas (7 cols) - Borderless Clean Aesthetic */}
          <div className="relative flex flex-col justify-between rounded-3xl bg-white p-5 shadow-soft sm:p-7 lg:col-span-7">
            <div>
              {/* Header inside Map Canvas */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-ink">
                    Interactive India Grassroots Map
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[0.6875rem] font-semibold text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-700" />
                    <span>Active Field State</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span>Other States</span>
                  </span>
                </div>
              </div>

              {/* INDIA MAP VIEW */}
              <div className="relative mt-4">
                <svg
                  viewBox={India.viewBox}
                  className="h-auto w-full max-h-[34rem] overflow-visible"
                  role="group"
                  aria-label="Interactive map of India showing BSGSS programme states"
                >
                  {indiaLocations.map((location) => {
                    const data = getIndiaStateProgram(location.name);
                    const active = Boolean(data);
                    const selected = selectedStateName === location.name;

                    return (
                      <path
                        key={location.id}
                        d={location.path}
                        role="button"
                        tabIndex={0}
                        aria-label={`${location.name}${data ? `: ${data.districts.length} districts and ${data.programs} programme records` : ", no BSGSS record listed"}`}
                        aria-pressed={selected}
                        onClick={() => handleIndiaStateClick(location.name)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleIndiaStateClick(location.name);
                          }
                        }}
                        onMouseEnter={(e) =>
                          updateTooltip(
                            location.name,
                            data ? `${data.districts.length} Districts · ${data.programs} Programmes` : "No direct programme records",
                            e
                          )
                        }
                        onMouseMove={(e) =>
                          updateTooltip(
                            location.name,
                            data ? `${data.districts.length} Districts · ${data.programs} Programmes` : "No direct programme records",
                            e
                          )
                        }
                        onMouseLeave={() => setTooltip(null)}
                        className={cn(
                          "cursor-pointer stroke-white stroke-[1.2] outline-none transition-all duration-200",
                          active
                            ? "fill-brand-700 hover:scale-[1.015] hover:fill-brand-600 hover:drop-shadow-[0_2px_6px_rgba(9,83,92,.35)]"
                            : "fill-slate-100 hover:fill-slate-200",
                          selected && "fill-brand-900 stroke-brand-200 stroke-[2.2]"
                        )}
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Dynamic Hover Tooltip */}
              {tooltip && (
                <div
                  role="status"
                  className="pointer-events-none absolute z-30 w-56 -translate-x-1/2 -translate-y-[115%] rounded-xl bg-brand-950/95 p-3 text-white shadow-lift backdrop-blur-sm transition-opacity duration-150 border border-brand-700/60"
                  style={{ left: `${tooltip.x}%`, top: `${tooltip.y}%` }}
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-200">{tooltip.title}</p>
                  <p className="mt-1 text-xs text-white/90 leading-tight">{tooltip.subtitle}</p>
                </div>
              )}
            </div>

            {/* Bottom Instructions Note */}
            <div className="mt-5 border-t border-line/60 pt-3.5">
              <p className="text-xs text-ink-muted">
                {customizerConfig?.indiaNote ||
                  "Click any highlighted Indian state to view district-level program records transcribed from statutory filings."}
              </p>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH DEDICATED REGIONAL STRATEGY & FIELD INTELLIGENCE DOSSIER */}
        <div className="mt-8 rounded-3xl bg-white p-6 sm:p-8 lg:p-9 shadow-soft">
          <div>
            {/* Dossier Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/50 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-emerald-800">
                    Statutory Field Records
                  </span>
                  <span className="text-xs font-semibold text-brand-700">
                    Field Execution Hub: Northern India
                  </span>
                </div>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-ink">
                  {selectedState?.state || "Select a State"}
                </h3>
              </div>

              {/* State Quick Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-sand-50/80 p-1">
                {indiaProgramData.map((item) => (
                  <button
                    key={item.state}
                    type="button"
                    onClick={() => handleIndiaStateClick(item.state)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                      selectedStateName === item.state
                        ? "bg-brand-700 text-white shadow-2xs"
                        : "text-ink-muted hover:text-ink hover:bg-white/60"
                    )}
                  >
                    <span>{item.state}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedState ? (
              <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:items-start">
                
                {/* Left Column: Metrics & Active Districts */}
                <div className="space-y-6 lg:col-span-6">
                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">
                      State Field Statistics
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-sand-50/70 p-4 shadow-2xs">
                        <p className="font-display text-2xl font-bold text-brand-900">
                          {selectedState.districts.length}
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                          Covered Districts
                        </p>
                      </div>
                      <div className="rounded-2xl bg-sand-50/70 p-4 shadow-2xs">
                        <p className="font-display text-2xl font-bold text-brand-900">
                          {selectedState.programs}
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                          CSR Projects Undertaken
                        </p>
                      </div>
                      <div className="rounded-2xl bg-sand-50/70 p-4 shadow-2xs">
                        <p className="font-display text-2xl font-bold text-emerald-800">
                          {selectedState.villages || 50}+
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                          Villages Covered
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-sand-50/50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-900">
                      Active Operational Districts in {selectedState.state}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                      Program records and CSR allocations deployed across:
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedState.districts.map((district) => (
                        <span
                          key={district}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink shadow-2xs"
                        >
                          <MapPin className="h-3 w-3 text-brand-700" />
                          <span>{district}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Key Focus Areas & Field Action */}
                <div className="space-y-6 lg:col-span-6">
                  <div className="rounded-2xl border border-line bg-sand-50/30 p-5 sm:p-6">
                    <h4 className="font-display text-base font-bold text-ink">
                      Active Interventions &amp; Grassroots Mission in {selectedState.state}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
                      In {selectedState.state}, BSGSS operates sustainable community development programs aligned with verified statutory mandates. Field teams work alongside district administrations and CSR partners to bring healthcare, women&apos;s self-reliance, and youth vocational skills directly to village doorsteps.
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="flex items-start gap-2.5 rounded-xl bg-white p-3 shadow-2xs border border-line/60">
                        <HeartPulse className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-ink">Preventive Health</p>
                          <p className="text-[0.6875rem] text-ink-muted">Medical screening camps &amp; medicine distribution</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 rounded-xl bg-white p-3 shadow-2xs border border-line/60">
                        <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-ink">Women SHGs &amp; Skills</p>
                          <p className="text-[0.6875rem] text-ink-muted">Tailoring, handlooms &amp; micro-credit circles</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 rounded-xl bg-white p-3 shadow-2xs border border-line/60">
                        <Users className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-ink">Community Councils</p>
                          <p className="text-[0.6875rem] text-ink-muted">Gramodyog leadership &amp; welfare awareness</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 rounded-xl bg-white p-3 shadow-2xs border border-line/60">
                        <Handshake className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-ink">CSR Alliances</p>
                          <p className="text-[0.6875rem] text-ink-muted">Audited public sector partner execution</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}



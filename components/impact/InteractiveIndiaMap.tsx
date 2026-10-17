"use client";

import React, { useEffect, useState } from "react";
import World from "@svg-maps/world";
import India from "@svg-maps/india";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Globe2,
  Handshake,
  HeartPulse,
  Landmark,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import {
  GLOBAL_REGIONS,
  GLOBAL_SUMMARY_TOTALS,
  getGlobalRegion,
  getRegionForCountryCode,
  type GlobalRegion,
} from "@/data/global-program-data";
import {
  getIndiaStateProgram,
  indiaProgrammeTotals,
  type IndiaStateProgram,
} from "@/data/india-program-data";
import { cn } from "@/lib/utils/cn";

type MapViewMode = "world" | "india";
type TooltipState = { title: string; subtitle: string; x: number; y: number } | null;

interface WorldLocation {
  id: string;
  name: string;
  path: string;
}

interface IndiaLocation {
  id: string;
  name: string;
  path: string;
}

const worldLocations = (World.locations || []) as WorldLocation[];
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

export function InteractiveIndiaMap() {
  const [viewMode, setViewMode] = useState<MapViewMode>("world");
  const [selectedRegionId, setSelectedRegionId] = useState<string>("india");
  const [selectedStateName, setSelectedStateName] = useState<string>("Uttar Pradesh");
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  // Selected entities
  const selectedRegion = getGlobalRegion(selectedRegionId) || GLOBAL_REGIONS[0];
  const selectedState = getIndiaStateProgram(selectedStateName);

  // Animated metric counters
  const globalRegionsCount = useCountUp(GLOBAL_SUMMARY_TOTALS.regions);
  const globalCountriesCount = useCountUp(GLOBAL_SUMMARY_TOTALS.countriesReached);
  const globalSdgsCount = useCountUp(GLOBAL_SUMMARY_TOTALS.sdgsAligned);

  const indiaStatesCount = useCountUp(indiaProgrammeTotals.states);
  const indiaDistrictsCount = useCountUp(indiaProgrammeTotals.districts);
  const indiaVillagesCount = useCountUp(350);

  const handleWorldCountryClick = (countryId: string) => {
    const region = getRegionForCountryCode(countryId);
    if (region) {
      setSelectedRegionId(region.id);
    }
  };

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
      className="relative isolate overflow-hidden bg-gradient-to-b from-white via-sand-50/70 to-white py-14 sm:py-20 border-b border-brand-100"
      id="interactive-map"
    >
      {/* Decorative ambient radial blurs */}
      <div className="pointer-events-none absolute -left-28 top-1/4 h-96 w-96 rounded-full bg-brand-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-1/4 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Main Grid: Left Narrative & Telemetry Panel (5 cols) + Right Map Canvas (7 cols) */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column: Context, Mode Switcher & Dynamic Detail Card */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/90 bg-white/95 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-800 shadow-2xs backdrop-blur-sm">
              <Globe2 className="h-4 w-4 text-brand-600 animate-pulse" />
              <span>International &amp; Grassroots Footprint</span>
            </div>

            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.65rem]">
              Where we create change.
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
              BSGSS anchors 30+ years of deep grassroots field action across 350+ villages in India with an expanding international presence — collaborating with the global diaspora, international CSR alliances, and United Nations Sustainable Development Goals (SDGs).
            </p>

            {/* View Mode Switcher Pills */}
            <div className="mt-6 flex items-center rounded-xl border border-brand-200/90 bg-white/90 p-1.5 shadow-2xs backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setViewMode("world")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 rounded-lg py-2 px-3 text-xs font-bold transition-all duration-200",
                  viewMode === "world"
                    ? "bg-brand-700 text-white shadow-soft"
                    : "text-ink-muted hover:text-brand-900 hover:bg-brand-50"
                )}
              >
                <Globe2 className="h-4 w-4" />
                <span>World / International Map</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("india")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 rounded-lg py-2 px-3 text-xs font-bold transition-all duration-200",
                  viewMode === "india"
                    ? "bg-brand-700 text-white shadow-soft"
                    : "text-ink-muted hover:text-brand-900 hover:bg-brand-50"
                )}
              >
                <MapPin className="h-4 w-4" />
                <span>India Grassroots Network</span>
              </button>
            </div>

            {/* 3 High-Impact Numeric Badges */}
            <div className="mt-7 grid grid-cols-3 gap-3 border-y border-line/70 py-5">
              {viewMode === "world" ? (
                <>
                  <div className="border-l-2 border-brand-400 pl-3">
                    <p className="font-display text-2xl sm:text-3xl font-bold text-ink">{globalRegionsCount}+</p>
                    <p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">Global Regions</p>
                  </div>
                  <div className="border-l-2 border-brand-400 pl-3">
                    <p className="font-display text-2xl sm:text-3xl font-bold text-ink">{globalCountriesCount}+</p>
                    <p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">Countries Linked</p>
                  </div>
                  <div className="border-l-2 border-emerald-500 pl-3">
                    <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-800">{globalSdgsCount}</p>
                    <p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-wider text-emerald-700">UN SDGs Aligned</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-l-2 border-brand-400 pl-3">
                    <p className="font-display text-2xl sm:text-3xl font-bold text-ink">{indiaStatesCount}</p>
                    <p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">States</p>
                  </div>
                  <div className="border-l-2 border-brand-400 pl-3">
                    <p className="font-display text-2xl sm:text-3xl font-bold text-ink">{indiaDistrictsCount}</p>
                    <p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">Districts</p>
                  </div>
                  <div className="border-l-2 border-emerald-500 pl-3">
                    <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-800">{indiaVillagesCount}+</p>
                    <p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-wider text-emerald-700">Villages</p>
                  </div>
                </>
              )}
            </div>

            {/* Dynamic Selected Location & Detail Card */}
            <div className="mt-7">
              {viewMode === "world" ? (
                <div className="rounded-2xl border border-brand-200/90 bg-white p-6 shadow-2xs transition-all">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-brand-50 px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-brand-800">
                      <span className="text-base">{selectedRegion.flag}</span>
                      <span>{selectedRegion.category}</span>
                    </span>
                    <span className="text-xs font-semibold text-brand-700">
                      Hub: {selectedRegion.hub.city}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-ink">
                    {selectedRegion.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-brand-800">
                    {selectedRegion.subtitle}
                  </p>

                  {/* Regional Key Metrics */}
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {selectedRegion.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-xl border border-brand-100 bg-sand-50/60 p-2.5">
                        <p className="font-display text-lg font-bold text-brand-900">{metric.value}</p>
                        <p className="text-[0.6875rem] font-medium text-ink-muted">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Regional Narrative */}
                  <p className="mt-4 text-xs leading-relaxed text-ink-muted sm:text-sm">
                    {selectedRegion.description}
                  </p>

                  {/* Focus Areas Pills */}
                  <div className="mt-4 border-t border-brand-100/70 pt-3">
                    <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-brand-800">Focus Areas &amp; Pillars</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {selectedRegion.focusAreas.map((focus) => (
                        <span key={focus} className="rounded-md bg-sand-100/90 px-2 py-0.5 text-[0.6875rem] font-medium text-ink">
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* UN SDG Alignments */}
                  <div className="mt-3.5 border-t border-brand-100/70 pt-3">
                    <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-emerald-800">UN SDG Alignment</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {selectedRegion.sdgAlignments.map((sdg) => (
                        <span key={sdg} className="rounded-md bg-emerald-50 px-2 py-0.5 text-[0.6875rem] font-semibold text-emerald-800 border border-emerald-200/60">
                          {sdg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* India Selected State Card */
                <div className="rounded-2xl border border-brand-200/90 bg-white p-6 shadow-2xs">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-[.16em] text-brand-700">Selected State</span>
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[0.6875rem] font-semibold text-emerald-800">
                      Active Field Records
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                    {selectedState?.state || "Select a State"}
                  </h3>

                  {selectedState ? (
                    <>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-brand-50 p-3">
                          <p className="font-display text-2xl font-bold text-brand-900">{selectedState.districts.length}</p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">Districts Covered</p>
                        </div>
                        <div className="rounded-xl bg-brand-50 p-3">
                          <p className="font-display text-2xl font-bold text-brand-900">{selectedState.programs}</p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">Programme Records</p>
                        </div>
                      </div>

                      <p className="mt-4 text-xs leading-relaxed text-ink-muted">
                        Village coverage is reported by BSGSS in aggregate across 350+ Panchayats. District field operations active in:
                      </p>
                      <p className="mt-2 text-xs font-semibold leading-relaxed text-brand-850">
                        {selectedState.districts.join(" · ")}
                      </p>
                    </>
                  ) : (
                    <p className="mt-4 text-xs text-ink-muted">Select any highlighted state to inspect district programmes.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Map Canvas (7 cols) */}
          <div className="relative lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border-2 border-brand-100 bg-white p-4 shadow-soft sm:p-6">
              
              {/* Header inside Map Canvas */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-100 pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-ink">
                    {viewMode === "world" ? "Interactive Global Alliances Map" : "Interactive India Grassroots Map"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[0.6875rem] font-semibold text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-700" />
                    <span>Active Region / State</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span>Affiliated</span>
                  </span>
                </div>
              </div>

              {/* WORLD MAP VIEW */}
              {viewMode === "world" ? (
                <div className="relative mt-4">
                  <svg
                    viewBox={World.viewBox}
                    className="h-auto w-full max-h-[38rem] overflow-visible"
                    role="group"
                    aria-label="Interactive world map showing BSGSS international reach and global alliances"
                  >
                    <defs>
                      {/* Radial gradient for glowing hub pins */}
                      <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#2D7D88" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#2D7D88" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* All World Countries */}
                    {worldLocations.map((location) => {
                      const region = getRegionForCountryCode(location.id);
                      const isActive = Boolean(region);
                      const isSelected = selectedRegion.countryCodes.includes(location.id);

                      return (
                        <path
                          key={location.id}
                          d={location.path}
                          role="button"
                          tabIndex={0}
                          aria-label={`${location.name}${region ? `: ${region.name} (${region.category})` : ""}`}
                          aria-pressed={isSelected}
                          onClick={() => handleWorldCountryClick(location.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleWorldCountryClick(location.id);
                            }
                          }}
                          onMouseEnter={(e) =>
                            updateTooltip(
                              location.name,
                              region ? `${region.category} · ${region.hub.city}` : "Global Affiliation",
                              e
                            )
                          }
                          onMouseMove={(e) =>
                            updateTooltip(
                              location.name,
                              region ? `${region.category} · ${region.hub.city}` : "Global Affiliation",
                              e
                            )
                          }
                          onMouseLeave={() => setTooltip(null)}
                          className={cn(
                            "cursor-pointer stroke-white stroke-[0.8] outline-none transition-all duration-300",
                            isActive
                              ? "fill-brand-700 hover:fill-brand-600 hover:drop-shadow-[0_2px_8px_rgba(45,125,136,0.35)]"
                              : "fill-slate-200/90 hover:fill-slate-300",
                            isSelected && "fill-brand-900 stroke-brand-200 stroke-[1.8]"
                          )}
                        />
                      );
                    })}

                    {/* Connection Arcs from New Delhi Headquarters to International Hubs */}
                    {GLOBAL_REGIONS.filter((r) => r.id !== "india").map((r) => {
                      const hq = { x: 707, y: 400 };
                      const target = r.hub;
                      // Calculate a curved arc path
                      const dx = target.x - hq.x;
                      const dy = target.y - hq.y;
                      const cx = (hq.x + target.x) / 2 - dy * 0.15;
                      const cy = (hq.y + target.y) / 2 + dx * 0.15;
                      const pathData = `M ${hq.x} ${hq.y} Q ${cx} ${cy} ${target.x} ${target.y}`;

                      return (
                        <path
                          key={`arc-${r.id}`}
                          d={pathData}
                          fill="none"
                          stroke="rgba(45, 125, 136, 0.45)"
                          strokeWidth="1.2"
                          strokeDasharray="4 3"
                          className="pointer-events-none"
                        />
                      );
                    })}

                    {/* Pulsing Radar Hubs at International Centres */}
                    {GLOBAL_REGIONS.map((region) => {
                      const { x, y } = region.hub;
                      const isSelected = selectedRegionId === region.id;
                      const isHQ = region.id === "india";

                      return (
                        <g
                          key={`hub-${region.id}`}
                          className="cursor-pointer"
                          onClick={() => setSelectedRegionId(region.id)}
                          onMouseEnter={(e) => updateTooltip(region.name, region.subtitle, e)}
                          onMouseMove={(e) => updateTooltip(region.name, region.subtitle, e)}
                          onMouseLeave={() => setTooltip(null)}
                        >
                          {/* Outer Pulsing Glow */}
                          <circle
                            cx={x}
                            cy={y}
                            r={isHQ ? 14 : 10}
                            fill="url(#hubGlow)"
                            className="animate-ping opacity-60"
                          />
                          {/* Inner Core */}
                          <circle
                            cx={x}
                            cy={y}
                            r={isHQ ? 6 : 4.5}
                            fill={isHQ ? "#D97706" : isSelected ? "#123F48" : "#2D7D88"}
                            stroke="#FFFFFF"
                            strokeWidth={1.5}
                            className="transition-transform duration-200 hover:scale-125"
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              ) : (
                /* INDIA MAP VIEW */
                <div className="relative mt-4">
                  <svg
                    viewBox={India.viewBox}
                    className="h-auto w-full max-h-[38rem] overflow-visible"
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
                              : "fill-slate-200 hover:fill-slate-300",
                            selected && "fill-brand-900 stroke-brand-200 stroke-[2.2]"
                          )}
                        />
                      );
                    })}
                  </svg>
                </div>
              )}

              {/* Dynamic Hover Tooltip */}
              {tooltip && (
                <div
                  role="status"
                  className="pointer-events-none absolute z-30 w-52 -translate-x-1/2 -translate-y-[115%] rounded-xl bg-brand-950/95 p-3 text-white shadow-lift backdrop-blur-sm transition-opacity duration-150 border border-brand-700/60"
                  style={{ left: `${tooltip.x}%`, top: `${tooltip.y}%` }}
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-200">{tooltip.title}</p>
                  <p className="mt-1 text-xs text-white/90 leading-tight">{tooltip.subtitle}</p>
                </div>
              )}

              {/* Bottom Instructions / Explanatory Note */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-brand-100 pt-3 text-xs text-ink-muted">
                <span>
                  {viewMode === "world"
                    ? "Click or hover over any international hub (New Delhi, New York, London, Dubai, Singapore, Sydney) to view global mission parameters."
                    : "Click any highlighted Indian state to view district-level program records transcribed from statutory filings."}
                </span>
                <button
                  type="button"
                  onClick={() => setViewMode(viewMode === "world" ? "india" : "world")}
                  className="font-semibold text-brand-700 hover:text-brand-900 underline underline-offset-2"
                >
                  Switch to {viewMode === "world" ? "India Grassroots Network →" : "World Map View →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

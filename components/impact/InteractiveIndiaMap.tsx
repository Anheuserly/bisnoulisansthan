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
  type GlobalRegion,
} from "@/data/global-program-data";
import {
  getIndiaStateProgram,
  indiaProgramData,
  indiaProgrammeTotals,
  type IndiaStateProgram,
} from "@/data/india-program-data";
import { type MapFootprintConfig } from "@/config/customizer";
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

interface InteractiveIndiaMapProps {
  customizerConfig?: MapFootprintConfig;
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

export function InteractiveIndiaMap({ customizerConfig }: InteractiveIndiaMapProps) {
  const [viewMode, setViewMode] = useState<MapViewMode>(customizerConfig?.defaultMode || "world");
  const [selectedRegionId, setSelectedRegionId] = useState<string>("india");
  const [selectedStateName, setSelectedStateName] = useState<string>("Uttar Pradesh");
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  // Selected entities
  const selectedRegion = getGlobalRegion(selectedRegionId);
  const selectedState = getIndiaStateProgram(selectedStateName);

  // Animated metric counters with real, accurate data
  const verifiedStatesCount = useCountUp(GLOBAL_SUMMARY_TOTALS.verifiedStates);
  const verifiedDistrictsCount = useCountUp(GLOBAL_SUMMARY_TOTALS.verifiedDistricts);
  const globalTargetHubsCount = useCountUp(GLOBAL_SUMMARY_TOTALS.targetGlobalHubs);

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
          
          {/* Left Column: Context, Mode Switcher & Metric Telemetry (Balanced with Map height) */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-8 shadow-soft lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sand-100/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-800">
                <Globe2 className="h-4 w-4 text-brand-600" />
                <span>{customizerConfig?.eyebrow || "Global Alliances & Verified Grassroots Footprint"}</span>
              </div>

              <h2 className="mt-3.5 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl lg:text-[2.25rem]">
                {customizerConfig?.heading || "Where grassroots action meets international vision."}
              </h2>

              <p className="mt-3.5 text-xs leading-relaxed text-ink-muted sm:text-sm">
                {customizerConfig?.description ||
                  "Bisnouli Sarvodaya Gramodyog Sewa Sansthan anchors 30+ years of verified grassroots field execution across 350+ villages in India, with our institutional target to reach, connect, and collaborate globally across diaspora networks and UN SDG frameworks."}
              </p>

              {/* Seamless View Mode Switcher Pills */}
              <div className="mt-5 flex items-center rounded-xl bg-sand-50 p-1.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setViewMode("world")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-bold transition-all duration-200",
                    viewMode === "world"
                      ? "bg-brand-700 text-white shadow-soft"
                      : "text-ink-muted hover:text-brand-900 hover:bg-white/80"
                  )}
                >
                  <Globe2 className="h-4 w-4" />
                  <span>World / International</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("india")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 px-3 text-xs font-bold transition-all duration-200",
                    viewMode === "india"
                      ? "bg-brand-700 text-white shadow-soft"
                      : "text-ink-muted hover:text-brand-900 hover:bg-white/80"
                  )}
                >
                  <MapPin className="h-4 w-4" />
                  <span>India Grassroots</span>
                </button>
              </div>

              {/* 3 High-Impact Numeric Badges with Accurate Verified Data */}
              <div className="mt-6 grid grid-cols-3 gap-2.5 border-y border-line/50 py-4">
                {viewMode === "world" ? (
                  <>
                    <div className="border-l-2 border-brand-400 pl-2.5">
                      <p className="font-display text-2xl sm:text-3xl font-bold text-ink">
                        {verifiedStatesCount}
                      </p>
                      <p className="mt-1 text-[0.625rem] font-bold uppercase tracking-wider text-ink-muted">
                        Active States
                      </p>
                    </div>
                    <div className="border-l-2 border-brand-400 pl-2.5">
                      <p className="font-display text-2xl sm:text-3xl font-bold text-ink">
                        {indiaVillagesCount}+
                      </p>
                      <p className="mt-1 text-[0.625rem] font-bold uppercase tracking-wider text-ink-muted">
                        Villages
                      </p>
                    </div>
                    <div className="border-l-2 border-emerald-500 pl-2.5">
                      <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-800">
                        {globalTargetHubsCount}
                      </p>
                      <p className="mt-1 text-[0.625rem] font-bold uppercase tracking-wider text-emerald-700">
                        Global Hubs
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border-l-2 border-brand-400 pl-2.5">
                      <p className="font-display text-2xl sm:text-3xl font-bold text-ink">
                        {indiaStatesCount}
                      </p>
                      <p className="mt-1 text-[0.625rem] font-bold uppercase tracking-wider text-ink-muted">
                        States Covered
                      </p>
                    </div>
                    <div className="border-l-2 border-brand-400 pl-2.5">
                      <p className="font-display text-2xl sm:text-3xl font-bold text-ink">
                        {indiaDistrictsCount}
                      </p>
                      <p className="mt-1 text-[0.625rem] font-bold uppercase tracking-wider text-ink-muted">
                        Districts
                      </p>
                    </div>
                    <div className="border-l-2 border-emerald-500 pl-2.5">
                      <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-800">
                        {indiaVillagesCount}+
                      </p>
                      <p className="mt-1 text-[0.625rem] font-bold uppercase tracking-wider text-emerald-700">
                        Panchayats
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Interactive Selector Pills at the bottom of the left column */}
            <div className="mt-6 pt-4 border-t border-line/40">
              <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">
                {viewMode === "world" ? "Quick Select Global Hub:" : "Quick Select Field State:"}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {viewMode === "world" ? (
                  GLOBAL_REGIONS.map((region) => {
                    const isSelected = selectedRegionId === region.id;
                    return (
                      <button
                        key={region.id}
                        type="button"
                        onClick={() => setSelectedRegionId(region.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-150",
                          isSelected
                            ? "bg-brand-800 text-white shadow-2xs"
                            : "bg-sand-50 text-ink hover:bg-sand-100"
                        )}
                      >
                        <span>{region.flag}</span>
                        <span>{region.hub.city.split("&")[0]?.trim()}</span>
                      </button>
                    );
                  })
                ) : (
                  indiaProgramData.map((item) => {
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
                  })
                )}
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
                    {viewMode === "world"
                      ? "Global Outreach Horizon & Alliances Map"
                      : "Interactive India Grassroots Map"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[0.6875rem] font-semibold text-ink-muted">
                  {viewMode === "world" ? (
                    <>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-700" />
                        <span>India (Field Base HQ)</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                        <span>Target Global Hubs</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                        <span>Global Horizon</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-700" />
                        <span>Active Field State</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                        <span>Other States</span>
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* WORLD MAP VIEW - Uncolored, honest global map with target hubs */}
              {viewMode === "world" ? (
                <div className="relative mt-4">
                  <svg
                    viewBox={World.viewBox}
                    className="h-auto w-full max-h-[34rem] overflow-visible"
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

                    {/* All World Countries: Uncolored clean neutral paths as requested */}
                    {worldLocations.map((location) => {
                      const isIndia = location.id.toLowerCase() === "in";

                      return (
                        <path
                          key={location.id}
                          d={location.path}
                          role="button"
                          tabIndex={0}
                          aria-label={
                            isIndia
                              ? "India: National Grassroots Headquarters & 350+ Village Operations"
                              : `${location.name}: Global Expansion Horizon`
                          }
                          onClick={() => {
                            if (isIndia) {
                              setSelectedRegionId("india");
                            }
                          }}
                          onKeyDown={(e) => {
                            if ((e.key === "Enter" || e.key === " ") && isIndia) {
                              e.preventDefault();
                              setSelectedRegionId("india");
                            }
                          }}
                          onMouseEnter={(e) =>
                            updateTooltip(
                              location.name,
                              isIndia
                                ? "🇮🇳 National Grassroots Base & 350+ Village Network"
                                : "Global Expansion Horizon (Target Outreach)",
                              e
                            )
                          }
                          onMouseMove={(e) =>
                            updateTooltip(
                              location.name,
                              isIndia
                                ? "🇮🇳 National Grassroots Base & 350+ Village Network"
                                : "Global Expansion Horizon (Target Outreach)",
                              e
                            )
                          }
                          onMouseLeave={() => setTooltip(null)}
                          className={cn(
                            "cursor-default stroke-white stroke-[0.8] outline-none transition-all duration-300",
                            isIndia
                              ? "cursor-pointer fill-brand-700 hover:fill-brand-600 hover:drop-shadow-[0_2px_8px_rgba(45,125,136,0.35)]"
                              : "fill-slate-100 hover:fill-slate-200"
                          )}
                        />
                      );
                    })}

                    {/* Target Connection Arcs radiating from New Delhi Headquarters to International Target Hubs */}
                    {GLOBAL_REGIONS.filter((r) => r.id !== "india").map((r) => {
                      const hq = { x: 707, y: 400 };
                      const target = r.hub;
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

                    {/* Target Radar Hubs at International Strategic Centres */}
                    {GLOBAL_REGIONS.map((region) => {
                      const { x, y } = region.hub;
                      const isSelected = selectedRegionId === region.id;
                      const isHQ = region.id === "india";

                      return (
                        <g
                          key={`hub-${region.id}`}
                          className="cursor-pointer"
                          onClick={() => setSelectedRegionId(region.id)}
                          onMouseEnter={(e) =>
                            updateTooltip(
                              region.name,
                              isHQ
                                ? "🇮🇳 National Operational Headquarters"
                                : `Target Hub: ${region.hub.city}`,
                              e
                            )
                          }
                          onMouseMove={(e) =>
                            updateTooltip(
                              region.name,
                              isHQ
                                ? "🇮🇳 National Operational Headquarters"
                                : `Target Hub: ${region.hub.city}`,
                              e
                            )
                          }
                          onMouseLeave={() => setTooltip(null)}
                        >
                          <circle
                            cx={x}
                            cy={y}
                            r={isHQ ? 14 : 10}
                            fill="url(#hubGlow)"
                            className="opacity-30"
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r={isHQ ? 6 : 4.5}
                            fill={isHQ ? "#D97706" : isSelected ? "#0F766E" : "#2D7D88"}
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
              )}

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

            {/* Bottom Instructions / Strategic Vision Goal Note */}
            <div className="mt-5 border-t border-line/60 pt-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted">
                <span>
                  {viewMode === "world"
                    ? (customizerConfig?.worldNote ||
                        "Uncolored international territories represent our strategic global outreach roadmap and diaspora engagement horizon.")
                    : (customizerConfig?.indiaNote ||
                        "Click any highlighted Indian state to view district-level program records transcribed from statutory filings.")}
                </span>
                <button
                  type="button"
                  onClick={() => setViewMode(viewMode === "world" ? "india" : "world")}
                  className="font-semibold text-brand-700 hover:text-brand-900 underline underline-offset-2"
                >
                  Switch to {viewMode === "world" ? "India Grassroots Network →" : "World Map View →"}
                </button>
              </div>

              {/* Global Vision Banner */}
              {viewMode === "world" && customizerConfig?.globalVisionGoal && (
                <div className="mt-3 rounded-xl bg-emerald-50/80 px-3.5 py-2 text-xs font-medium text-emerald-900">
                  <span className="font-bold text-emerald-800">Global Vision: </span>
                  {customizerConfig.globalVisionGoal}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FULL-WIDTH DEDICATED REGIONAL STRATEGY & FIELD INTELLIGENCE DOSSIER (Eliminates empty right space) */}
        <div className="mt-8 rounded-3xl bg-white p-6 sm:p-8 lg:p-9 shadow-soft">
          {viewMode === "world" ? (
            <div>
              {/* Dossier Header Bar with Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/50 pb-6">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand-100 text-2xl shadow-2xs">
                    {selectedRegion.flag}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-sand-100 px-3 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-brand-900">
                        {selectedRegion.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                        <MapPin className="h-3.5 w-3.5 text-brand-600" />
                        <span>Hub: {selectedRegion.hub.city}</span>
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-ink">
                      {selectedRegion.name}
                    </h3>
                  </div>
                </div>

                {/* Hub Quick Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-sand-50/80 p-1">
                  {GLOBAL_REGIONS.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRegionId(r.id)}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                        selectedRegionId === r.id
                          ? "bg-brand-700 text-white shadow-2xs"
                          : "text-ink-muted hover:text-ink hover:bg-white/60"
                      )}
                    >
                      <span>{r.flag}</span>{" "}
                      <span className="hidden sm:inline">{r.hub.city.split("&")[0]?.trim()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2-Column Balanced Executive Panel */}
              <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:items-start">
                
                {/* Left Half: Verified Metrics & Mission Narrative */}
                <div className="space-y-6 lg:col-span-6">
                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">
                      Quantitative Footprint &amp; Telemetry
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {selectedRegion.metrics.map((metric) => (
                        <div key={metric.label} className="rounded-2xl bg-sand-50/70 p-3.5 shadow-2xs">
                          <p className="font-display text-xl font-bold text-brand-900">{metric.value}</p>
                          <p className="mt-1 text-[0.6875rem] font-semibold text-ink-muted leading-tight">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-sand-50/50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-900">
                      Institutional Narrative &amp; Strategic Roadmap
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-ink-muted sm:text-sm">
                      {selectedRegion.description}
                    </p>
                  </div>
                </div>

                {/* Right Half: Focus Areas, UN SDGs & CSR Governance */}
                <div className="space-y-6 lg:col-span-6">
                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-brand-800">
                      Strategic Focus &amp; Execution Pillars
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {selectedRegion.focusAreas.map((focus) => (
                        <span
                          key={focus}
                          className="rounded-xl bg-sand-100/70 px-3 py-1.5 text-xs font-medium text-ink"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-line/40 pt-5">
                    <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-emerald-800">
                      UN Sustainable Development Goals (SDG) Alignment
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {selectedRegion.sdgAlignments.map((sdg) => (
                        <span
                          key={sdg}
                          className="rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800"
                        >
                          {sdg}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-brand-50/40 p-4 border-l-4 border-brand-500">
                    <p className="text-xs font-bold text-brand-900">
                      Global CSR &amp; Philanthropic Engagement
                    </p>
                    <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                      BSGSS welcomes institutional partnerships, diaspora foundations, and academic research collaborations to scale proven rural socio-economic models globally.
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <Link
                        href="/support"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-900 underline underline-offset-2"
                      >
                        Partner With Us <ArrowRight className="h-3 w-3" />
                      </Link>
                      <Link
                        href="/transparency"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink"
                      >
                        Statutory Disclosures <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* India Selected State Dossier */
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
                            Active Districts
                          </p>
                        </div>
                        <div className="rounded-2xl bg-sand-50/70 p-4 shadow-2xs">
                          <p className="font-display text-2xl font-bold text-brand-900">
                            {selectedState.programs}
                          </p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                            PSU CSR Projects
                          </p>
                        </div>
                        <div className="rounded-2xl bg-sand-50/70 p-4 shadow-2xs">
                          <p className="font-display text-2xl font-bold text-emerald-800">
                            350+
                          </p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                            Panchayats Reached
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-sand-50/50 p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-900">
                        Active Operational Districts in {selectedState.state}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                        Statutory records and partner project documentation verify active field programmes across the following district clusters:
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedState.districts.map((district) => (
                          <span
                            key={district}
                            className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-brand-850 shadow-2xs"
                          >
                            <MapPin className="h-3 w-3 text-brand-600" />
                            <span>{district}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Statutory Governance & PSU CSR Compliance */}
                  <div className="space-y-6 lg:col-span-6">
                    <div>
                      <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-brand-800">
                        Operational Delivery Areas
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        <span className="rounded-xl bg-sand-100/70 px-3 py-1.5 text-xs font-medium text-ink">
                          Mobile Preventive Healthcare &amp; Cancer Screening
                        </span>
                        <span className="rounded-xl bg-sand-100/70 px-3 py-1.5 text-xs font-medium text-ink">
                          Women Self-Help Guilds &amp; Tailoring Training
                        </span>
                        <span className="rounded-xl bg-sand-100/70 px-3 py-1.5 text-xs font-medium text-ink">
                          Remedial Computer Literacy &amp; Youth Skills
                        </span>
                        <span className="rounded-xl bg-sand-100/70 px-3 py-1.5 text-xs font-medium text-ink">
                          Community Potable Water Purification Plants
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-emerald-50/50 p-5 border-l-4 border-emerald-500">
                      <p className="text-xs font-bold text-emerald-950">
                        MCA &amp; Statutory Public-Purpose Compliance
                      </p>
                      <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                        All programmatic operations in {selectedState.state} comply with Ministry of Corporate Affairs CSR Schedule VII mandates, supported by major public sector enterprises including REC Limited, PFC, IOCL, GAIL, and ONGC.
                      </p>
                      <div className="mt-3">
                        <Link
                          href="/activities/key-programmes"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2"
                        >
                          View Detailed Field Project Case Studies <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="py-8 text-center text-sm text-ink-muted">
                  Select any state above or click directly on the map to inspect district programmes.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


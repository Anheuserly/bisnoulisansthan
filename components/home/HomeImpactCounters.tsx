"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Users,
  HeartPulse,
  Award,
  Sparkles,
  MapPin,
  CheckCircle2,
  Building2,
  Calendar,
} from "lucide-react";

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
  category: string;
  iconName: "users" | "health" | "training" | "villages" | "partners" | "years";
  badge: string;
  color: string;
}

const IMPACT_METRICS: StatItem[] = [
  {
    id: "lives",
    target: 50000,
    suffix: "+",
    label: "Underprivileged Lives Empowered",
    sublabel: "Across 5 Northern states through integrated grassroots programs",
    category: "Community Outreach",
    iconName: "users",
    badge: "Audited Grassroots Reach",
    color: "from-teal-500 to-brand-700",
  },
  {
    id: "patients",
    target: 30000,
    suffix: "+",
    label: "Patients Screened & Treated",
    sublabel: "Free diagnostic oncology, eye checkups & essential medicines",
    category: "Healthcare Mission",
    iconName: "health",
    badge: "Preventive Diagnostics",
    color: "from-rose-500 to-brand-800",
  },
  {
    id: "women",
    target: 5000,
    suffix: "+",
    label: "Women Certified in Livelihoods",
    sublabel: "Vocational tailoring, computer literacy & self-help banking",
    category: "Livelihood & Khadi",
    iconName: "training",
    badge: "Economic Self-Reliance",
    color: "from-amber-500 to-amber-700",
  },
  {
    id: "villages",
    target: 350,
    suffix: "+",
    label: "Rural Villages Reached",
    sublabel: "Active community mobilization in Delhi NCR, UP, Haryana & Punjab",
    category: "Field Presence",
    iconName: "villages",
    badge: "Local Panchayats",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    id: "partners",
    target: 30,
    suffix: "+",
    label: "Institutional CSR Partners",
    sublabel: "Collaborating with leading PSUs like RITES, IRCON, REC, NTPC, BHEL",
    category: "Institutional Trust",
    iconName: "partners",
    badge: "CSR-1 Registered",
    color: "from-blue-500 to-indigo-700",
  },
  {
    id: "years",
    target: 30,
    suffix: " Years",
    label: "Unbroken Grassroots Service",
    sublabel: "Founded in Bisnouli in 1994, upholding Sarvodaya principles",
    category: "Heritage & Legacy",
    iconName: "years",
    badge: "Since 1994",
    color: "from-stone-600 to-stone-900",
  },
];

function formatCount(value: number): string {
  return value.toLocaleString("en-IN");
}

function StatCard({ stat, inView }: { stat: StatItem; inView: boolean }) {
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const duration = 2400; // 2.4s luxurious smooth count up
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Luxurious easeOutExpo curve for realistic human deceleration
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const nextVal = Math.floor(easeOutExpo * stat.target);

      setCurrentVal(nextVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentVal(stat.target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, stat.target]);

  const renderIcon = () => {
    switch (stat.iconName) {
      case "users":
        return <Users className="h-5 w-5" />;
      case "health":
        return <HeartPulse className="h-5 w-5" />;
      case "training":
        return <Award className="h-5 w-5" />;
      case "villages":
        return <MapPin className="h-5 w-5" />;
      case "partners":
        return <Building2 className="h-5 w-5" />;
      case "years":
        return <Calendar className="h-5 w-5" />;
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-brand-200/80 bg-white p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl">
      {/* Decorative top accent glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Category Pill and Badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-700 shadow-2xs transition-transform duration-300 group-hover:scale-110">
            {renderIcon()}
          </span>
          <span>{stat.category}</span>
        </span>
        <span className="rounded-full bg-sand-100 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-ink-muted">
          {stat.badge}
        </span>
      </div>

      {/* Live Animated Number */}
      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl lg:text-[2.65rem] tabular-nums">
          {stat.prefix}
          {formatCount(currentVal)}
        </span>
        <span className="font-display text-2xl font-bold text-brand-700 sm:text-3xl">
          {stat.suffix}
        </span>
      </div>

      {/* Primary Label */}
      <h3 className="mt-2 font-display text-base font-bold text-ink sm:text-lg">
        {stat.label}
      </h3>

      {/* Sublabel / Context */}
      <p className="mt-1.5 text-xs leading-relaxed text-ink-muted sm:text-[13px]">
        {stat.sublabel}
      </p>

      {/* Bottom Subtle Trust Indicator */}
      <div className="mt-4 flex items-center gap-1.5 border-t border-brand-100/70 pt-3 text-[0.6875rem] font-medium text-emerald-700">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
        <span>Verified Field Documentation</span>
      </div>
    </div>
  );
}

export function HomeImpactCounters() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Trigger once cleanly
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden border-b border-brand-100 bg-gradient-to-b from-brand-50/70 via-sand-50/50 to-white py-14 sm:py-20"
      id="impact"
    >
      {/* Ambient background blur elements */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-brand-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Header Block */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-800 shadow-2xs">
              <TrendingUp className="h-3.5 w-3.5 text-brand-700" />
              <span>Measurable Grassroots Scale</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
              Our reach and measurable outcomes.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
              Progress that is practical, human-centered, and audited since 1994 across community centers, mobile medical clinics, and village craft cooperatives.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/impact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-brand-800 hover:shadow-soft sm:text-sm"
            >
              <span>Explore Detailed Impact</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 6 Grid Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {IMPACT_METRICS.map((stat) => (
            <StatCard key={stat.id} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

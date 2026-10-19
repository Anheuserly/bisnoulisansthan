import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Database,
  FileCheck2,
  Globe,
  HeartPulse,
  Image,
  KeyRound,
  Layers,
  LayoutPanelTop,
  MessageSquare,
  Music,
  Palette,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { db } from "@/lib/db";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";
import { getActiveTheme } from "@/lib/theme/get-active-theme";

export const metadata = {
  title: "Dashboard Overview | BSGSS Control Centre",
};

export default async function AdminDashboard() {
  const admin = await requireAdmin();

  // Load real-time operational counts
  let counts = { users: 2, inquiries: 0, joins: 0, donations: 0 };
  if (process.env.DATABASE_URL) {
    try {
      const [usersRes, inqRes, joinsRes, donRes] = await Promise.all([
        db.query<{ count: string }>("SELECT count(*) FROM users WHERE is_active = true"),
        db.query<{ count: string }>("SELECT count(*) FROM contact_inquiries"),
        db.query<{ count: string }>("SELECT count(*) FROM join_applications"),
        db.query<{ count: string }>("SELECT count(*) FROM donation_requests"),
      ]);

      counts = {
        users: Number(usersRes.rows[0]?.count ?? 0),
        inquiries: Number(inqRes.rows[0]?.count ?? 0),
        joins: Number(joinsRes.rows[0]?.count ?? 0),
        donations: Number(donRes.rows[0]?.count ?? 0),
      };
    } catch {}
  }

  const customizer = await getCustomizerSettings();
  const theme = await getActiveTheme();

  return (
    <div className="flex-1 space-y-6 p-5 sm:p-8 md:p-10">
      {/* Top Welcome & System Status Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-line bg-white p-6 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
              BSGSS Executive Control
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
            Welcome back, {admin.displayName || admin.email.split("@")[0]}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-ink-muted">
            Overview of field operations, live website presentation, community inquiries, and donor verifications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
            <Database className="h-3.5 w-3.5 text-emerald-600" />
            <span>PostgreSQL Active</span>
          </div>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-brand-800 transition"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Live Website</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Smart KPI Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Inquiries */}
        <Link
          href="/admin/inquiries"
          className="group rounded-2xl border border-line bg-white p-5 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Contact Inquiries</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:scale-105">
              <MessageSquare className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-ink">{counts.inquiries}</p>
          <div className="mt-2 flex items-center justify-between text-xs text-brand-700 font-semibold">
            <span>Inbox messages</span>
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Metric 2: Volunteer & Join */}
        <Link
          href="/admin/join"
          className="group rounded-2xl border border-line bg-white p-5 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Applications</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700 transition group-hover:scale-105">
              <UsersRound className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-ink">{counts.joins}</p>
          <div className="mt-2 flex items-center justify-between text-xs text-purple-700 font-semibold">
            <span>Volunteers &amp; CSR</span>
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Metric 3: Donations */}
        <Link
          href="/admin/donations"
          className="group rounded-2xl border border-line bg-white p-5 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Donations &amp; 80G</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:scale-105">
              <FileCheck2 className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-ink">{counts.donations}</p>
          <div className="mt-2 flex items-center justify-between text-xs text-emerald-700 font-semibold">
            <span>Payment receipts</span>
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Metric 4: Active Users */}
        <Link
          href="/admin/admins"
          className="group rounded-2xl border border-line bg-white p-5 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Authorised Admins</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 transition group-hover:scale-105">
              <KeyRound className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-ink">{counts.users}</p>
          <div className="mt-2 flex items-center justify-between text-xs text-amber-800 font-semibold">
            <span>Manage accounts</span>
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </div>
        </Link>
      </div>

      {/* Featured Primary Studio Engines */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Engine 1: Website & Homepage Studio */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-brand-200/90 bg-gradient-to-br from-white via-sand-50/70 to-brand-50/40 p-6 sm:p-7 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-sm ring-4 ring-brand-100">
              <SlidersHorizontal className="h-6 w-6" />
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Customizer</span>
            </span>
          </div>

          <h2 className="mt-5 font-display text-xl font-bold text-ink sm:text-2xl">
            Website &amp; Homepage Studio
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
            Directly reorder homepage sections up or down, manage the stylish magazine photo collage, configure relaxing ambient Indian music, and customize live typewriter text.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-[0.6875rem] font-semibold text-ink">
            <span className="rounded-md bg-white border border-brand-200 px-2.5 py-1 shadow-2xs">
              ⚡ {customizer.sections.filter((s) => s.enabled).length} Active Sections
            </span>
            <span className="rounded-md bg-white border border-brand-200 px-2.5 py-1 shadow-2xs">
              📸 6 Collage Photos
            </span>
            <span className="rounded-md bg-white border border-brand-200 px-2.5 py-1 shadow-2xs">
              ♫ Ambient Flute &amp; Drone
            </span>
            <span className="rounded-md bg-white border border-brand-200 px-2.5 py-1 shadow-2xs">
              ⌨️ Typewriter Ticker
            </span>
          </div>

          <div className="mt-6">
            <Link
              href="/admin/customize"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-2xs transition hover:bg-brand-800 hover:shadow-xs"
            >
              <span>Open Customizer Studio</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Engine 2: Theme & Design Studio */}
        <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 sm:p-7 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-sm ring-4 ring-amber-100">
              <Palette className="h-6 w-6" />
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200">
              <span>Theme Engine</span>
            </span>
          </div>

          <h2 className="mt-5 font-display text-xl font-bold text-ink sm:text-2xl">
            Theme &amp; Visual Identity Studio
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
            Customize institutional brand color presets (Ocean Teal, Royal Indigo, Emerald Hope, Terracotta), font pairings, corner curvature, and shadow depths.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-[0.6875rem] font-semibold text-ink">
            <span className="flex items-center gap-1.5 rounded-md bg-sand-50 border border-line px-2.5 py-1">
              <span className="h-2 w-2 rounded-full" style={{ background: theme.brandPrimary }} />
              <span>Current: {theme.name}</span>
            </span>
            <span className="rounded-md bg-sand-50 border border-line px-2.5 py-1">
              Typography: {theme.fontPairing}
            </span>
            <span className="rounded-md bg-sand-50 border border-line px-2.5 py-1">
              Radius: {theme.radius}
            </span>
          </div>

          <div className="mt-6">
            <Link
              href="/admin/theme"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-sand-50 px-5 py-2.5 text-xs sm:text-sm font-semibold text-brand-800 transition hover:bg-brand-100"
            >
              <span>Open Theme Studio</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary Management Modules Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/content"
          className="group rounded-2xl border border-line bg-white p-5 shadow-2xs transition hover:border-brand-300 hover:shadow-soft"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand-100 text-brand-700 transition group-hover:bg-brand-50">
            <LayoutPanelTop className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-base font-bold text-ink">Content Hub</h3>
          <p className="mt-1 text-xs text-ink-muted leading-relaxed">
            Manage pages, key programmes, SHG product catalogs, and public compliance reports.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
            Open Content Hub <ArrowRight className="h-3 w-3" />
          </span>
        </Link>

        <Link
          href="/admin/inquiries"
          className="group rounded-2xl border border-line bg-white p-5 shadow-2xs transition hover:border-brand-300 hover:shadow-soft"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand-100 text-brand-700 transition group-hover:bg-brand-50">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-base font-bold text-ink">Inquiries Inbox</h3>
          <p className="mt-1 text-xs text-ink-muted leading-relaxed">
            Review incoming public queries, partnership requests, and community letters.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
            View Inquiries <ArrowRight className="h-3 w-3" />
          </span>
        </Link>

        <Link
          href="/admin/admins"
          className="group rounded-2xl border border-line bg-white p-5 shadow-2xs transition hover:border-brand-300 hover:shadow-soft"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand-100 text-brand-700 transition group-hover:bg-brand-50">
            <KeyRound className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-base font-bold text-ink">Security &amp; Passwords</h3>
          <p className="mt-1 text-xs text-ink-muted leading-relaxed">
            Update administrator credentials, manage role privileges, and inspect audit logs.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
            Manage Access <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
      </div>
    </div>
  );
}

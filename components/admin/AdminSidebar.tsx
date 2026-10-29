"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  Award,
  Building2,
  Camera,
  ChevronDown,
  ChevronRight,
  FileCheck2,
  FileText,
  Globe,
  Home,
  KeyRound,
  Layers,
  LayoutDashboard,
  LayoutPanelTop,
  ListVideo,
  LogOut,
  Menu,
  MessageSquare,
  Music,
  Palette,
  Route,
  Share2,
  Sliders,
  SlidersHorizontal,
  Type,
  UsersRound,
  Bell,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface StudioSubModule {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const STUDIO_SUB_MODULES: StudioSubModule[] = [
  { id: "certificate", label: "Donation Certificate", href: "/admin/customize?tab=certificate", icon: Award, badge: "Live Preview" },
  { id: "videos", label: "Video Archives & Films", href: "/admin/customize?tab=videos", icon: ListVideo },
  { id: "sections", label: "Homepage Sections & Order", href: "/admin/customize?tab=sections", icon: Layers },
  { id: "story", label: "Our Story & Milestones", href: "/admin/customize?tab=story", icon: Route },
  { id: "popup", label: "Pop-up Announcements", href: "/admin/customize?tab=popup", icon: Bell },
  { id: "texts", label: "Website Texts & Copy", href: "/admin/customize?tab=texts", icon: FileText },
  { id: "layout", label: "Header, Nav & Footer Size", href: "/admin/customize?tab=layout", icon: Sliders },
  { id: "offices", label: "Offices & WhatsApp Setup", href: "/admin/customize?tab=offices", icon: Building2 },
  { id: "collage", label: "Photo Collage & Gallery", href: "/admin/customize?tab=collage", icon: Camera },
  { id: "audio", label: "Relaxing Ambient Music", href: "/admin/customize?tab=audio", icon: Music },
  { id: "typing", label: "Live Mission Ticker", href: "/admin/customize?tab=typing", icon: Type },
  { id: "social", label: "Social Media Channels", href: "/admin/customize?tab=social", icon: Share2 },
  { id: "footprint", label: "Footprint & Reach", href: "/admin/customize?tab=footprint", icon: Globe },
];

interface AdminSidebarProps {
  admin: {
    id: string;
    email: string;
    displayName?: string | null;
    role?: string;
  };
  counts?: {
    users?: number;
    inquiries?: number;
    joins?: number;
    donations?: number;
  };
}

function SidebarNavContent({
  counts = {},
  onNavigate,
}: {
  counts?: {
    users?: number;
    inquiries?: number;
    joins?: number;
    donations?: number;
  };
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get("tab") || "certificate";

  const isCustomizerRoute = pathname === "/admin/customize";
  const [studioExpanded, setStudioExpanded] = useState(true);

  // Automatically expand when on customize route
  useEffect(() => {
    if (isCustomizerRoute) {
      setStudioExpanded(true);
    }
  }, [isCustomizerRoute]);

  return (
    <nav className="space-y-5 px-3 py-2 overflow-y-auto max-h-[calc(100vh-210px)] scrollbar-thin">
      {/* 1. MAIN NAVIGATION */}
      <div>
        <p className="px-3 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-ink-muted/80 mb-1.5">
          MAIN NAVIGATION
        </p>
        <div className="space-y-0.5">
          <Link
            href="/admin"
            onClick={onNavigate}
            className={cn(
              "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150",
              pathname === "/admin"
                ? "bg-brand-700 text-white shadow-2xs"
                : "text-ink-muted hover:bg-sand-100 hover:text-ink"
            )}
          >
            <span className="flex items-center gap-2.5 truncate">
              <LayoutDashboard
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
                  pathname === "/admin" ? "text-white" : "text-brand-700"
                )}
              />
              <span className="truncate">Dashboard Overview</span>
            </span>
          </Link>
        </div>
      </div>

      {/* 2. STUDIO & CUSTOMIZER - ACCORDION */}
      <div>
        <p className="px-3 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-ink-muted/80 mb-1.5">
          STUDIO &amp; CUSTOMIZER
        </p>
        <div className="space-y-0.5">
          {/* Main Website Studio Accordion Row */}
          <div>
            <div
              className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150 select-none cursor-pointer",
                isCustomizerRoute
                  ? "bg-brand-50/90 text-brand-900 border border-brand-200/80 shadow-2xs"
                  : "text-ink-muted hover:bg-sand-100 hover:text-ink"
              )}
            >
              <Link
                href="/admin/customize"
                onClick={onNavigate}
                className="flex items-center gap-2.5 truncate flex-1 min-w-0"
              >
                <SlidersHorizontal
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
                    isCustomizerRoute ? "text-brand-800" : "text-brand-700"
                  )}
                />
                <span className="truncate">Website &amp; Layout Studio</span>
              </Link>

              {/* Chevron Down / Right to toggle the nested tree */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setStudioExpanded(!studioExpanded);
                }}
                title={studioExpanded ? "Collapse Sub-modules" : "Expand Sub-modules"}
                className="ml-2 flex h-5 w-5 items-center justify-center rounded text-ink-muted hover:bg-sand-200/60 hover:text-ink transition"
              >
                {studioExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            {/* Indented Sub-Modules Tree with Stylish Connector Guide Line */}
            {studioExpanded && (
              <div className="relative ml-4 pl-3 border-l-2 border-brand-200/70 my-1 space-y-0.5 animate-fadeIn">
                {STUDIO_SUB_MODULES.map((sub) => {
                  const SubIcon = sub.icon;
                  const isSubActive = isCustomizerRoute && currentTab === sub.id;

                  return (
                    <Link
                      key={sub.id}
                      href={sub.href}
                      onClick={onNavigate}
                      className={cn(
                        "group relative flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors",
                        isSubActive
                          ? "bg-brand-700 text-white font-bold shadow-2xs"
                          : "text-ink-muted hover:text-ink hover:bg-sand-100/90 font-medium"
                      )}
                    >
                      {/* Active indicator pip on the connector line */}
                      {isSubActive && (
                        <span className="absolute -left-[14px] top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-brand-700 ring-2 ring-white" />
                      )}

                      <span className="flex items-center gap-2 truncate">
                        <SubIcon
                          className={cn(
                            "h-3.5 w-3.5 shrink-0",
                            isSubActive ? "text-white" : "text-brand-700/80 group-hover:text-brand-800"
                          )}
                        />
                        <span className="truncate">{sub.label}</span>
                      </span>

                      {sub.badge && (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.2 text-[9px] font-bold shrink-0 ml-1 border",
                            isSubActive
                              ? "bg-white/20 text-white border-white/30"
                              : "bg-emerald-50 text-emerald-800 border-emerald-200"
                          )}
                        >
                          {sub.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme & Design Studio */}
          <Link
            href="/admin/theme"
            onClick={onNavigate}
            className={cn(
              "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150",
              pathname === "/admin/theme"
                ? "bg-brand-700 text-white shadow-2xs"
                : "text-ink-muted hover:bg-sand-100 hover:text-ink"
            )}
          >
            <span className="flex items-center gap-2.5 truncate">
              <Palette
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
                  pathname === "/admin/theme" ? "text-white" : "text-brand-700"
                )}
              />
              <span className="truncate">Theme &amp; Design Studio</span>
            </span>
          </Link>

          {/* Content Hub */}
          <Link
            href="/admin/content"
            onClick={onNavigate}
            className={cn(
              "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150",
              pathname === "/admin/content"
                ? "bg-brand-700 text-white shadow-2xs"
                : "text-ink-muted hover:bg-sand-100 hover:text-ink"
            )}
          >
            <span className="flex items-center gap-2.5 truncate">
              <LayoutPanelTop
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
                  pathname === "/admin/content" ? "text-white" : "text-brand-700"
                )}
              />
              <span className="truncate">Content Hub</span>
            </span>
          </Link>
        </div>
      </div>

      {/* 3. OPERATIONS & INBOX */}
      <div>
        <p className="px-3 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-ink-muted/80 mb-1.5">
          OPERATIONS &amp; INBOX
        </p>
        <div className="space-y-0.5">
          {/* Donations & 80G */}
          <Link
            href="/admin/donations"
            onClick={onNavigate}
            className={cn(
              "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150",
              pathname === "/admin/donations"
                ? "bg-brand-700 text-white shadow-2xs"
                : "text-ink-muted hover:bg-sand-100 hover:text-ink"
            )}
          >
            <span className="flex items-center gap-2.5 truncate">
              <FileCheck2
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
                  pathname === "/admin/donations" ? "text-white" : "text-brand-700"
                )}
              />
              <span className="truncate">Donations &amp; 80G</span>
            </span>
            {typeof counts.donations === "number" && counts.donations > 0 && (
              <span
                className={cn(
                  "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.625rem] font-bold",
                  pathname === "/admin/donations" ? "bg-white text-brand-800" : "bg-sand-200 text-ink"
                )}
              >
                {counts.donations}
              </span>
            )}
          </Link>

          {/* Contact Inquiries */}
          <Link
            href="/admin/inquiries"
            onClick={onNavigate}
            className={cn(
              "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150",
              pathname === "/admin/inquiries"
                ? "bg-brand-700 text-white shadow-2xs"
                : "text-ink-muted hover:bg-sand-100 hover:text-ink"
            )}
          >
            <span className="flex items-center gap-2.5 truncate">
              <MessageSquare
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
                  pathname === "/admin/inquiries" ? "text-white" : "text-brand-700"
                )}
              />
              <span className="truncate">Contact Inquiries</span>
            </span>
            {typeof counts.inquiries === "number" && counts.inquiries > 0 && (
              <span
                className={cn(
                  "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.625rem] font-bold",
                  pathname === "/admin/inquiries" ? "bg-white text-brand-800" : "bg-sand-200 text-ink"
                )}
              >
                {counts.inquiries}
              </span>
            )}
          </Link>

          {/* Join & Volunteers */}
          <Link
            href="/admin/join"
            onClick={onNavigate}
            className={cn(
              "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150",
              pathname === "/admin/join"
                ? "bg-brand-700 text-white shadow-2xs"
                : "text-ink-muted hover:bg-sand-100 hover:text-ink"
            )}
          >
            <span className="flex items-center gap-2.5 truncate">
              <UsersRound
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
                  pathname === "/admin/join" ? "text-white" : "text-brand-700"
                )}
              />
              <span className="truncate">Join &amp; Volunteers</span>
            </span>
            {typeof counts.joins === "number" && counts.joins > 0 && (
              <span
                className={cn(
                  "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.625rem] font-bold",
                  pathname === "/admin/join" ? "bg-white text-brand-800" : "bg-sand-200 text-ink"
                )}
              >
                {counts.joins}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* 4. SYSTEM & ACCESS */}
      <div>
        <p className="px-3 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-ink-muted/80 mb-1.5">
          SYSTEM &amp; ACCESS
        </p>
        <div className="space-y-0.5">
          <Link
            href="/admin/admins"
            onClick={onNavigate}
            className={cn(
              "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150",
              pathname === "/admin/admins"
                ? "bg-brand-700 text-white shadow-2xs"
                : "text-ink-muted hover:bg-sand-100 hover:text-ink"
            )}
          >
            <span className="flex items-center gap-2.5 truncate">
              <KeyRound
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
                  pathname === "/admin/admins" ? "text-white" : "text-brand-700"
                )}
              />
              <span className="truncate">Users &amp; Passwords</span>
            </span>
            {typeof counts.users === "number" && counts.users > 0 && (
              <span
                className={cn(
                  "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.625rem] font-bold",
                  pathname === "/admin/admins" ? "bg-white text-brand-800" : "bg-sand-200 text-ink"
                )}
              >
                {counts.users}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function AdminSidebar({ admin, counts = {} }: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-white">
      {/* Brand & Organization Header */}
      <div>
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-white shadow-sm ring-2 ring-brand-100">
              <span className="font-display text-base font-bold tracking-tight">BS</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-sm font-bold text-ink">BSGSS Control</span>
                <span className="rounded-sm bg-brand-50 px-1 py-0.2 text-[0.625rem] font-bold text-brand-700 border border-brand-200">
                  v2.6
                </span>
              </div>
              <div className="flex items-center gap-1 text-[0.6875rem] font-medium text-emerald-700 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Operational Workspace</span>
              </div>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-muted hover:bg-sand-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick View Public Website Link */}
        <div className="p-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-brand-200/90 bg-gradient-to-r from-sand-50 to-brand-50/60 px-3.5 py-2.5 text-xs font-semibold text-brand-800 shadow-2xs transition hover:border-brand-300 hover:shadow-xs"
          >
            <span className="flex items-center gap-2">
              <Home className="h-3.5 w-3.5 text-brand-700" />
              <span>Public BSGSS Website</span>
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-brand-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Navigation Categories wrapped in Suspense */}
        <Suspense fallback={<div className="p-4 text-xs text-ink-muted">Loading navigation...</div>}>
          <SidebarNavContent counts={counts} onNavigate={() => setMobileOpen(false)} />
        </Suspense>
      </div>

      {/* Footer Profile & Logout Area */}
      <div className="border-t border-line bg-sand-50/60 p-3.5">
        <div className="flex items-center justify-between gap-2 rounded-xl border border-line bg-white p-2.5 shadow-2xs">
          <div className="flex items-center gap-2.5 truncate">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold">
              {(admin.displayName || admin.email || "A").charAt(0).toUpperCase()}
            </div>
            <div className="truncate text-left">
              <p className="text-xs font-bold text-ink truncate leading-tight">
                {admin.displayName || admin.email.split("@")[0]}
              </p>
              <p className="text-[0.625rem] text-ink-muted truncate font-mono mt-0.5">
                {admin.email}
              </p>
            </div>
          </div>

          <form action="/api/admin/logout" method="post" className="shrink-0">
            <button
              type="submit"
              title="Sign Out of Admin Control Centre"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-muted hover:border-red-200 hover:bg-red-50 hover:text-red-700 transition"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky / Frozen Sidenav (Width 64 / 72, 100vh height, Never scrolls away) */}
      <aside className="hidden md:flex h-screen w-64 lg:w-72 flex-shrink-0 flex-col sticky top-0 border-r border-line shadow-xs select-none z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Top Bar with Drawer Trigger */}
      <div className="md:hidden flex items-center justify-between border-b border-line bg-white px-4 py-3 sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-700 text-white font-bold text-xs">
            BS
          </div>
          <span className="font-display text-sm font-bold text-ink">BSGSS Control</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink hover:bg-sand-50"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Slide-Out Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-fadeIn"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

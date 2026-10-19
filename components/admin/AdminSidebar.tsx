"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  FileCheck2,
  FolderKanban,
  HeartHandshake,
  Home,
  KeyRound,
  Layers,
  LayoutDashboard,
  LayoutPanelTop,
  LogOut,
  Menu,
  MessageSquare,
  Music,
  Palette,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
  badge?: string;
  badgeColor?: string;
  count?: number;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

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

export function AdminSidebar({ admin, counts = {} }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navGroups: NavGroup[] = [
    {
      group: "MAIN NAVIGATION",
      items: [
        {
          label: "Dashboard Overview",
          href: "/admin",
          icon: LayoutDashboard,
          exact: true,
        },
      ],
    },
    {
      group: "STUDIO & CUSTOMIZER",
      items: [
        {
          label: "Website & Layout Studio",
          href: "/admin/customize",
          icon: SlidersHorizontal,
          badge: "2026 Live",
          badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        },
        {
          label: "Theme & Design Studio",
          href: "/admin/theme",
          icon: Palette,
          badge: "Presets",
          badgeColor: "bg-brand-50 text-brand-700 border-brand-200",
        },
        {
          label: "Content Hub",
          href: "/admin/content",
          icon: LayoutPanelTop,
        },
      ],
    },
    {
      group: "OPERATIONS & INBOX",
      items: [
        {
          label: "Contact Inquiries",
          href: "/admin/inquiries",
          icon: MessageSquare,
          count: counts.inquiries,
        },
        {
          label: "Join & Volunteers",
          href: "/admin/join",
          icon: UsersRound,
          count: counts.joins,
        },
        {
          label: "Donations & 80G",
          href: "/admin/donations",
          icon: FileCheck2,
          count: counts.donations,
        },
      ],
    },
    {
      group: "SYSTEM & ACCESS",
      items: [
        {
          label: "Users & Passwords",
          href: "/admin/admins",
          icon: KeyRound,
          count: counts.users,
        },
      ],
    },
  ];

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

        {/* Navigation Categories */}
        <nav className="space-y-5 px-3 py-2 overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-thin">
          {navGroups.map((group) => (
            <div key={group.group}>
              <p className="px-3 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-ink-muted/80 mb-1.5">
                {group.group}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150",
                        isActive
                          ? "bg-brand-700 text-white shadow-2xs"
                          : "text-ink-muted hover:bg-sand-100 hover:text-ink"
                      )}
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
                            isActive ? "text-white" : "text-brand-700"
                          )}
                        />
                        <span className="truncate">{item.label}</span>
                      </span>

                      {/* Count or Badge */}
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.2 text-[0.625rem] font-bold border",
                            isActive ? "bg-white/20 text-white border-white/30" : item.badgeColor
                          )}
                        >
                          {item.badge}
                        </span>
                      )}

                      {typeof item.count === "number" && item.count > 0 && (
                        <span
                          className={cn(
                            "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.625rem] font-bold",
                            isActive ? "bg-white text-brand-800" : "bg-sand-200 text-ink"
                          )}
                        >
                          {item.count}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
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

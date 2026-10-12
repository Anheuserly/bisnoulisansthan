import Link from "next/link";
import { Palette } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getActiveTheme } from "@/lib/theme/get-active-theme";
import { ThemeStudio } from "@/components/admin/ThemeStudio";

export const metadata = {
  title: "Theme & Design Studio | BSGSS Admin",
  description: "Customize site-wide colors, presets, typography, curvature, and effects.",
};

export default async function AdminThemePage() {
  await requireAdmin();
  const initialTheme = await getActiveTheme();

  return (
    <main className="min-h-screen bg-sand-50 pb-20">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <div>
            <Link
              href="/admin"
              className="text-xs font-semibold text-brand-700 hover:underline"
            >
              ← Back to Control Centre
            </Link>
            <div className="mt-1 flex items-center gap-2">
              <Palette className="h-5 w-5 text-brand-700" />
              <h1 className="font-display text-xl font-bold text-ink">
                Theme &amp; Design Studio
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink hover:bg-sand-50"
            >
              View live site ↗
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
            Global Design Engine
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold text-ink">
            Site-wide Appearance &amp; Theming
          </h2>
          <p className="mt-2 text-sm text-ink-muted max-w-2xl">
            Choose from ready-to-use institutional palettes or customize brand colors, typography pairings, corner curvature, and shadow depths. All changes are governed by a single, high-performance styling engine that updates all pages instantly.
          </p>
        </div>

        <ThemeStudio initialTheme={initialTheme} />
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowLeft, Sliders, ShieldCheck } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";
import { WebsiteCustomizerStudio } from "@/components/admin/WebsiteCustomizerStudio";

export default async function AdminCustomizePage() {
  await requireAdmin();
  const initialSettings = await getCustomizerSettings();

  return (
    <main className="min-h-screen bg-sand-50 pb-16">
      {/* Top Header */}
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-muted transition hover:bg-sand-50 hover:text-ink"
              title="Return to Dashboard"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">BSGSS Control Centre</p>
              <h1 className="font-display text-lg font-bold text-ink">Website Studio &amp; Customizer</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/theme"
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink transition hover:bg-sand-50"
            >
              <span>Theme Studio</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-800 transition"
            >
              <span>Live Website →</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:px-8">
        <WebsiteCustomizerStudio initialSettings={initialSettings} />
      </div>
    </main>
  );
}

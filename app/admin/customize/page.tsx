import Link from "next/link";
import { ArrowLeft, Sliders, ShieldCheck } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";
import { WebsiteCustomizerStudio } from "@/components/admin/WebsiteCustomizerStudio";

export default async function AdminCustomizePage() {
  await requireAdmin();
  const initialSettings = await getCustomizerSettings();

  return (
    <div className="flex-1 space-y-6 p-5 sm:p-8 md:p-10">
      {/* Top Header Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-line bg-white p-6 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-brand-600" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
              BSGSS Control Centre
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
            Website Studio &amp; Customizer
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-ink-muted">
            Manage section ordering, live typewriter headlines, photo collage gallery, and ambient relaxation tracks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/theme"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-ink shadow-2xs hover:bg-sand-50 transition"
          >
            <span>Theme Studio</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-brand-800 transition"
          >
            <span>Live Website ↗</span>
          </Link>
        </div>
      </div>

      <WebsiteCustomizerStudio initialSettings={initialSettings} />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageSquare, Mic, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { getConsentedVoices } from "@/lib/voices";
import { VoiceCard } from "@/components/voice/VoiceCard";

export const metadata: Metadata = buildMetadata({
  title: "Voice of the Village | Beneficiary Audio Stories | BSGSS",
  description:
    "Listen directly to rural women artisans and community members trained by BSGSS. Authentic audio dispatches with full Hindi and English transcripts.",
  path: "/stories",
});

export default function StoriesPage() {
  const voices = getConsentedVoices();

  return (
    <>
      <PageHeader
        title="Voice of the Village"
        lead="Authentic audio dispatches and spoken experiences directly from rural women artisans and community beneficiaries."
        crumbs={[
          { name: "About", path: "/about" },
          { name: "Stories", path: "/stories" },
        ]}
      />

      <div className="pt-8 pb-16 sm:pt-10 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 space-y-10">
          {/* Ethical Consent & Dignity Guarantee Banner */}
          <section className="rounded-2xl border border-brand-200 bg-sand-50/80 p-5 sm:p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h2 className="font-display text-base font-bold text-ink">
                    Ethical Storytelling &amp; Dignity Commitment
                  </h2>
                  <p className="mt-1 text-xs text-ink-muted leading-relaxed max-w-3xl">
                    Every dispatch below has written or recorded consent on file. To protect family dignity and individual safety, we use first names only and avoid displaying personal addresses. Audio files load only on user tap to conserve mobile data.
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-white px-3 py-1 text-xs font-semibold text-emerald-800 shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                <span>{voices.length} Verified Recordings</span>
              </div>
            </div>
          </section>

          {/* Voices Grid */}
          <section aria-label="Beneficiary Stories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {voices.map((voice) => (
                <VoiceCard key={voice.id} voice={voice} />
              ))}
            </div>

            {voices.length === 0 && (
              <div className="rounded-2xl border border-line bg-white p-12 text-center">
                <Mic className="mx-auto h-10 w-10 text-ink-muted" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-bold text-ink">
                  No verified recordings published yet
                </h3>
                <p className="mt-1 text-xs text-ink-muted">
                  New community dispatches are undergoing consent verification.
                </p>
              </div>
            )}
          </section>

          {/* Micro-Giving Connection */}
          <section className="rounded-2xl border border-line bg-gradient-to-br from-white via-sand-50 to-brand-50/40 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 shadow-2xs">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Sponsor Future Training Batches
              </span>
              <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-ink">
                Help more village women build financial agency.
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-ink-muted max-w-2xl leading-relaxed">
                Support a woman’s vocational training, course materials, or sewing machine starting at ₹300 with Section 80G tax deduction.
              </p>
            </div>
            <Link
              href="/sponsor"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800"
            >
              <span>Sponsor a Skill</span>
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

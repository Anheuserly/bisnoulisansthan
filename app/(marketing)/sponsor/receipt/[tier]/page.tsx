import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Heart,
  HeartHandshake,
  Receipt,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { getSponsorTierById, getSponsorTiers } from "@/lib/sponsor-tiers";
import { ShareReceiptActions } from "@/components/sponsor/ShareReceiptActions";

interface ReceiptPageProps {
  params: Promise<{ tier: string }>;
}

export async function generateStaticParams() {
  const tiers = getSponsorTiers();
  return tiers.map((tier) => ({
    tier: tier.id,
  }));
}

export async function generateMetadata({
  params,
}: ReceiptPageProps): Promise<Metadata> {
  const { tier: tierId } = await params;
  const tier = getSponsorTierById(tierId);

  if (!tier) {
    return {
      title: "Impact Receipt | BSGSS",
    };
  }

  const title = `Impact Receipt: ${tier.title} | BSGSS`;
  const description = `You funded ${tier.outcome} of vocational skill training with Bisnouli Sarvodaya Gramodyog Sewa Sansthan.`;
  const receiptUrl = `${SITE_URL}/sponsor/receipt/${tier.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: receiptUrl,
    },
    openGraph: {
      title,
      description,
      url: receiptUrl,
      siteName: "Bisnouli Sarvodaya (BSGSS)",
      type: "website",
      images: [
        {
          url: `${receiptUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `Official BSGSS Impact Receipt for ${tier.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${receiptUrl}/opengraph-image`],
    },
  };
}

function formatInr(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

export default async function SponsorReceiptPage({ params }: ReceiptPageProps) {
  const { tier: tierId } = await params;
  const tier = getSponsorTierById(tierId);

  if (!tier) {
    notFound();
  }

  const receiptUrl = `${SITE_URL}/sponsor/receipt/${tier.id}`;
  const shareMessage = `I supported ${tier.outcome} of vocational tailoring training for rural women artisans through Bisnouli Sarvodaya (BSGSS).`;

  return (
    <>
      <PageHeader
        title="Official Sponsor Impact Receipt"
        lead="A verifiable acknowledgment of your micro-giving contribution towards women's vocational training."
        crumbs={[
          { name: "Sponsor", path: "/sponsor" },
          { name: "Receipt", path: `/sponsor/receipt/${tier.id}` },
        ]}
      />

      <div className="pt-8 pb-16 sm:pt-10 sm:pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 space-y-8">
          {/* Back Navigation */}
          <div>
            <Link
              href="/sponsor"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all sponsorship tiers</span>
            </Link>
          </div>

          {/* Impact Receipt Card */}
          <section
            aria-label="Impact Receipt Certificate"
            className="rounded-3xl border-2 border-brand-200 bg-gradient-to-br from-[#FDFBF7] via-white to-sand-50 p-6 sm:p-10 shadow-soft"
          >
            {/* Top Seal */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-2xs">
                  <HeartHandshake className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-ink">
                    Bisnouli Sarvodaya Gramodyog Sewa Sansthan
                  </h2>
                  <p className="text-xs text-ink-muted">
                    Official Micro-Giving Impact Certification • Founded 1994
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 self-start sm:self-auto">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                <span>Verified Impact</span>
              </div>
            </div>

            {/* Impact Statement */}
            <div className="py-8 sm:py-10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Funded Sponsorship Tier
                </span>
                <span className="font-display text-3xl sm:text-4xl font-bold text-brand-900">
                  {formatInr(tier.amount)}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                {tier.title}
              </h3>

              <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-5 sm:p-6 text-ink leading-relaxed">
                <p className="text-base sm:text-lg font-medium text-brand-950">
                  &ldquo;You funded {tier.outcome} of certified vocational tailoring instruction and materials for rural women in Uttar Pradesh.&rdquo;
                </p>
                <p className="mt-3 text-xs sm:text-sm text-ink-muted">
                  {tier.covers}
                </p>
              </div>
            </div>

            {/* Compliance & Tax Info */}
            <div className="border-t border-line pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                <span>
                  Section 80G Tax Exemption Eligible • DARPAN: UP/2009/0002236
                </span>
              </div>
              <span className="font-semibold text-brand-700">
                bisnoulisansthan.in
              </span>
            </div>
          </section>

          {/* Share Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-line bg-sand-50/80 p-5 sm:p-6">
            <div>
              <h4 className="font-display text-base font-bold text-ink">
                Share this impact with your community
              </h4>
              <p className="text-xs text-ink-muted mt-0.5">
                Inspire friends and colleagues to support rural women artisans.
              </p>
            </div>
            <ShareReceiptActions url={receiptUrl} shareText={shareMessage} />
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-line text-xs">
            <Link
              href="/support"
              className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:underline"
            >
              <span>Submit payment reference for numbered 80G certificate &rarr;</span>
            </Link>
            <Link
              href="/transparency"
              className="inline-flex items-center gap-1.5 font-semibold text-ink-muted hover:text-ink"
            >
              <span>Audit our monthly finances on Open Books &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

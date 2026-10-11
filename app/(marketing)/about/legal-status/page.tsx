import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  Landmark,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { content, links } from "@/config/content";

export const metadata: Metadata = {
  title: content.legalStatus.metadataTitle,
  description: content.legalStatus.lead,
};

const credentialIcons = [
  FileCheck2,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Building2,
  ReceiptText,
  FileText,
  ReceiptText,
];

export default function LegalStatusPage() {
  const { legalStatus } = content;

  return (
    <>
      <PageHeader
        title={legalStatus.title}
        lead={legalStatus.lead}
        crumbs={[
          { name: "About", path: links.about },
          { name: "Legal status", path: links.legal },
        ]}
      />

      <div className="pt-6 pb-14 sm:pt-8 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          {/* Executive Transparency Overview Card (Light Theme) */}
          <section className="relative overflow-hidden rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 via-white to-brand-50/50 p-6 sm:p-8 md:p-10 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
                {legalStatus.eyebrow}
              </span>
              <span className="text-xs font-medium text-ink-muted">
                Established 1994 · Registration No. 226/1994-95
              </span>
            </div>

            <div className="mt-4 grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {legalStatus.heading}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                  {legalStatus.summaryText}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={legalStatus.summaryDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-2xs transition hover:bg-brand-800"
                  >
                    <Download className="h-4 w-4" />
                    Download legal status summary (PDF)
                  </a>
                  <a
                    href={legalStatus.summaryDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Preview in new tab
                  </a>
                </div>
              </div>

              {/* Verified Trust Pillars */}
              <div className="rounded-xl border border-brand-100 bg-white/90 p-5 shadow-2xs">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Statutory Registrations
                </p>
                <ul className="mt-3 space-y-2 text-xs text-ink-muted sm:text-sm">
                  <li className="flex items-center gap-2 text-ink">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />
                    <span>Societies Registration Act XXI of 1860</span>
                  </li>
                  <li className="flex items-center gap-2 text-ink">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />
                    <span>Section 12A & 80G Tax Exemption (IT Act 1961)</span>
                  </li>
                  <li className="flex items-center gap-2 text-ink">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />
                    <span>MCA CSR-1 Registration No. CSR00001405</span>
                  </li>
                  <li className="flex items-center gap-2 text-ink">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />
                    <span>NITI Aayog NGO Darpan (DL/2016/0111645)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Statutory Credentials At a Glance */}
          <section className="mt-10 sm:mt-12">
            <div className="flex flex-wrap items-end justify-between gap-2 border-b border-line pb-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Official Credentials
                </p>
                <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
                  Statutory Registrations & Identification
                </h2>
              </div>
              <p className="text-xs text-ink-muted">
                All numbers verifiable on respective official Government portals
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {legalStatus.credentials.map((cred, idx) => {
                const Icon = credentialIcons[idx] ?? FileCheck2;
                return (
                  <article
                    key={cred.title}
                    className="flex flex-col justify-between rounded-xl border border-line bg-white p-5 shadow-2xs transition-all hover:border-brand-300 hover:shadow-soft"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[0.6875rem] font-semibold text-brand-800">
                          {cred.tag}
                        </span>
                      </div>
                      <h3 className="mt-3 text-sm font-semibold text-ink">
                        {cred.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs font-bold text-brand-850 break-all select-all">
                        {cred.number}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                        {cred.authority}
                      </p>
                    </div>

                    <div className="mt-4 border-t border-line/60 pt-3">
                      <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-medium text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {cred.status}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Document Library */}
          <section className="mt-12 sm:mt-14">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Document Library
                </p>
                <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
                  Public Compliance Certificates & Statutory Files
                </h2>
                <p className="mt-1 text-xs text-ink-muted sm:text-sm">
                  Click to open any certificate in a new tab or save a local PDF copy.
                </p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
                {legalStatus.documents.length} official documents available
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {legalStatus.documents.map((doc) => (
                <article
                  key={doc.href}
                  className="group flex flex-col justify-between rounded-xl border border-line bg-white p-5 shadow-2xs transition-all hover:border-brand-300 hover:shadow-soft"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-0.5 text-[0.6875rem] font-bold text-red-700">
                          {doc.fileType}
                        </span>
                        <span className="text-xs font-medium text-ink-muted">
                          {doc.fileSize}
                        </span>
                      </div>
                      <span className="rounded-full bg-sand-100 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-ink-muted">
                        {doc.tag}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-base font-bold text-ink group-hover:text-brand-800 sm:text-lg">
                      {doc.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">
                      {doc.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-3">
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View document
                    </a>
                    <a
                      href={doc.href}
                      download
                      className="inline-flex items-center gap-1.5 rounded-md bg-sand-50 px-2.5 py-1 text-xs font-medium text-ink hover:bg-brand-50 hover:text-brand-800"
                    >
                      <Download className="h-3.5 w-3.5 text-brand-600" />
                      Download
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Institutional Governance Highlights */}
          <section className="mt-12 sm:mt-14 rounded-2xl border border-brand-200/60 bg-sand-50/70 p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
              Governance & Institutional Transparency Standards
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {legalStatus.governanceHighlights.map((highlight) => (
                <div key={highlight.title} className="rounded-xl border border-line bg-white p-5 shadow-2xs">
                  <h3 className="text-sm font-semibold text-ink">{highlight.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-brand-100 pt-5">
              <p className="text-xs text-ink-muted">
                Need customized due diligence documentation for CSR grants or institutional partnerships?
              </p>
              <Link
                href={links.contact}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:underline"
              >
                Contact BSGSS Compliance Desk →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

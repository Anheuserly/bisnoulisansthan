import type { Metadata } from "next";
import { Building2, Download, FileCheck2, Landmark, ReceiptText, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Legal Status & Documents", description: "BSGSS legal registrations, statutory certificates and public documents." };

const documents = [
  { title: "Legal status summary", description: "Organisation registration, tax, MCA, NGO Darpan and GST details in one reference document.", href: "/documents/legal/legal-status-summary.pdf", icon: ShieldCheck, tag: "Overview" },
  { title: "Government of India MOCA", description: "Ministry of Corporate Affairs document published by BSGSS.", href: "/documents/legal/govt-of-india-moca.pdf", icon: Building2, tag: "MCA" },
  { title: "BSGSS registration certificate", description: "Society registration certificate and renewal document.", href: "/documents/legal/bsgss-registration-certificate.pdf", icon: FileCheck2, tag: "Registration" },
  { title: "CSR-1 registration", description: "MCA CSR-1 registration document for CSR activities.", href: "/documents/legal/bsgss-csr-1-registration.pdf", icon: Landmark, tag: "CSR" },
  { title: "12A certificate", description: "Income Tax Act registration document under Section 12A.", href: "/documents/legal/bsgss-12a-certificate.pdf", icon: FileCheck2, tag: "Tax exemption" },
  { title: "80G certificate", description: "Income Tax Act approval document under Section 80G.", href: "/documents/legal/bsgss-80g-certificate.pdf", icon: FileCheck2, tag: "Donations" },
  { title: "NGO Darpan registration", description: "Registration document for the NITI Aayog NGO Darpan portal.", href: "/documents/legal/bsgss-ngo-darpan-registration.pdf", icon: Building2, tag: "NGO Darpan" },
  { title: "GST registration", description: "GST registration certificate for BSGSS.", href: "/documents/legal/bsgss-gst-registration.pdf", icon: ReceiptText, tag: "GST" },
];

const credentials = [
  ["Society registration", "Registered under the Societies Registration Act, 1860; Registration No. 226/1994-95 dated 15 June 1994."],
  ["CSR registration", "MCA registration for CSR activities: CSR00001405, dated 09 April 2021."],
  ["NGO Darpan", "NITI Aayog NGO Darpan Unique ID: DL/2016/0111645."],
  ["Tax and GST", "PAN: AAATB7832M; GSTIN: 07AAATB7832M1ZH; TAN: MRTB01498A."],
];

export default function LegalStatusPage() {
  return <><PageHeader title="Legal status & public documents" lead="A transparent library of BSGSS registrations, certificates and statutory documents." crumbs={[{ name: "About", path: "/about" }, { name: "Legal status", path: "/about/legal-status" }]} />
    <main className="py-16 sm:py-24"><div className="mx-auto max-w-6xl px-5 md:px-8"><section className="rounded-2xl bg-brand-900 p-7 text-white sm:p-10"><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-200">Transparency</p><h2 className="mt-3 font-display text-3xl font-bold">Compliance information, made easy to access.</h2><p className="mt-4 max-w-3xl leading-relaxed text-brand-100">These public records have been sourced from the BSGSS website and retained here so donors, CSR partners, institutions and communities can access the relevant documents directly.</p><a href="/documents/legal/legal-status-summary.pdf" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-brand-900 hover:bg-sand-100"><Download className="h-4 w-4" />Download legal status summary</a></section>
      <section className="mt-14"><h2 className="font-display text-3xl font-bold">At a glance</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{credentials.map(([title, detail]) => <article key={title} className="rounded-xl border border-line bg-sand-50 p-6"><h3 className="font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-muted">{detail}</p></article>)}</div></section>
      <section className="mt-14"><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="font-display text-3xl font-bold">Document library</h2><p className="mt-2 text-ink-muted">Open a document in your browser or download a copy.</p></div><p className="text-sm text-ink-muted">{documents.length} public documents</p></div><div className="mt-7 grid gap-5 md:grid-cols-2">{documents.map(({ title, description, href, icon: Icon, tag }) => <article key={href} className="flex min-h-52 flex-col rounded-xl border border-line bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Icon className="h-5 w-5" /></div><span className="rounded-full bg-sand-50 px-2.5 py-1 text-xs font-semibold text-ink-muted">{tag}</span></div><h3 className="mt-5 font-display text-xl font-bold">{title}</h3><p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{description}</p><a href={href} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"><Download className="h-4 w-4" />Open / download PDF</a></article>)}</div></section>
    </div></main></>;
}

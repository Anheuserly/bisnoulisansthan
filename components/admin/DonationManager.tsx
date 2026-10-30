"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  FileCheck2,
  Filter,
  IndianRupee,
  LoaderCircle,
  Mail,
  Search,
  Award,
  Edit3,
  Sliders,
  Settings,
  Paperclip,
} from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { EditCertificateModal } from "./EditCertificateModal";
import { CertificateSettingsModal } from "./CertificateSettingsModal";

export type DonationRow = {
  id: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string | null;
  donorAddress?: string | null;
  donorPan?: string | null;
  donorGst?: string | null;
  documentUrl?: string | null;
  documentName?: string | null;
  amount: string;
  currency: string;
  paymentMethod: string;
  paymentReference: string;
  paymentDate?: string | null;
  status: string;
  certificateNumber: string | null;
  createdAt: string;
};

export function DonationManager({
  donations,
  canIssue,
}: {
  donations: DonationRow[];
  canIssue: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "issued">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingDonation, setEditingDonation] = useState<DonationRow | null>(null);

  async function issue(id: string, donorName: string) {
    if (
      !confirm(
        `Confirm that payment from "${donorName}" has been verified in BSGSS bank/UPI records?\n\nThis will generate the next sequential official certificate.`
      )
    ) {
      return;
    }
    setBusy(id);
    const response = await fetch(`/api/admin/donations/${id}/verify`, { method: "POST" });
    const result = (await response.json().catch(() => null)) as {
      message?: string;
      certificateUrl?: string;
    } | null;
    setBusy(null);

    if (!response.ok) {
      return alert(result?.message || "Certificate could not be issued.");
    }

    router.refresh();
    if (result?.certificateUrl) {
      window.open(result.certificateUrl, "_blank", "noopener,noreferrer");
    }
  }

  const copyCertificateLink = (id: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/support/certificate/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filtered = useMemo(() => {
    return donations.filter((item) => {
      if (statusFilter === "pending" && item.status === "certificate_issued") return false;
      if (statusFilter === "issued" && item.status !== "certificate_issued") return false;

      if (!search.trim()) return true;
      const term = search.toLowerCase();
      return (
        item.donorName.toLowerCase().includes(term) ||
        item.donorEmail.toLowerCase().includes(term) ||
        item.paymentReference.toLowerCase().includes(term) ||
        (item.certificateNumber && item.certificateNumber.toLowerCase().includes(term)) ||
        (item.donorPhone && item.donorPhone.toLowerCase().includes(term))
      );
    });
  }, [donations, search, statusFilter]);

  const metrics = useMemo(() => {
    const totalCount = donations.length;
    const pendingCount = donations.filter((d) => d.status !== "certificate_issued").length;
    const issuedCount = donations.filter((d) => d.status === "certificate_issued").length;
    const totalVerifiedAmount = donations
      .filter((d) => d.status === "certificate_issued")
      .reduce((sum, d) => sum + Number(d.amount || 0), 0);

    return { totalCount, pendingCount, issuedCount, totalVerifiedAmount };
  }, [donations]);

  return (
    <div className="space-y-6">
      {/* Top summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-line bg-white p-4 shadow-2xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Total Submissions</p>
          <p className="mt-2 font-display text-2xl font-bold text-ink">{metrics.totalCount}</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 shadow-2xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">Pending Verification</p>
          <p className="mt-2 font-display text-2xl font-bold text-amber-900">{metrics.pendingCount}</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-2xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">Certificates Issued</p>
          <p className="mt-2 font-display text-2xl font-bold text-emerald-900">{metrics.issuedCount}</p>
        </div>
        <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-4 shadow-2xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-800">Verified Donations</p>
          <p className="mt-2 font-display text-2xl font-bold text-brand-900">
            {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
              metrics.totalVerifiedAmount
            )}
          </p>
        </div>
      </div>

      {/* Filter & Search Bar with Certificate Settings Action */}
      <div className="flex flex-col gap-3 rounded-xl border border-line bg-white p-4 sm:flex-row sm:items-center sm:justify-between shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              statusFilter === "all" ? "bg-brand-700 text-white" : "bg-sand-100 text-ink-muted hover:bg-sand-200"
            }`}
          >
            All ({metrics.totalCount})
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              statusFilter === "pending"
                ? "bg-amber-600 text-white"
                : "bg-sand-100 text-ink-muted hover:bg-sand-200"
            }`}
          >
            Needs Verification ({metrics.pendingCount})
          </button>
          <button
            onClick={() => setStatusFilter("issued")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              statusFilter === "issued"
                ? "bg-emerald-700 text-white"
                : "bg-sand-100 text-ink-muted hover:bg-sand-200"
            }`}
          >
            Issued ({metrics.issuedCount})
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand-300 bg-brand-50/80 px-3 py-1.5 text-xs font-bold text-brand-900 hover:bg-brand-100 transition shadow-2xs"
          >
            <Award className="h-3.5 w-3.5 text-brand-700" />
            Certificate Design &amp; Template
          </button>

          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              placeholder="Search donor, email, reference..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-line bg-sand-50/50 py-1.5 pl-9 pr-3 text-xs text-ink outline-none transition focus:border-brand-600 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Donations Table */}
      {!filtered.length ? (
        <div className="rounded-xl border border-dashed border-line bg-white p-12 text-center">
          <FileCheck2 className="mx-auto h-8 w-8 text-ink-muted opacity-50" />
          <p className="mt-3 text-sm font-semibold text-ink">No donation verification records found</p>
          <p className="mt-1 text-xs text-ink-muted">
            {search ? "No records matched your search term." : "Submissions will appear here when supporters submit their payment details."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-2xs">
          <table className="min-w-[960px] w-full text-left text-xs">
            <thead className="bg-sand-50 border-b border-line text-ink-muted uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3">Donor Information</th>
                <th className="px-4 py-3">Contribution</th>
                <th className="px-4 py-3">Payment Reference</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Status / Certificate</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((donation) => {
                const isIssued = donation.status === "certificate_issued";
                const mailSubject = encodeURIComponent(
                  `Donation Acknowledgement - Bisnouli Sarvodaya Gramodyog Sewa Sansthan (${donation.certificateNumber || "Verified"})`
                );
                const certLink = typeof window !== "undefined" ? `${window.location.origin}/support/certificate/${donation.id}` : `/support/certificate/${donation.id}`;
                const mailBody = encodeURIComponent(
                  `Dear ${donation.donorName},\n\n` +
                    `Thank you sincerely for your generous support of ₹${donation.amount} towards the community development initiatives of Bisnouli Sarvodaya Gramodyog Sewa Sansthan (BSGSS).\n\n` +
                    `We have verified your payment reference (${donation.paymentReference}). Your official donation acknowledgement certificate has been generated:\n\n` +
                    `Certificate Number: ${donation.certificateNumber}\n` +
                    `View Certificate: ${certLink}\n\n` +
                    `With gratitude,\n` +
                    `Bisnouli Sarvodaya Gramodyog Sewa Sansthan (BSGSS)\n` +
                    `Website: ${SITE_URL}`
                );

                return (
                  <tr key={donation.id} className="hover:bg-sand-50/50 transition">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-ink text-sm">{donation.donorName}</p>
                      <p className="mt-0.5 text-ink-muted">{donation.donorEmail}</p>
                      {donation.donorPhone ? (
                        <p className="mt-0.5 text-[11px] text-ink-muted">{donation.donorPhone}</p>
                      ) : null}

                      {/* Statutory Identity Badges (PAN, GSTIN, Attached Document) */}
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        {donation.donorPan ? (
                          <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 font-mono text-[10.5px] font-bold text-blue-800 border border-blue-200">
                            PAN: {donation.donorPan}
                          </span>
                        ) : null}
                        {donation.donorGst ? (
                          <span className="inline-flex items-center gap-1 rounded bg-indigo-50 px-2 py-0.5 font-mono text-[10.5px] font-bold text-indigo-800 border border-indigo-200">
                            GSTIN: {donation.donorGst}
                          </span>
                        ) : null}
                        {donation.documentUrl ? (
                          <a
                            href={donation.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={donation.documentName || "statutory-document"}
                            className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition"
                            title="Click to view or download attached document"
                          >
                            <Paperclip className="h-3 w-3" />
                            {donation.documentName || "View Doc"}
                          </a>
                        ) : null}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="font-semibold text-brand-900 text-sm">
                        {new Intl.NumberFormat("en-IN", { style: "currency", currency: donation.currency }).format(
                          Number(donation.amount)
                        )}
                      </span>
                      <p className="mt-0.5 text-[11px] uppercase tracking-wider text-ink-muted">
                        {donation.paymentMethod.replace("_", " ")}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded bg-sand-100 px-2 py-0.5 font-mono text-[11px] text-ink font-medium">
                        {donation.paymentReference}
                      </span>
                      {donation.paymentDate ? (
                        <p className="mt-1 text-[11px] text-ink-muted">Paid: {donation.paymentDate}</p>
                      ) : null}
                    </td>

                    <td className="px-4 py-4 text-ink-muted text-[11px]">
                      {new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(donation.createdAt))}
                    </td>

                    <td className="px-4 py-4">
                      {isIssued ? (
                        <div>
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            Certificate Issued
                          </span>
                          <p className="mt-1 font-mono font-semibold text-brand-700 text-[11px]">
                            {donation.certificateNumber}
                          </p>
                        </div>
                      ) : (
                        <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-200">
                          Pending Verification
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        {/* Always available Edit Certificate button */}
                        <button
                          onClick={() => setEditingDonation(donation)}
                          title="Edit certificate details, receipt number, donor or amount"
                          className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1 text-[11px] font-semibold text-ink-muted hover:border-brand-500 hover:text-brand-800 transition"
                        >
                          <Edit3 className="h-3 w-3 text-brand-700" />
                          Edit
                        </button>

                        {isIssued ? (
                          <>
                            <button
                              onClick={() => copyCertificateLink(donation.id)}
                              title="Copy certificate link"
                              className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1 text-[11px] font-semibold text-ink-muted hover:border-brand-500 hover:text-brand-700 transition"
                            >
                              <Copy className="h-3 w-3" />
                              {copiedId === donation.id ? "Copied!" : "Copy Link"}
                            </button>
                            <a
                              href={`mailto:${donation.donorEmail}?subject=${mailSubject}&body=${mailBody}`}
                              title="Email certificate to donor"
                              className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1 text-[11px] font-semibold text-ink-muted hover:border-brand-500 hover:text-brand-700 transition"
                            >
                              <Mail className="h-3 w-3" />
                              Email
                            </a>
                            <a
                              href={`/support/certificate/${donation.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-800 hover:bg-brand-100 transition"
                            >
                              View <ExternalLink className="h-3 w-3" />
                            </a>
                          </>
                        ) : canIssue ? (
                          <button
                            onClick={() => issue(donation.id, donation.donorName)}
                            disabled={busy === donation.id}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-800 transition disabled:opacity-60"
                          >
                            {busy === donation.id ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <FileCheck2 className="h-3.5 w-3.5" />}
                            Verify &amp; Issue
                          </button>
                        ) : (
                          <span className="text-[11px] text-ink-muted">Admin required</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Single Certificate Modal */}
      <EditCertificateModal
        isOpen={Boolean(editingDonation)}
        onClose={() => setEditingDonation(null)}
        donation={editingDonation}
        onSaveSuccess={() => router.refresh()}
      />

      {/* Certificate Settings & Design Template Modal */}
      <CertificateSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onSaveSuccess={() => router.refresh()}
      />
    </div>
  );
}

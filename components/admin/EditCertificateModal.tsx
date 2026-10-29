"use client";

import { useEffect, useState } from "react";
import {
  X,
  FileCheck2,
  CheckCircle2,
  ExternalLink,
  LoaderCircle,
  Hash,
  User,
  CreditCard,
  Calendar,
  FileText,
  Sparkles,
} from "lucide-react";
import type { DonationRow } from "./DonationManager";

interface EditCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: DonationRow | null;
  onSaveSuccess: () => void;
}

export function EditCertificateModal({
  isOpen,
  onClose,
  donation,
  onSaveSuccess,
}: EditCertificateModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [certificateNumber, setCertificateNumber] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [paymentReference, setPaymentReference] = useState("");
  const [status, setStatus] = useState("certificate_issued");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (donation) {
      setCertificateNumber(donation.certificateNumber || "");
      setDonorName(donation.donorName || "");
      setDonorEmail(donation.donorEmail || "");
      setDonorPhone(donation.donorPhone || "");
      setAmount(String(donation.amount || ""));
      setCurrency(donation.currency || "INR");
      setPaymentReference(donation.paymentReference || "");
      setStatus(donation.status || "certificate_issued");
      setNotes("");
      setError(null);
      setSuccess(null);
    }
  }, [donation]);

  if (!isOpen || !donation) return null;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!donation) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/admin/donations/${donation.id}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          certificateNumber: certificateNumber.trim(),
          donorName: donorName.trim(),
          donorEmail: donorEmail.trim(),
          donorPhone: donorPhone.trim(),
          amount: Number(amount),
          currency: currency.trim(),
          paymentReference: paymentReference.trim(),
          status,
          notes: notes.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update certificate details.");
      }

      setSuccess("Certificate details successfully saved!");
      setTimeout(() => {
        onSaveSuccess();
        onClose();
      }, 900);
    } catch (err: any) {
      setError(err?.message || "An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  }

  const certPreviewUrl = `/support/certificate/${donation.id}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-line">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-850 border border-brand-200">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-ink">
                Edit Donation Certificate
              </h2>
              <p className="text-xs text-ink-muted">
                Modify receipt number, donor attribution, amount, and custom certificate text.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-muted hover:bg-sand-100 hover:text-ink transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            {success}
          </div>
        )}

        <form onSubmit={handleSave} className="mt-5 space-y-5">
          {/* 1. Receipt / Certificate Number */}
          <div className="rounded-xl border border-brand-200 bg-brand-50/30 p-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-900">
                <Hash className="h-3.5 w-3.5 text-brand-700" />
                Receipt / Certificate Number
              </label>
              <span className="text-[11px] text-ink-muted">Shown in top-right of certificate</span>
            </div>
            <input
              type="text"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              placeholder="e.g. 1 or BSGSS-2026-0001"
              required
              className="mt-2 w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-sm font-bold text-ink outline-none transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
            />
            {/* Quick Fill format helpers */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="font-medium text-ink-muted">Quick Serial formats:</span>
              <button
                type="button"
                onClick={() => setCertificateNumber("1")}
                className="rounded bg-white px-2 py-0.5 font-mono text-xs font-semibold text-brand-850 border border-brand-200 hover:bg-brand-50"
              >
                1
              </button>
              <button
                type="button"
                onClick={() => setCertificateNumber("2")}
                className="rounded bg-white px-2 py-0.5 font-mono text-xs font-semibold text-brand-850 border border-brand-200 hover:bg-brand-50"
              >
                2
              </button>
              <button
                type="button"
                onClick={() => setCertificateNumber("3")}
                className="rounded bg-white px-2 py-0.5 font-mono text-xs font-semibold text-brand-850 border border-brand-200 hover:bg-brand-50"
              >
                3
              </button>
              <button
                type="button"
                onClick={() => setCertificateNumber("BSGSS-2026-0001")}
                className="rounded bg-white px-2 py-0.5 font-mono text-xs font-semibold text-brand-850 border border-brand-200 hover:bg-brand-50"
              >
                BSGSS-2026-0001
              </button>
              <button
                type="button"
                onClick={() => setCertificateNumber("BSGSS-2026-1")}
                className="rounded bg-white px-2 py-0.5 font-mono text-xs font-semibold text-brand-850 border border-brand-200 hover:bg-brand-50"
              >
                BSGSS-2026-1
              </button>
            </div>
          </div>

          {/* 2. Donor Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                <User className="h-3.5 w-3.5 text-ink-muted" />
                Donor Full Name
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                required
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink">
                Donor Email Address
              </label>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                required
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink">
                Donor Contact Phone
              </label>
              <input
                type="text"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                placeholder="Optional"
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                <CreditCard className="h-3.5 w-3.5 text-ink-muted" />
                Contribution Amount (₹)
              </label>
              <div className="mt-1.5 flex gap-2">
                <input
                  type="number"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full rounded-lg border border-line bg-white px-3 py-2 text-xs font-bold text-ink outline-none transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600"
                />
                <input
                  type="text"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-20 rounded-lg border border-line bg-sand-50 px-2 py-2 text-center text-xs font-bold text-ink"
                />
              </div>
            </div>
          </div>

          {/* 3. Status & Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink">
                Verification Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-ink outline-none transition focus:border-brand-600"
              >
                <option value="certificate_issued">Certificate Issued (Publicly Viewable)</option>
                <option value="pending">Pending Verification</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink">
                Internal Bank / UPI Reference (Internal Record Only)
              </label>
              <input
                type="text"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs text-ink outline-none transition focus:border-brand-600"
              />
            </div>
          </div>

          {/* 4. Custom Certificate Purpose / Notes */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-ink">
              <FileText className="h-3.5 w-3.5 text-ink-muted" />
              Custom Certificate Purpose / Appreciation Override (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Leave blank to use the standard global cause text ('towards advancing rural healthcare clinics, women\'s vocational skill training...')"
              className="mt-1.5 w-full rounded-lg border border-line bg-white p-2.5 text-xs text-ink outline-none transition focus:border-brand-600 placeholder:text-ink-subtle"
            />
          </div>

          {/* Footer Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <a
              href={certPreviewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 transition hover:underline"
            >
              Open Live Certificate <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-line bg-sand-100 px-4 py-2 text-xs font-semibold text-ink-muted hover:bg-sand-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-5 py-2 text-xs font-semibold text-white hover:bg-brand-800 transition disabled:opacity-60 shadow-xs"
              >
                {loading ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

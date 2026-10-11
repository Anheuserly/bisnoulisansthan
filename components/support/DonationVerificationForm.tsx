"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  LoaderCircle,
  Search,
} from "lucide-react";

type State = {
  kind: "idle" | "success" | "error";
  message?: string;
  reference?: string;
};

type LookupResult = {
  found: boolean;
  status?: string;
  donorName?: string;
  certificateNumber?: string | null;
  certificateUrl?: string | null;
  message?: string;
};

export function DonationVerificationForm() {
  const [activeTab, setActiveTab] = useState<"submit" | "check">("submit");

  // Controlled form input state to prevent DOM reset errors
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentReference, setPaymentReference] = useState("");

  const [state, setState] = useState<State>({ kind: "idle" });
  const [loading, setLoading] = useState(false);

  // Status check state
  const [query, setQuery] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setState({ kind: "idle" });

    const payload = {
      donorName: donorName.trim(),
      donorEmail: donorEmail.trim(),
      donorPhone: donorPhone.trim(),
      amount: amount.trim(),
      paymentMethod,
      paymentDate: paymentDate.trim(),
      paymentReference: paymentReference.trim(),
    };

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        reference?: string;
      } | null;

      setLoading(false);

      if (!response.ok && !result?.ok) {
        return setState({
          kind: "error",
          message:
            result?.message ||
            "We could not save your payment details right now. Please try again or reach out to BSGSS directly.",
        });
      }

      // Reset controlled states safely
      setDonorName("");
      setDonorEmail("");
      setDonorPhone("");
      setAmount("");
      setPaymentMethod("upi");
      setPaymentDate("");
      setPaymentReference("");

      setState({
        kind: "success",
        reference: result?.reference,
        message: `Thank you for your contribution. Your acknowledgement reference is ${
          result?.reference || "registered"
        }. BSGSS checks each reference before issuing a numbered certificate.`,
      });
    } catch {
      setLoading(false);
      setState({
        kind: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  async function checkStatus(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLookupLoading(true);
    setLookupResult(null);

    try {
      const res = await fetch(`/api/donations?query=${encodeURIComponent(query.trim())}`);
      const data = (await res.json().catch(() => null)) as LookupResult | null;
      setLookupLoading(false);

      if (res.ok && data?.found) {
        setLookupResult(data);
      } else {
        setLookupResult({
          found: false,
          message:
            data?.message ||
            "No record found for this reference. Please check the spelling or contact BSGSS.",
        });
      }
    } catch {
      setLookupLoading(false);
      setLookupResult({
        found: false,
        message: "Could not query status right now. Please try again shortly.",
      });
    }
  }

  return (
    <section className="mt-12 border-t border-line pt-10" aria-labelledby="payment-details-title">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-700">
            After making your contribution
          </p>
          <h2 id="payment-details-title" className="mt-1 font-display text-2xl font-bold text-ink">
            Payment verification & certificates
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex rounded-lg border border-line bg-sand-50 p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("submit")}
            className={`rounded-md px-3 py-1.5 font-semibold transition ${
              activeTab === "submit"
                ? "bg-white text-brand-800 shadow-2xs"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            Submit details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("check")}
            className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 font-semibold transition ${
              activeTab === "check"
                ? "bg-white text-brand-800 shadow-2xs"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            <Search className="h-3 w-3" />
            Check certificate
          </button>
        </div>
      </div>

      <p className="mt-3 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
        BSGSS checks each UPI or bank-transfer reference against official bank statements before issuing a numbered donation acknowledgement certificate. Please do not submit card or bank passwords here.
      </p>

      {activeTab === "submit" ? (
        <form
          onSubmit={submit}
          className="mt-6 grid gap-4 rounded-xl border border-brand-200 bg-white p-5 sm:grid-cols-2 shadow-2xs"
          noValidate
        >
          <label className="grid gap-1.5 text-xs sm:text-sm font-semibold text-ink">
            <span>
              Write your full name <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              required
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="Write your full name"
              className="rounded-lg border border-line px-3 py-2.5 font-normal text-xs sm:text-sm text-ink outline-none placeholder:text-ink-muted/60 focus:border-brand-600 transition"
            />
          </label>

          <label className="grid gap-1.5 text-xs sm:text-sm font-semibold text-ink">
            <span>
              Write your email address <span className="text-red-500">*</span>
            </span>
            <input
              type="email"
              required
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              placeholder="Write your email address"
              className="rounded-lg border border-line px-3 py-2.5 font-normal text-xs sm:text-sm text-ink outline-none placeholder:text-ink-muted/60 focus:border-brand-600 transition"
            />
          </label>

          <label className="grid gap-1.5 text-xs sm:text-sm font-semibold text-ink">
            <span>Write your phone number</span>
            <input
              type="tel"
              value={donorPhone}
              onChange={(e) => setDonorPhone(e.target.value)}
              placeholder="Write your phone number"
              className="rounded-lg border border-line px-3 py-2.5 font-normal text-xs sm:text-sm text-ink outline-none placeholder:text-ink-muted/60 focus:border-brand-600 transition"
            />
          </label>

          <label className="grid gap-1.5 text-xs sm:text-sm font-semibold text-ink">
            <span>
              Write amount donated (INR) <span className="text-red-500">*</span>
            </span>
            <input
              type="number"
              min="1"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Write contribution amount"
              className="rounded-lg border border-line px-3 py-2.5 font-normal text-xs sm:text-sm text-ink outline-none placeholder:text-ink-muted/60 focus:border-brand-600 transition"
            />
          </label>

          <label className="grid gap-1.5 text-xs sm:text-sm font-semibold text-ink">
            Payment method
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              className="rounded-lg border border-line bg-white px-3 py-2.5 font-normal text-xs sm:text-sm text-ink outline-none focus:border-brand-600"
            >
              <option value="upi">UPI (GPay / PhonePe / Paytm / BHIM)</option>
              <option value="bank_transfer">Bank Transfer (NEFT / RTGS / IMPS)</option>
              <option value="other">Other verified method</option>
            </select>
          </label>

          <label className="grid gap-1.5 text-xs sm:text-sm font-semibold text-ink">
            <span>Payment date</span>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="rounded-lg border border-line px-3 py-2.5 font-normal text-xs sm:text-sm text-ink outline-none focus:border-brand-600 transition"
            />
          </label>

          <div className="sm:col-span-2">
            <label className="grid gap-1.5 text-xs sm:text-sm font-semibold text-ink">
              <span>
                Write transaction reference <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                required
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                placeholder="Write transaction reference (UPI Ref / Bank UTR)"
                className="rounded-lg border border-line px-3 py-2.5 font-normal text-xs sm:text-sm text-ink outline-none placeholder:text-ink-muted/60 focus:border-brand-600 transition"
              />
            </label>
          </div>

          <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-1">
            <button
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-2xs hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70 transition"
            >
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <FileCheck2 className="h-4 w-4" />}
              {loading ? "Submitting…" : "Submit for verification"}
            </button>
            <span className="text-[11px] text-ink-muted">
              A numbered certificate is issued once BSGSS reconciles the transaction.
            </span>
          </div>

          {state.kind === "success" ? (
            <div
              role="status"
              className="sm:col-span-2 rounded-xl bg-brand-50 border border-brand-200 p-4 text-xs sm:text-sm leading-relaxed text-brand-900"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                <div>
                  <p className="font-semibold text-brand-900">Submission Received Successfully</p>
                  <p className="mt-1 text-ink-muted text-xs leading-relaxed">{state.message}</p>
                  {state.reference ? (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-ink-muted">Tracking Reference:</span>
                      <code className="rounded bg-white px-2 py-1 font-mono text-xs font-bold text-brand-800 border border-brand-200">
                        {state.reference}
                      </code>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}

          {state.kind === "error" ? (
            <p
              role="alert"
              className="sm:col-span-2 rounded-lg bg-red-50 border border-red-200 p-3 text-xs sm:text-sm text-red-800"
            >
              {state.message}
            </p>
          ) : null}
        </form>
      ) : (
        /* Status Lookup Tab */
        <div className="mt-6 rounded-xl border border-brand-200 bg-white p-5 sm:p-6 shadow-2xs">
          <form onSubmit={checkStatus} className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <div>
              <label className="block text-xs font-semibold text-ink">
                Enter your Tracking Reference, Certificate Number, or Transaction Reference
              </label>
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. BSGSS-2026-XXXX or UPI Transaction ID"
                className="mt-1.5 w-full rounded-lg border border-line bg-sand-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-ink outline-none transition focus:border-brand-600 focus:bg-white"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={lookupLoading}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-2xs hover:bg-brand-800 disabled:opacity-60 transition"
              >
                {lookupLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {lookupLoading ? "Checking…" : "Check Status"}
              </button>
            </div>
          </form>

          {lookupResult ? (
            <div className="mt-5 border-t border-line pt-4">
              {lookupResult.found ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-xs sm:text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>
                          {lookupResult.status === "certificate_issued"
                            ? "Certificate Verified & Issued!"
                            : "Payment Received — Verification Pending"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-ink-muted">
                        Donor: <strong className="text-ink">{lookupResult.donorName}</strong>
                        {lookupResult.certificateNumber ? (
                          <> • Certificate No: <strong className="font-mono text-brand-800">{lookupResult.certificateNumber}</strong></>
                        ) : null}
                      </p>
                    </div>

                    {lookupResult.certificateUrl ? (
                      <Link
                        href={lookupResult.certificateUrl}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-emerald-800 transition"
                      >
                        View & Print Certificate <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <span className="text-[11px] text-amber-800 font-medium bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        Under accounts review
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-xs text-amber-900">
                  <p className="font-semibold">{lookupResult.message}</p>
                  <p className="mt-1 text-ink-muted">
                    If you recently made the transfer, please allow our team up to 1 working day to reconcile bank credits.
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}

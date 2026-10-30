"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  FileText,
  HeartHandshake,
  LoaderCircle,
  Paperclip,
  Search,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";

type State = {
  kind: "idle" | "success" | "error";
  message?: string;
  reference?: string;
  id?: string;
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
  const [selectedTier, setSelectedTier] = useState<string>("");

  // Statutory 80G Tax Exemption & Identity Compliance
  const [complianceMode, setComplianceMode] = useState<"pan" | "gst" | "attach">("pan");
  const [donorPan, setDonorPan] = useState("");
  const [donorGst, setDonorGst] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [documentSize, setDocumentSize] = useState("");

  const [state, setState] = useState<State>({ kind: "idle" });
  const [loading, setLoading] = useState(false);
  const [initiatingEasebuzz, setInitiatingEasebuzz] = useState(false);

  async function handleEasebuzzCheckout() {
    if (!donorName.trim() || !donorEmail.trim() || !amount.trim()) {
      setState({ kind: "error", message: "Please enter your name, email, and contribution amount first." });
      return;
    }
    const cleanPan = donorPan.trim().toUpperCase();
    const cleanGst = donorGst.trim().toUpperCase();
    if (!cleanPan && !cleanGst && !documentUrl) {
      setState({
        kind: "error",
        message: "Under Section 80G statutory tax rules, please provide your PAN Number or GSTIN before proceeding.",
      });
      return;
    }

    setInitiatingEasebuzz(true);
    setState({ kind: "idle" });

    try {
      const res = await fetch("/api/payment/easebuzz/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: donorName.trim(),
          donorEmail: donorEmail.trim(),
          donorPhone: donorPhone.trim(),
          donorPan: cleanPan || undefined,
          donorGst: cleanGst || undefined,
          amount: amount.trim(),
        }),
      });
      const data = await res.json();
      setInitiatingEasebuzz(false);
      if (res.ok && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        setState({
          kind: "error",
          message: data.message || "Could not connect to Easebuzz payment gateway. Please try again or use direct UPI.",
        });
      }
    } catch {
      setInitiatingEasebuzz(false);
      setState({ kind: "error", message: "Network connection error. Please check your internet and try again." });
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlAmount = params.get("amount");
      const urlTier = params.get("tier");
      if (urlAmount) {
        setAmount(urlAmount);
      }
      if (urlTier) {
        setSelectedTier(urlTier);
      }
    }
  }, []);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setState({ kind: "error", message: "Attached document must be smaller than 5MB." });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setDocumentUrl(reader.result as string);
      setDocumentName(file.name);
      setDocumentSize(`${(file.size / 1024).toFixed(0)} KB`);
      setState({ kind: "idle" });
    };
    reader.readAsDataURL(file);
  }

  function clearAttachedDocument() {
    setDocumentUrl("");
    setDocumentName("");
    setDocumentSize("");
  }

  // Status check state
  const [query, setQuery] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Mandatory Statutory Compliance Validation
    const cleanPan = donorPan.trim().toUpperCase();
    const cleanGst = donorGst.trim().toUpperCase();

    if (!cleanPan && !cleanGst && !documentUrl) {
      return setState({
        kind: "error",
        message:
          "Statutory 80G Tax Compliance: Please provide your PAN Number, GST Number, or attach your PAN card / 80G Certificate before submitting.",
      });
    }

    if (cleanPan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(cleanPan)) {
      return setState({
        kind: "error",
        message: "Invalid PAN format. PAN must be exactly 10 alphanumeric characters (e.g. ABCDE1234F).",
      });
    }

    setLoading(true);
    setState({ kind: "idle" });

    const payload = {
      donorName: donorName.trim(),
      donorEmail: donorEmail.trim(),
      donorPhone: donorPhone.trim(),
      donorPan: cleanPan || undefined,
      donorGst: cleanGst || undefined,
      documentUrl: documentUrl || undefined,
      documentName: documentName || undefined,
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
        id?: string;
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
      setDonorPan("");
      setDonorGst("");
      setDocumentUrl("");
      setDocumentName("");
      setDocumentSize("");
      setAmount("");
      setPaymentMethod("upi");
      setPaymentDate("");
      setPaymentReference("");
      setDonorPhone("");
      setAmount("");
      setPaymentMethod("upi");
      setPaymentDate("");
      setPaymentReference("");

      setState({
        kind: "success",
        reference: result?.reference,
        id: result?.id,
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

          {/* Preset Contribution Chips & Amount */}
          <div className="sm:col-span-2">
            <span className="block text-xs sm:text-sm font-semibold text-ink mb-1.5">
              Select or enter contribution amount (INR) <span className="text-red-500">*</span>
            </span>
            <div className="flex flex-wrap gap-2 mb-2">
              {[500, 1000, 2500, 5000, 10000, 20000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset.toString())}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
                    amount === preset.toString()
                      ? "bg-brand-700 text-white border-brand-800 shadow-2xs"
                      : "bg-sand-50 text-ink border-line hover:border-brand-300 hover:bg-white"
                  }`}
                >
                  ₹{preset.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-ink-muted">₹</span>
              <input
                type="number"
                min="1"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter contribution amount"
                className="w-full rounded-lg border border-line pl-7 pr-3 py-2.5 font-medium text-xs sm:text-sm text-ink outline-none placeholder:text-ink-muted/60 focus:border-brand-600 transition"
              />
            </div>
          </div>

          <label className="grid gap-1.5 text-xs sm:text-sm font-semibold text-ink">
            Payment method
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              className="rounded-lg border border-line bg-white px-3 py-2.5 font-normal text-xs sm:text-sm text-ink outline-none focus:border-brand-600"
            >
              <option value="upi">Direct UPI (Zero 0% Transaction Fee - GPay/PhonePe/BHIM)</option>
              <option value="gateway">Online Payment Gateway (Easebuzz - UPI 0% / Cards / NetBanking)</option>
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

          {/* Statutory 80G Tax Exemption & Verification Details */}
          <div className="sm:col-span-2 rounded-xl border border-brand-200 bg-sand-50/70 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-line/70 pb-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ink">
                  <ShieldCheck className="h-4 w-4 text-brand-700 shrink-0" />
                  <span>Section 80G Tax Exemption &amp; Statutory Compliance</span>
                  <span className="text-red-500">*</span>
                </div>
                <p className="mt-0.5 text-[11px] text-ink-muted">
                  Under Income Tax Act Section 80G regulations, please provide your PAN Number, GST Number, or attach your PAN card / Certificate.
                </p>
              </div>

              {/* Selector Buttons */}
              <div className="flex items-center gap-1 rounded-lg border border-line bg-white p-1 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setComplianceMode("pan")}
                  className={`rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                    complianceMode === "pan"
                      ? "bg-brand-700 text-white shadow-2xs"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  PAN Card
                </button>
                <button
                  type="button"
                  onClick={() => setComplianceMode("gst")}
                  className={`rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                    complianceMode === "gst"
                      ? "bg-brand-700 text-white shadow-2xs"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  GST Number
                </button>
                <button
                  type="button"
                  onClick={() => setComplianceMode("attach")}
                  className={`rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                    complianceMode === "attach"
                      ? "bg-brand-700 text-white shadow-2xs"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  Attach File
                </button>
              </div>
            </div>

            <div className="mt-3.5 grid gap-3 sm:grid-cols-2 items-start">
              {/* PAN Number Input */}
              {complianceMode === "pan" ? (
                <div>
                  <label className="block text-xs font-semibold text-ink">
                    <span>
                      Donor PAN Number <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      maxLength={10}
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                      placeholder="e.g. ABCDE1234F"
                      className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs sm:text-sm uppercase tracking-wider text-ink outline-none focus:border-brand-600 transition"
                    />
                  </label>
                  <p className="mt-1 text-[10.5px] text-ink-muted">
                    10-digit PAN required for Indian 80G tax benefit claim
                  </p>
                </div>
              ) : null}

              {/* GST Number Input */}
              {complianceMode === "gst" ? (
                <div>
                  <label className="block text-xs font-semibold text-ink">
                    <span>
                      Donor GSTIN / Organization Number <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      maxLength={15}
                      value={donorGst}
                      onChange={(e) => setDonorGst(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                      placeholder="e.g. 07AAATB7832M1ZH"
                      className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs sm:text-sm uppercase tracking-wider text-ink outline-none focus:border-brand-600 transition"
                    />
                  </label>
                  <p className="mt-1 text-[10.5px] text-ink-muted">
                    15-character GSTIN for registered trusts, companies or CSR donors
                  </p>
                </div>
              ) : null}

              {/* Document Attachment Field */}
              <div className={complianceMode === "attach" ? "sm:col-span-2" : ""}>
                <span className="block text-xs font-semibold text-ink">
                  {complianceMode === "attach"
                    ? "Attach PAN Card, 80G Document, or Certificate *"
                    : "Attach Certificate or PAN Card (Optional)"}
                </span>

                {documentUrl ? (
                  <div className="mt-1 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-900 shadow-2xs">
                    <div className="flex items-center gap-2 truncate">
                      <FileCheck2 className="h-4 w-4 text-emerald-700 shrink-0" />
                      <span className="font-semibold truncate">{documentName || "Document Attached"}</span>
                      {documentSize ? (
                        <span className="text-[10.5px] text-emerald-700">({documentSize})</span>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={clearAttachedDocument}
                      className="rounded p-1 text-emerald-700 hover:bg-emerald-100 hover:text-red-600 transition"
                      title="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-brand-300 bg-white px-3 py-2.5 text-xs font-medium text-ink-muted hover:border-brand-600 hover:bg-brand-50/20 hover:text-brand-800 transition">
                    <Paperclip className="h-4 w-4 text-brand-700" />
                    <span>Upload PAN Card / Registration Certificate (PDF, PNG, JPG)</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
                <p className="mt-1 text-[10px] text-ink-muted">
                  Max file size: 5MB. Attached documents are stored securely for accounting audit records.
                </p>
              </div>
            </div>
          </div>

          {paymentMethod === "gateway" ? (
            <div className="sm:col-span-2 rounded-xl border border-emerald-300 bg-emerald-50/70 p-4 shadow-2xs">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-950">
                      Easebuzz NGO Payment Gateway
                    </h4>
                    <span className="rounded-full bg-emerald-200/90 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                      Direct Checkout
                    </span>
                  </div>
                  <p className="mt-1 text-[11.5px] text-emerald-900/80 leading-relaxed">
                    Pay securely with <strong>UPI (0% fee)</strong>, Indian &amp; International Debit/Credit Cards, or 50+ NetBanking options. You will be redirected to Easebuzz's secure checkout page, and your official 80G certificate with PAN will be generated immediately upon confirmation.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      disabled={initiatingEasebuzz}
                      onClick={handleEasebuzzCheckout}
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-emerald-800 disabled:opacity-60 transition"
                    >
                      {initiatingEasebuzz ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                      ) : (
                        <Zap className="h-4 w-4" />
                      )}
                      <span>{initiatingEasebuzz ? "Connecting to Easebuzz…" : "Proceed to Pay with Easebuzz"}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-[11px] text-emerald-800 font-medium">
                      Instant 80G Tax Exemption Certificate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : paymentMethod === "upi" ? (
            <div className="sm:col-span-2 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 sm:p-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5">
                    0% TRANSACTION FEE
                  </span>
                  <span className="text-xs font-semibold text-emerald-950">
                    Government Mandated 0% MDR for Indian Non-Profits
                  </span>
                </div>
                <span className="text-xs text-emerald-800 font-mono font-bold">UPI ID: bsgssindia@yahoo.co.in</span>
              </div>
            </div>
          ) : null}

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
                placeholder={
                  paymentMethod === "gateway"
                    ? "Razorpay Payment ID (e.g. pay_XXXXXX)"
                    : paymentMethod === "bank_transfer"
                    ? "Bank Transfer UTR / Transaction ID"
                    : "UPI Transaction Reference (12-digit UPI Ref)"
                }
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
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-ink-muted">Tracking Reference:</span>
                        <code className="rounded bg-white px-2 py-1 font-mono text-xs font-bold text-brand-800 border border-brand-200">
                          {state.reference}
                        </code>
                      </div>
                      {state.id ? (
                        <Link
                          href={`/support/certificate/${state.id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-1 text-xs font-semibold text-white shadow-2xs hover:bg-brand-800 transition"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>View Official 80G Certificate</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                  {selectedTier ? (
                    <div className="mt-4 pt-3 border-t border-brand-200/60">
                      <Link
                        href={`/sponsor/receipt/${selectedTier}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-brand-800 transition"
                      >
                        <HeartHandshake className="h-4 w-4" />
                        <span>View &amp; Share Your Sponsor Impact Receipt</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
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

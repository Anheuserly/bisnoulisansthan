"use client";

import { useEffect, useState, useRef } from "react";
import {
  X,
  Palette,
  Award,
  PenTool,
  Stamp,
  Hash,
  Type,
  CheckCircle2,
  LoaderCircle,
  RotateCcw,
  Sparkles,
  Upload,
} from "lucide-react";
import type {
  CustomizerCertificateConfig,
  CertificateThemeColor,
  CertificateFontFamily,
  CertificateSerialFormat,
} from "@/config/customizer";

interface CertificateSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
}

const PALETTES: {
  id: CertificateThemeColor;
  name: string;
  badgeBg: string;
  borderColor: string;
  desc: string;
}[] = [
  {
    id: "navy",
    name: "Classic Navy & Teal",
    badgeBg: "bg-cyan-900",
    borderColor: "#0f4c5c",
    desc: "Original BSGSS institutional blue-green brand tone",
  },
  {
    id: "emerald",
    name: "Forest Emerald",
    badgeBg: "bg-emerald-800",
    borderColor: "#065f46",
    desc: "Organic green symbolizing rural growth and health",
  },
  {
    id: "gold",
    name: "Royal Amber Gold",
    badgeBg: "bg-amber-700",
    borderColor: "#b45309",
    desc: "Prestigious gold and warm amber honorary palette",
  },
  {
    id: "burgundy",
    name: "Regal Maroon",
    badgeBg: "bg-rose-900",
    borderColor: "#881337",
    desc: "Formal sovereign maroon styling for distinguished patrons",
  },
  {
    id: "slate",
    name: "Executive Slate",
    badgeBg: "bg-slate-800",
    borderColor: "#334155",
    desc: "Minimalist corporate and academic charcoal tone",
  },
];

const FONTS: {
  id: CertificateFontFamily;
  name: string;
  desc: string;
  fontClass: string;
}[] = [
  {
    id: "formal",
    name: "Formal Letterpress Serif",
    desc: "High-elegance formal serif for honorary certificates",
    fontClass: "font-serif",
  },
  {
    id: "sans",
    name: "Modern Clean Sans",
    desc: "Crisp, contemporary digital clarity",
    fontClass: "font-sans",
  },
  {
    id: "serif",
    name: "Heritage Traditional",
    desc: "Timeless traditional book typeface",
    fontClass: "font-serif",
  },
];

const SERIAL_FORMATS: {
  id: CertificateSerialFormat;
  title: string;
  example: string;
  desc: string;
}[] = [
  {
    id: "number-only",
    title: "Sequential Number Only",
    example: "1, 2, 3, 4, 5...",
    desc: "Simple, direct serial count from 1 upwards without prefix",
  },
  {
    id: "prefix-number",
    title: "Prefix with Direct Number",
    example: "BSGSS-2026-1, BSGSS-2026-2...",
    desc: "Organization prefix with unpadded natural serial",
  },
  {
    id: "prefix-padded",
    title: "Prefix with 4-Digit Padding",
    example: "BSGSS-2026-0001, BSGSS-2026-0002...",
    desc: "Standard institutional zero-padded serial",
  },
];

export function CertificateSettingsModal({
  isOpen,
  onClose,
  onSaveSuccess,
}: CertificateSettingsModalProps) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"appearance" | "signatory" | "seal" | "numbering" | "wording">("appearance");

  const [form, setForm] = useState<CustomizerCertificateConfig | null>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);
  const stampInputRef = useRef<HTMLInputElement>(null);

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !form) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, SVG).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (result) {
        setForm({ ...form, signatureUrl: result, showDefaultSignatureSvg: true });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleStampUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !form) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, SVG).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (result) {
        setForm({ ...form, stampUrl: result, showDefaultSealSvg: true });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  useEffect(() => {
    if (!isOpen) return;

    let ignore = false;
    async function fetchSettings() {
      setFetching(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/certificate-settings");
        const data = await res.json();
        if (!ignore && data?.certificate) {
          setForm(data.certificate);
        }
      } catch (err: any) {
        if (!ignore) setError("Could not load current certificate settings.");
      } finally {
        if (!ignore) setFetching(false);
      }
    }

    fetchSettings();
    return () => {
      ignore = true;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/admin/certificate-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ certificate: form }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to save certificate settings.");
      }

      setSuccess("Certificate template & design updated successfully!");
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col rounded-2xl bg-white shadow-2xl border border-line">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4 bg-sand-50/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-850 border border-brand-200">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-ink">
                Donation Certificate Template &amp; Design
              </h2>
              <p className="text-xs text-ink-muted">
                Customize colors, fonts, signatory signature, statutory stamp, and sequential receipt numbering.
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

        {/* Tab Navigation */}
        <div className="flex border-b border-line bg-sand-50 px-6 gap-2 overflow-x-auto text-xs font-semibold text-ink-muted">
          <button
            type="button"
            onClick={() => setActiveTab("appearance")}
            className={`flex items-center gap-1.5 py-3 border-b-2 transition whitespace-nowrap ${
              activeTab === "appearance"
                ? "border-brand-700 text-brand-900"
                : "border-transparent hover:text-ink"
            }`}
          >
            <Palette className="h-3.5 w-3.5" />
            Colors &amp; Fonts
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("signatory")}
            className={`flex items-center gap-1.5 py-3 border-b-2 transition whitespace-nowrap ${
              activeTab === "signatory"
                ? "border-brand-700 text-brand-900"
                : "border-transparent hover:text-ink"
            }`}
          >
            <PenTool className="h-3.5 w-3.5" />
            Signature &amp; Authority
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("seal")}
            className={`flex items-center gap-1.5 py-3 border-b-2 transition whitespace-nowrap ${
              activeTab === "seal"
                ? "border-brand-700 text-brand-900"
                : "border-transparent hover:text-ink"
            }`}
          >
            <Stamp className="h-3.5 w-3.5" />
            Statutory Seal / Stamp
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("numbering")}
            className={`flex items-center gap-1.5 py-3 border-b-2 transition whitespace-nowrap ${
              activeTab === "numbering"
                ? "border-brand-700 text-brand-900"
                : "border-transparent hover:text-ink"
            }`}
          >
            <Hash className="h-3.5 w-3.5" />
            Serial Numbering
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("wording")}
            className={`flex items-center gap-1.5 py-3 border-b-2 transition whitespace-nowrap ${
              activeTab === "wording"
                ? "border-brand-700 text-brand-900"
                : "border-transparent hover:text-ink"
            }`}
          >
            <Type className="h-3.5 w-3.5" />
            Certificate Wording
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {fetching ? (
            <div className="flex h-48 items-center justify-center">
              <LoaderCircle className="h-6 w-6 animate-spin text-brand-700" />
            </div>
          ) : !form ? (
            <div className="p-4 text-center text-xs text-rose-700">
              Could not load certificate configuration.
            </div>
          ) : (
            <form id="certificate-settings-form" onSubmit={handleSave} className="space-y-6">
              {error && (
                <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800">
                  {error}
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  {success}
                </div>
              )}

              {/* TAB 1: APPEARANCE (COLORS & FONTS) */}
              {activeTab === "appearance" && (
                <div className="space-y-6">
                  {/* Theme Color Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                      Border &amp; Accent Theme Color
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {PALETTES.map((palette) => (
                        <div
                          key={palette.id}
                          onClick={() => setForm({ ...form, themeColor: palette.id })}
                          className={`cursor-pointer rounded-xl border p-3 transition ${
                            form.themeColor === palette.id
                              ? "border-brand-700 bg-brand-50/50 ring-2 ring-brand-700/20"
                              : "border-line bg-white hover:border-sand-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`h-4 w-4 rounded-full ${palette.badgeBg} shadow-xs border border-white`}
                            />
                            <p className="font-semibold text-xs text-ink">{palette.name}</p>
                          </div>
                          <p className="mt-1 text-[11px] text-ink-muted leading-tight">
                            {palette.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Font Family Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                      Certificate Typography Style
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {FONTS.map((font) => (
                        <div
                          key={font.id}
                          onClick={() => setForm({ ...form, fontFamily: font.id })}
                          className={`cursor-pointer rounded-xl border p-3.5 transition ${
                            form.fontFamily === font.id
                              ? "border-brand-700 bg-brand-50/50 ring-2 ring-brand-700/20"
                              : "border-line bg-white hover:border-sand-300"
                          }`}
                        >
                          <p className={`text-base font-bold text-ink ${font.fontClass}`}>
                            {font.name}
                          </p>
                          <p className="mt-1 text-[11px] text-ink-muted leading-tight">
                            {font.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SIGNATURE & AUTHORITY */}
              {activeTab === "signatory" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Signatory Full Name
                      </label>
                      <input
                        type="text"
                        value={form.signatoryName}
                        onChange={(e) => setForm({ ...form, signatoryName: e.target.value })}
                        required
                        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Designation / Role Title
                      </label>
                      <input
                        type="text"
                        value={form.signatoryRole}
                        onChange={(e) => setForm({ ...form, signatoryRole: e.target.value })}
                        required
                        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Organization Under Signatory
                    </label>
                    <input
                      type="text"
                      value={form.organizationName}
                      onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
                      required
                      className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>

                  {/* Signature Image URL, Upload & Presets */}
                  <div className="rounded-xl border border-line bg-sand-50/50 p-4 space-y-3">
                    <input
                      ref={signatureInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      onChange={handleSignatureUpload}
                      className="hidden"
                    />

                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-ink">
                        Signature Style &amp; Image
                      </label>
                      {form.signatureUrl && (
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, signatureUrl: "", showDefaultSignatureSvg: true })}
                          className="text-[10px] font-semibold text-amber-800 hover:text-amber-900 underline"
                        >
                          Reset to Official Cursive
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => signatureInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-brand-300 bg-white px-3 py-1.5 text-xs font-semibold text-brand-800 shadow-2xs hover:bg-brand-50 transition cursor-pointer"
                      >
                        <Upload className="h-3.5 w-3.5 text-brand-700" />
                        Upload Signature File (PNG/JPG/SVG)
                      </button>

                      <button
                        type="button"
                        onClick={() => setForm({ ...form, signatureUrl: "", showDefaultSignatureSvg: true })}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                          !form.signatureUrl
                            ? "border-brand-700 bg-brand-700 text-white shadow-2xs"
                            : "border-line bg-white text-ink hover:bg-sand-100"
                        }`}
                      >
                        <PenTool className="h-3.5 w-3.5" />
                        Official Cursive SVG
                      </button>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={form.signatureUrl || ""}
                        onChange={(e) => setForm({ ...form, signatureUrl: e.target.value })}
                        placeholder="e.g. /images/signatures/nandita-bakshi.png or data:image/png;base64,..."
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs text-ink outline-none transition focus:border-brand-600"
                      />
                      {form.signatureUrl && (
                        <div className="relative h-9 w-14 shrink-0 overflow-hidden rounded-md border border-line bg-white p-0.5 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={form.signatureUrl}
                            alt="Active Signature"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="showDefaultSignatureSvg"
                        checked={form.showDefaultSignatureSvg}
                        onChange={(e) =>
                          setForm({ ...form, showDefaultSignatureSvg: e.target.checked })
                        }
                        className="h-4 w-4 rounded border-line text-brand-700"
                      />
                      <label
                        htmlFor="showDefaultSignatureSvg"
                        className="text-xs font-medium text-ink cursor-pointer"
                      >
                        Display authentic blue-ink cursive SVG signature if no custom image is provided
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: STATUTORY SEAL / STAMP */}
              {activeTab === "seal" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Seal Circular Rim Text
                    </label>
                    <input
                      type="text"
                      value={form.sealTitle}
                      onChange={(e) => setForm({ ...form, sealTitle: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs uppercase font-medium text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Seal Established Text
                      </label>
                      <input
                        type="text"
                        value={form.sealEstd}
                        onChange={(e) => setForm({ ...form, sealEstd: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Registration Label
                      </label>
                      <input
                        type="text"
                        value={form.sealRegNo}
                        onChange={(e) => setForm({ ...form, sealRegNo: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Tax Badges Label
                      </label>
                      <input
                        type="text"
                        value={form.sealBadges}
                        onChange={(e) => setForm({ ...form, sealBadges: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                      />
                    </div>
                  </div>

                  {/* Stamp Image URL, Upload & Presets */}
                  <div className="rounded-xl border border-line bg-sand-50/50 p-4 space-y-3">
                    <input
                      ref={stampInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      onChange={handleStampUpload}
                      className="hidden"
                    />

                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-ink">
                        Statutory Seal / Rubber Stamp Style
                      </label>
                      {form.stampUrl && (
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, stampUrl: "", showDefaultSealSvg: true })}
                          className="text-[10px] font-semibold text-amber-800 hover:text-amber-900 underline"
                        >
                          Reset to Vector Seal
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            stampUrl: "/images/bsgss/stamps/bsgss-original-seal.png",
                            showDefaultSealSvg: true,
                          })
                        }
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                          form.stampUrl === "/images/bsgss/stamps/bsgss-original-seal.png"
                            ? "border-brand-700 bg-brand-700 text-white shadow-2xs"
                            : "border-line bg-white text-ink hover:bg-sand-100"
                        }`}
                      >
                        <Stamp className="h-3.5 w-3.5" />
                        Original Circular Stamp
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            stampUrl: "/images/bsgss/stamps/bsgss-official-stamp.png",
                            showDefaultSealSvg: true,
                          })
                        }
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                          form.stampUrl === "/images/bsgss/stamps/bsgss-official-stamp.png"
                            ? "border-brand-700 bg-brand-700 text-white shadow-2xs"
                            : "border-line bg-white text-ink hover:bg-sand-100"
                        }`}
                      >
                        <Stamp className="h-3.5 w-3.5" />
                        Badge Stamp
                      </button>

                      <button
                        type="button"
                        onClick={() => stampInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-brand-300 bg-white px-3 py-1.5 text-xs font-semibold text-brand-800 shadow-2xs hover:bg-brand-50 transition cursor-pointer"
                      >
                        <Upload className="h-3.5 w-3.5 text-brand-700" />
                        Upload Custom Stamp
                      </button>

                      <button
                        type="button"
                        onClick={() => setForm({ ...form, stampUrl: "", showDefaultSealSvg: true })}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                          !form.stampUrl
                            ? "border-brand-700 bg-brand-700 text-white shadow-2xs"
                            : "border-line bg-white text-ink hover:bg-sand-100"
                        }`}
                      >
                        <Award className="h-3.5 w-3.5" />
                        Vector Rosette
                      </button>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={form.stampUrl || ""}
                        onChange={(e) => setForm({ ...form, stampUrl: e.target.value })}
                        placeholder="e.g. /images/bsgss/stamps/bsgss-official-stamp.png or data:..."
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs text-ink outline-none transition focus:border-brand-600"
                      />
                      {form.stampUrl && (
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-line bg-white p-0.5 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={form.stampUrl}
                            alt="Active Stamp"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="showDefaultSealSvg"
                        checked={form.showDefaultSealSvg}
                        onChange={(e) =>
                          setForm({ ...form, showDefaultSealSvg: e.target.checked })
                        }
                        className="h-4 w-4 rounded border-line text-brand-700"
                      />
                      <label
                        htmlFor="showDefaultSealSvg"
                        className="text-xs font-medium text-ink cursor-pointer"
                      >
                        Display authentic circular rosette seal SVG if no custom image is provided
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SERIAL NUMBERING */}
              {activeTab === "numbering" && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                      Receipt Numbering Scheme
                    </label>
                    <p className="text-xs text-ink-muted mb-3">
                      Choose how receipt numbers are generated for verified donations.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {SERIAL_FORMATS.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setForm({ ...form, serialFormat: item.id })}
                          className={`cursor-pointer rounded-xl border p-3.5 transition ${
                            form.serialFormat === item.id
                              ? "border-brand-700 bg-brand-50/50 ring-2 ring-brand-700/20"
                              : "border-line bg-white hover:border-sand-300"
                          }`}
                        >
                          <p className="font-semibold text-xs text-ink">{item.title}</p>
                          <p className="mt-1 font-mono text-xs font-bold text-brand-850">
                            {item.example}
                          </p>
                          <p className="mt-1 text-[11px] text-ink-muted leading-tight">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {form.serialFormat !== "number-only" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Receipt Prefix String
                        </label>
                        <input
                          type="text"
                          value={form.serialPrefix}
                          onChange={(e) => setForm({ ...form, serialPrefix: e.target.value })}
                          placeholder="e.g. BSGSS-2026-"
                          className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs text-ink outline-none transition focus:border-brand-600"
                        />
                      </div>

                      {form.serialFormat === "prefix-padded" && (
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            Number Zero-Padding Digits
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={8}
                            value={form.serialPadding}
                            onChange={(e) =>
                              setForm({ ...form, serialPadding: Number(e.target.value) || 4 })
                            }
                            className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                          />
                          <span className="text-[10px] text-ink-muted">
                            4 produces 0001; 6 produces 000001
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: CERTIFICATE WORDING */}
              {activeTab === "wording" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Certificate Primary Title
                    </label>
                    <input
                      type="text"
                      value={form.certificateTitle}
                      onChange={(e) => setForm({ ...form, certificateTitle: e.target.value })}
                      required
                      className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs uppercase font-bold text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Certificate Subtitle / Ribbon Label
                    </label>
                    <input
                      type="text"
                      value={form.certificateSubtitle}
                      onChange={(e) => setForm({ ...form, certificateSubtitle: e.target.value })}
                      required
                      className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs italic text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Appreciation Intro Line
                    </label>
                    <textarea
                      rows={2}
                      value={form.appreciationText}
                      onChange={(e) => setForm({ ...form, appreciationText: e.target.value })}
                      required
                      className="mt-1 w-full rounded-lg border border-line bg-white p-2.5 text-xs text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Default Cause / Social Welfare Purpose
                    </label>
                    <textarea
                      rows={2}
                      value={form.causeText}
                      onChange={(e) => setForm({ ...form, causeText: e.target.value })}
                      required
                      className="mt-1 w-full rounded-lg border border-line bg-white p-2.5 text-xs text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Societies Act Registration Text
                      </label>
                      <input
                        type="text"
                        value={form.legalRegText}
                        onChange={(e) => setForm({ ...form, legalRegText: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        NITI Aayog NGO Darpan ID
                      </label>
                      <input
                        type="text"
                        value={form.darpanId}
                        onChange={(e) => setForm({ ...form, darpanId: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs text-ink outline-none transition focus:border-brand-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Official Head Office Address &amp; Contact String
                    </label>
                    <input
                      type="text"
                      value={form.officeAddressText}
                      onChange={(e) => setForm({ ...form, officeAddressText: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition focus:border-brand-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Organization PAN Number
                      </label>
                      <input
                        type="text"
                        value={form.orgPan || "AAATB7832M"}
                        onChange={(e) => setForm({ ...form, orgPan: e.target.value.toUpperCase() })}
                        placeholder="AAATB7832M"
                        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs uppercase font-bold text-ink outline-none transition focus:border-brand-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        MCA CSR-1 Registration Number
                      </label>
                      <input
                        type="text"
                        value={form.csrRegNo || "CSR00001405"}
                        onChange={(e) => setForm({ ...form, csrRegNo: e.target.value.toUpperCase() })}
                        placeholder="CSR00001405"
                        className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 font-mono text-xs uppercase text-ink outline-none transition focus:border-brand-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="showPanColumn_modal"
                      checked={form.showPanColumn !== false}
                      onChange={(e) => setForm({ ...form, showPanColumn: e.target.checked })}
                      className="h-4 w-4 rounded border-line text-brand-700"
                    />
                    <label htmlFor="showPanColumn_modal" className="text-xs font-medium text-ink cursor-pointer">
                      Display dedicated <strong>Statutory PAN Record</strong> column in the Contribution box
                    </label>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-line bg-sand-50/50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line bg-white px-4 py-2 text-xs font-semibold text-ink-muted hover:bg-sand-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="certificate-settings-form"
            disabled={loading || fetching}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-6 py-2 text-xs font-semibold text-white hover:bg-brand-800 transition disabled:opacity-60 shadow-xs"
          >
            {loading ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
            Save Certificate Settings
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  RefreshCw,
  Save,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { EasebuzzSettings } from "@/lib/payment/easebuzz";

export function EasebuzzSettingsPanel() {
  const [settings, setSettings] = useState<EasebuzzSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSalt, setShowSalt] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/payment-gateway");
      const data = await res.json();
      if (res.ok && data.settings) {
        setSettings(data.settings);
      }
    } catch {
      setStatusMessage({ kind: "error", text: "Failed to load payment gateway settings from database." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/payment-gateway", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setSettings(data.settings);
        setStatusMessage({ kind: "success", text: "Easebuzz gateway credentials saved successfully in database!" });
      } else {
        setStatusMessage({ kind: "error", text: data.message || "Failed to save settings." });
      }
    } catch {
      setStatusMessage({ kind: "error", text: "Network error. Please try again." });
    } finally {
      setSaving(false);
    }
  }

  const webhookUrl = typeof window !== "undefined" ? `${window.location.origin}/api/payment/easebuzz/response` : "https://bisnoulisansthan.in/api/payment/easebuzz/response";

  function copyWebhook() {
    navigator.clipboard.writeText(webhookUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-2 text-ink-muted">
        <LoaderCircle className="h-5 w-5 animate-spin text-brand-700" />
        <span className="text-sm">Loading Easebuzz configurations…</span>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-red-600">Could not initialize Easebuzz gateway settings.</p>
        <button
          onClick={fetchSettings}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center rounded-lg bg-emerald-100 p-2 text-emerald-800">
              <Zap className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-ink">Easebuzz Payment Gateway Configuration</h2>
              <p className="text-xs text-ink-muted">
                Manage live API keys, test sandboxes, and webhook routing directly from your database.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://easebuzz.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 transition"
          >
            <span>Easebuzz Portal</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`flex items-center gap-2 rounded-xl p-3.5 text-xs sm:text-sm font-medium ${
            statusMessage.kind === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {statusMessage.kind === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <ShieldAlert className="h-4 w-4 shrink-0 text-red-600" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid gap-6">
        {/* Gateway Enable / Environment Card */}
        <div className="rounded-xl border border-line bg-white p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-ink">Gateway Status</h3>
              <p className="text-xs text-ink-muted">
                Enable or disable the online checkout gateway on the public /support donation page.
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.isEnabled}
                onChange={(e) => setSettings({ ...settings, isEnabled: e.target.checked })}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>

          <div className="border-t border-line/60 pt-4">
            <label className="block text-xs font-semibold text-ink">Operating Environment</label>
            <div className="mt-2 grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setSettings({ ...settings, environment: "test" })}
                className={`rounded-lg p-3 text-left border transition ${
                  settings.environment === "test"
                    ? "border-amber-400 bg-amber-50/70 text-amber-950 font-bold shadow-2xs"
                    : "border-line bg-sand-50/50 text-ink-muted hover:border-brand-300"
                }`}
              >
                <div className="text-xs font-bold">Test / Sandbox</div>
                <div className="text-[11px] text-ink-muted mt-0.5">testpay.easebuzz.in</div>
              </button>

              <button
                type="button"
                onClick={() => setSettings({ ...settings, environment: "production" })}
                className={`rounded-lg p-3 text-left border transition ${
                  settings.environment === "production"
                    ? "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold shadow-2xs"
                    : "border-line bg-sand-50/50 text-ink-muted hover:border-brand-300"
                }`}
              >
                <div className="text-xs font-bold">Production / Live</div>
                <div className="text-[11px] text-ink-muted mt-0.5">pay.easebuzz.in</div>
              </button>
            </div>
          </div>
        </div>

        {/* Credentials Form */}
        <div className="rounded-xl border border-line bg-white p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-brand-700" />
            <h3 className="text-sm font-bold text-ink">Easebuzz API Credentials</h3>
          </div>
          <p className="text-xs text-ink-muted">
            Found in your Easebuzz Dashboard under <strong>Settings &gt; API Keys &amp; Salt</strong>.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-ink">
                Merchant Key <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={settings.merchantKey}
                onChange={(e) => setSettings({ ...settings, merchantKey: e.target.value.trim() })}
                placeholder="e.g. 2PBP7IABZ2"
                className="mt-1.5 w-full rounded-lg border border-line px-3 py-2 font-mono text-xs text-ink outline-none transition focus:border-brand-600 focus:bg-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-ink">
                  Merchant Salt <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowSalt(!showSalt)}
                  className="inline-flex items-center gap-1 text-[11px] text-brand-700 hover:text-brand-900"
                >
                  {showSalt ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  <span>{showSalt ? "Hide" : "Show"}</span>
                </button>
              </div>
              <input
                type={showSalt ? "text" : "password"}
                required
                value={settings.salt}
                onChange={(e) => setSettings({ ...settings, salt: e.target.value.trim() })}
                placeholder="e.g. DAHCCN8GY9"
                className="mt-1.5 w-full rounded-lg border border-line px-3 py-2 font-mono text-xs text-ink outline-none transition focus:border-brand-600 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-ink">
                Sub-Merchant ID <span className="text-xs text-ink-muted font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={settings.subMerchantId || ""}
                onChange={(e) => setSettings({ ...settings, subMerchantId: e.target.value.trim() })}
                placeholder="Optional sub-merchant identifier if using aggregator sub-accounts"
                className="mt-1.5 w-full rounded-lg border border-line px-3 py-2 font-mono text-xs text-ink outline-none transition focus:border-brand-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Webhook & Callback Helper */}
        <div className="rounded-xl border border-line bg-sand-50/50 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-700" />
            <h3 className="text-xs sm:text-sm font-bold text-ink">Easebuzz Webhook &amp; Return URLs</h3>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Configure this URL in your Easebuzz Merchant Dashboard under Webhook / Return URL Settings. Easebuzz sends verified payment confirmations here to automatically issue numbered 80G certificates.
          </p>

          <div className="flex items-center gap-2 rounded-lg border border-line bg-white p-2">
            <code className="flex-1 font-mono text-xs text-brand-900 truncate">{webhookUrl}</code>
            <button
              type="button"
              onClick={copyWebhook}
              className="inline-flex items-center gap-1 rounded bg-sand-100 px-2.5 py-1 text-xs font-semibold text-ink hover:bg-sand-200 transition shrink-0"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>{copiedUrl ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex items-center justify-between border-t border-line pt-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-2xs hover:bg-brand-800 disabled:opacity-60 transition"
          >
            {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>{saving ? "Saving to Database…" : "Save Payment Gateway Settings"}</span>
          </button>

          <span className="text-[11px] text-ink-muted">
            Changes take effect immediately across all live donor checkouts.
          </span>
        </div>
      </form>
    </div>
  );
}

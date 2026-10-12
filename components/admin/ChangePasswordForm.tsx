"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Eye, EyeOff, KeyRound } from "lucide-react";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 12) {
      setError("New password must be at least 12 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from your current password.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        setError(data.message ?? "Failed to update password. Please check your current password.");
        return;
      }

      setSuccess("Your password has been changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Network or server error occurred. Please try again.");
    } finally {
      setPending(false);
    }
  }

  const field =
    "mt-1.5 h-10 w-full rounded-md border border-line bg-white px-3 pr-10 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100";

  return (
    <form onSubmit={submit} className="rounded-xl border border-line bg-sand-50 p-5 md:p-6">
      <div className="flex items-center gap-2">
        <KeyRound className="h-5 w-5 text-brand-700" />
        <h3 className="font-display text-lg font-bold text-ink">Change your password</h3>
      </div>
      <p className="mt-1 text-xs text-ink-muted">
        Must be at least 12 characters. Use a mix of uppercase, lowercase, numbers, and symbols.
      </p>

      {error && (
        <div role="alert" className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-danger border border-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div role="status" className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {/* Current Password */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Current password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              className={field}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
              aria-label={showCurrent ? "Hide current password" : "Show current password"}
            >
              {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            New password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={12}
              autoComplete="new-password"
              placeholder="Min. 12 characters"
              className={field}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
              aria-label={showNew ? "Hide new password" : "Show new password"}
            >
              {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Confirm new password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={12}
              autoComplete="new-password"
              placeholder="Repeat new password"
              className={field}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60"
        >
          {pending ? "Updating password…" : "Update password"}
        </button>
      </div>
    </form>
  );
}

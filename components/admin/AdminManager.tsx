"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Shield, UserPlus } from "lucide-react";

export function AdminManager() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setPending(true);

    const form = new FormData(event.currentTarget);
    const formEl = event.currentTarget;

    const response = await fetch("/api/admin/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        displayName: form.get("displayName"),
        password: form.get("password"),
        role: form.get("role"),
      }),
    });

    const data = await response.json().catch(() => ({}));
    setPending(false);

    if (!response.ok) {
      return setError(data.message ?? "Unable to add administrator.");
    }

    setSuccess("New team member added successfully.");
    formEl.reset();
    router.refresh();
  }

  const field =
    "mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100";

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-xl border border-line bg-white p-6 shadow-sm md:grid-cols-2">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-ink-muted">Full Name</label>
        <input name="displayName" placeholder="e.g. Anandita Verma" className={field} />
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-ink-muted">Email Address</label>
        <input name="email" type="email" required placeholder="user@bsgss.org" className={field} />
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-ink-muted">Role &amp; Permissions</label>
        <select name="role" defaultValue="editor" className={field}>
          <option value="editor">Editor — Can edit content, view inquiries &amp; applications</option>
          <option value="admin">Admin — Full editorial, layout studio &amp; donor verification</option>
          <option value="super_admin">Super Admin — Complete authority: add users, assign roles, change system settings</option>
        </select>
        <p className="mt-1 text-[11px] text-slate-500">
          Super admins have root authority to assign roles and manage organizational team access.
        </p>
      </div>

      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-ink-muted">Temporary Initial Password</label>
        <input name="password" type="password" minLength={12} required placeholder="At least 12 characters" className={field} />
        <p className="mt-1 text-[11px] text-slate-500">
          The user can update this password at any time via the Users &amp; Passwords panel.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-800 md:col-span-2">
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 md:col-span-2">
          <Check className="h-4 w-4 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      <button
        disabled={pending}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-700 px-5 text-sm font-semibold text-white shadow-2xs transition hover:bg-brand-800 disabled:opacity-60 md:col-span-2"
      >
        <UserPlus className="h-4 w-4" />
        <span>{pending ? "Adding Team Member…" : "Add Team Member & Assign Role"}</span>
      </button>
    </form>
  );
}

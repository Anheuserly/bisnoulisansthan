"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminSetupForm() {
  const router = useRouter(); const [error, setError] = useState(""); const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); const form = new FormData(event.currentTarget);
    if (form.get("password") !== form.get("confirmPassword")) return setError("The passwords do not match.");
    setPending(true); const response = await fetch("/api/admin/setup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), displayName: form.get("displayName"), password: form.get("password"), setupToken: form.get("setupToken") }) }); const data = await response.json().catch(() => ({})); setPending(false);
    if (!response.ok) return setError(data.message ?? "Setup could not be completed."); router.replace("/admin/login?setup=complete");
  }
  const field = "mt-1.5 h-11 w-full rounded-md border border-line px-3 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100";
  return <form onSubmit={submit} className="space-y-4"><label className="block text-sm font-medium text-ink">Name<input name="displayName" autoComplete="name" className={field} /></label><label className="block text-sm font-medium text-ink">Administrator email<input name="email" type="email" defaultValue="shubham.arc11@gmail.com" required className={field} /></label><label className="block text-sm font-medium text-ink">Setup token<input name="setupToken" type="password" required className={field} /></label><label className="block text-sm font-medium text-ink">New password<input name="password" type="password" minLength={12} required className={field} /></label><label className="block text-sm font-medium text-ink">Confirm password<input name="confirmPassword" type="password" minLength={12} required className={field} /></label>{error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-danger">{error}</p>}<button disabled={pending} className="h-11 w-full rounded-md bg-brand-700 font-semibold text-white hover:bg-brand-800 disabled:opacity-60">{pending ? "Creating account…" : "Create administrator account"}</button></form>;
}

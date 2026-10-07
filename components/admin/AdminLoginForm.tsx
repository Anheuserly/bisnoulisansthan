"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setPending(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
    const data = await response.json().catch(() => ({})); setPending(false);
    if (!response.ok) return setError(data.message ?? "Unable to sign in.");
    router.replace("/admin"); router.refresh();
  }
  return <form onSubmit={submit} className="space-y-5"><label className="block text-sm font-medium text-ink">Email<input name="email" type="email" autoComplete="email" required className="mt-1.5 h-11 w-full rounded-md border border-line px-3 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100" /></label><label className="block text-sm font-medium text-ink">Password<input name="password" type="password" autoComplete="current-password" required minLength={12} className="mt-1.5 h-11 w-full rounded-md border border-line px-3 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100" /></label>{error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-danger">{error}</p>}<button disabled={pending} className="h-11 w-full rounded-md bg-brand-700 font-semibold text-white hover:bg-brand-800 disabled:opacity-60">{pending ? "Signing in…" : "Sign in securely"}</button></form>;
}

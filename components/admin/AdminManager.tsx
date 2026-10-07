"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminManager() {
  const router = useRouter(); const [error, setError] = useState(""); const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setPending(true); const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/admins", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), displayName: form.get("displayName"), password: form.get("password"), role: form.get("role") }) }); const data = await response.json().catch(() => ({})); setPending(false);
    if (!response.ok) return setError(data.message ?? "Unable to add administrator."); event.currentTarget.reset(); router.refresh();
  }
  const field = "mt-1 h-10 w-full rounded-md border border-line px-3 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100";
  return <form onSubmit={submit} className="grid gap-4 rounded-xl border border-line bg-sand-50 p-5 md:grid-cols-2"><label className="text-sm font-medium text-ink">Name<input name="displayName" className={field} /></label><label className="text-sm font-medium text-ink">Email<input name="email" type="email" required className={field} /></label><label className="text-sm font-medium text-ink">Role<select name="role" defaultValue="editor" className={field}><option value="editor">Editor</option><option value="admin">Admin</option></select></label><label className="text-sm font-medium text-ink">Temporary password<input name="password" type="password" minLength={12} required className={field} /></label>{error && <p role="alert" className="text-sm text-danger md:col-span-2">{error}</p>}<button disabled={pending} className="h-10 rounded-md bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60 md:col-span-2">{pending ? "Adding…" : "Add user"}</button></form>;
}

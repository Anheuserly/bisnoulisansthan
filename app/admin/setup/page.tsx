import Link from "next/link";
import { AdminSetupForm } from "@/components/admin/AdminSetupForm";

export const metadata = { title: "Initial user setup" };

export default function AdminSetupPage() {
  return <main className="grid min-h-screen place-items-center bg-sand-50 px-5 py-12"><section className="w-full max-w-md rounded-2xl border border-line bg-white p-7 shadow-lift"><Link href="/admin/login" className="text-sm font-semibold text-brand-700 hover:underline">← Back to sign in</Link><p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-brand-700">One-time setup</p><h1 className="mt-2 font-display text-3xl font-bold text-ink">Create the first user</h1><p className="mt-2 text-sm leading-relaxed text-ink-muted">This page needs the private setup token from the server environment. It can only initialise a seeded BSGSS super-admin user whose password has not yet been set.</p><div className="mt-7"><AdminSetupForm /></div></section></main>;
}

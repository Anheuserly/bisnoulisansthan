import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata = { title: "Admin sign in" };

export default function AdminLoginPage() {
  return <main className="grid min-h-screen place-items-center bg-sand-50 px-5 py-12"><section className="w-full max-w-md rounded-2xl border border-line bg-white p-7 shadow-lift"><Link href="/" className="text-sm font-semibold text-brand-700 hover:underline">← Back to BSGSS website</Link><p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-brand-700">BSGSS Control Centre</p><h1 className="mt-2 font-display text-3xl font-bold text-ink">Admin sign in</h1><p className="mt-2 text-sm leading-relaxed text-ink-muted">Use your authorised user account to manage the website.</p><div className="mt-7"><AdminLoginForm /></div><p className="mt-5 text-xs leading-relaxed text-ink-muted">For a fresh installation only: complete the private <Link href="/admin/setup" className="font-medium text-brand-700 hover:underline">account setup</Link>.</p></section></main>;
}

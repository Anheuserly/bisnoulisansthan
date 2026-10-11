"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";

type State = { kind: "idle" | "success" | "error"; message?: string };

export function DonationVerificationForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setState({ kind: "idle" });
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/donations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) }).catch(() => null);
    const result = await response?.json().catch(() => null) as { message?: string; reference?: string } | null;
    setLoading(false);
    if (!response?.ok) return setState({ kind: "error", message: result?.message || "We could not save your payment details. Please try again or contact BSGSS." });
    event.currentTarget.reset();
    setState({ kind: "success", message: `Thank you. Your acknowledgement reference is ${result?.reference}. BSGSS will verify the payment before issuing a numbered certificate.` });
  }

  return <section className="mt-12 border-t border-line pt-10" aria-labelledby="payment-details-title">
    <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">After making your contribution</p>
    <h2 id="payment-details-title" className="mt-3 font-display text-2xl font-bold text-ink">Submit payment details for verification</h2>
    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">BSGSS checks each UPI or bank-transfer reference before issuing a numbered donation acknowledgement certificate. Please do not submit card or bank-login information here.</p>
    <form onSubmit={submit} className="mt-6 grid gap-4 rounded-xl border border-brand-200 bg-white p-5 sm:grid-cols-2" noValidate>
      <Field label="Full name" name="donorName" required />
      <Field label="Email address" name="donorEmail" type="email" required />
      <Field label="Phone number" name="donorPhone" type="tel" />
      <Field label="Amount donated (INR)" name="amount" type="number" min="1" step="0.01" required />
      <label className="grid gap-1.5 text-sm font-semibold text-ink">Payment method<select name="paymentMethod" required className="rounded-md border border-line bg-white px-3 py-2.5 font-normal text-ink outline-none focus:border-brand-600"><option value="upi">UPI</option><option value="bank_transfer">Bank transfer</option><option value="other">Other verified method</option></select></label>
      <Field label="Payment date" name="paymentDate" type="date" />
      <div className="sm:col-span-2"><Field label="UPI / bank transaction reference" name="paymentReference" required /></div>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-4"><button disabled={loading} className="inline-flex items-center gap-2 rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70">{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}{loading ? "Submitting…" : "Submit for verification"}</button><span className="text-xs text-ink-muted">A certificate is issued only after BSGSS confirms the payment.</span></div>
      {state.kind === "success" ? <p role="status" className="sm:col-span-2 flex gap-2 rounded-md bg-brand-50 p-3 text-sm leading-relaxed text-brand-900"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{state.message}</p> : null}
      {state.kind === "error" ? <p role="alert" className="sm:col-span-2 rounded-md bg-red-50 p-3 text-sm text-red-800">{state.message}</p> : null}
    </form>
  </section>;
}

function Field({ label, name, type = "text", required, min, step }: { label: string; name: string; type?: string; required?: boolean; min?: string; step?: string }) {
  return <label className="grid gap-1.5 text-sm font-semibold text-ink">{label}{required ? <span className="sr-only"> (required)</span> : null}<input name={name} type={type} required={required} min={min} step={step} className="rounded-md border border-line px-3 py-2.5 font-normal text-ink outline-none placeholder:text-ink-muted focus:border-brand-600" /></label>;
}

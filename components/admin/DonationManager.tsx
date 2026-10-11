"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExternalLink, LoaderCircle } from "lucide-react";

export type DonationRow = { id: string; donorName: string; donorEmail: string; amount: string; currency: string; paymentMethod: string; paymentReference: string; status: string; certificateNumber: string | null; createdAt: string };

export function DonationManager({ donations, canIssue }: { donations: DonationRow[]; canIssue: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  async function issue(id: string) {
    if (!confirm("Confirm that this payment reference has been checked against BSGSS records. Issue the acknowledgement certificate?")) return;
    setBusy(id);
    const response = await fetch(`/api/admin/donations/${id}/verify`, { method: "POST" });
    const result = await response.json().catch(() => null) as { message?: string; certificateUrl?: string } | null;
    setBusy(null);
    if (!response.ok) return alert(result?.message || "Certificate could not be issued.");
    router.refresh();
    if (result?.certificateUrl) window.open(result.certificateUrl, "_blank", "noopener,noreferrer");
  }
  if (!donations.length) return <p className="rounded-lg border border-dashed border-line bg-white p-6 text-sm text-ink-muted">No donation verification requests have been submitted yet.</p>;
  return <div className="overflow-x-auto rounded-xl border border-line bg-white"><table className="min-w-[920px] w-full text-left text-sm"><thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-800"><tr><th className="px-4 py-3">Donor</th><th className="px-4 py-3">Contribution</th><th className="px-4 py-3">Payment reference</th><th className="px-4 py-3">Submitted</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Action</th></tr></thead><tbody>{donations.map((donation) => <tr key={donation.id} className="border-t border-line align-top"><td className="px-4 py-4 font-medium text-ink"><p>{donation.donorName}</p><p className="mt-1 font-normal text-ink-muted">{donation.donorEmail}</p></td><td className="px-4 py-4 text-ink">{new Intl.NumberFormat("en-IN", { style: "currency", currency: donation.currency }).format(Number(donation.amount))}<p className="mt-1 text-xs capitalize text-ink-muted">{donation.paymentMethod.replace("_", " ")}</p></td><td className="px-4 py-4 font-mono text-xs text-ink">{donation.paymentReference}</td><td className="px-4 py-4 text-ink-muted">{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(donation.createdAt))}</td><td className="px-4 py-4"><span className="rounded-full bg-sand-100 px-2.5 py-1 text-xs font-semibold capitalize text-ink">{donation.status.replaceAll("_", " ")}</span>{donation.certificateNumber ? <p className="mt-2 text-xs font-semibold text-brand-700">{donation.certificateNumber}</p> : null}</td><td className="px-4 py-4">{donation.status === "certificate_issued" ? <a href={`/support/certificate/${donation.id}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline">View certificate <ExternalLink className="h-3.5 w-3.5" /></a> : canIssue ? <button onClick={() => issue(donation.id)} disabled={busy === donation.id} className="inline-flex items-center gap-2 rounded-md bg-brand-700 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-800 disabled:opacity-60">{busy === donation.id ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : null}Verify & issue</button> : <span className="text-xs text-ink-muted">Administrator approval required</span>}</td></tr>)}</tbody></table></div>;
}

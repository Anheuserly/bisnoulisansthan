"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Clock, Mail, MessageSquare, Phone, Search, Trash2 } from "lucide-react";

export type InquiryRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
};

export function InquiryManager({ inquiries }: { inquiries: InquiryRow[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = inquiries.filter((inq) => {
    if (filter !== "all" && inq.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.subject.toLowerCase().includes(q) ||
        inq.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  async function updateStatus(id: string, newStatus: string) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.message || "Could not update status.");
        return;
      }
      router.refresh();
    } catch {
      alert("Error updating inquiry status.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls: Search and Status Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {["all", "new", "in_progress", "closed"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold capitalize transition ${
                filter === st
                  ? "bg-brand-700 text-white shadow-sm"
                  : "bg-white text-ink border border-line hover:bg-sand-50"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-line bg-white py-1.5 pl-9 pr-3 text-xs text-ink placeholder:text-ink-muted focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-100"
          />
        </div>
      </div>

      {/* Table / List */}
      {!filtered.length ? (
        <div className="rounded-xl border border-dashed border-line bg-white p-8 text-center text-sm text-ink-muted">
          No contact inquiries found matching your filter.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-sm">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-brand-50/70 text-xs font-semibold uppercase tracking-wider text-brand-900 border-b border-line">
              <tr>
                <th className="px-5 py-3.5">Contact Details</th>
                <th className="px-5 py-3.5">Subject & Message</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((item) => (
                <tr key={item.id} className="align-top hover:bg-sand-50/40 transition">
                  {/* Sender Details */}
                  <td className="px-5 py-4">
                    <p className="font-semibold text-ink">{item.name}</p>
                    <a
                      href={`mailto:${item.email}`}
                      className="mt-0.5 flex items-center gap-1.5 text-xs text-brand-700 hover:underline"
                    >
                      <Mail className="h-3 w-3" />
                      {item.email}
                    </a>
                    {item.phone && (
                      <a
                        href={`tel:${item.phone}`}
                        className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted hover:underline"
                      >
                        <Phone className="h-3 w-3" />
                        {item.phone}
                      </a>
                    )}
                  </td>

                  {/* Subject and Message Body */}
                  <td className="px-5 py-4 max-w-md">
                    <p className="font-semibold text-ink">{item.subject}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-muted line-clamp-3 whitespace-pre-wrap">
                      {item.message || <span className="italic">No additional message provided.</span>}
                    </p>
                  </td>

                  {/* Submitted Date */}
                  <td className="px-5 py-4 text-xs text-ink-muted whitespace-nowrap">
                    {new Intl.DateTimeFormat("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(item.createdAt))}
                  </td>

                  {/* Status Badge */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                        item.status === "new"
                          ? "bg-amber-100 text-amber-800"
                          : item.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.status === "new" && <Clock className="h-3 w-3" />}
                      {item.status === "closed" && <CheckCircle2 className="h-3 w-3" />}
                      {item.status.replace("_", " ")}
                    </span>
                  </td>

                  {/* Status Change Dropdown / Buttons */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <select
                      value={item.status}
                      disabled={busyId === item.id}
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                      className="rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink focus:border-brand-600 focus:outline-none disabled:opacity-50"
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

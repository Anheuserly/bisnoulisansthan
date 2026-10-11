"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  GraduationCap,
  Heart,
  Laptop,
  Mail,
  Phone,
  Search,
  UsersRound,
  X,
} from "lucide-react";

export interface JoinApplicationRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  roleType: string;
  roleLabel: string;
  subject: string;
  message: string;
  status: "new" | "in_review" | "accepted" | "contacted" | "archived";
  notes?: string | null;
  createdAt: string;
}

const statusConfig: Record<
  JoinApplicationRow["status"],
  { label: string; badgeClass: string; icon: typeof Clock }
> = {
  new: { label: "New", badgeClass: "bg-blue-50 text-blue-800 border-blue-200", icon: Clock },
  in_review: {
    label: "In Review",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
    icon: Clock,
  },
  accepted: {
    label: "Accepted",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    icon: CheckCircle2,
  },
  contacted: {
    label: "Contacted",
    badgeClass: "bg-purple-50 text-purple-800 border-purple-200",
    icon: Mail,
  },
  archived: {
    label: "Archived",
    badgeClass: "bg-gray-100 text-gray-700 border-gray-200",
    icon: CheckCircle2,
  },
};

const roleIcons: Record<string, typeof UsersRound> = {
  volunteer: UsersRound,
  internship: GraduationCap,
  csr_partner: Building2,
  trainer: Laptop,
  supporter: Heart,
  other: BriefcaseBusiness,
};

export function JoinApplicationManager({
  applications: initialApplications,
}: {
  applications: JoinApplicationRow[];
}) {
  const [items, setItems] = useState<JoinApplicationRow[]>(initialApplications);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<JoinApplicationRow | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = items.filter((item) => {
    const matchesSearch =
      `${item.name} ${item.email} ${item.phone || ""} ${item.subject} ${item.message}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || item.roleType === roleFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: JoinApplicationRow["status"]) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/join/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      setItems((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      if (selectedApp?.id === id) {
        setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update application status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-line bg-white p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, role, or message..."
            className="h-10 w-full rounded-lg border border-line bg-sand-50/50 pl-9 pr-3 text-xs text-ink placeholder:text-ink-subtle focus:border-brand-600 focus:bg-white focus:outline-none sm:text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-ink-muted">
            <Filter className="h-3.5 w-3.5" />
            <span>Role:</span>
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-9 rounded-lg border border-line bg-sand-50/50 px-2.5 text-xs font-medium text-ink focus:border-brand-600 focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="volunteer">Volunteer</option>
            <option value="internship">Internship</option>
            <option value="csr_partner">CSR Partner</option>
            <option value="trainer">Skill Trainer</option>
            <option value="supporter">Supporter</option>
            <option value="other">General</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-lg border border-line bg-sand-50/50 px-2.5 text-xs font-medium text-ink focus:border-brand-600 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in_review">In Review</option>
            <option value="accepted">Accepted</option>
            <option value="contacted">Contacted</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Applications Table / Cards */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-line bg-white p-12 text-center">
          <UsersRound className="mx-auto h-10 w-10 text-ink-muted" />
          <h3 className="mt-3 text-sm font-semibold text-ink">No applications found</h3>
          <p className="mt-1 text-xs text-ink-muted">
            {items.length === 0
              ? "No applications have been submitted through the Join Us form yet."
              : "Try adjusting your search terms or filters."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-line bg-sand-50 text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">
                <tr>
                  <th className="px-4 py-3">Applicant</th>
                  <th className="px-4 py-3">Pathway / Role</th>
                  <th className="px-4 py-3">Subject & Note</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((app) => {
                  const Icon = roleIcons[app.roleType] ?? UsersRound;
                  const stat = statusConfig[app.status] ?? statusConfig.new;
                  const isUpdating = updatingId === app.id;

                  return (
                    <tr key={app.id} className="transition-colors hover:bg-sand-50/60">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-ink sm:text-sm">{app.name}</div>
                        <div className="text-[0.6875rem] text-ink-muted">{app.email}</div>
                        {app.phone && (
                          <div className="text-[0.6875rem] text-ink-muted">{app.phone}</div>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/80 bg-brand-50/80 px-2.5 py-1 text-[0.6875rem] font-bold text-brand-850">
                          <Icon className="h-3 w-3 text-brand-700" />
                          {app.roleLabel}
                        </span>
                      </td>

                      <td className="max-w-xs px-4 py-3">
                        <div className="truncate font-medium text-ink">{app.subject}</div>
                        <div className="truncate text-[0.6875rem] text-ink-muted">{app.message}</div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-ink-muted">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(app.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <select
                          disabled={isUpdating}
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(
                              app.id,
                              e.target.value as JoinApplicationRow["status"]
                            )
                          }
                          className={`rounded-md border px-2 py-1 text-[0.6875rem] font-bold capitalize focus:outline-none ${stat.badgeClass}`}
                        >
                          <option value="new">New</option>
                          <option value="in_review">In Review</option>
                          <option value="accepted">Accepted</option>
                          <option value="contacted">Contacted</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedApp(app)}
                          className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2.5 py-1 text-xs font-semibold text-brand-700 shadow-2xs hover:bg-sand-50"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal / Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/40 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-xl rounded-2xl border border-line bg-white p-6 shadow-lift sm:p-8">
            <div className="flex items-start justify-between border-b border-line pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-850">
                  {selectedApp.roleLabel}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">
                  {selectedApp.name}
                </h3>
                <p className="text-xs text-ink-muted">
                  Applied on{" "}
                  {new Date(selectedApp.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="rounded-lg p-1 text-ink-muted hover:bg-sand-50 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs sm:text-sm">
              <div className="grid gap-3 rounded-xl border border-line bg-sand-50/60 p-4 sm:grid-cols-2">
                <div>
                  <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">Email</p>
                  <p className="mt-0.5 font-medium text-ink select-all">{selectedApp.email}</p>
                </div>
                <div>
                  <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">Phone</p>
                  <p className="mt-0.5 font-medium text-ink select-all">
                    {selectedApp.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">Subject</p>
                <p className="mt-1 font-semibold text-ink">{selectedApp.subject}</p>
              </div>

              <div>
                <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted">Application Statement / Note</p>
                <div className="mt-1 max-h-48 overflow-y-auto whitespace-pre-wrap rounded-xl border border-line bg-white p-3 text-xs leading-relaxed text-ink">
                  {selectedApp.message || "No message content provided."}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-line pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-ink">Change Status:</span>
                  <select
                    value={selectedApp.status}
                    onChange={(e) =>
                      handleStatusChange(
                        selectedApp.id,
                        e.target.value as JoinApplicationRow["status"]
                      )
                    }
                    className="rounded-md border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink focus:outline-none"
                  >
                    <option value="new">New</option>
                    <option value="in_review">In Review</option>
                    <option value="accepted">Accepted</option>
                    <option value="contacted">Contacted</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <a
                  href={`mailto:${selectedApp.email}?subject=${encodeURIComponent(
                    `Re: ${selectedApp.subject} [BSGSS Application]`
                  )}&body=${encodeURIComponent(
                    `Dear ${selectedApp.name},\n\nThank you for reaching out to Bisnouli Sarvodaya Gramodyog Sewa Sansthan regarding your interest in the ${selectedApp.roleLabel} pathway.\n\n`
                  )}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-brand-800"
                >
                  <Mail className="h-3.5 w-3.5" /> Reply to Applicant
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

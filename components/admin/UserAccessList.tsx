"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Shield, Trash2, UserCheck, UserX } from "lucide-react";

export type AdminUserRow = {
  id: string;
  email: string;
  displayName: string | null;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
};

interface UserAccessListProps {
  users: AdminUserRow[];
  currentUserId: string;
  isSuperAdmin: boolean;
}

export function UserAccessList({ users, currentUserId, isSuperAdmin }: UserAccessListProps) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/admins", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: "error", message: data.message || "Failed to update role." });
      } else {
        setFeedback({ type: "success", message: "User role updated successfully." });
        router.refresh();
      }
    } catch {
      setFeedback({ type: "error", message: "Network error occurred." });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleActive = async (userId: string, currentStatus: boolean) => {
    setUpdatingId(userId);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/admins", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isActive: !currentStatus }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: "error", message: data.message || "Failed to update user status." });
      } else {
        setFeedback({
          type: "success",
          message: !currentStatus ? "User activated." : "User deactivated.",
        });
        router.refresh();
      }
    } catch {
      setFeedback({ type: "error", message: "Network error occurred." });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (!confirm(`Are you sure you want to permanently remove access for ${email}?`)) {
      return;
    }
    setUpdatingId(userId);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/admins?id=${encodeURIComponent(userId)}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFeedback({ type: "error", message: data.message || "Failed to delete user." });
      } else {
        setFeedback({ type: "success", message: `User ${email} removed.` });
        router.refresh();
      }
    } catch {
      setFeedback({ type: "error", message: "Network error occurred." });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-3">
      {feedback && (
        <div
          className={`flex items-center gap-2 rounded-xl border p-3 text-xs font-semibold ${
            feedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {feedback.type === "success" ? (
            <Check className="h-4 w-4 text-emerald-600 shrink-0" />
          ) : (
            <Shield className="h-4 w-4 text-red-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-sand-50/70 text-xs font-bold uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-5 py-3.5">Team Member</th>
              <th className="px-5 py-3.5">Role &amp; Permissions</th>
              <th className="px-5 py-3.5">Last Sign In</th>
              <th className="px-5 py-3.5">Status</th>
              {isSuperAdmin && <th className="px-5 py-3.5 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {users.map((admin) => {
              const isSelf = admin.id === currentUserId;
              const isBusy = updatingId === admin.id;

              return (
                <tr key={admin.id} className="transition hover:bg-sand-50/40">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-800 text-xs">
                        {(admin.displayName || admin.email).slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-ink font-semibold">
                            {admin.displayName || "No name set"}
                          </strong>
                          {isSelf && (
                            <span className="rounded-full bg-sand-100 px-2 py-0.2 text-[10px] font-bold text-slate-700">
                              You
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-ink-muted">{admin.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {isSuperAdmin && !isSelf ? (
                      <select
                        disabled={isBusy}
                        value={admin.role}
                        onChange={(e) => handleRoleChange(admin.id, e.target.value)}
                        className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink outline-none focus:border-brand-500 disabled:opacity-60"
                      >
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/80 bg-brand-50/70 px-2.5 py-0.5 text-xs font-bold text-brand-800">
                        <Shield className="h-3 w-3 text-brand-700" />
                        <span className="capitalize">{admin.role.replace("_", " ")}</span>
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-xs text-ink-muted">
                    {admin.lastLoginAt
                      ? new Date(admin.lastLoginAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Never"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        admin.isActive ? "text-emerald-700" : "text-red-600"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          admin.isActive ? "bg-emerald-500" : "bg-red-400"
                        }`}
                      />
                      <span>{admin.isActive ? "Active" : "Deactivated"}</span>
                    </span>
                  </td>

                  {isSuperAdmin && (
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {!isSelf && (
                          <>
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => handleToggleActive(admin.id, admin.isActive)}
                              className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
                                admin.isActive
                                  ? "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
                                  : "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                              } disabled:opacity-60`}
                              title={admin.isActive ? "Deactivate user" : "Activate user"}
                            >
                              {admin.isActive ? (
                                <>
                                  <UserX className="h-3.5 w-3.5" />
                                  <span>Deactivate</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-3.5 w-3.5" />
                                  <span>Activate</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => handleDeleteUser(admin.id, admin.email)}
                              className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 hover:border-red-300 disabled:opacity-60"
                              title="Delete user"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Remove</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import Link from "next/link";
import { AdminManager } from "@/components/admin/AdminManager";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";
import { UserAccessList } from "@/components/admin/UserAccessList";
import { requireAdmin } from "@/lib/auth/require-admin";
import { db } from "@/lib/db";

type AdminRow = {
  id: string;
  email: string;
  displayName: string | null;
  role: string;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
};

export default async function AdminsPage() {
  const actor = await requireAdmin();
  const { rows } = await db.query<AdminRow>(
    'SELECT id, email, display_name AS "displayName", role, is_active AS "isActive", last_login_at AS "lastLoginAt", created_at AS "createdAt" FROM users ORDER BY created_at ASC'
  );

  return (
    <main className="min-h-screen bg-sand-50">
      <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
        <Link href="/admin" className="text-sm font-semibold text-brand-700 hover:underline">
          ← Control Centre
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700">Access &amp; Security</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-ink">Users &amp; Passwords</h1>
          </div>
          <p className="text-sm text-ink-muted">
            Logged in as: <strong className="text-ink">{actor.displayName || actor.email}</strong> ({actor.role.replace("_", " ")})
          </p>
        </div>

        {/* Change Current User Password */}
        <section className="mt-8">
          <ChangePasswordForm />
        </section>

        {/* Add Team Member (Super Admin Only) */}
        {actor.role === "super_admin" ? (
          <section className="mt-10">
            <h2 className="mb-4 font-display text-xl font-bold text-ink">Add team member</h2>
            <AdminManager />
          </section>
        ) : (
          <p className="mt-8 rounded-lg border border-line bg-white p-4 text-sm text-ink-muted">
            Only a super admin can add new team members.
          </p>
        )}

        {/* Current Access List with Role Permission Control */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-xl font-bold text-ink">Administrative Team &amp; Role Permissions</h2>
              <p className="mt-0.5 text-xs text-ink-muted">
                {actor.role === "super_admin"
                  ? "As a Super Admin, you can assign roles (Super Admin, Admin, Editor), toggle active status, and remove members."
                  : "List of authorized staff and team members with administrative portal access."}
              </p>
            </div>
          </div>

          <UserAccessList
            users={rows.map((r) => ({
              ...r,
              lastLoginAt: r.lastLoginAt ? r.lastLoginAt.toISOString() : null,
              createdAt: r.createdAt.toISOString(),
            }))}
            currentUserId={actor.id}
            isSuperAdmin={actor.role === "super_admin"}
          />
        </section>
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowLeft, UsersRound } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { db } from "@/lib/db";
import {
  JoinApplicationManager,
  type JoinApplicationRow,
} from "@/components/admin/JoinApplicationManager";

export default async function AdminJoinApplicationsPage() {
  await requireAdmin();

  let ready = false;
  let applications: JoinApplicationRow[] = [];

  if (process.env.DATABASE_URL) {
    try {
      const { rows: tableCheck } = await db.query<{ exists: boolean }>(
        "SELECT to_regclass('public.join_applications') IS NOT NULL AS exists"
      );
      ready = Boolean(tableCheck[0]?.exists);

      if (ready) {
        const { rows } = await db.query<JoinApplicationRow>(
          `SELECT id, name, email, phone, role_type AS "roleType", role_label AS "roleLabel", subject, message, status, notes, created_at AS "createdAt"
           FROM join_applications
           ORDER BY created_at DESC
           LIMIT 250`
        );
        applications = rows;
      }
    } catch (e) {
      console.warn("Could not query join_applications table:", e);
    }
  }

  return (
    <main className="min-h-screen bg-sand-50">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-700">BSGSS Control Centre</p>
            <h1 className="font-display text-xl font-bold text-ink">Join & Volunteer Applications</h1>
          </div>
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="max-w-3xl">
          <UsersRound className="h-7 w-7 text-brand-700" />
          <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
            Review incoming Join Us & Volunteer submissions
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">
            Applications submitted through the public Join Us page. Filter by pathway (Volunteer, Internship, CSR Partner, Skill Trainer, Supporter), update review statuses, and reply directly.
          </p>
        </div>

        {!ready ? (
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
            The join applications table has not been initialized yet. It will automatically create on the next submission, or run{" "}
            <code className="rounded bg-white px-1.5 py-0.5">npm run db:init</code> on your deployment to seed it.
          </div>
        ) : (
          <div className="mt-8">
            <JoinApplicationManager applications={applications} />
          </div>
        )}
      </div>
    </main>
  );
}

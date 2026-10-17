import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "BSGSS Control Centre",
  description: "Executive Management Workspace for Bisnouli Sarvodaya Gramodyog Sewa Sansthan.",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();

  // If no admin is authenticated (e.g. login or setup page), render children cleanly without sidebar
  if (!admin) {
    return <>{children}</>;
  }

  // Fetch real-time count badges for navigation
  let counts = { users: 0, inquiries: 0, joins: 0, donations: 0 };
  if (process.env.DATABASE_URL) {
    try {
      const [usersRes, inqRes, joinsRes, donRes] = await Promise.all([
        db.query<{ count: string }>("SELECT count(*) FROM users WHERE is_active = true"),
        db.query<{ count: string }>("SELECT count(*) FROM contact_inquiries WHERE status = 'new' OR status IS NULL"),
        db.query<{ count: string }>("SELECT count(*) FROM join_applications WHERE status = 'pending' OR status IS NULL"),
        db.query<{ count: string }>("SELECT count(*) FROM donation_requests WHERE status = 'pending' OR status IS NULL"),
      ]);

      counts = {
        users: Number(usersRes.rows[0]?.count ?? 0),
        inquiries: Number(inqRes.rows[0]?.count ?? 0),
        joins: Number(joinsRes.rows[0]?.count ?? 0),
        donations: Number(donRes.rows[0]?.count ?? 0),
      };
    } catch {
      // Fallback safely if tables are not initialized
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-sand-50">
      {/* Frozen Non-Scrolling Left Sidenav */}
      <AdminSidebar admin={admin} counts={counts} />

      {/* Independently Scrollable Right Workspace Content */}
      <div className="flex-1 min-w-0 h-screen overflow-y-auto flex flex-col">
        {children}
      </div>
    </div>
  );
}

import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";
import { WebsiteCustomizerStudio } from "@/components/admin/WebsiteCustomizerStudio";

export default async function AdminCustomizePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const admin = await requireAdmin();
  const { tab } = await searchParams;
  const initialSettings = await getCustomizerSettings();

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-sand-50 p-3 sm:p-4 md:p-5">
      <Suspense fallback={<div className="p-8 text-center text-xs text-ink-muted">Loading studio modules...</div>}>
        <WebsiteCustomizerStudio
          admin={{
            displayName: (admin as any).displayName || (admin as any).name || admin.email.split("@")[0],
            email: admin.email,
            role: admin.role,
          }}
          initialSettings={initialSettings}
          initialTab={tab}
        />
      </Suspense>
    </div>
  );
}

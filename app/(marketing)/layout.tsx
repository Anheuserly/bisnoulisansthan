import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QuickActions } from "@/components/layout/QuickActions";
import { ContactModal } from "@/components/contact/ContactModal";
import { AmbientSoundPlayer } from "@/components/layout/AmbientSoundPlayer";
import { SitePopupNotification } from "@/components/layout/SitePopupNotification";
import { GlobalScrollObserver } from "@/components/ui/GlobalScrollObserver";

export const dynamic = "force-dynamic";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalScrollObserver />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <QuickActions />
      <AmbientSoundPlayer />
      <SitePopupNotification />
      <Suspense fallback={null}>
        <ContactModal />
      </Suspense>
    </>
  );
}


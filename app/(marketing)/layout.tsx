import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QuickActions } from "@/components/layout/QuickActions";
import { ContactModal } from "@/components/contact/ContactModal";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <QuickActions />
      <Suspense fallback={null}>
        <ContactModal />
      </Suspense>
    </>
  );
}

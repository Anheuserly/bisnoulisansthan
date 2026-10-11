import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QuickActions } from "@/components/layout/QuickActions";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <QuickActions />
    </>
  );
}

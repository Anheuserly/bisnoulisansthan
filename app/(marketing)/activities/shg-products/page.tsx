import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  HandHeart,
  Heart,
  Mail,
  MapPin,
  PackageCheck,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProductInquiryButton } from "@/components/products/ProductInquiryButton";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Women SHG Handcrafted Products | BSGSS",
  description:
    "Support rural women artisans. Explore handcrafted Khadi apparel, handloom textiles, and craft items produced by BSGSS SHG guilds.",
  path: "/activities/shg-products",
});

const products = [
  {
    name: "Handwoven Kashmiri & Khadi Shawls",
    tag: "Signature Woolens",
    description:
      "Finely woven warm shawls created through village women’s craft guilds, blending heritage techniques with sustainable household livelihoods.",
    image: "/images/bsgss/shg-products/shawl.png",
    leadTime: "Crafted on Order & Ready Stock",
  },
  {
    name: "Handcrafted Artisan Mufflers",
    tag: "Winter Warmth",
    description:
      "Hand-knitted mufflers made with premium fibers by certified SHG women artisans, fostering financial independence across rural households.",
    image: "/images/bsgss/shg-products/muffler.png",
    leadTime: "Available in multiple weave patterns",
  },
];

export default function ShgProductsPage() {
  return (
    <>
      <PageHeader
        title="Women Self-Help Group (SHG) Products"
        lead="Handmade textiles, warm wear, and sustainable crafts created through women’s self-help groups supported by BSGSS."
        crumbs={[
          { name: "Activities", path: "/activities" },
          { name: "SHG products", path: "/activities/shg-products" },
        ]}
      />
      <div className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Top Mission Banner (Borderless, Open Editorial) */}
          <ScrollReveal direction="up" delay={40}>
            <section className="grid gap-10 border-t-2 border-brand-850 pt-6 md:grid-cols-[1.1fr_0.9fr] md:items-start">
              <div>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700">
                  Women-Led Rural Enterprise
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
                  Artisanal craft that builds direct household agency.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
                  BSGSS trains, organizes, and supports over 5,000 women in village Self-Help Groups (SHGs) across Uttar Pradesh and Delhi NCR. Every item ordered directly strengthens a family&apos;s dignity, children&apos;s education, and healthcare resilience.
                </p>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="mailto:bsgssindia@yahoo.co.in?subject=Bulk%20SHG%20Products%20Catalogue%20Enquiry"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Inquire for Institutional &amp; Festive Bulk Gifting</span>
                  </a>
                </div>
              </div>

              {/* Trust Indicators (Borderless, Open Editorial) */}
              <div className="grid grid-cols-2 gap-6">
                <div className="border-t border-line pt-4">
                  <Users className="h-5 w-5 text-ink" />
                  <p className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">5,000+</p>
                  <p className="mt-0.5 text-xs text-ink-muted">Women Artisans Certified</p>
                </div>
                <div className="border-t border-line pt-4">
                  <PackageCheck className="h-5 w-5 text-ink" />
                  <p className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">60+</p>
                  <p className="mt-0.5 text-xs text-ink-muted">Village Self-Help Guilds</p>
                </div>
                <div className="border-t border-line pt-4">
                  <Sparkles className="h-5 w-5 text-ink" />
                  <p className="mt-2 font-display text-base font-bold text-ink sm:text-lg">100%</p>
                  <p className="mt-0.5 text-xs text-ink-muted">Fair Community Proceeds</p>
                </div>
                <div className="border-t border-line pt-4">
                  <Award className="h-5 w-5 text-ink" />
                  <p className="mt-2 font-display text-base font-bold text-ink sm:text-lg">Verified</p>
                  <p className="mt-0.5 text-xs text-ink-muted">Handloom &amp; Khadi Standard</p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Current Collection Grid (Borderless, Open Editorial) */}
          <section className="mt-14 sm:mt-18">
            <ScrollReveal direction="up" delay={40}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-line pb-3">
                <div>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700">Artisan Catalog</p>
                  <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
                    Made with care, connected to community dignity.
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-700">
                  <ShoppingBag className="h-4 w-4" />
                  <span>{products.length} Collections Available</span>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 max-w-5xl">
              {products.map((product, idx) => (
                <ScrollReveal key={product.name} staggerIndex={idx} direction="up">
                  <article className="group flex h-full flex-col border-t-2 border-line pt-5 transition hover:border-brand-700">
                    <div className="relative aspect-[4/3] overflow-hidden bg-sand-50/70 p-4 rounded-xl">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-106"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-ink-muted bg-white/90 px-2 py-0.5 rounded-sm">
                          {product.tag}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col pt-5">
                      <h3 className="font-display text-lg font-bold text-ink group-hover:text-brand-800">
                        {product.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                        {product.description}
                      </p>

                      {/* Meet the Artisan Guild Detail */}
                      <div className="mt-4 border-t border-line/60 pt-3 text-xs text-ink/80 space-y-1">
                        <p>
                          <span className="font-semibold text-ink">Artisan Guild:</span> {idx === 0 ? "Bisnouli Craft Guild, Dadri (12 Women Artisans)" : "Hindon Basin Women's Livelihood Center"}
                        </p>
                        <p>
                          <span className="font-semibold text-ink">Technique:</span> {idx === 0 ? "Heritage Charkha hand-spun yarn & border embroidery" : "Hand-knitted pure woolen yarn with traditional rib stitch"}
                        </p>
                        <p className="text-[0.6875rem] text-ink-muted pt-1">
                          <span className="font-medium text-ink-muted">Availability: </span>
                          {product.leadTime}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-line/60">
                        <ProductInquiryButton productName={product.name} />
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Documentary Workshop Story */}
          <section className="mt-14 sm:mt-18">
            <ScrollReveal direction="up" delay={40}>
              <div className="border-b border-line pb-3">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Lived Agency</p>
                <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
                  Behind the stitches: Women in training
                </h2>
              </div>
            </ScrollReveal>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <ScrollReveal direction="up" delay={60}>
                <div className="group overflow-hidden rounded-2xl border-2 border-white bg-white shadow-soft transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand-100">
                    <img
                      src="/images/bsgss/gallery-training/185-tal1.jpeg"
                      alt="Village women learning sewing machine operations"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="font-display text-sm font-bold sm:text-base">Mastering Tailoring &amp; Cutting</p>
                      <p className="text-xs text-white/80">Intensive 3-month certified vocational course with modern sewing machines.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={120}>
                <div className="group overflow-hidden rounded-2xl border-2 border-white bg-white shadow-soft transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand-100">
                    <img
                      src="/images/bsgss/gallery-training/186-tal2.jpeg"
                      alt="Women self-help collective finishing textile garments"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="font-display text-sm font-bold sm:text-base">Cooperative Guild Production</p>
                      <p className="text-xs text-white/80">Graduates pool capital and resources to fulfill local school uniforms and market orders.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* CSR Gifting Partnership CTA */}
          <ScrollReveal direction="up" delay={60}>
            <section className="mt-12 sm:mt-16 rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 via-white to-brand-50/50 p-6 sm:p-8 shadow-2xs">
              <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                Partner with BSGSS for Corporate CSR Gifting
              </h2>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                Companies seeking meaningful festive giftings, conference kits, and eco-totes can source directly from BSGSS Self-Help Groups, fulfilling ESG and CSR social procurement goals with audited transparency.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
                >
                  <span>Connect with Corporate Partnerships Desk</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-5 py-2.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-50 sm:text-sm"
                >
                  <span>Support Artisan Training</span>
                </Link>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}

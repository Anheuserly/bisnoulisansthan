import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProductInquiryButton } from "@/components/products/ProductInquiryButton";
import { SHG_PRODUCTS } from "@/config/shg-products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Women SHG Handcrafted Products | BSGSS",
  description:
    "Support rural women artisans. Explore handcrafted Khadi apparel, handloom textiles, and craft items produced by BSGSS village self-help groups (SHGs).",
  path: "/activities/shg-products",
});

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
          {/* Current Collection Grid (Borderless, Open Editorial) */}
          <section>
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
                  <span>{SHG_PRODUCTS.length} Collections Available</span>
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
              {SHG_PRODUCTS.map((product, idx) => (
                <ScrollReveal key={product.slug} staggerIndex={idx} direction="up">
                  <article className="group flex h-full flex-col border-t-2 border-line pt-4 transition hover:border-brand-700">
                    <Link
                      href={`/activities/shg-products/${product.slug}`}
                      className="relative aspect-square overflow-hidden bg-sand-50/70 p-3 rounded-xl border border-line/50 flex items-center justify-center block"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                        loading={idx < 10 ? "eager" : "lazy"}
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="text-[0.625rem] font-bold uppercase tracking-wider text-ink-muted bg-white/95 px-2 py-0.5 rounded-sm shadow-2xs">
                          {product.tag}
                        </span>
                      </div>
                    </Link>

                    <div className="flex flex-1 flex-col pt-3">
                      <Link
                        href={`/activities/shg-products/${product.slug}`}
                        className="font-display text-sm sm:text-base font-bold text-ink group-hover:text-brand-800 line-clamp-1 hover:underline"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 flex-1 text-xs leading-relaxed text-ink-muted line-clamp-2">
                        {product.description}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-line/60">
                        <ProductInquiryButton
                          productName={product.name}
                          productTag={product.tag}
                          productImage={product.image}
                          productSlug={product.slug}
                        />
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
                      <p className="font-display text-sm font-bold sm:text-base">Cooperative SHG Production</p>
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

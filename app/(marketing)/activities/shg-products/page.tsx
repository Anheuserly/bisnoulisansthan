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
    description: "Finely woven warm shawls created through village women’s craft guilds, blending heritage techniques with sustainable household livelihoods.",
    image: "/images/bsgss/shg-products/shawl.png",
    leadTime: "Crafted on Order & Ready Stock",
  },
  {
    name: "Handcrafted Artisan Mufflers",
    tag: "Winter Warmth",
    description: "Hand-knitted mufflers made with premium fibers by certified SHG women artisans, fostering financial independence across rural households.",
    image: "/images/bsgss/shg-products/muffler.png",
    leadTime: "Available in multiple weave patterns",
  },
  {
    name: "Handcrafted Eco Jute & Fabric Tote Bags",
    tag: "Eco Livelihood",
    description: "Sturdy, sustainable daily-use totes stitched by vocational tailoring graduates as an alternative to single-use plastics.",
    image: "/images/bsgss/products/41-homepage-product-1.jpg",
    leadTime: "Ideal for CSR Giftings & Bulk Events",
  },
  {
    name: "Traditional Embroidered Khadi Stoles",
    tag: "Heritage Craft",
    description: "Intricately detailed stoles combining traditional needlework and khadi cotton, empowering rural home-based artisans.",
    image: "/images/bsgss/products/42-homepage-product-2.jpg",
    leadTime: "Hand-dyed authentic craft",
  },
  {
    name: "Artisan Village Utility Crafts",
    tag: "Home Living",
    description: "Functional home goods, table mats, and cloth crafts tailored during BSGSS vocational skill development camps.",
    image: "/images/bsgss/products/43-homepage-product-3.jpg",
    leadTime: "Community artisan collective",
  },
  {
    name: "Tailored Community Garments & Apparel",
    tag: "Vocational Guild",
    description: "Quality school and community garments tailored by certified women entrepreneurs operating independent micro-enterprises.",
    image: "/images/bsgss/products/278-qq.jpeg",
    leadTime: "Custom sizing for institutional supply",
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          {/* Top Mission Banner */}
          <ScrollReveal direction="up" delay={40}>
            <section className="grid gap-8 rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 via-white to-brand-50/50 p-6 sm:p-8 md:grid-cols-[1.1fr_0.9fr] md:items-center shadow-2xs">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 shadow-2xs">
                  <HandHeart className="h-3.5 w-3.5 text-brand-600" />
                  <span>Women-Led Rural Enterprise</span>
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
                  Artisanal craft that builds direct household agency.
                </h2>
                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                  BSGSS trains, organizes, and supports over 5,000 women in village Self-Help Groups (SHGs) across Uttar Pradesh and Delhi NCR. Every item purchased directly strengthens a family&apos;s dignity, children&apos;s education, and healthcare resilience.
                </p>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="mailto:bsgssindia@yahoo.co.in?subject=Bulk%20SHG%20Products%20Catalogue%20Enquiry"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-brand-800 sm:text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Inquire for Institutional Bulk Orders</span>
                  </a>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-brand-100 bg-white/95 p-4 shadow-2xs">
                  <Users className="h-5 w-5 text-brand-700" />
                  <p className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">5,000+</p>
                  <p className="mt-0.5 text-xs text-ink-muted">Women Artisans Certified</p>
                </div>
                <div className="rounded-xl border border-brand-100 bg-white/95 p-4 shadow-2xs">
                  <PackageCheck className="h-5 w-5 text-emerald-600" />
                  <p className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">60+</p>
                  <p className="mt-0.5 text-xs text-ink-muted">Village Self-Help Guilds</p>
                </div>
                <div className="rounded-xl border border-brand-100 bg-white/95 p-4 shadow-2xs">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                  <p className="mt-2 font-display text-base font-bold text-ink sm:text-lg">100%</p>
                  <p className="mt-0.5 text-xs text-ink-muted">Fair Community Livelihood</p>
                </div>
                <div className="rounded-xl border border-brand-100 bg-white/95 p-4 shadow-2xs">
                  <Award className="h-5 w-5 text-brand-700" />
                  <p className="mt-2 font-display text-base font-bold text-ink sm:text-lg">Verified</p>
                  <p className="mt-0.5 text-xs text-ink-muted">Handloom &amp; Khadi Standards</p>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Current Collection Grid */}
          <section className="mt-12 sm:mt-16">
            <ScrollReveal direction="up" delay={40}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-line pb-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Artisan Catalog</p>
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

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, idx) => (
                <ScrollReveal key={product.name} staggerIndex={idx} direction="up">
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-soft">
                    <div className="relative aspect-[4/3] overflow-hidden bg-sand-50/70 p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-106"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[0.6875rem] font-bold text-brand-900 shadow-2xs">
                          {product.tag}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="font-display text-base font-bold text-ink group-hover:text-brand-800 sm:text-lg">
                        {product.name}
                      </h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-muted sm:text-sm">
                        {product.description}
                      </p>

                      <div className="mt-4 border-t border-line/60 pt-3">
                        <p className="text-[0.6875rem] text-ink-subtle">
                          <span className="font-medium text-ink-muted">Availability: </span>
                          {product.leadTime}
                        </p>
                        <a
                          href={`mailto:bsgssindia@yahoo.co.in?subject=${encodeURIComponent(`BSGSS SHG Product Enquiry — ${product.name}`)}`}
                          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Request pricing &amp; sample</span>
                        </a>
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

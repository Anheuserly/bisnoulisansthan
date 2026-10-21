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
    name: "Shawls",
    tag: "Traditional Woolens",
    description:
      "Warm, handcrafted shawls available in a variety of colours and textures, showcasing traditional artisan craftsmanship.",
    image: "/images/bsgss/shg-products/Shawl_01.jpg",
    leadTime: "Crafted on Order & Ready Stock",
  },
  {
    name: "Woollen Stoles",
    tag: "Everyday Elegance",
    description:
      "Soft woollen stoles available in multiple colours, created by self-help group artisans.",
    image: "/images/bsgss/shg-products/Woollen_Stole_01.jpg",
    leadTime: "Available in Multiple Colours",
  },
  {
    name: "Woollen Shawls",
    tag: "Winter Collection",
    description:
      "Traditional woollen shawls combining warmth, comfort and skilled textile craftsmanship.",
    image: "/images/bsgss/shg-products/Woollen_Shawl_01.jpg",
    leadTime: "Crafted on Order & Ready Stock",
  },
  {
    name: "Woollen Mufflers",
    tag: "Winter Warmth",
    description:
      "Comfortable woollen mufflers featuring practical designs and traditional textile finishes.",
    image: "/images/bsgss/shg-products/Woollen_Muffler_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    name: "Silk Stoles",
    tag: "Artisan Accessories",
    description:
      "Decorative silk stoles featuring distinctive colours, patterns and traditional craftsmanship.",
    image: "/images/bsgss/shg-products/Silk_Stole_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    name: "Madhubani Cushion Covers",
    tag: "Ethnic Home Decor",
    description:
      "Decorative cushion covers featuring colourful Madhubani-inspired designs for traditional and contemporary interiors.",
    image: "/images/bsgss/shg-products/Madhubani_Cushion_Cover_01.jpg",
    leadTime: "Multiple Designs Available",
  },
  {
    name: "Bed Covers with Pillow Covers",
    tag: "Bedroom Collection",
    description:
      "Coordinated bed and pillow covers featuring traditional patterns and decorative textile details.",
    image: "/images/bsgss/shg-products/Bed_Cover_with_Pillow_Cover_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    name: "Pillow Covers",
    tag: "Textile Essentials",
    description:
      "Decorative pillow covers with colourful fabrics and traditional printed or woven patterns.",
    image: "/images/bsgss/shg-products/Pillow_Cover_01.jpg",
    leadTime: "Multiple Designs Available",
  },
  {
    name: "Table Runners",
    tag: "Dining & Table Decor",
    description:
      "Handcrafted table runners featuring intricate traditional patterns to enhance dining tables and living spaces.",
    image: "/images/bsgss/shg-products/Table_Runner_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    name: "Sets of Cushion Covers",
    tag: "Coordinated Home Decor",
    description:
      "Coordinated cushion cover sets with colourful decorative designs for living rooms and hospitality spaces.",
    image: "/images/bsgss/shg-products/Set_of_Cushion_Covers_01.jpg",
    leadTime: "Sets Available",
  },
  {
    name: "Madhubani Silk Sarees",
    tag: "Traditional Indian Wear",
    description:
      "Colourful silk sarees featuring Madhubani-inspired artwork and traditional decorative motifs.",
    image: "/images/bsgss/shg-products/Madhubani_Silk_Saree_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    name: "Hand-Painted Ties",
    tag: "Artisan Fashion",
    description:
      "Distinctive hand-painted ties featuring artistic patterns and colourful designs for a unique formal accessory.",
    image: "/images/bsgss/shg-products/Hand_painted_Tie_01.jpg",
    leadTime: "Multiple Designs Available",
  },
  {
    name: "Woollen Carpets",
    tag: "Artisan Floor Decor",
    description:
      "Decorative woollen carpets featuring intricate patterns and traditional textile styling.",
    image: "/images/bsgss/shg-products/Woollen_Carpet_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    name: "Madhubani Pen Holders",
    tag: "Handcrafted Desk Accessories",
    description:
      "Colourful handcrafted pen holders decorated with traditional Madhubani-inspired artwork for desks and workspaces.",
    image: "/images/bsgss/shg-products/Madhubani_Pen_Holder_01.jpg",
    leadTime: "Multiple Designs Available",
  },
  {
    name: "Madhubani Wall Hangings",
    tag: "Traditional Wall Art",
    description:
      "Decorative wall hangings showcasing vibrant folk-art styling and handcrafted artistic details.",
    image: "/images/bsgss/shg-products/Wall_Hanging_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    name: "Madhubani Trays",
    tag: "Artisan Serveware",
    description:
      "Decorative handcrafted trays featuring colourful artwork, suitable for serving and display.",
    image: "/images/bsgss/shg-products/Madhubani_Tray_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    name: "Madhubani Boxes",
    tag: "Decorative Storage",
    description:
      "Handcrafted decorative boxes featuring colourful Madhubani-inspired patterns for storing keepsakes and accessories.",
    image: "/images/bsgss/shg-products/Madhubani_Box_01.jpg",
    leadTime: "Multiple Designs Available",
  },
  {
    name: "Madhubani Jewellery Boxes",
    tag: "Artisan Gift Collection",
    description:
      "Decorative jewellery boxes featuring traditional artwork, designed for organising and presenting personal accessories.",
    image: "/images/bsgss/shg-products/Madhubani_Jewellery_Box_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    name: "Madhubani Tissue Boxes",
    tag: "Artistic Home Accessories",
    description:
      "Decorative tissue boxes with colourful handcrafted patterns that add a traditional artistic touch to interiors.",
    image: "/images/bsgss/shg-products/Madhubani_Tissue_Box_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    name: "Madhubani Coaster Sets",
    tag: "Table Accessories",
    description:
      "Artistic coaster sets featuring colourful folk-art motifs, ideal for dining tables, offices and gifting.",
    image: "/images/bsgss/shg-products/Madhubani_Coaster_Set_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    name: "Madhubani Paintings",
    tag: "Traditional Folk Art",
    description:
      "Decorative Madhubani paintings showcasing expressive folk-art motifs, vibrant colours and traditional artistic styles.",
    image: "/images/bsgss/shg-products/Madhubani_Painting_01.jpg",
    leadTime: "Multiple Artwork Designs Available",
  },
  {
    name: "Madhubani Wall Clocks",
    tag: "Functional Art",
    description:
      "Decorative wall clocks featuring colourful Madhubani-inspired artwork that combines everyday utility with artistic design.",
    image: "/images/bsgss/shg-products/Wall_Clock_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    name: "Madhubani Lampshades",
    tag: "Artistic Lighting",
    description:
      "Colourful decorative lampshades featuring traditional Madhubani-inspired patterns for distinctive interior styling.",
    image: "/images/bsgss/shg-products/Lampshade_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    name: "Ladies' Clutch Purses & Spectacles Cases",
    tag: "Handcrafted Accessories",
    description:
      "Coordinated handcrafted accessories featuring practical storage and refined finishes.",
    image:
      "/images/bsgss/shg-products/Ladies_Clutch_Purse_Spectacles_Case_01.jpg",
    leadTime: "Available in Multiple Designs",
  },
  {
    name: "Clutch Purses",
    tag: "Everyday Accessories",
    description:
      "Compact clutch purses featuring clean designs and practical storage for everyday essentials.",
    image: "/images/bsgss/shg-products/Clutch_Purse_01.jpg",
    leadTime: "Subject to Availability",
  },
  {
    name: "Spectacles Cases",
    tag: "Protective Accessories",
    description:
      "Compact spectacles cases designed to help protect eyewear while maintaining a simple, practical appearance.",
    image: "/images/bsgss/shg-products/Spectacles_Case_01.jpg",
    leadTime: "Subject to Availability",
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

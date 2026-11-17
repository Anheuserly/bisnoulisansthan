import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, HeartHandshake, Mail, MessageCircle, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProductInquiryButton } from "@/components/products/ProductInquiryButton";
import { SHG_PRODUCTS, getProductBySlug } from "@/config/shg-products";
import { SITE_URL } from "@/lib/site";
import { site } from "@/config/site";

export function generateStaticParams() {
  return SHG_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | BSGSS",
    };
  }

  const imageUrl = `${SITE_URL}${product.image}`;

  return {
    title: `${product.name} | BSGSS Women SHG Handcrafted Products`,
    description: `${product.description} Handcrafted by rural women artisans through Bisnouli Sarvodaya Gramodyog Sewa Sansthan.`,
    alternates: {
      canonical: `${SITE_URL}/activities/shg-products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} — Handcrafted SHG Product`,
      description: `${product.description} Handcrafted by rural women artisans through BSGSS.`,
      url: `${SITE_URL}/activities/shg-products/${product.slug}`,
      siteName: "Bisnouli Sarvodaya Gramodyog Sewa Sansthan",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — BSGSS Handcrafted Craft`,
      description: product.description,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const otherProducts = SHG_PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <PageHeader
        title={product.name}
        lead={`${product.tag} · Handcrafted by rural women self-help group artisans supported by BSGSS.`}
        crumbs={[
          { name: "Activities", path: "/activities" },
          { name: "SHG Products", path: "/activities/shg-products" },
          { name: product.name, path: `/activities/shg-products/${product.slug}` },
        ]}
      />

      <div className="pt-6 pb-16 sm:pt-10 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mb-6">
            <Link
              href="/activities/shg-products"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-850 hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all 26 Handcrafted Products</span>
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left: Big Featured Product Image */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="up" delay={40}>
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-sand-50/70 p-6 flex items-center justify-center shadow-xs">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-900 shadow-2xs border border-line/60">
                      {product.tag}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Product Narrative, Specs & Direct Order */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal direction="up" delay={80}>
                <div className="border-t-2 border-brand-850 pt-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
                    Handmade Rural Craft · Women Self-Help Groups
                  </span>
                  <h1 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                    {product.name}
                  </h1>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {product.description}
                  </p>

                  <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                      <ShieldCheck className="h-4 w-4 text-emerald-700" />
                      <span>100% Fair Community Proceeds</span>
                    </div>
                    <p className="text-xs text-emerald-950/80 leading-relaxed">
                      Every order directly supports rural women artisans in North India with fair compensation, self-reliance, and sustainable household livelihoods.
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-4 text-xs">
                    <div>
                      <span className="text-ink-muted">Availability / Lead:</span>
                      <p className="font-semibold text-ink mt-0.5">{product.leadTime}</p>
                    </div>
                    <div>
                      <span className="text-ink-muted">Origin &amp; Cluster:</span>
                      <p className="font-semibold text-ink mt-0.5">BSGSS Village SHG Centres</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
                    <ProductInquiryButton
                      productName={product.name}
                      productTag={product.tag}
                      productImage={product.image}
                      productSlug={product.slug}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-800 transition"
                    />

                    <a
                      href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-xs font-semibold text-ink hover:bg-sand-50 transition"
                    >
                      <Mail className="h-4 w-4 text-brand-800" />
                      <span>Call {site.contact.phone}</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16 sm:mt-20 border-t border-line pt-10">
            <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
              Other Handcrafted Collections
            </h2>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              {otherProducts.map((other) => (
                <Link
                  key={other.slug}
                  href={`/activities/shg-products/${other.slug}`}
                  className="group flex flex-col border-t-2 border-line pt-3 transition hover:border-brand-700"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-line/50 bg-sand-50/70 p-3 flex items-center justify-center">
                    <img
                      src={other.image}
                      alt={other.name}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-2 text-xs sm:text-sm font-bold text-ink group-hover:text-brand-800 line-clamp-1">
                    {other.name}
                  </h3>
                  <span className="text-[11px] text-brand-700 font-semibold mt-0.5">
                    View Product &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

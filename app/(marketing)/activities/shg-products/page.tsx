import type { Metadata } from "next";
import { HandHeart, Mail, ShoppingBag } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "SHG Products",
  description: "Handmade products created by women’s self-help groups supported by BSGSS.",
};

const products = [
  {
    name: "Handcrafted shawls",
    description: "A collection of handmade shawls created through women’s self-help groups, bringing warmth, craft and livelihood together.",
    image: "/images/bsgss/shg-products/shawl.png",
  },
  {
    name: "Handcrafted mufflers",
    description: "Handmade mufflers from the BSGSS self-help group product collection, supporting practical skills and women-led enterprise.",
    image: "/images/bsgss/shg-products/muffler.png",
  },
];

export default function ShgProductsPage() {
  return (
    <>
      <PageHeader
        title="SHG products"
        lead="Handmade products created through women’s self-help groups supported by BSGSS."
        crumbs={[
          { name: "Activities", path: "/activities" },
          { name: "SHG products", path: "/activities/shg-products" },
        ]}
      />
      <div className="pt-6 pb-14 sm:pt-8 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <section className="grid gap-6 rounded-2xl border border-brand-200/80 bg-gradient-to-br from-sand-50 to-brand-50/60 p-6 sm:p-8 md:grid-cols-[auto_1fr] shadow-2xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-700 shadow-2xs">
              <HandHeart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Women-led enterprise</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">Craft that supports livelihoods.</h2>
              <p className="mt-3 max-w-3xl text-xs leading-relaxed text-ink-muted sm:text-sm">
                BSGSS describes its SHG products as handmade items crafted by women&apos;s Self-Help Groups. The collection supports rural livelihoods, skill development and economic empowerment in Uttar Pradesh and Delhi.
              </p>
            </div>
          </section>

          <section className="mt-12 sm:mt-14">
            <div className="flex items-end justify-between gap-5 border-b border-line pb-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Current collection</p>
                <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">Made with care, connected to community.</h2>
              </div>
              <ShoppingBag className="h-6 w-6 text-brand-700" />
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {products.map((product) => (
                <article key={product.name} className="overflow-hidden rounded-2xl border border-line bg-white shadow-2xs transition hover:border-brand-300 hover:shadow-soft">
                  <div className="aspect-[5/3] bg-sand-50/70 p-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-display text-lg font-bold text-ink sm:text-xl">{product.name}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">{product.description}</p>
                    <a
                      href={`mailto:bsgssindia@yahoo.co.in?subject=${encodeURIComponent(`SHG product enquiry — ${product.name}`)}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:underline sm:text-sm"
                    >
                      <Mail className="h-4 w-4" /> Enquire with BSGSS
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

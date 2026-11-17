import { HelpCircle } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, type FaqItem } from "@/lib/seo";

interface FaqSectionProps {
  eyebrow?: string;
  heading?: string;
  items: readonly FaqItem[];
  className?: string;
}

/**
 * Renders a scannable Q&A section with matching Schema.org FAQPage JSON-LD
 * for Google "People Also Ask" rich results and AI/GEO citations.
 */
export function FaqSection({
  eyebrow = "Frequently Asked Questions",
  heading = "Quick answers for donors, CSR partners & supporters",
  items,
  className = "",
}: FaqSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={`border-t border-line pt-10 ${className}`}>
      <JsonLd data={faqJsonLd(items)} />

      <div className="mb-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
          <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{eyebrow}</span>
        </p>
        <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
          {heading}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-line bg-white p-5 shadow-2xs transition hover:border-brand-300"
            open
          >
            <summary className="cursor-pointer list-none font-display text-sm sm:text-base font-bold text-ink leading-snug">
              {item.question}
            </summary>
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

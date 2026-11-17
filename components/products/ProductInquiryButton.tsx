import { MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { SITE_URL } from "@/lib/site";

interface ProductInquiryButtonProps {
  productName: string;
  productTag?: string;
  productImage?: string;
  className?: string;
}

export function ProductInquiryButton({
  productName,
  productTag,
  productImage,
  className,
}: ProductInquiryButtonProps) {
  const rawNumber = site.contact.whatsapp || "919350507520";
  const phoneDigits = rawNumber.replace(/[^\d]/g, "") || "919350507520";

  const imageFullUrl = productImage
    ? productImage.startsWith("http")
      ? productImage
      : `${SITE_URL}${productImage}`
    : "";

  const messageLines = [
    `Namaste BSGSS, I would like to inquire about this handcrafted SHG product:`,
    ``,
    `🛍️ Product: *${productName}*${productTag ? ` (${productTag})` : ""}`,
    imageFullUrl ? `📷 Photo Reference: ${imageFullUrl}` : "",
    `🔗 Catalogue Link: ${SITE_URL}/activities/shg-products`,
    ``,
    `Please share pricing, fabric details, and sample/bulk ordering options. Thank you!`,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappHref = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(messageLines)}`;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ||
        "inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline transition text-left"
      }
      aria-label={`Inquire about ${productName} directly on WhatsApp`}
    >
      <MessageCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
      <span>Request pricing &amp; sample</span>
    </a>
  );
}

"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { SITE_URL } from "@/lib/site";
import { slugifyProduct } from "@/config/shg-products";

interface ProductInquiryButtonProps {
  productName: string;
  productTag?: string;
  productImage?: string;
  productSlug?: string;
  className?: string;
}

export function ProductInquiryButton({
  productName,
  productTag,
  productImage,
  productSlug,
  className,
}: ProductInquiryButtonProps) {
  const [origin, setOrigin] = useState<string>(SITE_URL);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location?.origin) {
      setOrigin(window.location.origin);
    }
  }, []);

  const rawNumber = site.contact.whatsapp || "919350507520";
  const phoneDigits = rawNumber.replace(/[^\d]/g, "") || "919350507520";

  // Use provided slug or derive slug from product name
  const slug = productSlug || slugifyProduct(productName);
  const productPageUrl = `${origin}/activities/shg-products/${slug}`;

  const imageFullUrl = productImage
    ? productImage.startsWith("http")
      ? productImage
      : `${origin}${productImage}`
    : "";

  // The product page URL is placed on the first line so WhatsApp unfurls
  // the OpenGraph image preview card immediately in the chat.
  // Standard text formatting is used without multi-byte emojis to prevent  encoding corruption.
  const messageLines = [
    productPageUrl,
    "",
    "Namaste BSGSS Team, I would like to inquire about this handcrafted SHG product:",
    `*Product:* ${productName}${productTag ? ` (${productTag})` : ""}`,
    imageFullUrl ? `*Photo Reference:* ${imageFullUrl}` : "",
    "",
    "Please share pricing, fabric details, and sample/bulk ordering options. Thank you!",
  ]
    .filter((line) => line !== null && line !== undefined)
    .join("\n");

  const whatsappHref = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(messageLines)}`;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ||
        "inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline transition text-left cursor-pointer"
      }
      aria-label={`Inquire about ${productName} directly on WhatsApp`}
    >
      <MessageCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
      <span>Request pricing &amp; sample</span>
    </a>
  );
}

"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { ProductInquiryModal } from "./ProductInquiryModal";

interface ProductInquiryButtonProps {
  productName: string;
}

export function ProductInquiryButton({ productName }: ProductInquiryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline cursor-pointer transition text-left"
        aria-label={`Request pricing and sample for ${productName}`}
      >
        <Mail className="h-3.5 w-3.5" />
        <span>Request pricing &amp; sample</span>
      </button>

      {isOpen && (
        <ProductInquiryModal
          productName={productName}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

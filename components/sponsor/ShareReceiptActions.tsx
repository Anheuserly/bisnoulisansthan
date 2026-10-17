"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle, Share2 } from "lucide-react";

interface ShareReceiptActionsProps {
  url: string;
  shareText: string;
}

export function ShareReceiptActions({ url, shareText }: ShareReceiptActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText}\n\n${url}`
  )}`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* WhatsApp Share Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-[#1EBE5D] active:scale-95"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span>Share on WhatsApp</span>
      </a>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-xs font-semibold text-ink shadow-2xs transition hover:bg-sand-50 active:scale-95"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            <span className="text-emerald-700">Link Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 text-ink-muted" aria-hidden="true" />
            <span>Copy Receipt Link</span>
          </>
        )}
      </button>
    </div>
  );
}

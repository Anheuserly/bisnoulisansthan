"use client";

import { useState } from "react";
import { Check, Copy, Download, Printer } from "lucide-react";

export function CertificateActions({
  certificateNumber,
  donorName,
}: {
  certificateNumber: string;
  donorName: string;
}) {
  const [copied, setCopied] = useState(false);

  function triggerDownload() {
    const originalTitle = document.title;
    // Set a clean document title so when "Save as PDF" is selected, the default filename is clean
    document.title = `BSGSS-Donation-Certificate-${certificateNumber}-${donorName.replace(/[^a-zA-Z0-9]/g, "_")}`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1500);
  }

  function copyLink() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5 print:hidden">
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink transition hover:bg-sand-50 shadow-2xs"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            Copied Link
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 text-ink-muted" />
            Share / Copy Link
          </>
        )}
      </button>

      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 rounded-lg border border-brand-300 bg-white px-4 py-2 text-xs font-semibold text-brand-800 transition hover:bg-brand-50 shadow-2xs"
      >
        <Printer className="h-3.5 w-3.5 text-brand-700" />
        Print
      </button>

      <button
        type="button"
        onClick={triggerDownload}
        className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2 text-xs font-semibold text-white transition hover:bg-brand-800 shadow-xs"
      >
        <Download className="h-4 w-4" />
        Download / Save as PDF
      </button>
    </div>
  );
}

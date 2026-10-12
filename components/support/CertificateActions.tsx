"use client";

import { useState } from "react";
import { Check, Copy, Download, Loader2, Printer } from "lucide-react";

export function CertificateActions({
  certificateNumber,
  donorName,
  targetId = "donation-certificate",
}: {
  certificateNumber: string;
  donorName: string;
  targetId?: string;
}) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function downloadPdfDirect() {
    if (downloading) return;
    setDownloading(true);

    try {
      const target = document.getElementById(targetId);
      if (!target) {
        window.print();
        setDownloading(false);
        return;
      }

      // Dynamic import to keep initial bundle light
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      // Capture high-resolution raster from DOM element
      const canvas = await html2canvas(target, {
        scale: 2.5, // 250+ DPI equivalent for crisp text and seal vectors
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
      });

      const imgData = canvas.toDataURL("image/png", 1.0);

      // Create A4 Landscape PDF (297mm x 210mm)
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pageWidth = 297;
      const pageHeight = 210;
      const margin = 8; // 8mm margin
      const printableWidth = pageWidth - margin * 2; // 281mm
      const printableHeight = pageHeight - margin * 2; // 194mm

      const imgWidth = printableWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Center vertically if height is within printable area
      const yPos =
        imgHeight < printableHeight
          ? margin + (printableHeight - imgHeight) / 2
          : margin;

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        yPos,
        imgWidth,
        Math.min(imgHeight, printableHeight)
      );

      const safeDonor = donorName
        ? donorName.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 25)
        : "Donor";
      const fileName = `BSGSS-Donation-Certificate-${certificateNumber}-${safeDonor}.pdf`;

      pdf.save(fileName);
    } catch (err) {
      console.error("Direct PDF generation error:", err);
      // Seamless fallback to browser native print
      window.print();
    } finally {
      setDownloading(false);
    }
  }

  function handlePrint() {
    const originalTitle = document.title;
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
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 rounded-lg border border-brand-300 bg-white px-4 py-2 text-xs font-semibold text-brand-800 transition hover:bg-brand-50 shadow-2xs"
      >
        <Printer className="h-3.5 w-3.5 text-brand-700" />
        Print
      </button>

      <button
        type="button"
        onClick={downloadPdfDirect}
        disabled={downloading}
        className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2 text-xs font-semibold text-white transition hover:bg-brand-800 shadow-xs disabled:opacity-75 disabled:cursor-wait"
      >
        {downloading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Download PDF
          </>
        )}
      </button>
    </div>
  );
}

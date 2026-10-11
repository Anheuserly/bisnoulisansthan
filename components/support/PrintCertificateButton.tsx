"use client";

import { Printer } from "lucide-react";

export function PrintCertificateButton() {
  return <button onClick={() => window.print()} className="print:hidden inline-flex items-center gap-2 rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800"><Printer className="h-4 w-4" />Print certificate</button>;
}

"use client";

import { useState } from "react";
import { Check, Copy, Landmark } from "lucide-react";

interface BankDetailsCardProps {
  bankTitle: string;
  bankName: string;
  branchName: string;
  accountName: string;
  accountNumber: string;
  accountType: string;
  ifsc: string;
}

export function BankDetailsCard({
  bankTitle,
  bankName,
  branchName,
  accountName,
  accountNumber,
  accountType,
  ifsc,
}: BankDetailsCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-brand-200/90 bg-white shadow-2xs">
      <div className="flex items-center justify-between border-b border-brand-100 bg-sand-50/90 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <Landmark className="h-4 w-4 text-brand-700" />
          <h3 className="font-display text-sm font-bold text-ink sm:text-base">
            {bankTitle}
          </h3>
        </div>
        <span className="rounded-full bg-brand-100/60 px-2.5 py-0.5 text-[11px] font-semibold text-brand-800">
          Official Account
        </span>
      </div>

      <dl className="text-xs sm:text-sm divide-y divide-line">
        <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:px-5 sm:py-3.5 items-center">
          <dt className="font-semibold text-ink">Bank Name</dt>
          <dd className="font-medium text-ink-muted">{bankName}</dd>
        </div>

        <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:px-5 sm:py-3.5 items-center">
          <dt className="font-semibold text-ink">Branch Name</dt>
          <dd className="text-ink-muted">{branchName}</dd>
        </div>

        <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:px-5 sm:py-3.5 items-center">
          <dt className="font-semibold text-ink">Account Name</dt>
          <dd className="font-medium text-ink">{accountName}</dd>
        </div>

        <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:px-5 sm:py-3.5 items-center">
          <dt className="font-semibold text-ink">Account Number</dt>
          <dd className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm font-bold tracking-wider text-brand-900">
              {accountNumber}
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(accountNumber, "accountNumber")}
              className="inline-flex items-center gap-1 rounded-md border border-line bg-sand-50/70 px-2.5 py-1 text-[11px] font-semibold text-brand-700 hover:bg-white hover:border-brand-500 transition"
              title="Copy account number"
            >
              {copiedField === "accountNumber" ? (
                <>
                  <Check className="h-3 w-3 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </dd>
        </div>

        <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:px-5 sm:py-3.5 items-center">
          <dt className="font-semibold text-ink">Account Type</dt>
          <dd className="text-ink-muted">{accountType}</dd>
        </div>

        <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:px-5 sm:py-3.5 items-center">
          <dt className="font-semibold text-ink">IFSC Code</dt>
          <dd className="flex items-center justify-between gap-2">
            <span className="font-mono text-sm font-bold tracking-wider text-brand-900">
              {ifsc}
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(ifsc, "ifsc")}
              className="inline-flex items-center gap-1 rounded-md border border-line bg-sand-50/70 px-2.5 py-1 text-[11px] font-semibold text-brand-700 hover:bg-white hover:border-brand-500 transition"
              title="Copy IFSC code"
            >
              {copiedField === "ifsc" ? (
                <>
                  <Check className="h-3 w-3 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </dd>
        </div>
      </dl>
    </div>
  );
}

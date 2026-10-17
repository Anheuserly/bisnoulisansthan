"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, Home, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime error in development / telemetry
    console.error("Runtime application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-800">
          <AlertCircle className="h-3.5 w-3.5 text-red-600" />
          <span>Error 500 · System Exception</span>
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          An unexpected error occurred while processing your request. Please try reloading the page or return to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow-soft transition hover:bg-brand-800 sm:text-sm"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-xs font-semibold text-brand-700 shadow-2xs transition hover:bg-sand-50 sm:text-sm"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

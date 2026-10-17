import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sand-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-800">
          Error 404 · Page Not Found
        </span>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
          The page or statutory record you are searching for may have been moved, renamed, or is currently unavailable.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow-soft transition hover:bg-brand-800 sm:text-sm"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-xs font-semibold text-brand-700 shadow-2xs transition hover:bg-sand-50 sm:text-sm"
          >
            <Search className="h-4 w-4" />
            <span>Contact Secretariat</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

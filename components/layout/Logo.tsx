import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function Logo({ inverted = false, compact = false }: { inverted?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3 rounded-lg py-1" aria-label="BSGSS — Home">
      {/* Source asset imported from the current BSGSS website. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/bsgss/branding/581-logo-4.png" alt="BSGSS" className="h-11 w-11 shrink-0 rounded-full bg-white object-contain" />
      <span className="flex max-w-[12rem] flex-col leading-tight">
        <span className={cn("font-display text-[1.05rem] font-bold tracking-tight", inverted ? "text-white" : "text-ink")}>BSGSS</span>
        {!compact && <span className={cn("text-[0.58rem] font-semibold uppercase tracking-[0.13em]", inverted ? "text-brand-200" : "text-brand-600")}>Sarvodaya Gramodyog</span>}
      </span>
    </Link>
  );
}

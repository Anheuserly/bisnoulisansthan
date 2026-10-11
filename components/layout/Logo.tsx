import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center rounded-lg py-1", inverted && "rounded-md bg-white px-3")} aria-label="BSGSS — Home">
      {/* Official BSGSS horizontal logo supplied by the organisation. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/bsgss/branding/581-logo-4.png" alt="Bisnouli Sarvodaya Gramodyog Sewa Sansthan" className={cn("h-auto object-contain", inverted ? "w-[12.5rem] sm:w-[14rem]" : "w-[11rem] sm:w-[15rem] xl:w-[24rem]")} />
    </Link>
  );
}

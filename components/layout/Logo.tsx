import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center rounded-lg py-1 transition-all duration-200",
        inverted && "rounded-2xl bg-white px-5 py-3 sm:px-6 sm:py-3.5 shadow-sm hover:shadow-md hover:bg-sand-50"
      )}
      aria-label="BSGSS — Home"
    >
      {/* Official BSGSS horizontal logo supplied by the organisation. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/bsgss/branding/581-logo-4.png"
        alt="Bisnouli Sarvodaya Gramodyog Sewa Sansthan"
        className={cn(
          "h-auto object-contain transition duration-200",
          inverted
            ? "w-[22rem] sm:w-[26rem] md:w-[30rem] max-w-full"
            : "w-[11rem] sm:w-[14rem] md:w-[16rem] xl:w-[20rem]"
        )}
      />
    </Link>
  );
}

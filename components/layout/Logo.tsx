import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function Logo({
  inverted = false,
  size = "default",
}: {
  inverted?: boolean;
  size?: "default" | "large" | "xlarge";
}) {
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
            ? size === "xlarge"
              ? "w-[26rem] sm:w-[32rem] md:w-[38rem] max-w-full"
              : "w-[24rem] sm:w-[28rem] md:w-[32rem] max-w-full"
            : size === "large"
            ? "w-[15rem] sm:w-[18rem] md:w-[21rem] xl:w-[24rem]"
            : size === "xlarge"
            ? "w-[17rem] sm:w-[20rem] md:w-[24rem] xl:w-[28rem]"
            : "w-[13.5rem] sm:w-[16.5rem] md:w-[19rem] xl:w-[22.5rem]"
        )}
      />
    </Link>
  );
}

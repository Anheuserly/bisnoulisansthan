import Image from "next/image";
import Link from "next/link";
import type { Partner } from "./partners-data";

export function PartnerLogoCard({ partner }: { partner: Partner }) {
  const content = (
    <>
      <Image
        src={partner.logo}
        alt={partner.alt}
        fill
        sizes="(min-width: 1280px) 15vw, (min-width: 768px) 25vw, 40vw"
        className="object-contain p-4 sm:p-5 transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <span className="sr-only">Read the {partner.name} partnership story</span>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </>
  );

  const className =
    "group relative block h-[6.5rem] sm:h-[7.5rem] overflow-hidden rounded-xl bg-white/95 border border-brand-100/80 shadow-[0_4px_20px_rgba(20,40,45,0.06)] transition-all duration-300 hover:z-20 hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_12px_30px_rgba(20,40,45,0.14)] hover:bg-white backdrop-blur-sm";

  return (
    <Link href={partner.href} className={className} aria-label={`Read the ${partner.name} partnership story`}>
      {content}
    </Link>
  );
}

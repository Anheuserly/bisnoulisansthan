import Image from "next/image";
import Link from "next/link";
import type { Partner } from "./partners-data";

export function PartnerLogoCard({ partner }: { partner: Partner }) {
  const content = <><Image src={partner.logo} alt={partner.alt} fill sizes="(min-width: 1280px) 15vw, (min-width: 768px) 27vw, 42vw" className="object-contain p-5 transition duration-300 group-hover:scale-[1.04]" /><span className="sr-only">Read the {partner.name} partnership story</span></>;
  const className = "group relative block h-[6.5rem] overflow-hidden rounded-lg bg-white/95 shadow-[0_2px_10px_rgba(10,48,56,.08)] ring-1 ring-brand-900/[.06] transition duration-300 hover:bg-white hover:shadow-[0_8px_22px_rgba(10,48,56,.14)] md:h-[7.25rem]";
  return <Link href={partner.href} className={className} aria-label={`Read the ${partner.name} partnership story`}>{content}</Link>;
}

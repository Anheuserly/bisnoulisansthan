"use client";

import { useEffect, useState } from "react";
import { PartnerColumn } from "./PartnerColumn";
import { distributePartners, partners } from "./partners-data";
import { PartnerLogoCard } from "./PartnerLogoCard";

const columnConfig = [
  { direction: "up" as const, duration: 28 }, { direction: "down" as const, duration: 34 }, { direction: "up" as const, duration: 25 }, { direction: "down" as const, duration: 31 }, { direction: "up" as const, duration: 37 },
];

export function PartnerLogoWall({ pauseOnHover = true }: { pauseOnHover?: boolean }) {
  const [columns, setColumns] = useState(5);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReducedMotion(motion.matches); setColumns(window.innerWidth >= 1280 ? 5 : window.innerWidth >= 768 ? 3 : 2); };
    update();
    motion.addEventListener("change", update); window.addEventListener("resize", update);
    return () => { motion.removeEventListener("change", update); window.removeEventListener("resize", update); };
  }, []);
  if (reducedMotion) return <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">{partners.map((partner) => <PartnerLogoCard key={partner.id} partner={partner} />)}</div>;
  return <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">{distributePartners(partners, columns).map((items, index) => <PartnerColumn key={`${columns}-${index}`} partners={items} {...columnConfig[index]!} pauseOnHover={pauseOnHover} />)}</div>;
}

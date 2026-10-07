"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Partner } from "./partners-data";
import { PartnerLogoCard } from "./PartnerLogoCard";

export function PartnerColumn({ partners, direction, duration, pauseOnHover = true }: { partners: Partner[]; direction: "up" | "down"; duration: number; pauseOnHover?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;
    const context = gsap.context(() => {
      const animate = () => {
        tweenRef.current?.kill();
        const distance = set.offsetHeight + 12;
        gsap.set(track, { y: direction === "down" ? -distance : 0 });
        tweenRef.current = gsap.to(track, { y: direction === "down" ? 0 : -distance, duration, ease: "none", repeat: -1 });
      };
      animate();
      const observer = new ResizeObserver(animate);
      observer.observe(set);
      return () => observer.disconnect();
    }, track);
    return () => { tweenRef.current?.kill(); context.revert(); };
  }, [direction, duration, partners]);

  return <div className="partners-column-mask h-[28rem] overflow-hidden sm:h-[32rem] md:h-[34rem]" onMouseEnter={() => pauseOnHover && tweenRef.current?.pause()} onMouseLeave={() => pauseOnHover && tweenRef.current?.resume()}>
    <div ref={trackRef} className="will-change-transform">
      <div ref={setRef} className="grid gap-3">{partners.map((partner) => <PartnerLogoCard key={partner.id} partner={partner} />)}</div>
      <div aria-hidden="true" className="mt-3 grid gap-3">{partners.map((partner) => <PartnerLogoCard key={`${partner.id}-duplicate`} partner={partner} />)}</div>
    </div>
  </div>;
}

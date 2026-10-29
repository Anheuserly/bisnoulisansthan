interface CertificateSealProps {
  sealTitle?: string;
  sealEstd?: string;
  sealRegNo?: string;
  sealBadges?: string;
  stampUrl?: string;
  showDefaultSealSvg?: boolean;
  colorClass?: string;
}

export function CertificateSeal({
  sealTitle = "BISNOULI SARVODAYA GRAMODYOG SEWA SANSTHAN",
  sealEstd = "ESTD. 1994",
  sealRegNo = "REGD. S-26792",
  sealBadges = "★ 80G / 12A ★",
  stampUrl,
  showDefaultSealSvg = true,
  colorClass = "text-brand-800",
}: CertificateSealProps) {
  if (stampUrl && stampUrl.trim()) {
    return (
      <div className="relative inline-flex items-center justify-center" aria-label="Official Organization Stamp">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={stampUrl}
          alt="Official Stamp"
          className="h-20 w-20 sm:h-24 sm:w-24 object-contain drop-shadow-2xs select-none"
        />
      </div>
    );
  }

  if (showDefaultSealSvg === false) {
    return null;
  }

  // Ensure title ends with bullet for circle
  const circularText = sealTitle.endsWith("•") ? sealTitle : `${sealTitle} •`;

  return (
    <div className="relative inline-flex items-center justify-center" aria-label="Official BSGSS Seal">
      <svg
        viewBox="0 0 160 160"
        className={`h-24 w-24 sm:h-28 sm:w-28 drop-shadow-2xs select-none ${colorClass}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Sawtooth / Rosette Rim */}
        <circle cx="80" cy="80" r="76" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="80" cy="80" r="54" stroke="currentColor" strokeWidth="1.2" />

        {/* Circular Text Path */}
        <path
          id="seal-text-path"
          d="M 80,80 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
          fill="none"
        />
        <text className="text-[7.2px] font-bold tracking-[0.2em] uppercase fill-current" textAnchor="middle">
          <textPath href="#seal-text-path" startOffset="50%">
            {circularText}
          </textPath>
        </text>

        {/* Center Emblem Details */}
        <g stroke="currentColor" fill="none" strokeWidth="1.2">
          {/* Central Circle */}
          <circle cx="80" cy="80" r="28" fill="#F0F8F8" stroke="currentColor" strokeWidth="1" />
          <path
            d="M 80 62 L 82.5 73 L 94 73 L 84.5 79.5 L 88 90 L 80 84 L 72 90 L 75.5 79.5 L 66 73 L 77.5 73 Z"
            fill="currentColor"
            opacity="0.85"
          />
        </g>

        {/* Inner Text Labels */}
        <text x="80" y="99" textAnchor="middle" className="text-[6.2px] font-black uppercase tracking-wider fill-current">
          {sealEstd}
        </text>
        <text x="80" y="106" textAnchor="middle" className="text-[5.2px] font-bold uppercase tracking-widest fill-current opacity-90">
          {sealRegNo}
        </text>
        <text x="80" y="113" textAnchor="middle" className="text-[4.8px] font-semibold tracking-wider fill-current opacity-95">
          {sealBadges}
        </text>
      </svg>
    </div>
  );
}

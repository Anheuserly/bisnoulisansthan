interface CertificateSignatureProps {
  name?: string;
  role?: string;
  organization?: string;
  signatureUrl?: string;
  showDefaultSignatureSvg?: boolean;
  accentColorClass?: string;
}

export function CertificateSignature({
  name = "Nandita Bakshi",
  role = "Chief Executive Officer (CEO)",
  organization = "Bisnouli Sarvodaya Gramodyog Sewa Sansthan",
  signatureUrl,
  showDefaultSignatureSvg = true,
  accentColorClass = "text-brand-850",
}: CertificateSignatureProps) {
  return (
    <div className="inline-block text-center select-none" aria-label={`Authorized Signature of ${name}`}>
      {/* If custom uploaded/linked signature image is provided, render it */}
      {signatureUrl && signatureUrl.trim() ? (
        <div className="h-12 w-auto mx-auto flex items-end justify-center mb-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={signatureUrl}
            alt={`Signature of ${name}`}
            className="max-h-12 max-w-[200px] object-contain"
          />
        </div>
      ) : showDefaultSignatureSvg !== false ? (
        /* Authentic Blue-Ink Cursive Signature SVG */
        <svg
          viewBox="0 0 200 65"
          className="h-11 sm:h-12 w-auto mx-auto -mb-1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Cursive Strokes with Ink Pen Fluidity */}
          <path
            d="M 25 45 C 30 20, 38 12, 45 25 C 52 40, 58 48, 65 32 C 70 22, 75 28, 80 40 C 85 52, 92 48, 98 34 C 105 18, 115 15, 122 30 C 128 45, 135 48, 145 35 C 152 24, 160 28, 168 38 C 172 44, 180 32, 188 28"
            stroke="#1E3A8A"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Flourish loop and cross */}
          <path
            d="M 40 18 Q 55 48 75 52 Q 110 56 175 42"
            stroke="#1E3A8A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 95 24 Q 108 30 135 22"
            stroke="#1E3A8A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <div className="h-11 sm:h-12 w-auto mx-auto" />
      )}

      {/* Signature Underline */}
      <div className="h-[1.5px] w-48 sm:w-56 bg-brand-850 mx-auto" />

      {/* Signatory Full Name */}
      <p className="mt-1 font-serif text-xs sm:text-[13px] font-bold text-ink tracking-tight">
        {name}
      </p>

      {/* Signatory Designation */}
      <p className={`text-[10px] font-semibold leading-tight ${accentColorClass}`}>
        Authorized Signatory · {role}
      </p>

      {/* Organization */}
      <p className="text-[8.5px] sm:text-[9px] text-ink-muted leading-tight font-medium">
        {organization}
      </p>
    </div>
  );
}

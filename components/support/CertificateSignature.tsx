export function CertificateSignature() {
  return (
    <div className="inline-block text-center select-none" aria-label="Authorized Signatory Signature">
      {/* Authentic Blue-Ink Cursive Signature SVG */}
      <svg
        viewBox="0 0 200 65"
        className="h-12 sm:h-14 w-auto mx-auto -mb-2"
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

      {/* Signature Underline */}
      <div className="h-[1.5px] w-48 sm:w-56 bg-brand-850 mx-auto" />

      {/* Signatory Title */}
      <p className="mt-1 text-xs font-bold text-ink tracking-tight">
        Authorized Signatory
      </p>
      <p className="text-[10px] text-ink-muted leading-tight font-medium">
        Bisnouli Sarvodaya Gramodyog Sewa Sansthan
      </p>
    </div>
  );
}

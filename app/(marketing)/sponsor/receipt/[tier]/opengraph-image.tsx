import { ImageResponse } from "next/og";
import { getSponsorTierById } from "@/lib/sponsor-tiers";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ tier: string }>;
}) {
  const { tier: tierId } = await params;
  const tier = getSponsorTierById(tierId);

  const title = tier?.title || "Vocational Skill Sponsorship";
  const amount = tier?.amount ? "₹" + tier.amount.toLocaleString("en-IN") : "₹300";
  const outcome = tier?.outcome || "Vocational Training";
  const statement = `You funded ${outcome} of certified vocational tailoring instruction and materials for rural women in Uttar Pradesh.`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#FDFBF7",
          backgroundImage: "radial-gradient(circle at 100% 0%, #E6F0F2 0%, #FDFBF7 60%)",
          fontFamily: "sans-serif",
          border: "16px solid #0E414A",
          boxSizing: "border-box",
        }}
      >
        {/* Top Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#0E414A",
                letterSpacing: "1px",
              }}
            >
              BISNOULI SARVODAYA GRAMODYOG SEWA SANSTHAN
            </span>
            <span style={{ fontSize: "15px", color: "#6B7280", marginTop: "4px" }}>
              Rural Empowerment &amp; Women&apos;s Vocational Guilds Since 1994
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              backgroundColor: "#E6F0F2",
              borderRadius: "50px",
              border: "2px solid #0E414A",
              color: "#0E414A",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            OFFICIAL IMPACT RECEIPT
          </div>
        </div>

        {/* Center Card Body */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid #E5E7EB",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: "38px", fontWeight: "bold", color: "#111827" }}>
              {title}
            </span>
            <span style={{ fontSize: "44px", fontWeight: "bold", color: "#0E414A" }}>
              {amount}
            </span>
          </div>

          <p
            style={{
              fontSize: "22px",
              lineHeight: 1.5,
              color: "#374151",
              marginTop: "20px",
            }}
          >
            {statement}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #E5E7EB",
            paddingTop: "20px",
          }}
        >
          <span style={{ fontSize: "16px", color: "#4B5563", fontWeight: "bold" }}>
            bisnoulisansthan.in • Registered NGO (12A / 80G Certified)
          </span>
          <span style={{ fontSize: "14px", color: "#6B7280" }}>
            Verified Community Development In Action
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

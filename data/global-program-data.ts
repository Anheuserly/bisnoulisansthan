export interface GlobalRegion {
  id: string;
  name: string;
  flag: string;
  subtitle: string;
  category: string;
  countryCodes: string[];
  hub: {
    city: string;
    x: number;
    y: number;
  };
  metrics: {
    label: string;
    value: string | number;
  }[];
  description: string;
  focusAreas: string[];
  keyPartners: string[];
  sdgAlignments: string[];
}

export const GLOBAL_REGIONS: GlobalRegion[] = [
  {
    id: "india",
    name: "India (National Grassroots Headquarters)",
    flag: "🇮🇳",
    subtitle: "Active Operations Across 7 States & 350+ Villages",
    category: "Verified Field Execution Base",
    countryCodes: ["in"],
    hub: {
      city: "New Delhi & Uttar Pradesh",
      x: 707,
      y: 400,
    },
    metrics: [
      { label: "States Covered", value: "7 STATES COVERED" },
      { label: "Active Districts", value: "6 ACTIVE DISTRICTS" },
      { label: "Village Networks", value: "350+ Panchayats" },
      { label: "CSR PSU Partners", value: "35 CSR PSU Partners" },
    ],
    description:
      "Statutory headquarters registered under Society Act XXI of 1860 with 12A, 80G, and MCA CSR-1 certifications. Deep field deployment across Uttar Pradesh, Delhi NCR, Haryana, Punjab, Chhattisgarh, Rajasthan, and Uttarakhand, operating mobile oncology screening clinics, women self-help tailoring guilds, and potable water purification plants.",
    focusAreas: [
      "Preventive Oncology & Mobile Medical Screening Vans",
      "Women Self-Help Vocational Tailoring & Apparel Guilds",
      "Decentralized Potable Water Purification Plants (Water ATMs)",
      "Remedial Education, Computer Literacy & Youth Skills",
    ],
    keyPartners: [
      "RITES Limited",
      "IRCON International",
      "REC Foundation",
      "NTPC Limited",
      "GAIL & BPCL",
    ],
    sdgAlignments: [
      "SDG 1: No Poverty",
      "SDG 3: Good Health & Well-being",
      "SDG 5: Gender Equality",
      "SDG 6: Clean Water & Sanitation",
    ],
  },
];

export const GLOBAL_SUMMARY_TOTALS = {
  verifiedStates: 7,
  verifiedDistricts: 20,
  villagesMobilized: "350+",
  statutoryPartners: "35",
  targetGlobalHubs: 1,
};

export function getGlobalRegion(idOrCode: string): GlobalRegion {
  const query = idOrCode.toLowerCase().trim();
  const found = GLOBAL_REGIONS.find(
    (reg) =>
      reg.id === query ||
      reg.countryCodes.includes(query) ||
      reg.name.toLowerCase().includes(query)
  );
  return found ?? GLOBAL_REGIONS[0]!;
}

export function getRegionForCountryCode(code: string): GlobalRegion | undefined {
  const clean = code.toLowerCase().trim();
  return GLOBAL_REGIONS.find((reg) => reg.countryCodes.includes(clean));
}

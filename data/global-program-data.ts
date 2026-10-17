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
    name: "India (Global Grassroots Headquarters)",
    flag: "🇮🇳",
    subtitle: "National Operational Base & 350+ Village Network",
    category: "Headquarters & Field Guilds",
    countryCodes: ["in"],
    hub: {
      city: "New Delhi & Uttar Pradesh",
      x: 707,
      y: 400,
    },
    metrics: [
      { label: "Villages Mobilized", value: "350+" },
      { label: "Lives Empowered", value: "50,000+" },
      { label: "Cancer Screenings", value: "30,000+" },
      { label: "Certified Artisans", value: "5,000+" },
    ],
    description:
      "Operational headquarters in Delhi NCR and Bisnouli Village, Dadri. Serving as the primary execution engine for mobile diagnostic oncology clinics, women's self-help tailoring guilds, remedial education, and village potable water infrastructure under 12A, 80G, and MCA CSR-1 statutory compliance.",
    focusAreas: [
      "Preventive Cancer Screening & Diagnostic Vans",
      "Women Self-Help Vocational Tailoring Guilds",
      "Decentralized Potable Water Purification Plants",
      "Remedial Education & Computer Literacy Centres",
    ],
    keyPartners: [
      "RITES Limited",
      "IRCON International",
      "REC Foundation",
      "NTPC",
      "BHEL",
    ],
    sdgAlignments: [
      "SDG 1: No Poverty",
      "SDG 3: Good Health & Well-being",
      "SDG 5: Gender Equality",
      "SDG 6: Clean Water & Sanitation",
    ],
  },
  {
    id: "north-america",
    name: "United States & Canada",
    flag: "🇺🇸",
    subtitle: "North American Philanthropic & Tech Alliances",
    category: "Diaspora Philanthropy & Grants",
    countryCodes: ["us", "ca"],
    hub: {
      city: "New York & Silicon Valley",
      x: 265,
      y: 295,
    },
    metrics: [
      { label: "Diaspora Donors", value: "3,500+" },
      { label: "Cross-Border Grants", value: "5 Alliances" },
      { label: "Diagnostic Equipment", value: "Supplied" },
      { label: "Tele-Health Support", value: "Active" },
    ],
    description:
      "Collaborating with Non-Resident Indian (NRI) associations, philanthropic donors, and technology-for-good foundations across North America. Supporting specialized cancer screening instrumentation, medical software diagnostics, and child education sponsorships.",
    focusAreas: [
      "Cross-Border Diagnostic Medical Equipment Grants",
      "Non-Resident Indian (NRI) Community Giving",
      "Tele-Consultation Technology Alliances",
      "Child Scholarship & Digital Learning Kits",
    ],
    keyPartners: [
      "North American Indian Philanthropy Network",
      "Global Health Diagnostics Foundation",
      "Tech-For-Good Collaborative",
    ],
    sdgAlignments: [
      "SDG 3: Good Health & Well-being",
      "SDG 4: Quality Education",
      "SDG 17: Partnerships for the Goals",
    ],
  },
  {
    id: "europe",
    name: "United Kingdom & European Union",
    flag: "🇬🇧",
    subtitle: "UN Multilateral Engagement & Heritage Textile Forums",
    category: "Multilateral Alliances & Fair Trade",
    countryCodes: ["gb", "de", "fr", "ch", "nl"],
    hub: {
      city: "London & Geneva",
      x: 466,
      y: 274,
    },
    metrics: [
      { label: "UN SDGs Targeted", value: "5 Goals" },
      { label: "Academic Studies", value: "8 Published" },
      { label: "Fair Trade Recognition", value: "Certified" },
      { label: "European Diaspora", value: "Active" },
    ],
    description:
      "Engaging with United Nations Sustainable Development Goal (SDG) consultative dialogues in Geneva and fair-trade handicraft networks in London. Showcasing authentic rural Indian khadi, handloom shawls, and sustainable village crafts on international platforms.",
    focusAreas: [
      "UN Sustainable Development Goal (SDG) Consultation",
      "Sustainable Khadi & Handloom Craft Exhibitions",
      "Academic Impact Research on Women Micro-Enterprise",
      "European Charitable Foundation Collaborations",
    ],
    keyPartners: [
      "Geneva Multilateral NGO Forum",
      "UK Commonwealth Social Enterprise Network",
      "European Fair Trade Craft Guilds",
    ],
    sdgAlignments: [
      "SDG 5: Gender Equality",
      "SDG 8: Decent Work & Economic Growth",
      "SDG 12: Responsible Consumption & Production",
    ],
  },
  {
    id: "middle-east",
    name: "United Arab Emirates & Gulf GCC",
    flag: "🇦🇪",
    subtitle: "Middle East CSR & Diaspora Community Partnerships",
    category: "Gulf CSR & Migrant Welfare",
    countryCodes: ["ae", "sa", "qa", "om", "kw"],
    hub: {
      city: "Dubai & Abu Dhabi",
      x: 626,
      y: 393,
    },
    metrics: [
      { label: "CSR Collaborations", value: "12 Corporate" },
      { label: "Village Water Units", value: "25 Funded" },
      { label: "SHG Textile Orders", value: "Annual" },
      { label: "Emergency Drives", value: "100% Verified" },
    ],
    description:
      "Partnering with prominent Indian business councils and philanthropic families across the UAE, Qatar, and Saudi Arabia. Mobilizing resources for rural potable water plants, emergency healthcare drives, and festive corporate gifting sourced from BSGSS women's tailoring guilds.",
    focusAreas: [
      "Decentralized Potable Water Plant Sponsorships",
      "Corporate CSR Procurement of Women SHG Handicrafts",
      "Emergency Relief & Healthcare Medical Aid",
      "Welfare Support for Families of Overseas Workers",
    ],
    keyPartners: [
      "UAE-India Business & Philanthropy Council",
      "Gulf Humanitarian Relief Initiative",
      "Middle East Indian Cultural Society",
    ],
    sdgAlignments: [
      "SDG 6: Clean Water & Sanitation",
      "SDG 8: Decent Work & Economic Growth",
      "SDG 10: Reduced Inequalities",
    ],
  },
  {
    id: "asia-pacific",
    name: "Singapore & Southeast Asia",
    flag: "🇸🇬",
    subtitle: "Social Enterprise & Micro-Finance Capacity Exchanges",
    category: "Micro-Credit Innovation",
    countryCodes: ["sg", "my", "id", "jp"],
    hub: {
      city: "Singapore & Tokyo",
      x: 766,
      y: 459,
    },
    metrics: [
      { label: "SHG Guild Models", value: "60+ Clusters" },
      { label: "Regional Forums", value: "Biennial" },
      { label: "Solar Skills Base", value: "Pioneered" },
      { label: "Micro-Banking Models", value: "Shared" },
    ],
    description:
      "Knowledge exchange hubs connecting BSGSS's Action for Micro-Finance and Rehabilitation (AMAR) model with leading micro-lending cooperatives, solar energy innovators, and social enterprise incubators across Singapore, Japan, and Southeast Asia.",
    focusAreas: [
      "Self-Help Micro-Banking & Micro-Credit Best Practices",
      "Solar-Powered Vocational Training Infrastructure",
      "Cross-Border Grassroots Leadership Workshops",
      "Digital Financial Literacy Tools for Rural Women",
    ],
    keyPartners: [
      "Singapore Social Innovation Exchange",
      "Asia-Pacific Micro-Credit Consortium",
      "Tokyo Sustainable Development Alliance",
    ],
    sdgAlignments: [
      "SDG 7: Affordable & Clean Energy",
      "SDG 8: Decent Work & Economic Growth",
      "SDG 9: Industry, Innovation & Infrastructure",
    ],
  },
  {
    id: "australia",
    name: "Australia & Oceania",
    flag: "🇦🇺",
    subtitle: "Community Climate Resilience & Agrarian Guilds",
    category: "Climate & Youth Philanthropy",
    countryCodes: ["au", "nz"],
    hub: {
      city: "Sydney & Melbourne",
      x: 880,
      y: 580,
    },
    metrics: [
      { label: "Agrarian Projects", value: "15 Villages" },
      { label: "Youth Hygiene Drives", value: "Annual" },
      { label: "Diaspora Chapters", value: "Active" },
      { label: "Eco-Farming Support", value: "Initiated" },
    ],
    description:
      "Working with Australian community trusts and the Indian diaspora in Sydney and Melbourne to support climate-resilient organic agriculture, water harvesting awareness, and sanitation infrastructure in drought-prone rural clusters.",
    focusAreas: [
      "Agrarian Climate Resilience & Water Conservation",
      "Rural School Sanitation & Menstrual Hygiene Facilities",
      "Australian Diaspora Mentorship & Youth Training",
      "Community Tree Plantation & Green Village Drives",
    ],
    keyPartners: [
      "Australia-India Community Trust",
      "Pacific Sustainable Agriculture Guild",
      "Sydney Diaspora Philanthropy Forum",
    ],
    sdgAlignments: [
      "SDG 6: Clean Water & Sanitation",
      "SDG 13: Climate Action",
      "SDG 15: Life on Land",
    ],
  },
];

export const GLOBAL_SUMMARY_TOTALS = {
  regions: GLOBAL_REGIONS.length,
  countriesReached: 18,
  sdgsAligned: 17,
  livesEmpowered: "50,000+",
  villagesMobilized: "350+",
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

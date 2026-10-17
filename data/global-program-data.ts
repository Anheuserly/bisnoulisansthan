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
    subtitle: "Active Operations Across 5 States & 350+ Villages",
    category: "Verified Field Execution Base",
    countryCodes: ["in"],
    hub: {
      city: "New Delhi & Uttar Pradesh",
      x: 707,
      y: 400,
    },
    metrics: [
      { label: "Active States", value: "5 States" },
      { label: "District Clusters", value: "6 Major Hubs" },
      { label: "Village Networks", value: "350+ Panchayats" },
      { label: "CSR PSU Partners", value: "30+ PSUs" },
    ],
    description:
      "Statutory headquarters registered under Society Act XXI of 1860 with 12A, 80G, and MCA CSR-1 certifications. Deep field deployment across Uttar Pradesh, Delhi NCR, Haryana (Nuh Aspirational District), Punjab (Gurdaspur), and Rajasthan (Gangapur), operating mobile oncology screening clinics, women self-help tailoring guilds, and potable water purification plants.",
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
  {
    id: "north-america",
    name: "North America (Target Outreach)",
    flag: "🇺🇸",
    subtitle: "Diaspora Philanthropy & Institutional Alliances Target",
    category: "Strategic Global Horizon",
    countryCodes: [],
    hub: {
      city: "New York & San Francisco",
      x: 265,
      y: 295,
    },
    metrics: [
      { label: "Target Sector", value: "Tele-Oncology" },
      { label: "Engagement", value: "Diaspora Outreach" },
      { label: "Alignment", value: "Cross-Border CSR" },
      { label: "Status", value: "Target Horizon" },
    ],
    description:
      "Strategic roadmap to connect with the Non-Resident Indian (NRI) diaspora, philanthropic foundations, and technology-for-good institutions in North America. Target focus: bringing advanced diagnostic software, remote tele-consultation support, and diaspora giving to support village medical vans and girl child educational scholarships.",
    focusAreas: [
      "Targeted Cross-Border Philanthropic Collaboration",
      "Remote Tele-Health & Oncology Advisory Networks",
      "Village Healthcare Equipment Endowment Drive",
      "Global Indian Diaspora Academic Linkages",
    ],
    keyPartners: [
      "Target: US-India Diaspora Philanthropy Circles",
      "Target: Healthcare Technology-for-Good Networks",
    ],
    sdgAlignments: [
      "SDG 3: Good Health & Well-being",
      "SDG 4: Quality Education",
      "SDG 17: Partnerships for the Goals",
    ],
  },
  {
    id: "europe",
    name: "UK & European Union (Target Outreach)",
    flag: "🇬🇧",
    subtitle: "UN SDGs & Fair Trade Textile Exhibitions Target",
    category: "Strategic Global Horizon",
    countryCodes: [],
    hub: {
      city: "London & Geneva",
      x: 466,
      y: 274,
    },
    metrics: [
      { label: "Target Sector", value: "Fair-Trade Khadi" },
      { label: "Multilateral", value: "UN SDG Framework" },
      { label: "Exchange", value: "Academic Research" },
      { label: "Status", value: "Target Horizon" },
    ],
    description:
      "Institutional goal to present BSGSS's rural Khadi and handloom textiles on European ethical craft platforms, and engage with international civil society dialogues on grassroots implementation of UN Sustainable Development Goals.",
    focusAreas: [
      "Ethical Handicraft & Rural Khadi International Showcases",
      "UN Sustainable Development Goal (SDG) Alignment",
      "Empirical Grassroots Impact Studies & Academic Exchange",
      "European Charitable Foundation Partnerships",
    ],
    keyPartners: [
      "Target: Commonwealth Social Enterprise Networks",
      "Target: European Fair Trade Craft Associations",
    ],
    sdgAlignments: [
      "SDG 5: Gender Equality",
      "SDG 8: Decent Work & Economic Growth",
      "SDG 12: Responsible Consumption & Production",
    ],
  },
  {
    id: "middle-east",
    name: "Middle East & Gulf GCC (Target Outreach)",
    flag: "🇦🇪",
    subtitle: "NRI Philanthropy & Clean Water Initiatives Target",
    category: "Strategic Global Horizon",
    countryCodes: [],
    hub: {
      city: "Dubai & Abu Dhabi",
      x: 626,
      y: 393,
    },
    metrics: [
      { label: "Target Sector", value: "Potable Water" },
      { label: "Community", value: "Gulf Indian NRIs" },
      { label: "Procurement", value: "SHG Products" },
      { label: "Status", value: "Target Horizon" },
    ],
    description:
      "Targeting bilateral philanthropic bridges with the Indian expatriate community and corporate CSR wings in the UAE and Gulf region to fund clean drinking water purification plants (Water ATMs) in drought-vulnerable North Indian villages.",
    focusAreas: [
      "Potable Water Infrastructure Sponsorships",
      "Corporate CSR Procurement of Handcrafted Gifts",
      "Emergency Medical Relief Support",
      "Welfare Linkages for Rural Migrant Families",
    ],
    keyPartners: [
      "Target: Gulf Indian Business & Cultural Councils",
      "Target: Bilateral Humanitarian Initiatives",
    ],
    sdgAlignments: [
      "SDG 6: Clean Water & Sanitation",
      "SDG 8: Decent Work & Economic Growth",
      "SDG 10: Reduced Inequalities",
    ],
  },
  {
    id: "asia-pacific",
    name: "Asia-Pacific (Target Outreach)",
    flag: "🇸🇬",
    subtitle: "Micro-Credit Innovation & Social Enterprise Target",
    category: "Strategic Global Horizon",
    countryCodes: [],
    hub: {
      city: "Singapore & Tokyo",
      x: 766,
      y: 459,
    },
    metrics: [
      { label: "Target Sector", value: "Micro-Finance" },
      { label: "Exchange", value: "SHG Enterprise" },
      { label: "Solar Innovation", value: "Green Skills" },
      { label: "Status", value: "Target Horizon" },
    ],
    description:
      "Targeting knowledge-sharing and capacity partnerships with leading micro-finance cooperatives, rural solar technology developers, and women's livelihood incubators across Southeast Asia.",
    focusAreas: [
      "Self-Help Micro-Banking Best Practice Exchanges",
      "Clean Energy & Solar Vocational Tools for Women",
      "Digital Financial Literacy Models for Rural Guilds",
    ],
    keyPartners: [
      "Target: Asia-Pacific Social Innovation Consortia",
      "Target: Regional Micro-Credit Networks",
    ],
    sdgAlignments: [
      "SDG 7: Affordable & Clean Energy",
      "SDG 8: Decent Work & Economic Growth",
      "SDG 9: Industry, Innovation & Infrastructure",
    ],
  },
  {
    id: "australia",
    name: "Australia & Oceania (Target Outreach)",
    flag: "🇦🇺",
    subtitle: "Climate Resilience & Agrarian Guilds Target",
    category: "Strategic Global Horizon",
    countryCodes: [],
    hub: {
      city: "Sydney & Melbourne",
      x: 880,
      y: 580,
    },
    metrics: [
      { label: "Target Sector", value: "Climate Agronomy" },
      { label: "Focus", value: "Water Harvesting" },
      { label: "Outreach", value: "Australian Diaspora" },
      { label: "Status", value: "Target Horizon" },
    ],
    description:
      "Long-term target to collaborate with Australian agrarian institutions and the Indian diaspora for sustainable village water-harvesting practices, soil conservation, and youth rural training.",
    focusAreas: [
      "Village Rainwater Harvesting & Conservation Methods",
      "Organic Agriculture & Soil Health Initiatives",
      "Youth Vocational Mentorship Programs",
    ],
    keyPartners: [
      "Target: Australian-Indian Community Trusts",
      "Target: Sustainable Agriculture Exchanges",
    ],
    sdgAlignments: [
      "SDG 6: Clean Water & Sanitation",
      "SDG 13: Climate Action",
      "SDG 15: Life on Land",
    ],
  },
];

export const GLOBAL_SUMMARY_TOTALS = {
  verifiedStates: 5,
  verifiedDistricts: 6,
  villagesMobilized: "350+",
  statutoryPartners: "30+",
  targetGlobalHubs: 5,
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

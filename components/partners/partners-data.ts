export interface Partner {
  id: string;
  name: string;
  logo: string;
  href: string;
  alt: string;
  focusAreas: string[];
  locations: string[];
}

// Source: BSGSS funding-partners document. Each partner appears once here;
// animation duplication is handled inside PartnerColumn.
const partnerRecords: Array<[string, string, string]> = [
  ["rites", "RITES Ltd.", "rites.png"], ["ircon", "Ircon International Ltd. (IRCON)", "ircon.png"], ["rec", "REC Ltd.", "rec.png"], ["nvvn", "NTPC Vidyut Vyapar Nigam Ltd. (NVVN)", "nvvn.png"], ["igl", "Indraprastha Gas Ltd. (IGL)", "igl.png"],
  ["nmdc", "NMDC Ltd.", "nmdc.png"], ["bpcl", "Bharat Petroleum Corporation Ltd. (BPCL)", "bpcl.png"], ["hpcl", "Hindustan Petroleum Corporation Ltd. (HPCL)", "hpcl.png"], ["iocl", "Indian Oil Corporation Ltd. (IOCL)", "iocl.png"], ["recpdcl", "REC Power Development & Consultancy Ltd. (RECPDCL)", "recpdcl.png"],
  ["gail", "GAIL (India) Ltd.", "gail.png"], ["bhel", "Bharat Heavy Electricals Ltd. (BHEL)", "bhel.png"], ["nalco", "National Aluminium Corporation Ltd. (NALCO)", "nalco.png"], ["sail", "Steel Authority of India Ltd. (SAIL)", "sail.png"], ["nhpc", "NHPC Ltd.", "nhpc.png"],
  ["alimco", "Artificial Limbs Manufacturing Corporation of India (ALIMCO)", "alimco.png"], ["ongc", "Oil & Natural Gas Corporation Ltd. (ONGC)", "ongc.png"], ["ireda", "Indian Renewable Energy Development Agency Ltd. (IREDA)", "ireda.png"], ["nmdfc", "National Minorities Development & Finance Corporation (NMDFC)", "nmdfc.png"], ["aic", "Agriculture Insurance Company of India Ltd. (AIC)", "aic.png"],
  ["aai", "Airports Authority of India (AAI)", "aai.png"], ["rvnl", "Rail Vikas Nigam Ltd. (RVNL)", "rvnl.png"], ["ntpc", "NTPC Ltd.", "ntpc.png"], ["mudra", "Micro Units Development & Refinance Agency Ltd. (MUDRA)", "mudra.png"], ["apcpl", "Aravali Power Company Pvt. Ltd. (APCPL)", "apcpl.png"],
  ["eil", "Engineers India Ltd. (EIL)", "eil.png"], ["nescl", "NTPC Electric Supply Company Ltd. (NESCL)", "nescl.png"], ["petronet-lng", "Petronet LNG Ltd. (PLL)", "petronet-lng.png"], ["bank-of-baroda", "Bank of Baroda (BOB)", "bank-of-baroda.png"], ["pnb", "Punjab National Bank (PNB)", "pnb.png"],
];

// Programme and location details are transcribed from BSGSS's public legal
// status summary. They make each partnership page useful without inventing
// project outcomes that are not in the supplied public record.
const partnershipDetails: Record<string, Pick<Partner, "focusAreas" | "locations">> = {
  rites: { focusAreas: ["Healthcare", "Vocational training programme for women"], locations: ["Nuh, Haryana", "Ghaziabad, Uttar Pradesh", "Gurdaspur, Punjab"] },
  ircon: { focusAreas: ["Healthcare", "Vocational training programme for women"], locations: ["Nuh, Haryana", "Ghaziabad, Uttar Pradesh", "Meerut, Uttar Pradesh", "Gurdaspur, Punjab", "Gangapur, Rajasthan"] },
  rec: { focusAreas: ["Vocational training programme for women", "Water ATMs"], locations: ["Ghaziabad, Uttar Pradesh", "Gurdaspur, Punjab", "Prayagraj, Uttar Pradesh"] },
  nvvn: { focusAreas: ["Healthcare", "Vocational training programme for women"], locations: ["Ghaziabad, Uttar Pradesh"] },
  igl: { focusAreas: ["Healthcare", "Vocational training programme for women"], locations: ["Ghaziabad, Uttar Pradesh", "Gautam Buddha Nagar, Uttar Pradesh"] },
  nmdc: { focusAreas: ["Vocational training programme for women"], locations: ["Nuh, Haryana"] },
  bpcl: { focusAreas: ["Healthcare", "Vocational training programme for women"], locations: ["Nuh, Haryana", "Ghaziabad, Uttar Pradesh", "Gurdaspur, Punjab"] },
  hpcl: { focusAreas: ["Healthcare"], locations: ["Nuh, Haryana", "Ghaziabad, Uttar Pradesh"] },
  iocl: { focusAreas: ["Healthcare", "Vocational training programme for women"], locations: ["Nuh, Haryana", "Ghaziabad, Uttar Pradesh"] },
  recpdcl: { focusAreas: ["Healthcare"], locations: ["Gautam Buddha Nagar, Uttar Pradesh"] },
  gail: { focusAreas: ["Healthcare", "Vocational training programme for women"], locations: ["Nuh, Haryana", "Ghaziabad, Uttar Pradesh", "Gurdaspur, Punjab"] },
  bhel: { focusAreas: ["Healthcare"], locations: ["Nuh, Haryana"] },
  nalco: { focusAreas: ["Healthcare"], locations: ["Nuh, Haryana"] },
  sail: { focusAreas: ["Healthcare"], locations: ["Ghaziabad, Uttar Pradesh"] },
  nhpc: { focusAreas: ["Healthcare"], locations: ["Nuh, Haryana"] },
  alimco: { focusAreas: ["Healthcare", "Vocational training programme for women"], locations: ["Nuh, Haryana", "Bastar, Chhattisgarh"] },
  ongc: { focusAreas: ["Healthcare", "Vocational training programme for women"], locations: ["Nuh, Haryana", "Ghaziabad, Uttar Pradesh"] },
  ireda: { focusAreas: ["Healthcare"], locations: ["Nuh, Haryana"] },
  nmdfc: { focusAreas: ["Healthcare"], locations: ["Nuh, Haryana"] },
  aic: { focusAreas: ["Healthcare", "Vocational training programme for women"], locations: ["Ghaziabad, Uttar Pradesh"] },
  aai: { focusAreas: ["Healthcare"], locations: ["Nuh, Haryana", "Ghaziabad, Uttar Pradesh"] },
  rvnl: { focusAreas: ["Healthcare", "Vocational training programme for women"], locations: ["Nuh, Haryana", "Ghaziabad, Uttar Pradesh"] },
  ntpc: { focusAreas: ["Healthcare"], locations: ["Nuh, Haryana"] },
  mudra: { focusAreas: ["Vocational training programme for women"], locations: ["Nuh, Haryana"] },
  apcpl: { focusAreas: [], locations: [] },
  eil: { focusAreas: ["Healthcare"], locations: ["Nuh, Haryana", "Ghaziabad, Uttar Pradesh"] },
  nescl: { focusAreas: [], locations: [] },
  "petronet-lng": { focusAreas: ["Healthcare"], locations: ["Nuh, Haryana"] },
  "bank-of-baroda": { focusAreas: ["Healthcare"], locations: ["Nuh, Haryana"] },
  pnb: { focusAreas: ["Healthcare"], locations: ["Nuh, Haryana"] },
};

export const partners: Partner[] = partnerRecords.map(([id, name, filename]) => ({
  id,
  name,
  logo: `/partners/${filename}`,
  href: `/about/partners/${id}`,
  alt: `${name} logo`,
  ...partnershipDetails[id]!,
}));

export function getPartner(id: string) {
  return partners.find((partner) => partner.id === id);
}

export function distributePartners(items: Partner[], columns: number) {
  return Array.from({ length: columns }, (_, column) => items.filter((_, index) => index % columns === column));
}

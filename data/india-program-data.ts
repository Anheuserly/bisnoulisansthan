import { partners } from "@/components/partners/partners-data";

export interface IndiaStateProgram {
  state: string;
  districts: string[];
  /** Individual village totals are not published state-by-state by BSGSS. */
  villages: number | null;
  /** Number of partner programme records associated with this state. */
  programs: number;
}

const stateLabels = ["Uttar Pradesh", "Haryana", "Punjab", "Rajasthan", "Chhattisgarh"] as const;

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z]/g, "");

const aliases: Record<string, string> = {
  delhi: "delhi",
  nctofdelhi: "delhi",
  orissa: "odisha",
  uttaranchal: "uttarakhand",
};

export function normaliseStateName(name: string) {
  const cleaned = normalise(name);
  return aliases[cleaned] ?? cleaned;
}

function stateFromLocation(location: string) {
  return stateLabels.find((state) => normaliseStateName(location).includes(normaliseStateName(state)));
}

// This is derived from the public partner programme locations already used by
// BSGSS partnership profiles. Districts are de-duplicated, while programmes
// count the partner records associated with the state.
export const indiaProgramData: IndiaStateProgram[] = stateLabels.map((state) => {
  const records = partners.filter((partner) => partner.locations.some((location) => stateFromLocation(location) === state));
  const districts = [...new Set(records.flatMap((partner) => partner.locations.filter((location) => stateFromLocation(location) === state).map((location) => location.split(",")[0]!)))].sort();

  return { state, districts, villages: null, programs: records.length };
});

export const indiaProgrammeTotals = {
  states: indiaProgramData.length,
  districts: indiaProgramData.reduce((total, state) => total + state.districts.length, 0),
  // BSGSS's public website reports work with women in 60+ villages. A state-level
  // split is not published, so it is deliberately not estimated in this dataset.
  villages: 60,
};

export function getIndiaStateProgram(stateName: string) {
  const target = normaliseStateName(stateName);
  return indiaProgramData.find((state) => normaliseStateName(state.state) === target);
}

import fs from "node:fs";
import path from "node:path";

export interface SponsorTier {
  id: string;
  title: string;
  amount: number;
  covers: string;
  outcome: string;
  image: string;
  active: boolean;
}

const DEFAULT_TIERS_PATH = path.join(process.cwd(), "content", "sponsor-tiers.json");

export function getSponsorTiers(filePath?: string): SponsorTier[] {
  const targetPath = filePath || DEFAULT_TIERS_PATH;
  if (!fs.existsSync(/* turbopackIgnore: true */ targetPath)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(/* turbopackIgnore: true */ targetPath, "utf-8");
    const parsed: SponsorTier[] = JSON.parse(raw);
    return parsed.filter((tier) => tier && tier.active);
  } catch (err) {
    console.warn("Error reading sponsor tiers:", err);
    return [];
  }
}

export function getSponsorTierById(id: string, filePath?: string): SponsorTier | undefined {
  const tiers = getSponsorTiers(filePath);
  return tiers.find((tier) => tier.id === id);
}

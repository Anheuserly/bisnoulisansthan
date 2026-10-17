import fs from "node:fs";
import path from "node:path";

export interface VoiceEntry {
  id: string;
  name: string; // first name only
  village: string;
  photo: string;
  audio: string;
  durationSec: number;
  language: "hi" | "en";
  transcriptHi: string;
  transcriptEn: string;
  consentOnFile: boolean;
  year: number;
}

const DEFAULT_VOICES_PATH = path.join(process.cwd(), "content", "voices.json");

/**
 * HARD GATE: Only returns records where consentOnFile === true.
 * Any entry with false or missing consent is strictly excluded and logged.
 */
export function getConsentedVoices(filePath?: string): VoiceEntry[] {
  const targetPath = filePath || DEFAULT_VOICES_PATH;
  if (!fs.existsSync(/* turbopackIgnore: true */ targetPath)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(/* turbopackIgnore: true */ targetPath, "utf-8");
    const parsed: VoiceEntry[] = JSON.parse(raw);

    const filtered: VoiceEntry[] = [];
    const omitted: string[] = [];

    for (const entry of parsed) {
      if (entry && entry.consentOnFile === true) {
        filtered.push(entry);
      } else {
        omitted.push(entry?.id || "unnamed");
      }
    }

    if (omitted.length > 0) {
      console.warn(
        `[VOICE CONSENT GATE] Filtered out ${omitted.length} record(s) lacking documented consent: ${omitted.join(
          ", "
        )}`
      );
    }

    return filtered;
  } catch (err) {
    console.warn("Error reading voices file:", err);
    return [];
  }
}

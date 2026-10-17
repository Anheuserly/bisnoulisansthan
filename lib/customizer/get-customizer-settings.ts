import { db } from "@/lib/db";
import { DEFAULT_CUSTOMIZER_SETTINGS, type CustomizerSettings } from "@/config/customizer";

export async function getCustomizerSettings(): Promise<CustomizerSettings> {
  if (!process.env.DATABASE_URL) {
    return DEFAULT_CUSTOMIZER_SETTINGS;
  }

  try {
    const { rows } = await db.query<{ value: Partial<CustomizerSettings> }>(
      "SELECT value FROM site_settings WHERE setting_key = 'site_customizer' LIMIT 1"
    );

    if (rows[0]?.value && typeof rows[0].value === "object") {
      const val = rows[0].value;
      return {
        sections: Array.isArray(val.sections) && val.sections.length > 0
          ? val.sections
          : DEFAULT_CUSTOMIZER_SETTINGS.sections,
        audio: {
          ...DEFAULT_CUSTOMIZER_SETTINGS.audio,
          ...(val.audio || {}),
        },
        typing: {
          ...DEFAULT_CUSTOMIZER_SETTINGS.typing,
          ...(val.typing || {}),
        },
        images: {
          ...DEFAULT_CUSTOMIZER_SETTINGS.images,
          ...(val.images || {}),
        },
      };
    }
  } catch (err) {
    console.warn("Could not load customizer settings from DB, using defaults:", err);
  }

  return DEFAULT_CUSTOMIZER_SETTINGS;
}

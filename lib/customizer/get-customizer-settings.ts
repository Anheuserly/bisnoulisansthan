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
        footprint: {
          ...DEFAULT_CUSTOMIZER_SETTINGS.footprint,
          ...(val.footprint || {}),
        },
        texts: {
          ...DEFAULT_CUSTOMIZER_SETTINGS.texts,
          ...(val.texts || {}),
          about: {
            ...DEFAULT_CUSTOMIZER_SETTINGS.texts.about,
            ...(val.texts?.about || {}),
            highlights: val.texts?.about?.highlights && Array.isArray(val.texts.about.highlights) && val.texts.about.highlights.length > 0
              ? val.texts.about.highlights
              : DEFAULT_CUSTOMIZER_SETTINGS.texts.about.highlights,
          },
          programmes: {
            ...DEFAULT_CUSTOMIZER_SETTINGS.texts.programmes,
            ...(val.texts?.programmes || {}),
          },
          government: {
            ...DEFAULT_CUSTOMIZER_SETTINGS.texts.government,
            ...(val.texts?.government || {}),
          },
          partners: {
            ...DEFAULT_CUSTOMIZER_SETTINGS.texts.partners,
            ...(val.texts?.partners || {}),
            stats: val.texts?.partners?.stats && Array.isArray(val.texts.partners.stats) && val.texts.partners.stats.length > 0
              ? val.texts.partners.stats
              : DEFAULT_CUSTOMIZER_SETTINGS.texts.partners.stats,
          },
          support: {
            ...DEFAULT_CUSTOMIZER_SETTINGS.texts.support,
            ...(val.texts?.support || {}),
          },
        },
        layout: {
          ...DEFAULT_CUSTOMIZER_SETTINGS.layout,
          ...(val.layout || {}),
        },
        offices: {
          registeredOffice: {
            ...DEFAULT_CUSTOMIZER_SETTINGS.offices.registeredOffice,
            ...(val.offices?.registeredOffice || {}),
          },
          adminOffice: {
            ...DEFAULT_CUSTOMIZER_SETTINGS.offices.adminOffice,
            ...(val.offices?.adminOffice || {}),
          },
        },
        contactActions: {
          ...DEFAULT_CUSTOMIZER_SETTINGS.contactActions,
          ...(val.contactActions || {}),
        },
      };
    }
  } catch (err) {
    console.warn("Could not load customizer settings from DB, using defaults:", err);
  }

  return DEFAULT_CUSTOMIZER_SETTINGS;
}

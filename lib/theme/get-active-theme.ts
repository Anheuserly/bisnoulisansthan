import { db } from "@/lib/db";
import { DEFAULT_THEME, type ThemeConfig } from "@/config/themes";

export async function getActiveTheme(): Promise<ThemeConfig> {
  if (!process.env.DATABASE_URL) {
    return DEFAULT_THEME;
  }

  try {
    const { rows } = await db.query<{ value: ThemeConfig }>(
      "SELECT value FROM site_settings WHERE setting_key = 'theme' LIMIT 1"
    );

    if (rows[0]?.value && typeof rows[0].value === "object" && rows[0].value.id) {
      return rows[0].value;
    }
  } catch {
    // If table not ready or error, fallback to default theme safely
  }

  return DEFAULT_THEME;
}

import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { DEFAULT_THEME, type ThemeConfig } from "@/config/themes";

const allowed = {
  fontPairing: ["classic-editorial", "modern-grotesk", "clean-geometric", "warm-humanist"],
  radius: ["sharp", "balanced", "curved"],
  shadow: ["flat", "soft", "lifted"],
  headerStyle: ["standard", "compact", "floating"],
  heroStyle: ["immersive", "framed", "editorial"],
  pageHeaderStyle: ["standard", "centred", "minimal"],
  cardStyle: ["standard", "soft", "outlined"],
  density: ["comfortable", "compact", "spacious"],
} as const;

function choice<T extends readonly string[]>(value: unknown, options: T, fallback: T[number]) {
  return typeof value === "string" && (options as readonly string[]).includes(value)
    ? (value as T[number])
    : fallback;
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Database is not configured." }, { status: 503 });
  }

  const actor = await getCurrentAdmin();
  if (!actor) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    theme?: unknown;
    reset?: boolean;
  } | null;

  if (body?.reset) {
    await db.query(
      `INSERT INTO site_settings (setting_key, value, updated_by, updated_at)
       VALUES ('theme', $1, $2, now())
       ON CONFLICT (setting_key)
       DO UPDATE SET value = EXCLUDED.value, updated_by = EXCLUDED.updated_by, updated_at = now();`,
      [JSON.stringify(DEFAULT_THEME), actor.id]
    );

    return NextResponse.json({ ok: true, theme: DEFAULT_THEME, message: "Theme reset to default." });
  }

  const theme = body?.theme as ThemeConfig | undefined;
  if (!theme || typeof theme !== "object" || !theme.brandPrimary) {
    return NextResponse.json({ message: "Invalid theme data provided." }, { status: 400 });
  }

  // Ensure mandatory fields
  const sanitizedTheme: ThemeConfig = {
    id: theme.id || "custom",
    name: theme.name || "Custom Theme",
    description: theme.description || "Customized by administrator",
    brandPrimary: theme.brandPrimary,
    brandSecondary: theme.brandSecondary || theme.brandPrimary,
    canvas: theme.canvas || "#FCFBF8",
    mist: theme.mist || "#F5F9F9",
    ink: theme.ink || "#1B2326",
    inkMuted: theme.inkMuted || "#52616A",
    line: theme.line || "#B9DDE0",
    fontPairing: choice(theme.fontPairing, allowed.fontPairing, "classic-editorial"),
    radius: choice(theme.radius, allowed.radius, "balanced"),
    shadow: choice(theme.shadow, allowed.shadow, "soft"),
    headerStyle: choice(theme.headerStyle, allowed.headerStyle, "standard"),
    heroStyle: choice(theme.heroStyle, allowed.heroStyle, "immersive"),
    pageHeaderStyle: choice(theme.pageHeaderStyle, allowed.pageHeaderStyle, "standard"),
    cardStyle: choice(theme.cardStyle, allowed.cardStyle, "standard"),
    density: choice(theme.density, allowed.density, "comfortable"),
    customPalette: theme.customPalette,
  };

  await db.query(
    `INSERT INTO site_settings (setting_key, value, updated_by, updated_at)
     VALUES ('theme', $1, $2, now())
     ON CONFLICT (setting_key)
     DO UPDATE SET value = EXCLUDED.value, updated_by = EXCLUDED.updated_by, updated_at = now();`,
    [JSON.stringify(sanitizedTheme), actor.id]
  );

  return NextResponse.json({
    ok: true,
    theme: sanitizedTheme,
    message: "Theme successfully published site-wide.",
  });
}

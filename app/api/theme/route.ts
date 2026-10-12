import { NextResponse } from "next/server";
import { getActiveTheme } from "@/lib/theme/get-active-theme";
import { THEME_PRESETS, DEFAULT_THEME } from "@/config/themes";

export async function GET() {
  const activeTheme = await getActiveTheme();
  return NextResponse.json({
    active: activeTheme,
    presets: THEME_PRESETS,
    default: DEFAULT_THEME,
  });
}

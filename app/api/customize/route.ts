import { NextResponse } from "next/server";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";
import { AMBIENT_TRACK_PRESETS, DEFAULT_CUSTOMIZER_SETTINGS } from "@/config/customizer";

export async function GET() {
  const settings = await getCustomizerSettings();
  return NextResponse.json({
    settings,
    presets: AMBIENT_TRACK_PRESETS,
    default: DEFAULT_CUSTOMIZER_SETTINGS,
  });
}

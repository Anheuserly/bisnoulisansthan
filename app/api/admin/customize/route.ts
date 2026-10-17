import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";
import { DEFAULT_CUSTOMIZER_SETTINGS, type CustomizerSettings } from "@/config/customizer";

export async function GET() {
  const actor = await getCurrentAdmin();
  if (!actor) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const settings = await getCustomizerSettings();
  return NextResponse.json({ ok: true, settings });
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
    settings?: Partial<CustomizerSettings>;
    reset?: boolean;
  } | null;

  if (body?.reset) {
    await db.query(
      `INSERT INTO site_settings (setting_key, value, updated_by, updated_at)
       VALUES ('site_customizer', $1, $2, now())
       ON CONFLICT (setting_key)
       DO UPDATE SET value = EXCLUDED.value, updated_by = EXCLUDED.updated_by, updated_at = now();`,
      [JSON.stringify(DEFAULT_CUSTOMIZER_SETTINGS), actor.id]
    );

    return NextResponse.json({
      ok: true,
      settings: DEFAULT_CUSTOMIZER_SETTINGS,
      message: "Homepage and website customization reset to defaults.",
    });
  }

  const incoming = body?.settings;
  if (!incoming || typeof incoming !== "object") {
    return NextResponse.json({ message: "Invalid customizer data provided." }, { status: 400 });
  }

  // Sanitize and validate
  const current = await getCustomizerSettings();
  const sanitized: CustomizerSettings = {
    sections: Array.isArray(incoming.sections) && incoming.sections.length > 0
      ? incoming.sections.map((s, idx) => ({
          id: s.id,
          name: s.name || `Section ${idx + 1}`,
          category: s.category || "content",
          enabled: Boolean(s.enabled),
          order: typeof s.order === "number" ? s.order : idx + 1,
          description: s.description || "",
        }))
      : current.sections,
    audio: {
      enabled: incoming.audio?.enabled !== undefined ? Boolean(incoming.audio.enabled) : current.audio.enabled,
      trackId: incoming.audio?.trackId || current.audio.trackId,
      customUrl: incoming.audio?.customUrl || "",
      defaultVolume: typeof incoming.audio?.defaultVolume === "number"
        ? Math.min(1.0, Math.max(0.05, incoming.audio.defaultVolume))
        : current.audio.defaultVolume,
      clickSounds: incoming.audio?.clickSounds !== undefined ? Boolean(incoming.audio.clickSounds) : current.audio.clickSounds,
    },
    typing: {
      eyebrow: incoming.typing?.eyebrow || current.typing.eyebrow,
      phrases: Array.isArray(incoming.typing?.phrases) && incoming.typing.phrases.length > 0
        ? incoming.typing.phrases.filter(p => typeof p === "string" && p.trim().length > 0)
        : current.typing.phrases,
      statusText: incoming.typing?.statusText || current.typing.statusText,
    },
    images: {
      heroSlides: Array.isArray(incoming.images?.heroSlides) && incoming.images.heroSlides.length > 0
        ? incoming.images.heroSlides
        : current.images.heroSlides,
      collagePhotos: Array.isArray(incoming.images?.collagePhotos) && incoming.images.collagePhotos.length > 0
        ? incoming.images.collagePhotos
        : current.images.collagePhotos,
    },
  };

  await db.query(
    `INSERT INTO site_settings (setting_key, value, updated_by, updated_at)
     VALUES ('site_customizer', $1, $2, now())
     ON CONFLICT (setting_key)
     DO UPDATE SET value = EXCLUDED.value, updated_by = EXCLUDED.updated_by, updated_at = now();`,
    [JSON.stringify(sanitized), actor.id]
  );

  return NextResponse.json({
    ok: true,
    settings: sanitized,
    message: "Homepage customization successfully saved and published live.",
  });
}

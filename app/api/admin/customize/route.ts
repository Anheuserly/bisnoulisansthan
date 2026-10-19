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
    footprint: {
      eyebrow: incoming.footprint?.eyebrow || current.footprint.eyebrow,
      heading: incoming.footprint?.heading || current.footprint.heading,
      description: incoming.footprint?.description || current.footprint.description,
      defaultMode: incoming.footprint?.defaultMode === "india" ? "india" : "world",
      worldNote: incoming.footprint?.worldNote || current.footprint.worldNote,
      indiaNote: incoming.footprint?.indiaNote || current.footprint.indiaNote,
      globalVisionGoal: incoming.footprint?.globalVisionGoal || current.footprint.globalVisionGoal,
    },
    texts: {
      about: {
        eyebrow: incoming.texts?.about?.eyebrow || current.texts.about.eyebrow,
        title: incoming.texts?.about?.title || current.texts.about.title,
        text: incoming.texts?.about?.text || current.texts.about.text,
        highlights: Array.isArray(incoming.texts?.about?.highlights) && incoming.texts.about.highlights.length > 0
          ? incoming.texts.about.highlights.map((h, i) => ({
              title: h?.title || current.texts.about.highlights[i]?.title || "",
              desc: h?.desc || current.texts.about.highlights[i]?.desc || "",
            }))
          : current.texts.about.highlights,
      },
      programmes: {
        eyebrow: incoming.texts?.programmes?.eyebrow || current.texts.programmes.eyebrow,
        title: incoming.texts?.programmes?.title || current.texts.programmes.title,
      },
      government: {
        eyebrow: incoming.texts?.government?.eyebrow || current.texts.government.eyebrow,
        title: incoming.texts?.government?.title || current.texts.government.title,
        text: incoming.texts?.government?.text || current.texts.government.text,
        cta: incoming.texts?.government?.cta || current.texts.government.cta,
        overviewEyebrow: incoming.texts?.government?.overviewEyebrow || current.texts.government.overviewEyebrow,
        overviewTitle: incoming.texts?.government?.overviewTitle || current.texts.government.overviewTitle,
        overviewText: incoming.texts?.government?.overviewText || current.texts.government.overviewText,
        overviewCta: incoming.texts?.government?.overviewCta || current.texts.government.overviewCta,
      },
      partners: {
        eyebrow: incoming.texts?.partners?.eyebrow || current.texts.partners.eyebrow,
        title: incoming.texts?.partners?.title || current.texts.partners.title,
        description: incoming.texts?.partners?.description || current.texts.partners.description,
        stats: Array.isArray(incoming.texts?.partners?.stats) && incoming.texts.partners.stats.length > 0
          ? incoming.texts.partners.stats.map((s, i) => ({
              stat: s?.stat || current.texts.partners.stats[i]?.stat || "",
              desc: s?.desc || current.texts.partners.stats[i]?.desc || "",
            }))
          : current.texts.partners.stats,
      },
      support: {
        eyebrow: incoming.texts?.support?.eyebrow || current.texts.support.eyebrow,
        title: incoming.texts?.support?.title || current.texts.support.title,
        description: incoming.texts?.support?.description || current.texts.support.description,
        buttonText: incoming.texts?.support?.buttonText || current.texts.support.buttonText,
      },
    },
    layout: {
      headerLogoSize: ["default", "large", "xlarge"].includes(incoming.layout?.headerLogoSize as string)
        ? (incoming.layout?.headerLogoSize as "default" | "large" | "xlarge")
        : current.layout?.headerLogoSize || DEFAULT_CUSTOMIZER_SETTINGS.layout.headerLogoSize,
      footerLogoSize: ["default", "large", "xlarge"].includes(incoming.layout?.footerLogoSize as string)
        ? (incoming.layout?.footerLogoSize as "default" | "large" | "xlarge")
        : current.layout?.footerLogoSize || DEFAULT_CUSTOMIZER_SETTINGS.layout.footerLogoSize,
      headerHeight: ["default", "compact", "tall"].includes(incoming.layout?.headerHeight as string)
        ? (incoming.layout?.headerHeight as "default" | "compact" | "tall")
        : current.layout?.headerHeight || DEFAULT_CUSTOMIZER_SETTINGS.layout.headerHeight,
      containerWidth: ["standard", "wide", "expanded"].includes(incoming.layout?.containerWidth as string)
        ? (incoming.layout?.containerWidth as "standard" | "wide" | "expanded")
        : current.layout?.containerWidth || DEFAULT_CUSTOMIZER_SETTINGS.layout.containerWidth,
      eyebrowStyle: ["plain_bold", "modern_track"].includes(incoming.layout?.eyebrowStyle as string)
        ? (incoming.layout?.eyebrowStyle as "plain_bold" | "modern_track")
        : current.layout?.eyebrowStyle || DEFAULT_CUSTOMIZER_SETTINGS.layout.eyebrowStyle,
    },
    offices: {
      registeredOffice: {
        title: incoming.offices?.registeredOffice?.title || current.offices?.registeredOffice?.title || DEFAULT_CUSTOMIZER_SETTINGS.offices.registeredOffice.title,
        tag: incoming.offices?.registeredOffice?.tag || current.offices?.registeredOffice?.tag || DEFAULT_CUSTOMIZER_SETTINGS.offices.registeredOffice.tag,
        line1: incoming.offices?.registeredOffice?.line1 || current.offices?.registeredOffice?.line1 || DEFAULT_CUSTOMIZER_SETTINGS.offices.registeredOffice.line1,
        line2: incoming.offices?.registeredOffice?.line2 ?? current.offices?.registeredOffice?.line2 ?? DEFAULT_CUSTOMIZER_SETTINGS.offices.registeredOffice.line2,
        city: incoming.offices?.registeredOffice?.city || current.offices?.registeredOffice?.city || DEFAULT_CUSTOMIZER_SETTINGS.offices.registeredOffice.city,
        state: incoming.offices?.registeredOffice?.state || current.offices?.registeredOffice?.state || DEFAULT_CUSTOMIZER_SETTINGS.offices.registeredOffice.state,
        pincode: incoming.offices?.registeredOffice?.pincode || current.offices?.registeredOffice?.pincode || DEFAULT_CUSTOMIZER_SETTINGS.offices.registeredOffice.pincode,
        phone: incoming.offices?.registeredOffice?.phone || current.offices?.registeredOffice?.phone || DEFAULT_CUSTOMIZER_SETTINGS.offices.registeredOffice.phone,
        email: incoming.offices?.registeredOffice?.email || current.offices?.registeredOffice?.email || DEFAULT_CUSTOMIZER_SETTINGS.offices.registeredOffice.email,
        mapsUrl: incoming.offices?.registeredOffice?.mapsUrl || current.offices?.registeredOffice?.mapsUrl || DEFAULT_CUSTOMIZER_SETTINGS.offices.registeredOffice.mapsUrl,
      },
      adminOffice: {
        title: incoming.offices?.adminOffice?.title || current.offices?.adminOffice?.title || DEFAULT_CUSTOMIZER_SETTINGS.offices.adminOffice.title,
        tag: incoming.offices?.adminOffice?.tag || current.offices?.adminOffice?.tag || DEFAULT_CUSTOMIZER_SETTINGS.offices.adminOffice.tag,
        line1: incoming.offices?.adminOffice?.line1 || current.offices?.adminOffice?.line1 || DEFAULT_CUSTOMIZER_SETTINGS.offices.adminOffice.line1,
        line2: incoming.offices?.adminOffice?.line2 ?? current.offices?.adminOffice?.line2 ?? DEFAULT_CUSTOMIZER_SETTINGS.offices.adminOffice.line2,
        city: incoming.offices?.adminOffice?.city || current.offices?.adminOffice?.city || DEFAULT_CUSTOMIZER_SETTINGS.offices.adminOffice.city,
        state: incoming.offices?.adminOffice?.state || current.offices?.adminOffice?.state || DEFAULT_CUSTOMIZER_SETTINGS.offices.adminOffice.state,
        pincode: incoming.offices?.adminOffice?.pincode || current.offices?.adminOffice?.pincode || DEFAULT_CUSTOMIZER_SETTINGS.offices.adminOffice.pincode,
        phone: incoming.offices?.adminOffice?.phone || current.offices?.adminOffice?.phone || DEFAULT_CUSTOMIZER_SETTINGS.offices.adminOffice.phone,
        email: incoming.offices?.adminOffice?.email || current.offices?.adminOffice?.email || DEFAULT_CUSTOMIZER_SETTINGS.offices.adminOffice.email,
        mapsUrl: incoming.offices?.adminOffice?.mapsUrl || current.offices?.adminOffice?.mapsUrl || DEFAULT_CUSTOMIZER_SETTINGS.offices.adminOffice.mapsUrl,
      },
    },
    contactActions: {
      whatsappNumber: incoming.contactActions?.whatsappNumber || current.contactActions?.whatsappNumber || DEFAULT_CUSTOMIZER_SETTINGS.contactActions.whatsappNumber,
      whatsappMessage: incoming.contactActions?.whatsappMessage || current.contactActions?.whatsappMessage || DEFAULT_CUSTOMIZER_SETTINGS.contactActions.whatsappMessage,
      showInHeader: incoming.contactActions?.showInHeader !== undefined ? Boolean(incoming.contactActions.showInHeader) : (current.contactActions?.showInHeader ?? true),
      showInQuickActions: incoming.contactActions?.showInQuickActions !== undefined ? Boolean(incoming.contactActions.showInQuickActions) : (current.contactActions?.showInQuickActions ?? true),
      showInFooter: incoming.contactActions?.showInFooter !== undefined ? Boolean(incoming.contactActions.showInFooter) : (current.contactActions?.showInFooter ?? true),
    },
    popup: {
      enabled: incoming.popup?.enabled !== undefined ? Boolean(incoming.popup.enabled) : (current.popup?.enabled ?? DEFAULT_CUSTOMIZER_SETTINGS.popup.enabled),
      type: ["announcement", "news", "activity", "advertisement"].includes(incoming.popup?.type as string)
        ? (incoming.popup?.type as "announcement" | "news" | "activity" | "advertisement")
        : (current.popup?.type ?? DEFAULT_CUSTOMIZER_SETTINGS.popup.type),
      badge: incoming.popup?.badge?.trim() || current.popup?.badge || DEFAULT_CUSTOMIZER_SETTINGS.popup.badge,
      title: incoming.popup?.title?.trim() || current.popup?.title || DEFAULT_CUSTOMIZER_SETTINGS.popup.title,
      description: incoming.popup?.description?.trim() || current.popup?.description || DEFAULT_CUSTOMIZER_SETTINGS.popup.description,
      imageUrl: incoming.popup?.imageUrl !== undefined ? incoming.popup.imageUrl : (current.popup?.imageUrl ?? DEFAULT_CUSTOMIZER_SETTINGS.popup.imageUrl),
      primaryButtonText: incoming.popup?.primaryButtonText !== undefined ? incoming.popup.primaryButtonText : (current.popup?.primaryButtonText ?? DEFAULT_CUSTOMIZER_SETTINGS.popup.primaryButtonText),
      primaryButtonUrl: incoming.popup?.primaryButtonUrl !== undefined ? incoming.popup.primaryButtonUrl : (current.popup?.primaryButtonUrl ?? DEFAULT_CUSTOMIZER_SETTINGS.popup.primaryButtonUrl),
      secondaryButtonText: incoming.popup?.secondaryButtonText !== undefined ? incoming.popup.secondaryButtonText : (current.popup?.secondaryButtonText ?? DEFAULT_CUSTOMIZER_SETTINGS.popup.secondaryButtonText),
      secondaryButtonUrl: incoming.popup?.secondaryButtonUrl !== undefined ? incoming.popup.secondaryButtonUrl : (current.popup?.secondaryButtonUrl ?? DEFAULT_CUSTOMIZER_SETTINGS.popup.secondaryButtonUrl),
      expiryDate: incoming.popup?.expiryDate !== undefined ? incoming.popup.expiryDate : (current.popup?.expiryDate ?? DEFAULT_CUSTOMIZER_SETTINGS.popup.expiryDate),
      delaySeconds: typeof incoming.popup?.delaySeconds === "number" ? Math.max(0, incoming.popup.delaySeconds) : (current.popup?.delaySeconds ?? DEFAULT_CUSTOMIZER_SETTINGS.popup.delaySeconds),
    },
    storyMilestones: Array.isArray(incoming.storyMilestones) && incoming.storyMilestones.length > 0
      ? incoming.storyMilestones.map((m, idx) => ({
          id: m.id || `milestone-${idx + 1}`,
          year: m.year?.trim() || "1994",
          category: m.category?.trim() || "Grassroots Journey",
          title: m.title?.trim() || "Milestone Title",
          description: m.description?.trim() || "Milestone Description",
          image: m.image?.trim() || "/images/bsgss/banners/589-banner-1.webp",
          imageAlt: m.imageAlt?.trim() || m.title || "BSGSS milestone",
          location: m.location?.trim() || "North India",
        }))
      : (current.storyMilestones || DEFAULT_CUSTOMIZER_SETTINGS.storyMilestones),
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

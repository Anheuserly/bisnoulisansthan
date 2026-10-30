import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { getCustomizerSettings } from "@/lib/customizer/get-customizer-settings";
import { DEFAULT_CUSTOMIZER_SETTINGS, type CustomizerCertificateConfig } from "@/config/customizer";

export async function GET() {
  const actor = await getCurrentAdmin();
  if (!actor) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  const settings = await getCustomizerSettings();
  return NextResponse.json({ ok: true, certificate: settings.certificate });
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Database is not configured." }, { status: 503 });
  }

  const actor = await getCurrentAdmin();
  if (!actor || !["admin", "super_admin"].includes(actor.role)) {
    return NextResponse.json({ message: "Administrator permissions required." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as {
    certificate?: Partial<CustomizerCertificateConfig>;
    reset?: boolean;
  } | null;

  const current = await getCustomizerSettings();

  if (body?.reset) {
    const updated = {
      ...current,
      certificate: DEFAULT_CUSTOMIZER_SETTINGS.certificate,
    };

    await db.query(
      `INSERT INTO site_settings (setting_key, value, updated_by, updated_at)
       VALUES ('site_customizer', $1, $2, now())
       ON CONFLICT (setting_key)
       DO UPDATE SET value = EXCLUDED.value, updated_by = EXCLUDED.updated_by, updated_at = now();`,
      [JSON.stringify(updated), actor.id]
    );

    revalidatePath("/support", "layout");
    return NextResponse.json({
      ok: true,
      certificate: DEFAULT_CUSTOMIZER_SETTINGS.certificate,
      message: "Certificate settings restored to default templates.",
    });
  }

  const incoming = body?.certificate;
  if (!incoming || typeof incoming !== "object") {
    return NextResponse.json({ message: "Invalid certificate configuration provided." }, { status: 400 });
  }

  const mergedCert: CustomizerCertificateConfig = {
    logoUrl: String(incoming.logoUrl ?? current.certificate.logoUrl ?? "/images/bsgss/bsgss-emblem.png").trim(),
    logoPosition: incoming.logoPosition === "left" ? "left" : "top-center",
    signatoryName: String(incoming.signatoryName || current.certificate.signatoryName).trim(),
    signatoryRole: String(incoming.signatoryRole || current.certificate.signatoryRole).trim(),
    organizationName: String(incoming.organizationName || current.certificate.organizationName).trim(),
    signatureUrl: String(incoming.signatureUrl ?? current.certificate.signatureUrl ?? "").trim(),
    showDefaultSignatureSvg: incoming.showDefaultSignatureSvg !== undefined
      ? Boolean(incoming.showDefaultSignatureSvg)
      : current.certificate.showDefaultSignatureSvg,

    sealTitle: String(incoming.sealTitle || current.certificate.sealTitle).trim(),
    sealEstd: String(incoming.sealEstd || current.certificate.sealEstd).trim(),
    sealRegNo: String(incoming.sealRegNo || current.certificate.sealRegNo).trim(),
    sealBadges: String(incoming.sealBadges || current.certificate.sealBadges).trim(),
    stampUrl: String(incoming.stampUrl ?? current.certificate.stampUrl ?? "").trim(),
    showDefaultSealSvg: incoming.showDefaultSealSvg !== undefined
      ? Boolean(incoming.showDefaultSealSvg)
      : current.certificate.showDefaultSealSvg,

    legalRegText: String(incoming.legalRegText || current.certificate.legalRegText).trim(),
    darpanId: String(incoming.darpanId || current.certificate.darpanId).trim(),
    exemptionsText: String(incoming.exemptionsText || current.certificate.exemptionsText).trim(),
    officeAddressText: String(incoming.officeAddressText || current.certificate.officeAddressText).trim(),
    orgPan: String(incoming.orgPan || current.certificate.orgPan || "AAATB7832M").trim(),
    csrRegNo: String(incoming.csrRegNo || current.certificate.csrRegNo || "CSR00001405").trim(),
    showPanColumn: incoming.showPanColumn !== undefined
      ? Boolean(incoming.showPanColumn)
      : (current.certificate.showPanColumn ?? true),

    certificateTitle: String(incoming.certificateTitle || current.certificate.certificateTitle).trim(),
    certificateSubtitle: String(incoming.certificateSubtitle || current.certificate.certificateSubtitle).trim(),
    appreciationText: String(incoming.appreciationText || current.certificate.appreciationText).trim(),
    causeText: String(incoming.causeText || current.certificate.causeText).trim(),

    themeColor: (["navy", "emerald", "gold", "burgundy", "slate"].includes(incoming.themeColor as string)
      ? incoming.themeColor
      : current.certificate.themeColor) as any,
    fontFamily: (["formal", "sans", "serif"].includes(incoming.fontFamily as string)
      ? incoming.fontFamily
      : current.certificate.fontFamily) as any,

    serialFormat: (["prefix-padded", "prefix-number", "number-only"].includes(incoming.serialFormat as string)
      ? incoming.serialFormat
      : current.certificate.serialFormat) as any,
    serialPrefix: String(incoming.serialPrefix ?? current.certificate.serialPrefix ?? "BSGSS-2026-"),
    serialPadding: typeof incoming.serialPadding === "number"
      ? Math.max(1, Math.min(8, incoming.serialPadding))
      : current.certificate.serialPadding,
    nextSerialNumber: typeof incoming.nextSerialNumber === "number"
      ? incoming.nextSerialNumber
      : current.certificate.nextSerialNumber,
  };

  const updatedSettings = {
    ...current,
    certificate: mergedCert,
  };

  await db.query(
    `INSERT INTO site_settings (setting_key, value, updated_by, updated_at)
     VALUES ('site_customizer', $1, $2, now())
     ON CONFLICT (setting_key)
     DO UPDATE SET value = EXCLUDED.value, updated_by = EXCLUDED.updated_by, updated_at = now();`,
    [JSON.stringify(updatedSettings), actor.id]
  );

  try {
    revalidatePath("/support", "layout");
    revalidatePath("/admin/donations");
  } catch (revalErr) {
    console.warn("Revalidation non-fatal error:", revalErr);
  }

  return NextResponse.json({
    ok: true,
    certificate: mergedCert,
    message: "Certificate design and settings updated successfully.",
  });
}

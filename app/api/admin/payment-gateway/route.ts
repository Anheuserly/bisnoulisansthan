import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { getEasebuzzSettings, updateEasebuzzSettings } from "@/lib/payment/easebuzz";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const settings = await getEasebuzzSettings();
  return NextResponse.json({ ok: true, settings });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const updated = await updateEasebuzzSettings({
      isEnabled: body.isEnabled !== undefined ? Boolean(body.isEnabled) : undefined,
      environment: body.environment === "production" ? "production" : "test",
      merchantKey: typeof body.merchantKey === "string" ? body.merchantKey : undefined,
      salt: typeof body.salt === "string" ? body.salt : undefined,
      subMerchantId: typeof body.subMerchantId === "string" ? body.subMerchantId : undefined,
    });

    return NextResponse.json({ ok: true, message: "Easebuzz settings updated successfully", settings: updated });
  } catch (error) {
    console.error("Failed to update Easebuzz settings:", error);
    return NextResponse.json({ message: "Failed to save payment gateway settings" }, { status: 500 });
  }
}

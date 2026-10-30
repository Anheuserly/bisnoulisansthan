import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { getSmtpSettings, updateSmtpSettings } from "@/lib/mail/mailer";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const settings = await getSmtpSettings();
  // Mask password for security
  return NextResponse.json({
    ok: true,
    settings: {
      ...settings,
      hasPassword: Boolean(settings.password),
      password: settings.password ? "••••••••••••" : "",
    },
  });
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

    const updated = await updateSmtpSettings({
      host: typeof body.host === "string" ? body.host : undefined,
      port: typeof body.port === "number" ? body.port : undefined,
      secure: typeof body.secure === "boolean" ? body.secure : undefined,
      userEmail: typeof body.userEmail === "string" ? body.userEmail : undefined,
      password: typeof body.password === "string" && !body.password.startsWith("••••") ? body.password : undefined,
      fromName: typeof body.fromName === "string" ? body.fromName : undefined,
      fromEmail: typeof body.fromEmail === "string" ? body.fromEmail : undefined,
      adminNotificationEmail:
        typeof body.adminNotificationEmail === "string" ? body.adminNotificationEmail : undefined,
      isEnabled: typeof body.isEnabled === "boolean" ? body.isEnabled : undefined,
    });

    return NextResponse.json({
      ok: true,
      message: "SMTP webmail settings saved successfully in database.",
      settings: {
        ...updated,
        hasPassword: Boolean(updated.password),
        password: updated.password ? "••••••••••••" : "",
      },
    });
  } catch (error) {
    console.error("Failed to update SMTP settings:", error);
    return NextResponse.json({ message: "Failed to save SMTP settings" }, { status: 500 });
  }
}

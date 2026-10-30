import nodemailer from "nodemailer";
import { db } from "@/lib/db";

export interface SmtpSettings {
  id: string;
  host: string;
  port: number;
  secure: boolean;
  userEmail: string;
  password: string;
  fromName: string;
  fromEmail: string;
  adminNotificationEmail: string;
  isEnabled: boolean;
  updatedAt?: string;
}

export const DEFAULT_SMTP_SETTINGS: SmtpSettings = {
  id: "default",
  host: process.env.SMTP_HOST || "mail.bsgssindia.org",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE !== "false",
  userEmail: process.env.SMTP_USER || "donations@bsgssindia.org",
  password: process.env.SMTP_PASSWORD || "",
  fromName: process.env.SMTP_FROM_NAME || "Bisnouli Sarvodaya Gramodyog Sewa Sansthan",
  fromEmail: process.env.SMTP_FROM_EMAIL || "donations@bsgssindia.org",
  adminNotificationEmail: process.env.ADMIN_ALERT_EMAIL || "admin@bsgssindia.org",
  isEnabled: true,
};

export async function getSmtpSettings(): Promise<SmtpSettings> {
  if (!process.env.DATABASE_URL) {
    return DEFAULT_SMTP_SETTINGS;
  }

  try {
    const { rows } = await db.query<{
      id: string;
      host: string;
      port: number;
      secure: boolean;
      user_email: string;
      password: string;
      from_name: string;
      from_email: string;
      admin_notification_email: string;
      is_enabled: boolean;
      updated_at: string;
    }>(
      `SELECT id, host, port, secure, user_email, password, from_name, from_email, admin_notification_email, is_enabled, updated_at
       FROM smtp_settings
       WHERE id = 'default'
       LIMIT 1`
    );

    if (rows[0]) {
      const row = rows[0];
      return {
        id: row.id,
        host: row.host || DEFAULT_SMTP_SETTINGS.host,
        port: row.port || DEFAULT_SMTP_SETTINGS.port,
        secure: row.secure,
        userEmail: row.user_email || DEFAULT_SMTP_SETTINGS.userEmail,
        password: row.password || DEFAULT_SMTP_SETTINGS.password,
        fromName: row.from_name || DEFAULT_SMTP_SETTINGS.fromName,
        fromEmail: row.from_email || DEFAULT_SMTP_SETTINGS.fromEmail,
        adminNotificationEmail: row.admin_notification_email || DEFAULT_SMTP_SETTINGS.adminNotificationEmail,
        isEnabled: row.is_enabled,
        updatedAt: row.updated_at,
      };
    }
  } catch (err) {
    console.warn("Could not load SMTP settings from DB, using defaults:", err);
  }

  return DEFAULT_SMTP_SETTINGS;
}

export async function updateSmtpSettings(settings: Partial<SmtpSettings>): Promise<SmtpSettings> {
  const current = await getSmtpSettings();

  const host = (settings.host ?? current.host).trim();
  const port = Number(settings.port) || current.port;
  const secure = settings.secure !== undefined ? Boolean(settings.secure) : current.secure;
  const userEmail = (settings.userEmail ?? current.userEmail).trim();
  const password = settings.password !== undefined ? settings.password.trim() : current.password;
  const fromName = (settings.fromName ?? current.fromName).trim();
  const fromEmail = (settings.fromEmail ?? current.fromEmail).trim();
  const adminNotificationEmail = (settings.adminNotificationEmail ?? current.adminNotificationEmail).trim();
  const isEnabled = settings.isEnabled !== undefined ? Boolean(settings.isEnabled) : current.isEnabled;

  await db.query(
    `INSERT INTO smtp_settings (
      id, host, port, secure, user_email, password, from_name, from_email, admin_notification_email, is_enabled, updated_at
    ) VALUES (
      'default', $1, $2, $3, $4, $5, $6, $7, $8, $9, now()
    )
    ON CONFLICT (id) DO UPDATE SET
      host = EXCLUDED.host,
      port = EXCLUDED.port,
      secure = EXCLUDED.secure,
      user_email = EXCLUDED.user_email,
      password = CASE WHEN EXCLUDED.password <> '' THEN EXCLUDED.password ELSE smtp_settings.password END,
      from_name = EXCLUDED.from_name,
      from_email = EXCLUDED.from_email,
      admin_notification_email = EXCLUDED.admin_notification_email,
      is_enabled = EXCLUDED.is_enabled,
      updated_at = now()`,
    [host, port, secure, userEmail, password, fromName, fromEmail, adminNotificationEmail, isEnabled]
  );

  return {
    id: "default",
    host,
    port,
    secure,
    userEmail,
    password: password || current.password,
    fromName,
    fromEmail,
    adminNotificationEmail,
    isEnabled,
  };
}

function createTransporter(settings: SmtpSettings) {
  if (!settings.password) {
    return null;
  }

  return nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: {
      user: settings.userEmail,
      pass: settings.password,
    },
    tls: {
      rejectUnauthorized: false, // Prevents self-signed cert issues on custom webmail VPS
    },
  });
}

/**
 * Dispatches automated 80G tax exemption certificate email to donor
 */
export async function sendDonationCertificateEmail(params: {
  donorEmail: string;
  donorName: string;
  amount: string | number;
  certificateNumber: string;
  certificateUrl: string;
  donorPan?: string | null;
  donorGst?: string | null;
  paymentReference?: string;
  issuedAt?: string;
}): Promise<boolean> {
  try {
    const settings = await getSmtpSettings();
    if (!settings.isEnabled || !settings.password) {
      console.log("[Mailer Mock] SMTP password not set yet. Simulated email to:", params.donorEmail);
      return true;
    }

    const transporter = createTransporter(settings);
    if (!transporter) return false;

    const formattedAmount = Number(params.amount).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });

    const dateStr = params.issuedAt
      ? new Date(params.issuedAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f5f0; margin: 0; padding: 20px; color: #1c2b2d; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 14px; border: 1px solid #e2ded5; overflow: hidden; }
          .header { background: #0f3d2e; padding: 28px 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
          .header p { margin: 6px 0 0; font-size: 12px; color: #a3e6cd; }
          .content { padding: 28px 24px; }
          .greeting { font-size: 16px; font-weight: 600; margin-bottom: 12px; }
          .statutory-card { background: #fcfbf8; border: 1px solid #e7e2d6; border-radius: 10px; padding: 18px; margin: 20px 0; }
          .stat-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed #e7e2d6; font-size: 13px; }
          .stat-row:last-child { border-bottom: none; }
          .stat-label { color: #64748b; font-weight: 500; }
          .stat-val { font-weight: 700; color: #0f3d2e; font-family: monospace; }
          .btn-container { text-align: center; margin: 30px 0 20px; }
          .btn { background: #0f3d2e; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 700; display: inline-block; }
          .footer { background: #f9f8f5; border-top: 1px solid #ede9e0; padding: 18px 24px; font-size: 11px; color: #64748b; text-align: center; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Bisnouli Sarvodaya Gramodyog Sewa Sansthan</h1>
            <p>Govt. Registered Voluntary Society • Established 1994</p>
          </div>
          <div class="content">
            <div class="greeting">Dear ${params.donorName},</div>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">
              Thank you with deepest heartfelt gratitude for your generous voluntary contribution of <strong>${formattedAmount}</strong> towards our community healthcare, rural clinics, women empowerment, and vocational training initiatives.
            </p>
            <p style="font-size: 13px; color: #475569;">
              Your official numbered <strong>Donation Acknowledgement &amp; Section 80G Tax Exemption Certificate</strong> has been approved and issued.
            </p>

            <div class="statutory-card">
              <div class="stat-row">
                <span class="stat-label">Receipt / Certificate Number</span>
                <span class="stat-val">${params.certificateNumber}</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">Contribution Amount</span>
                <span class="stat-val" style="color: #047857;">${formattedAmount}</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">BSGSS Org PAN</span>
                <span class="stat-val">AAATB7832M</span>
              </div>
              ${
                params.donorPan
                  ? `<div class="stat-row">
                      <span class="stat-label">Donor PAN (Statutory)</span>
                      <span class="stat-val">${params.donorPan}</span>
                    </div>`
                  : params.donorGst
                  ? `<div class="stat-row">
                      <span class="stat-label">Donor GSTIN</span>
                      <span class="stat-val">${params.donorGst}</span>
                    </div>`
                  : ""
              }
              <div class="stat-row">
                <span class="stat-label">Tax Benefit</span>
                <span class="stat-val" style="color: #047857;">Section 80G Tax Deductible</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">Date of Issue</span>
                <span class="stat-val">${dateStr}</span>
              </div>
              ${
                params.paymentReference
                  ? `<div class="stat-row">
                      <span class="stat-label">Transaction Reference</span>
                      <span class="stat-val">${params.paymentReference}</span>
                    </div>`
                  : ""
              }
            </div>

            <div class="btn-container">
              <a href="${params.certificateUrl}" class="btn" target="_blank">
                View &amp; Print Official 80G Certificate
              </a>
            </div>

            <p style="font-size: 12px; color: #64748b; text-align: center;">
              You can access, verify authenticity, or print your certificate at any time by visiting <a href="${params.certificateUrl}" style="color: #0f3d2e; font-weight: 600;">${params.certificateUrl}</a>.
            </p>
          </div>

          <div class="footer">
            <strong>Bisnouli Sarvodaya Gramodyog Sewa Sansthan (BSGSS)</strong><br>
            Head Office: A-171, Ground Floor, Defence Colony, New Delhi - 110024<br>
            Email: donations@bsgssindia.org | Web: bsgssindia.org<br>
            <em>Registered under Societies Registration Act XXI of 1860 • NITI Aayog Darpan: DL/2016/0111645</em>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"${settings.fromName}" <${settings.fromEmail}>`,
      to: params.donorEmail,
      replyTo: settings.fromEmail,
      subject: `Official 80G Donation Certificate [${params.certificateNumber}] - BSGSS`,
      html: htmlContent,
    });

    console.log(`[Mailer] 80G Certificate email sent successfully to ${params.donorEmail} for ${params.certificateNumber}`);
    return true;
  } catch (error) {
    console.error("[Mailer] Failed to send certificate email:", error);
    return false;
  }
}

/**
 * Sends admin alert email to admin@bsgssindia.org whenever a donation arrives
 */
export async function sendAdminDonationAlert(params: {
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: string | number;
  paymentMethod: string;
  paymentReference: string;
  donorPan?: string | null;
  certificateNumber?: string | null;
}): Promise<boolean> {
  try {
    const settings = await getSmtpSettings();
    if (!settings.isEnabled || !settings.password) {
      console.log("[Mailer Mock] SMTP not configured. Simulated admin alert to:", settings.adminNotificationEmail);
      return true;
    }

    const transporter = createTransporter(settings);
    if (!transporter) return false;

    const formattedAmount = Number(params.amount).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 580px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f3d2e; margin-top: 0;">New Donation Contribution Received</h2>
        <p>A new voluntary donation has been recorded on BSGSS portal:</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">Donor:</td><td style="padding: 6px; border-bottom: 1px solid #eee;">${params.donorName} (${params.donorEmail})</td></tr>
          <tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td><td style="padding: 6px; border-bottom: 1px solid #eee;">${params.donorPhone || "N/A"}</td></tr>
          <tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">Amount:</td><td style="padding: 6px; font-weight: bold; color: #047857; border-bottom: 1px solid #eee;">${formattedAmount}</td></tr>
          <tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">Method:</td><td style="padding: 6px; border-bottom: 1px solid #eee;">${params.paymentMethod.toUpperCase()}</td></tr>
          <tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">Reference:</td><td style="padding: 6px; font-family: monospace; border-bottom: 1px solid #eee;">${params.paymentReference}</td></tr>
          <tr><td style="padding: 6px; font-weight: bold; border-bottom: 1px solid #eee;">Donor PAN:</td><td style="padding: 6px; font-family: monospace; border-bottom: 1px solid #eee;">${params.donorPan || "N/A"}</td></tr>
          <tr><td style="padding: 6px; font-weight: bold;">Certificate:</td><td style="padding: 6px; font-weight: bold; color: #0f3d2e;">${params.certificateNumber || "Pending Issuance"}</td></tr>
        </table>
        <p style="margin-top: 20px; font-size: 12px; color: #64748b;">
          Log into <a href="https://bisnoulisansthan.in/admin/donations">BSGSS Control Centre</a> to review or manage.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${settings.fromName}" <${settings.fromEmail}>`,
      to: settings.adminNotificationEmail,
      subject: `[Donation Received] ${formattedAmount} from ${params.donorName}`,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error("[Mailer] Failed to send admin donation alert:", error);
    return false;
  }
}

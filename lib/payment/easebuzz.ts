import crypto from "crypto";
import { db } from "@/lib/db";

export interface EasebuzzSettings {
  id: string;
  gatewayName: string;
  isEnabled: boolean;
  environment: "test" | "production";
  merchantKey: string;
  salt: string;
  subMerchantId?: string;
  updatedAt?: string;
}

export const DEFAULT_EASEBUZZ_SETTINGS: EasebuzzSettings = {
  id: "easebuzz",
  gatewayName: "Easebuzz",
  isEnabled: true,
  environment: "test",
  merchantKey: process.env.EASEBUZZ_KEY || "2PBP7IABZ2",
  salt: process.env.EASEBUZZ_SALT || "DAHCCN8GY9",
  subMerchantId: process.env.EASEBUZZ_SUB_MERCHANT_ID || "",
};

export async function getEasebuzzSettings(): Promise<EasebuzzSettings> {
  if (!process.env.DATABASE_URL) {
    return DEFAULT_EASEBUZZ_SETTINGS;
  }

  try {
    const { rows } = await db.query<{
      id: string;
      gateway_name: string;
      is_enabled: boolean;
      environment: "test" | "production";
      merchant_key: string;
      salt: string;
      sub_merchant_id: string | null;
      updated_at: string;
    }>(
      `SELECT id, gateway_name, is_enabled, environment, merchant_key, salt, sub_merchant_id, updated_at
       FROM payment_gateway_settings
       WHERE id = 'easebuzz'
       LIMIT 1`
    );

    if (rows[0]) {
      const row = rows[0];
      return {
        id: row.id,
        gatewayName: row.gateway_name,
        isEnabled: row.is_enabled,
        environment: row.environment,
        merchantKey: row.merchant_key || process.env.EASEBUZZ_KEY || DEFAULT_EASEBUZZ_SETTINGS.merchantKey,
        salt: row.salt || process.env.EASEBUZZ_SALT || DEFAULT_EASEBUZZ_SETTINGS.salt,
        subMerchantId: row.sub_merchant_id || "",
        updatedAt: row.updated_at,
      };
    }
  } catch (err) {
    console.warn("Could not load Easebuzz settings from DB, using fallback:", err);
  }

  return DEFAULT_EASEBUZZ_SETTINGS;
}

export async function updateEasebuzzSettings(settings: Partial<EasebuzzSettings>): Promise<EasebuzzSettings> {
  const current = await getEasebuzzSettings();

  const isEnabled = settings.isEnabled !== undefined ? Boolean(settings.isEnabled) : current.isEnabled;
  const environment = settings.environment === "production" ? "production" : "test";
  const merchantKey = (settings.merchantKey ?? current.merchantKey).trim();
  const salt = (settings.salt ?? current.salt).trim();
  const subMerchantId = (settings.subMerchantId ?? current.subMerchantId ?? "").trim();

  await db.query(
    `INSERT INTO payment_gateway_settings (
      id, gateway_name, is_enabled, environment, merchant_key, salt, sub_merchant_id, updated_at
    ) VALUES (
      'easebuzz', 'Easebuzz', $1, $2, $3, $4, $5, now()
    )
    ON CONFLICT (id) DO UPDATE SET
      is_enabled = EXCLUDED.is_enabled,
      environment = EXCLUDED.environment,
      merchant_key = EXCLUDED.merchant_key,
      salt = EXCLUDED.salt,
      sub_merchant_id = EXCLUDED.sub_merchant_id,
      updated_at = now()`,
    [isEnabled, environment, merchantKey, salt, subMerchantId]
  );

  return {
    id: "easebuzz",
    gatewayName: "Easebuzz",
    isEnabled,
    environment,
    merchantKey,
    salt,
    subMerchantId,
  };
}

/**
 * Calculates Easebuzz Payment Initiate Hash:
 * sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10|salt)
 */
export function generateEasebuzzInitiateHash(params: {
  key: string;
  txnid: string;
  amount: string; // Formatted e.g. "500.00"
  productinfo: string;
  firstname: string;
  email: string;
  salt: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  udf6?: string;
  udf7?: string;
  udf8?: string;
  udf9?: string;
  udf10?: string;
}): string {
  const hashString = [
    params.key,
    params.txnid,
    params.amount,
    params.productinfo,
    params.firstname,
    params.email,
    params.udf1 || "",
    params.udf2 || "",
    params.udf3 || "",
    params.udf4 || "",
    params.udf5 || "",
    params.udf6 || "",
    params.udf7 || "",
    params.udf8 || "",
    params.udf9 || "",
    params.udf10 || "",
    params.salt,
  ].join("|");

  return crypto.createHash("sha512").update(hashString).digest("hex");
}

/**
 * Calculates and verifies Easebuzz Response Reverse Hash:
 * sha512(salt|status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 */
export function verifyEasebuzzResponseHash(
  response: Record<string, string | undefined>,
  salt: string,
  key: string
): boolean {
  const status = response.status || "";
  const txnid = response.txnid || "";
  const amount = response.amount || "";
  const productinfo = response.productinfo || "";
  const firstname = response.firstname || "";
  const email = response.email || "";

  const udf1 = response.udf1 || "";
  const udf2 = response.udf2 || "";
  const udf3 = response.udf3 || "";
  const udf4 = response.udf4 || "";
  const udf5 = response.udf5 || "";
  const udf6 = response.udf6 || "";
  const udf7 = response.udf7 || "";
  const udf8 = response.udf8 || "";
  const udf9 = response.udf9 || "";
  const udf10 = response.udf10 || "";

  const responseHash = response.hash || "";

  const hashString = [
    salt,
    status,
    udf10,
    udf9,
    udf8,
    udf7,
    udf6,
    udf5,
    udf4,
    udf3,
    udf2,
    udf1,
    email,
    firstname,
    productinfo,
    amount,
    txnid,
    key,
  ].join("|");

  const calculatedHash = crypto.createHash("sha512").update(hashString).digest("hex");
  return calculatedHash.toLowerCase() === responseHash.toLowerCase();
}

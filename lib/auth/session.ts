import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export const SESSION_COOKIE = "bsgss_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

export type AdminRole = "super_admin" | "admin" | "editor";
export type CurrentAdmin = { id: string; email: string; displayName: string | null; role: AdminRole };

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("SESSION_SECRET must be at least 32 characters long.");
  return value;
}

function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("base64url"); }

export function sessionToken(adminId: string) {
  const payload = Buffer.from(JSON.stringify({ sub: adminId, exp: Date.now() + SESSION_MAX_AGE * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function sessionId(token: string | undefined) {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString()) as { sub?: string; exp?: number };
    return parsed.sub && parsed.exp && parsed.exp > Date.now() ? parsed.sub : null;
  } catch { return null; }
}

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const store = await cookies();
  const adminId = sessionId(store.get(SESSION_COOKIE)?.value);
  if (!adminId) return null;
  const { rows } = await db.query<CurrentAdmin>("SELECT id, email, display_name AS \"displayName\", role FROM users WHERE id = $1 AND is_active = true", [adminId]);
  return rows[0] ?? null;
}

export const sessionCookie = (value: string) => ({ name: SESSION_COOKIE, value, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: SESSION_MAX_AGE });
export const expiredSessionCookie = { name: SESSION_COOKIE, value: "", httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: 0 };

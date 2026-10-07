export function normaliseEmail(value: unknown) { return typeof value === "string" ? value.trim().toLowerCase() : ""; }

export function validPassword(value: unknown): value is string {
  return typeof value === "string" && value.length >= 12 && value.length <= 128;
}

export function validRole(value: unknown): value is "admin" | "editor" {
  return value === "admin" || value === "editor";
}

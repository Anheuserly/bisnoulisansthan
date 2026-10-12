import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import pg from "pg";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, KEY_LENGTH);
  return `scrypt$${salt}$${derived.toString("hex")}`;
}

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const newPassword = process.argv[2] || "Bisnouli@2026";

if (newPassword.length < 12) {
  console.error("Password must be at least 12 characters long.");
  process.exit(1);
}

const client = new pg.Client({
  connectionString: dbUrl,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

async function main() {
  await client.connect();
  console.log("Connected to database.");

  const hash = await hashPassword(newPassword);

  const res = await client.query(
    "UPDATE users SET password_hash = $1, is_active = true, updated_at = now() WHERE email IN ('shubham.arc11@gmail.com', 'pawan@scsi.in') RETURNING email, display_name, role;",
    [hash]
  );

  console.log("Updated users count:", res.rowCount);
  console.log("Updated rows:", res.rows);

  await client.end();
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});

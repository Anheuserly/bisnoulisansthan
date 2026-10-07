import { readFile } from "node:fs/promises";
import path from "node:path";
import pg from "pg";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required. Add it to .env.local before running db:init.");

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
const schema = await readFile(path.join(process.cwd(), "lib/db/schema.sql"), "utf8");
const initialUser = {
  email: (process.env.INITIAL_SUPER_ADMIN_EMAIL ?? "shubham.arc11@gmail.com").trim().toLowerCase(),
  name: process.env.INITIAL_SUPER_ADMIN_NAME ?? "SHUBHAM KUMAR",
};
const additionalUsers = (process.env.ADDITIONAL_SUPER_ADMINS ?? "pawan@scsi.in|PAWAN")
  .split(",")
  .map((entry) => {
    const [email, name] = entry.trim().split("|");
    return { email: email?.trim().toLowerCase(), name: name?.trim() || null };
  })
  .filter((user) => user.email);

await client.connect();
try {
  await client.query(schema);
  await client.query(
    "INSERT INTO users (email, display_name, role) VALUES ($1, $2, 'super_admin') ON CONFLICT (email) DO UPDATE SET display_name = EXCLUDED.display_name, role = EXCLUDED.role, is_active = true",
    [initialUser.email, initialUser.name],
  );
  for (const user of additionalUsers) {
    await client.query(
      "INSERT INTO users (email, display_name, role) VALUES ($1, $2, 'super_admin') ON CONFLICT (email) DO UPDATE SET display_name = EXCLUDED.display_name, role = EXCLUDED.role, is_active = true",
      [user.email, user.name],
    );
  }
  console.log(`Users table ready. ${[initialUser, ...additionalUsers].map((user) => user.email).join(", ")} are seeded as super_admins.`);
} finally { await client.end(); }

import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

const globalForDb = globalThis as unknown as { bsgssPool?: Pool };

export const db = globalForDb.bsgssPool ?? new Pool({
  connectionString,
});

if (process.env.NODE_ENV !== "production") globalForDb.bsgssPool = db;

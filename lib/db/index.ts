import { Pool } from "pg";

const rawConnStr = process.env.DATABASE_URL;
const connectionString = rawConnStr ? rawConnStr.replace(/^["']|["']$/g, "").trim() : undefined;
const ssl =
  process.env.DATABASE_SSL === "true"
    ? { rejectUnauthorized: false }
    : false;

const globalForDb = globalThis as unknown as { bsgssPool?: Pool };

export const db =
  globalForDb.bsgssPool ??
  new Pool({
    connectionString,
    ssl,
  });

if (process.env.NODE_ENV !== "production") globalForDb.bsgssPool = db;

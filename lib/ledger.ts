import fs from "node:fs";
import path from "node:path";

export interface LedgerItem {
  label: string;
  amount: number;
}

export interface LedgerMonthRaw {
  month: string; // Format: "YYYY-MM"
  currency: string;
  summary: string;
  income: LedgerItem[];
  expenses: LedgerItem[];
  receiptsPdf?: string;
  verifiedBy?: string;
  isSample?: boolean;
}

export interface LedgerMonthComputed extends LedgerMonthRaw {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  adminExpenses: number;
  adminRatio: number; // percentage rounded to 1 decimal place
  formattedMonth: string;
  fileModifiedDate: string; // ISO date string
  isStale: boolean;
  daysSinceMonthEnd: number;
}

export interface LedgerOverview {
  months: LedgerMonthComputed[];
  latestMonth: LedgerMonthComputed | null;
  lastUpdatedDate: string;
  hasSampleData: boolean;
  isStale: boolean;
}

export function computeLedgerStats(
  raw: LedgerMonthRaw,
  fileModifiedDate?: string,
  nowTimestamp: number = Date.now()
): LedgerMonthComputed {
  const totalIncome = raw.income.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const totalExpenses = raw.expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const netSavings = totalIncome - totalExpenses;

  // Derive admin expenses: matches labels mentioning admin, compliance, management, overhead
  const adminExpenses = raw.expenses
    .filter((item) => /admin|compliance|management|overhead/i.test(item.label))
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const adminRatio = totalExpenses > 0 ? Math.round((adminExpenses / totalExpenses) * 1000) / 10 : 0;

  // Format month name (e.g. "2026-03" -> "March 2026")
  const [yearStr, monthStr] = (raw.month || "2026-01").split("-");
  const year = parseInt(yearStr || "2026", 10);
  const monthNum = parseInt(monthStr || "1", 10);
  const dateObj = new Date(Date.UTC(year, monthNum - 1, 1));
  const formattedMonth = dateObj.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  // Calculate days since end of the reporting month
  const lastDayOfMonth = new Date(Date.UTC(year, monthNum, 0, 23, 59, 59));
  const daysSinceMonthEnd = Math.max(
    0,
    Math.floor((nowTimestamp - lastDayOfMonth.getTime()) / (1000 * 60 * 60 * 24))
  );

  // Staleness guard: older than 45 days
  const isStale = daysSinceMonthEnd > 45;
  const defaultIso = new Date(nowTimestamp).toISOString().split("T")[0] || "2026-03-31";

  return {
    ...raw,
    totalIncome,
    totalExpenses,
    netSavings,
    adminExpenses,
    adminRatio,
    formattedMonth,
    fileModifiedDate: fileModifiedDate || defaultIso,
    isStale,
    daysSinceMonthEnd,
  };
}

const DEFAULT_LEDGER_DIR = path.join(process.cwd(), "content", "ledger");

export function getLedgerOverview(contentDir?: string): LedgerOverview {
  const baseDir = contentDir || DEFAULT_LEDGER_DIR;

  if (!fs.existsSync(/* turbopackIgnore: true */ baseDir)) {
    return {
      months: [],
      latestMonth: null,
      lastUpdatedDate: new Date().toISOString().split("T")[0] || "2026-03-31",
      hasSampleData: false,
      isStale: false,
    };
  }

  const files = fs
    .readdirSync(/* turbopackIgnore: true */ baseDir)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .reverse();

  let latestFileMtime = "";
  const months: LedgerMonthComputed[] = [];

  for (const file of files) {
    const fullPath = path.join(/* turbopackIgnore: true */ baseDir, file);
    try {
      const stats = fs.statSync(/* turbopackIgnore: true */ fullPath);
      const mtimeIso = stats.mtime.toISOString().split("T")[0] || "2026-03-31";
      if (!latestFileMtime) {
        latestFileMtime = mtimeIso;
      }
      const rawContent = fs.readFileSync(/* turbopackIgnore: true */ fullPath, "utf-8");
      const parsed: LedgerMonthRaw = JSON.parse(rawContent);
      months.push(computeLedgerStats(parsed, mtimeIso));
    } catch (err) {
      console.warn(`Error reading ledger file ${file}:`, err);
    }
  }

  const latestMonth = months[0] || null;
  const hasSampleData = months.some((m) => m.isSample);
  const isStale = latestMonth ? latestMonth.isStale : false;

  return {
    months,
    latestMonth,
    lastUpdatedDate: latestFileMtime || (latestMonth ? latestMonth.month : "2026-03-31"),
    hasSampleData,
    isStale,
  };
}

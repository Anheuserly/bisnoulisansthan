import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { computeLedgerStats, getLedgerOverview } from "../lib/ledger.ts";

test("Phase 2 - Totals equal the exact sum of JSON line items", () => {
  const sample = {
    month: "2026-03",
    currency: "INR",
    summary: "Test month",
    income: [
      { label: "Individual donations", amount: 210000 },
      { label: "CSR contribution", amount: 180000 },
    ],
    expenses: [
      { label: "Skill training", amount: 210000 },
      { label: "Health camps", amount: 90000 },
      { label: "Stipends", amount: 60000 },
      { label: "Admin & compliance", amount: 60000 },
    ],
  };

  const computed = computeLedgerStats(sample, "2026-03-31", new Date("2026-04-10").getTime());

  // Income sum: 210000 + 180000 = 390000
  assert.equal(computed.totalIncome, 390000);
  // Expenses sum: 210000 + 90000 + 60000 + 60000 = 420000
  assert.equal(computed.totalExpenses, 420000);
  // Net savings: 390000 - 420000 = -30000
  assert.equal(computed.netSavings, -30000);
});

test("Phase 2 - Admin ratio is derived dynamically, never hardcoded", () => {
  const sample = {
    month: "2026-03",
    currency: "INR",
    summary: "Test admin ratio",
    income: [{ label: "Individual donations", amount: 100000 }],
    expenses: [
      { label: "Direct Field Program", amount: 80000 },
      { label: "Admin & compliance", amount: 20000 },
    ],
  };

  const computed = computeLedgerStats(sample, "2026-03-31", new Date("2026-04-10").getTime());

  // Total expenses = 100000, Admin = 20000 -> 20.0%
  assert.equal(computed.adminExpenses, 20000);
  assert.equal(computed.adminRatio, 20);
});

test("Phase 2 - Staleness guard triggers when newest record is older than 45 days", () => {
  const marchData = {
    month: "2026-03",
    currency: "INR",
    summary: "March ledger",
    income: [],
    expenses: [],
  };

  // 10 days after end of March -> not stale
  const fresh = computeLedgerStats(marchData, "2026-03-31", new Date("2026-04-10").getTime());
  assert.equal(fresh.isStale, false);

  // 60 days after end of March -> stale (> 45 days)
  const stale = computeLedgerStats(marchData, "2026-03-31", new Date("2026-05-31").getTime());
  assert.equal(stale.isStale, true);
  assert.ok(stale.daysSinceMonthEnd > 45);
});

test("Phase 2 - Adding a new month file dynamically adds a row without code change", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "bsgss-ledger-test-"));

  try {
    fs.writeFileSync(
      path.join(tmpDir, "2026-01.json"),
      JSON.stringify({
        month: "2026-01",
        currency: "INR",
        summary: "January",
        income: [{ label: "General", amount: 50000 }],
        expenses: [{ label: "Ops", amount: 40000 }],
      })
    );

    let overview = getLedgerOverview(tmpDir);
    assert.equal(overview.months.length, 1);
    assert.equal(overview.latestMonth?.month, "2026-01");

    // Add another month file
    fs.writeFileSync(
      path.join(tmpDir, "2026-02.json"),
      JSON.stringify({
        month: "2026-02",
        currency: "INR",
        summary: "February",
        income: [{ label: "General", amount: 70000 }],
        expenses: [{ label: "Ops", amount: 50000 }],
      })
    );

    overview = getLedgerOverview(tmpDir);
    assert.equal(overview.months.length, 2);
    // Descending sort places February first
    assert.equal(overview.latestMonth?.month, "2026-02");
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("Phase 2 - Privacy: No individual donor names in files or output", () => {
  const overview = getLedgerOverview();
  const serialized = JSON.stringify(overview);

  // Verify generic category labels only
  for (const m of overview.months) {
    for (const item of m.income) {
      assert.ok(
        !/sharma|gupta|verma|kumar|singh|mr\.|mrs\.|dr\./i.test(item.label),
        `Found possible donor name in label: ${item.label}`
      );
    }
  }
});

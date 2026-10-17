import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { getSponsorTiers, getSponsorTierById } from "../lib/sponsor-tiers.ts";

test("Phase 3 - Sponsor tiers are loaded dynamically from JSON", () => {
  const tiers = getSponsorTiers();
  assert.ok(Array.isArray(tiers));
  assert.ok(tiers.length >= 4);

  const dayTier = tiers.find((t) => t.id === "one-day-training");
  assert.ok(dayTier);
  assert.equal(dayTier.amount, 300);
  assert.equal(dayTier.outcome, "1 training day");
  assert.ok(dayTier.covers.length > 0);
});

test("Phase 3 - Adding a tier in JSON requires zero code change", () => {
  const tmpFile = path.join(os.tmpdir(), `tiers-${Date.now()}.json`);
  try {
    fs.writeFileSync(
      tmpFile,
      JSON.stringify([
        {
          id: "custom-batch",
          title: "Custom Workshop Batch",
          amount: 25000,
          covers: "Materials and master trainer for 10 trainees.",
          outcome: "10 women trained",
          image: "/test.webp",
          active: true,
        },
      ])
    );

    const loaded = getSponsorTiers(tmpFile);
    assert.equal(loaded.length, 1);
    assert.equal(loaded[0].id, "custom-batch");
    assert.equal(loaded[0].amount, 25000);

    const fetched = getSponsorTierById("custom-batch", tmpFile);
    assert.ok(fetched);
    assert.equal(fetched.amount, 25000);
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
});

test("Phase 3 - Privacy: No invented beneficiary names in tiers or statements", () => {
  const tiers = getSponsorTiers();
  for (const tier of tiers) {
    // Assert no private names or individual beneficiaries
    assert.ok(
      !/sharma|gupta|verma|kumar|singh|priya|anita|sunita|rekha/i.test(tier.covers),
      `Found individual name in covers: ${tier.covers}`
    );
    assert.ok(
      !/sharma|gupta|verma|kumar|singh|priya|anita|sunita|rekha/i.test(tier.outcome),
      `Found individual name in outcome: ${tier.outcome}`
    );
  }
});

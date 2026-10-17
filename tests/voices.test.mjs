import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { getConsentedVoices } from "../lib/voices.ts";

test("Phase 4 - HARD GATE: strictly filters out entries with false or missing consent", () => {
  const tmpFile = path.join(os.tmpdir(), `voices-gate-${Date.now()}.json`);
  try {
    fs.writeFileSync(
      tmpFile,
      JSON.stringify([
        {
          id: "voice-allowed",
          name: "Sunita",
          village: "Bisnouli",
          photo: "/p1.webp",
          audio: "/a1.mp3",
          durationSec: 30,
          language: "hi",
          transcriptHi: "परीक्षण",
          transcriptEn: "Test",
          consentOnFile: true,
          year: 2025,
        },
        {
          id: "voice-rejected-false",
          name: "Rekha",
          village: "Dadri",
          photo: "/p2.webp",
          audio: "/a2.mp3",
          durationSec: 25,
          language: "hi",
          transcriptHi: "अमान्य",
          transcriptEn: "Invalid",
          consentOnFile: false,
          year: 2025,
        },
        {
          id: "voice-rejected-missing",
          name: "Pooja",
          village: "Noida",
          photo: "/p3.webp",
          audio: "/a3.mp3",
          durationSec: 20,
          language: "hi",
          transcriptHi: "अमान्य",
          transcriptEn: "Invalid",
          year: 2025,
        },
      ])
    );

    const consented = getConsentedVoices(tmpFile);
    assert.equal(consented.length, 1);
    assert.equal(consented[0].id, "voice-allowed");

    // Rejected IDs must never appear
    const ids = consented.map((c) => c.id);
    assert.ok(!ids.includes("voice-rejected-false"));
    assert.ok(!ids.includes("voice-rejected-missing"));
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
});

test("Phase 4 - Production voices catalog contains zero unconsented entries", () => {
  const voices = getConsentedVoices();
  assert.ok(voices.length > 0);

  for (const v of voices) {
    assert.equal(v.consentOnFile, true, `Entry ${v.id} lacks consentOnFile===true`);
    // First name only check (no spaces in name)
    assert.ok(!v.name.trim().includes(" "), `Name must be first name only: ${v.name}`);
    // Both transcripts must be non-empty strings
    assert.ok(v.transcriptHi.length > 10, `Missing transcriptHi in ${v.id}`);
    assert.ok(v.transcriptEn.length > 10, `Missing transcriptEn in ${v.id}`);
  }

  // Confirm the unverified test record in voices.json was filtered out
  const ids = voices.map((v) => v.id);
  assert.ok(!ids.includes("voice-004-unverified"));
});

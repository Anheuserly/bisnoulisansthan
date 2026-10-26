# Baseline Build & Health Metrics

Generated as part of **Phase 0 Reconnaissance** (Task 0.4).

---

## 1. Environment & Toolchain

- **Next.js Version:** `16.4.0` (Turbopack enabled)
- **React Version:** `19.0.0`
- **TypeScript:** `5.7.3` (Strict mode: enabled)
- **Node.js Runtime:** `v24.11.1`
- **Package Manager:** `npm 11.6.2` (via `package-lock.json`)
- **Operating System:** Darwin ARM64 (macOS 26.6.2)

---

## 2. Build Execution Metrics (`npm run build`)

```text
▲ Next.js 16.4.0 (Turbopack)
- Environments: .env
✓ Running next.config.ts took 10ms
✓ Compiled successfully in 1868ms
✓ Finished TypeScript in 670ms
✓ Collecting page data using 9 workers in 450ms
✓ Generating static pages using 9 workers (60/60) in 1220ms
✓ Finalizing page optimization in 4ms
```

---

## 3. Route Inventory (60 Routes)

| Type | Route Path | Rendering Mode |
|---|---|---|
| Page | `/` | Dynamic (`ƒ`) |
| Page | `/_not-found` | Static (`○`) |
| Page | `/about` | Dynamic (`ƒ`) |
| Page | `/about/legal-status` | Dynamic (`ƒ`) |
| Page | `/about/our-story` | Dynamic (`ƒ`) |
| Page | `/about/partners` | Dynamic (`ƒ`) |
| Page | `/about/partners/[partner]` | Dynamic (`ƒ`) |
| Page | `/activities` | Dynamic (`ƒ`) |
| Page | `/activities-under-state-central-government` | Dynamic (`ƒ`) |
| Page | `/activities/gallery` | Dynamic (`ƒ`) |
| Page | `/activities/key-programmes` | Dynamic (`ƒ`) |
| Page | `/activities/shg-products` | Dynamic (`ƒ`) |
| Page | `/activities/videos` | Dynamic (`ƒ`) |
| Page | `/activities/work-in-media` | Dynamic (`ƒ`) |
| Page | `/admin` | Dynamic (`ƒ`) |
| Page | `/admin/admins` | Dynamic (`ƒ`) |
| Page | `/admin/content` | Dynamic (`ƒ`) |
| Page | `/admin/customize` | Dynamic (`ƒ`) |
| Page | `/admin/donations` | Dynamic (`ƒ`) |
| Page | `/admin/inquiries` | Dynamic (`ƒ`) |
| Page | `/admin/join` | Dynamic (`ƒ`) |
| Page | `/admin/login` | Dynamic (`ƒ`) |
| Page | `/admin/setup` | Dynamic (`ƒ`) |
| Page | `/admin/theme` | Dynamic (`ƒ`) |
| API | `/api/admin/admins` | Dynamic (`ƒ`) |
| API | `/api/admin/change-password` | Dynamic (`ƒ`) |
| API | `/api/admin/customize` | Dynamic (`ƒ`) |
| API | `/api/admin/donations/[id]/verify` | Dynamic (`ƒ`) |
| API | `/api/admin/inquiries/[id]/status` | Dynamic (`ƒ`) |
| API | `/api/admin/join/[id]/status` | Dynamic (`ƒ`) |
| API | `/api/admin/login` | Dynamic (`ƒ`) |
| API | `/api/admin/logout` | Dynamic (`ƒ`) |
| API | `/api/admin/setup` | Dynamic (`ƒ`) |
| API | `/api/admin/theme` | Dynamic (`ƒ`) |
| API | `/api/contact` | Dynamic (`ƒ`) |
| API | `/api/customize` | Dynamic (`ƒ`) |
| API | `/api/donations` | Dynamic (`ƒ`) |
| API | `/api/join` | Dynamic (`ƒ`) |
| API | `/api/theme` | Dynamic (`ƒ`) |
| Page | `/contact` | Dynamic (`ƒ`) |
| Page | `/impact` | Dynamic (`ƒ`) |
| Page | `/join-us` | Dynamic (`ƒ`) |
| Page | `/management` | Dynamic (`ƒ`) |
| Page | `/our-work` | Dynamic (`ƒ`) |
| SEO | `/robots.txt` | Static (`○`) |
| SEO | `/sitemap.xml` | Static (`○`) |
| Page | `/sponsor` | Dynamic (`ƒ`) |
| Page | `/sponsor/receipt/[tier]` | Dynamic (`ƒ`) |
| Media | `/sponsor/receipt/[tier]/opengraph-image-17p6ul` | Dynamic (`ƒ`) |
| Page | `/stories` | Dynamic (`ƒ`) |
| Page | `/support` | Dynamic (`ƒ`) |
| Page | `/support/certificate/[id]` | Dynamic (`ƒ`) |
| Page | `/transparency` | Dynamic (`ƒ`) |

---

## 4. Warnings & Advisories Recorded

1. **Middleware Convention Warning:**
   ```text
   ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
   To migrate automatically, run: npx @next/codemod@canary middleware-to-proxy .
   ```
2. **Next.js Security Advisory:**
   ```text
   ⚠ Your version of Next.js is affected by a known security vulnerability.
   Recommendation: next upgrade --agent=security
   ```
3. **Node Typeless Package JSON Test Warnings:**
   ```text
   (node:12385) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///.../lib/audio-controller.ts is not specified and it doesn't parse as CommonJS. Reparsing as ES module.
   ```

---

## 5. Automated Test Baseline (`npm test`)

- **Total Test Suites:** 4 test files (`audio-controller`, `ledger`, `sponsor-tiers`, `voices`)
- **Total Tests:** 13
- **Passed:** 13
- **Failed:** 0
- **Duration:** 158.9 ms

---

## 6. TypeScript Typecheck Baseline (`npx tsc --noEmit`)

- **Errors:** 0
- **Time to emit:** ~670 ms

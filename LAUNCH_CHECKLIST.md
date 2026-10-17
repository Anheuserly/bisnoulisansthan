# Production Domain Launch & Post-DNS-Cutover Verification Checklist

This checklist documents the exact step-by-step verification commands to run once DNS records for `bisnoulisansthan.in` have cut over to the production deployment.

---

## 1. Automated Post-DNS-Cutover Curl Commands

Run these five diagnostic commands from any terminal:

### 1.1 Apex Domain Response & Security Headers
```bash
curl -I https://bisnoulisansthan.in
```
**Expected Output:**
- HTTP status `200 OK`
- `Content-Security-Policy-Report-Only`: present (in report-only mode)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- **CRITICAL**: Confirm that `X-Robots-Tag` is **ABSENT** on this production domain!

### 1.2 Production Robots.txt Verification
```bash
curl -s https://bisnoulisansthan.in/robots.txt
```
**Expected Output:**
```text
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /support/certificate/

Sitemap: https://bisnoulisansthan.in/sitemap.xml
```
- Disallows private administrative and API routes
- Disallows transactional donation receipts (`/support/certificate/`)
- References `https://bisnoulisansthan.in/sitemap.xml`
- **CRITICAL**: Confirm that `Disallow: /` and `X-Robots-Tag: noindex` are **ABSENT**!

### 1.3 Sitemap Index & Canonical Locs
```bash
curl -s https://bisnoulisansthan.in/sitemap.xml | head -50
```
**Expected Output:**
- Valid XML `<urlset>`
- Every `<loc>` begins strictly with `https://bisnoulisansthan.in/...`
- Zero occurrences of `.vercel.app` or localhost
- Includes all 18 core marketing routes and all 30 verified partner profile routes

### 1.4 Homepage Canonical Tag Verification
```bash
curl -s https://bisnoulisansthan.in/ | grep -i canonical
```
**Expected Output:**
```html
<link rel="canonical" href="https://bisnoulisansthan.in"/>
```
- The canonical points strictly to `https://bisnoulisansthan.in` (never a staging domain)

### 1.5 WWW to Apex Redirection (Canonical Apex Domain)
```bash
curl -I https://www.bisnoulisansthan.in
```
**Expected Output:**
- HTTP status `301 Moved Permanently` (or `308 Permanent Redirect`)
- `Location: https://bisnoulisansthan.in/`
- Verifies a single clean hop from `www` to apex without redirect loops

---

## 2. Google Search Console (GSC) & Multilateral Indexing Steps

1. **Verify Domain Property in Search Console**:
   - Add Domain property: `bisnoulisansthan.in` (DNS TXT verification method recommended).
   - Alternatively, verify URL-prefix property: `https://bisnoulisansthan.in/`.

2. **Submit Production Sitemap**:
   - Navigate to: **Index** > **Sitemaps**.
   - Submit: `https://bisnoulisansthan.in/sitemap.xml`.
   - Confirm status reports **Success** with all indexable routes discovered.

3. **Confirm Zero Noindex on Production**:
   - Use the **URL Inspection** tool on `https://bisnoulisansthan.in/`.
   - Confirm: "URL is available to Google" / "Crawl allowed: Yes" / "Indexing allowed: Yes".

4. **Verify Staging Domain Quarantine**:
   - Run: `curl -I https://bisnoulisansthan.vercel.app/`
   - Confirm response header includes: `X-Robots-Tag: noindex, nofollow`
   - Run: `curl -s https://bisnoulisansthan.vercel.app/robots.txt`
   - Confirm output is `User-agent: *\nDisallow: /`
   - This prevents duplicate content penalties and keeps staging completely out of search indexes.

---

## 3. Schema.org & Rich Results Validation

1. Open [Google Rich Results Test](https://search.google.com/test/rich-results).
2. Enter: `https://bisnoulisansthan.in/`.
3. Verify:
   - Valid **Organization / NGO** schema with verified NITI Aayog Darpan ID (`DL/2016/0111645`), MCA CSR-1 (`CSR00001405`), and Society Reg (`226/1994-95`).
   - Valid **WebSite** schema linked via `@id`.
   - 0 errors, 0 critical warnings.

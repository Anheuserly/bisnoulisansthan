# Production Domain Launch & Post-DNS-Cutover Verification Checklist

This checklist documents the exact step-by-step verification commands to run once DNS records for `www.bsgssindia.org` / `bsgssindia.org` have cut over to the production deployment.

---

## 1. Automated Post-DNS-Cutover Curl Commands

Run these five diagnostic commands from any terminal:

### 1.1 Apex Domain Response & Security Headers
```bash
curl -I https://www.bsgssindia.org
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
curl -s https://www.bsgssindia.org/robots.txt
```
**Expected Output:**
```text
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /support/certificate/

Sitemap: https://www.bsgssindia.org/sitemap.xml
```
- Disallows private administrative and API routes
- Disallows transactional donation receipts (`/support/certificate/`)
- References `https://www.bsgssindia.org/sitemap.xml`
- **CRITICAL**: Confirm that `Disallow: /` and `X-Robots-Tag: noindex` are **ABSENT**!

### 1.3 Sitemap Index & Canonical Locs
```bash
curl -s https://www.bsgssindia.org/sitemap.xml | head -50
```
**Expected Output:**
- Valid XML `<urlset>`
- Every `<loc>` begins strictly with `https://www.bsgssindia.org/...`

### 1.4 Homepage Canonical Tag Verification
```bash
curl -s https://www.bsgssindia.org/ | grep -i canonical
```
**Expected Output:**
```html
<link rel="canonical" href="https://www.bsgssindia.org"/>
```
- The canonical points strictly to `https://www.bsgssindia.org` (never a staging domain)

### 1.5 Subdomain / Apex Redirect Verification
```bash
curl -I https://bsgssindia.org
```
**Expected Output:**
- HTTP `301 Moved Permanently` or `308 Permanent Redirect`
- `Location: https://www.bsgssindia.org/`

---

## 2. Google Search Console Setup Protocol

Once DNS has propagated and curl checks pass:

1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property**:
   - Add Domain property: `bsgssindia.org` (DNS TXT verification method recommended).
   - Alternatively, verify URL-prefix property: `https://www.bsgssindia.org/`.
3. Add the DNS TXT verification token to DNS manager.
4. Once verified, navigate to **Sitemaps** in the left sidebar:
   - Submit: `https://www.bsgssindia.org/sitemap.xml`.
   - Verify status shows `Success` and all URLs are discovered.
5. In **URL Inspection**:
   - Use the **URL Inspection** tool on `https://www.bsgssindia.org/`.
   - Click **Request Indexing** for the homepage.

---

## 3. Verify Vercel / Cloudflare Staging Domain Has `noindex` Header

To ensure duplicate content penalties are avoided, verify the staging URL has `X-Robots-Tag: noindex, nofollow`:

```bash
curl -I https://bisnoulisansthan.vercel.app/
```
- Confirm `X-Robots-Tag: noindex, nofollow, noarchive` is present on non-production domains.

```bash
curl -s https://bisnoulisansthan.vercel.app/robots.txt
```
- Confirm returns `Disallow: /`.

---

## 4. Google Rich Results Test (JSON-LD Validation)

1. Open [Google Rich Results Test](https://search.google.com/test/rich-results).
2. Enter: `https://www.bsgssindia.org/`.
3. Verify that the following structured data schemas are detected with **0 errors**:
   - `NGO` / `Organization`
   - `BreadcrumbList`
   - `WebSite`
4. Confirm `name`, `taxID`, `foundingDate`, `address`, and `telephone` match statutory records.

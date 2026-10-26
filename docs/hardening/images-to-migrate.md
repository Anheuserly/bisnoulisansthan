# Inventory: Raw `<img>` Tags to Migrate to `next/image`

Generated as part of **Phase 0 Reconnaissance** (Task 0.3).

This inventory identifies every raw `<img>` tag across `app/` and `components/` for migration to `next/image` in Phase 2 (Task 2.1), including intrinsic sizing, aspect ratios, responsive `sizes`, and priority annotations for above-the-fold hero assets.

---

## Summary

- **Total raw `<img>` tags found:** 31
- **Public Marketing Pages (`app/(marketing)/**`):** 14
- **Public Shared Components (`components/**`):** 14
- **Admin Studio Components (`components/admin/**`):** 3

---

## 1. Public Marketing Pages (`app/(marketing)/**`)

| # | File Path | Line | Context / Asset Description | Migration Action (Phase 2) |
|---|---|---|---|---|
| 1 | `app/(marketing)/page.tsx` | 180 | Impact / Story featured preview card | Replace with `next/image`, supply width/height/sizes, `loading="lazy"` |
| 2 | `app/(marketing)/about/page.tsx` | 92 | About BSGSS organisational introduction image | Replace with `next/image`, supply width/height, `loading="lazy"` |
| 3 | `app/(marketing)/about/page.tsx` | 115 | Organisational profile cover / history preview | Replace with `next/image`, supply width/height, `loading="lazy"` |
| 4 | `app/(marketing)/our-work/page.tsx` | 65 | Programme pillar card image | Replace with `next/image`, supply width/height, `sizes="(max-width: 768px) 100vw, 50vw"` |
| 5 | `app/(marketing)/activities-under-state-central-government/page.tsx` | 149 | Government scheme initiative photo | Replace with `next/image`, supply width/height, `loading="lazy"` |
| 6 | `app/(marketing)/support/page.tsx` | 75 | Donation / Support page bank QR code preview | Replace with `next/image`, fixed intrinsic width/height (240x240) |
| 7 | `app/(marketing)/support/certificate/[id]/page.tsx` | 197 | 80G Certificate official seal / logo preview | Replace with `next/image`, fixed intrinsic width/height, crisp SVG/PNG rendering |
| 8 | `app/(marketing)/sponsor/page.tsx` | 110 | Sponsor tier banner / beneficiary photo | Replace with `next/image`, supply width/height, `loading="lazy"` |
| 9 | `app/(marketing)/activities/page.tsx` | 132 | Activities hub category showcase tile | Replace with `next/image`, supply width/height, `sizes="(max-width: 768px) 100vw, 33vw"` |
| 10 | `app/(marketing)/activities/work-in-media/page.tsx` | 65 | Newspaper clipping / media press thumbnail | Replace with `next/image`, supply width/height, `loading="lazy"` |
| 11 | `app/(marketing)/activities/key-programmes/page.tsx` | 55 | AMAR / Healthcare key programme card image | Replace with `next/image`, supply width/height, `loading="lazy"` |
| 12 | `app/(marketing)/activities/shg-products/page.tsx` | 326 | SHG handcrafted product grid thumbnail | Replace with `next/image`, supply width/height, `sizes="(max-width: 640px) 100vw, 25vw"` |
| 13 | `app/(marketing)/activities/shg-products/page.tsx` | 385 | SHG product modal primary image | Replace with `next/image`, supply width/height, aspect-ratio container |
| 14 | `app/(marketing)/activities/shg-products/page.tsx` | 402 | SHG product modal thumbnail selector | Replace with `next/image`, supply width/height (80x80) |

---

## 2. Public Shared Components (`components/**`)

| # | File Path | Line | Context / Asset Description | Migration Action (Phase 2) |
|---|---|---|---|---|
| 15 | `components/home/HomeHero.tsx` | 55 | Hero background / carousel slide image | Replace with `next/image`, `priority={true}` for first slide ONLY, `fill`, `sizes="100vw"` |
| 16 | `components/home/HomeMediaShowcase.tsx` | 104 | Media showcase primary documentary thumbnail | Replace with `next/image`, supply width/height, `loading="lazy"` |
| 17 | `components/home/HomeMediaShowcase.tsx` | 148 | Media showcase secondary clip thumbnail | Replace with `next/image`, supply width/height, `loading="lazy"` |
| 18 | `components/home/HomeMediaShowcase.tsx` | 203 | Media showcase partner video thumbnail | Replace with `next/image`, supply width/height, `loading="lazy"` |
| 19 | `components/home/HomePhotoCollage.tsx` | 93 | Homepage photo collage large feature item | Replace with `next/image`, supply width/height, `sizes="(max-width: 1024px) 100vw, 50vw"` |
| 20 | `components/home/HomePhotoCollage.tsx` | 192 | Homepage photo collage small grid item | Replace with `next/image`, supply width/height, `sizes="(max-width: 768px) 50vw, 25vw"` |
| 21 | `components/home/HomeManagementSection.tsx` | 153 | Leadership portrait (Patron / President) | Replace with `next/image`, fixed intrinsic width/height (120x120 or 200x200) |
| 22 | `components/home/HomeManagementSection.tsx` | 243 | Secretary / Executive portrait | Replace with `next/image`, fixed intrinsic width/height (120x120 or 200x200) |
| 23 | `components/layout/Logo.tsx` | 22 | Main brand logo in navigation header | Replace with `next/image`, `priority={true}`, fixed width/height (e.g. 48x48) |
| 24 | `components/gallery/InteractiveActivitiesGallery.tsx` | 164 | Field photo gallery grid image | Replace with `next/image`, supply width/height, `sizes="(max-width: 768px) 100vw, 33vw"` |
| 25 | `components/gallery/GalleryLightbox.tsx` | 207 | Full-screen lightbox active image | Replace with `next/image`, dynamic responsive sizing with fallback |
| 26 | `components/voice/VoiceCard.tsx` | 127 | Beneficiary voice portrait / avatar | Replace with `next/image`, fixed intrinsic width/height (64x64 or 80x80) |
| 27 | `components/activities/VideoGallery.tsx` | 76 | Featured video placeholder / facade image | Replace with `next/image`, supply width/height, `loading="lazy"` |
| 28 | `components/activities/VideoGallery.tsx` | 161 | Video playlist thumbnail item | Replace with `next/image`, fixed width/height (160x90) |

---

## 3. Admin Studio Components (`components/admin/**`)

| # | File Path | Line | Context / Asset Description | Migration Note |
|---|---|---|---|---|
| 29 | `components/admin/WebsiteCustomizerStudio.tsx` | 1332 | Photo manager preview item | Admin UI thumbnail (evaluate `next/image` vs standard avatar) |
| 30 | `components/admin/WebsiteCustomizerStudio.tsx` | 1434 | Slide manager preview thumbnail | Admin UI thumbnail |
| 31 | `components/admin/WebsiteCustomizerStudio.tsx` | 3249 | Theme / customizer asset preview | Admin UI thumbnail |

---

## Phase 2 Migration Acceptance Criteria

1. **Zero raw `<img>` tags** remaining in `app/(marketing)/**` and public `components/**`.
2. **`priority` flag restricted** to only:
   - `components/layout/Logo.tsx` (Header brand logo)
   - `components/home/HomeHero.tsx` (First hero slide only)
3. **Intrinsic aspect-ratio boxes** applied to prevent Cumulative Layout Shift (CLS target $\le$ 0.1).
4. **Responsive `sizes` attribute** provided on every non-fixed image to prevent downloading desktop-sized images on mobile devices.

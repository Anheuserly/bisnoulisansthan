# BSGSS complete website audit

**Audit date:** 18 October 2026  
**Scope:** all public BSGSS routes, shared UI, responsive navigation, forms, donation/certificate flow, administrative screens, content architecture, SEO, accessibility, performance and production readiness.  
**Boundary:** this is an audit only. No public-site design, routes, content or behaviour were changed as part of this report.

## Executive assessment

The site has a strong foundation: a consistent visual language, meaningful programme imagery, clear public journeys, a central content registry, structured metadata, security headers, an admin area and donation acknowledgement workflow. The highest-value next work is not a redesign. It is production hardening: protect public forms from spam, make submission fallbacks truthful, tighten public data lookup, standardise loading/error states and improve media delivery.

## Validation completed

- **Type safety:** `npx tsc --noEmit` passed.
- **Change hygiene:** `git diff --check` passed.
- **Dependency scan:** `npm audit --omit=dev` reported no known production dependency vulnerabilities.
- **Route inventory:** reviewed all 20 public route types, including dynamic partner and donation-certificate pages, plus every admin destination.

## Priority roadmap

| Priority | Theme | Why it matters | Recommendation |
| --- | --- | --- | --- |
| P0 | Public-form abuse protection | Contact, joining and donation endpoints accept public submissions; uncontrolled automated requests can create spam, database cost and staff workload. | Add server-side rate limiting, honeypot validation and a privacy-preserving bot challenge to every public write endpoint. |
| P0 | Truthful submission fallback | Current database-failure fallbacks can acknowledge a message or donation as logged even when it was not durably stored. | Return a clear temporary-unavailable response, or route to a real durable queue before confirming receipt. |
| P1 | Donor privacy | Donation lookup returns donor identity and contribution information to anyone who knows a matching reference. | Use a high-entropy lookup token or email verification; return only safe status information until the requester is verified. |
| P1 | Indexing and trust | Admin paths are currently not explicitly excluded in robots guidance; legal and privacy trust signals can be strengthened. | Add `noindex` for admin/setup pages, disallow `/admin/` in robots, and publish concise privacy/terms/data-use pages. |
| P1 | Resilience | There are no shared public `loading`, `error` or `not-found` routes. | Add branded recovery screens with one clear action, contact path and no dead end. |
| P1 | Performance | Many media cards use standard image elements and remote/external assets. | Move high-visibility imagery to responsive optimised delivery, define intrinsic sizes and reserve layout space. |
| P2 | Measurement | The current visitor journeys are clear but there is no described outcome measurement. | Add consent-aware anonymous event tracking for support, contact, join, search, map and video journeys. |
| P2 | Editorial governance | The content registry is a good start, but content quality rules need operational ownership. | Define review dates, source/credit fields, image-alt requirements and a publish checklist for every content item. |

## Route-by-route audit

### Shared header, mega menu, search, footer and quick actions

- **Strength:** Navigation, search, support action, social footer and quick contacts establish consistent conversion paths on every public page.
- **Improve:** Lock the desktop header to a tested width system: logo area, nav group and action group should have fixed flex-basis values so labels never wrap; on mobile, group sub-navigation under visible disclosure affordances.

### Home (`/`)

- **Strength:** The page gives a complete organisational narrative—hero, programmes, impact, footprint, partners, management and support—in a logical sequence.
- **Improve:** Add visible slide controls/pause to the image hero and use alternated section surfaces or subtle progress landmarks to make long scrolling easier to orient without changing the section order.

### About BSGSS (`/about`)

- **Strength:** Introduction, journey, mission and exploration links build credibility and make deeper content easy to discover.
- **Improve:** Use a stronger section bridge between the organisational introduction and the journey, such as a discreet timeline cue or image edge treatment; retain the same content and route choices.

### Our Story (`/about/our-story`)

- **Strength:** Milestones combine date, location, category, image and narrative evidence.
- **Improve:** Make the active/next milestone visually explicit with a persistent year marker and an accessible position announcement for keyboard and screen-reader users.

### Legal status (`/about/legal-status`)

- **Strength:** Compliance material is presented as an accessible trust destination rather than buried in the footer.
- **Improve:** Add document metadata—file type, size, date and a download/open icon—to every resource card, along with a last-reviewed date for confidence.

### Partners (`/about/partners`, `/about/partners/[partner]`)

- **Strength:** The partner index and detailed profiles recognise institutional support and connect it to programme locations/focus.
- **Improve:** Standardise logo-card sizing and add compact partner facts—programme focus, geography and relationship type—above long descriptions for faster scanning.

### Management (`/management`)

- **Strength:** Leadership messages humanise the institution and show clear accountability.
- **Improve:** Keep the existing card design but standardise portrait crop, name/role block height and quote line length so both profiles retain visual balance on all breakpoints.

### Our Work (`/our-work`)

- **Strength:** Four focused programme pillars make the main work areas easy to understand.
- **Improve:** Add a compact “Who this supports” or “Typical activity” line below each existing description; this increases specificity without adding pages or altering the grid.

### Activities index (`/activities`)

- **Strength:** The activity hub exposes programme pages, gallery, video, media, SHG products and government work from one place.
- **Improve:** Align icon blocks, text lengths and CTA baselines across all tiles so the card grid retains a professional catalogue appearance even as content evolves.

### Key Programmes (`/activities/key-programmes`)

- **Strength:** AMAR, healthcare and vocational training are presented as tangible, image-led initiatives.
- **Improve:** Add a small factual outcome tag below each focus label, such as “Self-help groups” or “Preventive care”; keep the current card order and content.

### Photo Gallery (`/activities/gallery`)

- **Strength:** The gallery presents authentic field imagery and provides evidence of programme participation.
- **Improve:** Use predictable thumbnail ratios, accessible captions on focus and a focused image viewer with an escape/close action; avoid changing the gallery’s content source or location.

### Video Gallery (`/activities/videos`)

- **Strength:** The primary player and scrollable “Up next” playlist follow a familiar media pattern and use the official channel.
- **Improve:** Expose active video state, duration where available, autoplay-next state and an explicit embedded-video fallback link so the experience remains clear if an embed is blocked.

### Work in Media (`/activities/work-in-media`)

- **Strength:** Public clippings substantiate BSGSS activity beyond self-published content.
- **Improve:** Standardise outlet, date, story label and full-view handling on every clipping. Press items will be easier to compare and more useful to CSR visitors.

### SHG Products (`/activities/shg-products`)

- **Strength:** The page connects handmade products directly to women-led livelihood activity.
- **Improve:** Make each existing inquiry action identical and include a neutral status label such as “Availability on enquiry”; do not turn the page into a different ecommerce flow.

### Government programmes (`/activities-under-state-central-government`)

- **Strength:** The page cleanly separates awareness, skills and welfare-related public-programme activity.
- **Improve:** Add a one-line support-type descriptor under each existing programme title to clarify the distinction before visitors read body copy.

### Impact (`/impact`)

- **Strength:** Outcome themes and the interactive India footprint translate programme records into a clear public impact story.
- **Improve:** Distinguish reported aggregate outcomes from programme-record counts in a compact legend, and announce selected state information accessibly when visitors use the map by keyboard.

### Support and donation certificate (`/support`, `/support/certificate/[id]`)

- **Strength:** Bank/UPI details, verification and certificate acknowledgement establish a transparent support path.
- **Improve:** Place a concise three-step explainer before the verification form—contribute, submit reference, receive verified acknowledgement—and limit certificate/status lookup output to verified requesters.

### Join Us (`/join-us`)

- **Strength:** Volunteer, internship, CSR, trainer and supporter pathways are clearly separated and supported by a guided form.
- **Improve:** Add an expected response-time or contact-method line to each option so applicants understand what happens after submitting without changing their pathway.

### Contact (`/contact`)

- **Strength:** Form, phone, email, WhatsApp, address and map give visitors multiple ways to reach the organisation.
- **Improve:** Add a concise privacy note and expected response time near submit; defer the map until a visitor requests it to reduce third-party loading and improve first-page speed.

### Admin login, setup and dashboard (`/admin/login`, `/admin/setup`, `/admin`)

- **Strength:** The control centre is separated from public content and admin pages use server-side access checks.
- **Improve:** Add noindex headers/metadata, explicit audit-log visibility for sensitive actions and a concise dashboard count of new submissions awaiting attention.

### Admin content, theme, donations, enquiries, join applications and users

- **Strength:** Operational tasks are separated into purpose-specific screens and theme controls are isolated from content operations.
- **Improve:** Standardise status chips, empty states, “last saved” feedback, date formatting and table-row actions; require an approval/preview step for theme and content changes that affect every public page.

## Accessibility audit

### Good foundations

- A skip link is available, headings are used throughout, reusable breadcrumbs include structured data, and major controls have labels.
- Mobile navigation has dialog semantics and focus-return logic, which is a solid basis for a usable menu.

### Improvements

- Add a visible focus style to all links/buttons, including image overlays, card links, footer icons and floating quick actions.
- Respect `prefers-reduced-motion` for hero changes, image scale effects, menus and gallery/video transitions.
- Do not use empty image alt text for content-bearing programme imagery; distinguish decorative media from evidence-bearing media in content governance.
- Ensure all form errors are announced through an assertive status region and move focus to an error summary after failed submission.
- Verify 4.5:1 contrast for muted text on sand/pale-teal surfaces and for every overlay on rotating hero imagery.

## SEO, discoverability and sharing audit

### Good foundations

- The site has a metadata base, descriptive page metadata, robots guidance, sitemap generation and organisation/breadcrumb structured data.
- Route naming is clear and reflects public intent: support, impact, activities, work and join are understandable search destinations.

### Improvements

- Add page-specific Open Graph/Twitter images and canonical URLs for every public route.
- Add `noindex` to `/admin/*`, `/admin/setup` and any future non-public certificate/lookup surfaces.
- Replace sitemap `lastModified: new Date()` with meaningful content publication/update timestamps; otherwise crawlers see every page as changed on every build.
- Add organisation contact, donation and FAQ schema only where facts are maintained and verified in the content registry.
- Add a public privacy page, terms/use policy and donation acknowledgement policy linked from the footer.

## Performance audit

### Good foundations

- Modern AVIF/WebP formats are enabled, local fonts use swap, external media is largely constrained to purpose-specific pages, and the site has a clear visual system.
- The video page starts with a preview rather than loading all video players at once.

### Improvements

- Convert high-traffic content images to responsive image components or at minimum supply width/height, `sizes`, lazy loading and image priority only for the true LCP hero image.
- Produce local optimised copies of externally hosted gallery assets where permission allows, rather than depending on a third-party origin for a central gallery.
- Reserve map/video/image dimensions to eliminate cumulative layout shift.
- Measure Web Vitals on mobile field traffic before changing layout; use the data to prioritise hero, map and media optimisation.

## Security and privacy audit

### Good foundations

- Content Security Policy, frame protection, HSTS, referrer policy, MIME protection and permissions policy are configured.
- Admin authentication uses signed, HTTP-only session cookies, server-side account lookup and password hashing; public inputs are length-limited and parameterised for database queries.
- Dependency scan returned no known production vulnerabilities at audit time.

### Improvements

- Add rate limits and bot protection to `/api/contact`, `/api/join` and `/api/donations`; log abuse events without retaining more personal data than necessary.
- Do not promise successful logging when a database write fails unless a durable alternate queue actually records the request.
- Require an opaque, high-entropy status token or email confirmation before exposing donor name, amount or certificate data through public lookup.
- Move table creation out of request handlers into explicit migrations/deployment setup. Runtime DDL can hide deployment failures and complicate permissions/auditing.
- Add a data-retention policy for enquiries, join applications and donation details, including who may access them and when they are deleted/anonymised.
- Verify all public error responses avoid exposing internal database/configuration detail in production.

## Content and operations audit

### Good foundations

- A central content registry already reduces copy/link duplication and makes cross-page consistency realistic.
- Partnership, impact, management, image and programme content gives the site stronger credibility than generic marketing copy.

### Improvements

- Assign an owner and review date to every impact statistic, partner profile, legal document, image, video and social profile.
- Require source, credit, alt text, location/context and consent status for each newly uploaded field image.
- Create a quarterly content review: remove stale partners, test all external social/document links, validate bank/UPI details and review programme numbers.
- Keep an editorial style guide for capitalisation, “programme/program”, date format, titles and CTA language.

## QA release checklist

- Test all public routes at mobile (360 px), tablet (768 px), laptop (1024 px) and wide desktop (1440 px); navigation labels must not wrap unexpectedly.
- Test keyboard-only completion of search, mega menu, support, contact, join, gallery viewer, video playlist, map and certificate lookup.
- Test valid/invalid public form submissions, repeated fast submissions and database-unavailable behaviour.
- Test the intended external journeys: map directions, YouTube, social links, email, telephone and WhatsApp.
- Validate the final production headers, robots, sitemap, canonical tags and noindex rules after deployment.
- Verify no personal donor/contact/application data is exposed by a guessed URL or reference.

## Recommended sequence

1. **Protect trust:** P0 form protection, durable submission handling and donor privacy.
2. **Protect discoverability:** admin noindex, meaningful sitemap dates, social previews and privacy policy.
3. **Protect quality:** shared error/loading/not-found states, accessibility checks and media optimisation.
4. **Polish consistently:** implement the page-by-page visual refinements in `UI_UX_IMPROVEMENT_AUDIT.md` using the existing components and content registry.

# BSGSS UI/UX improvement audit

## Purpose and boundary

This is a design-improvement checklist for the existing BSGSS website. It preserves the current visual concept, page order, navigation, page routes, content themes and primary actions. The recommendations improve clarity, consistency, responsiveness, accessibility and confidence without redesigning the product or changing how visitors complete a task.

Each item has exactly two points:

- **Current:** the useful element already present in the interface.
- **Suggestion:** a restrained improvement that keeps that element in the same place and with the same purpose.

## Site-wide design system

### Header and navigation

- **Current:** The logo, search, primary navigation and Support us action are all available in the header, with mega menus on large screens and a drawer on smaller screens.
- **Suggestion:** Keep this exact order, but use a single consistent 8–12 px gap between navigation links and reserve a fixed width for the logo/action areas. It prevents the menu from feeling crowded or wrapping at medium desktop widths.

### Search

- **Current:** Search opens an inline panel with useful suggested destination pages and remains available on all breakpoints.
- **Suggestion:** Keep the current panel, but add a short “Popular searches” row before typing and visibly highlight the matching words in results. This makes the empty and active states feel more deliberate without altering search behaviour.

### Mega menus

- **Current:** The mega menus group related pages with descriptions, icons and a featured call-to-action.
- **Suggestion:** Retain the same columns and links, but standardise link title, description and icon alignment; reduce description contrast slightly less than it is now. This improves scan speed and makes every menu feel equally polished.

### Mobile navigation

- **Current:** A mobile drawer retains the main pages, contextual sub-links, Support us, Call and Directions.
- **Suggestion:** Keep the drawer structure, but add 12–16 px separation between each main-nav group and show a subtle chevron beside groups with sub-links. This gives visitors a clearer visual cue that more activity pages are available.

### Page headers and breadcrumbs

- **Current:** Interior pages share a compact breadcrumb, title and introductory lead through one reusable page-header component.
- **Suggestion:** Maintain the same compact band, but give the heading a slightly stronger vertical rhythm: 8 px after breadcrumbs and 12–16 px after the heading before the lead. The page identity will read faster without adding height.

### Cards, borders and shadows

- **Current:** Cards consistently use rounded corners, light borders and restrained shadows in the BSGSS teal palette.
- **Suggestion:** Keep the card style but use only three elevation levels: flat bordered, standard card and featured card. Applying the same border tone and shadow strength across each level will make pages feel calmer and more intentional.

### Type and reading comfort

- **Current:** Serif display headings and clean sans-serif body text provide a suitable institutional yet human tone.
- **Suggestion:** Preserve both fonts, but keep paragraph columns between 60–75 characters and use the same body size/line-height pair in comparable sections. Long policy, partnership and programme copy will become noticeably easier to read.

### Colour and contrast

- **Current:** The site uses teal, white and soft sand as a consistent, community-focused visual system.
- **Suggestion:** Do not add new brand colours; instead, reserve the darkest teal for actions and active states, medium teal for labels/icons, and pale teal for surfaces. This strengthens hierarchy and improves colour contrast predictability.

### Images and media loading

- **Current:** Programme photos, QR content, press clippings and video thumbnails give the site authentic evidence of field work.
- **Suggestion:** Keep every image in place, but use one consistent image aspect ratio per content type and add low-contrast skeleton/loading space where an external image or video is loading. It avoids layout movement and makes slower connections feel more reliable.

### Keyboard, focus and motion

- **Current:** Interactive controls have visible focus styles and cards use gentle hover motion.
- **Suggestion:** Keep those interactions but make focus rings equally visible on all white, sand and image backgrounds, and honour reduced-motion preferences for slider, card-scale and menu transitions. This improves accessibility without a visual redesign.

### Footer and quick actions

- **Current:** The footer contains navigation, support, contact and social links; the floating quick-action button offers contact channels.
- **Suggestion:** Keep both in their present locations, but make quick-action labels short and uniform (for example, “Call BSGSS”) and add a tiny tooltip on first hover/focus. This helps first-time visitors understand the floating control immediately.

## Public pages

### Home (`/`)

- **Current:** The home page follows a clear story: hero, government-supported work, about, programmes, impact, footprint, partnerships, management and support.
- **Suggestion:** Preserve this sequence, but add a small section-progress cue or stronger alternating surface backgrounds between major bands. Long home-page scrolling will feel more organised while keeping all content in the same order.

### Home hero

- **Current:** The hero uses authentic rotating programme imagery with one main support action and one secondary About BSGSS action.
- **Suggestion:** Keep the slideshow and calls-to-action, but add discrete slide dots plus a pause button, and ensure the copy always sits on a consistently dark, readable overlay. Visitors gain control and the message remains legible on every slide.

### Home programme cards

- **Current:** Four programme cards introduce education, healthcare, livelihoods and women’s empowerment, each directing visitors towards programme details.
- **Suggestion:** Keep the four-card layout but make the entire card and its “Explore programme” cue share one hover/focus treatment. It more clearly signals that the cards are clickable without adding new actions.

### Home footprint and map

- **Current:** The impact summary and India map communicate states, districts, villages and selected programme locations.
- **Suggestion:** Keep the map and the selected-location panel side by side, but add a compact “Select a highlighted state” helper above the map and a short state-change transition in the detail panel. This clarifies interactivity while preserving the map experience.

### Home leadership preview

- **Current:** The management preview presents both leaders with photographs, credentials, messages and a link to their full messages.
- **Suggestion:** Retain the two cards, but make the person’s name and role a consistent fixed-height block before the quote. The cards will align cleanly even when future biographies vary in length.

### About BSGSS (`/about`)

- **Current:** The About page connects the organisational introduction, journey, mission, leadership and deeper exploration routes.
- **Suggestion:** Keep its sections in the current order, but add a light visual divider or image-edge treatment between the long introduction and the journey content. It improves section recognition without changing content or page structure.

### Our Story (`/about/our-story`)

- **Current:** The story experience uses dated milestones, authentic images, locations and categories to show organisational progress.
- **Suggestion:** Keep the timeline, but give the active milestone a stronger numbered/year marker and a persistent “next milestone” hint. This makes the scrolling sequence easier to understand without changing the narrative.

### Legal status (`/about/legal-status`)

- **Current:** Registration, compliance, public documents and trust information are grouped into clearly labelled cards.
- **Suggestion:** Keep the document groups, but label file type and file size beside every download and show a subtle external/download icon. Visitors can judge what will open before leaving the page.

### Partners index (`/about/partners`)

- **Current:** Partner information is grouped into featured content, CSR partners and partner lists, giving supporters visible recognition.
- **Suggestion:** Keep the current partner groups, but add a small non-filtering count beside each group heading and standardise logo card dimensions. This improves scanning and avoids uneven visual weight.

### Partner detail (`/about/partners/[partner]`)

- **Current:** Individual partner pages include programme focus, locations, recognition and relevant BSGSS links.
- **Suggestion:** Keep the existing detail blocks, but add a compact facts row directly below the partner name for locations, focus area and relationship type. It makes each profile scannable before the full narrative.

### Management (`/management`)

- **Current:** Leadership messages appear in a trust-building page with named leaders, images and their stated commitments.
- **Suggestion:** Preserve the messages and photographs, but use a consistent image crop and a slightly more generous quote line-height. This will feel more editorial and easier to read while staying formal.

### Our Work (`/our-work`)

- **Current:** Four image-led cards explain education, healthcare, skills and women’s empowerment, followed by a partner invitation.
- **Suggestion:** Keep the four cards and closing section, but add a compact “Who this supports” line below each card description. It makes the programme impact tangible without adding a new navigation layer.

### Activities index (`/activities`)

- **Current:** The Activities page is a clear gateway to programmes, photo gallery, video gallery, media, SHG products and government programmes.
- **Suggestion:** Keep the six gateway cards in the same grid, but give every icon block the same visual height and make CTA text align to a shared baseline. This creates a cleaner catalogue while keeping the existing actions.

### Our Key Programmes (`/activities/key-programmes`)

- **Current:** The programme page presents AMAR, healthcare and vocational training as image-led programme cards.
- **Suggestion:** Keep the three-card arrangement, but add a concise outcome tag directly under each programme focus tag, such as “Self-help groups” or “Preventive care.” It sharpens the purpose of each programme without changing the content hierarchy.

### Photo Gallery (`/activities/gallery`)

- **Current:** The page gives visitors a substantial visual record of community activities and links back to the source gallery.
- **Suggestion:** Keep the same photo collection but use a responsive masonry/grid rhythm with predictable thumbnail crops, visible captions on focus and a simple image count. This makes browsing feel curated rather than like a long stream.

### Video Gallery (`/activities/videos`)

- **Current:** A large active video sits beside a selectable, scrollable “Up next” list and supports moving to the next video.
- **Suggestion:** Keep the player-plus-playlist model, but show the active video duration, selected-state border and a clear “Autoplay next” status below the player. These are familiar video-platform cues and do not change the experience.

### Work in Media (`/activities/work-in-media`)

- **Current:** Press clippings are presented as a public evidence archive with labelled cards and full-size viewing links.
- **Suggestion:** Keep the archive grid, but show publication name and coverage type in a stable top label, and open each clipping in an accessible focused viewer with a visible close control. It improves legibility without moving media content.

### SHG Products (`/activities/shg-products`)

- **Current:** Product cards connect handmade items to women’s self-help groups and livelihoods.
- **Suggestion:** Retain the card grid, but give each item one clearly consistent inquiry action and a small availability/status label such as “Enquire with BSGSS.” It sets expectations without turning the page into an e-commerce redesign.

### Government programmes (`/activities-under-state-central-government`)

- **Current:** The page summarises State and Central Government-supported work through three programme categories and related activity links.
- **Suggestion:** Keep the category cards, but add a one-line “support type” descriptor beneath each title (for example, awareness, skills, health). This helps visitors understand the distinction before reading the paragraph.

### Impact (`/impact`)

- **Current:** Impact is framed through four outcomes—learning, wellbeing, livelihoods and women’s agency—plus a detailed interactive geographic footprint.
- **Suggestion:** Keep the outcomes and map, but add a compact legend that separates reported totals from programme-record counts. It increases data confidence without changing the visual model.

### Support Us (`/support`)

- **Current:** The page combines bank details, UPI QR, reassurance and a donation-verification form that supports certificate issuance after confirmation.
- **Suggestion:** Keep the same bank/UPI/form sequence, but make the three-step process explicit above the form: donate, submit reference, receive verified acknowledgement. This reduces uncertainty without adding a payment flow.

### Donation certificate (`/support/certificate/[id]`)

- **Current:** The certificate page presents acknowledgement details with printing and download actions after a contribution has been verified.
- **Suggestion:** Keep the certificate layout, but add a small verification status/date area separate from the decorative certificate body. It makes authenticity easy to confirm while preserving the printable design.

### Join Us (`/join-us`)

- **Current:** The page gives paths for volunteering, partnerships, internships and support, plus a direct way to start a conversation.
- **Suggestion:** Retain the existing choices, but make each option card display the expected commitment or response channel in a small footer line. This helps visitors choose confidently without changing any pathway.

### Contact (`/contact`)

- **Current:** Visitors can submit a form, call, email, use WhatsApp when configured, find the office and open directions from a map.
- **Suggestion:** Keep the two-column layout, but show expected response time next to the submit button and place an “Other ways to reach us” divider above the direct-channel cards. It provides reassurance while leaving every action in place.

## Administration screens

### Admin login and setup (`/admin/login`, `/admin/setup`)

- **Current:** The authentication and first-run setup screens isolate administrative access from the public site.
- **Suggestion:** Keep their compact form layouts, but add concise password/security guidance directly under the relevant field and a visible success/error region at the top of the form. This reduces mistakes without changing access flow.

### Admin dashboard (`/admin`)

- **Current:** The dashboard provides a central entry point for content, donations, enquiries, join applications, users and theme controls.
- **Suggestion:** Keep the existing destinations, but show a small operational summary at the top: pending donations, new enquiries and new applications. It makes prioritisation faster without changing the admin structure.

### Admin content and theme (`/admin/content`, `/admin/theme`)

- **Current:** Administrators have separate areas for public content management and visual theme choices.
- **Suggestion:** Keep both destinations, but add a clear “last saved” indicator and a preview link near the primary save action. This provides confidence while preserving current editing behaviour.

### Admin donations, enquiries and join applications (`/admin/donations`, `/admin/inquiries`, `/admin/join`)

- **Current:** These screens separate donation verification, contact follow-up and joining requests into task-specific lists.
- **Suggestion:** Keep the separate queues, but apply identical status-chip colours, row spacing and empty states across all three. Consistency will reduce staff training effort without changing any workflow.

### Admin users (`/admin/admins`)

- **Current:** Administrator accounts and permissions are managed in a dedicated protected area.
- **Suggestion:** Keep account management isolated, but show each user’s role and most recent activity in the same table/list row. It provides more useful governance context without changing permissions.

## Modern web baseline

### Performance and perceived speed

- **Current:** The site uses reusable components, local programme assets and lazy-loaded embedded media where appropriate.
- **Suggestion:** Keep the same media and layouts, but define image sizes for every content card, serve responsive image variants and reserve the final media dimensions before loading. This improves Core Web Vitals without changing what visitors see.

### Search-engine presentation

- **Current:** Pages provide descriptive titles, metadata, a sitemap and breadcrumb structured data.
- **Suggestion:** Preserve the current metadata approach, but add an individual social-sharing image and a short, page-specific description for every public route. Shared links will look complete on WhatsApp, LinkedIn and Facebook without altering the page design.

### Form confidence

- **Current:** Contact, joining and donation-verification forms provide clear fields and are tied to dedicated administrative queues.
- **Suggestion:** Keep the fields and submission paths, but use inline validation, an accessible error summary and a persistent “we received your request” reference number after submission. This makes forms feel dependable without changing their business workflow.

### Privacy and consent

- **Current:** Contact, donation and joining journeys collect only information related to the requested service or acknowledgement process.
- **Suggestion:** Keep the current forms, but place a short privacy-use notice beside each submit action and defer external video/map embeds until visitors choose to load them. This is a modern trust improvement with no information-architecture change.

### Measurement and continuous improvement

- **Current:** The site has clear key journeys: support, contact, join, programme exploration, gallery and video viewing.
- **Suggestion:** Keep the same journeys, but measure only anonymous events such as support-button clicks, form completion, video plays and search-result selection. A small monthly dashboard will show where design refinement is actually needed.

### Error and empty states

- **Current:** Several managed experiences already have structured empty states and route-specific fallback behaviour.
- **Suggestion:** Keep the existing handling, but give every public error/empty state one helpful message, one recovery action and the BSGSS contact route. This makes temporary content or network failures feel intentional rather than broken.

## Public-route coverage

The audit covers the following existing public routes without recommending route removal, merging or reordering:

- `/`, `/about`, `/about/our-story`, `/about/legal-status`, `/about/partners`, `/about/partners/[partner]`, `/management`, `/our-work`.
- `/activities`, `/activities/key-programmes`, `/activities/gallery`, `/activities/videos`, `/activities/work-in-media`, `/activities/shg-products`, `/activities-under-state-central-government`.
- `/impact`, `/support`, `/support/certificate/[id]`, `/join-us`, `/contact`.

## Priority order for later implementation

1. **High impact, low visual risk:** header spacing, shared card elevation, page-header rhythm, gallery/video selected states and donation process explanation.
2. **Accessibility and trust:** image loading stability, focus contrast, reduced motion, legal-document metadata, map data legend and certificate verification status.
3. **Editorial polish:** consistent media crops, partner/logo alignment, management-card alignment, and shared list/status patterns in the admin.

## Acceptance checklist for future changes

- Preserve every existing route, navigation item, primary action, page order and core teal/sand/white concept.
- Test desktop, tablet and mobile widths before release; header labels must not wrap at normal desktop widths.
- Test keyboard navigation for header, mega menu, search, gallery viewer, video playlist, form controls and quick actions.
- Confirm contrast for text placed on hero images, cards, pale teal surfaces and the footer.
- Keep authentic BSGSS images, programme copy, bank details and public documentation in their current content locations.

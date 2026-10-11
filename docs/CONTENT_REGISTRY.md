# Public content registry

The public website's shared editorial content lives in `config/content.ts`.

Use this file to update:

- Internal route paths in `links`.
- Site-wide labels, the footer credit and verified social links.
- Home-page copy, hero slides, programme summaries and calls to action.
- About, impact, activity, video, media, support and donation copy.
- Public image paths, YouTube video IDs and media-clipping metadata.

Components should contain presentation and behaviour only: layout classes, icons, forms and interaction. When a new public page is added, create its text and routes in `config/content.ts` first, then render it from the page component. This keeps content changes in one reviewable location.

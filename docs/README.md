# BSGSS documentation

This folder describes the content-management foundation for the BSGSS website.

- [Admin content model](ADMIN_CONTENT_MODEL.md): what administrators should manage.
- [Database schema](DATABASE_SCHEMA.md): tables, important fields and relationships.
- [Content workflow](CONTENT_WORKFLOW.md): draft, review, publish and archive process.
- [Operations](OPERATIONS.md): safe setup, media and access-control guidance.

The public website should only display records with `status = 'published'` (and public documents/media with their public flag enabled).

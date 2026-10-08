# Database schema

`lib/db/schema.sql` is idempotent: it can be run through `npm run db:init` after `DATABASE_URL` is configured. It adds the content tables without removing existing user records.

## Access and audit

| Table | Purpose | Important columns |
| --- | --- | --- |
| `users` | Administrative users | `email`, `display_name`, `password_hash`, `role`, `is_active`, `last_login_at` |
| `admin_audit_logs` | Traceable important changes | `actor_id`, `action`, `entity_type`, `entity_id`, `metadata`, `created_at` |

## Public content

| Table | Purpose | Important columns |
| --- | --- | --- |
| `content_pages` | Editable standalone pages | `slug`, `title`, `excerpt`, `body`, `seo_title`, `seo_description`, `status`, `published_at` |
| `programs` | Programme/project content | `slug`, `title`, `summary`, `body`, `theme`, `cover_media_id`, `status` |
| `partner_profiles` | CSR/government partner stories | `slug`, `name`, `logo_media_id`, `summary`, `focus_areas`, `locations`, `source_document_id` |
| `impact_metrics` | Verified impact figures | `metric_key`, `label`, `value_numeric`, `value_suffix`, `reporting_period`, `source_document_id` |

## Media and activities

| Table | Purpose | Important columns |
| --- | --- | --- |
| `media_assets` | File metadata only; binary files live in configured storage | `storage_key`, `mime_type`, `file_size_bytes`, `width`, `height`, `alt_text`, `caption`, `credit`, `is_public` |
| `activity_albums` | Gallery/field-work collections | `slug`, `title`, `description`, `cover_media_id`, `status` |
| `activity_album_items` | Ordered items in an album | `album_id`, `media_id`, `caption`, `sort_order` |
| `shg_products` | Women-led product catalogue | `slug`, `name`, `description`, `image_media_id`, `category`, `enquiry_subject`, `is_featured`, `status` |

## Governance and operations

| Table | Purpose | Important columns |
| --- | --- | --- |
| `public_documents` | Legal, financial and public report documents | `title`, `document_type`, `file_media_id`, `published_at`, `is_public` |
| `site_settings` | Versioned-by-key site configuration | `setting_key`, `value`, `updated_by`, `updated_at` |
| `navigation_items` | Editable navigation/menu ordering | `menu_key`, `label`, `href`, `parent_id`, `sort_order`, `is_visible` |
| `contact_inquiries` | Contact-form inbox | `name`, `email`, `phone`, `subject`, `message`, `status`, `assigned_to` |

## Conventions

- Use UUID primary keys and UTC timestamps.
- Keep public copy as text/JSON, never as executable HTML.
- Keep media files outside PostgreSQL; save their object/storage key in `media_assets`.
- Use `draft`, `review`, `published`, `archived` consistently across public content.
- Set `created_by`/`updated_by` on every administrator action and write a matching audit log for publish, archive, delete, role and settings changes.

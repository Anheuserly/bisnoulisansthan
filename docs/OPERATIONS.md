# Operations and safety

## Database setup

1. Add the project-specific `DATABASE_URL` and a 32+ character `SESSION_SECRET` to `.env.local` on the deployment host.
2. Run `npm run db:init` once. The SQL uses `IF NOT EXISTS` patterns and preserves existing users.
3. Verify `/admin/setup` only if no password has been configured yet; afterward keep the setup token private.

## Media storage

Store uploads in an object store or a controlled public-media directory, not in PostgreSQL. Save only the path/key and metadata in `media_assets`.

Before publishing an image, capture its source, credit, consent/permission status, alt text and caption. Avoid uploading beneficiary photographs without documented permission.

## Backups and access

- Back up the PostgreSQL database daily and retain multiple restore points.
- Give editors the minimum permissions needed.
- Deactivate access immediately when a staff member leaves.
- Do not share administrator passwords or setup tokens in public documents, chats or screenshots.
- Review `admin_audit_logs` after publication, role or settings changes.

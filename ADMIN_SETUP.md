# BSGSS Control Centre setup

The portal uses PostgreSQL and signed, HTTP-only browser sessions.

1. Copy `.env.example` to `.env.local` and set `DATABASE_URL`, `SESSION_SECRET`, and `ADMIN_SETUP_TOKEN`. The database name must be `bisnoulisansthan`, not a shared project database.
2. Generate private values with `openssl rand -base64 48` for `SESSION_SECRET` and `openssl rand -base64 32` for `ADMIN_SETUP_TOKEN`.
3. Run `npm run db:init`. This creates the role-based `users` table and seeds `shubham.arc11@gmail.com` (SHUBHAM KUMAR) and `pawan@scsi.in` (PAWAN) as `super_admin` users.
4. For a new installation, each seeded user opens `/admin/setup`, enters their own email, the private setup token, and a password with at least 12 characters. On the production server, the two initial users may instead be provisioned with their password directly by the deployer.
5. Sign in at `/admin/login`.

Only a `super_admin` can add future users. Add them from **Control Centre → Manage users** and assign either `admin` or `editor` access.

Never commit `.env.local`, the setup token, database password, or session secret.

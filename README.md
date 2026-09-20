# AO Portfolio V35 — Secure Online CMS

This version keeps the V34 portfolio design and CMS features, but is prepared for online deployment.

## Local
- `npm install`
- Set `ADMIN_PASSWORD` and optionally `AUTH_SECRET` in `.env`
- `npm start`

## Render
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Environment variables:
  - `ADMIN_PASSWORD` = a strong private password
  - `AUTH_SECRET` = a long random secret
  - `DATABASE_URL` = Render Postgres Internal Database URL

When `DATABASE_URL` is present, portfolio CMS data is stored in Postgres instead of the local JSON file. Without it, the app falls back to JSON for local testing.

The public site reads `/api/content`. The dashboard at `/admin` requires authentication for editing and reset operations.

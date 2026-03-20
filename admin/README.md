# Sylhety News Admin

This `admin` folder is a self-contained Vite + React admin panel for:

- admin login
- CMS news publishing
- category management
- team management
- photocard template management
- optional installable PWA support
- local draft recovery for unfinished news posts

## Lovable-friendly setup

This app is prepared for Lovable-style editing and deployment:

- all live API calls go through `src/lib/api.ts`
- no active app code hardcodes `localhost`
- routing is `BASE_URL` aware
- public assets and PWA files are `BASE_URL` aware
- PWA registration can be turned off during fast preview iteration

## Environment variables

Use the values from `.env.example`.

Important ones:

- `VITE_API_URL`
  Set this to your deployed backend API base, for example `https://your-domain.com/api`.
- `VITE_ENABLE_PWA`
  Use `false` while editing/testing in Lovable previews.
  Use `true` for the published admin app if you want install/install/update behavior.
- `VITE_ADMIN_EMAILS`
  Comma-separated admin emails allowed by the UI.

## Recommended Lovable prompt

When continuing this project in Lovable, use a prompt close to this:

`Continue working on the existing Sylhety News admin panel. Keep it as a Vite React app. Do not introduce localhost URLs. Preserve the env-driven API layer in src/lib/api.ts, the optional PWA switch, and the local draft recovery in the dashboard.`

## Practical note

Lovable works best when this admin app is treated as the frontend source of truth. Keep the backend deployed separately and point `VITE_API_URL` at that backend.

Lovable’s current GitHub flow is export/sync from Lovable to GitHub rather than importing an existing GitHub repository into Lovable, so use this folder as the source to recreate or paste into a Lovable project if needed.

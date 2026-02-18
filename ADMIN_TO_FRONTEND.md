# Admin content on the frontend (sylhetynews.com)

When you **upload news**, **photos**, or **add team members** in the admin panel, they appear on the **frontend** (e.g. https://sylhetynews.com) as long as both use the **same data source**.

## Same Firebase project

1. **Admin** (Next.js) uses env vars: `NEXT_PUBLIC_FIREBASE_*` in `admin/.env.local`.
2. **Frontend** (Vite) uses env vars: `VITE_FIREBASE_*` in `frontend/.env`.

Use the **same Firebase project** for both:

- Same `projectId`, `apiKey`, `authDomain`, `storageBucket`, `appId`.
- So copy the values from your Firebase Console (Project settings → General → Your apps) into both:
  - Admin: `admin/.env.local` with `NEXT_PUBLIC_FIREBASE_*`
  - Frontend: `frontend/.env` with `VITE_FIREBASE_*`

Then:

- **News** added in the admin shows on the **homepage**, **category pages**, and **news detail** (`/news/:id`).
- **Team members** added in the admin show on the **Team** page (`/team`).
- **PhotoCard templates** and **images** uploaded in the admin are used on the **PhotoCard** page and in article images.

## Frontend URL (sylhetynews.com)

In `frontend/.env` set:

```env
VITE_FRONTEND_URL=https://sylhetynews.com
```

So share links and canonical URLs use the live site.

## If you use the backend API instead

If the frontend uses the **backend** (e.g. `VITE_API_URL` is set), then news/team/categories come from the API, not directly from Firebase. In that case the backend must be the source of truth and the admin would need to write through the API, or the backend must sync from Firebase.

For **admin panel → Firebase → frontend (sylhetynews.com)** with no backend in the middle, leave `VITE_API_URL` empty so the frontend reads from Firebase.

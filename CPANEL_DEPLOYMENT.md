# Upload Sylhetly News to cPanel – Step by Step

This guide shows how to put your **Sylhetly News** site on cPanel (Hostinger, GoDaddy, Bluehost, or any cPanel host). The main site and admin panel (at `/admin`) are both in the same frontend build, so you upload **one** build to `public_html`.

---

## What You Need Before Starting

- cPanel login (from your hosting provider)
- Your **domain** (e.g. `sylhetynews.com`)
- **Firebase** project set up (Firestore, Auth, Storage)
- **Node.js** on your computer (only for building; cPanel does not need Node for this method)

---

## Part 1: Build the Site on Your Computer

You build the site locally with your **production** settings. Those settings are baked into the build, so you don’t need to add environment variables on cPanel.

### Step 1: Open the project

```bash
cd "d:\_Project\sylhetlynews (2)\sylhetlynews"
```

### Step 2: Set production environment variables

1. Go to the **frontend** folder and create or edit the `.env` file:

   **Path:** `frontend/.env`

2. Put your **production** values in it (replace with your real domain and Firebase config):

```env
VITE_API_URL=https://yourdomain.com/api
VITE_FRONTEND_URL=https://yourdomain.com
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_ADMIN_EMAILS=admin@yourdomain.com
```

- Use **your real domain** for `VITE_FRONTEND_URL` and (if you use the API) `VITE_API_URL`.
- Get Firebase values from [Firebase Console](https://console.firebase.google.com) → Project Settings → Your apps.
- `VITE_ADMIN_EMAILS` = comma-separated emails that can log in to `/admin`.

### Step 3: Install dependencies and build

```powershell
cd frontend
npm install
npm run build
```

When it finishes, you should see a **`dist`** folder inside `frontend/`. That folder is what you will upload to cPanel.

---

## Part 2: Upload to cPanel

### Step 4: Open cPanel File Manager

1. Log in to your hosting (e.g. Hostinger, GoDaddy).
2. Open **cPanel**.
3. Click **File Manager**.
4. Go to **`public_html`** (this is usually the folder for your main domain).
   - If you use a **subdomain** (e.g. `www` or `news`), open the folder that your host set for that domain (often `public_html` or `public_html/news` etc.).

### Step 5: (Optional) Backup and clean the web root

- If there is already a site here, **backup** the current `public_html` contents (download or rename the folder).
- Delete or move old files so `public_html` is empty (or only has the new site). You will replace them with the contents of `dist/`.

### Step 6: Upload the build

1. On your PC, open the **`frontend/dist`** folder. You should see:

   - `index.html`
   - `assets/` (folder with `.js` and `.css` files)
   - Maybe a few other files (e.g. `favicon.ico`, `logo-main.jpeg`, etc.)

2. In cPanel File Manager:

   - Click **Upload**.
   - Upload **everything inside** `frontend/dist/` (not the `dist` folder itself):
     - Select and upload `index.html` and all files and folders (e.g. `assets/`, `favicon.ico`, etc.).
   - Result: the same structure as in `dist/` should now be directly inside `public_html/`.

   **Correct structure on cPanel:**

   ```
   public_html/
   ├── index.html
   ├── assets/
   │   ├── index-xxxxx.js
   │   └── index-xxxxx.css
   ├── favicon.ico
   └── ... (other files from dist)
   ```

### Step 7: Add .htaccess (for React Router and clean URLs)

Without `.htaccess`, direct links or refresh on routes like `/admin` or `/news/123` may show 404. The project includes **`frontend/public/.htaccess`**, so after you run `npm run build` it will be inside **`frontend/dist/.htaccess`**. If you upload the **entire contents** of `dist/` (including hidden files), `.htaccess` will already be there—just confirm it’s in `public_html`.

If your upload doesn’t include hidden files, create `.htaccess` manually:

1. In cPanel File Manager, make sure you are inside **`public_html`**.
2. Click **+ File** (New File).
3. Name the file: **`.htaccess`** (including the dot).
4. Edit the file and paste this exactly:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

5. Save and close.

Now:

- `https://yourdomain.com` → main site
- `https://yourdomain.com/admin` → admin login
- `https://yourdomain.com/admin/dashboard` → admin dashboard
- Any other route will load the app correctly.

---

## Part 3: Turn On HTTPS (SSL)

1. In cPanel, open **SSL/TLS** or **Let’s Encrypt** (or similar).
2. Select your domain and install a certificate (often “AutoSSL” or “Install”).
3. After it’s active, open your site with `https://yourdomain.com` and use **https** in your Firebase and (if any) API URLs in `.env` and rebuild if you change them later.

---

## Summary Checklist

| Step | Action                                                           |
| ---- | ---------------------------------------------------------------- |
| 1    | Set `frontend/.env` with production domain and Firebase config   |
| 2    | Run `npm install` and `npm run build` in `frontend/`             |
| 3    | Open cPanel → File Manager → `public_html`                       |
| 4    | Upload **all contents** of `frontend/dist/` into `public_html/`  |
| 5    | Create `.htaccess` in `public_html` with the rewrite rules above |
| 6    | Enable SSL for your domain in cPanel                             |

After that, your site and admin are live at:

- **Site:** `https://yourdomain.com`
- **Admin:** `https://yourdomain.com/admin` (log in with an email in `VITE_ADMIN_EMAILS`)

---

## If You Need the Backend API on the Same Host

If you use the **Express backend** (MongoDB, `/api/news`, `/api/opinions`, etc.) and your cPanel has **Node.js** (e.g. “Node.js Selector” or “Setup Node.js App”):

1. Build and run the backend in a **separate** folder (e.g. `backend` or `api`) on the server, not inside `public_html`.
2. Set the backend’s **Application URL** to something like `https://yourdomain.com/api` (or a subdomain like `api.yourdomain.com`).
3. In `frontend/.env` use:
   - `VITE_API_URL=https://yourdomain.com/api` (or your actual API URL).
4. Rebuild the frontend (`npm run build`) and upload the new `dist/` again.

If your cPanel **does not** support Node.js, host the backend elsewhere (e.g. Railway, Render) and set `VITE_API_URL` to that URL, then rebuild and upload the frontend.

---

## Troubleshooting

**Blank page or 404 on refresh (e.g. on `/admin`)**

- Make sure `.htaccess` is in **`public_html`** (same level as `index.html`) and contains the rewrite rules above.
- Confirm “mod_rewrite” is enabled (usually on by default on cPanel).

**“Firebase is not initialized” or login doesn’t work**

- Rebuild the frontend **after** setting `frontend/.env` with the correct Firebase and domain values.
- In Firebase Console, check that Auth (Email/Password), Firestore, and Storage are enabled and your domain is allowed if you set authorized domains.

**Old content after upload**

- Clear browser cache or try in a private window.
- Make sure you uploaded the **new** `dist/` contents and overwrote old files in `public_html`.

**Assets 404 (no CSS/JS)**

- In Vite, `base` is `/`. So all paths are absolute from the root.
- Ensure you uploaded the **entire** `assets` folder and that `index.html` is in the same directory as the `.htaccess` (i.e. in `public_html`).

---

You’re done. Your project is uploaded to cPanel and served from `public_html` with SPA routing and (after you enable SSL) HTTPS.

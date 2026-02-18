# Production Deployment Guide

## Build Status ✅

- **Build successful** - Production bundle ready
- **Output folder**: `dist/`
- **Main bundle**: `dist/assets/index-sOx1XYSU.js` (250.02 kB gzipped)
- **CSS**: `dist/assets/index-BE_rkt-9.css` (12.04 kB gzipped)
- **Total size**: ~265 kB gzipped

---

## Pre-Deployment Checklist

### 1. Environment Configuration

- [ ] Update email in `.env.local`:
  ```
  VITE_ADMIN_EMAILS=your_actual_email@gmail.com
  ```
- [ ] Verify all Firebase credentials are correct
- [ ] Ensure `VITE_` prefix on all environment variables (visible to frontend)

### 2. Firebase Console Setup

- [ ] Collections created: `categories`, `news`, `users`
- [ ] Firestore security rules applied
- [ ] Cloud Storage security rules applied
- [ ] Firebase Authentication enabled with Email/Password provider

### 3. Build Verification

```bash
npm run build
```

- [ ] Build completes without errors
- [ ] No TypeScript compilation errors
- [ ] `dist/` folder created with assets

### 4. Code Review

- [ ] No console errors in built code
- [ ] Admin dashboard accessible at `/admin`
- [ ] Login/signup page functional
- [ ] Article creation form works
- [ ] Category management accessible

---

## Full-Stack (Backend API) Deployment

When you deploy with your own backend (Node.js + MongoDB), set **`VITE_API_URL`** to your API base URL. The frontend will use the API for news, categories, team, and admin auth instead of Firebase.

### Backend environment (`.env`)

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/sylhety-news
JWT_SECRET=your-secret-key-min-32-chars
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=YourSecurePassword
# Optional: API_PUBLIC_URL=https://api.yourdomain.com (for absolute image URLs)
FRONTEND_URL=https://yourdomain.com
PORT=5000
```

### Frontend environment

```env
VITE_API_URL=https://api.yourdomain.com
```

- Build the frontend with `VITE_API_URL` set; the app will use the backend for data and admin login.
- CORS is configured from the backend using `FRONTEND_URL`; ensure your frontend origin is allowed.
- Admin login uses `/api/admin/login`; JWT is stored in `localStorage` and sent in `Authorization` header for protected routes.

### Deploy backend

- Run the Node server (e.g. `npm run build && npm start` in `backend/`) on your host or PaaS (Railway, Render, Fly.io, or a VPS).
- Serve static files from `backend/uploads/` at `/uploads` (or set `API_PUBLIC_URL` so image URLs point to your API domain).

---

## Deployment Steps

### For Vercel (Recommended - Free tier available)

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite project

3. **Configure Environment Variables**

   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.local` (use your own values – never commit real keys):
     ```
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_firebase_app_id
     VITE_ADMIN_EMAILS=your_email@gmail.com
     ```
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is now live at `your-project.vercel.app`

### For Netlify

1. **Build the project locally**

   ```bash
   npm run build
   ```

2. **Deploy folder**

   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `dist/` folder
   - Set Site Settings → Build & Deploy

3. **Add Environment Variables**

   - Site Settings → Build & Deploy → Environment
   - Add all `VITE_` variables from `.env.local`

4. **Connect custom domain** (optional)
   - Domain Settings → Custom domain

### For Paid Hosting (cPanel, Hostinger, etc.)

1. **Upload files**

   - Connect via FTP or File Manager
   - Upload contents of `dist/` folder to `public_html/` or web root

2. **Configure environment variables**

   - Copy `.env.local` contents to hosting environment variables
   - Or hardcode in Firebase config (not recommended for security)
   - Some hosts allow `.env` files in root

3. **Set up rewrite rules** (Important for React Router!)

   - Create `.htaccess` in root:
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

4. **Enable HTTPS**
   - Most hosts offer free SSL certificates
   - Enable in cPanel/hosting control panel

### For Docker (Advanced)

1. **Create Dockerfile**

   ```dockerfile
   FROM node:20-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:20-alpine
   RUN npm install -g serve
   COPY --from=build /app/dist /app
   EXPOSE 3000
   CMD ["serve", "-s", "/app", "-l", "3000"]
   ```

2. **Build and run**
   ```bash
   docker build -t sylhetly-news .
   docker run -p 3000:3000 sylhetly-news
   ```

---

## Post-Deployment

### 1. Test the Live Site

- [ ] Home page loads correctly
- [ ] Articles display properly
- [ ] Categories filter works
- [ ] Admin login page accessible
- [ ] Images load from Firebase Storage

### 2. Admin Setup

- [ ] Log in with your configured email
- [ ] Create first category
- [ ] Create sample article with featured image
- [ ] Publish article and verify visibility

### 3. Monitor Performance

- [ ] Check Google PageSpeed Insights
- [ ] Verify Firebase quota usage
- [ ] Monitor error logs in browser console
- [ ] Test on mobile devices

### 4. Security Checks

- [ ] HTTPS is enabled (green lock icon)
- [ ] Firebase credentials not exposed in source
- [ ] Admin only accessible via login
- [ ] Images served from Firebase Storage

---

## Troubleshooting

### Build Too Large

- Bundle is ~250 kB gzipped (acceptable)
- Consider code splitting for further optimization
- Dynamic imports for admin routes reduce initial load

### 404 on Navigation

- Ensure `.htaccess` rewrite rules configured (traditional hosting)
- Check hosting provider supports SPA routing
- Vercel/Netlify handle this automatically

### Firebase Not Working

- Verify `VITE_` prefixed environment variables
- Check Firebase credentials in `.env.local`
- Ensure collections exist in Firestore
- Verify security rules allow reads/writes

### Images Not Loading

- Check Firebase Storage security rules
- Verify Storage bucket URL in environment
- Ensure image upload feature creates files correctly

---

## Performance Optimization

### Already Optimized

✅ Vite production build with minification
✅ CSS minification (12 kB gzipped)
✅ JavaScript code splitting
✅ Asset compression

### Additional Optimizations (if needed)

- Use CDN for static assets
- Enable GZIP compression on server
- Implement image lazy loading in frontend
- Use Firebase Storage CDN for image delivery

---

## Monitoring & Maintenance

### Firebase Console

- Monitor read/write operations
- Track storage usage
- Review authentication logs
- Set up billing alerts

### Analytics

- Add Google Analytics for visitor tracking
- Monitor page views and user engagement
- Track admin activity

### Backups

- Firebase automatically backs up Firestore
- Export collections regularly for safety
- Document any custom configurations

---

## Support & Resources

- **Firebase Docs**: https://firebase.google.com/docs
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com

---

## Quick Reference

**Firebase Config** (Already configured):

```javascript
Project ID: sylhetly-news
API Key: AIzaSyAANJPMvjERlt8WtDAU4pdP5e6xrmWIHWY
Database: Firestore
Storage: Firebase Storage
Auth: Email/Password
```

**Build Output**:

```
dist/
├── index.html (1.32 kB)
├── assets/
│   ├── index-sOx1XYSU.js (250.02 kB gzip)
│   ├── index-BE_rkt-9.css (12.04 kB gzip)
│   └── logo-B0XCaLed.jpeg (40.12 kB)
├── favicon.ico
├── robots.txt
└── placeholder.svg
```

**Key URLs**:

- Home: `/`
- Articles: `/category/:slug`
- Article Detail: `/news/:id`
- Admin Login: `/admin/login`
- Admin Dashboard: `/admin`

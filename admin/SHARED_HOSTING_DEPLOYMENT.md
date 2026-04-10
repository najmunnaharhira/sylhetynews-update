# 🚀 Admin App - Shared Hosting Deployment Guide

## ✅ Pre-built Package Ready!

The admin app is already built in `admin/dist/` folder. You can upload this directly to your shared hosting.

---

## 📦 Option 1: Upload Pre-built Files (Easiest)

### Step 1: Upload Files
1. Go to your cPanel File Manager
2. Navigate to your subdomain directory (e.g., `public_html/admin` or create `admin` folder)
3. Upload **ALL contents** from `admin/dist/` folder:
   - `index.html`
   - `assets/` folder (with all CSS and JS files)

### Step 2: Create .htaccess File
Create a `.htaccess` file in the admin directory with this content:

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

### Step 3: Access Your Admin
- Visit: `https://yourdomain.com/admin` (or your subdomain)
- Login with email from `VITE_ADMIN_EMAILS` in your `.env` file

---

## 📝 Important Notes

### Environment Variables
The Firebase configuration is **already baked into the build** from your `.env` file:
- ✅ API Key: `AIzaSyAANJPMvjERlt8WtDAU4pdP5e6xrmWIHWY`
- ✅ Auth Domain: `sylhetly-news.firebaseapp.com`
- ✅ Project ID: `sylhetly-news`
- ✅ Storage Bucket: `sylhetly-news.firebasestorage.app`

**No need to configure environment variables on shared hosting** - they're already in the build!

### File Structure on Server
```
public_html/
└── admin/          (or your subdomain directory)
    ├── index.html
    ├── assets/
    │   ├── index-KKym2jS3.css
    │   └── index-CMqOplbG.js
    └── .htaccess
```

---

## 🔄 Updating the Admin App

If you make changes:
1. Edit code locally
2. Run `npm run build` in `admin/` folder
3. Upload new `dist/` contents to replace old files

---

## ⚠️ Troubleshooting

**404 Error on Refresh:**
- Make sure `.htaccess` file exists and has correct rewrite rules
- Check that `mod_rewrite` is enabled in cPanel

**Firebase Errors:**
- Verify your domain is added to Firebase Authorized Domains
- Go to Firebase Console → Authentication → Settings → Authorized domains

**Blank Page:**
- Check browser console for errors
- Verify all files uploaded correctly
- Clear browser cache

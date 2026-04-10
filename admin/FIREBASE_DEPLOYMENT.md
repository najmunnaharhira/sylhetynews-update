# 🔥 Admin App - Firebase Hosting Deployment Guide

## ✅ Why Firebase Hosting?

- ✅ **FREE** - 10 GB storage, 360 MB/day bandwidth
- ✅ **Fast CDN** - Global content delivery
- ✅ **Auto SSL** - HTTPS included
- ✅ **Easy Updates** - One command to deploy
- ✅ **Perfect Integration** - Works seamlessly with Firebase services

---

## 🚀 Quick Deployment Steps

### Step 1: Install Firebase CLI (if not installed)
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```
This will open your browser to authenticate.

### Step 3: Initialize Firebase (if not done)
```bash
cd admin
firebase init hosting
```

**When prompted:**
- Select **"Use an existing project"** → Choose `sylhetly-news`
- **What do you want to use as your public directory?** → `dist`
- **Configure as a single-page app?** → **Yes**
- **Set up automatic builds?** → **No** (we'll build manually)
- **File dist/index.html already exists. Overwrite?** → **No**

### Step 4: Build the Admin App
```bash
npm run build
```

### Step 5: Deploy to Firebase
```bash
firebase deploy --only hosting
```

**Or deploy to a specific site:**
```bash
firebase deploy --only hosting:admin
```

---

## 🌐 Access Your Admin Panel

After deployment, Firebase will give you a URL like:
- `https://sylhetly-news.web.app/admin` (default)
- `https://sylhetly-news.firebaseapp.com/admin` (alternate)

Or if you configured a custom domain:
- `https://admin.yourdomain.com`

---

## 🔄 Updating the Admin App

When you make changes:

```bash
cd admin
npm run build          # Build new version
firebase deploy --only hosting:admin  # Deploy to Firebase
```

That's it! Takes less than 2 minutes.

---

## 📝 Firebase Hosting Configuration

Your `firebase.json` already has admin hosting configured:

```json
{
  "hosting": [
    {
      "target": "admin",
      "public": "admin/dist",
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    }
  ]
}
```

---

## 🎯 Multiple Sites Setup (Optional)

If you want separate URLs for frontend and admin:

1. **Create hosting sites in Firebase Console:**
   - Go to Firebase Console → Hosting
   - Click "Add another site"
   - Create: `admin` site

2. **Configure .firebaserc:**
```json
{
  "projects": {
    "default": "sylhetly-news"
  },
  "targets": {
    "sylhetly-news": {
      "hosting": {
        "admin": ["admin-site-id"]
      }
    }
  }
}
```

3. **Deploy:**
```bash
firebase deploy --only hosting:admin
```

---

## 💡 Pro Tips

- **Preview before deploy:** `firebase hosting:channel:deploy preview`
- **Rollback:** `firebase hosting:rollback`
- **View history:** `firebase hosting:clone`

---

## ✅ Current Status

- ✅ Admin app built: `admin/dist/` ready
- ✅ Firebase config: Already in `.env`
- ✅ firebase.json: Configured for admin hosting
- 🚀 **Ready to deploy!**

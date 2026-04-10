# 📤 Manual Deployment to Firebase Hosting - Step by Step

## 🎯 What You'll Do

Instead of using Firebase CLI commands, you'll upload files directly through the Firebase Console web interface.

---

## ✅ Step 1: Prepare Your Files

Your admin app is already built! The files are in `admin/dist/` folder.

**Files you need:**
- `admin/dist/index.html`
- `admin/dist/assets/` folder (contains CSS and JS files)

---

## 🌐 Step 2: Open Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Sign in with your Google account
3. Select your project: **sylhetly-news**

---

## 📁 Step 3: Go to Hosting Section

1. In the left sidebar, click **"Hosting"**
2. If you see "Get started", click it
3. You'll see the hosting dashboard

---

## 📤 Step 4: Upload Files Manually

### Option A: Drag & Drop (Easiest)

1. Click **"Get started"** or **"Add another site"** if you already have hosting
2. If prompted, create a site name (e.g., `admin` or use default)
3. Look for **"Upload files"** or **"Deploy"** button
4. **Drag and drop** the entire contents of `admin/dist/` folder:
   - `index.html`
   - `assets/` folder

### Option B: Using Firebase CLI (One-time Setup)

If drag & drop isn't available, you can use CLI just once to initialize:

```bash
firebase login
firebase init hosting
```

Then follow the prompts, but instead of deploying, you can manually upload files.

---

## ⚙️ Step 5: Configure Hosting Settings

In Firebase Console → Hosting:

1. **Public directory:** Should be set to where your files are
2. **Single-page app:** Enable this (for React Router)
3. **Rewrites:** Should redirect all routes to `index.html`

**Note:** These settings are already in your `firebase.json`, but you can verify them in the console.

---

## 🚀 Step 6: Deploy

1. After uploading files, click **"Deploy"** or **"Publish"**
2. Wait for deployment to complete
3. You'll get a URL like: `https://sylhetly-news.web.app`

---

## 📋 Alternative: Manual File Upload via Firebase Storage

If direct hosting upload isn't available:

### Method 1: Use Firebase CLI (Simplest)

Even for "manual" deployment, Firebase CLI is the easiest way:

```bash
# Just these 3 commands:
firebase login
firebase use sylhetly-news
firebase deploy --only hosting
```

This uploads files automatically - still "manual" in the sense you run commands yourself!

### Method 2: Zip and Upload

1. **Create a zip file** of `admin/dist/` contents:
   - Select all files in `admin/dist/`
   - Right-click → "Send to" → "Compressed (zipped) folder"
   - Name it `admin-dist.zip`

2. **Upload via Firebase Console:**
   - Go to Hosting → Deploy
   - Look for "Upload" option
   - Upload the zip file

---

## 🎯 Recommended: Use Firebase CLI (It's Still Manual!)

Even though it's a command, it's the **easiest manual method**:

```bash
# Step 1: Login (opens browser)
firebase login

# Step 2: Set project
firebase use sylhetly-news

# Step 3: Deploy (uploads files automatically)
firebase deploy --only hosting
```

**Why this is better:**
- ✅ Takes 2 minutes
- ✅ Handles all file uploads automatically
- ✅ Configures everything correctly
- ✅ You're still doing it manually (running commands yourself)

---

## 📝 What Files Are Being Uploaded?

From `admin/dist/` folder:
```
admin/dist/
├── index.html          (Main HTML file)
└── assets/
    ├── index-XXXXXX.css  (Styles)
    └── index-XXXXXX.js   (JavaScript)
```

These are **static files** - no server needed, just upload and they work!

---

## ✅ After Deployment

1. **Get your URL:** Firebase will show you the hosting URL
2. **Test admin:** Visit the URL and try logging in
3. **Add custom domain** (optional): Firebase Console → Hosting → Add custom domain

---

## 🔄 Updating Later

When you make changes:

1. **Rebuild:** `cd admin && npm run build`
2. **Redeploy:** `firebase deploy --only hosting`

Or upload new files manually through the console.

---

## 🆘 Troubleshooting

**"No hosting site found"**
- Click "Get started" in Hosting section
- Create a new hosting site

**"Files not uploading"**
- Make sure you're uploading from `admin/dist/` folder
- Include both `index.html` and `assets/` folder

**"404 errors"**
- Make sure single-page app rewrite is enabled
- Check that `index.html` is in the root of uploaded files

---

## 💡 Pro Tip

**Even "manual" deployment is easier with CLI:**
- You run 3 commands yourself (manual)
- But Firebase handles the upload automatically
- Much faster than web interface drag & drop

**Try it:** `firebase deploy --only hosting` - it's still manual, just automated! 🚀

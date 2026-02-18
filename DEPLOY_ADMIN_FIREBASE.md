# 🚀 Deploy Admin App to Firebase Hosting - Step by Step

## ✅ Prerequisites Check

- ✅ Firebase CLI installed (v15.6.0)
- ✅ Admin app built (`admin/dist/` folder exists)
- ✅ Firebase config ready (`firebase.json` configured)
- ✅ Project file created (`.firebaserc`)

---

## 📋 Step-by-Step Deployment

### Step 1: Login to Firebase

Open your terminal/PowerShell in the project root and run:

```bash
firebase login
```

**What happens:**

- A browser window will open
- Sign in with your Google account (the one that has access to Firebase project `sylhetly-news`)
- Click "Allow" to grant Firebase CLI access
- You'll see "Success! Logged in as [your-email]"

**If browser doesn't open:**

```bash
firebase login --no-localhost
```

Then copy the URL shown and paste it in your browser.

---

### Step 2: Verify Project Connection

```bash
firebase use sylhetly-news
```

You should see: `Now using project sylhetly-news`

---

### Step 3: Initialize Hosting (First Time Only)

If this is your first time deploying admin:

```bash
firebase init hosting
```

**When prompted, select:**

1. **"Use an existing project"** → Select `sylhetly-news`
2. **"What do you want to use as your public directory?"** → Type: `admin/dist`
3. **"Configure as a single-page app (rewrite all urls to /index.html)?"** → **Yes** ✅
4. **"Set up automatic builds and deploys with GitHub?"** → **No** ❌
5. **"File firebase.json already exists. Overwrite?"** → **No** ❌ (we already configured it)

**Note:** If you see "File admin/dist/index.html already exists. Overwrite?" → **No**

---

### Step 4: Deploy Admin App

```bash
firebase deploy --only hosting
```

Because your `firebase.json` uses a single `"hosting": { ... }` block (no targets),
**do not** use `hosting:admin` unless you set up a hosting target first.

**What happens:**

- Firebase will upload your `admin/dist/` files
- You'll see progress: `Uploading [X] files...`
- When done, you'll get URLs like:
  - `https://sylhetly-news.web.app` (or your custom domain)
  - Deployment complete! ✅

---

## 🌐 Access Your Admin Panel

After deployment, your admin will be available at:

- **Default URL:** `https://sylhetly-news.web.app` (or `https://sylhetly-news.firebaseapp.com`)
- **Custom Domain:** If you configured one in Firebase Console

**To access admin specifically:**

- If deployed to root: `https://your-domain.com/admin`
- If deployed as separate site: Check Firebase Console → Hosting for the exact URL

---

## 🔄 Updating Your Admin App

When you make changes to the admin app:

```bash
# 1. Build the app
cd admin
npm run build

# 2. Deploy to Firebase
cd ..
firebase deploy --only hosting
```

That's it! Takes about 2 minutes.

---

## 🎯 Multiple Sites Setup (Optional)

If you want separate URLs for frontend and admin:

### In Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `sylhetly-news`
3. Go to **Hosting** → **Add another site**
4. Create site named: `admin`
5. Copy the site ID

### Update .firebaserc

```json
{
  "projects": {
    "default": "sylhetly-news"
  },
  "targets": {
    "sylhetly-news": {
      "hosting": {
        "admin": ["your-admin-site-id-here"]
      }
    }
  }
}
```

### Deploy

```bash
firebase deploy --only hosting:admin
```

---

## ✅ Quick Commands Reference

```bash
# Login
firebase login

# Set project
firebase use sylhetly-news

# Deploy admin
firebase deploy --only hosting

# Deploy specific site
firebase deploy --only hosting:admin

# View hosting info
firebase hosting:sites:list

# Rollback (if needed)
firebase hosting:rollback
```

---

## 🆘 Troubleshooting

### "Failed to authenticate"

- Run `firebase login` again
- Make sure you're using the correct Google account

### "Project not found"

- Verify project ID: `sylhetly-news`
- Check Firebase Console that project exists
- Run `firebase use sylhetly-news`

### "No hosting site configured"

- Run `firebase init hosting` first
- Or manually configure in `firebase.json`

### "dist folder not found"

- Make sure you built the app: `cd admin && npm run build`
- Check that `admin/dist/index.html` exists

### "Permission denied"

- Make sure your Google account has access to Firebase project
- Check Firebase Console → Project Settings → Users and permissions

---

## 🎉 Success

Once deployed, you'll see:

```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/sylhetly-news/overview
Hosting URL: https://sylhetly-news.web.app
```

Your admin panel is now live! 🚀

---

## 📝 Next Steps

1. ✅ Test admin login at the deployed URL
2. ✅ Add your domain to Firebase Authorized Domains (if using custom domain)
3. ✅ Set up custom domain in Firebase Console (optional)
4. ✅ Bookmark your admin URL for easy access

**Need help?** Check the Firebase Console or run `firebase help`

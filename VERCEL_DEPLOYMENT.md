# Deploy to Vercel in 5 Minutes

## Step 1: Prepare Repository

```bash
cd /workspaces/sylhetynews

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Sylhetly News - Production Ready"
```

## Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create repository name: `sylhetly-news`
3. Make it public or private
4. Click "Create repository"
5. Follow the commands to push your local code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/sylhetly-news.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Click "Import Git Repository"
4. Paste your GitHub repo URL: `https://github.com/YOUR_USERNAME/sylhetly-news`
5. Click "Import"
6. Vercel auto-detects Vite configuration ✓

## Step 4: Add Environment Variables

1. In Vercel project settings, go to **Environment Variables**
2. Add each variable:

| Variable Name | Value |
|---|---|
| `VITE_FIREBASE_API_KEY` | `AIzaSyAANJPMvjERlt8WtDAU4pdP5e6xrmWIHWY` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `sylvetly-news.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `sylhetly-news` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `sylvetly-news.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `237118055873` |
| `VITE_FIREBASE_APP_ID` | `1:237118055873:web:ef0dc6ef896d2e7b7cfb40` |
| `VITE_ADMIN_EMAILS` | `your_email@gmail.com` |

3. Click "Save"

## Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (2-3 minutes)
3. You'll see: "🎉 Congratulations! Your project has been successfully deployed"
4. Your site is now live at: **`https://your-project.vercel.app`**

---

## After Deployment

### Access Your Site
- **Home**: `https://your-project.vercel.app`
- **Admin Login**: `https://your-project.vercel.app/admin/login`

### Sign Up as Admin
1. Go to Admin Login page
2. Click "Sign Up" tab
3. Enter email: `your_email@gmail.com` (must match `VITE_ADMIN_EMAILS`)
4. Create password
5. Click "Sign Up"

### Create First Article
1. Go to Admin Dashboard
2. Click "Manage News"
3. Click "New Article"
4. Fill in:
   - Title
   - Summary
   - Content
   - Category (create one first if needed)
   - Featured Image
5. Check "Published"
6. Click "Create Article"

### Custom Domain (Optional)
1. In Vercel project settings → Domains
2. Add your custom domain
3. Update DNS records at your domain provider
4. Wait for SSL certificate (automatic)

---

## Troubleshooting

### "Build failed"
- Check environment variables are added
- Verify all `VITE_` variables are present
- Check `.gitignore` doesn't exclude important files

### "Cannot find module"
- Run `npm install` locally first
- Commit `package.json` and `package-lock.json`
- Push to GitHub again

### Firebase Not Working
- Verify environment variables in Vercel match `.env.local`
- Check Firestore security rules allow public reads
- Ensure admin email matches `VITE_ADMIN_EMAILS`

### Images Not Showing
- Check Firebase Storage security rules
- Verify storage bucket URL in environment
- Test upload in admin panel

---

## Next Steps

1. ✅ Deploy to Vercel
2. 🔗 Add custom domain (if you have one)
3. 📝 Create articles in admin dashboard
4. 📊 Set up Google Analytics
5. 🔐 Configure Firebase backup rules

---

## Vercel CLI Alternative (Advanced)

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# It will ask for project settings, then deploy automatically
```

---

## Important Notes

- **Free tier**: 6000 build minutes/month (plenty for a news site)
- **Auto deployments**: Every GitHub push automatically deploys
- **Auto rollback**: Deployments can be rolled back instantly
- **Environment variables**: Automatically injected at build time
- **HTTPS**: Automatic with free SSL certificate

Your production site is now live! 🚀

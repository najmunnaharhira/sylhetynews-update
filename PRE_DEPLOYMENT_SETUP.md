# Pre-Deployment Setup Guide

## Environment Configuration

Before deploying this application, you **MUST** create environment files for each component.

### Frontend Configuration

1. Navigate to `/frontend` directory
2. Copy `.env.production.template` to `.env` or `.env.production`:
   ```bash
   cp .env.production.template .env
   ```
3. Edit `.env` and fill in your actual Firebase configuration values
4. **REQUIRED FIELDS:**
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_ADMIN_EMAILS`

### Admin Panel Configuration

1. Navigate to `/admin` directory
2. Copy `.env.production.template` to `.env` or `.env.production`:
   ```bash
   cp .env.production.template .env
   ```
3. Edit `.env` with the **SAME** Firebase configuration as frontend
4. Use the **SAME** admin emails as frontend

### Backend Configuration (Optional)

The backend is optional if you're using Firebase-only mode.

1. Navigate to `/backend` directory
2. Copy `.env.production.template` to `.env`:
   ```bash
   cp .env.production.template .env
   ```
3. Edit `.env` and configure:
   - MongoDB connection string
   - Admin credentials
   - JWT secret (generate a strong random string)
   - Frontend URL for CORS

## Security Checklist

- [ ] Generated strong JWT secret (if using backend)
- [ ] Changed default admin password
- [ ] Configured Firebase security rules
- [ ] Set up proper CORS origins
- [ ] Environment variables are NOT committed to git
- [ ] Production builds are minified and optimized
- [ ] HTTPS is enabled in production
- [ ] Admin emails are correctly configured

## Build Process

### Frontend
```bash
cd frontend
npm install
npm run build
```

### Admin Panel
```bash
cd admin
npm install
npm run build
```

### Backend
```bash
cd backend
npm install
# No build step needed, runs with tsx/ts-node
```

## Deployment Verification

After deployment, verify:
1. Frontend loads and displays news
2. Admin login works with configured admin email
3. Image uploads work
4. Firebase Firestore rules are active
5. All pages render without errors

## Common Issues

### Firebase not initialized
- Make sure all VITE_FIREBASE_* variables are set
- Check Firebase project credentials are correct

### Admin login fails
- Verify email is in VITE_ADMIN_EMAILS
- Check Firebase Auth is enabled
- Ensure user is created in Firebase Auth

### Images not uploading
- Verify Firebase Storage rules are deployed
- Check storage bucket name is correct
- Ensure authenticated users have write access

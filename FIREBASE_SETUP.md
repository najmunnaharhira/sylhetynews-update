# Firebase Setup Guide for Sylhetly News

## Overview
This guide will help you set up Firebase Firestore database with authentication and file storage for the Sylhetly News admin panel.

## Prerequisites
- A Google account
- Firebase project (free tier is sufficient)

## Step-by-Step Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `sylhetly-news`
4. Accept the terms and create the project
5. Wait for the project to be created

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. Click Save

### 3. Create Firestore Database

1. Go to **Firestore Database** in the left menu
2. Click **Create database**
3. Choose **Start in production mode**
4. Select your desired location (or keep default)
5. Click **Create**

### 4. Set Firestore Security Rules

Replace the default security rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access
    match /news/{document=**} {
      allow read: if resource.data.published == true;
    }

    // Admin write access
    match /news/{document=**} {
      allow write: if request.auth != null && request.auth.token.admin == true;
    }

    match /categories/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }

    // User profiles
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### 5. Enable Storage

1. Go to **Storage** in the left menu
2. Click **Create** for Firebase Storage
3. Start in production mode
4. Select location and create

### 6. Set Storage Security Rules

Replace default storage rules with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /news/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### 7. Get Firebase Config

1. Go to **Project Settings** (click gear icon)
2. Click **Your apps** > Web app icon
3. Copy your Firebase config
4. Create `.env.local` file in project root with:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_EMAILS=your_email@gmail.com,admin@example.com
```

### 8. Create Database Collections

In Firestore, create these collections:

#### Collection: `categories`
Document example:
```json
{
  "name": "Breaking News",
  "slug": "breaking-news"
}
```

#### Collection: `news`
Document example:
```json
{
  "title": "Article Title",
  "summary": "Brief summary",
  "content": "Full article content",
  "category": "breaking-news",
  "author": "Author Name",
  "imageUrl": "https://...",
  "featured": true,
  "published": true,
  "tags": ["tag1", "tag2"],
  "views": 0,
  "createdAt": "2024-01-20T...",
  "updatedAt": "2024-01-20T..."
}
```

#### Collection: `users`
Document example (auto-created):
```json
{
  "email": "admin@example.com",
  "displayName": "Admin Name",
  "photoURL": "",
  "role": "admin",
  "createdAt": "2024-01-20T..."
}
```

### 9. Set Admin Claims (Custom Claims)

To properly identify admins, set custom claims:

1. Go to **Firebase Functions** (or use Firebase CLI)
2. Create a Cloud Function to set admin claims:

```javascript
const admin = require('firebase-admin');

exports.setAdminClaim = admin.https.onCall(async (data, context) => {
  if (context.auth.token.admin !== true) {
    throw new Error('Only admins can set admin claims');
  }

  await admin.auth().setCustomUserClaims(data.uid, {
    admin: true,
  });

  return { message: 'Custom claims set successfully' };
});
```

Alternatively, use Firebase CLI:
```bash
firebase functions:shell
> setCustomClaims('user-uid', {admin: true})
```

### 10. Install Dependencies

Run this command in your project root:

```bash
npm install
```

### 11. Test Admin Login

1. Navigate to `http://localhost:5173/admin/login`
2. Click "Sign Up" to create a new admin account using an email from `VITE_ADMIN_EMAILS`
3. After account creation, you'll be redirected to the admin dashboard

## Admin Features

### News Management
- **Create Articles**: Add new articles with images, title, content, category
- **Edit Articles**: Modify existing articles
- **Publish/Unpublish**: Control article visibility
- **Delete Articles**: Remove articles from database
- **Featured Articles**: Mark important articles as featured

### Category Management
- **Create Categories**: Add new news categories
- **Edit Categories**: Modify category details
- **Delete Categories**: Remove categories

### Image Upload
- Images are automatically uploaded to Firebase Storage
- Images are optimized and stored in the `/news` folder
- Supports JPG, PNG, and other common formats

## Accessing the Admin Panel

- **Login Page**: `http://localhost:5173/admin/login`
- **Dashboard**: `http://localhost:5173/admin`

## Frontend Integration

The frontend will automatically fetch published articles from Firestore. Update your page components to use:

```typescript
import { newsService } from '../services/firebaseService';

// Get featured articles
const featured = await newsService.getFeaturedNews();

// Get news by category
const categoryNews = await newsService.getNewsByCategory('breaking-news');

// Get single article
const article = await newsService.getNews('article-id');

// Increment view count
await newsService.incrementViews('article-id');
```

## Troubleshooting

### Admin can't login
- Ensure email is in `VITE_ADMIN_EMAILS`
- Check Firebase Authentication is enabled
- Verify custom claims are set for the user

### Images not uploading
- Check Storage security rules
- Ensure user has admin=true custom claim
- Check Storage quota limits

### Articles not showing
- Verify `published: true` in Firestore
- Check Firestore security rules
- Inspect browser console for errors

## Security Considerations

- Always use production security rules in live environment
- Regularly backup Firestore data
- Monitor Storage usage
- Use strong passwords for admin accounts
- Implement 2FA for admin accounts (Firebase Sign-In Methods)

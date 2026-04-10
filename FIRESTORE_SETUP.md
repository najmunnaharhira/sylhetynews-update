# Firestore Database Structure - Setup Instructions

## Quick Setup - Copy & Paste Guide

Your Firebase project is now connected. Follow these steps in Firebase Console:

### Step 1: Create "categories" Collection

1. Go to Firebase Console → Firestore Database
2. Click "Create Collection"
3. Name: `categories`
4. Click "Auto ID" for first document
5. Add these fields:
   - `name` (string): "Breaking News"
   - `slug` (string): "breaking-news"
6. Save

Add more categories:
```
Business, politics, sports, technology, entertainment, world, opinion
```

### Step 2: Create "news" Collection

1. Click "Create Collection"
2. Name: `news`
3. For each news article, add document with fields:

```json
{
  "title": "Your Article Title",
  "summary": "Brief summary for listing",
  "content": "Full article content here...",
  "category": "breaking-news",
  "author": "Author Name",
  "imageUrl": "",
  "featured": true or false,
  "published": true or false,
  "tags": ["tag1", "tag2"],
  "views": 0,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Step 3: Set Security Rules (fixes "Missing or insufficient permissions")

The admin panel uses **Firebase Auth** (email/password). It does **not** use custom claims like `admin`. So rules must allow **any authenticated user** to write (the admin app already restricts who can log in via `NEXT_PUBLIC_ADMIN_EMAILS`).

1. Go to **Firebase Console** → **Firestore Database** → **Rules**
2. Replace everything with this (or copy from the repo file `firestore.rules`):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // News: public reads published only; logged-in admin reads all + writes
    match /news/{docId} {
      allow read: if request.auth != null || resource.data.published == true;
      allow create, update, delete: if request.auth != null;
    }

    match /categories/{docId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }

    match /team/{docId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }

    match /photocardTemplates/{docId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }

    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **Publish**

### Step 4: Enable Storage (For Images)

1. Go to Firebase → Storage
2. Click "Create" if not already created
3. Choose "Start in production mode"
4. Select region
5. Create

### Step 5: Set Storage Rules

1. Go to **Storage** → **Rules**
2. Replace with this (or use repo file `storage.rules`):

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /news/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /photocardTemplates/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

### Step 6: Enable Authentication

1. Go to Firebase → Authentication
2. Click "Sign-in method"
3. Click "Email/Password"
4. Enable it
5. Save

## Next Steps

1. ✅ Firebase credentials set in `.env.local`
2. ⏭ Complete Firestore setup above in Firebase Console
3. ⏭ Start dev server: `npm run dev`
4. ⏭ Go to http://localhost:5173/admin/login
5. ⏭ Sign up with your email
6. ⏭ Create your first article!

## Admin Access

Update `.env.local` with your email:

```env
VITE_ADMIN_EMAILS=your_email@gmail.com,other_admin@gmail.com
```

Then restart dev server.

## Database Schema Reference

### News Document Fields
- `title` (string) - Article title - REQUIRED
- `summary` (string) - Brief summary - REQUIRED
- `content` (string) - Full article - REQUIRED
- `category` (string) - Category ID - REQUIRED
- `author` (string) - Author name
- `imageUrl` (string) - Image URL from Storage
- `featured` (boolean) - Featured flag
- `published` (boolean) - Visibility flag
- `tags` (array) - String array of tags
- `views` (number) - View counter
- `createdAt` (timestamp) - Auto-generated
- `updatedAt` (timestamp) - Auto-generated

### Category Document Fields
- `name` (string) - Category name - REQUIRED
- `slug` (string) - URL slug - REQUIRED
- `icon` (string) - Optional icon URL

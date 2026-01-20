# Admin News Management System - Implementation Guide

## Overview

This project now includes a complete admin panel for managing news articles with Firebase Firestore as the backend database. The system allows admins to:

- Create, edit, and delete news articles
- Upload featured images
- Manage news categories
- Publish/unpublish articles
- Track article views

## Project Structure

```
/src
├── config/
│   └── firebase.ts              # Firebase configuration
├── contexts/
│   └── AuthContext.tsx          # Authentication context
├── services/
│   └── firebaseService.ts       # Firestore database operations
├── types/
│   └── news.ts                  # TypeScript interfaces
├── hooks/
│   └── useNews.ts               # Custom React hooks for news
├── components/
│   └── admin/
│       ├── AdminNewsForm.tsx    # News form component
│       ├── AdminNewsList.tsx    # News list component
│       └── AdminCategoryManager.tsx  # Category manager
├── pages/
│   ├── AdminLogin.tsx           # Login page
│   ├── AdminDashboard.tsx       # Dashboard page
│   └── ...other pages
└── App.tsx                      # Updated with admin routes
```

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_EMAILS=admin@example.com,editor@example.com
```

Get these values from Firebase Console > Project Settings > Web App.

### 2. Firebase Setup

Follow the detailed steps in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md):
- Create Firebase project
- Enable Authentication (Email/Password)
- Create Firestore Database
- Enable Storage
- Set security rules
- Create database collections

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## Using the Admin Panel

### Access Points

- **Login**: http://localhost:5173/admin/login
- **Dashboard**: http://localhost:5173/admin

### Creating an Admin Account

1. Go to http://localhost:5173/admin/login
2. Click "Sign Up"
3. Enter your email (must be in VITE_ADMIN_EMAILS)
4. Enter a password
5. Click "Create Account"
6. You'll be redirected to the admin dashboard

### Managing Articles

#### Create New Article
1. Go to Admin Dashboard
2. Click "New Article"
3. Fill in the form:
   - **Featured Image**: Upload article image
   - **Title**: Article title
   - **Summary**: Brief summary (shown in listings)
   - **Content**: Full article text
   - **Category**: Select from existing categories
   - **Author**: Article author name
   - **Tags**: Comma-separated tags
   - **Featured**: Check if article should be featured
   - **Published**: Check to make article public
4. Click "Create Article"

#### Edit Article
1. Find the article in the list
2. Click the edit icon (pencil)
3. Make changes
4. Click "Update Article"

#### Publish/Unpublish
- Click the eye icon to toggle publication status
- Unpublished articles are hidden from public view

#### Delete Article
- Click the trash icon to delete
- Confirm when prompted

### Managing Categories

1. Go to "Categories" tab
2. **Add Category**: Fill in name and slug, click "Add Category"
3. **Edit Category**: Click edit icon, make changes, click "Update"
4. **Delete Category**: Click trash icon, confirm deletion

## File Descriptions

### Config: `src/config/firebase.ts`
Initializes Firebase with credentials from environment variables. Exports:
- `db`: Firestore database instance
- `auth`: Firebase Authentication instance
- `storage`: Firebase Storage instance

### Services: `src/services/firebaseService.ts`
Contains three service objects:

#### `newsService`
- `getAllNews()`: Get all published articles
- `getNewsByCategory(category)`: Get articles by category
- `getFeaturedNews()`: Get featured articles
- `getNews(id)`: Get single article
- `createNews(article)`: Create new article
- `updateNews(id, article)`: Update article
- `deleteNews(id)`: Delete article
- `togglePublish(id, published)`: Publish/unpublish
- `incrementViews(id)`: Increment view counter

#### `categoryService`
- `getAllCategories()`: Get all categories
- `createCategory(category)`: Create new category
- `updateCategory(id, category)`: Update category
- `deleteCategory(id)`: Delete category

#### `imageService`
- `uploadImage(file, folder)`: Upload image to Storage

### Context: `src/contexts/AuthContext.tsx`
Provides authentication context with:
- `user`: Firebase user object
- `userData`: User profile from Firestore
- `isAdmin`: Boolean flag for admin status
- `logout()`: Sign out function

### Hooks: `src/hooks/useNews.ts`
Custom hooks for data fetching:

#### `useNews()`
Fetches all published articles:
```typescript
const { articles, loading, error } = useNews();
```

#### `useNewsByCategory(category)`
Fetches articles by category:
```typescript
const { articles, loading, error } = useNewsByCategory('breaking-news');
```

#### `useFeaturedNews()`
Fetches featured articles:
```typescript
const { articles, loading, error } = useFeaturedNews();
```

#### `useSingleNews(id)`
Fetches single article and increments views:
```typescript
const { article, loading, error } = useSingleNews('article-id');
```

## Using Articles in Frontend

### Update your page components to fetch from Firebase:

```typescript
import { useNews } from '../hooks/useNews';

export default function HomePage() {
  const { articles, loading, error } = useNews();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
          <img src={article.imageUrl} alt={article.title} />
        </div>
      ))}
    </div>
  );
}
```

## Database Schema

### News Collection
```typescript
{
  id: string;                    // Auto-generated by Firestore
  title: string;                 // Article title
  content: string;               // Full article text
  summary: string;               // Brief summary
  category: string;              // Category ID/slug
  imageUrl: string;              // Image URL from Storage
  author: string;                // Author name
  createdAt: Timestamp;          // Creation date
  updatedAt: Timestamp;          // Last update date
  featured: boolean;             // Featured article flag
  views: number;                 // View count
  tags: string[];                // Array of tags
  published: boolean;            // Publication status
}
```

### Categories Collection
```typescript
{
  id: string;                    // Auto-generated
  name: string;                  // Category name
  slug: string;                  // URL-friendly slug
  icon?: string;                 // Optional icon URL
}
```

### Users Collection
```typescript
{
  id: string;                    // Firebase UID
  email: string;                 // User email
  displayName: string;           // Display name
  photoURL?: string;             // Profile photo URL
  role: 'admin' | 'editor' | 'viewer';  // User role
  createdAt: Timestamp;          // Account creation date
}
```

## Security Rules

### Firestore Rules
- Public read access to published articles
- Admin-only write access to articles and categories
- User profiles readable and writable by owner or admin

### Storage Rules
- Public read access to images
- Admin-only upload/delete permissions

## Troubleshooting

### Can't access admin panel
- Check if admin email is in `VITE_ADMIN_EMAILS`
- Verify environment variables are loaded
- Check browser console for errors

### Images not uploading
- Ensure Storage security rules allow admin uploads
- Check file size limits
- Verify admin custom claims are set

### Articles not appearing on frontend
- Verify `published: true` in Firestore
- Check Firestore security rules
- Ensure article data has correct timestamp format

### Firebase connection errors
- Verify all environment variables are correct
- Check Firebase project is active
- Test Firebase configuration in console

## Next Steps

1. Follow [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) to set up Firebase
2. Configure environment variables in `.env.local`
3. Create admin account at `/admin/login`
4. Add news categories
5. Create your first article
6. Update frontend pages to use `useNews()` hooks

## Support

For Firebase issues:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com)

For project issues:
- Check console for error messages
- Review security rules in Firebase Console
- Verify data structure matches schema

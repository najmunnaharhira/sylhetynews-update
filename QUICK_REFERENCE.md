# Quick Reference - Admin System

## Key URLs

| Page | URL |
|------|-----|
| Admin Login | http://localhost:5173/admin/login |
| Admin Dashboard | http://localhost:5173/admin |
| Public Homepage | http://localhost:5173 |

## Essential Commands

```bash
# Start development server
npm run dev

# Build for production
npm build

# Run tests
npm test

# Format code
npm run lint
```

## Environment Variables (.env.local)

```env
# Required Firebase credentials
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Admin emails (comma-separated)
VITE_ADMIN_EMAILS=admin@example.com
```

## Firestore Collections

### `news`
Main articles collection - admin creates/edits here

### `categories`
News categories - manage in admin panel

### `users`
Auto-created user profiles - tracks admin accounts

## Admin Features

### Dashboard Tabs

| Tab | Features |
|-----|----------|
| **Manage News** | Create, edit, delete, publish articles |
| **Categories** | Add, edit, delete news categories |
| **Settings** | Admin-only configuration (coming soon) |

## Common Tasks

### Create Article
1. Dashboard → New Article
2. Fill form (title, content, image, category)
3. Check "Published" to make public
4. Click "Create Article"

### Edit Article
1. Find article in list
2. Click edit (pencil) icon
3. Make changes
4. Click "Update Article"

### Add Category
1. Dashboard → Categories
2. Enter category name
3. Slug auto-generates or enter custom
4. Click "Add Category"

### Upload Image
- Supported formats: JPG, PNG, GIF, WebP
- Image uploads to Firebase Storage
- Appears in article preview

## React Hooks for Frontend

```typescript
// Fetch all articles
import { useNews } from '@/hooks/useNews';
const { articles, loading, error } = useNews();

// Fetch by category
import { useNewsByCategory } from '@/hooks/useNews';
const { articles, loading } = useNewsByCategory('breaking-news');

// Fetch featured only
import { useFeaturedNews } from '@/hooks/useNews';
const { articles, loading } = useFeaturedNews();

// Single article
import { useSingleNews } from '@/hooks/useNews';
const { article, loading } = useSingleNews('article-id');
```

## Firebase Services

```typescript
import { newsService, categoryService, imageService } from '@/services/firebaseService';

// News operations
await newsService.getAllNews();
await newsService.getNews(id);
await newsService.createNews(articleData);
await newsService.updateNews(id, changes);
await newsService.deleteNews(id);
await newsService.togglePublish(id, true);
await newsService.incrementViews(id);

// Category operations
await categoryService.getAllCategories();
await categoryService.createCategory(data);
await categoryService.updateCategory(id, data);
await categoryService.deleteCategory(id);

// Image upload
await imageService.uploadImage(file, 'folder');
```

## Article Schema

```typescript
{
  id: string;                      // Auto-generated
  title: string;                   // Required
  content: string;                 // Required
  summary: string;                 // Required
  category: string;                // Required (category ID)
  author: string;                  // Optional
  imageUrl: string;                // Firebase Storage URL
  featured: boolean;               // Default: false
  published: boolean;              // Default: false
  tags: string[];                  // Empty array by default
  views: number;                   // Default: 0
  createdAt: Timestamp;            // Auto
  updatedAt: Timestamp;            // Auto
}
```

## Troubleshooting Checklist

- [ ] Firebase config in .env.local?
- [ ] Admin email in VITE_ADMIN_EMAILS?
- [ ] Firebase project created?
- [ ] Firestore database created?
- [ ] Storage enabled?
- [ ] Security rules updated?
- [ ] User account created?
- [ ] Custom claims set for admin?

## File Locations

| File | Purpose |
|------|---------|
| `src/config/firebase.ts` | Firebase initialization |
| `src/contexts/AuthContext.tsx` | Authentication provider |
| `src/services/firebaseService.ts` | Database operations |
| `src/types/news.ts` | TypeScript interfaces |
| `src/hooks/useNews.ts` | React hooks |
| `src/pages/AdminLogin.tsx` | Login page |
| `src/pages/AdminDashboard.tsx` | Main dashboard |
| `src/components/admin/` | Admin UI components |

## Useful Links

- [Firebase Console](https://console.firebase.google.com)
- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Pricing](https://firebase.google.com/pricing)
- [Project Docs](./FIREBASE_SETUP.md)
- [Admin Guide](./ADMIN_IMPLEMENTATION.md)
- [Migration Guide](./MIGRATION_GUIDE.md)

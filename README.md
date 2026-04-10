# Sylhetly News - Admin System Setup Guide

## 🚀 Overview

This is a complete news website project with:
- **Frontend**: React + Vite + TypeScript with Shadcn UI components
- **Backend**: Node.js + Express (optional)
- **Database**: Firebase Firestore
- **Storage**: Firebase Cloud Storage
- **Authentication**: Firebase Auth
- **Admin Panel**: Full-featured admin dashboard for managing news

## 📋 Features

### Public Features
- Browse news articles by category
- Read full articles with images
- Track article views
- Search and filter functionality
- Responsive design

### Admin Features
- **Article Management**: Create, edit, delete, publish articles
- **Image Upload**: Upload featured images to Firebase Storage
- **Category Management**: Create and manage news categories
- **Authentication**: Role-based access control with Firebase Auth

## 🛠️ Tech Stack

| Category | Technology |
|----------|-------------|
| Frontend | React 18 + Vite + TypeScript |
| UI Components | Shadcn UI + Radix UI |
| Form Handling | React Hook Form |
| Database | Firebase Firestore |
| File Storage | Firebase Cloud Storage |
| Authentication | Firebase Auth |

## 📦 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Firebase account (free tier works)

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Setup Firebase
1. Follow [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for complete Firebase configuration
2. Create `.env.local` with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_EMAILS=your_email@gmail.com
```

### Access Admin Panel
- Login: http://localhost:5173/admin/login
- Dashboard: http://localhost:5173/admin

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) | Firebase configuration guide |
| [ADMIN_IMPLEMENTATION.md](./ADMIN_IMPLEMENTATION.md) | Admin system details |
| [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) | Data migration guide |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Quick reference |

## 🎯 Creating Your First Article

1. Go to http://localhost:5173/admin/login
2. Click "Sign Up" with your admin email
3. Go to Dashboard → "New Article"
4. Fill in:
   - Title (required)
   - Summary (required)
   - Content (required)
   - Category (required)
   - Featured image (optional)
5. Mark as "Published"
6. Click "Create Article"

## 🎨 Using News Data in Your Pages

```typescript
import { useNews } from '@/hooks/useNews';

export default function HomePage() {
  const { articles, loading, error } = useNews();
  
  if (loading) return <div>Loading...</div>;
  
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

## 📊 Available Hooks

```typescript
// Get all published articles
import { useNews } from '@/hooks/useNews';
const { articles, loading, error } = useNews();

// Get articles by category
import { useNewsByCategory } from '@/hooks/useNews';
const { articles } = useNewsByCategory('breaking-news');

// Get featured articles only
import { useFeaturedNews } from '@/hooks/useNews';
const { articles } = useFeaturedNews();

// Get single article
import { useSingleNews } from '@/hooks/useNews';
const { article } = useSingleNews('article-id');
```

## 📁 Project Structure

```
src/
├── config/firebase.ts              # Firebase config
├── contexts/AuthContext.tsx        # Auth provider
├── services/firebaseService.ts     # Database operations
├── types/news.ts                   # TypeScript types
├── hooks/useNews.ts                # Data fetching hooks
├── pages/
│   ├── AdminDashboard.tsx
│   ├── AdminLogin.tsx
│   └── ...other pages
└── components/
    └── admin/
        ├── AdminNewsForm.tsx
        ├── AdminNewsList.tsx
        └── AdminCategoryManager.tsx
```

## 🚀 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm preview
```

Deploy the `dist/` folder to Vercel, Netlify, or Firebase Hosting.

## 🐛 Troubleshooting

**Can't login?**
- Check email is in VITE_ADMIN_EMAILS
- Verify Firebase Authentication is enabled

**Images not uploading?**
- Check Storage security rules in Firebase Console
- Verify admin account has proper permissions

**Articles not showing?**
- Check articles have `published: true`
- Verify Firestore security rules

See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for more help.

## 📝 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # Lint code
npm test            # Run tests
```

## 🔐 Security

- Email/password authentication with Firebase Auth
- Role-based admin access control
- Firestore security rules for data protection
- Firebase Storage rules for file protection

## 📄 License

This project is private and proprietary.

---

**Last Updated**: January 20, 2026
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

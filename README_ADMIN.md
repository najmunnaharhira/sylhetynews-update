# 🎉 Sylhetly News - Complete Admin System

## 📊 PROJECT OVERVIEW

A full-featured Firebase-powered news management system with:
- **Admin Dashboard** for creating/editing articles
- **Image Upload** to Firebase Storage
- **Category Management**
- **Publish Control** for articles
- **Frontend Hooks** to display articles

---

## ✅ WHAT'S CONFIGURED

### Firebase Project Connected
```
Project: sylhetly-news
Status: ✅ Ready to Use
Credentials: ✅ Set in .env.local
```

### System Components Built
```
✅ Admin Authentication System
✅ News Management Dashboard
✅ Category Management
✅ Image Upload Handler
✅ Frontend Data Hooks
✅ Article Display Components
✅ Security Rules Templates
✅ Database Schema
```

---

## 🚀 QUICK START (Follow This!)

### 1. Update Your Email in `.env.local`

```bash
# Edit .env.local:
VITE_ADMIN_EMAILS=your_email@gmail.com  # Change to YOUR email!
```

### 2. Complete Firebase Console Setup (5 min)

Open: https://console.firebase.google.com/

Follow the **EXACT** steps in [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md):
- Create collections
- Add security rules
- Configure storage

### 3. Start Development Server

```bash
npm run dev
```

### 4. Access Admin Panel

- **URL:** http://localhost:5173/admin/login
- **Action:** Click "Sign Up"
- **Email:** Use your configured email
- **Create:** New admin account

### 5. Create Your First Article!

- Dashboard → "New Article"
- Fill form (title, content, image, category)
- Check "Published"
- Click "Create Article"

✅ Done! Article appears on homepage!

---

## 📁 PROJECT STRUCTURE

```
src/
├── config/
│   └── firebase.ts                    # Firebase init
├── contexts/
│   └── AuthContext.tsx               # Auth provider
├── services/
│   └── firebaseService.ts            # DB operations
├── types/
│   └── news.ts                       # TypeScript types
├── hooks/
│   └── useNews.ts                    # Data hooks
├── pages/
│   ├── AdminLogin.tsx                # Login page
│   └── AdminDashboard.tsx            # Admin dashboard
├── components/
│   └── admin/
│       ├── AdminNewsForm.tsx         # Create/edit articles
│       ├── AdminNewsList.tsx         # Article list
│       └── AdminCategoryManager.tsx  # Category manager
└── App.tsx                           # Routes updated
```

---

## 🎮 ADMIN DASHBOARD FEATURES

### News Management Tab
- ✅ **Create** articles with images, title, content
- ✅ **Edit** existing articles
- ✅ **Delete** articles
- ✅ **Publish/Unpublish** articles (eye toggle)
- ✅ **Mark as Featured**
- ✅ **Track Views**
- ✅ **Organize by Category**

### Categories Tab
- ✅ **Create** new categories
- ✅ **Edit** categories
- ✅ **Delete** categories
- ✅ **Auto-generated** URL slugs

### Features
- ✅ Image upload to Firebase Storage
- ✅ Rich article editing
- ✅ Tag management
- ✅ Author tracking
- ✅ Automatic timestamps
- ✅ View counter

---

## 💻 FRONTEND INTEGRATION

### Display Articles on Any Page

```typescript
import { useNews } from '@/hooks/useNews';

export default function YourComponent() {
  const { articles, loading, error } = useNews();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {articles.map(article => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <img src={article.imageUrl} />
          <p>{article.summary}</p>
        </div>
      ))}
    </div>
  );
}
```

### Available Hooks

```typescript
// All published articles
import { useNews } from '@/hooks/useNews';
const { articles, loading, error } = useNews();

// Articles by category
import { useNewsByCategory } from '@/hooks/useNews';
const { articles } = useNewsByCategory('sports');

// Featured articles only
import { useFeaturedNews } from '@/hooks/useNews';
const { articles } = useFeaturedNews();

// Single article (increments views)
import { useSingleNews } from '@/hooks/useNews';
const { article } = useSingleNews('article-id');
```

---

## 🔐 SECURITY

### Database Access
- **Public:** Can read published articles only
- **Admin:** Full access to all articles
- **Images:** Anyone can view, only admin can upload

### Authentication
- Email/password login
- Email verification in admin emails list
- Admin role-based access control

---

## 📚 DOCUMENTATION

| File | Purpose |
|------|---------|
| [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) | **👈 Start here!** 10-min setup |
| [FIRESTORE_SETUP.md](./FIRESTORE_SETUP.md) | Firebase console detailed setup |
| [ADMIN_IMPLEMENTATION.md](./ADMIN_IMPLEMENTATION.md) | Complete system documentation |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Commands and API reference |
| [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) | Migrate from mock data |

---

## 🔗 IMPORTANT URLS

| Purpose | URL |
|---------|-----|
| Admin Login | http://localhost:5173/admin/login |
| Admin Dashboard | http://localhost:5173/admin |
| Public Homepage | http://localhost:5173 |
| Firebase Console | https://console.firebase.google.com |

---

## 🛠️ COMMON TASKS

### Add New Admin User
```env
# Edit .env.local:
VITE_ADMIN_EMAILS=admin1@gmail.com,admin2@gmail.com
# Restart server
# New admin can sign up
```

### Create Article
1. Admin Dashboard
2. Click "New Article"
3. Fill form (title, content, category, image)
4. Check "Published"
5. Click "Create Article"

### Create Category
1. Admin Dashboard → Categories
2. Enter category name
3. Click "Add Category"

### Edit Article
1. Find in list
2. Click pencil icon
3. Make changes
4. Click "Update Article"

### Delete Article
1. Find in list
2. Click trash icon
3. Confirm

---

## 📊 DATABASE SCHEMA

### news Collection
```json
{
  "title": "Article Title",
  "summary": "Brief summary",
  "content": "Full article content",
  "category": "sports",
  "author": "Author Name",
  "imageUrl": "https://storage.url/image.jpg",
  "featured": true,
  "published": true,
  "tags": ["tag1", "tag2"],
  "views": 42,
  "createdAt": "2024-01-20T10:00:00Z",
  "updatedAt": "2024-01-20T10:00:00Z"
}
```

### categories Collection
```json
{
  "name": "Sports",
  "slug": "sports"
}
```

### users Collection
```json
{
  "email": "admin@gmail.com",
  "displayName": "Admin Name",
  "photoURL": "",
  "role": "admin",
  "createdAt": "2024-01-20T10:00:00Z"
}
```

---

## ❓ TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Can't sign up | Email must be in VITE_ADMIN_EMAILS in .env.local |
| Can't create article | Create categories first in admin panel |
| Images not uploading | Check Storage rules in Firebase Console |
| Articles not showing | Verify published=true in Firestore database |
| Blank admin dashboard | Check browser console for errors |

---

## 🚀 READY TO START?

1. **Read:** [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
2. **Follow:** The step-by-step checklist
3. **Start:** `npm run dev`
4. **Create:** Your first article!

---

## 📞 SUPPORT

For issues or questions:
1. Check the documentation files
2. Review [ADMIN_IMPLEMENTATION.md](./ADMIN_IMPLEMENTATION.md)
3. Check [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

## ✨ You're All Set!

Your complete Firebase admin news system is ready to use.

**Next Step:** Open [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) and follow the steps!

🎉 Happy news managing!

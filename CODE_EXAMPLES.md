# Code Examples - Firebase Admin System

## 🔹 Fetching Articles in Components

### Basic News Listing
```typescript
import { useNews } from '@/hooks/useNews';
import { Link } from 'react-router-dom';

export default function NewsList() {
  const { articles, loading, error } = useNews();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link key={article.id} to={`/news/${article.id}`}>
          <div className="rounded-lg overflow-hidden shadow-lg">
            {article.imageUrl && (
              <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm">{article.summary}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500">{article.views} views</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {article.category}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
```

### Featured Articles Carousel
```typescript
import { useFeaturedNews } from '@/hooks/useNews';

export default function FeaturedCarousel() {
  const { articles, loading } = useFeaturedNews();

  if (loading) return null;
  if (articles.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4">
      <h2 className="text-3xl font-bold mb-6">Featured Stories</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <div key={article.id} className="bg-blue-700 rounded-lg p-4 hover:bg-blue-800">
            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
            <p className="text-blue-100 text-sm">{article.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🔹 Category Pages

### Dynamic Category Page
```typescript
import { useParams } from 'react-router-dom';
import { useNewsByCategory } from '@/hooks/useNews';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { articles, loading } = useNewsByCategory(category || '');

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 capitalize">
        {category?.replace('-', ' ')} News
      </h1>
      
      {loading ? (
        <div>Loading...</div>
      ) : articles.length === 0 ? (
        <div>No articles in this category yet.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
```

## 🔹 Article Detail View

### Full Article Page
```typescript
import { useParams } from 'react-router-dom';
import { useSingleNews } from '@/hooks/useNews';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const { article, loading } = useSingleNews(id || '');

  if (loading) return <div>Loading article...</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <article className="max-w-4xl mx-auto">
      {article.imageUrl && (
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      )}
      
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-4">{article.title}</h1>
        <div className="flex gap-4 text-gray-600">
          <span>By {article.author}</span>
          <span>•</span>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{article.views} views</span>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        {article.content}
      </div>

      {article.tags.length > 0 && (
        <footer className="mt-8 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}
```

## 🔹 Direct Service Usage

### Using newsService Directly
```typescript
import { newsService } from '@/services/firebaseService';

// Fetch all published news
const allNews = await newsService.getAllNews();

// Fetch news by category
const categoryNews = await newsService.getNewsByCategory('breaking-news');

// Fetch single article
const article = await newsService.getNews('article-id');

// Create new article (admin only)
await newsService.createNews({
  title: 'New Article',
  content: 'Article content',
  summary: 'Brief summary',
  category: 'category-id',
  author: 'Author Name',
  imageUrl: 'https://...',
  featured: false,
  published: true,
  tags: [],
});

// Update article
await newsService.updateNews('article-id', {
  title: 'Updated Title',
  published: true,
});

// Delete article
await newsService.deleteNews('article-id');

// Toggle publish status
await newsService.togglePublish('article-id', true);

// Increment views
await newsService.incrementViews('article-id');
```

## 🔹 Image Upload Usage

### Upload Image to Storage
```typescript
import { imageService } from '@/services/firebaseService';

async function handleImageUpload(file: File) {
  try {
    const imageUrl = await imageService.uploadImage(file, 'news');
    console.log('Image uploaded:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Upload failed:', error);
  }
}
```

## 🔹 Authentication Usage

### Using Auth Context
```typescript
import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const { user, userData, isAdmin, logout } = useAuth();

  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <h1>Welcome, {userData?.displayName || user.email}</h1>
      <p>Role: {userData?.role}</p>
      
      {isAdmin && <div>You are an administrator</div>}
      
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protected Route Component
```typescript
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" />;

  return <>{children}</>;
}
```

## 🔹 Category Operations

### Using Category Service
```typescript
import { categoryService } from '@/services/firebaseService';

// Get all categories
const categories = await categoryService.getAllCategories();

// Create category
const categoryId = await categoryService.createCategory({
  name: 'Breaking News',
  slug: 'breaking-news',
});

// Update category
await categoryService.updateCategory('category-id', {
  name: 'Updated Name',
});

// Delete category
await categoryService.deleteCategory('category-id');
```

## 🔹 Search & Filter Examples

### Search Articles
```typescript
import { useNews } from '@/hooks/useNews';

export default function SearchArticles() {
  const { articles } = useNews();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />
      
      <div className="mt-6">
        {filteredArticles.map((article) => (
          <div key={article.id} className="border-b pb-4 mb-4">
            <h3>{article.title}</h3>
            <p className="text-gray-600">{article.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🔹 Pagination Example

### Paginated News List
```typescript
import { useNews } from '@/hooks/useNews';
import { useState } from 'react';

const ITEMS_PER_PAGE = 10;

export default function PaginatedNewsList() {
  const { articles } = useNews();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <div className="grid gap-6">
        {paginatedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## 🔹 Data Aggregation Examples

### Article Statistics
```typescript
import { useNews } from '@/hooks/useNews';

export default function ArticleStats() {
  const { articles } = useNews();

  const stats = {
    totalArticles: articles.length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
    totalTags: new Set(articles.flatMap((a) => a.tags)).size,
    categoryCounts: articles.reduce((acc, a) => {
      acc[a.category] = (acc[a.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    topArticles: articles.sort((a, b) => b.views - a.views).slice(0, 5),
  };

  return (
    <div>
      <h2>Article Statistics</h2>
      <p>Total Articles: {stats.totalArticles}</p>
      <p>Total Views: {stats.totalViews}</p>
      <p>Categories: {stats.totalTags}</p>
    </div>
  );
}
```

## 🔹 Type-Safe Patterns

### Custom Hook with Error Handling
```typescript
import { useState, useEffect } from 'react';
import { NewsArticle } from '@/types/news';
import { newsService } from '@/services/firebaseService';

export function useLatestNews(limit: number = 5) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await newsService.getAllNews();
        setArticles(news.slice(0, limit));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [limit]);

  return { articles, loading, error };
}
```

---

These examples cover the most common use cases for your admin system and frontend integration.

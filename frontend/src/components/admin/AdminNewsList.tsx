import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { newsService } from '../../services/firebaseService';
import { NewsArticle } from '../../types/news';
import AdminNewsForm from './AdminNewsForm';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db, firebaseInitError, firebaseReady } from '../../config/firebase';

export default function AdminNewsList() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      if (!firebaseReady || !db) {
        setFirebaseError(
          firebaseInitError || 'Firebase is not configured for this environment.'
        );
        return;
      }
      // Get all news (including unpublished for admin)
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const allArticles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      } as NewsArticle));
      setNews(allArticles);
    } catch (err) {
      console.error('Error loading news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        await newsService.deleteNews(id);
        setNews(news.filter((n) => n.id !== id));
      } catch (err) {
        console.error('Error deleting news:', err);
      }
    }
  };

  const handleTogglePublish = async (id: string, published: boolean) => {
    try {
      await newsService.togglePublish(id, !published);
      setNews(
        news.map((n) =>
          n.id === id ? { ...n, published: !published } : n
        )
      );
    } catch (err) {
      console.error('Error updating news:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>;
  }

  if (firebaseError) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-700">{firebaseError}</p>
      </div>
    );
  }

  if (editingId) {
    return (
      <div>
        <AdminNewsForm
          news={selectedNews || undefined}
          onSuccess={() => {
            setEditingId(null);
            setSelectedNews(null);
            loadNews();
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {news.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No articles yet. Create your first one!</p>
        </div>
      ) : (
        news.map((article) => (
          <Card key={article.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {article.category}
                      </span>
                      {article.featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {article.views || 0} views
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleTogglePublish(article.id, article.published)
                      }
                      title={
                        article.published
                          ? 'Click to unpublish'
                          : 'Click to publish'
                      }
                    >
                      {article.published ? (
                        <Eye className="text-green-600" size={18} />
                      ) : (
                        <EyeOff className="text-gray-400" size={18} />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelectedNews(article);
                        setEditingId(article.id);
                      }}
                    >
                      <Edit2 className="text-blue-600" size={18} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash2 className="text-red-600" size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

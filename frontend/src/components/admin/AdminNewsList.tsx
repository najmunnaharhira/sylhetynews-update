import AdminNewsForm from "./AdminNewsForm";
import { Edit2, Eye, EyeOff, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api, newsService } from "../../services/dataService";
import { NewsArticle } from "../../types/news";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface AdminNewsListProps {
  refreshKey?: number;
}

export default function AdminNewsList({ refreshKey }: AdminNewsListProps) {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string>('');

  useEffect(() => {
    loadNews();
  }, [refreshKey]);

  const loadNews = async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const allArticles = await newsService.getAdminAllNews();
      setNews(allArticles);
    } catch (err) {
      console.error('Error loading news:', err);
      setLoadError(err instanceof Error ? err.message : 'Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        await newsService.deleteNews(id);
        setNews(news.filter((n) => n.id !== id));
        setActionMessage('News deleted successfully.');
      } catch (err) {
        console.error('Error deleting news:', err);
        setActionMessage(err instanceof Error ? err.message : 'Delete failed');
      }
    }
  };

  const handleDeleteDemo = async () => {
    if (!confirm('Delete all demo/test/sample news?')) return;
    try {
      const deletedCount = await newsService.deleteDemoNews();
      setActionMessage(`Deleted ${deletedCount} demo news item(s).`);
      await loadNews();
    } catch (err) {
      console.error('Error deleting demo news:', err);
      setActionMessage(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('Are you sure you want to delete ALL news? This cannot be undone.')) return;
    try {
      const deletedCount = await newsService.deleteAllNews();
      setActionMessage(`Deleted ${deletedCount} news item(s).`);
      await loadNews();
    } catch (err) {
      console.error('Error deleting all news:', err);
      setActionMessage(err instanceof Error ? err.message : 'Delete failed');
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

  if (loadError) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-700">{loadError}</p>
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
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <h3 className="font-semibold text-news-headline">Manage All News</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDeleteDemo}>Delete Demo News</Button>
          <Button variant="destructive" onClick={handleDeleteAll}>Delete All News</Button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 rounded border bg-muted text-sm text-news-headline">{actionMessage}</div>
      )}

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

import { useState, useEffect } from 'react';
import { NewsArticle } from '../types/news';
import { newsService } from '../services/firebaseService';

export const useNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const news = await newsService.getAllNews();
        setArticles(news);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading news');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return { articles, loading, error };
};

export const useNewsByCategory = (category: string) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const news = await newsService.getNewsByCategory(category);
        setArticles(news);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading news');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      loadNews();
    }
  }, [category]);

  return { articles, loading, error };
};

export const useFeaturedNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const news = await newsService.getFeaturedNews();
        setArticles(news);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading news');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return { articles, loading, error };
};

export const useSingleNews = (id: string) => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const news = await newsService.getNews(id);
        setArticle(news);
        
        // Increment views
        if (news) {
          await newsService.incrementViews(id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading news');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadNews();
    }
  }, [id]);

  return { article, loading, error };
};

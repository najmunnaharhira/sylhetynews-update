/**
 * Backend API client for Sylhetly News.
 * Used when VITE_API_URL is set; admin access and data go through the backend.
 */

import type { NewsArticle, NewsCategory } from '../types/news';
import type { TeamMember } from '../types/team';
import {
  getApiBaseUrl,
  isBackendConfigured,
  getAdminToken,
} from '../config/api';

function getBase(): string {
  return getApiBaseUrl();
}

function getAuthHeaders(): HeadersInit {
  const token = getAdminToken();
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

function toNewsArticle(raw: Record<string, unknown>): NewsArticle {
  return {
    id: String(raw.id ?? raw._id),
    title: String(raw.title),
    content: String(raw.content),
    summary: String(raw.summary ?? ''),
    category: String(raw.category),
    district: raw.district != null ? String(raw.district) : undefined,
    imageUrl: String(raw.imageUrl),
    author: String(raw.author),
    createdAt: raw.createdAt ? new Date(raw.createdAt as string) : new Date(),
    updatedAt: raw.updatedAt ? new Date(raw.updatedAt as string) : new Date(),
    featured: Boolean(raw.featured),
    views: Number(raw.views) || 0,
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    published: Boolean(raw.published),
  };
}

function toCategory(raw: Record<string, unknown>): NewsCategory {
  return {
    id: String(raw.id ?? raw._id),
    name: String(raw.name),
    slug: String(raw.slug),
    icon: raw.icon != null ? String(raw.icon) : undefined,
  };
}

function toTeamMember(raw: Record<string, unknown>): TeamMember {
  return {
    id: String(raw.id ?? raw._id),
    name: String(raw.name),
    role: String(raw.role),
    order: Number(raw.order) || 0,
    introduction: raw.introduction != null ? String(raw.introduction) : undefined,
  };
}

async function handleRes<T>(res: Response, parse: (data: unknown) => T): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as { error?: string })?.error || res.statusText || 'Request failed';
    throw new Error(msg);
  }
  return parse(data);
}

export const api = {
  getBase,
  isConfigured: isBackendConfigured,
};

export const newsService = {
  async getAllNews(): Promise<NewsArticle[]> {
    const res = await fetch(`${getBase()}/api/news`);
    const data = await handleRes(res, (d) => d as { news: unknown[] });
    return (data.news || []).map((n) => toNewsArticle(n as Record<string, unknown>));
  },

  async getAdminAllNews(): Promise<NewsArticle[]> {
    const res = await fetch(`${getBase()}/api/news/admin/all`, { headers: getAuthHeaders() });
    const data = await handleRes(res, (d) => d as { news: unknown[] });
    return (data.news || []).map((n) => toNewsArticle(n as Record<string, unknown>));
  },

  async getNewsByCategory(category: string): Promise<NewsArticle[]> {
    const res = await fetch(`${getBase()}/api/news/category/${encodeURIComponent(category)}`);
    const data = await handleRes(res, (d) => d as { news: unknown[] });
    return (data.news || []).map((n) => toNewsArticle(n as Record<string, unknown>));
  },

  async getFeaturedNews(): Promise<NewsArticle[]> {
    const res = await fetch(`${getBase()}/api/news/featured/list`);
    const data = await handleRes(res, (d) => d as { news: unknown[] });
    return (data.news || []).map((n) => toNewsArticle(n as Record<string, unknown>));
  },

  async getNews(id: string): Promise<NewsArticle | null> {
    const res = await fetch(`${getBase()}/api/news/${id}`);
    if (res.status === 404) return null;
    const data = await handleRes(res, (d) => d as Record<string, unknown>);
    return toNewsArticle(data);
  },

  async createNews(article: Omit<NewsArticle, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<string> {
    const res = await fetch(`${getBase()}/api/news/admin`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        title: article.title,
        content: article.content,
        summary: article.summary ?? '',
        category: article.category,
        district: article.district ?? '',
        author: article.author,
        imageUrl: article.imageUrl,
        published: article.published ?? false,
        featured: article.featured ?? false,
        tags: article.tags ?? [],
      }),
    });
    const data = await handleRes(res, (d) => d as { id?: string });
    return String(data.id ?? '');
  },

  async updateNews(id: string, article: Partial<NewsArticle>): Promise<void> {
    const res = await fetch(`${getBase()}/api/news/admin/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(article),
    });
    await handleRes(res, () => ({}));
  },

  async deleteNews(id: string): Promise<void> {
    const res = await fetch(`${getBase()}/api/news/admin/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    await handleRes(res, () => ({}));
  },

  async togglePublish(id: string, published: boolean): Promise<void> {
    const res = await fetch(`${getBase()}/api/news/admin/${id}/publish`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ published }),
    });
    await handleRes(res, () => ({}));
  },

  async incrementViews(id: string): Promise<void> {
    await fetch(`${getBase()}/api/news/${id}/view`, { method: 'POST' });
  },
};

export const categoryService = {
  async getAllCategories(): Promise<NewsCategory[]> {
    const res = await fetch(`${getBase()}/api/categories`);
    const data = await handleRes(res, (d) => d as { categories: unknown[] });
    return (data.categories || []).map((c) => toCategory(c as Record<string, unknown>));
  },

  async createCategory(category: Omit<NewsCategory, 'id'>): Promise<string> {
    const res = await fetch(`${getBase()}/api/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(category),
    });
    const data = await handleRes(res, (d) => d as { id?: string });
    return String(data.id ?? '');
  },

  async updateCategory(id: string, category: Partial<NewsCategory>): Promise<void> {
    const res = await fetch(`${getBase()}/api/categories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(category),
    });
    await handleRes(res, () => ({}));
  },

  async deleteCategory(id: string): Promise<void> {
    const res = await fetch(`${getBase()}/api/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    await handleRes(res, () => ({}));
  },
};

export const teamService = {
  async getTeamMembers(): Promise<TeamMember[]> {
    const res = await fetch(`${getBase()}/api/team`);
    const data = await handleRes(res, (d) => d as { team: unknown[] });
    return (data.team || []).map((m) => toTeamMember(m as Record<string, unknown>));
  },

  async createTeamMember(member: Omit<TeamMember, 'id'>): Promise<string> {
    const res = await fetch(`${getBase()}/api/team`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(member),
    });
    const data = await handleRes(res, (d) => d as { id?: string });
    return String(data.id ?? '');
  },

  async updateTeamMember(id: string, member: Partial<TeamMember>): Promise<void> {
    const res = await fetch(`${getBase()}/api/team/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(member),
    });
    await handleRes(res, () => ({}));
  },

  async deleteTeamMember(id: string): Promise<void> {
    const res = await fetch(`${getBase()}/api/team/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    await handleRes(res, () => ({}));
  },
};

export const imageService = {
  async uploadImage(file: File, _folder?: string): Promise<string> {
    const base = getBase();
    const form = new FormData();
    form.append('image', file);
    const token = getAdminToken();
    const headers: HeadersInit = {};
    if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${base}/api/upload/image`, {
      method: 'POST',
      headers,
      body: form,
    });
    const data = await handleRes(res, (d) => d as { url?: string });
    const url = data.url ?? '';
    if (url.startsWith('http')) return url;
    return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
  },
};

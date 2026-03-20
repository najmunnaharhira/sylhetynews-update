/**
 * Backend API client for Sylhetly News.
 * Used when VITE_API_URL is set; admin access and data go through the backend.
 */

import type { NewsArticle, NewsCategory } from '../types/news';
import type { PhotoCardTemplate } from '../types/photocard';
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

const ABSOLUTE_URL_PATTERN = /^(?:[a-z]+:)?\/\//i;
const GOOGLE_DRIVE_ID_PATTERNS = [
  /\/file\/d\/([a-zA-Z0-9_-]{10,})/i,
  /\/d\/([a-zA-Z0-9_-]{10,})/i,
  /[?&]id=([a-zA-Z0-9_-]{10,})/i,
  /\/thumbnail\?id=([a-zA-Z0-9_-]{10,})/i,
];

function extractGoogleDriveFileId(value?: string | null): string {
  const trimmed = value?.trim() ?? '';
  if (!trimmed) {
    return '';
  }

  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) {
    return trimmed;
  }

  for (const pattern of GOOGLE_DRIVE_ID_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return '';
}

function normalizeMediaUrl(value?: string | null): string {
  const trimmed = value?.trim() ?? '';
  if (!trimmed) {
    return '';
  }

  const driveFileId = extractGoogleDriveFileId(trimmed);
  if (driveFileId) {
    return `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w1600`;
  }

  if (
    ABSOLUTE_URL_PATTERN.test(trimmed) ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  if (trimmed.startsWith('/')) {
    return `${getBase()}${trimmed}`;
  }

  return `${getBase()}/${trimmed.replace(/^\.?\//, '')}`;
}

function toNewsArticle(raw: Record<string, unknown>): NewsArticle {
  return {
    id: String(raw.id ?? raw._id),
    title: String(raw.title),
    content: String(raw.content),
    summary: String(raw.summary ?? ''),
    category: String(raw.category),
    district: raw.district != null ? String(raw.district) : undefined,
    imageUrl: normalizeMediaUrl(String(raw.imageUrl ?? raw.image_url ?? '')),
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

function toPhotoCardTemplate(raw: Record<string, unknown>): PhotoCardTemplate {
  return {
    id: String(raw.id ?? raw._id),
    name: String(raw.name ?? 'Template'),
    description: raw.description != null ? String(raw.description) : '',
    imageUrl: normalizeMediaUrl(String(raw.imageUrl ?? raw.image_url ?? '')),
    previewUrl:
      raw.previewUrl != null
        ? normalizeMediaUrl(String(raw.previewUrl))
        : raw.preview_url != null
          ? normalizeMediaUrl(String(raw.preview_url))
          : undefined,
    category: raw.category != null ? String(raw.category) : undefined,
    isActive: Boolean(raw.isActive ?? raw.is_active ?? true),
    createdAt: raw.createdAt ? new Date(raw.createdAt as string) : undefined,
    updatedAt: raw.updatedAt ? new Date(raw.updatedAt as string) : undefined,
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

  async deleteAllNews(): Promise<number> {
    const res = await fetch(`${getBase()}/api/news/admin/all/delete`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await handleRes(res, (d) => d as { deletedCount?: number });
    return Number(data.deletedCount ?? 0);
  },

  async deleteDemoNews(): Promise<number> {
    const res = await fetch(`${getBase()}/api/news/admin/demo/delete`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await handleRes(res, (d) => d as { deletedCount?: number });
    return Number(data.deletedCount ?? 0);
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

export const photocardService = {
  async getTemplates(): Promise<PhotoCardTemplate[]> {
    const res = await fetch(`${getBase()}/api/photocard-templates`);
    const data = await handleRes(res, (d) => d as { templates?: unknown[] });
    return (data.templates || []).map((template) =>
      toPhotoCardTemplate(template as Record<string, unknown>)
    );
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

export interface BusinessSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  adRatePer1000Views: number;
}

export interface RevenueSummary {
  totalNews: number;
  publishedNews: number;
  unpublishedNews: number;
  totalViews: number;
  adRatePer1000Views: number;
  estimatedRevenue: number;
}

export const adminService = {
  async getBusinessSettings(): Promise<BusinessSettings> {
    const res = await fetch(`${getBase()}/api/admin/business-settings`, {
      headers: getAuthHeaders(),
    });
    return handleRes(res, (d) => d as BusinessSettings);
  },

  async updateBusinessSettings(payload: BusinessSettings): Promise<void> {
    const res = await fetch(`${getBase()}/api/admin/business-settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    await handleRes(res, () => ({}));
  },

  async getRevenueSummary(): Promise<RevenueSummary> {
    const res = await fetch(`${getBase()}/api/admin/revenue-summary`, {
      headers: getAuthHeaders(),
    });
    return handleRes(res, (d) => d as RevenueSummary);
  },
};

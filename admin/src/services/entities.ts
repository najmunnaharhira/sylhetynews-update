import { NewsItem, CategoryItem, TeamMember, PhotoCardTemplate } from "../types/entities";
import { apiFetch, resolveApiAssetUrl } from "../lib/api";

const normalizeNewsItem = (item: NewsItem): NewsItem => ({
  ...item,
  imageUrl: resolveApiAssetUrl(item.imageUrl) || item.imageUrl,
});

const normalizeTemplate = (template: PhotoCardTemplate): PhotoCardTemplate => ({
  ...template,
  imageUrl: resolveApiAssetUrl(template.imageUrl) || template.imageUrl,
  previewUrl: resolveApiAssetUrl(template.previewUrl) || template.previewUrl,
});

export const fetchNews = async (): Promise<NewsItem[]> => {
  const response = await apiFetch<{ news: NewsItem[] }>("/news/admin/all");
  return (response.news ?? []).map(normalizeNewsItem);
};

export const fetchCategories = async (): Promise<CategoryItem[]> => {
  const response = await apiFetch<{ categories: CategoryItem[] }>("/categories");
  return response.categories ?? [];
};

export const fetchTeam = async (): Promise<TeamMember[]> => {
  const response = await apiFetch<{ team: TeamMember[] }>("/team");
  return response.team ?? [];
};

export const fetchPhotoCardTemplates = async (): Promise<PhotoCardTemplate[]> => {
  const response = await apiFetch<{ templates: PhotoCardTemplate[] }>("/photocard-templates");
  return (response.templates ?? []).map(normalizeTemplate);
};

export const createNewsItem = async (news: Omit<NewsItem, "id" | "createdAt" | "updatedAt">) =>
  apiFetch<{ id: string }>("/news/admin", {
    method: "POST",
    body: JSON.stringify(news),
  });

export const updateNewsItem = async (id: string, news: Partial<NewsItem>) =>
  apiFetch<{ id: string }>(`/news/admin/${id}`, {
    method: "PUT",
    body: JSON.stringify(news),
  });

export const deleteNewsItem = async (id: string) =>
  apiFetch<{ message: string }>(`/news/admin/${id}`, {
    method: "DELETE",
  });

export const toggleNewsPublish = async (id: string, published: boolean) =>
  apiFetch<{ published: boolean }>(`/news/admin/${id}/publish`, {
    method: "PATCH",
    body: JSON.stringify({ published }),
  });

export const createTeamMember = async (member: Omit<TeamMember, "id">) =>
  apiFetch<{ id: string }>("/team", {
    method: "POST",
    body: JSON.stringify(member),
  });

export const updateTeamMember = async (id: string, member: Partial<TeamMember>) =>
  apiFetch<{ id: string }>(`/team/${id}`, {
    method: "PUT",
    body: JSON.stringify(member),
  });

export const deleteTeamMember = async (id: string) =>
  apiFetch<{ message: string }>(`/team/${id}`, {
    method: "DELETE",
  });

export const createPhotoCardTemplate = async (template: Omit<PhotoCardTemplate, "id">) =>
  apiFetch<{ id: string }>("/photocard-templates", {
    method: "POST",
    body: JSON.stringify(template),
  });

export const updatePhotoCardTemplate = async (id: string, template: Partial<PhotoCardTemplate>) =>
  apiFetch<{ id: string }>(`/photocard-templates/${id}`, {
    method: "PUT",
    body: JSON.stringify(template),
  });

export const deletePhotoCardTemplate = async (id: string) =>
  apiFetch<{ message: string }>(`/photocard-templates/${id}`, {
    method: "DELETE",
  });

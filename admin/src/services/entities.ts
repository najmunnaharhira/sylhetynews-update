import { NewsItem, CategoryItem, TeamMember, PhotoCardTemplate } from "../types/entities";
import { apiFetch } from "../lib/api";

export const fetchNews = async (): Promise<NewsItem[]> => {
  const response = await apiFetch<{ news: NewsItem[] }>("/news/admin/all");
  return response.news ?? [];
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
  return response.templates ?? [];
};

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

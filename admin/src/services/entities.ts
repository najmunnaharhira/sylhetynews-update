import { NewsItem, CategoryItem, TeamMember, PhotoCardTemplate } from '../types/entities';
import api from '../lib/api';

export const fetchNews = async (): Promise<NewsItem[]> => {
  const res = await api.get('/news');
  return res.data;
};

export const fetchCategories = async (): Promise<CategoryItem[]> => {
  const res = await api.get('/categories');
  return res.data;
};

export const fetchTeam = async (): Promise<TeamMember[]> => {
  const res = await api.get('/team');
  return res.data;
};

export const fetchPhotoCardTemplates = async (): Promise<PhotoCardTemplate[]> => {
  const res = await api.get('/photocard-templates');
  return res.data;
};

// Team CRUD
export const createTeamMember = async (member: Omit<TeamMember, "id">) => {
  const res = await api.post("/team", member);
  return res.data;
};

export const updateTeamMember = async (id: string, member: Partial<TeamMember>) => {
  const res = await api.put(`/team/${id}`, member);
  return res.data;
};

export const deleteTeamMember = async (id: string) => {
  const res = await api.delete(`/team/${id}`);
  return res.data;
};

// PhotoCardTemplate CRUD
export const createPhotoCardTemplate = async (tpl: Omit<PhotoCardTemplate, "id">) => {
  const res = await api.post("/photocard-templates", tpl);
  return res.data;
};

export const updatePhotoCardTemplate = async (id: string, tpl: Partial<PhotoCardTemplate>) => {
  const res = await api.put(`/photocard-templates/${id}`, tpl);
  return res.data;
};

export const deletePhotoCardTemplate = async (id: string) => {
  const res = await api.delete(`/photocard-templates/${id}`);
  return res.data;
};

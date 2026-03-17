// Centralized API response types for frontend
import { NewsArticle, NewsCategory, User } from "./news";
import { TeamMember } from "./team";

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// News API
export type NewsListResponse = ApiResponse<NewsArticle[]>;
export type NewsDetailResponse = ApiResponse<NewsArticle>;

// Category API
export type CategoryListResponse = ApiResponse<NewsCategory[]>;
export type CategoryDetailResponse = ApiResponse<NewsCategory>;

// Team API
export type TeamListResponse = ApiResponse<TeamMember[]>;
export type TeamDetailResponse = ApiResponse<TeamMember>;

// User API
export type UserListResponse = ApiResponse<User[]>;
export type UserDetailResponse = ApiResponse<User>;

// Auth API
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: string;
  token: string;
}
export type AuthResponse = ApiResponse<AuthUser>;

// Upload API
export interface UploadImageResponse {
  success: boolean;
  url: string;
  filename: string;
}

export interface UploadImagesResponse {
  success: boolean;
  files: { url: string; filename: string }[];
}

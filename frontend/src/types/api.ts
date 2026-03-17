// API response types for frontend
import { NewsArticle, NewsCategory, User } from "./news";
import { TeamMember } from "./team";

export interface ApiListResponse<T> {
  [key: string]: T[];
}

export interface ApiItemResponse<T> {
  [key: string]: T;
}

export interface ApiIdResponse {
  id: string;
}

export interface ApiSuccessResponse {
  success: boolean;
}

export interface ApiErrorResponse {
  error: string;
}

// Specific API responses
export type NewsListResponse = ApiListResponse<NewsArticle>; // { news: NewsArticle[] }
export type NewsItemResponse = ApiItemResponse<NewsArticle>; // { news: NewsArticle }
export type CategoryListResponse = ApiListResponse<NewsCategory>; // { categories: NewsCategory[] }
export type CategoryItemResponse = ApiItemResponse<NewsCategory>; // { category: NewsCategory }
export type TeamListResponse = ApiListResponse<TeamMember>; // { team: TeamMember[] }
export type TeamItemResponse = ApiItemResponse<TeamMember>; // { member: TeamMember }
export type UserListResponse = ApiListResponse<User>; // { users: User[] }
export type UserItemResponse = ApiItemResponse<User>; // { user: User }

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UploadImageResponse {
  success: boolean;
  url: string;
  filename: string;
}

export interface UploadImagesResponse {
  success: boolean;
  files: { url: string; filename: string }[];
}

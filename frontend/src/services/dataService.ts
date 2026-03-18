/**
 * Unified data service: uses Backend API when VITE_API_URL is set, otherwise Firebase.
 * Import newsService, categoryService, teamService, imageService from here.
 */

import { api, newsService as apiNews, categoryService as apiCategories, teamService as apiTeam, imageService as apiImage } from './apiService';
import { adminService as apiAdmin } from './apiService';


const useApi = true; // Force API usage, deprecate Firebase

export const newsService = apiNews;
export const categoryService = apiCategories;
export const teamService = apiTeam;
export const imageService = apiImage;
export const adminService = apiAdmin;

export { api };


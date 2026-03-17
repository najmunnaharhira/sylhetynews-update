/**
 * Unified data service: backend API only.
 * Import newsService, categoryService, teamService, imageService from here.
 */

import { api, newsService as apiNews, categoryService as apiCategories, teamService as apiTeam, imageService as apiImage } from './apiService';
import { adminService as apiAdmin } from './apiService';

export const newsService = apiNews;
export const categoryService = apiCategories;
export const teamService = apiTeam;
export const imageService = apiImage;
export const adminService = apiAdmin;

export { api };

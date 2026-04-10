/**
 * Unified data service: uses Backend API when VITE_API_URL is set, otherwise Firebase.
 * Import newsService, categoryService, teamService, imageService from here.
 */

import { api, newsService as apiNews, categoryService as apiCategories, teamService as apiTeam, imageService as apiImage } from './apiService';
import {
  newsService as firebaseNews,
  categoryService as firebaseCategories,
  teamService as firebaseTeam,
  imageService as firebaseImage,
} from './firebaseService';

const useApi = api.isConfigured();

export const newsService = useApi ? apiNews : firebaseNews;
export const categoryService = useApi ? apiCategories : firebaseCategories;
export const teamService = useApi ? apiTeam : firebaseTeam;
export const imageService = useApi ? apiImage : firebaseImage;

export { api };
export { photocardTemplateService } from './firebaseService';

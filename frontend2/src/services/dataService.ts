/**
 * Unified data service: uses Backend API when VITE_API_URL is set, otherwise Firebase.
 * Import newsService, categoryService, teamService, imageService from here.
 */

import { api, newsService as apiNews, categoryService as apiCategories, teamService as apiTeam, imageService as apiImage } from './apiService';
import { adminService as apiAdmin } from './apiService';
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
export const adminService = useApi
  ? apiAdmin
  : {
      async getBusinessSettings() {
        return {
          siteName: 'Sylhety News',
          contactEmail: '',
          contactPhone: '',
          contactAddress: '',
          adRatePer1000Views: 2.5,
        };
      },
      async updateBusinessSettings() {
        return;
      },
      async getRevenueSummary() {
        return {
          totalNews: 0,
          publishedNews: 0,
          unpublishedNews: 0,
          totalViews: 0,
          adRatePer1000Views: 2.5,
          estimatedRevenue: 0,
        };
      },
    };

export { api };
export { photocardTemplateService } from './firebaseService';

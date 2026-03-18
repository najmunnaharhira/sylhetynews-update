/**
 * Unified data service: uses Backend API only. Firebase is deprecated and removed.
 * Import newsService, categoryService, teamService, imageService from here.
 */

import { api, newsService, categoryService, teamService, imageService } from './apiService';
import { adminService } from './apiService';

export { api, newsService, categoryService, teamService, imageService, adminService };


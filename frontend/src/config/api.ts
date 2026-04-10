/**
 * Shared backend API config for admin access and data.
 * When VITE_API_URL is set, admin login and all admin data (news, categories, team) use the backend.
 */

export const ADMIN_TOKEN_KEY = "admin_jwt_token";

function getEnvApiUrl(): string {
  const url = import.meta.env.VITE_API_URL;
  return typeof url === "string" ? url.trim() : "";
}

export function getApiBaseUrl(): string {
  const url = getEnvApiUrl();
  return url ? url.replace(/\/$/, "") : "http://localhost:5000";
}

export function isBackendConfigured(): boolean {
  return getEnvApiUrl().length > 0;
}

export function getAdminToken(): string | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

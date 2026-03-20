/**
 * Shared backend API config for admin access and data.
 * When VITE_API_URL is set, admin login and all admin data (news, categories, team) use the backend.
 */

// Removed admin token helpers (now in admin folder)
function getEnvApiUrl(): string {
  const url = import.meta.env.VITE_API_URL;
  return typeof url === "string" ? url.trim() : "";
}

export function getApiBaseUrl(): string {
  const url = getEnvApiUrl();
  return url ? url.replace(/\/$/, "") : "http://localhost:5000";
}

export function isBackendConfigured(): boolean {
  const provider = (import.meta.env.VITE_DATA_PROVIDER || "").toLowerCase();
  // Firebase provider removed
  return true;
}

export function getAdminToken(): string | null {
  return localStorage.getItem("admin_jwt_token");
}

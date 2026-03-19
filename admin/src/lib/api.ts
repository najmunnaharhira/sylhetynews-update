// Unified API service for admin panel
// All backend calls should go through here for maintainability

const LOCAL_TOKEN_KEY = "admin_jwt_token";
const SESSION_TOKEN_KEY = "admin_jwt_token_session";

const resolveApiBase = () => {
  const envBase = import.meta.env.VITE_API_URL?.trim();
  if (envBase) {
    return envBase.replace(/\/$/, "");
  }

  if (import.meta.env.DEV) {
    return "http://127.0.0.1:5000/api";
  }

  return "/api";
};

const API_BASE = resolveApiBase();
const API_ORIGIN = API_BASE.replace(/\/api$/, "");

const getStoredAdminToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(LOCAL_TOKEN_KEY) || sessionStorage.getItem(SESSION_TOKEN_KEY);
};

export function resolveApiAssetUrl(value?: string | null): string | undefined {
  if (!value) {
    return undefined;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return value.startsWith("/") ? `${API_ORIGIN}${value}` : `${API_ORIGIN}/${value}`;
}

export async function checkBackendHealth(): Promise<{
  online: boolean;
  dbConnected: boolean | null;
  message: string;
}> {
  try {
    const response = await fetch(`${API_ORIGIN}/api/health`);
    if (!response.ok) {
      return {
        online: false,
        dbConnected: null,
        message: `Backend health check failed at ${API_ORIGIN}/api/health.`,
      };
    }

    const data = (await response.json()) as {
      status?: string;
      db?: { connected?: boolean; error?: string | null };
    };

    if (data.db?.connected === false) {
      return {
        online: true,
        dbConnected: false,
        message: data.db.error
          ? `Backend is online, but the database is unavailable: ${data.db.error}`
          : "Backend is online, but the database is not connected.",
      };
    }

    return {
      online: true,
      dbConnected: true,
      message: "Backend connection is ready.",
    };
  } catch {
    return {
      online: false,
      dbConnected: null,
      message: `Cannot reach backend API at ${API_BASE}. Start the backend server and try again.`,
    };
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredAdminToken();
  const headers = new Headers(options.headers);

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch {
    throw new Error(`Cannot reach backend API at ${API_BASE}. Start the backend server and try again.`);
  }

  if (!res.ok) {
    let errorMsg = "API error";
    try {
      const data = await res.json();
      errorMsg = data.error || errorMsg;
    } catch {
      if (res.status === 404) {
        errorMsg = `API route not found at ${API_BASE}${path}`;
      }
    }
    throw new Error(errorMsg);
  }

  return res.json();
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("image", file);

  const response = await apiFetch<{ url: string }>("/upload/image", {
    method: "POST",
    body: form,
  });

  return resolveApiAssetUrl(response.url) || response.url;
}

// Example usage:
// const news = await apiFetch<NewsItem[]>("/news");

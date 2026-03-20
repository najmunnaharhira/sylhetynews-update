// Unified API service for admin panel
// All backend calls should go through here for maintainability

const API_BASE = import.meta.env.VITE_API_URL || "/api";
const ABSOLUTE_URL_PATTERN = /^(?:[a-z]+:)?\/\//i;
const GOOGLE_DRIVE_ID_PATTERNS = [
  /\/file\/d\/([a-zA-Z0-9_-]{10,})/i,
  /\/d\/([a-zA-Z0-9_-]{10,})/i,
  /[?&]id=([a-zA-Z0-9_-]{10,})/i,
  /\/thumbnail\?id=([a-zA-Z0-9_-]{10,})/i,
];

const getApiOrigin = (): string => {
  if (ABSOLUTE_URL_PATTERN.test(API_BASE)) {
    return API_BASE.replace(/\/api\/?$/, "").replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
};

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("admin_jwt_token");
  const headers = new Headers(options.headers);

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    let errorMsg = "API error";
    try {
      const data = await res.json();
      errorMsg = data.error || errorMsg;
    } catch {}
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

  return response.url;
}

export function extractGoogleDriveFileId(value?: string | null): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) {
    return "";
  }

  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) {
    return trimmed;
  }

  for (const pattern of GOOGLE_DRIVE_ID_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return "";
}

export function normalizeMediaInput(value?: string | null): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) {
    return "";
  }

  const driveFileId = extractGoogleDriveFileId(trimmed);
  if (driveFileId) {
    return `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w1600`;
  }

  return trimmed;
}

export function resolveApiAssetUrl(path?: string | null): string {
  const normalizedPath = normalizeMediaInput(path);
  if (!normalizedPath) {
    return "";
  }

  if (
    ABSOLUTE_URL_PATTERN.test(normalizedPath) ||
    normalizedPath.startsWith("data:") ||
    normalizedPath.startsWith("blob:")
  ) {
    return normalizedPath;
  }

  const origin = getApiOrigin();
  if (!origin) {
    return normalizedPath;
  }

  if (normalizedPath.startsWith("/")) {
    return `${origin}${normalizedPath}`;
  }

  return `${origin}/${normalizedPath.replace(/^\.?\//, "")}`;
}

// Example usage:
// const news = await apiFetch<NewsItem[]>("/news");

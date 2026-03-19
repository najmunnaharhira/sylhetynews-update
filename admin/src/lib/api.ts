// Unified API service for admin panel
// All backend calls should go through here for maintainability

const API_BASE = import.meta.env.VITE_API_URL || "/api";

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

// Example usage:
// const news = await apiFetch<NewsItem[]>("/news");

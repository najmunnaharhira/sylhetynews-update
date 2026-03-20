const SHELL_CACHE = "sylhety-admin-shell-v1";
const ASSET_CACHE = "sylhety-admin-assets-v1";
const SCOPE_URL = new URL(self.registration.scope);
const BASE_PATH = SCOPE_URL.pathname.endsWith("/")
  ? SCOPE_URL.pathname
  : `${SCOPE_URL.pathname}/`;
const buildScopedUrl = (path = "") => new URL(path, SCOPE_URL).toString();
const APP_SHELL_URLS = [
  buildScopedUrl(""),
  buildScopedUrl("index.html"),
  buildScopedUrl("manifest.webmanifest"),
  buildScopedUrl("icon-192.png"),
  buildScopedUrl("icon-512.png"),
  buildScopedUrl("sylhety-logo.jpeg"),
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== SHELL_CACHE && key !== ASSET_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

const getScopedPath = (url) => {
  if (!url.pathname.startsWith(BASE_PATH)) {
    return null;
  }

  return url.pathname.slice(BASE_PATH.length).replace(/^\/+/, "");
};

const shouldHandleAsset = (scopedPath) =>
  scopedPath.startsWith("assets/") ||
  scopedPath === "manifest.webmanifest" ||
  /\.(?:png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf)$/i.test(scopedPath);

const isBypassedRoute = (scopedPath) =>
  scopedPath.startsWith("api/") ||
  scopedPath.startsWith("uploads/") ||
  scopedPath.startsWith("src/") ||
  scopedPath.startsWith("@vite/");

const networkFirstPage = async (request) => {
  try {
    const response = await fetch(request);

    if (response?.ok) {
      const cache = await caches.open(SHELL_CACHE);
      await cache.put(buildScopedUrl("index.html"), response.clone());
    }

    return response;
  } catch {
    return (
      (await caches.match(request)) ||
      (await caches.match(buildScopedUrl("index.html"))) ||
      new Response("Offline", { status: 503, statusText: "Offline" })
    );
  }
};

const staleWhileRevalidate = async (request) => {
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => {
      if (response?.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  return cached || networkPromise || new Response("", { status: 504, statusText: "Gateway Timeout" });
};

const cacheFirst = async (request) => {
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response?.ok) {
    cache.put(request, response.clone());
  }
  return response;
};

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  const scopedPath = getScopedPath(url);
  if (url.origin !== SCOPE_URL.origin || scopedPath === null || isBypassedRoute(scopedPath)) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (scopedPath.startsWith("assets/")) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  if (shouldHandleAsset(scopedPath)) {
    event.respondWith(cacheFirst(request));
  }
});

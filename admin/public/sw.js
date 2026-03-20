const SHELL_CACHE = "sylhety-admin-shell-v1";
const ASSET_CACHE = "sylhety-admin-assets-v1";
const APP_SHELL_URLS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/sylhety-logo.jpeg",
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

const shouldHandleAsset = (url) =>
  url.pathname.startsWith("/assets/") ||
  url.pathname === "/manifest.webmanifest" ||
  /\.(?:png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf)$/i.test(url.pathname);

const isBypassedRoute = (url) =>
  url.pathname.startsWith("/api/") ||
  url.pathname.startsWith("/uploads/") ||
  url.pathname.startsWith("/src/") ||
  url.pathname.startsWith("/@vite/");

const networkFirstPage = async (request) => {
  try {
    const response = await fetch(request);

    if (response?.ok) {
      const cache = await caches.open(SHELL_CACHE);
      await cache.put("/index.html", response.clone());
    }

    return response;
  } catch {
    return (
      (await caches.match(request)) ||
      (await caches.match("/index.html")) ||
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
  if (url.origin !== self.location.origin || isBypassedRoute(url)) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  if (shouldHandleAsset(url)) {
    event.respondWith(cacheFirst(request));
  }
});

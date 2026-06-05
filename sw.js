const CACHE_NAME = "gds-notes-v9";

// Cache hone wali zaroori files ki list (Optional but recommended)
const ASSETS = [
  "./",
  "./index.html",
  "./RSH.png" 
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Sirf GET requests handle karein
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Response milne par use cache mein update karein
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => {
        // Network fail hone par cache se lein
        return caches.match(event.request);
      })
  );
});

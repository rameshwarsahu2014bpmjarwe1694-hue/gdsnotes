const CACHE_NAME = "gds-notes-v14";

const ASSETS = [
  "./",
  "./index.html",
  "./login.html",
  "./register.html",
  "./admin.html",
  "./manifest.json",
  "./RSH.png",
  "./icon-192.png",
  "./icon-512.png",
  "./quiz.html",
  "./pyq.html",
  "./notes.html"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});

const CACHE_NAME = 'dev-coffee-site-v4'
const assets = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/app.js",
  "/img/coffee1.jpg",
  "/img/coffee2.jpg",
  "/img/coffee3.jpg",
  "/img/coffee4.jpg",
  "/img/coffee5.jpg",
  "/img/coffee6.jpg",
  "/img/coffee7.jpg",
  "/img/coffee8.jpg",
  "/img/coffee9.jpg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((existingCacheName) => {
          if (existingCacheName !== CACHE_NAME) {
            // Delete old caches
            return caches.delete(existingCacheName);
          }
        })
      );
    })
  );

  // Ensure that the new service worker takes control immediately
  event.waitUntil(self.clients.claim());
});
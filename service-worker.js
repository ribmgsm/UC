const CACHE_NAME = "ucoin-cache-v1";

const urlsToCache = [
  "/",
  "/app.html",
  "/manifest.json",
  "/UCoin.png"
];

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(urlsToCache);
    })

  );

});

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
    .then(response => {

      return response || fetch(event.request);

    })

  );

});
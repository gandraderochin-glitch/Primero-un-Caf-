const CACHE_NAME = 'nutrilens-v1';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for API calls, cache-first for app shell assets.
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  if (url.includes('api.anthropic.com') || url.includes('cdnjs.cloudflare.com') || url.includes('fonts.g')) {
    return; // let these go straight to network, don't intercept
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

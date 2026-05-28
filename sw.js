const CACHE_NAME = 'flt-v9';
const ASSETS = [
    './',
    './index.html',
    './css/styles.css',
    './js/data.js',
    './js/storage.js',
    './js/dashboard.js',
    './js/weighin.js',
    './js/gym.js',
    './js/analytics.js',
    './js/meals.js',
    './js/program.js',
    './js/exercises.js',
    './js/settings.js',
    './js/app.js',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

// Install - cache all assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => 
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// Fetch - serve from cache, fall back to network
self.addEventListener('fetch', event => {
    // Skip Chart.js CDN - always fetch from network
    if (event.request.url.includes('cdn.jsdelivr.net')) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cached => cached || fetch(event.request))
    );
});

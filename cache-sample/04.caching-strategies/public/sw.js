const VERSION = 1;
const CACHE_NAME = 'my-cache-v';
const CACHE_URLS = ['/', '/javascripts/index.js'];

self.addEventListener('install', async (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME + VERSION);
        await cache.addAll(CACHE_URLS);
    })());
});

// Cache First：キャッシュを優先
// self.addEventListener('fetch', function (event) {
//     event.respondWith((async () => {
//         const cachedResponse = await caches.match(event.request);
//         return cachedResponse || fetch(event.request);
//     })());
// });


// Network First：ネットワークを優先
// self.addEventListener('fetch', function (event) {
//     event.respondWith((async () => {
//         if (navigator.onLine) {
//             const response = await fetch(event.request);
//             if (response.ok) {
//                 return response
//             }
//         } else {
//             const cachedResponse = await caches.match(event.request);
//             return cachedResponse;
//         }
//     })());
// });

// Stale While Revalidate：キャッシュでレスポンスしつつリソースを更新
self.addEventListener('fetch', async (event) => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME + VERSION);
        const cachedResponse = await caches.match(event.request);
        const networkResponse = fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
        })
        return cachedResponse || networkResponse;
    })());
});

// Network-Only：常にネットワークからリソースを取得
// self.addEventListener('fetch', event => {
//     event.respondWith(fetch(event.request));
// });

// Cache-Only：キャッシュのみを利用
// self.addEventListener('fetch', event => {
//     event.respondWith(caches.match(event.request));
// });

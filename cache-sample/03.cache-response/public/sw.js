const VERSION = 1;
const CACHE_NAME = 'my-cache-v';
const CACHE_URLS = ['/', '/javascripts/index.js'];

self.addEventListener('install', async (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME + VERSION);
        await cache.addAll(CACHE_URLS);
    })());
});

// event.respondWithの引数がasyncの即時実行関数の例
self.addEventListener('fetch', function (event) {
    event.respondWith((async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        }
        const response = await fetch(event.request);
        return response;
    })());
});

// event.respondWithの引数がPromiseチェーンの例
// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then((cachedResponse) => {
//                 if (cachedResponse) {
//                     return cachedResponse;
//                 }
//                 return fetch(event.request);
//             })
//     );
// });



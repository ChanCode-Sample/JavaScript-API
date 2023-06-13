const VERSION = 2;
const CACHE_NAME = 'my-cache-v';
const CACHE_URLS = ['/', '/javascripts/index.js'];

// waitUntilの引数がasyncの即時実行関数になっている例
self.addEventListener('install', async (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME + VERSION);
        await cache.addAll(CACHE_URLS);
    })());
});

// // waitUntilの引数がPromiseチェーンになっている例
// self.addEventListener('install', async (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then((cache) => cache.addAll(CACHE_URLS))
//     );
// });


// waitUntilの引数がasyncの即時実行関数になっている例
self.addEventListener('activate', async (event) => {
    event.waitUntil((async () => {
        await caches.delete(CACHE_NAME + (VERSION - 1))
    })());
});

// waitUntilの引数がPromiseチェーンになっている例
// self.addEventListener('activate', async (event) => {
//     event.waitUntil(caches.delete(CACHE_NAME + (VERSION - 1)));
// });


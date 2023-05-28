// fetchイベントでリクストを横取りし、ダミーのレスポンスを返却
self.addEventListener('fetch', (event) => {
    event.respondWith(new Response('ServiceWorkerでレスポンス'));
});

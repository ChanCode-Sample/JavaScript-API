// pushイベント発生時にプッシュ通知を表示
self.addEventListener('push', event => {
    const message = event.data.text();// 文字列を取得
    // const { message } = event.data.json();// JSONを取得
    event.waitUntil(
        self.registration.showNotification(message)
    );
});

// プッシュ通知クリック時にGoogleに遷移させる
self.addEventListener('notificationclick', () => {
    clients.openWindow('https://www.google.com/')
});


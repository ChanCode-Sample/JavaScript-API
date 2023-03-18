(async () => {
    // Service Workerの登録
    const registration = await navigator.serviceWorker.register('./service_worker.js');

    // NotificaitonAPI 通知の許可を確認
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {

        // subscriptionオブジェクトを取得
        let subscription = await registration.pushManager.getSubscription();
        if (!subscription) { // subscriptionオブジェクトがない場合
            // サーバー側で生成した公開鍵を取得し、urlBase64ToUint8Array()を使ってUit8Arrayに変換
            const res = await fetch('/key');
            const vapidPublicKey = await res.text();
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

            // ユーザがプッシュサービスに加入しSubscriptionオブジェクトを取得
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            });

            // サーバーにSubscriptionオブジェクトを送信
            await fetch('/register', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
})();


// VAPID公開鍵をUint8Arrayに変換する関数
// 参考：https://github.com/mdn/serviceworker-cookbook/blob/fb3b7c5584f89aaa0893d2d7eb9f7f6261dcfde4/tools.js#L4
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


// 通知を表示する関数
const btn = document.getElementById('btn');
btn.addEventListener('click', async () => {
    const notification = new Notification('通知', { body: '通知の内容', icon: '../img/fish.png' });
    notification.addEventListener('close', () => alert('通知を閉じた'));
    notification.addEventListener('click', () => alert('通知をクリックした'));
});

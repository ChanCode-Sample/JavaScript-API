const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const webPush = require('web-push'); // web-push導入

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Push通知用のVAPIDキーを生成
const vapidKeys = webPush.generateVAPIDKeys();

// プッシュメッセージの暗号化に使用するキー(Unit8Array)を設定
webPush.setVapidDetails(
    'https://localhost:3000/', 
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

// クライアントに公開鍵を返すルートハンドラ
app.get('/key', (req, res) => {
    res.send(vapidKeys.publicKey);
});

// サブスクリプションを保存する配列
const subscriptions = [];

// サブスクリプションオブジェクトを受け取るルートハンドラ
app.post('/register', (req, res) => {
    const subscription = req.body;
    // サブスクリプションを配列に保存
    subscriptions.push(subscription);
    // レスポンスを返す
    res.status(201).json({});
});

// プッシュメッセージを送信するルートハンドラ
app.post('/send-notification', async (req, res) => {
    const message = 'Hello, world!';
    // const message = '{"message" : "Hello, JSON"}';    
    // 保存されたサブスクリプションにプッシュ通知を送信
    for (subscription of subscriptions) {
        try {
            await webPush.sendNotification(subscription, message);
        } catch (e) {
            console.log('このSubscriptionオブジェクトには送信できませんでした：' + JSON.stringify(subscription));
            subscriptions.splice(subscriptions.indexOf(subscription), 1);
        }
    }
    // レスポンスを返す
    res.status(200).end();
});

module.exports = app;

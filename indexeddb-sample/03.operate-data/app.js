// オブジェクトストアの定義
await idb.openDB('sample-db', 1, {
    upgrade(db) {
        const sampleStore = db.createObjectStore('sampleStore', { keyPath: 'id' });
        sampleStore.createIndex('sampleIndex', 'name');
    },
});

// DBのオープン
const db = await idb.openDB('sample-db');
// トランザクション開始
const tx = db.transaction(['sampleStore'], 'readwrite');
// オブジェクトストアの取得
const sampleStore = tx.objectStore('sampleStore');
// データの追加
await sampleStore.add({ id: 1, name: 'ユーザー１' });
// データの更新
await sampleStore.put({ id: 1, name: 'ユーザー9' });
// データの削除
await sampleStore.delete(1);

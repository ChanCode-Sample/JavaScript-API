// DBのオープン
let db = await idb.openDB('sample-db', 1, {
    // 構造の定義
    upgrade(db) {
        // オブジェクトストアの定義
        const sampleStore = db.createObjectStore('sampleStore', { keyPath: 'id' });
        // インデックスの定義
        sampleStore.createIndex('sampleIndex', 'name', { unique: true, multiEntry: true});
    },
});

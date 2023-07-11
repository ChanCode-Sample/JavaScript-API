// DBのオープン
let db = await idb.openDB('sample-db', 1, {
    // 構造の定義
    upgrade(db) {
        db.createObjectStore('usersStore', { keyPath: 'id' });
    },
});

// データの投入
let tx = db.transaction('usersStore', 'readwrite');
let usersStore = tx.objectStore('usersStore');
await usersStore.add({ id: 1, name: 'ユーザー１' });

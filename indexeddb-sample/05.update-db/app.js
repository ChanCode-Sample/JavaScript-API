// データベースの定義
await idb.openDB('sample-db', 1, {
    async upgrade(db) {
        const sampleStore = db.createObjectStore('sampleStore', { keyPath: 'id' });
        // バージョンアップ時に削除予定のオブジェクトストア
        const deleteStore = db.createObjectStore('deleteStore', { keyPath: 'id' });
        sampleStore.createIndex('nameIndex', 'name');
        // バージョンアップ時に削除予定のインデックス
        sampleStore.createIndex('deleteIndex', 'age');
        // 確認用データの追加
        const datas = [
            { id: 3, name: 'ユーザー３', age: 20, group: ['D', 'E'] },
            { id: 1, name: 'ユーザー１', age: 20, group: ['A', 'B'] },
            { id: 2, name: 'ユーザー２', age: 30, group: ['A', 'C'] },
        ];
        for (const data of datas) {
            await sampleStore.put(data);
        }
    },
});

// データベース定義の更新
await idb.openDB('sample-db', 2, {
    async upgrade(db, oldVersion, newVersion, transaction) {
        // オブジェクトストアの追加
        db.createObjectStore('newStore', { keyPath: 'id' });
        // オブジェクトストアの削除
        db.deleteObjectStore('deleteStore');

        // 既存のオブジェクトストアの取得
        const sampleStore = transaction.objectStore('sampleStore');
        // インデックスの追加
        sampleStore.createIndex('newIndex', 'group');
        // インデックスの削除
        sampleStore.deleteIndex('deleteIndex');
    },
});

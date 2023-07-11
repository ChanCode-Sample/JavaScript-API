// データベースの定義
await idb.openDB('sample-db', 1, {
    async upgrade(db) {
        const sampleStore = db.createObjectStore('sampleStore', { keyPath: 'id' });
        sampleStore.createIndex('nameIndex', 'name');
        sampleStore.createIndex('ageIndex', 'age');
        sampleStore.createIndex('groupIndex', 'group', { multiEntry: true });
        // 確認用データの追加
        const datas = [
            { id: 1, name: 'ユーザー１', age: 20, group: ['A', 'B'] },
            { id: 2, name: 'ユーザー２', age: 30, group: ['A', 'C'] },
            { id: 3, name: 'ユーザー３', age: 20, group: ['D', 'E'] },
        ];
        for (const data of datas) {
            await sampleStore.put(data);
        }
    },
});

// DBのオープン
const db = await idb.openDB('sample-db');
// トランザクション開始
const tx = db.transaction(['sampleStore'], 'readonly');
// オブジェクトストアの取得
const sampleStore = tx.objectStore('sampleStore');
// インデックスの取得
const nameIndex = sampleStore.index('nameIndex');
const ageIndex = sampleStore.index('ageIndex');
const groupIndex = sampleStore.index('groupIndex');

// 主キー検索
const pkResult = await sampleStore.get(1);
console.log(pkResult);

// 全件検索
const allReslut = await sampleStore.getAll();
console.log(allReslut);

// インデックス検索（１件のみ）
const idxResult = await nameIndex.get('ユーザー１');
console.log(idxResult);

// インデックス検索（複数件）
const idxMulti = await ageIndex.getAll(20);
console.log(idxMulti);

// インデックス検索（配列）
const arrResult = await groupIndex.getAll('A');
console.log(arrResult);

// 範囲検索
// 下限指定
const rangeResult = await ageIndex.getAll(IDBKeyRange.lowerBound(25));
// const rangeResult = await ageIndex.getAll(IDBKeyRange.lowerBound(25, true));
// 上限指定
// const rangeResult = await ageIndex.getAll(IDBKeyRange.upperBound(25));
// 範囲指定
// const rangeResult = await ageIndex.getAll(IDBKeyRange.bound (30, 31));
console.log(rangeResult);

// カーソルでの全件検索
let cursor = await sampleStore.openCursor();
while (cursor) {
  console.log(cursor.key, cursor.value);
  cursor = await cursor.continue();
}

// DBのオープン
const request = indexedDB.open('sample-db', 1);

// 構造の定義
request.addEventListener('upgradeneeded', (event) => {
    const db = event.target.result;
    const objectStore = db.createObjectStore('usersStore', { keyPath: 'id' });
    objectStore.createIndex('nameIndex', 'name', { unique: false });
});

// データの投入
request.addEventListener('success', (event) => {
    const db = event.target.result;
    const tx = db.transaction(['usersStore'], 'readwrite');
    const usersStore = tx.objectStore('usersStore');
    usersStore.add({ id: 1, name: 'ユーザー１' });
});


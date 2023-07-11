// データベースの定義
const request = indexedDB.open('sample-db', 1);
request.onupgradeneeded = function (event) {
    const db = event.target.result;
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
        const addRequest = sampleStore.add(data);
        addRequest.onsuccess = function (event) {
            console.log('データが追加されました');
        };
        addRequest.onerror = function (event) {
            console.error('データの追加中にエラーが発生しました', event.target.error);
        };
    }
};

request.onsuccess = function (event) {
    const db = event.target.result;
    // トランザクション開始
    const tx = db.transaction(['sampleStore'], 'readonly');
    const sampleStore = tx.objectStore('sampleStore');
    const nameIndex = sampleStore.index('nameIndex');
    const ageIndex = sampleStore.index('ageIndex');
    const groupIndex = sampleStore.index('groupIndex');

    // 主キー検索
    const getRequest = sampleStore.get(1);
    getRequest.onsuccess = function (event) {
        const result = event.target.result;
        console.log(result);
    };
    getRequest.onerror = function (event) {
        console.error('データの取得中にエラーが発生しました', event.target.error);
    };

    // 全件検索
    const getAllRequest = sampleStore.getAll();
    getAllRequest.onsuccess = function (event) {
        const result = event.target.result;
        console.log(result);
    };
    getAllRequest.onerror = function (event) {
        console.error('全件検索中にエラーが発生しました', event.target.error);
    };

    // インデックス検索（１件のみ）
    const idxGetRequest = nameIndex.get('ユーザー１');
    idxGetRequest.onsuccess = function (event) {
        const result = event.target.result;
        console.log(result);
    };
    idxGetRequest.onerror = function (event) {
        console.error('インデックス検索中にエラーが発生しました', event.target.error);
    };

    // インデックス検索（複数件）
    const idxGetAllRequest = ageIndex.getAll(20);
    idxGetAllRequest.onsuccess = function (event) {
        const result = event.target.result;
        console.log(result);
    };
    idxGetAllRequest.onerror = function (event) {
        console.error('インデックス検索中にエラーが発生しました', event.target.error);
    };

    // インデックス検索（配列）
    const arrayGetAllRequest = groupIndex.getAll('A');
    arrayGetAllRequest.onsuccess = function (event) {
        const result = event.target.result;
        console.log(result);
    };
    arrayGetAllRequest.onerror = function (event) {
        console.error('インデックス検索中にエラーが発生しました', event.target.error);
    };

    // 範囲検索
    const range = IDBKeyRange.lowerBound(25);
    const rangeGetAllRequest = ageIndex.getAll(range);
    rangeGetAllRequest.onsuccess = function (event) {
        const result = event.target.result;
        console.log(result);
    };
    rangeGetAllRequest.onerror = function (event) {
        console.error('範囲検索中にエラーが発生しました', event.target.error);
    };

    // カーソルでの全件検索
    const cursorRequest = sampleStore.openCursor();
    cursorRequest.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
            console.log(cursor.value);
            cursor.continue();
        }
    };
    cursorRequest.onerror = function (event) {
        console.error('カーソルでの全件検索中にエラーが発生しました', event.target.error);
    };
};
request.onerror = function (event) {
    console.error('データベースのオープン中にエラーが発生しました', event.target.error);
};

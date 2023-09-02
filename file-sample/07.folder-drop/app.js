const fileInput = document.querySelector('#file-input');
const fileDrop = document.querySelector('#file-drop');
const resultList = document.querySelector('#result-list');

// ファイル読み込み（非同期処理をPromise化）
const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', (event) => { resolve(event.target.result) });
        fileReader.addEventListener('error', (event) => { reject('failed to read file') });
        fileReader.readAsText(file);
    });
};

// エントリーの取得（非同期処理をPromise化）
const getEntriesFromDir = (dirEntry) => {
    return new Promise((resolve, reject) => {
        // フォルダのエントリーから、そのフォルダ内のエントリー一覧を取得
        const dirReader = dirEntry.createReader();
        dirReader.readEntries(
            entries => resolve(entries),
            error => reject('failed to get entries'));
    });
};

// Fileオブジェクトの取得（非同期処理をPromise化）
const getFileFromEntry = (fileEntry) => {
    return new Promise((resolve, reject) => {
        // ファイルエントリーからファイルオブジェクトを取得
        fileEntry.file(
            file => resolve(file),
            error => reject('failed to get file'));
    });
};


// エントリーをフォルダとファイルで分別
const devideEntries = async (dirEntries, fileEntries, entries) => {
    for (const entry of entries) {
        // エントリーがフォルダの場合、この処理を再帰的に呼び出し
        if (entry.isDirectory) {
            dirEntries.push(entry);
            // そのフォルダ内のエントリーを取得
            const innerEntries = await getEntriesFromDir(entry);
            // エントリーをフォルダとファイルで分別（再帰呼び出し）
            await devideEntries(dirEntries, fileEntries, innerEntries);
        }
        if (entry.isFile) {
            fileEntries.push(entry);
        }
    }
};

// 画面表示用の要素オブジェクトを生成（フォルダレベル）
// ※ ファイル操作とは無関係なDOM操作だけの関数
// ↓↓↓生成する構造↓↓↓これをフォルダ数分作る
// <li id="フォルダのパス">
//     <h2>フォルダのパス</h2>
//     <ul>
//          ここにファイル内容のli要素を配置予定
//     </ul>
// </li>
const generateDirHtml = (dirEntries) => {
    const dirHtmlArr = [];
    for (const dirEntry of dirEntries) {
        const li = document.createElement('li');
        li.id = dirEntry.fullPath;

        const h2 = document.createElement('h2');
        const content = document.createTextNode(`${dirEntry.fullPath}`);
        h2.appendChild(content);
        li.appendChild(h2);

        const ul = document.createElement('ul');
        li.appendChild(ul);

        const dirHtmlObj = {
            // フォルダパスを保持（ファイルと紐付けるため）
            path: dirEntry.fullPath,
            html: li
        }
        dirHtmlArr.push(dirHtmlObj);
    }
    return dirHtmlArr;
};

// 画面表示用の要素オブジェクトを生成（ファイルレベル）
// ↓↓↓生成する構造↓↓↓これをファイル数分作る
// <li>ファイル名（内容）：XXX.txt（YYYYY）</li>
const generateFileHtml = async (fileEntries) => {
    const fileHtmlArr = [];
    for (const fileEntry of fileEntries) {
        // fileメソッドでFileオブジェクトを取得
        const file = await getFileFromEntry(fileEntry);
        const fileName = file.name;
        const data = await readFile(file);

        const li = document.createElement('li');
        const content = document.createTextNode(`ファイル名（内容）：${fileName}（${data}）`);

        li.appendChild(content);

        const fileHtmlObj = {
            // 所属してるフォルダパスを保持（フォルダと紐付けるため）
            path: fileEntry.fullPath.replace(`/${fileName}`, ''),
            html: li
        }
        fileHtmlArr.push(fileHtmlObj);
    };
    return fileHtmlArr;
};


// 画面に読み取り結果を表示
const showFileList = (dirHtmlArr, fileHtmlArr) => {
    // フォルダの件数分ループ
    for (const dirHtml of dirHtmlArr) {
        // ファイルの件数分ループ
        for (const fileHtml of fileHtmlArr) {
            // フォルダとファイルの紐付けを確認
            if (dirHtml.path === fileHtml.path) {
                const ul = dirHtml.html.querySelector('ul');
                ul.appendChild(fileHtml.html);

                resultList.appendChild(dirHtml.html);
            }
        }
    }
};


// ドラッグ&ドロップでファイルを受け取る
fileDrop.addEventListener('dragover', event => event.preventDefault());
fileDrop.addEventListener('drop', async (event) => {
    event.preventDefault();
    const dirEntries = [];
    const fileEntries = [];

    // DataTransferItemのリストを取得
    const items = event.dataTransfer.items;
    const entries = [];
    for (const item of items) {
        // ドロップされたモノをエントリーとして取得
        entries.push(item.webkitGetAsEntry());
    }

    // フォルダとファイルで分別
    await devideEntries(dirEntries, fileEntries, entries);

    // 画面表示用のHTMLを用意
    const dirHtmlArr = generateDirHtml(dirEntries);
    const fileHtmlArr = await generateFileHtml(fileEntries);
    // 画面に表示
    showFileList(dirHtmlArr, fileHtmlArr);
});



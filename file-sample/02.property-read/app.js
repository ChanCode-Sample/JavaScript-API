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

// 選択されたファイルの内容を画面に表示する
const showFileContent = async (fileList) => {
    for (const file of fileList) {
        let readResult = 'テキストファイルではありません';
        if (file.type === 'text/plain') {
            readResult = await readFile(file);
        }
        const showHtml = `
        <li>
            <h2>${file.name}</h2>
            <ul>
                <li>name（ファイル名）：${file.name}</li>
                <li>lastModified（最終更新時刻のミリ秒）： ${file.lastModified}</li>
                <li>lastModifiedを日付に変換して表示： ${new Date(file.lastModified).toLocaleString()}</li>
                <li>size（バイト単位のファイルサイズ）：${file.size}</li>
                <li>type（MIMEタイプ）：${file.type}</li>
                <li>ファイルの内容：${readResult}</li>
            </ul>
        </li>
        `
        resultList.innerHTML += showHtml;
    }
};

// input要素でファイルを受け取る
fileInput.addEventListener('change', (event) => {
    const fileList = event.target.files;
    showFileContent(fileList);
});

// ドラッグ&ドロップでファイルを受け取る
fileDrop.addEventListener('dragover', event => event.preventDefault());
fileDrop.addEventListener('drop', (event) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    showFileContent(fileList);
});

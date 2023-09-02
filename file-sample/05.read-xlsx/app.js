const fileInput = document.querySelector('#file-input');
const fileDrop = document.querySelector('#file-drop');
const resultList = document.querySelector('#result-list');

// ファイル読み込み（非同期処理をPromise化）
const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', (event) => { resolve(event.target.result) });
        fileReader.addEventListener('error', (event) => { reject('failed to read file') });
        fileReader.readAsArrayBuffer(file);
    });
};

// 選択されたファイルの内容を画面に表示する
const showFileContent = async (fileList) => {
    for (const file of fileList) {
        const excelData = await readFile(file);
        const workbook = XLSX.read(excelData);
        const sheet = workbook.Sheets['Sheet1'];

        // シートの内容をCSV形式の文字列で取得
        const csvData = XLSX.utils.sheet_to_csv(sheet);
        console.log(csvData);

        // シートの内容をJSON形式の配列で取得
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log(jsonData);

        // セルのアドレスを指定して取得
        const cel = sheet['A1'];
        // vは生データ、wは表示データ
        console.log(cel.w);
        
        const showHtml = `
        <li>
            <h2>${file.name}</h2>
            <ul>
                <li>CSV形式：${csvData}</li>
                <li>JSON形式： ${JSON.stringify(jsonData)}</li>
                <li>セル指定A1：${cel.w}</li>
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

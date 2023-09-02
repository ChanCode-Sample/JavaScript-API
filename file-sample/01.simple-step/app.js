const fileInput = document.querySelector('#file-input');
const fileDrop = document.querySelector('#file-drop');
const resultList = document.querySelector('#result-list');

// 選択されたファイルの名前を画面に表示する
const showFileContent = (fileList) => {
    for (const file of fileList) {
        const li = document.createElement('li');
        const fileName = document.createTextNode(file.name);
        li.appendChild(fileName);
        resultList.appendChild(li);
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

const fileInput = document.querySelector('#file-input');
const fileDrop = document.querySelector('#file-drop');
const resultList = document.querySelector('#result-list');
const objectUrls = [];

// 選択されたファイルの内容を画面に表示する
const showFileContent = (fileList) => {
    for (const file of fileList) {
        if (file.type.startsWith('image/')) {
            const objectUrl = URL.createObjectURL(file);
            const showHtml = `
            <li>
                <h2>${file.name}</h2>
                <ul>
                    <img src=${objectUrl} style="height:150px">
                    <li>ダウンロードリンク： <a href=${objectUrl} download>ここをクリック！</a></li>
                </ul>
            </li>
            `
            resultList.innerHTML += showHtml;
            objectUrls.push(objectUrl);
        } else if (file.type.startsWith('audio/')) {
            const objectUrl = URL.createObjectURL(file);
            const showHtml = `
            <li>
                <h2>${file.name}</h2>
                <ul>
                    <audio src=${objectUrl} controls></audio>
                    <li>ダウンロードリンク： <a href=${objectUrl} download>ここをクリック！</a></li>
                </ul>
            </li>
            `
            resultList.innerHTML += showHtml;
            objectUrls.push(objectUrl);
        } else if (file.type.startsWith('video/')) {
            const objectUrl = URL.createObjectURL(file);
            const showHtml = `
            <li>
                <h2>${file.name}</h2>
                <ul>
                    <video src=${objectUrl} controls style="height:150px"></video>
                    <li>ダウンロードリンク： <a href=${objectUrl} download>ここをクリック！</a></li>
                </ul>
            </li>
            `
            resultList.innerHTML += showHtml;
            objectUrls.push(objectUrl);
        } else {
            const objectUrl = URL.createObjectURL(file);
            const showHtml = `
            <li>
                <h2>${file.name}</h2>
                <ul>
                    <iframe src=${objectUrl}></iframe>
                    <li>ダウンロードリンク： <a href=${objectUrl} download>ここをクリック！</a></li>
                </ul>
            </li>
            `
            resultList.innerHTML += showHtml;
            objectUrls.push(objectUrl);
        }
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

const revokeBtn = document.querySelector('#revoke-btn');
revokeBtn.addEventListener('click', () => {
    objectUrls.forEach(objectUrl => {
        console.log(objectUrl);
        URL.revokeObjectURL(objectUrl);
    });
    alert('ダウンロードできなくなりました');
});

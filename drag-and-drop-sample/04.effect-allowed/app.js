///////////////////////
// 星を移動させるサンプル
//////////////////////

const star = document.querySelector('#star');
const copyBox = document.querySelector('#copy-box');
const moveBox = document.querySelector('#move-box');

star.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'copy'; // 要素のコピーを許可する
});

// コピーを許可
copyBox.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy'; // 要素のコピーを許可する
});

copyBox.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const droppedElement = document.getElementById(data);
    const newElement = document.createElement(droppedElement.tagName);
    newElement.textContent = droppedElement.textContent;
    newElement.style.margin = 0;
    event.target.appendChild(newElement);
});

// 移動を許可（ドラッグ要素はコピー限定なので動かない）
moveBox.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move'; // 要素の移動を許可する
});

moveBox.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    event.target.appendChild(document.getElementById(data));
});


///////////////////////
// effectAllowedプロパティとdropEffectプロパティの確認サンプル
//////////////////////
// ドラッグ要素（effectAllowedに none, copy, copyLink, copyMove, link, linkMove, move, all, uninitializedを設定）
const noneDrag = document.querySelector('#none-drag');
noneDrag.addEventListener('dragstart', (event) => {
    event.dataTransfer.effectAllowed = 'none';
});

const copyDrag = document.querySelector('#copy-drag');
copyDrag.addEventListener('dragstart', (event) => {
    event.dataTransfer.effectAllowed = 'copy';
});

const copylinkDrag = document.querySelector('#copylink-drag');
copylinkDrag.addEventListener('dragstart', (event) => {
    event.dataTransfer.effectAllowed = 'copyLink';
});

const copymoveDrag = document.querySelector('#copymove-drag');
copymoveDrag.addEventListener('dragstart', (event) => {
    event.dataTransfer.effectAllowed = 'copyMove';
});

const linkDrag = document.querySelector('#link-drag');
linkDrag.addEventListener('dragstart', (event) => {
    event.dataTransfer.effectAllowed = 'link';
});

const linkmoveDrag = document.querySelector('#linkmove-drag');
linkmoveDrag.addEventListener('dragstart', (event) => {
    event.dataTransfer.effectAllowed = 'linkMove';
});

const moveDrag = document.querySelector('#move-drag');
moveDrag.addEventListener('dragstart', (event) => {
    event.dataTransfer.effectAllowed = 'move';
});

const allDrag = document.querySelector('#all-drag');
allDrag.addEventListener('dragstart', (event) => {
    event.dataTransfer.effectAllowed = 'all';
});

const uninitializedDrag = document.querySelector('#uninitialized-drag');
uninitializedDrag.addEventListener('dragstart', (event) => {
    // uninitializedはeffectAllowedの初期値
});

// ドロップ先（dropEffectにデフォルトのnone, none, copy, move, linkを設定）
const defaultDrop = document.querySelector('#default-drop');
defaultDrop.addEventListener('dragover', (event) => {
    event.preventDefault();
    // event.dataTransfer.dropEffectを設定しない
});

const noneDrop = document.querySelector('#none-drop');
noneDrop.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'none';
});


const copyDrop = document.querySelector('#copy-drop');
copyDrop.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
});


const moveDrop = document.querySelector('#move-drop');
moveDrop.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
});


const linkDrop = document.querySelector('#link-drop');
linkDrop.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'link';
});


const dropList = document.getElementsByClassName('drop-area');
for (dropArea of dropList) {
    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        event.target.style.color = 'red';
        setTimeout(() => event.target.style.color = '', 2000);
    });
}


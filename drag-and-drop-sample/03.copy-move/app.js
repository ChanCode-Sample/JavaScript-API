const star = document.querySelector('#star');
const copyBox = document.querySelector('#copy-box');
const moveBox = document.querySelector('#move-box');

star.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
});

// コピー
copyBox.addEventListener('dragover', (event) => {
    event.preventDefault();
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

// 移動
moveBox.addEventListener('dragover', (event) => {
    event.preventDefault();
});

moveBox.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    event.target.appendChild(document.getElementById(data));
});


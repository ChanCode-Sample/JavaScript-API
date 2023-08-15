const star = document.querySelector('h1');
const box = document.querySelector('div');

// ドラッグ要素で発生するイベント
star.addEventListener('dragstart', (event) => {
    console.log(event.type);
});

star.addEventListener('drag', (event) => {
    // ドラッグ中反復的に発生しコンソールがメッセージだらけになるのでコメントアウト
    // console.log(event.type);
});

star.addEventListener('dragend', (event) => {
    console.log(event.type);
});

// ドロップ先で発生するイベント
box.addEventListener('dragenter', (event) => {
    console.log(event.type);
});

box.addEventListener('dragleave', (event) => {
    console.log(event.type);
});

box.addEventListener('dragover', (event) => {
    event.preventDefault();
    console.log(event.type);
});

box.addEventListener('drop', (event) => {
    console.log(event.type);
});


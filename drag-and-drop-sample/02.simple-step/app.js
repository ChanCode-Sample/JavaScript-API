const star = document.querySelector('h1');
const box = document.querySelector('div');

star.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', 'data');
});

box.addEventListener('dragover', (event) => {
    event.preventDefault();
});

box.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    console.log(data);
});

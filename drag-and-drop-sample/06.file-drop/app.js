const box = document.querySelector('#box');

box.addEventListener('dragover', (event) => {
    event.preventDefault();
});

box.addEventListener('drop', (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    console.log(file);
});


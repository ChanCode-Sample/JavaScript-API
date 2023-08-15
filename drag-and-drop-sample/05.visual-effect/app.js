const star = document.querySelector('#star');
const draggingImg = new Image();
draggingImg.src = './dragging.png';

star.addEventListener('dragstart', (event) => {
    event.dataTransfer.setDragImage(draggingImg, 10, 10);
    event.target.style.cursor = 'grabbing';
});

star.addEventListener('dragend', (event) => {
    event.target.style.cursor = 'grab';
});



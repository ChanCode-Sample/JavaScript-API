const addBtn = document.querySelector('#add-btn');
addBtn.addEventListener('click', async () => {
    const cache = await caches.open('my-cache');
    const urls = ['/', '/javascripts/index.js'];
    await cache.addAll(urls);
});

const deleteBtn = document.querySelector('#delete-btn');
deleteBtn.addEventListener('click', async () => {
    await caches.delete('my-cache');
});

const checkBtn = document.querySelector('#check-btn');
checkBtn.addEventListener('click', async () => {
    const cache = await caches.open('my-cache');
    const response = await cache.match('/javascripts/index.js');
    if (response) {
        alert('キャッシュが存在します');
    } else {
        alert('該当リソースのキャッシュは存在しません');
    }
});

const deleteBtn = document.querySelector('#delete-btn');
deleteBtn.addEventListener('click', async () => {
    const response = await fetch(
        'http://localhost:3000/data/1',
        {
            method: 'DELETE'
        }
    );
    const result = document.querySelector('#result');
    result.innerHTML += 
    `ステータス：${response.status} （${response.statusText}）`;
});

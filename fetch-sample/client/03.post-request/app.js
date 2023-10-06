const postBtn = document.querySelector('#post-btn');
postBtn.addEventListener('click', async () => {
    const input = document.querySelector('input');
    const data = input.value;

    const response = await fetch(
        'http://localhost:3000/data',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: data })
        }
    );
    const result = document.querySelector('#result');
    result.innerHTML += 
    `ステータス：${response.status} （${response.statusText}）`;
});

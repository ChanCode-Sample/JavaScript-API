const getBtn = document.querySelector('#get-btn');
getBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/data');
        // const response = await fetch('http://localhost:3000/xxxxx');
        if (response.ok) {
            const datas = await response.json();
            const ul = document.querySelector('#result');
            let list = '';
            for (const data of datas) {
                list += `<li>${data.id}:${data.title}</li>`;
            }
            ul.innerHTML = list;
        } else {
            alert('正常なレスポンスではありません');
        }
    } catch {
        alert('通信上の問題が発生しています');
    }
});

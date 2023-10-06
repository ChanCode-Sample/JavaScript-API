const getBtn = document.querySelector('#get-btn');
getBtn.addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/data');
    const datas = await response.json();
    console.log(datas);
});

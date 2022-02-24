const table = document.querySelector('#table_div');

const butGraf = document.querySelector('.imgGraf');
const butTable = document.querySelector('.imgTable');

butGraf.style.background = 'rgb(212, 212, 212)';

butGraf.addEventListener('click', () => {

    butGraf.style.background = 'rgb(212, 212, 212)';
    butTable.style.background = null;

    table.style.display = 'none';
    grafic.style.display = 'block';
})

butTable.addEventListener('click', () => {

    butGraf.style.background = null;
    butTable.style.background = 'rgb(212, 212, 212)';

    table.style.display = 'block';
    grafic.style.display = 'none';
})

function createTable(data) {

    table.innerHTML = '';

    data.forEach(el => {
        createTd(el[0], el[1]);
    }) 
}

function createTd(Date, Cur_OfficialRate,){
    
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');

    tr.append(td1,td2);

    td1.innerText = dayjs(Date).format('YYYY-MM-DD');
    td2.innerText = Cur_OfficialRate;

    table.prepend(tr);
}

if(!butTable.style.background){
    table.style.display = 'none';
}
if(!butGraf.style.background){
    grafic.style.display = 'none';
}
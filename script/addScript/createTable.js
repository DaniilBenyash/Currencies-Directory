const table = document.querySelector('#table_div');
const grafic = document.querySelector('#chartdiv')
const butGraf = document.querySelector('.butGraf');
const butTable = document.querySelector('.butTable');

butGraf.style.background = '#5E9C76';
butGraf.style.border = '2px solid black'

butGraf.addEventListener('click', () => {

    butGraf.style.background = '#5E9C76';
    butGraf.style.border = '2px solid black'
    butTable.style.background = null;
    butTable.style.border = null;

    table.style.display = 'none';
    grafic.style.display = 'block';
})

butTable.addEventListener('click', () => {

    butGraf.style.background = null;
    butGraf.style.border = null;
    butTable.style.background = '#5E9C76';
    butTable.style.border = '2px solid black'


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
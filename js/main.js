const select = document.querySelector('.select');
const buttonWeek = document.querySelector('.buttonWeek');
const buttonMonth = document.querySelector('.buttonMonth');
const buttonQuarter = document.querySelector('.buttonQuarter');
const buttonYear = document.querySelector('.buttonYear');

const styleButton = document.querySelectorAll('.styleButton')

const fromDate = document.querySelector('.fromDate');
const toDate = document.querySelector('.toDate')

const h2 = document.querySelector('.h2')
const table = document.querySelector('tbody')

// Заполнение селекта////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSelect(arg){
    arg.forEach((el) => {
        const option = document.createElement('option')
        option.innerText = el.Cur_Name;
        option.value = el.Cur_ID;
        select.append(option);
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Заполнение таблицы////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createTable(Date, Cur_OfficialRate,){
    
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    
    tr.append(td1,td2)
    
    td1.innerText = dayjs(Date).format('YYYY-MM-DD');
    td2.innerText = Cur_OfficialRate;

    table.prepend(tr);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Функции смена цвета кнопок и определение календарей///////////////////////////////////////////////////////////////////////////

function colorButton(nowDays, startDays) {

    let days = ((new Date(nowDays).getTime() - new Date(startDays).getTime())/1000/60/60/24);

    function styleNull(){
        styleButton.forEach((el) =>{
            el.style.backgroundColor = null
        })
    }

    styleNull();

    if(days < 7){
        styleButton.forEach((el) =>{
            el.style.backgroundColor = '#b9c3d3'
        })
    }else if(days < 31){
        styleNull();
        buttonMonth.style.backgroundColor = '#b9c3d3'
        buttonQuarter.style.backgroundColor = '#b9c3d3'
    }else if(days < 91){
        styleNull();
        buttonQuarter.style.backgroundColor = '#b9c3d3'
        buttonYear.style.backgroundColor = '#b9c3d3'
    }else if(days < 365){
        styleNull();
        buttonYear.style.backgroundColor = '#b9c3d3'
    }
}

function selectDate(firsDate, lastDate) {
    fromDate.value = firsDate;
    toDate.value = lastDate;

    fromDate.setAttribute('min', firsDate,);
    toDate.setAttribute('max', lastDate);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Функция кнопок ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fcnBtn (firstId, button, rateArr){

    if(button.style.backgroundColor === 'rgb(185, 195, 211)'){
        return
    }else{
        table.innerText = ''

        rateArr.slice(firstId, rateArr[-1]).forEach((el) => {

            createTable(el.Date, el.Cur_OfficialRate)
        })
    } 
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Функция изменения даты/////////////////////////////////////////////////////////////////////////////////////////////////////////
function fncSelect() {
    
    table.innerText = ''

    if(!firstDate){

        arrRate.slice(arrRate[0], lastDate).forEach((el) => {
            createTable(el.Date, el.Cur_OfficialRate)
        })
    }else if(!lastDate){

        arrRate.slice(firstDate, arrRate[-1]).forEach((el) => {
            createTable(el.Date, el.Cur_OfficialRate)
        })
    }else{
        
        arrRate.slice(firstDate, lastDate).forEach((el) => {
            createTable(el.Date, el.Cur_OfficialRate)
        })
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
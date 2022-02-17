const select = document.querySelector('.select');
const buttonWeek = document.querySelector('.buttonWeek');
const buttonMonth = document.querySelector('.buttonMonth');
const buttonQuarter = document.querySelector('.buttonQuarter');
const buttonYear = document.querySelector('.buttonYear');

const styleButton = document.querySelectorAll('.styleButton')

const fromDate = document.querySelector('.fromDate');
const toDate = document.querySelector('.toDate')

const h2 = document.querySelector('.h2')
const grafic = document.getElementById('chart_div')

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

// Функция выбора////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function choise(data){
    if(data.length === 0){

        grafic.innerHTML = 'Нет данных';

        selectDate(today, today)
    }else{
        
        arrRate = [];

        data.forEach(el => arrRate.push([new Date(el.Date), el.Cur_OfficialRate]))
        
        createGrafic(arrRate);
        
        selectDate(dayjs(data[0].Date).format('YYYY-MM-DD'), dayjs(data[data.length - 1].Date).format('YYYY-MM-DD'))
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Функция графика///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createGrafic(array) {
    grafic.innerHTML = '';

    google.charts.load('current', {packages: ['corechart', 'line']});

    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {
        var data = new google.visualization.DataTable();

        data.addColumn('datetime', 'X');
        data.addColumn('number', 'Rate');

        data.addRows(array);
    
        var options = {
        hAxis: {
            title: 'Time',
        },
        vAxis: {
            title: 'Rate'
        },
        width: 1050,
        height: 600,
        chartArea: {
            top: 20,
            width: 800,
            height: 400
        },
        backgroundColor: '#eeeeee',
        color: 'red'
        };
    
        var chart = new google.visualization.LineChart(grafic);
    
        chart.draw(data, options);
    }
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
    
     createGrafic(rateArr.slice(firstId, rateArr[-1]))
    } 
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Функция изменения даты/////////////////////////////////////////////////////////////////////////////////////////////////////////

function fncSelect() {

    arrRate.filter((el,id) => {
        if(dayjs(el[0]).format('YYYY-MM-DD') == fromDate.value) firstDate = id
    });

    arrRate.filter((el,id) => {
        if(dayjs(el[0]).format('YYYY-MM-DD') == toDate.value) lastDate = id+1
    });

    if(!firstDate){

        createGrafic(arrRate.slice(arrRate[0], lastDate))
        
    }else if(!lastDate){

        createGrafic(arrRate.slice(firstDate, arrRate[-1]))
     
    }else{

        createGrafic(arrRate.slice(firstDate, lastDate))   
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
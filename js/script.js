const today = dayjs().format('YYYY-MM-DD');
// Получение списка валют от воркера1////////////////////////////////////////////////////////////////////////////////////////////

const worker1 = new Worker('workers/worker1.js')

worker1.addEventListener('message', ({data}) => {
    
    mapCur[data.msg](data.curr);
});

let result

const mapCur = {
    currencies: (curr) => {
        result = curr.map(
            ({Cur_ID, Cur_Name, Cur_DateStart,Cur_DateEnd}) => {
                return {Cur_ID, Cur_Name, Cur_DateStart,Cur_DateEnd
                }})

        createSelect(result);   
    }
}

select.addEventListener('change', () => {
    choiсeCur(result);
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Выбор валюты//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function choiсeCur(result) {
    const firstCur = result.filter((el) => {
        return el.Cur_ID == select.value
    })[0];

    h2.innerText = firstCur.Cur_Name
   
    if(dayjs(firstCur.Cur_DateEnd).format('YYYY-MM-DD') >= today) {

        workerTwo(firstCur.Cur_ID, firstCur.Cur_DateStart, today)

        colorButton(today, firstCur.Cur_DateStart)
    }
    else{
        workerTwo(firstCur.Cur_ID, firstCur.Cur_DateStart, firstCur.Cur_DateEnd)

        styleButton.forEach((el) =>{
            el.style.backgroundColor = 'rgb(185, 195, 211)'
        });    
    }

    grafic.innerHTML = '';
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Получение курса от воркера2///////////////////////////////////////////////////////////////////////////////////////////////////
const worker2 = new Worker('workers/worker2.js')

function workerTwo(idCur, start, end) {

    let date = [];
    
    for (let i = 0; i <= dayjs(end).year() - dayjs(start).year(); i++) {
         date.push(dayjs(start).add(i, 'year').format('YYYY-MM-DD'))
    }
    
    worker2.postMessage({
        id: idCur,
        dataStart: date,
        dataEnd: end
    }); 
}

let arrRate;

worker2.addEventListener('message', ({data}) => {
    
    if(data.length === 0){

        grafic.innerHTML = 'Нет данных';

        selectDate(today, today)
    }else{
        
        arrRate = [];

        data.forEach(el => arrRate.push([new Date(el.Date), el.Cur_OfficialRate]))
        
        createGrafic(arrRate);
        
        selectDate(dayjs(data[0].Date).format('YYYY-MM-DD'), dayjs(data[data.length - 1].Date).format('YYYY-MM-DD'))
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ивенты кнопок и селектов//////////////////////////////////////////////////////////////////////////////////////////////////////

buttonYear.addEventListener('click', () => {
    
    fcnBtn (-365,buttonYear, arrRate)
})
buttonQuarter.addEventListener('click', () => {
    fcnBtn (-91, buttonQuarter, arrRate)
})
buttonMonth.addEventListener('click',() => {
    fcnBtn (-31, buttonMonth, arrRate)
})
buttonWeek.addEventListener('click', () => {
    fcnBtn (-7, buttonWeek, arrRate)
})

let firstDate

fromDate.addEventListener('change', () => {
    
    arrRate.filter((el,id) => {
        if(dayjs(el[0]).format('YYYY-MM-DD') == fromDate.value) firstDate = id
    });
    
    fncSelect()
})

let lastDate

toDate.addEventListener('change', () => {

    arrRate.filter((el,id) => {
        if(dayjs(el[0]).format('YYYY-MM-DD') == toDate.value) lastDate = id+1
    });
   
    fncSelect()
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



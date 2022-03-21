const today = dayjs().format('YYYY-MM-DD');

const select = document.querySelector('.select');

function createSelect(arg){
    Object.keys(arg).sort().forEach(key => {
        const option = document.createElement('option');
        option.innerText = key;
        option.value = key;
        select.append(option);
    })
}
function firstChoice(){
    let dollar = [];

    allCurr['Доллар США'].forEach(el => {
        dollar.push(Object.assign({}, el))
    })
    
    select.value = 'Доллар США';
    fromDate.value = dayjs(today).subtract(1, 'week').format('YYYY-MM-DD');
    toDate.value = today;
    formatDateArray(dollar);
}

function choiceCur(){

    root.dispose();
    grafic.style.height = '0px'

    let choiseCur = [];
    
    allCurr[select.value].forEach(el => {
        choiseCur.push(Object.assign({}, el));
    })
   
    formatDateArray(choiseCur);
}

function formatDateArray(choiseCur){
    
    document.querySelector('.nameCur').innerText = choiseCur[0].Cur_Name;
    
    if(choiseCur[choiseCur.length-1] > today){
        choiseCur[choiseCur.length-1].Cur_DateEnd = today;
    }
    choiseCur.forEach(el => {

        let date = [];

        for (let i = 0; i <= dayjs(el.Cur_DateEnd).year() - dayjs(el.Cur_DateStart).year(); i++) {
            date.push(dayjs(el.Cur_DateStart).add(i, 'year').format('YYYY-MM-DD'));
        }
        el.Cur_DateStart = date;
    })
    
    getArray(select.value, choiseCur)
}

const fromDate = document.querySelector('.fromDate');
const toDate = document.querySelector('.toDate');

const buttonWeek = document.querySelector('.buttonWeek');
const buttonMonth = document.querySelector('.buttonMonth');
const buttonQuarter = document.querySelector('.buttonQuarter');
const buttonYear = document.querySelector('.buttonYear');

const styleButton = document.querySelectorAll('.styleButton');

const btn = document.querySelectorAll('.btn');
const noData =  document.querySelector('.noData')

let firstId = 0;
let lastId = 0;

function createInfo(data){

    grafic.innerHTML = '';
    table.innerHTML = '';

    if(data.length === 0){
        arrEmpty();
        return
    }

    noData.innerText = ''
    let arrRateForTable = [];
    let arrRateForChart = [];
    
    data.forEach((el,id) => {
        if(dayjs(el.Date).format('YYYY-MM-DD') === fromDate.value) firstId = id;
        if(dayjs(el.Date).format('YYYY-MM-DD') === toDate.value) lastId = id;
        
    })

    if(!data[firstId] || dayjs(data[lastId].Date).format('YYYY-MM-DD') != toDate.value){
        fromDate.value = dayjs(data[0].Date).format('YYYY-MM-DD');
        toDate.value = dayjs(data[data.length-1].Date).format('YYYY-MM-DD');
        data.forEach(el =>{
            arrRateForTable.push([new Date(el.Date), el.Cur_OfficialRate])
            arrRateForChart.push({
                date: Date.parse(el.Date),
                value: el.Cur_OfficialRate
            })
        });

        createGrafic(arrRateForChart);  
        
        createTable(arrRateForTable);
    
        styleButton.forEach((el) =>{
            el.style.backgroundColor = null;
            el.style.border = null;
            el.style.cursor = null;
        }) 
        return
    }

    if(firstId > lastId){
        firstId = 0
        fromDate.value = dayjs(data[0].Date).format('YYYY-MM-DD')
    } 

    data.slice(firstId, lastId).forEach(el =>{
        
        arrRateForTable.push([new Date(el.Date), el.Cur_OfficialRate])
        arrRateForChart.push({
            date: Date.parse(el.Date),
            value: el.Cur_OfficialRate
        })
    })    
    
    createGrafic(arrRateForChart);  
        
    createTable(arrRateForTable);

    styleButton.forEach((el) =>{
        el.style.backgroundColor = null;
        el.style.border = null;
        el.style.cursor = null;
    }) 
}

function selectDate(firsDate, lastDate) {
    
    fromDate.value = firsDate;
    toDate.value = lastDate;

    fromDate.setAttribute('min', firsDate,);
    toDate.setAttribute('max', lastDate);
}

function fcnBtn (firstId,  arr){

    root.dispose();
      
    selectDate(dayjs(arr[(arr.length-1) + firstId].Date).format('YYYY-MM-DD'), dayjs(arr[arr.length - 1].Date).format('YYYY-MM-DD'));

    createInfo(arr.slice(firstId-1, arr[-1]))
}

function fncSelect() {

    root.dispose();

    dynamicsRate.filter((el,id) => {
        if(dayjs(el[0]).format('YYYY-MM-DD') == fromDate.value) firstDate = id
    });

    dynamicsRate.filter((el,id) => {
        if(dayjs(el[0]).format('YYYY-MM-DD') == toDate.value) lastDate = id+1
    });

    if(!firstDate){
        createInfo(dynamicsRate.slice(dynamicsRate[0], lastDate));
    }else if(!lastDate){
        createInfo(dynamicsRate.slice(firstDate, dynamicsRate[-1]))
    }else{
        createInfo(dynamicsRate.slice(firstDate, lastDate))
    }
}

function localStor(arr) {
    localStorage.setItem(select.value, JSON.stringify(arr))
}

function getArray(arg, choiseCur) {

    let arr = JSON.parse(localStorage.getItem(arg))

    if(!arr){
        postMesDynam(choiseCur);
        return
    }
    if(arr.length === 0){
        arrEmpty();
        return
    }
    if(dayjs(arr[arr.length-1].Date).format('YYYY-MM-DD') === today || dayjs(allCurr[select.value][allCurr[select.value].length-1].Cur_DateEnd).format('YYYY-MM-DD') === dayjs(arr[arr.length-1].Date).format('YYYY-MM-DD')){
        dynamicsRate = arr;
        createInfo(arr)
        return 
    }

    postMesDynam(choiseCur)
}

function arrEmpty() {
    
    styleButton.forEach((el) =>{
        el.style.backgroundColor = '#868686';
        el.style.border = 'none';
        el.style.cursor = 'auto';
    })
    noData.style.marginTop = '20px';
    noData.innerText = 'NO DATA'

}

function postMesDynam(choiseCur){
    worker.postMessage({
        msg: 'dynamics',
        choiseCur
    })
}
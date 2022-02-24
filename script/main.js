const select = document.querySelector('.select-cur');

const fromDate = document.querySelector('.fromDate');
const toDate = document.querySelector('.toDate');

const buttonWeek = document.querySelector('.buttonWeek');
const buttonMonth = document.querySelector('.buttonMonth');
const buttonQuarter = document.querySelector('.buttonQuarter');
const buttonYear = document.querySelector('.buttonYear');

const styleButton = document.querySelectorAll('.styleButton');

function createSelect(arg){
    for(key in arg){
        const option = document.createElement('option');
        option.innerText = key;
        option.value = key;
        select.append(option);
    }
}

function choiceCur(){

    let choiseCur = [];

    allCurr[select.value].forEach(el => {
        choiseCur.push(Object.assign({}, el));
    })
   
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
    
    worker.postMessage({
        msg: 'dynamics',
        choiseCur
    })
}

function createInfo(data){
    
    if(data.length === 0){

        grafic.innerHTML = 'Нет данных';
        table.innerHTML = 'Нет данных';
        selectDate(today, today);

        styleButton.forEach((el) =>{
            el.style.backgroundColor = '#868686';
        })
    }else{
        
        arrRate = [];

        data.forEach(el => arrRate.push([new Date(el.Date), el.Cur_OfficialRate]));

        
        createGrafic(arrRate);
        
        createTable(arrRate);

        selectDate(dayjs(data[0].Date).format('YYYY-MM-DD'), dayjs(data[data.length - 1].Date).format('YYYY-MM-DD'));
        
        if(dayjs(arrRate[arrRate.length-1][0]).format('YYYY-MM-DD') < today) {
            styleButton.forEach((el) =>{
                el.style.backgroundColor = '#868686';
            }); 
            return
        }
        colorButton(data[data.length - 1].Date, data[0].Date);
    }
}

function selectDate(firsDate, lastDate) {
    fromDate.value = firsDate;
    toDate.value = lastDate;

    fromDate.setAttribute('min', firsDate,);
    toDate.setAttribute('max', lastDate);
}

function fncSelect() {
    
    addArrDate = [];
    
    dynamicsRate.forEach(el => addArrDate.push([new Date(el.Date), el.Cur_OfficialRate]));

    addArrDate.filter((el,id) => {
        if(dayjs(el[0]).format('YYYY-MM-DD') == fromDate.value) firstDate = id
    });

    addArrDate.filter((el,id) => {
        if(dayjs(el[0]).format('YYYY-MM-DD') == toDate.value) lastDate = id+1
    });

    if(!firstDate){

        createGrafic(addArrDate.slice(addArrDate[0], lastDate));

        createTable(addArrDate.slice(addArrDate[0], lastDate));
        
    }else if(!lastDate){

        createGrafic(addArrDate.slice(firstDate, addArrDate[-1]));

        createTable(addArrDate.slice(firstDate, addArrDate[-1]));
    }else{

        createGrafic(addArrDate.slice(firstDate, lastDate));

        createTable(addArrDate.slice(firstDate, lastDate));
    }
}

function colorButton(nowDays, startDays) {

    let days = ((new Date(nowDays).getTime() - new Date(startDays).getTime())/1000/60/60/24);

    function styleNull(){
        styleButton.forEach((el) =>{
            el.style.backgroundColor = null;
        })
    }

    styleNull();

    if(days < 7){
        styleButton.forEach((el) =>{
            el.style.backgroundColor = '#868686';
        })
    }else if(days < 31){
        styleNull();
        buttonMonth.style.backgroundColor = '#868686';
        buttonQuarter.style.backgroundColor = '#868686';
    }else if(days < 91){
        styleNull();
        buttonQuarter.style.backgroundColor = '#868686';
        buttonYear.style.backgroundColor = '#868686';
    }else if(days < 365){
        styleNull();
        buttonYear.style.backgroundColor = '#868686';
    }
}

function fcnBtn (firstId, button, arr){

    if(button.style.backgroundColor === 'rgb(134, 134, 134)'){
        return
    }else{
        
    selectDate(dayjs(arr[0].Date).format('YYYY-MM-DD'), dayjs(arr[arr.length - 1].Date).format('YYYY-MM-DD'));

    let addArrBut = [];

    arr.slice(firstId, arr[-1]).forEach(el => addArrBut.push([new Date(el.Date), el.Cur_OfficialRate]));

    createGrafic(addArrBut);

    createTable(addArrBut);
    } 
}

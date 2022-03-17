const today = dayjs().format('YYYY-MM-DD');

const worker = new Worker('/script/worker.js');

worker.addEventListener('message', ({data}) => {
    
    mapCur[data.msg](data.curr);
    
});

let allCurr;

let dynamicsRate;

const mapCur = {
    currencies: (curr) => {
        
        createSelect(curr);
        allCurr = curr;
    },
    rate: (curr) => {
        
        createTable(curr.Cur_Name, curr.Cur_Abbreviation, curr.Cur_OfficialRate, curr.Cur_Scale);
    },
    dynamics: (curr) => {

        createInfo(curr);
        dynamicsRate = curr;
    }
}

select.addEventListener('change', () => {
    choiceCur();
})

buttonYear.addEventListener('click', () => {
    fcnBtn (-365,buttonYear, dynamicsRate);
})
buttonQuarter.addEventListener('click', () => {
    fcnBtn (-91, buttonQuarter, dynamicsRate);
})
buttonMonth.addEventListener('click',() => {
    fcnBtn (-31, buttonMonth, dynamicsRate);
})
buttonWeek.addEventListener('click', () => {
    fcnBtn (-7, buttonWeek, dynamicsRate);
})

let firstDate;

fromDate.addEventListener('change', () => {
    fncSelect();
})

let lastDate;

toDate.addEventListener('change', () => {
    fncSelect();
})
const worker = new Worker('/script/worker.js');

worker.addEventListener('message', ({data}) => {
    
    mapCur[data.msg](data.curr);
    
});

let allCurr;

let dynamicsRate;

const mapCur = {
    currencies: (curr) => {
        allCurr = curr;
        createSelect(curr);
        firstChoice();
    },
    dynamics: (curr) => {
        
        dynamicsRate = curr;
        localStor(curr)
        createInfo(curr);
    }
}

select.addEventListener('change', () => {
    choiceCur();
})

buttonYear.addEventListener('click', () => {
    fcnBtn (-365,dynamicsRate);
})
buttonQuarter.addEventListener('click', () => {
    fcnBtn (-91,dynamicsRate);
})
buttonMonth.addEventListener('click',() => {
    fcnBtn (-31, dynamicsRate);
})
buttonWeek.addEventListener('click', () => {
    fcnBtn (-7, dynamicsRate);
})

let firstDate;

fromDate.addEventListener('change', () => {
    fncSelect();
})

let lastDate;

toDate.addEventListener('change', () => {
    fncSelect();
})
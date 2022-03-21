const worker = new Worker('script/worker.js');
const table = document.querySelector('.table');

function createTable(name, abbr, rate, scale){
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');

    tr.append(td1, td2, td3);
    
    if(name == 'Российских рублей'){
        name = 'Российский рубль';
    }
    
    const img = new Image();
    img.src = `/image/${name}.png`;
    img.style.width = '20px';
    
    styleTd(td1)
    td1.append(img, name);   
    td2.innerText = scale + ' ' + abbr;
    td3.innerText = rate;

    table.append(tr);
}

worker.postMessage({
    msg: 'rate',
    id: 431,
})
worker.postMessage({
    msg: 'rate',
    id: 456,
})
worker.postMessage({
    msg: 'rate',
    id: 451,
})

function styleTd(td){
    td.style.display = 'flex';
    td.style.alignItems = 'center';
    td.style.justifyContent = 'center';
    td.style.height = '45px';
    td.style.fontSize = '17px';
}

worker.addEventListener('message', ({data}) => {
    if(data.msg != 'rate')return 
    
    createTable(data.curr.Cur_Name, data.curr.Cur_Abbreviation, data.curr.Cur_OfficialRate, data.curr.Cur_Scale);  
});
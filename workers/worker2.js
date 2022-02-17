function cb({data}) {
    
    let request = data.dataStart.map((el) => fetch(`https://www.nbrb.by/api/exrates/rates/dynamics/${data.id}?startdate=${el}&enddate=${data.dataEnd}`))

    Promise.all(request)
    .then(responses => Promise.all(responses.map(el => el.json())))

    .then(data => {
        data.forEach((el,id,arr) => {
            if(el.length == 0){
                arr.splice(id)
            }
        })
        
        let arrRate = [];

        data.forEach(el => el.forEach(el => arrRate.push(el)));
        
        return arrRate
    })
    .then(postMessage)
}

addEventListener('message', cb);
fetch('https://www.nbrb.by/api/exrates/currencies')
    .then(response => response.json())
    .then(arr => {
        let allCurr = []
    
        arr.forEach(el => {
            if(!allCurr[el.Cur_Name]) allCurr[el.Cur_Name] = []
            allCurr[el.Cur_Name].push(el)
       })

      return allCurr
    })
    .then(curr => ({
            msg: 'currencies',
            curr
        })
    )
    .then(postMessage)

addEventListener('message', ({data}) => {
    mapping[data.msg](data)
})

const mapping = {
    rate: (data) => {

        funcRate(data)
    },
    dynamics: (data) => {
 
        funcDynamics(data)
    }
}

function funcRate(data){
    fetch(`https://www.nbrb.by/api/exrates/rates/${data.id}`)
    .then(response => response.json())
    .then(curr => ({
        msg: 'rate',
        curr
    }))
    .then(postMessage)
}

function funcDynamics(data){

    let allFetch = []

    data.choiseCur.forEach(el => {
        el.Cur_DateStart.forEach(date =>{
            allFetch.push(fetch(`https://www.nbrb.by/api/exrates/rates/dynamics/${el.Cur_ID}?startdate=${date}&enddate=${el.Cur_DateEnd}`))
        })
        
    })
    
    Promise.all(allFetch)
        .then(responses => Promise.all(responses.map(data => data.json())))
        .then(data => {
            data.forEach((el,id,arr) => {
                    
                if(el.length == 0) arr.splice(id)
            })
                  
            let allRateTime = [];
                    
            data.forEach(el2 => {
                el2.forEach(el3 => {
                    allRateTime.push(el3);
                })  
            })

            allRateTime.sort(function(a, b) {
                if (a.Date > b.Date) {
                    return 1
                  }
                  if (a.Date < b.Date) {
                    return -1
                  }
            })

            return allRateTime

        })
        .then(curr => {
            postMessage({
                msg: 'dynamics',
                curr
            })
        })
}
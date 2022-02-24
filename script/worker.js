fetch('https://www.nbrb.by/api/exrates/currencies')
    .then(response => response.json())
    .then(arr => {
        let allCurr = []
    
        arr.forEach(el => {
            allCurr[el.Cur_Name] = []
            
       })
       arr.forEach(el => {
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
    
    const arr = data.choiseCur;
        
    let allRateTime = []
    let i = 0
    
    arr.forEach(el => {
        let request = el.Cur_DateStart.map((date) => fetch(`https://www.nbrb.by/api/exrates/rates/dynamics/${el.Cur_ID}?startdate=${date}&enddate=${el.Cur_DateEnd}`))

        Promise.all(request)
        .then(responses => Promise.all(responses.map(data => data.json())))
        .then(data => {
            data.forEach((el,id,arr) => {

                if(el.length == 0) arr.splice(id)
            })
            
            i++

            data.forEach(ell => {
                ell.forEach(elll => {
                    allRateTime.push(elll);
                })  
            })
                
            return allRateTime
        })
        .then(curr => {
            if(i === arr.length){
                postMessage({
                    msg: 'dynamics',
                    curr
                })
            }
        })
    })
}
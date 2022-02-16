fetch('https://www.nbrb.by/api/exrates/currencies')
    .then(response => response.json())
    .then(curr => ({
            msg: 'currencies',
            curr,
        })
    )
    .then(postMessage)
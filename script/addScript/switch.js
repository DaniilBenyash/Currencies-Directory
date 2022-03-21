const switchBtn = document.querySelector('.switch-btn');

try{
    if(localStorage.getItem('theme') === 'dark'){
        change();
    }else{
        deleteChange();
    }
} catch (err) { }

switchBtn.addEventListener('click', () =>{

    if(localStorage.getItem('theme') === 'dark'){
        localStorage.removeItem('theme');
        deleteChange();
    } else {
        localStorage.setItem('theme', 'dark')
        change();
    }
})
function change(){
    switchBtn.classList.remove('switch-on')
    document.body.style.background = '#262626'
    document.body.style.color = '#f4f4f4'
    document.querySelector('a').style.color = '#f4f4f4'
    
    document.querySelectorAll('.theme').forEach(el => {
        el.style.color = '#f4f4f4'
    })
    if(!document.querySelector('.contentIndex')){
        document.querySelector('.bodyMain').style.boxShadow = 'inset 0px 0px 5px 0px #f4f4f4'
        document.querySelector('.select').style.boxShadow = '0px 0px 5px 0px #f4f4f4'
        document.querySelector('.style-date').style.boxShadow = '0px 0px 5px 0px #f4f4f4'
        document.querySelectorAll('.styleButton').forEach(el => {
            el.style.boxShadow = '0px 0px 5px 0px #f4f4f4'
        })
        document.querySelectorAll('.butStyle').forEach(el => {
            el.style.boxShadow = '0px 0px 5px 0px #f4f4f4'
        })
        root.interfaceColors.set("grid", am5.color('#f4f4f4'));
        root.interfaceColors.set("text", am5.color('#f4f4f4'));
        return
    }
    document.querySelector('.contentIndex').style.boxShadow = 'inset 0px 0px 5px 0px #f4f4f4'
    document.querySelector('.kurs-table').style.background = '#5E9C76'
    document.querySelector('.kurs-table').style.boxShadow = '0px 0px 5px 0px #f4f4f4'
    
}
function deleteChange(){
    switchBtn.classList.add('switch-on')
    document.body.style.background = null;
    document.body.style.color = null;
    document.querySelector('a').style.color = null;
    document.querySelectorAll('.theme').forEach(el => {
        el.style.color = null;
    })
    if(!document.querySelector('.contentIndex')){
        document.querySelector('.bodyMain').style.boxShadow = null
        document.querySelector('.select').style.boxShadow = null;
        document.querySelector('.style-date').style.boxShadow = null;
        document.querySelectorAll('.styleButton').forEach(el => {
            el.style.boxShadow = null;
        })
        document.querySelectorAll('.butStyle').forEach(el => {
            el.style.boxShadow = null;
        })
        root.interfaceColors.set("grid", am5.color('#000000'));
        root.interfaceColors.set("text", am5.color('#000000'));
        return
    }
    document.querySelector('.contentIndex').style.boxShadow = null;
    document.querySelector('.kurs-table').style.background = null;
    document.querySelector('.kurs-table').style.boxShadow = null;
}
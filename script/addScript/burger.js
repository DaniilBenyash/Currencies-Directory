const menytoggle = document.querySelector('.toggle');

const option = document.querySelector('.option');

menytoggle.addEventListener('click', () => {

    menytoggle.classList.toggle('active');

    if(option.style.display === 'block') {
        return option.style.display = 'none'
    }
    option.style.display = 'block';
})

let we = 0;

document.body.addEventListener('click', () => {
    if(we == 0) return we++

    if(option.style.display === 'none') return we = 0
    
    if(option.style.display === 'block') {
        we = 0;
        menytoggle.classList.toggle('active');
        return option.style.display = 'none';
    }
})

const theme = document.querySelector('.iconTheme');
const iconTheme = document.querySelector('.sun');
const butFoot = document.querySelectorAll('.a-style');
const mainKurs = document.querySelector('.main-kurs-params')
const kursToday = document.querySelector('.kurs-today');

const params = document.querySelector('.params');
const selectCur = document.querySelector('.select-cur')

try{
    if(localStorage.getItem('theme') === 'dark'){
        change();
        butFoot.forEach(el => {
            el.classList.remove('a-style');
            el.classList.add('darkFoot');
        })
    }else{
        deleteChange()
    }
} catch (err) { }


theme.addEventListener('click', () => {
    if(localStorage.getItem('theme') === 'dark'){
        localStorage.removeItem('theme');
        deleteChange()
    } else {
        localStorage.setItem('theme', 'dark')
        change() 
    }
})

function change() {
    iconTheme.attributes.src.nodeValue = '/img/moon.png';
    document.body.classList.add('darkBody');
    menytoggle.classList.add('darkBody');
    
    butFoot.forEach(el => {
        el.classList.remove('a-style');
        el.classList.add('darkFoot');
    })
    option.classList.add('darkOption')
    if(!mainKurs){
        params.classList.add('darkOption')
        selectCur.classList.add('darkBody')
        fromDate.classList.add('darkBody')
        toDate.classList.add('darkBody')
        styleButton.forEach(el => {
            el.classList.add('darkButton')
        })
        return 
    }
    mainKurs.classList.add('darkOption')
    kursToday.classList.add('darkFont')
    console.log(params);

}

function deleteChange(){
    iconTheme.attributes.src.nodeValue = '/img/sun.png';
    document.body.classList.remove('darkBody');
    menytoggle.classList.remove('darkBody');
    
    butFoot.forEach(el => {
        el.classList.remove('darkFoot');
        el.classList.add('a-style');
    })
    option.classList.remove('darkOption')
    if(!mainKurs){
        params.classList.remove('darkOption')
        selectCur.classList.remove('darkBody')
        fromDate.classList.remove('darkBody')
        toDate.classList.remove('darkBody')
        styleButton.forEach(el => {
            el.classList.remove('darkButton')
        })
        return 
    }
    mainKurs.classList.remove('darkOption')
    kursToday.classList.remove('darkFont')
}
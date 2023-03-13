
const blockList = [...document.querySelectorAll('.cube')];

let TimeInterval

const blocks = {
    hours: blockList.slice(0, 2),
    minutes: blockList.slice(2, 4),
    seconds: blockList.slice(4),
};

let time = 0

function rotateBlock(block, varNum) {
    [...block.querySelectorAll('.wall')][block.getAttribute('index')].innerText = varNum
    block.setAttribute('index', block.getAttribute('index') == '3' ? '0' : Number(block.getAttribute('index')) + 1)
    block.style= `transform: rotateY(${Number(/[0-9]+/.exec(block.style.transform?block.style.transform:'0')[0]) + 90}deg);`
}

function setNewRotBlock([block1, block2], value) {
    const [var1, var2] = value.split('')
    rotateBlock(block2, var2)
    if (value % 10 == 0) rotateBlock(block1, var1)
}

function timer() {
    time += 1000

    const Ndate = new Date(time)
    const hours = Ndate.getHours()>9 ? Ndate.getHours().toString() : '0' + Ndate.getHours()
    const minutes = Ndate.getMinutes()>9 ? Ndate.getMinutes().toString() : '0' + Ndate.getMinutes()
    const seconds = Ndate.getSeconds()>9 ? Ndate.getSeconds().toString() : '0' + Ndate.getSeconds()
    
    setNewRotBlock(blocks.seconds, seconds)
    if (seconds == "00" && minutes != "00") setNewRotBlock(blocks.minutes, minutes)
    if (minutes == "00" && seconds == "00" && hours != "00") setNewRotBlock(blocks.hours, hours)
}


const start_stop = document.querySelector('.star-stop')
start_stop.addEventListener('click', ()=>{
    if(start_stop.innerText == 'СТАРТ') {
       TimeInterval = setInterval(timer, 1000)
       start_stop.innerText = "СТОП"
    }else{
        clearInterval(TimeInterval)
        start_stop.innerText = "СТАРТ"
    }
})

document.querySelector('.reset').addEventListener('click', ()=>{
    time = 0
    clearInterval(TimeInterval)
    start_stop.innerText = "СТАРТ"
    blockList.forEach(el=>{
        let ind = el.getAttribute('index') == '0' ? 3 : Number(el.getAttribute('index'))-1
        el.querySelectorAll('.wall')[ind].innerText = 0
    })
})

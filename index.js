
const whiteSide = document.getElementById('white-timer')
const blackSide = document.getElementById('black-timer')
const pause = document.getElementById('btn-pause')
const reset = document.getElementById('btn-reset')
const config = document.getElementById('btn-config')
const selector = document.getElementById('selector') 
const click = new Audio('chessclick.mp3')
const gameover = new Audio('gameover.mp3')

let whiteCounterMin = 10
let whiteCounterSec = 0
let whiteCounterMilesecond = 1
let whiteState = false
let whiteTimerFunction = ''

let blackCounterMin = 10
let blackCounterSec = 0
let blackCounterMilesecond = 1
let blackState = false
let blackTimerFunction = ''

let increment = 0
let currentHTML = '10:00'
let currentMin = 10
let currentSec = 0


// Options OnChange //
selector.addEventListener("click", () => {
    
      selector.addEventListener("change", () => {
      
        switch (selector.value) {

          case "10min":
            increment = 0
            currentHTML = '10:00'
            currentMin = 10
            currentSec = 0

            resetFull()
            break

          case "5min":
            increment = 0
            currentHTML = '5:00'
            currentMin = 5
            currentSec = 0

            resetFull()
            break

          case "3min":
            increment = 0
            currentHTML = '3:00'
            currentMin = 3
            currentSec = 0

            resetFull()
            break

          case "3plus2":
            increment = 2
            currentHTML = '3:00'
            currentMin = 3
            currentSec = 0

            resetFull()
            break

          case "1min":
            increment = 0
            currentHTML = '1:00'
            currentMin = 1
            currentSec = 0

            resetFull()
            break

          case "2plus1":
            increment = 1
            currentHTML = '2:00'
            currentMin = 2
            currentSec = 0

            resetFull()
            break

          case "1plus1":
            increment = 1
            currentHTML = '1:00'
            currentMin = 1
            currentSec = 0

            resetFull()
            break
        }
    });
});
// Options OnChange //

pause.onclick = () => {
    reset.classList.remove('hide')
    config.classList.remove('hide')
    pause.classList.add('hide')
    clearInterval(whiteTimerFunction)
    clearInterval(blackTimerFunction)
    whiteState = false
    blackState = false
}

reset.onclick = () => {
    resetFull()
}

whiteSide.onclick = () => {
    whiteCounterSec += increment
    reset.classList.add('hide')
    config.classList.add('hide')
    pause.classList.remove('hide')

    if(whiteState === false){
        click.play()
        whiteStop()
    }
}

blackSide.onclick = () => {
    blackCounterSec += increment
    reset.classList.add('hide')
    config.classList.add('hide')
    pause.classList.remove('hide')

    if(blackState === false){
        click.play()
        blackStop()
    }
}

const whiteStop = () => {
    if(whiteCounterSec < 10){
        whiteSide.innerHTML = `${whiteCounterMin}:0${whiteCounterSec}`
    }
    else{
        whiteSide.innerHTML = `${whiteCounterMin}:${whiteCounterSec}`
    }

    if(whiteCounterSec > 59){
        whiteCounterMin++
        whiteCounterSec = whiteCounterSec - 60

        if(whiteCounterSec < 10){
            whiteSide.innerHTML = `${whiteCounterMin}:0${whiteCounterSec}`
        }
    }
    
    clearInterval(whiteTimerFunction)
    whiteState = true
    blackState = false
    blackTimer()
}

const whiteTimerView = () => {
    whiteSide.innerHTML = `${whiteCounterMin}:${whiteCounterSec}`

    if(whiteCounterMin <= 0 && whiteCounterSec <= 0){
        clearInterval(whiteTimerFunction)
        gameover.play()
        whiteState = true
        whiteSide.classList.add('lose')
        blackSide.classList.add('win')
        pause.classList.add('hide')
        reset.classList.remove('hide')
        config.classList.remove('hide')
        blackSide.innerHTML = 'WIN !'
    } 
    
    if(whiteCounterSec < 10){
        whiteSide.innerHTML = `${whiteCounterMin}:0${whiteCounterSec}`
    }
}

const whiteTimer = () => { 
    if(whiteState === false){
        whiteTimerFunction = setInterval(() => {
        whiteCounterMilesecond--
            
            if(whiteCounterMilesecond < 0){
                whiteCounterSec-- 

                if(whiteCounterSec < 0){
                    whiteCounterSec = 59
                    whiteCounterMin--
                }

                whiteCounterMilesecond = 99
                whiteTimerView()
            }
        }, 10);
    }
}

const blackStop = () => {
    if(blackCounterSec < 10){
        blackSide.innerHTML = `${blackCounterMin}:0${blackCounterSec}`
    }
    else{
        blackSide.innerHTML = `${blackCounterMin}:${blackCounterSec}`
    }

    if(blackCounterSec > 59){
        blackCounterMin++
        blackCounterSec = blackCounterSec - 60

        if(blackCounterSec < 10){
            blackSide.innerHTML = `${blackCounterMin}:0${blackCounterSec}`
        }
    }

    blackState = true
    whiteState = false
    clearInterval(blackTimerFunction)
    whiteTimer()
}

const blackTimerView = () => {
    blackSide.innerHTML = `${blackCounterMin}:${blackCounterSec}`

    if(blackCounterMin <= 0 && blackCounterSec <= 0){
        clearInterval(blackTimerFunction)
        gameover.play()
        blackState = true
        blackSide.classList.add('lose')
        whiteSide.classList.add('win')
        pause.classList.add('hide')
        reset.classList.remove('hide')
        config.classList.remove('hide')
        whiteSide.innerHTML = 'WIN !'
    }
    
    if(blackCounterSec < 10){
        blackSide.innerHTML = `${blackCounterMin}:0${blackCounterSec}`
    }   
}

const blackTimer = () => { 
    if(blackState === false){
        blackTimerFunction = setInterval(() => {
        blackCounterMilesecond--
            
            if(blackCounterMilesecond < 0){
                blackCounterSec--

                if(blackCounterSec < 0){
                    blackCounterSec = 59
                    blackCounterMin--
                }

                blackCounterMilesecond = 99
                blackTimerView()
            }
        }, 10);
    }
}

const resetFull = () => {
    whiteSide.innerHTML = currentHTML
    blackSide.innerHTML = currentHTML
    whiteCounterMin = currentMin
    blackCounterMin = currentMin
    whiteCounterSec = currentSec
    blackCounterSec = currentSec
    whiteCounterMilesecond = 1
    blackCounterMilesecond = 1
    whiteState = false
    blackState = false

    if(whiteSide.classList.contains('win') || whiteSide.classList.contains('lose')){
        whiteSide.classList.remove('win')
        whiteSide.classList.remove('lose')
        blackSide.classList.remove('win')
        blackSide.classList.remove('lose')
    }
}
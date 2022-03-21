var playerScore = 0;
var computerScore = 0;
var defaultTime = 750;

async function pick(symbol){
    if(!isSymbolSelected()){
        const oponentPicked = getRandomSymbol();
        const playerPicked = options.find(obj => obj.symbolName === symbol);
        paintSymbol(symbol,'player')
        showScore()
        await doOpponentActions(oponentPicked)
        await decideWinner(oponentPicked, playerPicked);
        resetState()
    }
}

const rockObj = {
    symbolName: 'rock',
    loses: 'paper',
    wins: 'scissors'
};

const paperObj = {
    symbolName: 'paper',
    loses: 'scissors',
    wins: 'rock'
};

const scissorsObj = {
    symbolName: 'scissors',
    loses: 'rock',
    wins: 'paper'
};

const options = [rockObj, paperObj, scissorsObj];

function setScore(){
    document.getElementById('player-score').innerText=playerScore
    document.getElementById('opponent-score').innerText=computerScore
}
function showScore(){
    document.getElementById('player-score').parentElement.style.transition='1s'
    document.getElementById('player-score').parentElement.style.opacity=1;
    document.getElementById('opponent-score').parentElement.style.transition='1s'
    document.getElementById('opponent-score').parentElement.style.opacity=1;
}

function getRandomSymbol(){
    return options[Math.floor(Math.random() * options.length)].symbolName;
}

async function decideWinner(oponentPicked, playerPicked){
    return new Promise((resolve) => {
        setTimeout(() => {
            if(oponentPicked === playerPicked.symbolName){
                playersTied();
            }
            if(oponentPicked === playerPicked.loses){
                playerLost();
            }
            if(oponentPicked === playerPicked.wins){
                playerWins();
            }
            setScore()
            resolve()
        },defaultTime)
    })
        
}

function playersTied(){
    document.getElementById('center-text').innerText=`It's a draw! ⚔️`
}
function playerLost(){
    document.getElementById('center-text').innerText=`You have Lost 😔`
    computerScore++
}
function playerWins(){
    document.getElementById('center-text').innerText=`You have won 😎`
    playerScore++
}


function paintSymbol(symbol,party){
    const div = document.querySelector(`#${party}Container [alt=${symbol}]`)
    div.parentNode.classList.add('selected')
}

function isSymbolSelected(){
    return document.querySelector('.selected')?true:false
}


async function doOpponentActions(opponentSymbol){
    return new Promise(async (resolve) => {
        await waitThenShowContainer()
        await toggleOpponentPicks()
        await waitThenPaint(defaultTime,opponentSymbol,'opponent')
        resolve()
    })
}

function toggleOpponentPicks(){
    return new Promise(async (resolve) => {
        await waitThenPaint(defaultTime,'rock','opponent')
        await waitThenRemove(defaultTime,'opponent')
        await waitThenPaint(defaultTime,'paper','opponent')
        await waitThenRemove(defaultTime,'opponent')
        await waitThenPaint(defaultTime,'scissors','opponent')
        await waitThenRemove(defaultTime,'opponent')
        resolve();
    }) 
}

function waitThenShowContainer(){
    return new Promise((resolve) => {
        setTimeout(() => {
            document.getElementById('opponentContainer').style.opacity = 1;
            document.getElementById('center-text').style.opacity = 1;
            showComputerIsThinking()
            resolve()
        },defaultTime)
    })
}


function waitThenPaint(time,symbol,party){
    return new Promise((resolve) => {
        setTimeout(() => {
            paintSymbol(symbol,party)
            resolve()
        },time)
    })
}


function removeSelected(party){
    document.querySelector(`#${party}Container .selected`).classList.remove('selected')
}

function resetState(){
    setTimeout(() => {
        removeSelected('opponent')
        removeSelected('player')
        document.getElementById('center-text').innerHTML=''
        document.getElementById('opponentContainer').style.opacity = 0;

    },defaultTime*3)
    
}

function showComputerIsThinking(){
    document.getElementById('center-text').innerText="Computer is picking..."
}

function waitThenRemove(time,party){
    return new Promise((resolve) => {
        setTimeout(() => {
            removeSelected(party)
            resolve()
        },time)
    })
}

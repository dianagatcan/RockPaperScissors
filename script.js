function pick(symbol){
    if(!isSymbolSelected()){
        const oponentPicked = getRandomSymbol();
        const playerPicked = options.find(obj => obj.symbolName === symbol);
        console.log(oponentPicked)
        paintSymbol(symbol,'player')
        doOpponentActions(oponentPicked)
        decideWinner(oponentPicked, playerPicked);
        
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

function getRandomSymbol(){
    return options[Math.floor(Math.random() * options.length)].symbolName;
}

function decideWinner(oponentPicked, playerPicked){
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
    },5250)
    
}

function playersTied(){
    document.getElementById('center-text').innerText=`It's a draw! ⚔️`
}
function playerLost(){
    document.getElementById('center-text').innerText=`You have Lost 😔`
}
function playerWins(){
    document.getElementById('center-text').innerText=`You have won 😎`
}


function paintSymbol(symbol,party){
    const div = document.querySelector(`#${party}Container [alt=${symbol}]`)
    div.parentNode.classList.add('selected')
}

function isSymbolSelected(){
    return document.querySelector('.selected')?true:false
}

function showOpponentContainer(){
    setTimeout(() => {
        document.getElementById('opponentContainer').style.opacity = 1;
        document.getElementById('center-text').style.opacity = 1;
    },750)

}


function doOpponentActions(opponentSymbol){
    showOpponentContainer()
    toggleOpponentPicks()
    pickFinalOpponentSymbol(opponentSymbol)
}

function toggleOpponentPicks(){
    const base = 500
    const increment = 250
    const fullRotation = 1500
    for (let times = 0; times < 3; times++) {
        setTimeout(() => {
            paintSymbol('rock','opponent')
        },base+increment*0+fullRotation*times)
        setTimeout(() => {
            removeOpponentSelected()
        },base+increment*1+fullRotation*times)
        setTimeout(() => {
            paintSymbol('paper','opponent')
        },base+increment*2+fullRotation*times)
        setTimeout(() => {
            removeOpponentSelected()
        },base+increment*3+fullRotation*times)
        setTimeout(() => {
            paintSymbol('scissors','opponent')
        },base+increment*4+fullRotation*times)
        setTimeout(() => {
            removeOpponentSelected()
        },base+increment*5+fullRotation*times)   
    }
    
}

function removeOpponentSelected(){
    document.querySelector('#opponentContainer .selected').classList.remove('selected')
}

function pickFinalOpponentSymbol(opponentSymbol){
    setTimeout(() => {
        paintSymbol(opponentSymbol,'opponent')
    },5000)
}
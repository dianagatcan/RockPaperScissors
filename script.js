function pick(symbol){
    if(!isSymbolSelected()){
        const oponentPicked = getRandomSymbol();
        const playerPicked = options.find(obj => obj.symbolName === symbol);
        console.log(oponentPicked)

        decideWinner(oponentPicked, playerPicked);
        paintSymbol(symbol)
        showOpponentContainer()
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
    if(oponentPicked === playerPicked.symbolName){
        playersTied();
    }
    if(oponentPicked === playerPicked.loses){
        playerLost();
    }
    if(oponentPicked === playerPicked.wins){
        playerWins();
    }
}

function playersTied(){
    console.log('tie');
}
function playerLost(){
    console.log('player lost');
}
function playerWins(){
    console.log('player wins');
}


function paintSymbol(symbol){
    const div = document.querySelector(`[alt=${symbol}]`)
    div.parentNode.classList.add('selected')
}

function isSymbolSelected(){
    return document.querySelector('.selected')?true:false
}

function showOpponentContainer(){
    console.log('i am here') 
}
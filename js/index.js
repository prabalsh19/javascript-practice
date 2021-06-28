//Age In Days

function promt() {

    let age = prompt('What is Your Age?');
    let ageInDays = age * 365

    let h1 = document.createElement('h1');
    let text = document.createTextNode("You are " + ageInDays + " old");
    h1.setAttribute('id', 'ageInDays')
    h1.appendChild(text);

    document.getElementsByClassName('age')[0].appendChild(h1);
}

function remove() {
    document.getElementById('age-result').remove();
}

//Cat Generator

function addCat() {
    var img = document.createElement("img")
    var selectDiv = document.getElementById('cat-div')
    img.src = "http://thecatapi.com/api/images/get?format=src&type=gif"

    selectDiv.append(img);
}


//Rock Paper Scissors Game

function rpsGame(yourchoice) {

    var humanChoice, botChoice;
    humanChoice = yourchoice.id

    botChoice = botChoiceId().id;

    result = decideWinner(humanChoice, botChoice);

    message = finalMessage(result)



    rpsFrontEnd(humanChoice, botChoice, message)
}



function humanChoice(yourchoice) {
    return (yourchoice);
}

function botChoiceNum() {
    return (Math.floor(Math.random() * 3))
}

function botChoiceId() {

    return [rock, paper, scissors][botChoiceNum()]
}

function decideWinner(humanChoice, botChoiceId) {

    let rpsDatabase = {
        'rock': {
            'scissors': 1,
            'paper': 0,
            'rock': 0.5
        },
        'scissors': {
            'paper': 1,
            'rock': 0,
            'scissors': 0.5
        },
        'paper': {
            'rock': 1,
            'scissors': 0,
            'paper': 0.5
        }
    };
    let yourScore = rpsDatabase[humanChoice][botChoiceId];
    let botScore = rpsDatabase[botChoiceId][humanChoice];

    return [yourScore, botScore]
}

function finalMessage([yourScore, botScore]) {
    if (yourScore === 1) {
        return {
            'message': 'You Won',
            'color': 'Green'
        }
    } else if (yourScore === 0.5) {
        return {
            'message': 'Game Tied',
            'color': 'yellow'
        }
    } else if (yourScore === 0) {
        return {
            'message': 'You Lost',
            'color': 'red'
        }
    }


}


function rpsFrontEnd(yourChoice, botChoice, message) {
    let imgDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src

    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humanDiv = document.createElement('div');
    let messageDiv = document.createElement('div');
    let botDiv = document.createElement('div');


    humanDiv.innerHTML = "<img src='" + imgDatabase[yourChoice] + "' height=300px width=300px  style=  'box-shadow: 0px 10px 50px rgba(255, 99, 71, 1)' >"
    messageDiv.innerHTML = "<h1 style= color:" + message['color'] + ">" + message['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imgDatabase[botChoice] + "' height=300px; width=300px style=  'box-shadow: 0px 10px 50px rgba(255, 99, 71, 1)' >"

    document.getElementById('RPS-container').appendChild(humanDiv);
    document.getElementById('RPS-container').appendChild(messageDiv);
    document.getElementById('RPS-container').appendChild(botDiv);



}


// Change All Btn Color

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = []

for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1])
}




function changeBtnColor(selected) {
    if (selected.value === 'red') {
        redColorBtn()
    } else if (selected.value === 'yellow') {
        yellowColorBtn()
    } else if (selected.value === 'green') {
        greenColorBtn()
    } else if (selected.value === 'random') {
        randomColorBtn()
    } else if (selected.value === 'reset') {
        resetBtn()
    }

}

function redColorBtn() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add("btn-danger")
    }
}

function yellowColorBtn() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add('btn-warning')
    }
}

function greenColorBtn() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add("btn-success")
    }
}

function randomColorBtn() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        let randomNum = Math.floor(Math.random() * 3);


        let choice = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'][randomNum];

        all_buttons[i].classList.add(choice);
    }
}

function resetBtn() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add(copyAllButtons[i])
    }
}


// BlackJack

let blackJackGame = {
    you: {
        'div': '#your-box',
        'score-span': '#your-score',
        'score': 0
    },
    bot: {
        'div': '#bot-box',
        'score-span': '#bot-score',
        'score': 0
    },
    cards: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'K', 'Q'],
    cardsMap: {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'A': [10, 1],
        'J': 10,
        'K': 10,
        'Q': 10
    },
    'win': 0,
    'loss': 0,
    'drew': 0,
    'hitState':false,
    'standState':false
}

const you = blackJackGame.you;
const bot = blackJackGame.bot;

const hitSound = new Audio("sounds/swish.m4a");
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

 

document.querySelector('#hitBtn').addEventListener('click', hitBtn);
document.querySelector('#standBtn').addEventListener('click', botLogic);

document.querySelector('#dealBtn').addEventListener('click', dealBtn);

function hitBtn() {
if(blackJackGame['standState']===false)
    showCard(you);
    showScore(you);
   blackJackGame ['hitState'] = true
}

function showCard(activePlayer) {
    if (activePlayer['score'] <= 21) {
        let img = document.createElement('img');
        let imgNum = blackJackGame.cards[Math.floor(Math.random() * 13)];

        img.src = 'images/' + imgNum + '.png';

        img.style.height = '120px';
        img.style.width = '120px'
        document.querySelector(activePlayer['div']).appendChild(img);
        hitSound.play();
        updateYourScore(imgNum, activePlayer);
    }



}

function dealBtn(activePlayer) {
if(blackJackGame['standState']===true){


    let yourImg = document.querySelector('#your-box').querySelectorAll('img');
    let botImg = document.querySelector('#bot-box').querySelectorAll('img');

    for (let i = 0; i < yourImg.length; i++) {
        yourImg[i].remove();
    }
    for (let i = 0; i < botImg.length; i++) {
        botImg[i].remove();
    }
    document.querySelector('#your-score').textContent = 0
    document.querySelector('#bot-score').textContent = 0

    document.querySelector('#your-score').style.color = '#ffffff'
    document.querySelector('#bot-score').style.color = '#ffffff'


    you['score'] = 0;
    bot['score'] = 0;
    document.querySelector('#blackjack-result').textContent = "Let's Play"
    document.querySelector('#blackjack-result').style.color = "black"

    blackJackGame['standState']=false;
    blackJackGame['hitState']=false
}
}

function updateYourScore(imgNum, activePlayer) {


    if (imgNum === 'A') {
        if (activePlayer['score'] + 11 < 21) {
            activePlayer['score'] += blackJackGame['cardsMap'][imgNum][0];

        } else {
            activePlayer['score'] += blackJackGame['cardsMap'][imgNum][1];

        }
    } else {
        activePlayer['score'] += blackJackGame['cardsMap'][imgNum];

    }



}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['score-span']).textContent = 'BUST'
        document.querySelector(activePlayer['score-span']).style.color = 'red'

    } else {
        document.querySelector(activePlayer['score-span']).textContent = activePlayer['score']

    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function botLogic() {
while(blackJackGame['hitState']===true && bot['score']<16){

    
    showCard(bot);
    showScore(bot);
    await sleep(1000)
}

    
        
        showWinner(findWinner());
        blackJackGame['standState']=true
    
    updateScoreBoard();
    

}

function findWinner() {
    let winner
    if (you['score'] <= 21) {
        if (you['score'] > bot['score'] || bot['score'] > 21) {
            winner = you
            blackJackGame['win']++;
        } else if (you['score'] < bot['score']) {
            blackJackGame['loss']++;
            winner = bot
        } else if (you['score'] === bot['score']) {
            blackJackGame['drew']++
        }
    } //if you bust
    else if (you['score'] > 21 && bot['score'] <= 21) {
        blackJackGame['loss']++;
        winner = bot
        //both bust
    } else if (you['score'] > 21 && bot['score'] > 21) {
        blackJackGame['drew']++;
    }
   


    return winner

}

function showWinner(winner) {
    if (winner === you) {
        document.querySelector('#blackjack-result').textContent = 'You Won'
        document.querySelector('#blackjack-result').style.color = 'Green'

        winSound.play();
    } else if (winner === bot) {
        document.querySelector('#blackjack-result').textContent = 'You Lost!'
        document.querySelector('#blackjack-result').style.color = 'red'
        lossSound.play();
    } else {
        document.querySelector('#blackjack-result').textContent = 'You Drew!'
        document.querySelector('#blackjack-result').style.color = 'black'

    }
}

function updateScoreBoard() {
    document.querySelector('#wins').textContent = blackJackGame['win'];
    document.querySelector('#losses').textContent = blackJackGame['loss'];
    document.querySelector('#draws').textContent = blackJackGame['drew'];


}
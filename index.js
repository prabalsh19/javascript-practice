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


    humanDiv.innerHTML = "<img src='" + imgDatabase[yourChoice] +  "' height=300px width=300px  style=  'box-shadow: 0px 10px 50px rgba(255, 99, 71, 1)' >"
    messageDiv.innerHTML = "<h1 style= color:"+message['color'] +">"+ message['message']+"</h1>"
    botDiv.innerHTML = "<img src='" + imgDatabase[botChoice] +  "' height=300px; width=300px style=  'box-shadow: 0px 10px 50px rgba(255, 99, 71, 1)' >"

    document.getElementById('RPS-container').appendChild(humanDiv);
    document.getElementById('RPS-container').appendChild(messageDiv);
    document.getElementById('RPS-container').appendChild(botDiv);



}
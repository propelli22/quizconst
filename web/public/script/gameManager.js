const socket = io();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const currentAddressGame = window.location.origin;  
const currentLanguage = urlParams.get('language');

const lobbyId = urlParams.get("lobby");
const playerId = getCookie("playerId");
const isHost = getCookie("host") || false;
const subjectId = urlParams.get('subject');

const questionCountTag = document.getElementById("question-count");

const questionContainer = document.getElementById("question-container");
const mainGameContainer = document.getElementById("main-game-container");
const loadingContainer = document.getElementById("loading-container");
const resultsContainer = document.getElementById("results-container");

//document.getElementById("low-taper-fade").style.display = "none";
//document.getElementById("rick-roll-video").style.display = "none";

let questionCount = 1;
const questionCountText = questionCountTag.innerHTML;

// not using the "getCookie.js" module due to weird issues with html script linking, try to fix later, same in lobbymanager
async function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

socket.on('connect', () => {
    console.log('Connected to server!');
});

document.addEventListener('DOMContentLoaded', () => {
    const playerData = {
        playerId: playerId,
        lobbyId: lobbyId,
        subjectId: subjectId,
    }

    socket.emit('playerReady', playerData);
});

socket.on('gameQuestion', (questionData) => {
    console.log(`Recived game question: ${questionData}`);

    // tee jotain sillä datalla :D
});

function submitAnswer(selectedOption, questionData) {
    let hasAnswered = false;
    let correctAnswer = false;

    if (questionData.correctOption == selectedOption) {
        correctAnswer = true
    }

    const startTime = Date.now();
    const startingPoints = questionData.points;
    const reductionAmount = startingPoints / (questionData.answerTime * 1000);
    let curretPoints = startingPoints;

    const timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        curretPoints = Math.max(0, startingPoints - (reductionAmount * elapsedTime));

        if (hasAnswered || elapsedTime >= questionData.answerTime * 1000) {
            clearInterval(timer);
            
            const playerScore = correctAnswer ? Math.round(curretPoints) : 0;

            const answerData = {
                playerId: playerId,
                lobbyId: lobbyId,
                score: playerScore
            }

            socket.emit('questionAnswer', answerData);
            console.log(`Score submitted!`)
        }
    })
}

socket.on('scores', () => {
    console.log(`Recived scores!`);

    // htmll

    if (isHost) {
        //html taaaaaaaaaaas!
    }
});

function continueGame() {
    const lobbyData = {
        lobbyId: lobbyId,
    }

    socket.emit('continueGame', lobbyData);
    console.log('Game continuing...');
}

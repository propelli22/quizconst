const lobbyId = 2;  // placeholder for now, until the lobby sends cookies.
const subjectId = 2; // placeholder for now, until the lobby sends cookies.
let questionId = 1; // placeholder for now, retrive all question ID:s of a subject on game start as an list.
const playerId = 3; // placeholder for now, until the lobby sends cookies.
const isHost = true; // placeholder for now, until the lobby sends cookies.
let lastQuestion = false;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const currentAddress = window.location.origin;
const currentLanguage = urlParams.get('language');
console.log(urlParams.get('language'));
let currentQuestion = 0;

const questionCountTag = document.getElementById("question-count");

const questionContainer = document.getElementById("question-container");
const mainGameContainer = document.getElementById("main-game-container");
const loadingContainer = document.getElementById("loading-container");
const resultsContainer = document.getElementById("results-container");

let questionCount = 1;
const questionCountText = questionCountTag.innerHTML;
let questionIDlist = [];

async function getQuestionCount() {
    let dataResponse;
    const getQuestionsBody = {
        action: "allquestions",
        subjectId: subjectId
    }
    
    // fetch all questions of a subject to figure out how many questions there are and what their id:s are
    await fetch(`${currentAddress}/gamedata`, {
        method: 'POST',
        body: JSON.stringify(getQuestionsBody),
        headers: {'Content-Type': 'application/json'}
    })
    .then(Response => Response.json())
    .then(data => dataResponse = data);

    questionCount = dataResponse.length;
    
    for (let i = 0; i < dataResponse.length; i++) {
        questionIDlist.push(dataResponse[i].question_id)
    }

    return questionIDlist;
}

function setQuestionCount(currentQuestion) {
    questionCountTag.innerHTML = `${questionCountText} ${currentQuestion}/${questionCount}`;
}

function countQuestions() {
    currentQuestion++
    setQuestionCount(currentQuestion);
}

async function getQuestion(id) {
    let dataResponse;
    const body = {
        action: "question",
        questionId: id
    }

    await fetch(`${currentAddress}/gamedata`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    })
    .then(Response => Response.json())
    .then(data => dataResponse = data);

    var questionData = {
        questionId: dataResponse[0].question_id,
        question: dataResponse[0].question,
        points: dataResponse[0].points,
        answerTime: dataResponse[0].time,
        waitingTime: dataResponse[0].wait
    }

    return questionData;
}

async function setPlayerReady(recivedPoints) {
    questionContainer.style.display = "none";
    mainGameContainer.style.display = "none";
    loadingContainer.style.display = "block";
    resultsContainer.style.display = "none";

    let dataResponse;
    const body = {
        action: "questionready",
        playerId: playerId,
        lobbyId: lobbyId,
        recivedPoints: recivedPoints
    }

    await fetch(`${currentAddress}/gamedata`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    })
    .then(Response => dataResponse = Response.status);

    loadingContainer.style.display = "none";

    return dataResponse;
}

async function questionPreview(questionData) {
    questionContainer.style.display = "block";
    mainGameContainer.style.display = "none";
    loadingContainer.style.display = "none";
    resultsContainer.style.display = "none";

    document.getElementById("preview-question").innerHTML = questionData.question;

    let previewTime = questionData.waitingTime;
    document.getElementById("waiting-time").innerHTML = `${previewTime} s`;

    return new Promise((resolve) => {
        const previewCountdown = setInterval(() => {
            document.getElementById("waiting-time").innerHTML = `${previewTime} s`;
            previewTime--;

            if (previewTime < 0) {
                clearInterval(previewCountdown);
                questionContainer.style.display = "none";
                resolve(true);
            }
        }, 1000);
    });
}

async function fetchQuestionAnswers(questionData) {
    let dataResponse;
    const body = {
        action: "getanswers",
        questionId: questionData.questionId
    }

    await fetch(`${currentAddress}/gamedata`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    })
    .then(Response => Response.json())
    .then(data => dataResponse = data);

    const questionAnswers = {
        answer1: dataResponse[0],
        answer2: dataResponse[1],
        answer3: dataResponse[2],
        answer4: dataResponse[3]
    }

    return questionAnswers;
}

async function runQuestion(questionData) {
    questionContainer.style.display = "none";
    mainGameContainer.style.display = "block";
    loadingContainer.style.display = "none";
    resultsContainer.style.display = "none";

    let answers = await fetchQuestionAnswers(questionData);
    let hasAnswered = false;
    let correctAnswer = false;

    document.getElementById("answer-1").innerHTML = answers.answer1.answer;
    document.getElementById("answer-2").innerHTML = answers.answer2.answer;
    document.getElementById("answer-3").innerHTML = answers.answer3.answer;
    document.getElementById("answer-4").innerHTML = answers.answer4.answer;

    document.getElementById("question-time").style.display = "block";

    document.getElementById("answer1-container").addEventListener("click", function() {
        playerAnswer = 1;
        hasAnswered = true;

        if (answers.answer1.correct == 1) {
            correctAnswer = true;
        }
    });
    document.getElementById("answer2-container").addEventListener("click", function() {
        playerAnswer = 2;
        hasAnswered = true;

        if (answers.answer2.correct == 1) {
            correctAnswer = true;
        }
    });
    document.getElementById("answer3-container").addEventListener("click", function() {
        playerAnswer = 3;
        hasAnswered = true;

        if (answers.answer3.correct == 1) {
            correctAnswer = true;
        }
    });
    document.getElementById("answer4-container").addEventListener("click", function() {
        playerAnswer = 4;
        hasAnswered = true;

        if (answers.answer4.correct == 1) {
            correctAnswer = true;
        }
    });

    let dataResponse;
    const questionId = questionData.questionId;

    const body = {
        action: "time",
        questionId: questionId
    }
    
    await fetch(`${currentAddress}/gamedata`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    })
    .then(Response => Response.json())
    .then(data => dataResponse = data);

    let startingPoints;
    let timeData = dataResponse;

    let answerTime = questionData.answerTime;
    document.getElementById("remaining-time").innerHTML = `${answerTime} s`;

    startingPoints = timeData[0].points;
    
    const ConvertedTime = timeData[0].time * 1000;
    const reductionAmount = startingPoints / ConvertedTime;
    let currentPoint = startingPoints;
    const startTime = Date.now();

    return new Promise((resolve) => {
        const gameTimer = setInterval(() => {
            document.getElementById("remaining-time").innerHTML = `${answerTime} s`;
            answerTime--;
        
            const elapsedTime = Date.now() - startTime;

            currentPoint = Math.max(0, startingPoints - (reductionAmount * elapsedTime));
        }, 1000);

        const gameMonitor = setInterval(async () => {
            if (answerTime < 0 || hasAnswered) {
                clearInterval(gameTimer);
                clearInterval(gameMonitor);
                mainGameContainer.style.display = "none";
                let readyStatus;

                if (correctAnswer) {
                    readyStatus = await setPlayerReady(currentPoint.toFixed(0));
                } else {
                    readyStatus = await setPlayerReady(0);
                }

                if (readyStatus == 200) {
                    console.log("able to continue");
                }

                console.log("testingggg")

                document.getElementById("question-time").style.display = "none";
                resolve(true);
            }
        }, 100);
    });
}

// do not touch! easter egg :)
console.log("Wrong place fool, there are no answers to be given here :) or is there?");
// TODO FOR KALLE: as an easter egg, add an command that can be ran in the console
// the command should output answers to the questions, BUT, they are all wrong :)

// EASTER EGG FUNCTIONS, in the game
Object.defineProperty(window, 'giveMaxPoints', { // rick rolls you :D
    get: function () {
        window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0')
        console.log("???, why are you trying to cheat the game???")
    }
});

Object.defineProperty(window, 'addPoints', { // low taper fade
    get: function () {
        window.open('style/content/low_taper_fade.jpg')
        console.log("imagine trying to cheat, you can still imagine if ninja got a low taper fade")
    }
});

Object.defineProperty(window, 'getCorrectAnswer', {
    get: function () {
        console.log("The answer to the current question is:")

        const minCeiled = Math.ceil(1);
        const maxFloored = Math.floor(4);

        let questionAnswerId = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
        let questionAnswer = document.getElementById(`answer-${questionAnswerId}`).innerHTML;
        console.log(`${questionAnswer}`);
    }
});

async function showResults() {
    questionContainer.style.display = "none";
    mainGameContainer.style.display = "none";
    loadingContainer.style.display = "none";
    resultsContainer.style.display = "block";

    document.getElementById("no-more-players-message").style.display = "none";
    document.getElementById("leaderboard-buttons-container").style.display = "block"
    document.getElementById("question-count-container").style.display = "none";

    resultsButtonVisibility();

    let dataResponse;
    const body = {
        action: "results",
        lobbyId: lobbyId,
        playerId: playerId
    }
    
    await fetch(`${currentAddress}/gamedata`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    })
    .then(Response => Response.json())
    .then(data => dataResponse = data);

    document.getElementById("podium-1-name").innerHTML = dataResponse[0].name;
    document.getElementById("podium-1-points").innerHTML = dataResponse[0].points;

    document.getElementById("podium-2-name").innerHTML = dataResponse[1].name;
    document.getElementById("podium-2-points").innerHTML = dataResponse[1].points;

    if(dataResponse.length >= 3) {
        document.getElementById("podium-3-name").innerHTML = dataResponse[2].name;
        document.getElementById("podium-3-points").innerHTML = dataResponse[2].points;

        if(dataResponse.length > 3) {
            let leaderboardContainer = document.getElementById("leaderboard-container")
            let html = ``;

            dataResponse.forEach((player, index) => {
                // avoid duplicate prints of podium players
                if (index === 0 || index === 1 || index === 2) return;

                html += `
                    <div id="player${index}" class="leaderboard-player">
                        <p class="position">${index + 1}.</p>
                        <p class="name">${dataResponse[index].name}</p>
                        <p class="position">${dataResponse[index].points}</p>
                    </div>
                `;

                leaderboardContainer.innerHTML = html;
            });
        } else {
            document.getElementById("no-more-players-message").style.display = "block";
        }
    }

    return new Promise((resolve) => {
        document.getElementById("continue-button").addEventListener("click", function () {
            document.getElementById("continue-button").style.display = "none";
            resolve(true);
        });

        document.getElementById("leave-button").addEventListener("click", function () {
            document.getElementById("leave-button").style.display = "none";
            resolve(true);
        });
    })
}

function leaveLobby() {
    window.open(`${currentAddress}`)
}

function resultsButtonVisibility() {
    // jotain jotain, host voi jatkaa peliä
    if(isHost && !lastQuestion) {
        document.getElementById("continue-button").style.display = "block";
        document.getElementById("leave-button").style.display = "none";
    } else if (lastQuestion) {
        document.getElementById("leave-button").style.display = "block";
    }
}

// TODO torstaille ja loppu viikolle myöskin, viikonlopulle menee :) t perjantai kalle
// - testaus yhdellä ja useammalla laitteella, mutta koska aula ei ole viellä valmis, ei voi testata vielä, eli siis odoteteaan aulaa :(

// gameController is used to call all the functions in order using async.
async function gameController() {
    // initalaize game, done separately from question cycle to avoid unnecesary looping of things that need to be called only once.
    const questions = await getQuestionCount();
    countQuestions();

    // question cycle
    for(let i = 0; i < questionCount; i++) {
        const recivedQuestionData = await getQuestion(questions[i]);

        console.log(i + 1)
        console.log(questionCount)

        if (i + 1 == questionCount) {
            lastQuestion = true;
        }

        await questionPreview(recivedQuestionData);
        await runQuestion(recivedQuestionData);
        await showResults();
    }
}

gameController();
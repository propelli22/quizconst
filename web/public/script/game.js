const lobbyId = 0;  // placeholder for now, until the lobby sends cookies.
const subjectId = 2; // placeholder for now, until the lobby sends cookies.
let questionId = 1; // placeholder for now, retrive all question ID:s of a subject on game start as an list.
const playerId = 3; // placeholder for now, until the lobby sends cookies.

const currentAddress = window.location.origin;
const currentLanguage = "fi"; // TODO: fetch current language from url parameters, should be the only parameter in the url.
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

    console.log(dataResponse);

    var questionData = {
        questionId: dataResponse.question_id,
        question: dataResponse.question,
        points: dataResponse.points,
        answerTime: dataResponse.time,
        waitingTime: dataResponse.wait
    }

    return questionData;
}

async function setPlayerReady() {
    questionContainer.style.display = "none";
    mainGameContainer.style.display = "none";
    loadingContainer.style.display = "block";
    resultsContainer.style.display = "none";

    let dataResponse;
    const body = {
        action: "questionready",
        playerId: playerId,
        lobbyId: lobbyId
    }

    await fetch(`${currentAddress}/gamedata`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    })
    .then(Response => Response.json())
    .then(data => dataResponse = data);

    loadingContainer.style.display = "none";
}

function questionPreview(questionData) {
    questionContainer.style.display = "block";
    mainGameContainer.style.display = "none";
    loadingContainer.style.display = "none";
    resultsContainer.style.display = "none";

    document.getElementById("preview-question").innerHTML = questionData[0].question;

    let previewTime = questionData[0].waitingTime;
    document.getElementById("waiting-time").innerHTML = `${previewTime} s`;
    const previewCountdown = setInterval(() => {
        document.getElementById("waiting-time").innerHTML = `${previewTime} s`;
        previewTime--;

        if (previewTime < 0) {
            clearInterval(previewCountdown);
            questionContainer.style.display = "none";
        }
    }, 1000);
}

function runQuestion(questionData) {
    questionContainer.style.display = "none";
    mainGameContainer.style.display = "block";
    loadingContainer.style.display = "none";
    resultsContainer.style.display = "none";

    let answerTime = questionData[0].answerTime;
    document.getElementById("remaining-time").innerHTML = answerTime;
    const answerCountdown = setInterval(() => {
        document.getElementById("remaining-time").innerHTML = answerTime;
        answerTime--;

        if (answerTime < 0) {
            clearInterval(answerCountdown);
            mainGameContainer.style.display = "none";
        }
    }, 1000);
}

// gameController is used to call all the functions in order using async.
async function gameController() {
    // initalaize game, done separately from question cycle to avoid unnecesary looping of things that need to be called only once.
    await getQuestionCount();
    countQuestions();

    // question cycle
    for(let i = 0; i > questionCount; i++) {
        // call functions here
    }
}

gameController();
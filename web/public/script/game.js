const lobbyId = 0;  // placeholder for now, until the lobby sends cookies.
const subjectId = 2; // placeholder for now, until the lobby sends cookies.
let questionId = 1; // placeholder for now, retrive all question ID:s of a subject on game start as an list.
const playerId = 3; // placeholder for now, until the lobby sends cookies.

const currentAddress = window.location.origin;
const currentLanguage = "fi"

const questionCountTag = document.getElementById("question-count");

let questionCount;
const questionCountText = questionCountTag.innerHTML;

function getQuestionCount() {
    const getQuestionsBody = {
        action: "allquestions",
        subjectId: subjectId
    }
    
    // fetch all questions of a subject to figure out how many questions there are and what their id:s are
    fetch(`${currentAddress}/gamedata`, {
        method: 'POST',
        body: JSON.stringify(getQuestionsBody),
        headers: {'Content-Type': 'application/json'}
    })
    .then(Response => Response.json())
    .then(data => questionCount = data.length);
}

function setQuestionCount(currentQuestion) {
    questionCountTag.innerHTML = `${questionCountText} ${currentQuestion}/${questionCount}`;
}
import { saveToDatabase } from "./save-to-database.js"
import { getCookie } from "./getCookie.js"

const saveGameButton = document.getElementById("save-game-button")

if (saveGameButton) {
	saveGameButton.addEventListener("click", function () {
		const dataArray = {
			subjectName: localStorage.getItem("gameName"),
			subjectDescription: localStorage.getItem("gameDescription"),
			subjectImage: localStorage.getItem("gameImageName"),
			subjectAuthor: getCookie("userId"), //TODO: Get the user's ID from the database
			questions: []
		}
		saveToDatabase(dataArray)
		localStorage.clear()
	});
}

const questionList = document.getElementById("question-list");
const questions = questionList.children;

for (let i = 0; i < questions.length; i++) {
    const questionIndex = i + 1;
    const question = {
		question: localStorage.getItem(`question${questionIndex}_questionName`),
		answers: [
			{
				ans: localStorage.getItem(`question${questionIndex}_answer1`),
				cor: localStorage.getItem(`question${questionIndex}_correctAnswer1`),
				pos: "1",
			},
			{
				ans: localStorage.getItem(`question${questionIndex}_answer2`),
				cor: localStorage.getItem(`question${questionIndex}_correctAnswer2`),
				pos: "2",
			},
			{
				ans: localStorage.getItem(`question${questionIndex}_answer3`),
				cor: localStorage.getItem(`question${questionIndex}_correctAnswer3`),
				pos: "3",
			},
			{
				ans: localStorage.getItem(`question${questionIndex}_answer4`),
				cor: localStorage.getItem(`question${questionIndex}_correctAnswer4`),
				pos: "4",
			},
		],
		maxPoints: localStorage.getItem(`question${questionIndex}_settingsAnswerPoints`),
		ansTime: localStorage.getItem(`question${questionIndex}_settingsAnswerTime`),
		waitTime: localStorage.getItem(`question${questionIndex}_settingsQuestionTime`),
		img_file: localStorage.getItem(`question${questionIndex}_uploadImageName`),
	}

    dataArray.questions.push(question);
}

// Clear localStorage when the page is refreshed
window.addEventListener("beforeunload", function () {
	localStorage.clear()
});
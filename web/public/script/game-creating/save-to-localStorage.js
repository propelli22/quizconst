export function saveSettings(questionIndex) {
	var questionTime = document.getElementById(`question${questionIndex}-time`).value
	var answerTime = document.getElementById(`question${questionIndex}-answer-time`).value
	var questionCount = document.getElementById(`question${questionIndex}-count`).value
	var answerPoints = document.getElementById(`question${questionIndex}-answer-points`).value

	localStorage.setItem(`question${questionIndex}_settingsAnswerPoints`, questionTime)
	localStorage.setItem(`question${questionIndex}_settingsAnswerTime`, answerTime)
	localStorage.setItem(`question${questionIndex}_settingsQuestionCount`, questionCount)
	localStorage.setItem(`question${questionIndex}_settingsQuestionTime`, answerPoints)
}

export function setLocalStrogeForNewQuestion(questionIndex) {
	localStorage.setItem(`question${questionIndex}_questionName`, `${question} ${questionIndex}`)

	localStorage.setItem(`question${questionIndex}_answer1`, answer  + " 1")
	localStorage.setItem(`question${questionIndex}_answer2`, answer + " 2")
	localStorage.setItem(`question${questionIndex}_answer3`, answer + " 3")
	localStorage.setItem(`question${questionIndex}_answer4`, answer + " 4")

	localStorage.setItem(`question${questionIndex}_settingsQuestionTime`, "5")
	localStorage.setItem(`question${questionIndex}_settingsAnswerTime`, "30")
	localStorage.setItem(`question${questionIndex}_settingsQuestionCount`, "4")
	localStorage.setItem(`question${questionIndex}_settingsAnswerPoints`, "1000")
}
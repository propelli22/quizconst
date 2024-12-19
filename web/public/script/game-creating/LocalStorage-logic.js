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

	localStorage.setItem(`question${questionIndex}_answer1`, answer + " 1")
	localStorage.setItem(`question${questionIndex}_correctAnswer1`, "0")
	localStorage.setItem(`question${questionIndex}_answer2`, answer + " 2")
	localStorage.setItem(`question${questionIndex}_correctAnswer2`, "0")
	localStorage.setItem(`question${questionIndex}_answer3`, answer + " 3")
	localStorage.setItem(`question${questionIndex}_correctAnswer3`, "0")
	localStorage.setItem(`question${questionIndex}_answer4`, answer + " 4")
	localStorage.setItem(`question${questionIndex}_correctAnswer4`, "0")

	localStorage.setItem(`question${questionIndex}_settingsQuestionTime`, "5")
	localStorage.setItem(`question${questionIndex}_settingsAnswerTime`, "30")
	localStorage.setItem(`question${questionIndex}_settingsQuestionCount`, "4")
	localStorage.setItem(`question${questionIndex}_settingsAnswerPoints`, "1000")
}

export function deleteFromLocalStorage(questionIndex) {
	localStorage.removeItem(`question${questionIndex}_questionName`)
	localStorage.removeItem(`question${questionIndex}_answer1`)
	localStorage.removeItem(`question${questionIndex}_correctAnswer1`)
	localStorage.removeItem(`question${questionIndex}_answer2`)
	localStorage.removeItem(`question${questionIndex}_correctAnswer2`)
	localStorage.removeItem(`question${questionIndex}_answer3`)
	localStorage.removeItem(`question${questionIndex}_correctAnswer3`)
	localStorage.removeItem(`question${questionIndex}_answer4`)
	localStorage.removeItem(`question${questionIndex}_correctAnswer4`)
	localStorage.removeItem(`question${questionIndex}_settingsQuestionTime`)
	localStorage.removeItem(`question${questionIndex}_settingsAnswerTime`)
	localStorage.removeItem(`question${questionIndex}_settingsQuestionCount`)
	localStorage.removeItem(`question${questionIndex}_settingsAnswerPoints`)
}

export function LocalStorageShiftIndexes(questionIndex, questionList) {
	for (let i = questionIndex; i < questionList.length; i++) {
		localStorage.setItem(
			`question${i}_questionName`,
			localStorage.getItem(`question${i + 1}_questionName`)
		)
		localStorage.setItem(
			`question${i}_answer1`,
			localStorage.getItem(`question${i + 1}_answer1`)
		)
		localStorage.setItem(
			`question${i}_answer2`,
			localStorage.getItem(`question${i + 1}_answer2`)
		)
		localStorage.setItem(
			`question${i}_answer3`,
			localStorage.getItem(`question${i + 1}_answer3`)
		)
		localStorage.setItem(
			`question${i}_answer4`,
			localStorage.getItem(`question${i + 1}_answer4`)
		)
		localStorage.setItem(
			`question${i}_correctAnswer1`,
			localStorage.getItem(`question${i + 1}_correctAnswer1`)
		)
		localStorage.setItem(
			`question${i}_correctAnswer2`,
			localStorage.getItem(`question${i + 1}_correctAnswer2`)
		)
		localStorage.setItem(
			`question${i}_correctAnswer3`,
			localStorage.getItem(`question${i + 1}_correctAnswer3`)
		)
		localStorage.setItem(
			`question${i}_correctAnswer4`,
			localStorage.getItem(`question${i + 1}_correctAnswer4`)
		)
		localStorage.setItem(
			`question${i}_settingsAnswerPoints`,
			localStorage.getItem(`question${i + 1}_settingsAnswerPoints`)
		)
		localStorage.setItem(
			`question${i}_settingsAnswerTime`,
			localStorage.getItem(`question${i + 1}_settingsAnswerTime`)
		)
		localStorage.setItem(
			`question${i}_settingsQuestionTime`,
			localStorage.getItem(`question${i + 1}_settingsQuestionTime`)
		)
		localStorage.setItem(
			`question${i}_settingsQuestionCount`,
			localStorage.getItem(`question${i + 1}_settingsQuestionCount`)
		)
		let uploadedImg = localStorage.getItem(`question${i + 1}_uploadedImage`)
		if (uploadedImg) {
			localStorage.setItem(`question${i}_uploadedImage`, uploadedImg)
			localStorage.setItem(
				`question${i}_uploadedImageName`,
				localStorage.getItem(`question${i + 1}_uploadedImageName`)
			)
		}
	}
}

export function removeLastIndexFromLocalStorage(questionList) {
	const lastIndex = questionList.length + 1
	localStorage.removeItem(`question${lastIndex}_questionName`)
	localStorage.removeItem(`question${lastIndex}_answer1`)
	localStorage.removeItem(`question${lastIndex}_answer2`)
	localStorage.removeItem(`question${lastIndex}_answer3`)
	localStorage.removeItem(`question${lastIndex}_answer4`)
	localStorage.removeItem(`question${lastIndex}_correctAnswer1`)
	localStorage.removeItem(`question${lastIndex}_correctAnswer2`)
	localStorage.removeItem(`question${lastIndex}_correctAnswer3`)
	localStorage.removeItem(`question${lastIndex}_correctAnswer4`)
	localStorage.removeItem(`question${lastIndex}_settingsAnswerPoints`)
	localStorage.removeItem(`question${lastIndex}_settingsAnswerTime`)
	localStorage.removeItem(`question${lastIndex}_settingsQuestionTime`)
	localStorage.removeItem(`question${lastIndex}_settingsQuestionCount`)
	localStorage.removeItem(`question${lastIndex}_uploadedImage`)
	localStorage.removeItem(`question${lastIndex}_uploadedImageName`)
}
import { saveSettings } from "./LocalStorage-logic.js"

// Function to get the question index from the question container
function getQuestionIndex(questionContainer) {
	const idMatch = questionContainer.id.match(/selectedQuestion(\d+)/) // Match the question index from the id
	return parseInt(idMatch[1], 10) // Return the question index as an integer
}

// Function to close the question settings modal and set the answer presets
export function presetFor2answers(questionContainer) {
	const answer3 = questionContainer.querySelector("#answer3")
	const answer4 = questionContainer.querySelector("#answer4")
	const answerContainer3 = questionContainer.querySelector("#answer-container3")
	const answerContainer4 = questionContainer.querySelector("#answer-container4")
	const questionAnswers = questionContainer.querySelector("#question-answers")

	answer3.style.display = "none"
	answer4.style.display = "none"
	answerContainer3.style.display = "none"
	answerContainer4.style.display = "none"
	questionAnswers.classList.remove("three-answers", "four-answers")
	questionAnswers.classList.add("two-answers")
}

export function presetFor3answers(questionContainer) {
	const answer3 = questionContainer.querySelector("#answer3")
	const answer4 = questionContainer.querySelector("#answer4")
	const answerContainer3 = questionContainer.querySelector("#answer-container3")
	const answerContainer4 = questionContainer.querySelector("#answer-container4")
	const questionAnswers = questionContainer.querySelector("#question-answers")

	answer3.style.display = "block"
	answer4.style.display = "none"
	answerContainer3.style.display = "block"
	answerContainer4.style.display = "none"
	questionAnswers.classList.remove("two-answers", "four-answers")
	questionAnswers.classList.add("three-answers")
}

export function presetFor4answers(questionContainer) {
	const answer3 = questionContainer.querySelector("#answer3")
	const answer4 = questionContainer.querySelector("#answer4")
	const answerContainer3 = questionContainer.querySelector("#answer-container3")
	const answerContainer4 = questionContainer.querySelector("#answer-container4")
	const questionAnswers = questionContainer.querySelector("#question-answers")

	answer3.style.display = "block"
	answer4.style.display = "block"
	answerContainer3.style.display = "block"
	answerContainer4.style.display = "block"
	questionAnswers.classList.remove("two-answers", "three-answers")
	questionAnswers.classList.add("four-answers")
}

function closeQuestionSettingsModalFunc(questionContainer, questionIndex) {
	// Set the answer presets based on the question settings
	const count = localStorage.getItem(`question${questionIndex}_settingsQuestionCount`)
	switch (parseInt(count, 10)) {
		case 2:
			presetFor2answers(questionContainer)
			break
		case 3:
			presetFor3answers(questionContainer)
			break
		case 4:
		default:
			presetFor4answers(questionContainer)
			break
	}

	// Close the settings modal
	const settingsModal = questionContainer.querySelector("#settings-modal")
	settingsModal.style.display = "none"
}

// Function to attach event listeners to the settings buttons
export function attachSettingsEventListeners(questionContainer) {
	const settingsButton = questionContainer.querySelector("#settings-button")
	const settingsModal = questionContainer.querySelector("#settings-modal")
	const closeSettingsModal = questionContainer.querySelector("#close-settings-modal")
	const saveSettingsButton = questionContainer.querySelector("#save-settings")

	// Logic to open settings modal
	if (settingsButton) {
		settingsButton.onclick = function () {
			settingsModal.style.display = "block"
		}

		// Logic to close settings modal
		closeSettingsModal.onclick = function () {
			settingsModal.style.display = "none"
		}

		// Logic to save settings
		saveSettingsButton.onclick = function () {
			const questionIndex = getQuestionIndex(questionContainer)
			saveSettings(questionIndex)
			closeQuestionSettingsModalFunc(questionContainer, questionIndex)
		}
	}
}
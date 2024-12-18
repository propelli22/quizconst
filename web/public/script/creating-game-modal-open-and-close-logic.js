import { saveSettings } from "./creating-game-save-to-localStorage.js"

document.addEventListener("DOMContentLoaded", function () {
    // Open the first question when the page loads
	var firstQuestion = document.querySelector(".question-container")
	if (firstQuestion) {
		firstQuestion.style.display = "block"
		firstQuestion.classList.add("selected")
	}
})

// Settings modal open, close and event listeners logic
export function attachSettingsEventListeners(questionContainer) {
    var settingsButton = questionContainer.querySelector("#settings-button")
    var settingsModal = questionContainer.querySelector("#settings-modal")
    var closeSettingsModal = questionContainer.querySelector("#close-settings-modal")
    var saveSettingsButton = questionContainer.querySelector("#save-settings")
    if (settingsButton) {
        settingsButton.onclick = function () {
            settingsModal.style.display = "block"
        }
        closeSettingsModal.onclick = function () {
            settingsModal.style.display = "none"
        }
        saveSettingsButton.onclick = function () {
            var questionContainer = document.querySelector(
                ".certain-question:not([style*='display: none'])"
            )
            var questionIndex = null
            if (questionContainer) {
                var idMatch = questionContainer.id.match(/selectedQuestion(\d+)/)
                if (idMatch) {
                    questionIndex = parseInt(idMatch[1], 10)
                }
            }
            saveSettings(questionIndex)
            settingsModal.style.display = "none"
        }
    }
}

var questionButton = document.getElementById("open-question-modal")
var questionModal = document.getElementById("question-modal")
var closeQuestionModal = document.getElementById("close-question-modal")

var settingsModal = document.getElementById("settings-modal")

questionButton.onclick = function () {
	questionModal.style.display = "block"
}

closeQuestionModal.onclick = function () {
	questionModal.style.display = "none"
}

window.onclick = function (event) {
	if (event.target == questionModal) {
		questionModal.style.display = "none"
	}
	if (event.target == settingsModal) {
		settingsModal.style.display = "none"
	}
}
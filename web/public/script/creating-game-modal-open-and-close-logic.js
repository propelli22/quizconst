var questionButton = document.getElementById("open-question-modal")
var questionModal = document.getElementById("question-modal")
var closeQuestionModal = document.getElementById("close-question-modal")

questionButton.onclick = function () {
	questionModal.style.display = "block"
}

closeQuestionModal.onclick = function () {
	questionModal.style.display = "none"
}

var settingsButton = document.getElementById('settings-button')
var settingsModal = document.getElementById('settings-modal')
var closeSettingsModal = document.getElementById('close-settings-modal')
var saveSettingsButton = document.getElementById("save-settings")
var settingsModal = document.getElementById("settings-modal")

settingsButton.onclick = function () {
	settingsModal.style.display = "block"
}

closeSettingsModal.onclick = function () {
	settingsModal.style.display = "none"
}

saveSettingsButton.onclick = function () {
	saveSettings()
	settingsModal.style.display = "none"
}

window.onclick = function (event) {
	if (event.target == questionModal) {
		questionModal.style.display = "none"
	}
	if (event.target == settingsModal) {
		settingsModal.style.display = "none"
	}
}

function saveSettings() {
	var questionTimeValue = document.getElementById("question-time").value
	var answerTimeValue = document.getElementById("answer-time").value
	var questionCountValue = document.getElementById("question-count").value
	var answerPointsValue = document.getElementById("answer-points").value
	var gameNameValue = document.getElementById("game-name").value

	localStorage.setItem("gameName", gameNameValue)
	localStorage.setItem("settingsQuestionTime", questionTimeValue)
	localStorage.setItem("settingsAnswerTime", answerTimeValue)
	localStorage.setItem("settingsQuestionCount", questionCountValue)
	localStorage.setItem("settingsAnswerPoints", answerPointsValue)
}
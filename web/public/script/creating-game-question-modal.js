import { setLocalStrogeForNewQuestion } from "./creating-game-save-to-localStorage.js"
import { attachAnswerEventListeners } from "./creating-game-text-renaming.js"
import { attachSettingsEventListeners } from "./creating-game-modal-open-and-close-logic.js"
import { attachImageEventListeners } from "./creating-game-image-upload.js"

document.addEventListener("DOMContentLoaded", function () {
	// Logic for the first question when the page loads
	localStorage.setItem("gameName", "Pelin nimi")
	setLocalStrogeForNewQuestion(1)
	attachSettingsEventListeners(document.getElementById("selectedQuestion1"))
	attachImageEventListeners(document.getElementById("selectedQuestion1"))

	var firstQuestion = document.getElementById("question1")
	firstQuestion.textContent = localStorage.getItem("question1_questionName") || "Question 1"
	attachEventListeners(firstQuestion)

	// Question creation logic
	var addQuestionBtn = document.getElementById("add-question")
	var questionList = document.getElementById("question-list")

	addQuestionBtn.onclick = function () {
		var newQuestion = document.createElement("div")
		newQuestion.className = "question-item"
		newQuestion.id = "question" + (questionList.children.length + 1)
		newQuestion.textContent = `${question} ${questionList.children.length + 1}`
		questionList.appendChild(newQuestion)
		attachEventListeners(newQuestion)
		editTextTitle(newQuestion)
		setLocalStrogeForNewQuestion(questionList.children.length)
		createQuestionElements(questionList.children.length)
	}
})

// Event listeners for the question items, logic for proper double click and hold click
function attachEventListeners(element) {
	cdblclick(
		() => selectQuestion(element),
		() => editTextTitle(element),
		element
	)
	holdClick(
		() => selectQuestion(element),
		() => editTextTitle(element),
		element
	)
}

// Logic for proper double click
function cdblclick(click, dblClick, el) {
	let clickedTimes = 0
	const incrementClick = () => {
		clickedTimes++
	}
	const reset = () => {
		clickedTimes = 0
	}
	el.addEventListener("click", (e) => {
		incrementClick()
		setTimeout(() => {
			if (clickedTimes === 1) {
				click(e)
			} else if (clickedTimes >= 2) {
				dblClick(e)
			}
			reset()
		}, 300)
	})
}

// Logic for proper hold click
function holdClick(click, holdClick, el) {
	let pressTimer
	let holdTriggered = false

	el.addEventListener("mousedown", function (e) {
		holdTriggered = false
		pressTimer = setTimeout(function () {
			holdClick(e)
			holdTriggered = true
		}, 300)
		e.preventDefault()
	})

	el.addEventListener("mouseup", function (e) {
		clearTimeout(pressTimer)
		if (!holdTriggered) {
			click(e)
		}
		e.preventDefault()
	})

	el.addEventListener("mousemove", function (e) {
		clearTimeout(pressTimer)
		e.preventDefault()
	})

	el.addEventListener("touchstart", function (e) {
		holdTriggered = false
		pressTimer = setTimeout(function () {
			holdClick(e)
			holdTriggered = true
		}, 300)
		e.preventDefault()
	})

	el.addEventListener("touchend", function (e) {
		clearTimeout(pressTimer)
		if (!holdTriggered) {
			click(e)
		}
		e.preventDefault()
	})

	el.addEventListener("touchmove", function (e) {
		clearTimeout(pressTimer)
		e.preventDefault()
	})
}

// Logic for creating the question elements
function createQuestionElements(questionIndex) {
	var questionContainer = document.createElement("div")
	questionContainer.className = "certain-question"
	questionContainer.id = "selectedQuestion" + questionIndex
	questionContainer.style.display = "none"

// HTML content for the each new question container
questionContainer.innerHTML = `
    <h2 id="game-name">${localStorage.getItem("gameName")}</h2>
    <div id="question-title">
        <h1 id="selected-question-name">${localStorage.getItem(
			`question${questionIndex}_questionName`
		)}</h1>
        <label for="question${questionIndex}_file-upload" id="question${questionIndex}_custom-file-upload" class="custom-file-upload">
            <i class="image-upload" id="question${questionIndex}_image-upload">${image_upload}</i>
        </label>
        <input type="file" class="file-upload" id="question${questionIndex}_file-upload" accept=".jpg,.jpeg,.png,.bmp,.webp,.svg,.apng,.avif" style="display: none;">
        <div id="question${questionIndex}_image-name-container" class="image-name-container" style="display: none;">
            <span class="close" id="question${questionIndex}_close-image-name-container">&times;</span>
            <span id="question${questionIndex}_image-name"></span>
        </div>
    </div>
    <div id="question${questionIndex}_image-modal" class="modal" style="display: none;">
        <span class="close" id="question${questionIndex}_close-image-modal">&times;</span>
        <img class="image-modal-content" id="question${questionIndex}_fullscreen-image">
    </div>
    <div id="question-answers">
        <div class="answer-container" id="triangle">
            <p class="answer" id="answer1">${localStorage.getItem(
				`question${questionIndex}_answer1`
			)}</p>
        </div>
        <div class="answer-container" id="rhombus">
            <p class="answer" id="answer2">${localStorage.getItem(
				`question${questionIndex}_answer2`
			)}</p>
        </div>
        <div class="answer-container" id="circle">
            <p class="answer" id="answer3">${localStorage.getItem(
				`question${questionIndex}_answer3`
			)}</p>
        </div>
        <div class="answer-container" id="square">
            <p class="answer" id="answer4">${localStorage.getItem(
				`question${questionIndex}_answer4`
			)}</p>
        </div>
    </div>
    <button id="settings-button">${settings}</button>
    <div id="settings-modal" class="modal">
        <div class="modal-content">
            <span id="close-settings-modal" class="close">&times;</span>
            <h2>${settings}</h2>
            <div id="settings-list">
                <div class="setting-item">
                    <label for="game-name">${game_name}</label>
                    <input type="text" id="game-name" value="${localStorage.getItem("gameName")}">
                </div>
                <div class="setting-item">
                    <label for="question-time">${question_time}</label>
                    <input type="number" id="question${questionIndex}-time" min="5" max="30" value="5" onkeyup="questionTimeSliderChanger(this.value, ${questionIndex})"/> 
                    <input type="range" id="question${questionIndex}-time-slider" min="5" max="30" value="5" step="1" oninput="questionTimeInputChanger(this.value, ${questionIndex})" />
                </div>
                <div class="setting-item">
                    <label for="answer-time">${answer_time}</label>
                    <input type="number" id="question${questionIndex}-answer-time" min="20" max="120" value="30" onkeyup="answerTimeSliderChanger(this.value, ${questionIndex})"/> 
                    <input type="range" id="question${questionIndex}-answer-time-slider" min="20" max="120" value="30" step="1" oninput="answerTimeInputChanger(this.value, ${questionIndex})" />
                </div>
                <div class="setting-item">
                    <label for="answer-count">${answer_count}</label>
                    <input type="number" id="question${questionIndex}-count" min="2" max="4" value="4" onkeyup="questionCountSliderChanger(this.value, ${questionIndex})"/> 
                    <input type="range" id="question${questionIndex}-count-slider" min="2" max="4" value="4" step="1" oninput="questionCountInputChanger(this.value, ${questionIndex})" />
                </div>
                <div class="setting-item">
                    <label for="answer-points">${answer_points}</label>
                    <input type="number" id="question${questionIndex}-answer-points" min="100" max="5000" value="1000" onkeyup="answerPointsSliderChanger(this.value, ${questionIndex})"/> 
                    <input type="range" id="question${questionIndex}-answer-points-slider" min="100" max="5000" value="1000" step="100" oninput="answerPointsInputChanger(this.value, ${questionIndex})" />
                </div>
                <div class="setting-item">
                    <button id="save-settings">${save_settings}</button>
                </div>
            </div>
        </div>
    </div>
`
	// Attach listeners to the new question elements
	document.getElementById("game-creation").appendChild(questionContainer)
	attachAnswerEventListeners(questionContainer)
	attachSettingsEventListeners(questionContainer)
	attachImageEventListeners(questionContainer)
}

// Logic for editing the question title
function editTextTitle(questionItem) {
	var currentTitle = questionItem.textContent
	var input = document.createElement("input")
	input.type = "text"
	input.value = currentTitle
	input.className = "edit-question-input"
	input.id = "edit-question-" + Date.now()
	input.name = "edit-question"
	questionItem.replaceWith(input)
	input.focus()
	input.select()

	var saveTitle = function () {
		if (input.parentNode) {
			saveTextTitle(input, questionItem)
		}
	}

	input.addEventListener("blur", saveTitle)
	input.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			input.removeEventListener("blur", saveTitle)
			saveTitle()
		}
	})
}

// Logic for saving the edited question title
function saveTextTitle(input, questionItem) {
	var newTitle = input.value
	questionItem.textContent = newTitle
	var questionContainer = questionItem.closest(".certain-question")
	if (questionContainer) {
		var questionTitle = questionContainer.querySelector("#selected-question-name")
		if (questionTitle) {
			questionTitle.textContent = newTitle
		}
	}
	if (input.parentNode) {
		input.replaceWith(questionItem)
	}
	attachEventListeners(questionItem)
	var questionIndex =
		Array.from(document.getElementById("question-list").children).indexOf(questionItem) + 1
	localStorage.setItem(`question${questionIndex}_questionName`, newTitle)

	// Update the DOM directly
	var selectedQuestionContainer = document.getElementById("selectedQuestion" + questionIndex)
	if (selectedQuestionContainer) {
		var selectedQuestionTitle =
			selectedQuestionContainer.querySelector("#selected-question-name")
		if (selectedQuestionTitle) {
			selectedQuestionTitle.textContent = newTitle
		}
	}
}

// Logic for selecting the question
function selectQuestion(questionItem) {
	console.log("selectQuestion called")
	var allQuestions = document.querySelectorAll(".certain-question")
	var questionIndex =
		Array.from(document.getElementById("question-list").children).indexOf(questionItem) + 1
	console.log("All questions:", allQuestions)
	allQuestions.forEach(function (question) {
		question.style.display = "none"
	})
	var selectedQuestionContainer = document.getElementById("selectedQuestion" + questionIndex)
	console.log("Selected question container:", selectedQuestionContainer)
	if (selectedQuestionContainer) {
		selectedQuestionContainer.style.display = "block"
	}
	var questionModal = document.getElementById("question-modal")
	if (questionModal) {
		questionModal.style.display = "none"
	}
}
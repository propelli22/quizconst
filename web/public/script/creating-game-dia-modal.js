var questionModal = document.getElementById("questionModal")
var questionModalButton = document.getElementById("open-question-modal")
var closeModal = document.getElementsByClassName("close")[0]
var addQuestionBtn = document.getElementById("add-question")
var questionList = document.getElementById("question-list")
var selectedQuestionName = document.getElementById("selected-question-name")

document.addEventListener("DOMContentLoaded", function () {
	attachEventListeners(document.querySelector(".question-item"))
})

questionModalButton.onclick = function () {
	questionModal.style.display = "block"
}

closeModal.onclick = function () {
	questionModal.style.display = "none"
}

window.onclick = function (event) {
	if (event.target == questionModal) {
		questionModal.style.display = "none"
	}
}

addQuestionBtn.onclick = function () {
	var newQuestion = document.createElement("div")
	newQuestion.className = "question-item"
	newQuestion.textContent = "Question " + (questionList.children.length + 1)
	questionList.appendChild(newQuestion)
	editQuestionTitle(newQuestion)
	attachEventListeners(newQuestion)
}

function attachEventListeners(element) {
	cdblclick(
		() => selectQuestion(element),
		() => editQuestionTitle(element),
		element
	)
	addLongPressListener(element)
}

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

function editQuestionTitle(questionItem) {
	var currentTitle = questionItem.textContent
	var input = document.createElement("input")
	input.type = "text"
	input.value = currentTitle
	input.className = "edit-question-input"
	questionItem.replaceWith(input)
	input.focus()
	input.select()
	var isReplaced = false
	var saveTitle = function () {
		if (!isReplaced && input.parentNode) {
			saveQuestionTitle(input, questionItem)
			isReplaced = true
		}
	}
	input.addEventListener("blur", saveTitle)
	input.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			saveTitle()
		}
	})
}

function saveQuestionTitle(input, questionItem) {
	var newTitle = input.value
	questionItem.textContent = newTitle
	if (input.parentNode) {
		input.replaceWith(questionItem)
	}
	attachEventListeners(questionItem)
}

function addLongPressListener(element) {
	var pressTimer
	element.addEventListener("touchstart", function (e) {
		pressTimer = setTimeout(function () {
			editQuestionTitle(element)
		}, 300)
	})
	element.addEventListener("touchend", function (e) {
		clearTimeout(pressTimer)
	})
	element.addEventListener("touchmove", function (e) {
		clearTimeout(pressTimer)
	})
}

function selectQuestion(questionItem) {
	selectedQuestionName.textContent = questionItem.textContent
	questionModal.style.display = "none"
}
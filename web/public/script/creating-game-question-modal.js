var questionModalButton = document.getElementById("open-question-modal")
var questionModal = document.getElementById("question-modal")
var closeModal = document.getElementById("close-question-modal")
var addQuestionBtn = document.getElementById("add-question")
var questionList = document.getElementById("question-list")
var selectedQuestionName = document.getElementById("selected-question-name")

document.addEventListener("DOMContentLoaded", function () {
	attachEventListeners(document.querySelector(".question-item"))
})

addQuestionBtn.onclick = function () {
	var newQuestion = document.createElement("div")
	newQuestion.className = "question-item"
	newQuestion.textContent = "Question " + (questionList.children.length + 1)
	questionList.appendChild(newQuestion)
	editTextTitle(newQuestion)
	attachEventListeners(newQuestion)
}

function attachEventListeners(element) {
	cdblclick(
		() => selectQuestion(element),
		() => editTextTitle(element),
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

function saveTextTitle(input, questionItem) {
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
			editTextTitle(element)
		}, 300)
		e.preventDefault()
	})
	element.addEventListener("touchend", function (e) {
		clearTimeout(pressTimer)
		e.preventDefault()
	})
	element.addEventListener("touchmove", function (e) {
		clearTimeout(pressTimer)
		e.preventDefault()
	})
}

function selectQuestion(questionItem) {
	// TODO: Implement this function
}

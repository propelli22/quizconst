var selectedQuestionName = document.getElementById("selected-question-name")

document.addEventListener("DOMContentLoaded", function () {
	editTextTitle(selectedQuestionName)

	var answerItems = document.querySelectorAll(".answer-container")
	answerItems.forEach(function (answerItem) {
		addLongPressListener(answerItem)
	})
})

function attachEventListeners(element) {
	element.addEventListener("dblclick", function () {
		editTextTitle(element)
	})
	addLongPressListener(element)
}

function editTextTitle(container) {
	var questionItem = container.querySelector("p") || container
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
			saveTextTitle(input, questionItem, container)
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

function saveTextTitle(input, questionItem, container) {
	var newTitle = input.value
	questionItem.textContent = newTitle
	if (input.parentNode) {
		input.replaceWith(questionItem)
	}
	attachEventListeners(container)
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
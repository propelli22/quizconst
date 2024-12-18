document.addEventListener("DOMContentLoaded", function () {
	// Attach event listeners to the first question when the page loads
	var selectedQuestionName = document.getElementById("selected-question-name")
	if (selectedQuestionName) {
		editTextTitle(selectedQuestionName)
	}
	var answerItems = document.querySelectorAll(".answer")
	answerItems.forEach(function (answerItem) {
		attachEventListeners(answerItem)
	})
})

export function attachAnswerEventListeners(questionContainer) {
	var questionName = questionContainer.querySelector("#selected-question-name")
	if (questionName) {
		attachEventListeners(questionName)
	}
	var answerItems = questionContainer.querySelectorAll(".answer")
	answerItems.forEach(function (answerItem) {
		attachEventListeners(answerItem)
	})
}

function attachEventListeners(element) {
	element.addEventListener("dblclick", function () {
		editTextTitle(element)
	})
	addLongPressListener(element)
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

	var questionContainer = questionItem.closest(".certain-question")
	var questionIndex = null
	if (questionContainer) {
		var idMatch = questionContainer.id.match(/selectedQuestion(\d+)/)
		if (idMatch) {
			questionIndex = parseInt(idMatch[1], 10)
		}
	}

	if (questionIndex !== null) {
		if (questionItem.id === "answer1") {
			localStorage.setItem(`question${questionIndex}_answer1`, newTitle)
		} else if (questionItem.id === "answer2") {
			localStorage.setItem(`question${questionIndex}_answer2`, newTitle)
		} else if (questionItem.id === "answer3") {
			localStorage.setItem(`question${questionIndex}_answer3`, newTitle)
		} else if (questionItem.id === "answer4") {
			localStorage.setItem(`question${questionIndex}_answer4`, newTitle)
		} else if (questionItem.id === "selected-question-name") {
			localStorage.setItem(`question${questionIndex}_questionName`, newTitle)

			var questionModalItem = document.querySelector(`#question-list .question-item:nth-child(${questionIndex})`)
			if (questionModalItem) {
				questionModalItem.textContent = newTitle
			}
		}
	}
}

function addLongPressListener(element) {
	var pressTimer
	var longPressTriggered = false

	element.addEventListener("touchstart", function (e) {
		longPressTriggered = false
		pressTimer = setTimeout(function () {
			editTextTitle(element)
			longPressTriggered = true
		}, 300)
		if (e.cancelable) {
			e.preventDefault()
		}
	})

	element.addEventListener("touchend", function (e) {
		clearTimeout(pressTimer)
		if (e.cancelable) {
			e.preventDefault()
		}
	})

	element.addEventListener("touchmove", function (e) {
		clearTimeout(pressTimer)
		if (e.cancelable) {
			e.preventDefault()
		}
	})

	element.addEventListener("mousedown", function (e) {
		longPressTriggered = false
		pressTimer = setTimeout(function () {
			editTextTitle(element)
			longPressTriggered = true
		}, 300)
		if (e.cancelable) {
			e.preventDefault()
		}
	})

	element.addEventListener("mouseup", function (e) {
		clearTimeout(pressTimer)
		if (!longPressTriggered) {
			selectQuestion(element)
		}
		if (e.cancelable) {
			e.preventDefault()
		}
	})

	element.addEventListener("mousemove", function (e) {
		clearTimeout(pressTimer)
		if (e.cancelable) {
			e.preventDefault()
		}
	})
}
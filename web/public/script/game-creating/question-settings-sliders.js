// Function to update the value of an element with the given ID
function updateElementValue(elementId, val) {
	const element = document.getElementById(elementId)
	if (element) {
		// Set the element's value to the given value, or 0 if the value is not a number
		element.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

// Function to update the value of the time slider and input field
function questionTimeSliderChanger(val, questionIndex) {
	updateElementValue(`question${questionIndex}-time-slider`, val)
}

function questionTimeInputChanger(val, questionIndex) {
	updateElementValue(`question${questionIndex}-time`, val)
}

function answerTimeSliderChanger(val, questionIndex) {
	updateElementValue(`question${questionIndex}-answer-time-slider`, val)
}

function answerTimeInputChanger(val, questionIndex) {
	updateElementValue(`question${questionIndex}-answer-time`, val)
}

function questionCountSliderChanger(val, questionIndex) {
	updateElementValue(`question${questionIndex}-count-slider`, val)
}

function questionCountInputChanger(val, questionIndex) {
	updateElementValue(`question${questionIndex}-count`, val)
}

function answerPointsSliderChanger(val, questionIndex) {
	updateElementValue(`question${questionIndex}-answer-points-slider`, val)
}

function answerPointsInputChanger(val, questionIndex) {
	updateElementValue(`question${questionIndex}-answer-points`, val)
}
function questionTimeSliderChanger(val) {
	var questionTimeSlider = document.getElementById("question-time-slider")
	if (questionTimeSlider) {
		questionTimeSlider.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function questionTimeInputChanger(val) {
	var questionTime = document.getElementById("question-time")
	if (questionTime) {
		questionTime.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function answerTimeSliderChanger(val) {
	var answerTimeSlider = document.getElementById("answer-time-slider")
	if (answerTimeSlider) {
		answerTimeSlider.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function answerTimeInputChanger(val) {
	var answerTime = document.getElementById("answer-time")
	if (answerTime) {
		answerTime.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function questionCountSliderChanger(val) {
	var questionCountSlider = document.getElementById("question-count-slider")
	if (questionCountSlider) {
		questionCountSlider.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function questionCountInputChanger(val) {
	var questionCount = document.getElementById("question-count")
	if (questionCount) {
		questionCount.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function answerPointsSliderChanger(val) {
	var answerPointsSlider = document.getElementById("answer-points-slider")
	if (answerPointsSlider) {
		answerPointsSlider.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function answerPointsInputChanger(val) {
	var answerPoints = document.getElementById("answer-points")
	if (answerPoints) {
		answerPoints.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}
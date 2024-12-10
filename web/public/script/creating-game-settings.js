function questionTimeSliderChanger(val, questionIndex) {
	var questionTimeSlider = document.getElementById(`question${questionIndex}-time-slider`)
	if (questionTimeSlider) {
		questionTimeSlider.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function questionTimeInputChanger(val, questionIndex) {
	var questionTime = document.getElementById(`question${questionIndex}-time`)
	if (questionTime) {
		questionTime.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function answerTimeSliderChanger(val, questionIndex) {
	var answerTimeSlider = document.getElementById(`question${questionIndex}-answer-time-slider`)
	if (answerTimeSlider) {
		answerTimeSlider.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function answerTimeInputChanger(val, questionIndex) {
	var answerTime = document.getElementById(`question${questionIndex}-answer-time`)
	if (answerTime) {
		answerTime.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function questionCountSliderChanger(val, questionIndex) {
	var questionCountSlider = document.getElementById(`question${questionIndex}-count-slider`)
	if (questionCountSlider) {
		questionCountSlider.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function questionCountInputChanger(val, questionIndex) {
	var questionCount = document.getElementById(`question${questionIndex}-count`)
	if (questionCount) {
		questionCount.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function answerPointsSliderChanger(val, questionIndex) {
	var answerPointsSlider = document.getElementById(`question${questionIndex}-answer-points-slider`)
	if (answerPointsSlider) {
		answerPointsSlider.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}

function answerPointsInputChanger(val, questionIndex) {
	var answerPoints = document.getElementById(`question${questionIndex}-answer-points`)
	if (answerPoints) {
		answerPoints.value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
	}
}
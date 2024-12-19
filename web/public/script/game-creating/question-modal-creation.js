import { LocalStorageShiftIndexes, removeLastIndexFromLocalStorage, setLocalStrogeForNewQuestion } from "./LocalStorage-logic.js"
import { attachQuestionNameEventListeners, attachAnswerEventListeners } from "./question-edit-page.js"
import { attachSettingsEventListeners, presetFor2answers, presetFor3answers, presetFor4answers } from "./question-settings-modal.js"
import { attachImageEventListeners } from "./question-image-upload.js"

document.addEventListener("DOMContentLoaded", function () {
	// Logic for the first question when the page loads
	localStorage.setItem("gameName", `${game_name}`)
	setLocalStrogeForNewQuestion(1)
	createQuestionElements(1)
	attachQuestionNameEventListeners(document.querySelector(".certain-question"))
	attachAnswerEventListeners(document.querySelector(".certain-question"))
	attachSettingsEventListeners(document.getElementById(`selectedQuestion${1}`))
	attachImageEventListeners(document.getElementById(`selectedQuestion${1}`))

	var firstQuestionContainer = document.getElementById("selectedQuestion1")
	firstQuestionContainer.style.display = "block" // Display the first question container

	var firstQuestion = document.getElementById("question1")
	attachEventListeners(firstQuestion)
})

// Resize the question modal based on the window width
window.addEventListener("resize", function () {
	if (window.innerWidth > 1024) {
		questionModal.style.display = "block"
	} else {
		questionModal.style.display = "none"
	}
})

// Logic to open and close question modal
var questionButton = document.getElementById("open-question-modal")
var questionModal = document.getElementById("question-modal")
var closeQuestionModal = document.getElementById("close-question-modal")

if (questionButton) {
	questionButton.onclick = function () {
		questionModal.style.display = "block"
	}
}
if (closeQuestionModal) {
	closeQuestionModal.onclick = function () {
		if (window.innerWidth <= 1024) {
			questionModal.style.display = "none"
		}
	}
}

// Function to attach event listeners
function attachEventListeners(element) {
	addLongPressListener(element) // Long press to edit the answer text
	element.addEventListener("click", () => {
		selectQuestion(element) // Select the question
	})
	element.addEventListener("touchend", () => {
		// Touchend event for mobile devices
		selectQuestion(element)
	})
}

// Function to add long press event listener to an element
function addLongPressListener(element) {
	let pressTimer

	// Start and clear the press timer on touch/mouse events
	function startPressTimer(e) {
		pressTimer = setTimeout(() => editTextTitle(element), 300)
		if (e.cancelable) e.preventDefault() // Prevent the default action
	}

	function clearPressTimer(e) {
		clearTimeout(pressTimer)
		if (e.cancelable) e.preventDefault()
	}

	element.addEventListener("touchstart", startPressTimer)
	element.addEventListener("touchend", clearPressTimer)
	element.addEventListener("touchmove", clearPressTimer)
	element.addEventListener("mousedown", startPressTimer)
	element.addEventListener("mouseup", clearPressTimer)
	element.addEventListener("mousemove", clearPressTimer)
}

// Logic for creating the question elements
function createQuestionElements(questionIndex) {
	var questionContainer = document.createElement("div")
	questionContainer.className = "certain-question"
	questionContainer.id = "selectedQuestion" + questionIndex
	questionContainer.style.display = "none"

	// HTML content for the each new question container
	questionContainer.innerHTML = `
        <div class="question-title" id="question-title">
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
            <img class="uploaded-image" id="question${questionIndex}_uploaded-image"/>
        </div>
        <div id="question${questionIndex}_image-modal" class="modal" style="display: none;">
            <span class="close" id="question${questionIndex}_close-image-modal">&times;</span>
            <img class="image-modal-content" id="question${questionIndex}_fullscreen-image">
        </div>
        <div id="question-answers">
            <div class="answer-container wrong" id="answer-container1">
                <p class="answer" id="answer1">${localStorage.getItem(
					`question${questionIndex}_answer1`
				)}</p>
            </div>
            <div class="answer-container wrong" id="answer-container2">
                <p class="answer" id="answer2">${localStorage.getItem(
					`question${questionIndex}_answer2`
				)}</p>
            </div>
            <div class="answer-container wrong" id="answer-container3">
                <p class="answer" id="answer3">${localStorage.getItem(
					`question${questionIndex}_answer3`
				)}</p>
            </div>
            <div class="answer-container wrong" id="answer-container4">
                <p class="answer" id="answer4">${localStorage.getItem(
					`question${questionIndex}_answer4`
				)}</p>
            </div>
        </div>
        <button id="settings-button">${question_settings}</button>
        <div id="settings-modal" class="modal">
            <div class="modal-content">
                <span id="close-settings-modal" class="close">&times;</span>
                <h2>${question_settings}</h2>
                <div id="settings-list">
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
        <button id="save-game-button">${save_game}</button>
    `

	// Attach listeners to the new question elements
	document.getElementById("main-container").appendChild(questionContainer)
	attachAnswerEventListeners(questionContainer)
	attachSettingsEventListeners(questionContainer)
	attachImageEventListeners(questionContainer)
}

// Add delete button to each question item
export function addDeleteButton(questionItem) {
    const deleteButton = document.createElement("span");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "×";
    deleteButton.onclick = function () {
        const questionList = document.getElementById("question-list").children;
        const questionIndex = Array.from(questionList).indexOf(questionItem) + 1;

        // Remove the question item from the DOM
        questionItem.remove();

		// Shift local storage entries down by one index
		LocalStorageShiftIndexes(questionIndex, questionList);

        // Remove the last question's local storage entries
        removeLastIndexFromLocalStorage(questionList)

        // Update the DOM to reflect the new question indices and content
        for (let i = questionIndex - 1; i < questionList.length; i++) {
            const questionItem = questionList[i];
            const questionIndex = i + 1;

            // Update question ID and text content
            questionItem.id = `question${questionIndex}`;
            questionItem.textContent = `${localStorage.g+etItem(
                `question${questionIndex}_questionName`
            )}`;

            // Re-attach the delete button
            addDeleteButton(questionItem);

            // Update question elements
            const questionContainer = document.getElementById(`selectedQuestion${questionIndex}`);
            if (questionContainer) {
                const questionTitle = questionContainer.querySelector("#selected-question-name");
                if (questionTitle) {
                    questionTitle.textContent = localStorage.getItem(
                        `question${questionIndex}_questionName`
                    );
                }

                // Update answers
                for (let j = 1; j <= 4; j++) {
                    const answer = questionContainer.querySelector(`#answer${j}`);
                    if (answer) {
                        answer.textContent = localStorage.getItem(
                            `question${questionIndex}_answer${j}`
                        );
                        const correctAnswer = localStorage.getItem(
                            `question${questionIndex}_correctAnswer${j}`
                        );
                        if (correctAnswer === "1") {
                            answer.classList.add("right");
                            answer.classList.remove("wrong");
                        } else {
                            answer.classList.add("wrong");
                            answer.classList.remove("right");
                        }
                    }
                }

                // Update presets for answers
                const count = localStorage.getItem(`question${questionIndex}_settingsQuestionCount`);
                switch (parseInt(count, 10)) {
                    case 2:
                        presetFor2answers(questionContainer);
                        break;
                    case 3:
                        presetFor3answers(questionContainer);
                        break;
                    case 4:
                    default:
                        presetFor4answers(questionContainer);
                        break;
                }

                // Update settings
                const settingsAnswerPoints = questionContainer.querySelector(
                    `#question${questionIndex}-answer-points`
                );
                if (settingsAnswerPoints) {
                    settingsAnswerPoints.value = localStorage.getItem(
                        `question${questionIndex}_settingsAnswerPoints`
                    );
                }
                const settingsAnswerTime = questionContainer.querySelector(
                    `#question${questionIndex}-answer-time`
                );
                if (settingsAnswerTime) {
                    settingsAnswerTime.value = localStorage.getItem(
                        `question${questionIndex}_settingsAnswerTime`
                    );
                }
                const settingsQuestionTime = questionContainer.querySelector(
                    `#question${questionIndex}-time`
                );
                if (settingsQuestionTime) {
                    settingsQuestionTime.value = localStorage.getItem(
                        `question${questionIndex}_settingsQuestionTime`
                    );
                }
                const settingsQuestionCount = questionContainer.querySelector(
                    `#question${questionIndex}-count`
                );
                if (settingsQuestionCount) {
                    settingsQuestionCount.value = localStorage.getItem(
                        `question${questionIndex}_settingsQuestionCount`
                    );
                }

                // Update image and image name container
                const uploadedImage = questionContainer.querySelector(
                    `#question${questionIndex}_uploaded-image`
                );
                const imageNameContainer = questionContainer.querySelector(
                    `#question${questionIndex}_image-name-container`
                );
                if (uploadedImage && imageNameContainer) {
                    const imageUrl = localStorage.getItem(`question${questionIndex}_uploadedImage`);
                    const imageName = localStorage.getItem(
                        `question${questionIndex}_uploadedImageName`
                    );
                    if (imageUrl != null && imageName != null && imageUrl && imageName) {
                        uploadedImage.src = imageUrl;
                        uploadedImage.style.display = "none"; // Hide the image initially
                        imageNameContainer.querySelector(
                            `#question${questionIndex}_image-name`
                        ).textContent = imageName;
                        imageNameContainer.style.display = "block";
                        imageNameContainer.onclick = function () {
                            uploadedImage.style.display = "block"; // Show the image when the container is clicked
                        };
                    } else {
                        uploadedImage.src = ""; // Clear the image source
                        uploadedImage.style.display = "none";
                        imageNameContainer.style.display = "none";
                    }
                }
            }
        }
    };
    questionItem.appendChild(deleteButton);
}

// Logic for adding new question
var addQuestionBtn = document.getElementById("add-question");
var questionList = document.getElementById("question-list");

addQuestionBtn.onclick = function () {
    var newQuestion = document.createElement("div"); // Create a new question item
    newQuestion.className = "question-item";
    newQuestion.id = "question" + (questionList.children.length + 1);
    newQuestion.textContent = `${question} ${questionList.children.length + 1}`;
    questionList.appendChild(newQuestion); // Append the new question item to the question list
    attachEventListeners(newQuestion);
    editTextTitle(newQuestion);
    setLocalStrogeForNewQuestion(questionList.children.length);
    createQuestionElements(questionList.children.length);
}

// Add delete buttons to existing questions
document.querySelectorAll(".question-item").forEach(addDeleteButton);

// Logic for editing the question title
function editTextTitle(questionItem) {
    var currentTitle = questionItem.textContent; // Get the current question title
    var input = document.createElement("input");
    input.type = "text";
    input.value = currentTitle;
    input.className = "edit-question-input";
	input.name = "edit-question";
	input.maxLength = 100; // Set the maxlength attribute to 100 characters
	questionItem.replaceWith(input) // Replace the question item with the input element
	
	var deleteButton = questionItem.querySelector(".delete-button")
	if (currentTitle.endsWith("×") && deleteButton) {
		input.value = currentTitle.slice(0, -1) // Remove the last character from the input value
		deleteButton.remove()
	}

    input.focus();
	input.select();

    var saveTitle = function () { // Save the edited question title
        if (input.parentNode) {
            saveTextTitle(input, questionItem);
        }
    }

    input.addEventListener("blur", saveTitle); // Save the edited question title on blur
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            input.removeEventListener("blur", saveTitle); // Remove the blur event listener
            saveTitle(); // Save the edited question title
        }
    });
}

// Logic for saving the edited question title
function saveTextTitle(input, questionItem) {
    var newTitle = input.value;
    questionItem.textContent = newTitle;
    var questionContainer = questionItem.closest(".certain-question");
    if (questionContainer) {
        var questionTitle = questionContainer.querySelector("#selected-question-name");
        if (questionTitle) {
            questionTitle.textContent = newTitle; // Update the question title in the question container
        }
    }
    if (input.parentNode) {
        input.replaceWith(questionItem); // Replace the input element with the question item
    }
    attachEventListeners(questionItem);
    // Save the edited question title to local storage
    var questionIndex =
        Array.from(document.getElementById("question-list").children).indexOf(questionItem) + 1;
    localStorage.setItem(`question${questionIndex}_questionName`, newTitle);

    addDeleteButton(questionItem); // Add delete button to the new question item

    // Update the DOM directly
    var selectedQuestionContainer = document.getElementById("selectedQuestion" + questionIndex);
    if (selectedQuestionContainer) {
        var selectedQuestionTitle =
            selectedQuestionContainer.querySelector("#selected-question-name");
        if (selectedQuestionTitle) {
            selectedQuestionTitle.textContent = newTitle;
        }

        // Check if image and image name exist in local storage
        const imageUrl = localStorage.getItem(`question${questionIndex}_uploadedImage`);
        const imageName = localStorage.getItem(`question${questionIndex}_uploadedImageName`);
        const uploadedImage = selectedQuestionContainer.querySelector(
            `#question${questionIndex}_uploaded-image`
        );
        const imageNameContainer = selectedQuestionContainer.querySelector(
            `#question${questionIndex}_image-name-container`
        );
        const imageUploadButton = selectedQuestionContainer.querySelector(
            `#question${questionIndex}_custom-file-upload`
        );

        if (imageUrl && imageName) {
            // Update image and image name container
            if (uploadedImage) {
                uploadedImage.src = imageUrl;
                uploadedImage.style.display = "none"; // Hide the image initially
            }
            if (imageNameContainer) {
                imageNameContainer.querySelector(
                    `#question${questionIndex}_image-name`
                ).textContent = imageName;
                imageNameContainer.style.display = "block";
                imageNameContainer.onclick = function () {
                    uploadedImage.style.display = "block"; // Show the image when the container is clicked
                };
            }
        } else {
            // Hide image and image name container if they do not exist in local storage
            if (uploadedImage) {
                uploadedImage.style.display = "none";
            }
            if (imageNameContainer) {
                imageNameContainer.style.display = "none";
            }
        }

        // Ensure the image upload button is always present
        if (imageUploadButton) {
            imageUploadButton.style.display = "block";
        }
    }
}

// Logic for selecting the question
function selectQuestion(questionItem) {
	var allQuestions = document.querySelectorAll(".certain-question")
	var questionNotSelectedText = document.getElementById("question-not-selected")

	// Get the index of the selected question
	var questionIndex =
		Array.from(document.getElementById("question-list").children).indexOf(questionItem) + 1
	allQuestions.forEach(function (question) {
		question.style.display = "none"
	})

	// Display the selected question container
	var selectedQuestionContainer = document.getElementById("selectedQuestion" + questionIndex)
	if (selectedQuestionContainer) {
		selectedQuestionContainer.style.display = "block"
		questionNotSelectedText.style.display = "none" // Hide the "question not selected" text
	} else {
		questionNotSelectedText.style.display = "block" // Show the "question not selected" text
	}

	// Hide other question modals
	var questionModal = document.getElementById("question-modal")
	if (questionModal && window.innerWidth <= 1024) {
		questionModal.style.display = "none"
	}
}
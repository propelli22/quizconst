// Function to attach image event listeners to the question container
export function attachImageEventListeners(questionContainer) {
	const questionIndex = questionContainer?.id.match(/selectedQuestion(\d+)/)?.[1]

	// Elements related to image upload and display
	const elements = {
		imageUploader: questionContainer.querySelector(`#question${questionIndex}_file-upload`),
		imageNameContainer: questionContainer.querySelector(
			`#question${questionIndex}_image-name-container`
		),
		closeImageModal: questionContainer.querySelector(
			`#question${questionIndex}_close-image-modal`
		),
		closeImageNameContainer: questionContainer.querySelector(
			`#question${questionIndex}_close-image-name-container`
		),
	}

	// Attach event listeners to the elements
	Object.keys(elements).forEach((key) => {
		if (elements[key]) {
			attachEvent(elements[key], key, questionIndex)
		}
	})
}

// Function to attach the appropriate event based on the element type
function attachEvent(element, type, questionIndex) {
	const eventHandlers = {
		imageUploader: attachImageUploaderEvent,
		imageNameContainer: attachImageNameContainerEvent,
		closeImageModal: attachCloseImageModalEvent,
		closeImageNameContainer: attachCloseImageNameContainerEvent,
	}

	eventHandlers[type](element, questionIndex)
}

// Event handler for image uploader
function attachImageUploaderEvent(element, questionIndex) {
	element.addEventListener("change", function (event) {
		const file = event.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = function (e) {
				// Store the uploaded image and its name in localStorage
				localStorage.setItem(`question${questionIndex}_uploadedImage`, e.target.result)
				localStorage.setItem(`question${questionIndex}_uploadedImageName`, file.name)

				// Update the fullscreen image source
				const fullscreenImage = document.getElementById(
					`question${questionIndex}_fullscreen-image`
				)
				fullscreenImage.src = e.target.result

				// Display the image name and hide the upload label
				const imageNameContainer = document.getElementById(
					`question${questionIndex}_image-name-container`
				)
				const imageName = document.getElementById(`question${questionIndex}_image-name`)
				if (imageName) {
					imageName.textContent = file.name
					imageNameContainer.style.display = "inline-block"
				}

				const uploadLabel = document.getElementById(
					`question${questionIndex}_custom-file-upload`
				)
				uploadLabel.style.display = "none"
			}
			reader.readAsDataURL(file)
		}
	})
}

// Event handler for image name container click
function attachImageNameContainerEvent(element, questionIndex) {
	element.addEventListener("click", function () {
		const modal = document.getElementById(`question${questionIndex}_image-modal`)
		modal.style.display = "block"
	})
}

// Event handler for closing the image modal
function attachCloseImageModalEvent(element, questionIndex) {
	element.addEventListener("click", function () {
		const modal = document.getElementById(`question${questionIndex}_image-modal`)
		modal.style.display = "none"
	})
}

// Event handler for closing the image name container
function attachCloseImageNameContainerEvent(element, questionIndex) {
	element.addEventListener("click", function (event) {
		event.stopPropagation()

		// Hide the image name container and clear the image name
		const imageNameContainer = document.getElementById(
			`question${questionIndex}_image-name-container`
		)
		imageNameContainer.style.display = "none"

		const imageName = document.getElementById(`question${questionIndex}_image-name`)
		if (imageName) {
			imageName.textContent = ""
		}

		// Show the upload label and clear the file input and fullscreen image
		const uploadLabel = document.getElementById(`question${questionIndex}_custom-file-upload`)
		uploadLabel.style.display = "inline-block"

		const fileInput = document.getElementById(`question${questionIndex}_file-upload`)
		fileInput.value = ""

		const fullscreenImage = document.getElementById(`question${questionIndex}_fullscreen-image`)
		fullscreenImage.src = ""

		// Remove the image and its name from localStorage
		localStorage.removeItem(`question${questionIndex}_uploadedImage`)
		localStorage.removeItem(`question${questionIndex}_uploadedImageName`)
	})
}
export function attachImageEventListeners(questionContainer) {
	var questionIndex = questionContainer?.id.match(/selectedQuestion(\d+)/)?.[1]

	// Figure out each part of image modal logic and attach cetain functions to each part
	var imageUploader = questionContainer.querySelector(`#question${questionIndex}_file-upload`)
	if (imageUploader) {
		attachImageUploaderEvent(imageUploader, questionIndex)
	}

	var imageNameContainer = questionContainer.querySelector(
		`#question${questionIndex}_image-name-container`
	)
	if (imageNameContainer) {
		attachImageNameContainerEvent(imageNameContainer, questionIndex)
	}

	var closeImageModal = questionContainer.querySelector(
		`#question${questionIndex}_close-image-modal`
	)
	if (closeImageModal) {
		attachCloseImageModalEvent(closeImageModal, questionIndex)
	}

	var closeImageNameContainer = questionContainer.querySelector(
		`#question${questionIndex}_close-image-name-container`
	)
	if (closeImageNameContainer) {
		attachCloseImageNameContainerEvent(closeImageNameContainer, questionIndex)
	}
}

function attachImageUploaderEvent(element, questionIndex) {
	element.addEventListener("change", function (event) {
		var file = event.target.files[0]
		if (file) {
			var reader = new FileReader()
			reader.onload = function (e) {
				localStorage.setItem(`question${questionIndex}_uploadedImage`, e.target.result)
				var fullscreenImage = document.getElementById(
					`question${questionIndex}_fullscreen-image`
				)
				fullscreenImage.src = e.target.result
				var imageNameContainer = document.getElementById(
					`question${questionIndex}_image-name-container`
				)
				var imageName = document.getElementById(`question${questionIndex}_image-name`)
				if (imageName) {
					imageName.textContent = file.name
					imageNameContainer.style.display = "inline-block"
				}
				var uploadLabel = document.getElementById(
					`question${questionIndex}_custom-file-upload`
				)
				uploadLabel.style.display = "none"
			}
			reader.readAsDataURL(file)
		}
	})
}

function attachImageNameContainerEvent(element, questionIndex) {
	element.addEventListener("click", function () {
		var modal = document.getElementById(`question${questionIndex}_image-modal`)
		modal.style.display = "block"
	})
}

function attachCloseImageModalEvent(element, questionIndex) {
	element.addEventListener("click", function () {
		var modal = document.getElementById(`question${questionIndex}_image-modal`)
		modal.style.display = "none"
	})
}

function attachCloseImageNameContainerEvent(element, questionIndex) {
	element.addEventListener("click", function (event) {
		event.stopPropagation()
		var imageNameContainer = document.getElementById(
			`question${questionIndex}_image-name-container`
		)
		imageNameContainer.style.display = "none"
		var imageName = document.getElementById(`question${questionIndex}_image-name`)
		if (imageName) {
			imageName.textContent = ""
		}

		var uploadLabel = document.getElementById(`question${questionIndex}_custom-file-upload`)
		uploadLabel.style.display = "inline-block"

		var fileInput = document.getElementById(`question${questionIndex}_file-upload`)
		fileInput.value = ""

		var fullscreenImage = document.getElementById(`question${questionIndex}_fullscreen-image`)
		fullscreenImage.src = ""
	})
}
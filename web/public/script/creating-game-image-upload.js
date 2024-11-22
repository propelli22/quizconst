document.getElementById("file-upload").addEventListener("change", function (event) {
	var file = event.target.files[0]
	if (file) {
		var reader = new FileReader()
		reader.onload = function (e) {
			var img = document.getElementById("uploaded-image")
			img.src = e.target.result
			img.style.display = "none"

			var imageNameContainer = document.getElementById("image-name-container")
			var imageName = document.getElementById("image-name")
			if (imageName) {
				imageName.textContent = file.name
				imageNameContainer.style.display = "inline-block"
			}

			var uploadLabel = document.getElementById("custom-file-upload")
			uploadLabel.style.display = "none"
		}
		reader.readAsDataURL(file)
	}
})

document.getElementById("image-name-container").addEventListener("click", function () {
	var img = document.getElementById("uploaded-image")
	var modal = document.getElementById("image-modal")
	var fullscreenImage = document.getElementById("fullscreen-image")

	fullscreenImage.src = img.src
	modal.style.display = "block"
})

document.getElementById("close-image-modal").addEventListener("click", function () {
	var modal = document.getElementById("image-modal")
	modal.style.display = "none"
})

document.getElementById("close-image-name-container").addEventListener("click", function (event) {
	event.stopPropagation()
	var imageNameContainer = document.getElementById("image-name-container")
	imageNameContainer.style.display = "none"
	var imageName = document.getElementById("image-name")
	if (imageName) {
		imageName.textContent = ""
	}

	var uploadLabel = document.getElementById("custom-file-upload")
	uploadLabel.style.display = "inline-block"

	var fileInput = document.getElementById("file-upload")
	fileInput.value = ""

	var img = document.getElementById("uploaded-image")
	img.src = ""
	img.style.display = "none"
})
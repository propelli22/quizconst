const settingsButton = document.getElementById("game-settings-button")
const settingsModal = document.getElementById("game-settings-modal")
const uploadedImage = document.getElementById("uploaded-image")
const imagePreview = document.getElementById("fullscreen-image")
const gameImageName = document.getElementById("image-name")
const gameImageNameContainer = document.getElementById("image-name-container")
const gameImageUploadLabel = document.getElementById("custom-file-upload")
const gameNameInput = document.getElementById("game-name-input")
const charCountName = document.getElementById("char-count-name")
const gameDescriptionInput = document.getElementById("game-description-input")
const charCountDescription = document.getElementById("char-count-description")
const closeSettingsModal = document.getElementById("close-game-settings-modal")
const gameImageInput = document.getElementById("file-upload")
const imageModal = document.getElementById("image-modal")
const closeImageModal = document.getElementById("close-image-modal")
const closeGameImageNameContainer = document.getElementById("close-image-name-container")
const saveGameSettingsButton = document.getElementById("save-game-settings")

let tempImageData = null // Temporary storage for image data
let tempImageName = null // Temporary storage for image name

// Function to update the character count of the input field
function updateCharCount(input, charCountElement, maxLength) {
	const remaining = maxLength - input.value.length // Calculate remaining characters
	charCountElement.textContent = remaining // Update the character count
	charCountElement.style.color = remaining <= 0 ? "red" : "#555" // Change color to red if the limit is exceeded
}

// Function to load the stored image from local storage
function loadStoredImage() {
	const storedGameImage = localStorage.getItem("gameImage")
	if (storedGameImage) {
		uploadedImage.src = storedGameImage // Set the uploaded image
		imagePreview.src = storedGameImage // Set the image preview
		gameImageName.textContent = localStorage.getItem("gameImageName") // Set the image name
		gameImageNameContainer.style.display = "inline-block" // Display the image name container
		gameImageUploadLabel.style.display = "none" // Hide the upload label
	}
}

// Function to handle image upload
function handleImageUpload(event) {
	const file = event.target.files[0] // Get the uploaded file
	if (file) {
		const reader = new FileReader() // Create a new file reader
		reader.onload = (e) => {
			// When the file is loaded
			tempImageData = e.target.result // Store the image data temporarily
			tempImageName = file.name // Store the image name temporarily
			imagePreview.src = e.target.result
			gameImageName.textContent = file.name
			gameImageNameContainer.style.display = "inline-block"
			gameImageUploadLabel.style.display = "none"
			uploadedImage.src = e.target.result
		}
		reader.readAsDataURL(file) // Read the file as a data URL
	}
}

// Function to save the game settings
function saveGameSettings() {
	if (gameNameInput.value.length !== 0) {
		// If the game name is not empty
		localStorage.setItem("gameName", gameNameInput.value) // Save the game name to local storage
		document.getElementById("game-name").textContent = gameNameInput.value // Update the game name in the game settigns directly
	}

	if (gameDescriptionInput.value.length !== 0) {
		localStorage.setItem("gameDescription", gameDescriptionInput.value)
	}

	if (tempImageData && tempImageName) {
		// If there is a new image to save
		localStorage.setItem("gameImage", tempImageData)
		localStorage.setItem("gameImageName", tempImageName)
	} else if (!gameImageInput.files[0]) {
		// If no image is uploaded
		localStorage.removeItem("gameImage")
		localStorage.removeItem("gameImageName")
	}

	settingsModal.style.display = "none"
}

function initializeModal() {
	settingsModal.style.display = "block"
	updateCharCount(gameNameInput, charCountName, 80)
	updateCharCount(gameDescriptionInput, charCountDescription, 60)
	loadStoredImage()
}

settingsButton.addEventListener("click", initializeModal) // Open the modal when the settings button is clicked
document.addEventListener("DOMContentLoaded", initializeModal) // Open the modal when the page loads

gameNameInput.addEventListener("input", () => {
	if (gameNameInput.value.length > 80) {
		gameNameInput.value = gameNameInput.value.substring(0, 80) // Limit the input to 80 characters
	}
	updateCharCount(gameNameInput, charCountName, 80) // Update the character count
})

gameDescriptionInput.addEventListener("input", () => {
	if (gameDescriptionInput.value.length > 60) {
		gameDescriptionInput.value = gameDescriptionInput.value.substring(0, 60)
	}
	updateCharCount(gameDescriptionInput, charCountDescription, 60)
})

closeSettingsModal.addEventListener("click", () => {
	settingsModal.style.display = "none"
})

gameImageInput.addEventListener("change", handleImageUpload)

gameImageNameContainer.addEventListener("click", () => {
	imageModal.style.display = "block"
	imagePreview.style.width = "100%"
	imagePreview.style.height = "100%"
})

closeImageModal.addEventListener("click", () => {
	imageModal.style.display = "none"
	imagePreview.style.width = ""
	imagePreview.style.height = ""
})

closeGameImageNameContainer.addEventListener("click", (event) => {
	event.stopPropagation()
	gameImageNameContainer.style.display = "none"
	gameImageName.textContent = ""
	gameImageUploadLabel.style.display = "inline-block"
	gameImageInput.value = ""
	imagePreview.src = ""
	tempImageData = null // Clear the temporary image data
	tempImageName = null // Clear the temporary image name
})

saveGameSettingsButton.addEventListener("click", saveGameSettings)
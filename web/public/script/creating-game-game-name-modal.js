document.addEventListener("DOMContentLoaded", function () {
	var gameNameModal = document.getElementById("game-name-modal-content")
	var closeGameNameModal = document.getElementById("close-game-name-modal")
	var saveGameNameButton = document.getElementById("save-game-name")
	var gameNameInput = document.getElementById("game-name-input")

	function closeGameNameModalFunc() {
		gameNameModal.parentElement.style.display = "none"
	}

	function saveGameName() {
		var newGameName = gameNameInput.value
		localStorage.setItem("gameName", newGameName)
		document.getElementById("game-name").textContent = newGameName
		closeGameNameModalFunc()
	}

	closeGameNameModal.addEventListener("click", closeGameNameModalFunc)
	saveGameNameButton.addEventListener("click", saveGameName)

	// Open the modal when the page loads
	gameNameModal.parentElement.style.display = "block"
	localStorage.setItem("gameName", "<%= give_game_name %>")
})

const gameInfoButton = document.getElementById("game-info-button")
const gameInfoModal = document.getElementById("game-info-modal")
const closeGameInfoModal = document.getElementById("close-game-info-modal")

gameInfoButton.addEventListener("click", () => {
	gameInfoModal.style.display = "block"
})

closeGameInfoModal.addEventListener("click", () => {
	gameInfoModal.style.display = "none"
})
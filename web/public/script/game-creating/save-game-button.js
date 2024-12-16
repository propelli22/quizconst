import { saveToDatabase } from "./save-to-database.js"

const saveGameButton = document.getElementById("save-game-button")

if (saveGameButton) {
	saveGameButton.addEventListener("click", function () {
		const dataArray = {
			subjectName: localStorage.getItem("gameName"),
			subjectDescription: localStorage.getItem("gameDescription"),
			subjectImage: localStorage.getItem("gameImageName"),
			subjectAuthor: document.getElementById("subject-author").value,
			questions: [],
		}
		saveToDatabase(dataArray)
		localStorage.clear()
		alert("Game saved and local storage cleared!")
	})
}

	// Clear localStorage when the page is refreshed
window.addEventListener("beforeunload", function () {
	localStorage.clear()
})
// Function to close the modals if user clicks outside
window.onclick = function (event) {
	// Question modal logic
	const questionModal = document.getElementById("question-modal")
	if (event.target === questionModal) {
		questionModal.style.display = "none"
	}

	// Question settings modal logic
	const questionSettingsModals = document.querySelectorAll("#settings-modal")
	questionSettingsModals.forEach((settingsModal) => {
		if (event.target === settingsModal) {
			const questionContainer = settingsModal.closest(".certain-question")
			if (questionContainer) {
				settingsModal.style.display = "none"
			}
		}
	})
}
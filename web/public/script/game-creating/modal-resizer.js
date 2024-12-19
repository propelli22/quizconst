document.addEventListener("DOMContentLoaded", function () {
	const leftPane = document.querySelector(".question-container")
	const rightPane = document.querySelector(".resizable-right")
	const resizer = document.querySelector(".resizer")

	let isResizing = false

	resizer.addEventListener("mousedown", function (e) {
		isResizing = true
		document.addEventListener("mousemove", resize)
		document.addEventListener("mouseup", stopResize)
	})

	function resize(e) {
		if (isResizing) {
			const wrapperWidth = document.querySelector(".game-creation").offsetWidth
			const newLeftWidth = (e.clientX / wrapperWidth) * 100
			const newRightWidth = 100 - newLeftWidth
			leftPane.style.width = newLeftWidth + "%"
			rightPane.style.width = newRightWidth + "%"
		}
	}

	function stopResize() {
		isResizing = false
		document.removeEventListener("mousemove", resize)
		document.removeEventListener("mouseup", stopResize)
	}
})
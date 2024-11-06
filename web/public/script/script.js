var logModal = document.getElementById("log-modal");

function toggleMenu() {
    const buttons = document.querySelectorAll('.nav-button');

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].style.display == "none") {
            buttons[i].style.display = "block"
        } else {
            buttons[i].style.display = "none"
        }
    }
};

document.getElementById("log-in").addEventListener("click", () => {
    logModal.style.display = "block";
});

document.getElementById("log-close-button").addEventListener("click", () => {
    logModal.style.display = "none";
});

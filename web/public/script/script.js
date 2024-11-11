// Part of log in modal!
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

//Log in module do not change!
document.getElementById("log-in").addEventListener("click", () => {
    logModal.style.display = "block";
});

document.getElementById("log-close-button").addEventListener("click", () => {
    logModal.style.display = "none";
});

//Email validation !!!
document.getElementById("sign-up-button").addEventListener("click", () => {
    var emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.[a-z]{2,}(?:\.[a-z]{2,})?$/i;
    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    let email = document.getElementById("signup-email").value;
    let wrongEmailError = document.getElementById("wrongEmail");
    let emptyEmailError = document.getElementById("emptyEmail");
    let password = document.getElementById("signup-password").value;
    let wrongPasswordError = document.getElementById("wrongPassword");
    let emptyPasswordError = document.getElementById("emptyPassword");

    if (email == "") {
        emptyEmailError.style.display = "block";
        wrongEmailError.style.display = "none";
        emptyEmailError.style.color = "red";
    } 
    else if (!emailPattern.test(email)) {
        wrongEmailError.style.display = "block";
        emptyEmailError.style.display = "none";
        wrongEmailError.style.color = "red";
    }  
    else {
        wrongEmailError.style.display = "none";
    }
    
    if (password == "") {
        emptyPasswordError.style.display = "block";
        wrongPasswordError.style.display = "none";
        emptyPasswordError.style.color = "red";
    }
    else if (!passwordPattern.test(password)) {
        wrongPasswordError.style.display = "block";
        wrongPasswordError.style.color = "red";
        emptyPasswordError.style.display = "none";
    } else {
        wrongPasswordError.style.display = "none";
    }
    
});

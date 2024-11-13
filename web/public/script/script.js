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

//Sign up validation !!!
var emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.[a-z]{2,}(?:\.[a-z]{2,})?$/i;
var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

document.getElementById("sign-up-button").addEventListener("click", () => {

    let usernameSignup = document.getElementById("signup-username").value;
    let wrongNameError = document.getElementById("wrongName");
    let emptyNameError = document.getElementById("emptyName");

    let email = document.getElementById("signup-email").value;
    let wrongEmailError = document.getElementById("wrongEmail");
    let emptyEmailError = document.getElementById("emptyEmail");

    let passwordSignup = document.getElementById("signup-password").value;
    let wrongPasswordError = document.getElementById("wrongPasswordSignup");
    let emptyPasswordError = document.getElementById("emptyPasswordSignup");

    let isValid = true;

    // Verification of the input fields (name, email, password)
    if (usernameSignup == "") {
        emptyNameError.style.display = "block";
        emptyNameError.style.color = "red";
        wrongNameError.style.display = "none";
        isValid = false;
    } else if (usernameSignup.length < 4 || usernameSignup.length > 14) {
        wrongNameError.style.display = "block";
        wrongNameError.style.color = "red";
        emptyNameError.style.display = "none";
        isValid = false;
    } else {
        wrongNameError.style.display = "none";
        emptyNameError.style.display = "none";
    }


    if (email == "") {
        emptyEmailError.style.display = "block";
        wrongEmailError.style.display = "none";
        emptyEmailError.style.color = "red";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        wrongEmailError.style.display = "block";
        wrongEmailError.style.color = "red";
        emptyEmailError.style.display = "none";
        isValid = false;
    } else {
        wrongEmailError.style.display = "none";
        emptyEmailError.style.display = "none";
    }
    
    if (passwordSignup == "") {
        emptyPasswordError.style.display = "block";
        wrongPasswordError.style.display = "none";
        emptyPasswordError.style.color = "red";
        isValid = false;
    }
    else if (!passwordPattern.test(passwordSignup)) {
        wrongPasswordError.style.display = "block";
        wrongPasswordError.style.color = "red";
        emptyPasswordError.style.display = "none";
        isValid = false;
    } else {
        wrongPasswordError.style.display = "none";
        emptyEmailError.style.display = "none";
    }

    if (isValid) {
        document.getElementById("sign-up-content").onsubmit = function() { return true; };
    } else {
        document.getElementById("sign-up-content").onsubmit = function() { return false; };
    }
});

//Log in validation !!!

document.getElementById("log-in-button").addEventListener("click", () => {
    const usernameLogIn = document.getElementById("login-username").value;
    const wrongNameLogError = document.getElementById("wrongNameLogin");
    const emptyNameLogError = document.getElementById("emptyNameLogin");

    const passwordLogin = document.getElementById("login-password").value;
    const emptyPasswordError = document.getElementById("emptyPasswordLogin");
    const wrongPasswordError = document.getElementById("wrongPasswordLogin");
    
    var isValid2 = true;

    //Verification of the input fields (name, password)

    if (usernameLogIn == "") {
        emptyNameLogError.style.display = "block";
        emptyNameLogError.style.color = "red";
        wrongNameLogError.style.display = "none";
        isValid2 = false;
    } else if (usernameLogIn.length < 4 || usernameLogIn.length > 14) { /*change when doing backend to match password in data*/
        wrongNameLogError.style.display = "block";
        wrongNameLogError.style.color = "red";
        emptyNameLogError.style.display = "none";
        isValid2 = false;
    } else {
        wrongNameLogError.style.display = "none";
        emptyNameLogError.style.display = "none";
    }


    if (passwordLogin == "") {
        emptyPasswordError.style.display = "block";
        wrongPasswordError.style.display = "none";
        emptyPasswordError.style.color = "red";
        isValid2 = false;
    } else if(!passwordPattern .test(passwordLogin)) {
        wrongPasswordError.style.display = "block";
        wrongPasswordError.style.color = "red";
        emptyPasswordError.style.display = "none";
        isValid2 = false;
    } else {
        wrongPasswordError.style.display = "none";
        emptyPasswordError.style.display = "none";
    }

    if (isValid2) {
        document.getElementById("log-in-content").onsubmit = function() { return true; };
    } else {
        document.getElementById("log-in-content").onsubmit = function() { return false; };
    }
});

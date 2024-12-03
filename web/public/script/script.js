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

addEventListener("DOMContentLoaded", (event) => {
    const buttons = document.querySelectorAll('.nav-button')

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "none";
    }
})

var subjectModal = document.getElementById("find-subject-modal");
var subjectButton = document.getElementById("find-subject");
var subjectSpan = document.getElementsByClassName("close")[0];

var lobbyModal = document.getElementById("create-lobby-modal");
var lobbyButton = document.getElementById("create-button");
var lobbySpan = document.getElementsByClassName("close")[1];

var userModal = document.getElementById("user-modal");
var userButton = document.getElementById("account");
var userSpan = document.getElementsByClassName("close")[3];

const cLobbySubjectButton = document.getElementById("c-lobby-select-subject");
 
if (subjectButton) {
  subjectButton.onclick = function() {
    subjectModal.style.display = "block";
  }
  
  cLobbySubjectButton.onclick = function() {
    subjectModal.style.display = "block";
  }
  
  subjectSpan.onclick = function() {
    subjectModal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == subjectModal) {
      subjectModal.style.display = "none";
    }
  
    if (event.target == lobbyModal) {
      lobbyModal.style.display = "none";
    }
  }
}

if (userButton) {
  userButton.onclick = function() {
    userModal.style.display = "block";
  }
  
  userSpan.onclick = function() {
    userModal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == userModal) {
      userModal.style.display = "none";
    }
  
    if (event.target == userModal) {
      userModal.style.display = "none";
    }
  }
}

lobbyButton.onclick = function() {
  lobbyModal.style.display = "block";
}

lobbySpan.onclick = function() {
  lobbyModal.style.display = "none";
}

let count = 16;
let maxLimit = 100;

function countUp() {
  count++

  // Maximum player limit
  if (count > maxLimit) {
    count = maxLimit;
  }

  document.getElementById("count").innerHTML = count;
}

function countDown() {
  count--

  // Minimum player limit
  if (count < 2) {
    count = 2;
  }

  document.getElementById("count").innerHTML = count;
}

// create a new lobby, return lobby id
function newLobby() {
  const lobbyName = document.getElementById("lobbyName").innerHTML;
  //const maxPlayers = document.getElementById("count").innerHTML;
  const maxPlayers = document.getElementById("count").innerHTML;
  const subjectId = "3";
  const date = new Date();
  let gameDate = date.toISOString();
  const selectedLanguage = document.getElementById("language-selection").value;

  fetch("http://localhost:4000/createlobby", {
    method: "POST",
    body: JSON.stringify({
      name: lobbyName,
      playercount: maxPlayers,
      subject: subjectId,
      game_date: gameDate
    }),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((json) => window.open(`/lobby?id=${json.lobbyId}&language=${selectedLanguage}`, "_self"));
}

// fetch all lobby data of selected id, throw user into lobby, if user has no account, username = player/pelaaja {i}
function joinLobby() {
  const lobbyId = document.getElementById("lobby-code").value;

  fetch("http://10.20.12.180:4000/lobbydata", {
    method: "GET"
  })
    .then((response)) // not finsihed :(
}

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

    let usernameSignup = document.getElementById("username").value;
    let wrongNameError = document.getElementById("wrongName");
    let emptyNameError = document.getElementById("emptyName");

    let email = document.getElementById("email").value;
    let wrongEmailError = document.getElementById("wrongEmail");
    let emptyEmailError = document.getElementById("emptyEmail");

    let passwordSignup = document.getElementById("password").value;
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

//Log in validation

// Get the values and IDs from the input fields
document.getElementById("log-in-button").addEventListener("click", () => {
    const usernameLogIn = document.getElementById("login-username").value;
    const wrongNameLogError = document.getElementById("wrongNameLogin");
    const emptyNameLogError = document.getElementById("emptyNameLogin");

    const passwordLogin = document.getElementById("login-password").value;
    const emptyPasswordError = document.getElementById("emptyPasswordLogin");
    const wrongPasswordError = document.getElementById("wrongPasswordLogin");
    
    // Set the validation to true
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

    // If the validation is true, the form will be submitted else it will not
    if (isValid2) {
        document.getElementById("log-in-content").onsubmit = function() { return true; };
    } else {
        document.getElementById("log-in-content").onsubmit = function() { return false; };
    }
});


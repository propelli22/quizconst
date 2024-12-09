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
 
subjectButton.onclick = function() {
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
  const maxPlayers = "4";
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
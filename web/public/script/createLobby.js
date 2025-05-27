const currentAddressCL = window.location.origin;

async function createLobby() {
    const lobbyName = document.getElementById("lobbyName").value;
    let playerName = document.getElementById("playerName").value;
    const maxPlayers = document.getElementById("count").innerHTML;
    const subjectId = selectedSubject;
    const date = new Date();
    let gameDate = date.toISOString();
    const selectedLanguage = document.getElementById("language-selection").value;

    if(subjectId == undefined) {
        document.getElementById("no-subject-selected-error").style.display = "block";
    } else {
        // improvent idea: add an blocked names list
        if(playerName === "") {
          playerName = "Player"
        }
    }

    console.log(lobbyName);

    axios.post('/createlobby', {
        name: lobbyName,
        playercount: maxPlayers,
        subject: subjectId,
        game_date: gameDate,
        playerName: playerName
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (createResponse) {
        console.log(createResponse)
        axios.post('/joinplayer', {
            lobbyId: createResponse.data.lobbyId,
            name: playerName,
            isHost: true
        })
        .then(function (joinResponse) {
            window.location.href = `${currentAddressCL}/lobby?lobby=${createResponse.data.lobbyId}&language=${selectedLanguage}`, "_self"
        })
    })
}
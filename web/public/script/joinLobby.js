const currentAddressJL = window.location.origin;

function joinLobby() {
    const lobbyId = document.getElementById("lobby-code").value;
    const playerName = document.getElementById("joinPlayerName").value;

    if (playerName == "") {
        playerName = "Player"
    }

    axios.post('/joinplayer', {
        lobbyId: lobbyId,
        name: playerName,
        isHost: false
    })
    .then(function (joinResponse) {
        window.location.href = `${currentAddressJL}/lobby?lobby=${lobbyId}&language=${selectLanguage}`, "_self"
    })
}
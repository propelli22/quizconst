// todo: write a script that retrives all the players in the lobby, adds the new ones to the page.
const urlParams = new URLSearchParams(window.location.search);
const currentAddressLobby = window.location.origin; 

const lobbyId = urlParams.get('lobby');
const delay = 500;

async function loadPlayers() {
    let lobbyData;

    await fetch(`${currentAddressLobby}/lobbydata`, {
        method: 'POST',
        body: JSON.stringify({'lobbyId': lobbyId}),
        headers: {'Content-Type': 'application/json'}
    })
    .then(Response => Response.json())
    .then(data => lobbyData = data);

    console.log(lobbyData);
    const playerDiv = document.getElementById("players-flex");

    playerDiv.innerHTML = '';

    if(lobbyData.lobbydata.length != playerDiv.children.length) {
        for(let i = 0; i < lobbyData.lobbydata.length; i++) {
            const player = lobbyData.lobbydata[i];
            const playerBox = document.createElement('div');
            playerBox.className = 'player-box';
            playerBox.id = `player-${player.id}`;

            const playerName = document.createElement('p');
            playerName.textContent = player.name;

            playerBox.appendChild(playerName);
            playerDiv.appendChild(playerBox);
        }
    }
}

setInterval(loadPlayers, delay); 
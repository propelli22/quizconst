const urlParams = new URLSearchParams(window.location.search);
const currentAddressLobby = window.location.origin; 

const lobbyId = urlParams.get('lobby');
const delay = 500;

// not using the "getCookie.js" module due to weird issues with html script linking, try to fix later
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

// TODO IN THE LOBBYMANAGER:
// - Get the players id, lobby id, is host, etc. from the cookies and constantly compare them, if they dont match kick the player out.

async function lobbyManager() {
    let lobbyData;

    await fetch(`${currentAddressLobby}/lobbydata`, {
        method: 'POST',
        body: JSON.stringify({'lobbyId': lobbyId}),
        headers: {'Content-Type': 'application/json'}
    })
    .then(Response => Response.json())
    .then(data => lobbyData = data);

    const playerDiv = document.getElementById("players-flex");

    console.log(playerDiv.children.length)
    console.log(lobbyData.lobbydata.length)

    if(lobbyData.lobbydata.length != playerDiv.children.length && lobbyData.lobbydata.length != undefined) {
        console.log("moi")
        playerDiv.innerHTML = '';

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

    let statusData;
    const statusBody = {
        action: "getStatus",
        lobbyId: lobbyId
    }

    await fetch(`${currentAddressLobby}/gamedata`, {
        method: 'POST',
        body: JSON.stringify(statusBody),
        headers: {'Content-Type': 'application/json'}
    })
    .then(Response => Response.json())
    .then(data => statusData = data);

    if(statusData[0].status == "moveToGame") {
        moveToGame();
    }
}

async function startGame() {
    // only the host can run this, it will set the lobby as ready for the game
    const isHost = true;

    if (isHost) {
        console.log("toimin")
        const lobbyReadyBody = {
            action: 'lobbyReady',
            lobbyId: lobbyId
        }

        let response;

        await fetch(`${currentAddressLobby}/gamedata`, {
            method: 'POST',
            body: JSON.stringify(lobbyReadyBody),
            headers: {'Content-Type': 'application/json'}
        })
        .then(Response => Response.json())
        .then(data => response = data);
    }
}

function moveToGame() {
    location.replace(`${currentAddressLobby}/game`);
}

setInterval(lobbyManager, delay);
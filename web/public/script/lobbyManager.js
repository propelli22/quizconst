const socket = io();

const urlParams = new URLSearchParams(window.location.search);
const currentAddressLobby = window.location.origin; 

const lobbyId = urlParams.get('lobby');
const language = urlParams.get('language');
const delay = 500;

let players = [];

// not using the "getCookie.js" module due to weird issues with html script linking, try to fix later
async function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
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

async function startGame() {
    const gameStartData = {
        playerId: await getCookie("playerId"),
        isHost: await getCookie("host"),
        lobbyId: lobbyId
    }

    socket.emit('startGame', gameStartData);
}

socket.on('connect', () => {
    console.log('Connected to server!');
});

document.addEventListener('DOMContentLoaded', async () => {
    const localPlayerData = {
        lobbyId: lobbyId,
        playerId: await getCookie("playerId"),
        isHost: await getCookie("isHost")
    }

    socket.emit('playerJoin', localPlayerData);

    if (await getCookie("host") == "true") {
        console.log("You are the host of this lobby!");

        const startButton = document.getElementById("start-game-button");

        startButton.style.display = "block";
    } else {
        console.log("You are not the host of this lobby");

        const startButton = document.getElementById("start-game-button");

        startButton.style.display = "none";
    }
});

// TODO IN THE LOBBYMANAGER:
// - Get the players id, lobby id, is host, etc. from the cookies and constantly compare them, if they dont match kick the player out.

socket.on('lobbyPlayers', (lobbyPlayerData) => {
    console.log(lobbyPlayerData.playerdata);

    lobbyPlayerData.playerdata.forEach(player => {
        if (players.some(id => id == player.player)) {
            return
        } else {
            const div = document.createElement('div');
            const p = document.createElement('p');

            div.setAttribute('class', 'player-box');
            
            if (player.isHost) {
                div.setAttribute('class', 'host');
                div.setAttribute('id', 'host-player');
            }

            p.textContent = `${player.name}`;

            div.appendChild(p);

            div.setAttribute('id', 'foreach')

            document.getElementById('players-flex').appendChild(div);

            players.push(player.player);
        }
    });
});

socket.on('newPlayer', async (playerData) => {
    if (players.some(id => id == playerData.playerId)) {
        return
    } else {
        if (playerData.playerId == await getCookie("playerId")) {
            return
        } else {
            const div = document.createElement('div');
            const p = document.createElement('p');
    
            console.log(playerData);
    
            div.setAttribute('class', 'player-box');
    
            if (playerData.isHost) {
                div.setAttribute('class', 'host');
                div.setAttribute('id', 'host-player');
            }
    
            p.textContent = `${playerData.playerName}`;
    
            div.appendChild(p);
    
            document.getElementById('players-flex').appendChild(div);
        }
    }
});

socket.on('gameStarting', async (gameData) => {
    console.log(`Game Starting! Please wait for the page to relocate to the game...`);

    window.location.replace(`${currentAddressLobby}/game?lobby=${gameData.lobbyId}&subject=${gameData.subjectId}&language=${language}`);
});
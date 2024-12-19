document.addEventListener('DOMContentLoaded', function () {
    const playersFlex = document.getElementById('players-flex');

    document.getElementById('add-player-button').addEventListener('click', function () {
        const playerCount = playersFlex.getElementsByClassName('player-box').length;

        if (playerCount < 15) {
            const newPlayerBox = document.createElement('div');
            newPlayerBox.className = 'player-box';
            newPlayerBox.innerHTML = `<p>Pelaaja ${playerCount + 1}</p>`;

            // Lisätään uusi pelaaja
            playersFlex.appendChild(newPlayerBox);
        }
    });
});
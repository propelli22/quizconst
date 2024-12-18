document.addEventListener('DOMContentLoaded', function () {
    const playersGrid = document.getElementById('players-grid');

    document.getElementById('add-player-button').addEventListener('click', function () {
        const playerCount = playersGrid.getElementsByClassName('player-box').length;

        if (playerCount < 15) {
            const newPlayerBox = document.createElement('div');
            newPlayerBox.className = 'player-box';
            newPlayerBox.innerHTML = `<p>Pelaaja ${playerCount + 1}</p>`;

            // Lisätään uusi pelaaja
            playersGrid.appendChild(newPlayerBox);
        }
    });
});
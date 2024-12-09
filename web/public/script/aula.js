document.addEventListener('DOMContentLoaded', function () {
    const playersGrid = document.getElementById('players-grid');
    const mainElement = document.querySelector('main');

    function adjustGrid() {
        const playerCount = playersGrid.getElementsByClassName('player-box').length;
        if (window.innerWidth === 375 && window.innerHeight === 600) {
            if (playerCount === 1) {
                playersGrid.style.gridTemplateColumns = '1fr';
            } else {
                playersGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            }
            playersGrid.style.justifyContent = 'center';
            playersGrid.style.alignContent = 'center';
            playersGrid.style.gap = '10px';
            if (playerCount >= 13) {
                mainElement.style.paddingBottom = '60px';
            } else {
                mainElement.style.paddingBottom = '0';
            }
        } else {
            if (playerCount === 1) {
                playersGrid.style.gridTemplateColumns = '1fr';
            } else {
                playersGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';
            }
            playersGrid.style.justifyContent = 'center';
            mainElement.style.paddingBottom = '0';
        }
    }

    adjustGrid();

    document.getElementById('add-player-button').addEventListener('click', function () {
        const playerCount = playersGrid.getElementsByClassName('player-box').length;

        if (playerCount < 15) {
            const newPlayerBox = document.createElement('div');
            newPlayerBox.className = 'player-box';
            newPlayerBox.innerHTML = `<p>Pelaaja ${playerCount + 1}</p>`;

            // Lisätään uusi pelaaja
            playersGrid.appendChild(newPlayerBox);

            
            adjustGrid();
        }
    });

    // Muokataan ruudukkoa ikkunan koon muuttuessa
    window.addEventListener('resize', adjustGrid);

    
    const hostPlayer = document.getElementById('host-player');
    hostPlayer.style.gridColumn = 'span 1';
    playersGrid.style.justifyContent = 'center';
});
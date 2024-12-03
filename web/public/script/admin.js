
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const playerID = '2';

(async function() {
    try {
        let receivedTime = await fetch(`http://localhost:4000/getPlayerName?id=${playerID}`, {
            method: 'GET'
        });
        
        let playerData = await receivedTime.json();
        console.log(`Player: ${playerData[0].name}`);
    } catch (error) {
        console.error('Error fetching player data:', error);
    }
})();
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function scoreCalculator(questionId) {
    let recivedTime = await fetch(`http://localhost:4000/time?question=${questionId}`, {
        method: 'GET'
    });

    let startingPoints = 1000; // TODO: change startingPoints to be set from database
    let timeData = await recivedTime.json();

    startingPoints = timeData[0].points;

    const ConvertedTime = timeData[0].time * 1000;
    const reductionAmount = startingPoints / ConvertedTime;
    let currentPoint = startingPoints;
    const startTime = Date.now();

    const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;

        currentPoint = Math.max(0, startingPoints - (reductionAmount * elapsedTime));

        // prevent infinity loops
        if (currentPoint <= 0) {
            clearInterval(interval); // Prevent any new further updates
        }
    });
};
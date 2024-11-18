const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const questionId = '9';

const startingPoints = 1000;

!async function() {
    let recivedTime = await fetch(`http://localhost:4000/time?question=${questionId}`, {
        method: 'GET'
    });
    let timeData = await recivedTime.json();
    console.log(timeData[0].time);

    const ConvertedTime = timeData[0].time * 1000;

    const reductionAmount = startingPoints / ConvertedTime;

    let currentPoint = startingPoints;

    const startTime = Date.now();

    const interval = setInterval(() => {

        const elapsedTime = Date.now() - startTime;

        currentPoint = Math.max(0, startingPoints - (reductionAmount * elapsedTime));

        console.log(currentPoint.toFixed(2));

        if (currentPoint <= 0) {
            clearInterval(interval);
        }
    });

    interval;
}();
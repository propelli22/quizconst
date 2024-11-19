// Dynamically import 'node-fetch' for making HTTP requests
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Define the ID of the question for which we need the time
const questionId = '9';


!async function() {

    // Fetch the time data associated with the question ID from the backend
    let recivedTime = await fetch(`http://localhost:4000/time?question=${questionId}`, {
        method: 'GET'
    });

    // Set the starting points default value
    let startingPoints = 1000;

    // Parse it into JSON format for responses
    let timeData = await recivedTime.json();
    // change it to whatever the backend sends
    startingPoints = timeData[0].points;

    console.log(`Time: ${timeData[0].time}, Points: ${startingPoints}`);

    // Convert the fetched time (in seconds) to milliseconds
    const ConvertedTime = timeData[0].time * 1000;

    // Calculate how much the points reduce per millisecond
    const reductionAmount = startingPoints / ConvertedTime;

    // Initialize the current points to the starting value
    let currentPoint = startingPoints;

    // Capture the timestamp when the timer starts
    const startTime = Date.now();

    // Set up a repeating interval to calculate and update the points
    const interval = setInterval(() => {

        // Calculate how much time has elapsed since the start of the timer
        const elapsedTime = Date.now() - startTime;

        // Update the current points ensuring it never goes below 0
        currentPoint = Math.max(0, startingPoints - (reductionAmount * elapsedTime));

        // Log the updated points in 2 decimal.
        console.log(currentPoint.toFixed(2));

        // Stop the interval once the points reach 0 (prevent infinity loops)
        if (currentPoint <= 0) {
            clearInterval(interval); // Prevent any new further updates
        }
    });

    // Not strictly needed can delete if not used
    interval;
}();

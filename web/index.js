const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

// import languages from json
const fi_home = require('./languages/fi_home.json')
const en_home = require('./languages/en_home.json')

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(__dirname + '/public'));

const port = "3000";
const host = "0.0.0.0"; // run on device local ip


const players = [
    { name: 'Player 1' },
    // Add more players as needed
];

app.get('/aula', (req, res) => {
    const hostPlayer = players.slice(0, 1); // Get only the first player
    res.render('aula', { ...fi_home, players: hostPlayer });
});


app.get('/', (req, res) => {
    const language = req.query.language;
    
    if (language == 'fi') {
        res.render('home', fi_home)
    } else if (language == 'en') {
        res.render('home', en_home)
    } else { // by default render the finnish verison
        res.render('home', fi_home)
    }
});

app.listen(port, host, () => console.log(`Listening on ${host}:${port}...`));
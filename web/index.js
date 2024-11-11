const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

// import languages from json
const fi_home = require('./languages/fi_home.json')
const en_home = require('./languages/en_home.json')
const fi_create = require('./languages/fi_create.json')
const en_create = require('./languages/en_create.json')

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(__dirname + '/public'));

const port = "3000";
const host = "0.0.0.0"; // run on device local ip

app.get('/', async (req, res) => {
    const language = req.query.language;

    let subjectsURL = 'http://localhost:4000/getsubjects'
    const settings = {
        method: 'GET'
    };
    let subjects;
    let merged = {};

    try {
        const subjectsPage = await fetch(subjectsURL, settings)
        subjectsURL = await subjectsPage.text();
        subjectsURL = JSON.parse(subjectsURL);
    } catch (err) {
        console.log(err)
    }
    
    if (language == 'fi') {
        res.render('home', {
            ...fi_home,
            subjects: subjectsURL
        });
    } else if (language == 'en') {
        res.render('home', {
            ...en_home,
            subjects: subjectsURL
        });
    } else { // by default render the finnish verison
        res.render('home', {
            ...fi_home,
            subjects: subjectsURL
        });
    }
});

app.get('/create', (req, res) => {
	const language = req.query.language;

	if (language == 'fi') {
		res.render('create_a_game', fi_create)
	} else if (language == 'en') {
		res.render('create_a_game', en_create)
	} else {
		res.render('create_a_game', fi_create)
	}
});

app.listen(port, host, () => console.log(`Listening on ${host}:${port}...`));
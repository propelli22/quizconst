const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");


const app = express();
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

// import languages from json
const fi_home = require('./languages/fi_home.json')
const en_home = require('./languages/en_home.json')
const fi_create = require('./languages/fi_create.json')
const en_create = require('./languages/en_create.json')
const en_lobby = require('./languages/en_lobby.json');
const fi_lobby = require('./languages/fi_lobby.json');
const fi_game = require('./languages/fi_game.json');
const en_game = require('./languages/en_game.json')

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(__dirname + '/public'));

app.use(
    session({
        secret: 'kissa-putkessa',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: true }
    })
);

const port = "3000";
const host = "0.0.0.0"; // run on device local ip

const players = [];


app.get('/', async (req, res) => {
    console.log("loaded Frontpage");

    const language = req.query.language;
    const sessionId = req.headers.cookie || null;

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
            subjects: subjectsURL,
            sessionId: sessionId
        });
    } else if (language == 'en') {
        res.render('home', {
            ...en_home,
            subjects: subjectsURL,
            sessionId: sessionId
        });
    } else { // by default render the finnish verison
        res.render('home', {
            ...fi_home,
            subjects: subjectsURL,
            sessionId: sessionId
        });
    }
});

app.get("/create", (req, res) => {
	console.log("loaded Create a game")
	const language = req.query.language
	const sessionId = req.session.sessionId || null

	if (language == "fi") {
		res.render("create_a_game", {
			...fi_create,
			sessionId: sessionId,
		})
	} else if (language == "en") {
		res.render("create_a_game", {
			...en_create,
			sessionId: sessionId,
		})
	} else {
		res.render("create_a_game", {
			...fi_create,
			sessionId: sessionId,
		})
	}


});

app.get('/aula', (req, res) => {
	const language = req.query.language;
    const sessionId = req.session.sessionId || null

	if (language == 'fi') {
		res.render("aula", {
			...fi_lobby,
			sessionId: sessionId
		})
	} else if (language == 'en') {
		res.render("aula", {
			...en_lobby,
			sessionId: sessionId
		})
	} else {
		res.render("aula", {
			...fi_lobby,
			sessionId: sessionId
		})
	}
});



app.listen(port, host, () => console.log(`Listening on ${host}:${port}...`));
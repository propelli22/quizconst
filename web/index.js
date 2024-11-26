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
})

app.get('/game', async (req, res) => {
    // kalle does this. - Kalle
    console.log("loaded Game");
    const lobby = req.body.lobby;
    const language = req.body.language;
    const sessionId = req.headers.cookie || null;

    if (language == 'fi') {
        res.render('game', fi_game);
    } else if (language == 'en') {
        res.render('game', en_game);
    } else { // by default, render the finnish version
        res.render('game', {
            ...fi_game,
            sessionId: sessionId
        });
    }
});

app.post('/register', (req, res) => {
    console.log("used Register");

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async function(err, hash) {
        const body = {
            user: username,
            email: email,
            password: hash
        }

        const responseCheck = await fetch(`http://localhost:4000/checkuser`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });

        if (responseCheck.status == 200) {
            const responeCreate = await fetch('http://localhost:4000/createuser', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            });
    
            if (responeCreate.status == 201) {
                const loggedUser = `${username}`
                req.session.userId = username;
                req.session.sessionId = loggedUser;

                res.cookie('sessionId', loggedUser, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000
                });
            
                const lastPage = req.query.redirect || '/';
                res.redirect(lastPage);
            } else {
                res.status(400).json({"message": "Failed to create new user, please check input."})
            }
        } else {
            res.status(400).json({"message": "User already exists."});
        }
    });

});

app.post('/login', async (req, res) => {
    console.log("used Login");

    const {input_name, input_log} = req.body;
 
    const body = {
        user: input_name,
        password: input_log
    };

    const checkLogin = await fetch(`http://localhost:4000/checklogin`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });

    const checkResult = await checkLogin.json();

    if (checkResult === true) {
        const loggedUser = `${input_name}`
        req.session.userId = input_name;
        req.session.sessionId = loggedUser;

        res.cookie('sessionId', loggedUser, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });

        const lastPage = req.query.redirect || '/';
        res.status(200).redirect(lastPage);
    } else {
        res.status(401).json({ "message": "Failed to authenticate user, please check input."})
    }
});

app.post('/gamedata', async (req, res) => {
    console.log("used /gamedata");

    // this will be stupid af, BUT, the users browser will send out what action to run (for example, /question) on the data server.
    // the users browser WILL run this multiple times during the game (by multiple users) so to avoid overloading the server, 
    // OPTIMIZE CODE AS MUCH AS POSSIBLE!!! try and avoid all unnecesary actions.
    // TODO: make sure code does not use too much resources when ran by multiple users at the same time, KALLE!!!!!
    const runAction = req.body.action;
    const subject = req.body.subjectId;
    const player = req.body.playerId;
    const question = req.body.questionId;
    const lobby = req.body.lobbyId;
    const points = req.body.recivedPoints;

    // try to optimize this later !!!
    if (runAction == "allquestions") {
        const body = {
            subjectId: subject
        };
    
        const getQuestions = await fetch(`http://localhost:4000/getquestions`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
    
        const result = await getQuestions.json();

        res.json(result);
    } else if (runAction == "question") {
        const body = {
            question: question
        };
    
        const getQuestion = await fetch(`http://localhost:4000/question`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
    
        const result = await getQuestion.json();

        res.json(result);
    } else if (runAction == "playerresult") {
        const body = {
            playerId: player,
            recivedPoints: points
        };
    
        const getPlayerResult = await fetch(`http://localhost:4000/playerresult`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
    
        const result = await getPlayerResult.json();

        res.json(result);
    } else if(runAction == "questionready") { // THIS WILL BE HEAVY TO RUN, as the data server will only respond to this once everyone is ready!
        const body = {
            playerId: player,
            lobbyId: lobby
        };
    
        const getQuestionReady = await fetch(`http://localhost:4000/questionready`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
    
        const result = await getQuestionReady.json();

        res.json(result);
    } else if (runAction == "results") {
        const body = {
            lobbyId: lobby,
            playerId: player
        };
    
        const getResults = await fetch(`http://localhost:4000/results`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
    
        const result = await getResults.json();

        res.json(result);
    } else {
        res.status(400).json({"message": "Failed to get action, please check input."});
    }

});

app.listen(port, host, () => console.log(`Listening on ${host}:${port}...`));
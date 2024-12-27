const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
const { get } = require('http');
const { getEventListeners } = require('events');


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
const en_game = require('./languages/en_game.json');

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

app.get('/lobby', async (req, res) => {
    console.log("loaded /lobby")

    const language = req.query.language;
    const sessionId = await getCookie('sessionId') || null;
    const lobbyId = req.query.lobby;
    const admin = await getCookie('admin') || null;

    async function getCookie(name) {
        const value = `; ${req.headers.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const lobbyDataUrl = `http://localhost:4000/lobbydata?id=${lobbyId}`
    let lobbyData;

    const settings = {
        method: 'GET'
    }

    try {
        const xmlSite = await fetch(lobbyDataUrl, settings);
        const xml = await xmlSite.text();

        const isValid = XMLValidator.validate(xml);
        if(isValid) {
            const parser = new XMLParser();
            lobbyData = parser.parse(xml).lobbydata;
        } else {
            lobbyData = 'An error occurred while fetching lobbydata :('
        }
    } catch (err) {
        console.log(err);
    }

    if(language === 'fi') {
        res.render('aula', {
            ...fi_lobby,
            sessionId: sessionId,
            lobbyData: lobbyData,
            lobbyId: lobbyId,
            admin: admin
        });
    } else if(language === "en") {
        res.render('aula', {
            ...en_lobby,
            sessionId: sessionId,
            lobbyData: lobbyData,
            lobbyId: lobbyId,
            admin: admin
        });
    } else {
        res.render('aula', {
            ...en_lobby,
            sessionId: sessionId,
            lobbyData: lobbyData,
            lobbyId: lobbyId,
            admin: admin
        });
    }
});


app.get('/', async (req, res) => {
    console.log("loaded / (frontpage)");

    const language = req.query.language;
    const sessionId = await getCookie('sessionId') || null;
    const admin = await getCookie('admin') || null;

    async function getCookie(name) {
        const value = `; ${req.headers.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

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
            sessionId: sessionId,
            admin: admin
        });
    } else if (language == 'en') {
        res.render('home', {
            ...en_home,
            subjects: subjectsURL,
            sessionId: sessionId,
            admin: admin
        });
    } else { // by default render the finnish verison
        res.render('home', {
            ...fi_home,
            subjects: subjectsURL,
            sessionId: sessionId,
            admin: admin
        });
    }
});

app.get("/create", async (req, res) => {
	console.log("loaded /create")

	const language = req.query.language;
	const sessionId = await getCookie('sessionId') || null;
    const admin = await getCookie('admin') || null;

    async function getCookie(name) {
        const value = `; ${req.headers.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

	if (language == "fi") {
		res.render("create_a_game", {
			...fi_create,
			sessionId: sessionId,
            admin: admin
		})
	} else if (language == "en") {
		res.render("create_a_game", {
			...en_create,
			sessionId: sessionId,
            admin: admin
		})
	} else {
		res.render("create_a_game", {
			...fi_create,
			sessionId: sessionId,
            admin: admin
		})
	}
})

app.post('/setCookie', (req, res) => {
    console.log("used /setCookie");

    const cookie = req.body.setCookie;

    if (cookie == "firstCreateLoad") {
        res.cookie('loadedCreate', true, {
            httpOnly: true,
            secure: false
        });
    } else {
        res.status(400).json({"message": "An error occured, please try again. (invalid cookie request)"})
    }
})

app.get('/game', async (req, res) => {
    // kalle does this. - Kalle
    // shit desicion - Kalle
    console.log("loaded /game");
    const lobby = req.query.lobby;
    const language = req.query.language;
    const sessionId = await getCookie('sessionId') || null;
    const admin = await getCookie('admin') || null;

    async function getCookie(name) {
        const value = `; ${req.headers.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    if (language == 'fi') {
        res.render('game', {
            ...fi_game,
            sessionId: sessionId,
            admin: admin
        });
    } else if (language == 'en') {
        res.render('game', {
            ...en_game,
            sessionId: sessionId,
            admin: admin
        });
    } else { // by default, render the finnish version
        res.render('game', {
            ...fi_game,
            sessionId: sessionId,
            admin: admin
        });
    }
});

app.post('/register', (req, res) => {
    console.log("used /register");

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

app.post('/joinplayer', async (req, res) => {
    console.log("used /joinplayer");

    const body = {
        lobby: req.body.lobbyId,
        name: req.body.name,
        accountId: req.body.accountId,
        host: req.body.isHost
    }

    const responeJoin = await fetch('http://localhost:4000/joingame', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });

    const joinData = await responeJoin.json();

    res.cookie('lobby', req.body.lobbyId);
    res.cookie('playerId', joinData);

    res.status(200).json({"message": "Ok"})
});

app.post('/login', async (req, res) => {
    console.log("used /login");

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

    console.log(checkResult)

    if (checkResult.passwordResult === true) {
        const loggedUser = `${input_name}`
        req.session.userId = input_name;
        req.session.sessionId = loggedUser;

        res.cookie('sessionId', checkResult.userId, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });

        if(checkResult.isAdmin) {
            res.cookie('admin', checkResult.isAdmin, {
                httpOnly: true,
                secure: false,
                maxAge: 24 * 60 * 60 * 1000
            });
        }

        const lastPage = req.query.redirect || '/';
        res.status(200).redirect(lastPage);
    } else {
        res.status(401).json({ "message": "Failed to authenticate user, please check input."})
    }
});

app.post('/createlobby', async (req, res) => {
    console.log("used /createlobby")

    const body = {
        name: req.body.name,
        playercount: req.body.playercount,
        subject: req.body.subject,
        game_date: req.body.game_date
    }

    const createLobbyResponse = await fetch('http://localhost:4000/createlobby', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
    });

    const result = await createLobbyResponse.json();

    res.status(200).json(result)
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
    } else if(runAction == "questionready") { // This might be heavy to run (RAM)
        const body = {
            playerId: player,
            lobbyId: lobby,
            recivedPoints: points
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
    } else if (runAction == "getanswers") {
        const body = {
            questionId: question
        }

        const getAnswers = await fetch(`http://localhost:4000/getanswers`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });

        const result = await getAnswers.json();

        res.json(result);
    } else if (runAction == "time") {
        const getTime = await fetch(`http://localhost:4000/time?question=${question}`, {
            method: 'GET'
        });

        const result = await getTime.json();

        res.json(result);
    } else {
        res.status(400).json({"message": "Failed to get action, please check input."});
    }

});

//Request searched username from data and ban
app.post('/getUserBan', async (req, res) => {

    const getUser = await fetch(`http://localhost:4000/getPlayerName?id=${req.body.id}`, {
        method: 'GET'
    });

    const body = {
        id: req.body.id
    }

    const banReq = await fetch(`http://localhost:4000/banPlayer`, {
        method: 'POST', 
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
    });
    const userResult = await getUser.json();
    const banResult = await banReq.json();

    const respone = [userResult, banResult]

    console.log(respone)

    res.json(respone);
});

//Request searched username from data and unban
app.post('/getUserUnban', async (req, res) => {

    const getUser = await fetch(`http://localhost:4000/getPlayerName?id=${req.body.id}`, {
        method: 'GET'
    });

    const body = {
        id: req.body.id
    }

    const unbanReq = await fetch (`http://localhost:4000/unbanPlayer?id=${req.body.id}`, {
        method: `POST`,
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'} 
    });

    const userResult = await getUser.json();
    const unbanResult = await unbanReq.json();

    const respone = [userResult, unbanResult]

    res.json(respone);
});

app.post('/createsubject', async (req, res) => {
    console.log("used /createsubject");

    const body = req.body;

    const saveData = await fetch('http://localhost:4000/createsubject', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
  
    const result = await saveData.json();

    res.status(200).json({"message": "OK", "subjectId": result.subjectId});
});

//Send request to data to get searched lobby name
app.post(`/getLobbyName`, async (req, res) => {

    const body = {
        id: req.body.id
    }

    const getLobby = await fetch (`http://localhost:4000/lobbySearch?id=${req.body.id}`, {
        method: `POST`,
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
    });

    const lobbyResult = await getLobby.json();
    res.json(lobbyResult)
});

app.post('/createquestion', async (req, res) => {
    console.log("used /createquestion");

    const body = req.body

    const saveData = await fetch('http://localhost:4000/createquestion', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });

    const result = await saveData.json();

    res.status(200).json({"message": "OK", "questionId": result.questionId});
  });

app.post('/createanswer', async (req, res) => {
    console.log("used /createanswer");

    const body = req.body

    const saveData = await fetch('http://localhost:4000/createanswer', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });

    const result = await saveData.json();

    res.status(200).json({"message": "OK", "answerId": result.answerId});
}); 

//Send request to data server to delete certain lobby
app.post(`/deleteLobby`, async (req, res) => {
    const body = {
        id: req.body.id
    }

    console.log(req.body.id)

    const getDelete = await fetch(`http://localhost:4000/deleteLobby`, {
        method: `POST`,
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });

    const deleteResult = await getDelete.json();
    res.json(deleteResult)
});

app.post('/lobbydata', async (req, res) => {
    console.log("used /lobbydata");

    const lobbyDataUrl = `http://localhost:4000/lobbydata?id=${req.body.lobbyId}`
    let lobbyData;

    const settings = {
        method: 'GET'
    }

    try {
        const xmlSite = await fetch(lobbyDataUrl, settings);
        const xml = await xmlSite.text();

        const isValid = XMLValidator.validate(xml);
        if(isValid) {
            const parser = new XMLParser();
            lobbyData = parser.parse(xml).lobbydata;
        } else {
            lobbyData = 'An error occurred while fetching lobbydata :('
        }
    } catch (err) {
        console.log(err);
    }

    res.status(200).json({"message": "ksi - thick of it"})
});

app.listen(port, host, () => console.log(`Listening on ${host}:${port}...`));
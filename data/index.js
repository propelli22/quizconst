const express = require('express');
const {XMLBuilder} = require('fast-xml-parser');
const mysql = require('mysql');
const dbconfig = require('./dbconfig.json');
const bcrypt = require('bcrypt');

const app = express();  
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://10.20.12.180:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

const port = "4000";
const host = "localhost"; // runs on localhost to avoid external users access to database

// Obvious: checks password, return is it is correct or not, does not tell if the user is also correct etc.
app.post('/checklogin', (req, res) => {
    console.log("used Check login");

    const {user, password} = req.body;

    const sql = 'SELECT password FROM user WHERE username = ?';

    const connection = mysql.createConnection(dbconfig);

    connection.connect();
    connection.query(sql, [user], (err, rows) => { 
        if (err) {
            throw err;
        };

        let result = JSON.parse(JSON.stringify(rows));

        // can only send back true or false
        bcrypt.compare(password, result[0].password, function(err, passwordResult) {
            res.send(passwordResult)
        });
    });

    connection.end();
});

// responds with all of the lobby info
app.get('/lobbydata', (req, res) => {
    console.log("used Lobby data");

    const lobby = req.query.id;

    let data = [];

    const sql = 'SELECT * FROM lobby, player WHERE lobby.lobby_id = ?'
    const connection = mysql.createConnection(dbconfig);
    connection.connect();

    connection.query(sql, [lobby], (err, rows) => {
        if (err) {
            throw err;
        }

        for (let row of rows) {
            let newData = {
                lobby: `${row.lobby_id}`, 
                subject: `${row.subject_id}`, 
                lobbyName: `${row.lobby_name}`, 
                date: `${row.game_date}`, 
                player: `${row.player_id}`, 
                banned: `${row.banned}`, 
                name: `${row.name}`, 
                points: `${row.points}`, 
                account: `${row.account}`
            }
            data.push(newData);
        }

        const builder = new XMLBuilder({
            arrayNodeName: 'lobbydata'
        });

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <lobbydata>
            ${builder.build(data)}
        </lobbydata>`;

        res.set('Content-Type', 'text/xml')
        res.send(xml);
    });

    connection.end();
});

// check if user exists, returns true or false, if true, returns what info were the same, else returns only false
app.post('/checkuser', (req, res) => {
    console.log("used Check user");

    const {user, email} = req.body;

    const sql = 'SELECT * FROM user WHERE username = ? OR email = ?';

    const connection = mysql.createConnection(dbconfig);
    connection.connect();

    connection.query(sql, [user, email], (err, rows) => {
        if (err) {
            throw err;
        }

        console.log(rows.length);

        // send back result, could be improved with better response. TODO: change res to http status code
        if (rows.length == 0) {
            res.status(200).json({"message": "No user found."});
        } else {
            res.status(400).json({"message": "Found user."})
        }
    });

    connection.end();
});

app.post('/createuser', (req, res) => {
    console.log("used Create user")

    console.log(req.body);

    const username = req.body.user;
    const password = req.body.password;
    const email = req.body.email;

    const connection = mysql.createConnection(dbconfig);
    connection.connect();

    let sql = 'INSERT INTO user (`username`, `password`, `email`) VALUES (?, ?, ?)'

    // check if all fields are valid
    if (username == undefined || password == undefined || email == undefined) {
        res.status(400).json({"message": "Something went wrong, undefined details in request"})
    } else {
        connection.query(sql, [username, password, email], (err, rows) => {
            if (err) {
                throw err;
            }
    
            res.status(201).json({"message": "User created successfully"})
        });
    }

    connection.end();
});

app.get('/getsubjects', (req, res) => {
    console.log("used Get subjects");

    const connection = mysql.createConnection(dbconfig);
    connection.connect();

    let sql = `SELECT subject_id, subject_title, subject_description, subject_image, username FROM subject INNER JOIN user ON subject.subject_author = user.user_id`

    connection.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }

        res.json(rows);
    });
    
    connection.end();
});

app.post('/createlobby', (req, res) => {
    console.log("used Create lobby")

    const name = req.body.name;
    const max_players = req.body.playercount;
    const subject = req.body.subject;
    const game_date = "2024-01-23" // TO DO: set game_date automatically to current date

    let sql = "INSERT INTO `lobby`(`subject_id`, `lobby_name`, `max_players`, `game_date`) VALUES (?,?,?,?);"

    // remove comment tags if issues with inserting empty names
    //if (!name) {
    //    sql = `INSERT INTO lobby('subject_id', 'max_players', 'game_date') VALUES (?, ?, ?)`
    //}

    const connection = mysql.createConnection(dbconfig);
    connection.connect();

    connection.query(sql, [subject, name, max_players, game_date], (err, rows) => {
        if (err) {
            throw err;
        }

        // send back lobby id to open up lobby page
        res.json({"lobbyId": rows.insertId});
    });

    connection.end();
});

app.listen(port, host, () => console.log(`Listening on ${host}:${port}`));
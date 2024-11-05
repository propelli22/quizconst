const express = require('express');
const {XMLBuilder, XMLParser, XMLValidator} = require('fast-xml-parser');
const mysql = require('mysql');
const dbconfig = require('./dbconfig.json');

const app = express();  
app.use(express.json());

const port = "4000";
const host = "localhost"; // runs on localhost to avoid external users access to database

// Obvious: checks password, return is it is correct or not, does not tell if the user is also correct etc.
app.get('/checklogin', (req, res) => {
    const user = req.query.user;
    const password = req.query.password;

    let result = [];

    const sql = 'SELECT password FROM user WHERE user_id = ?';

    const connection = mysql.createConnection(dbconfig);

    connection.connect();
    connection.query(sql, [user], (err, rows) => { 
        if (err) {
            throw err;
        };

        let result = JSON.parse(JSON.stringify(rows));

        if (result[0].password == password) {
            res.send(true);
        } else {
            res.send(false);
        };
    });

    connection.end();
});

// responds with all of the lobby info
app.get('/lobbydata', (req, res) => {
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
app.get('/checkuser', (req, res) => {
    const username = req.query.user;
    const email = req.query.user;

    const sql = 'SELECT username, email FROM user WHERE username = ? OR email = ?';

    const connection = mysql.createConnection(dbconfig);
    connection.connect();

    connection.query(sql, [username, email], (err, rows) => {
        if (err) {
            throw err;
        }

        if (rows[0].username) {
            res.json({"message": "username"})
        } else if (rows[0].email) {
            res.json({"message": "email"});
        } else if (rows[0].username && rows[0].email) {
            res.json({"message": "both"})
        } else {
            res.json({"message": "OK"})
        }
    });

    connection.end();
});

app.post('/createuser', (req, res) => {
    const username = req.body.user;
    const password = req.body.password;
    const email = req.body.email;

    const connection = mysql.createConnection(dbconfig);
    connection.connect();

    let sql = 'INSERT INTO user (`username`, `password`, `email`) VALUES (?, ?, ?)'

    if (username == undefined || password == undefined || email == undefined) {
        res.status(400).json({"message": "Something went wrong, undefined details in request"})
    } else {
        connection.query(sql, [username, password, email], (err, rows) => {
            if (err) {
                throw err;
            }
    
            res.json({"message": "User created successfully"})
        });
    }
});

app.listen(port, host, () => console.log(`Listening on ${host}:${port}`));
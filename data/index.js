const express = require('express');
const {XMLBuilder, XMLParser, XMLValidator} = require('fast-xml-parser');
const mysql = require('mysql');
const dbconfig = require('./dbconfig.json');

const app = express();  

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

app.listen(port, host, () => console.log(`${host}:${port} kuuntelee...`));
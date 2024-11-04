const express = require('express');
const {XMLBuilder, XMLParser, XMLValidator} = require('fast-xml-parser');
const mysql = require('mysql');
const dbconfig = require('./dbconfig.json');

const app = express();  

const port = "4000";
const host = "localhost"; // TODO: selvitä pitääkö pyöriä samalla osoitteella kuin web palvelin vai voiko pyöriä localhostina

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

app.listen(port, host, () => console.log(`${host}:${port} kuuntelee...`));
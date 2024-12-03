const express = require("express");
const { XMLBuilder } = require("fast-xml-parser");
const mysql = require("mysql");
const dbconfig = require("./dbconfig.json");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://10.18.7.64:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const port = "4000";
const host = "localhost"; // runs on localhost to avoid external users access to database

// Obvious: checks password, return is it is correct or not, does not tell if the user is also correct etc.
app.post('/checklogin', (req, res) => {
    console.log("used /checklogin");

  const { user, password } = req.body;

  const sql = `SELECT password FROM user WHERE username = ?`;

  const connection = mysql.createConnection(dbconfig);

  connection.connect();
  connection.query(sql, [user], (err, rows) => {
    if (err) {
      throw err;
    }

    let result = JSON.parse(JSON.stringify(rows));

    // can only send back true or false
    bcrypt.compare(
      password,
      result[0].password,
      function (err, passwordResult) {
        res.send(passwordResult);
      }
    );
  });

  connection.end();
});

// responds with all of the lobby info
app.get('/lobbydata', (req, res) => {
    console.log("used /lobbydata");

  const lobby = req.query.id;

  let data = [];

  const sql = `SELECT * FROM lobby, player WHERE lobby.lobby_id = ?`;
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
        account: `${row.account}`,
      };
      data.push(newData);
    }

    const builder = new XMLBuilder({
      arrayNodeName: "lobbydata",
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <lobbydata>
            ${builder.build(data)}
        </lobbydata>`;

    res.set("Content-Type", "text/xml");
    res.send(xml);
  });

  connection.end();
});

// check if user exists, returns true or false, if true, returns what info were the same, else returns only false
app.post('/checkuser', (req, res) => {
    console.log("used /checkuser");

  const { user, email } = req.body;

  const sql = `SELECT * FROM user WHERE username = ? OR email = ?`;

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
    console.log("used /createuser")

    console.log(req.body);

    const username = req.body.user;
    const password = req.body.password;
    const email = req.body.email;

    const connection = mysql.createConnection(dbconfig);
    connection.connect();

    let sql = `INSERT INTO user (username, password, email) VALUES (?, ?, ?)`

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

    console.log(rows.length);

    // send back result, could be improved with better response. TODO: change res to http status code
    if (rows.length == 0) {
      res.status(200).json({ message: "No user found." });
    } else {
      res.status(400).json({ message: "Found user." });
    }
  });

  connection.end();
});

app.post("/createuser", (req, res) => {
  console.log("used Create user");

  console.log(req.body);

  const username = req.body.user;
  const password = req.body.password;
  const email = req.body.email;

  const connection = mysql.createConnection(dbconfig);
  connection.connect();

  let sql = `INSERT INTO user (username, password, email) VALUES (?, ?, ?)`;

  // check if all fields are valid
  if (username == undefined || password == undefined || email == undefined) {
    res
      .status(400)
      .json({ message: "Something went wrong, undefined details in request" });
  } else {
    connection.query(sql, [username, password, email], (err, rows) => {
      if (err) {
        throw err;
      }

      res.status(201).json({ message: "User created successfully" });
    });
  }

  connection.end();
});

app.get("/getsubjects", (req, res) => {
  console.log("used Get subjects");

  const connection = mysql.createConnection(dbconfig);
  connection.connect();

  let sql = `SELECT subject_id, subject_title, subject_description, subject_image, username FROM subject INNER JOIN user ON subject.subject_author = user.user_id`;

  connection.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }

    res.json(rows);
  });

  connection.end();
});

app.post("/createlobby", (req, res) => {
  console.log("used Create lobby");

  const name = req.body.name;
  const max_players = req.body.playercount;
  const subject = req.body.subject;
  const game_date = "2024-01-23"; // TO DO: set game_date automatically to current date

  let sql = `INSERT INTO lobby (subject_id, lobby_name, max_players, game_date) VALUES (?,?,?,?);`;

  // remove comment tags if issues with inserting empty names
  //if (!name) {
  //    sql = `INSERT INTO lobby('subject_id', 'max_players', 'game_date') VALUES (?, ?, ?)`
  //}

  const connection = mysql.createConnection(dbconfig);
  connection.connect();

  connection.query(
    sql,
    [subject, name, max_players, game_date],
    (err, rows) => {
      if (err) {
        throw err;
      }

      // send back lobby id to open up lobby page
      res.json({ lobbyId: rows.insertId });
    }
  );

  connection.end();
});

// TODO for the main game data requests:
// - Improve responses
// - Add input validation
//
// Main game data requests, done with post to make access of data as hidden as possible

// untested
app.post('/getquestions', (req, res) => {
    console.log("used /getquestions");

    const subject = req.body.subjectId;

    const connection = mysql.createConnection(dbconfig);
    connection.connect();
    const sql = 'SELECT * FROM question WHERE subject_id = ?';

    connection.query(sql, [subject], (err, rows) => {
        if (err) {
            throw err;
        }

        res.json(rows);
    });

    connection.end();
});

app.post('/question', (req, res) => {
    console.log("used /question");

    const questionId = req.body.question;
    const subjectId = req.body.subject;

    const connection = mysql.createConnection(dbconfig);
    connection.connect();

    const sql = 'SELECT * FROM question WHERE question_id = ?'

    connection.query(sql, [questionId], (err, rows) => {
        if (err) {
            throw err;
        }

        if (rows[0].subject_id != subjectId) { 
            res.status(400).json({"message": "Something went wrong, please check input."})
        } else {
            res.json(rows);
        }
    });

    connection.end();
});

app.post('/playerresult', (req, res) => {
    console.log("used /playerresult");

    const player = req.body.playerId;
    const points = req.body.recivedPoints;

    const connection = mysql.createConnection(dbconfig);
    connection.connect();

    const sql = "UPDATE `player` SET `points`= points + ? WHERE player_id = ?";

    connection.query(sql, [points, player], (err, rows) => {
        if (err) {
            throw err;
        }

        res.status(200).json(rows); // improve response
    });

    connection.end();
});

// this looks like stupid code, and it probably is, so, TODO: maybe rewrite better
app.post('/questionready', (req, res) => {
    console.log("used /questionready");

    const player = req.body.playerId;
    const lobby = req.body.lobbyId;

    const connection = mysql.createConnection(dbconfig);
    connection.connect();
    const sql = "UPDATE `player` SET `ready`='1' WHERE player_id = ?";
    const sql2 = "SELECT * FROM player WHERE lobby_id = ?"
    let playersReady;

    // mark player as ready
    connection.query(sql, [player], (err, rows) => {
        if (err) {
            throw err;
        }
    });

    getReadyPlayers();

    // query is in the function so that it can be ran again later in the checkReadyPlayers loop
    function getReadyPlayers() {
        connection.query(sql2, [lobby], (err, rows) => {
            if (err) {
                throw err;
            }
    
            playersReady = rows;
        });
    }

    function allPlayersReady() {
        let totalReady = 0;
        getReadyPlayers();

        for (let i = 0; i < playersReady.length; i++) {
            if (playersReady[i].ready == 1) {
                totalReady++
            }
        }

        if (totalReady == playersReady.length) {
            clearInterval(checkIfAllReady);
            res.json({"message": "ALL READY"}) // improve response, add status
            connection.end();
        }
    }

    // every 1s, check if all is ready.
    const checkIfAllReady = setInterval(allPlayersReady, 1000);
});

// TODO: add logic to check if the last question was the last question of the subject, add to response if it was.
app.post('/results', (req, res) => {
    console.log("used /results");

    const lobby = req.body.lobbyId;
    const player = req.body.playerId;

    const connection = mysql.createConnection(dbconfig);
    connection.connect();
    const sql = "SELECT * FROM player WHERE lobby_id = ?";
    const sql2 = "UPDATE `player` SET `ready` = '0' WHERE player_id = ?";

    connection.query(sql, [lobby], (err, rows) => {
        if (err) {
            throw err;
        }

        res.status(200).json(rows); // improve response
    });

    // no need to respond back, sets players as not ready.
    // maybe run this before the other query in case this one throws an error?
    connection.query(sql2, [player], (err, rows) => {
        if (err) {
            throw err;
        }
    });

    connection.end();
});

// Get the time for the question based on questions ID

app.get("/time", (req, res) => {
  const time = req.query.question;
  let sql = `SELECT time, points FROM question WHERE question_id = ?`;

  console.log(time);
  const connection = mysql.createConnection(dbconfig);
  connection.connect();

  connection.query(sql, [time], (err, rows) => {
    if (err) {
      throw err;
    }

    rows.forEach((row) => {
      console.log(row.time, row.points);
    });
    res.json(rows);
  });
  connection.end();
});

// Get player name by player ID to display in admin panel and confirm ban/unban
app.get("/getPlayerName", (req, res) => {
  const playerId = req.query.id;
  const connection = mysql.createConnection(dbconfig);

  connection.connect();

  let sql = `SELECT name FROM player WHERE player_id = ?`;

  connection.query(sql, [playerId], (err, rows) => {
    if (err) {
      throw err;
    }

    res.json(rows);
  });

  console.log(playerId);

  connection.end();
});

app.post("/banPlayer", (req, res) => {
  const playerId = req.body.id;
  const connection = mysql.createConnection(dbconfig);
  let sql = `UPDATE player SET banned = 1 WHERE player_id = ?`;

  connection.connect();

  connection.query(sql, [playerId], (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(201).json({ message: "Player banned successfully" });
  });

  connection.end();
});

app.post("/unbanPlayer", (req, res) => {
  const playerId = req.body.id;
  const connection = mysql.createConnection(dbconfig);

  connection.connect();
  let sql = `UPDATE player SET banned = 0 WHERE player_id = ?`;
  connection.query(sql, [playerId], (err, rows) => {
    if (err) {
      throw err;
    }
    res.status(201).json({ message: "Player unbanned successfully" });
  });
  connection.end();
});

// run the server
app.listen(port, host, () => console.log(`Listening on ${host}:${port}`));

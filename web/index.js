const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'public'));

app.use(express.static(__dirname + '/public'));

const port = "3000";
const host = "localhost"; // TODO: selvitä ip osoite ja pyöritä palvelinta sillä osoitteella localhostin sijaan

app.listen(port, host, () => console.log(`${host}:${port} kuuntelee...`));
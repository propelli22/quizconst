const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

// import languages from json
const home_fi = require('./languages/home_fi.json')
const home_en = require('./languages/home_en.json')

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(__dirname + '/public'));

const port = "3000";
const host = "localhost"; // TODO: selvitä ip osoite ja pyöritä palvelinta sillä osoitteella localhostin sijaan

app.get('/', (req, res) => {
    const language = req.query.language;
    
    if (language == 'fi') {
        res.render('home', home_fi)
    } else if (language == 'en') {
        res.render('home', home_en)
    } else { // by default render the finnish verison
        res.render('home', home_fi)
    }
});

app.listen(port, host, () => console.log(`Listening on ${host}:${port}...`));
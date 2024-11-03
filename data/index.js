const express = require('express');
const {XMLBuilder, XMLParser, XMLValidator} = require('fast-xml-parser');
const mysql = require('mysql');
const dbconfig = require('./dbconfig.json');

const app = express();  

const port = "4000";
const host = "localhost"; // TODO: selvitä pitääkö pyöriä samalla osoitteella kuin web palvelin vai voiko pyöriä localhostina

app.listen(port, host, () => console.log(`${host}:${port} kuuntelee...`));
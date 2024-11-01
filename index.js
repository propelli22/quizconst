const express = require('express');
const {XMLBuilder, XMLParser, XMLValidator} = require('fast-xml-parser');
const mysql = require('mysql');
const dbconfig = require('./dbconfig.json');
const path = require('path');
const bcrypt = require('bcrypt');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));
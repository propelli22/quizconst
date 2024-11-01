const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));
const notes = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid');
const db = require('../db/db.json');

module.exports = notes;
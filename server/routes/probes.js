'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

// Visa utvecklare felåtgärdsmeddelanden
var DEBUG = true;
function showDbg() {
    if (DEBUG) {
        console.log.apply(this, arguments);
    }
}

router.get('/ph', function(req, res) {
    res.send('ph hit');
});

router.get('/ec', function(req, res) {
    res.send('ec hit');
});


    router.get('/tempuw', function(req, res) {
        res.send('tempuw hit');
    });

module.exports = router;

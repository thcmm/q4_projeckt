'use strict';

const express = require('express');
const app = express();
var db  = require('./knexdb');
require('dotenv').config(); // for Heroku
var bodyParser = require('body-parser');
const request = require('request');
var reqpromise = require('request-promise');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const probeData = require('./routes/probes'); // definera probes route
app.use('/probes', probeData); // set probes route

// (WORKING) Poll AVR API : Write to console
// setInterval(function test(){ // set 10 second delay between function calls
//     reqpromise('http://192.168.86.133')
//         .then(function (avrRestRes) {
//             let json = JSON.parse(avrRestRes);
//             console.log(json.variables.PH.EC);
//         })
//         .catch(function (err) {
//             console.log('Nada, inget tur gosse');
//         });
//
// }, 10000);


// ***************************************************************************
setInterval(function test(){ // set 10 second delay between function calls
    reqpromise('http://10.9.13.51')
        .then(function (avrRestRes) {
            let probeVals = JSON.parse(avrRestRes);
            console.log(probeVals.variables);
            // writeTodB(probeVals);
        })
        .catch(function (err) {
            // Write error to file/db
            // writeErrorToDB(JSON.stringifyh(error))
            console.log('Nada, inget tur gosse');
        });

}, 10000);

// *** MAKES SINGLE INSTERT ***
function writeTodB(probeVals) {
    var insertVars = probeVals.variables;
    // console.log(insertVars);

    db.insert(insertVars).into("probedata").then(function (id) {
        console.log(id);
    })
        .finally(function() {
            // db.destroy();
        });
}
// ***************************************************************************





// function writeTodB(probeVals) {
//     db('probedata')
//         .insert({
//             ph: probeVals.ph,
//             ec: probeVals.ec,
//             do: probeVals.do,
//             orp: probeVals.orp,
//             tempuw: probeVals.tempuw,
//             tempamb: probeVals.tempamb,
//             humidity: probeVals.humidity
//         });
//     // console.dir(probeVals);
// };

// START: CURRENT DEV ITEM
// setInterval(function test(){ // set 10 second delay between function calls
//     reqpromise('http://10.9.13.51')
//         .then(function (avrRestRes) {
//             let probeVals = JSON.parse(avrRestRes);
//             //console.log(probeVals.variables);
//             db('probedata')
//                 .insert({
//                     ph: probeVals.variables.ph,
//                     ec: probeVals.variables.ec,
//                     do: probeVals.variables.do,
//                     orp: probeVals.variables.orp,
//                     tempuw: probeVals.variables.tempuw,
//                     tempamb: probeVals.variables.tempamb,
//                     humidity: probeVals.variables.humidity
//                 }, ['id', 'ph', 'ec', 'do', 'orp', 'tempuw', 'tempamb', 'humidity', 'created_at'])
//         })
//         .then((response) => {
//         if (response[0] == undefined) {
//         console.log("**** f(POST): Error with POST request ****");
//         res.send("f(POST): Error with POST request");
//     } else {
//         res.send(response[0]);
//     }
// })
//     .catch((err) => {
//         //next(err);
//         console.log('Nada, inget tur gosse: ', err)
// });
//
// }, 10000);
// END: CURRENT DEV ITEM





const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening on port', port);
});

module.exports = app;

// WORKS
// setInterval(function test(){ // set 10 second delay between function calls
//     // console.log('bohoo');
//     request('http://192.168.86.133', function(err, res, body) {
//         console.log(body);
//     });
//
// }, 10000);

// IKE FUNGERAR
// function writeTodB(probeVals) {

    // console.log(probeVals.variables.ph);
    // console.log(probeVals.variables.ec);
    // console.log(probeVals.variables.do);
    // console.log(probeVals.variables.orp);
    // console.log(probeVals.variables.tempuw);
    // console.log(probeVals.variables.tempamb);
    // console.log(probeVals.variables.humidity);

//     db('probedata')
//         .insert({
//             ph: probeVals.variables.ph,
//             ec: probeVals.variables.ec,
//             do: probeVals.variables.do,
//             orp: probeVals.variables.orp,
//             tempuw: probeVals.variables.tempuw,
//             tempamb: probeVals.variables.tempamb,
//             humidity: probeVals.variables.humidity
//         }, ['id', 'ph', 'ec', 'do', 'orp', 'tempuw', 'tempamb', 'humidity', 'created_at'])
//         .then((response) => {
//         if (response[0] == undefined) {
//         showDbg("**** f(POST): Error with POST request ****");
//         res.send("f(POST): Error with POST request");
//     } else {
//         res.send(response[0]);
//     }
// })
// .catch((err) => {
//         next(err);
// });
// };

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Timeregistrering     = require('./app/models/data');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

router.route('/timeregistrering')
// create a timeregistrering (accessed at POST http://localhost:8080/api/timeregistrering)
    .post(function(req, res) {

        var timeregistrering = new Timeregistrering();
        timeregistrering.name = req.body.name;
        timeregistrering.fag = req.body.fag;
        timeregistrering.klasse = req.body.klasse;
        timeregistrering.oppmott = req.body.oppmott;

        // save the bear and check for errors
        timeregistrering.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'timeregistrering created!' });
        });

    })
    .get(function(req, res){
        res.json([
            { "id": 0, "navn": "Ola Nordmann", "klasse":"1a", "fag":"R1", "tid":"2016-11-04T08:24:00", "oppmott": true},
            { "id": 0, "navn": "Ola Nordmann", "klasse":"1a", "fag":"Norsk", "tid":"2016-11-04T10:15:00", "oppmott": true},
            { "id": 0, "navn": "Ola Nordmann", "klasse":"1a", "fag":"Gym", "tid":"2016-11-04T14:24:00", "oppmott": true},
            { "id": 1, "navn": "Kari Nordmann", "klasse":"1b", "fag":"Engelsk","tid":"2016-11-04T08:10:00", "oppmott": true},
            { "id": 1, "navn": "Kari Nordmann", "klasse":"1b", "fag":"Historie","tid":"2016-11-04T10:24:00", "oppmott": true},
            { "id": 1, "navn": "Kari Nordmann", "klasse":"1b", "fag":"R1","tid":"2016-11-04T14:10:00", "oppmott": true}
        ])
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// Database


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

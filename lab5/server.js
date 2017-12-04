const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const port = 8081;
const app = express();
const users = require('./routes/users');
const config = require("./config/database");

//COnnected to database
mongoose.connect(config.database);

//On connection 
mongoose.connection.on('connected', () => {
    console.log("Connected to db " + config.database);
});

//On db error
mongoose.connection.on('error', (err) => {
    console.log("Database " + err);
});

//CORS Middleware
app.use(cors());

//BodyParser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

//Reroute to users
app.use('/users', users);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Index Route
app.get('/', (req, res) => {
   res.send('Invalid Endpoint'); 
});

//Start server
app.listen(port, () =>{
    console.log('Server started on port ' + port);
});




// // BASE SETUP
// // =============================================================================

// // call the packages we need
// var express    = require('express');        // call express
// var app        = express();                 // define our app using express
// var bodyParser = require('body-parser');

// // configure app to use bodyParser()
// // this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// var port = 8082;        // set our port

// var mongoose   = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/nasa',{useMongoClient : true });

// var Account     = require('./models/account');

// // ROUTES FOR OUR API
// // =============================================================================
// var router = express.Router();              // get an instance of the express Router


// // middleware to use for all requests
// router.use(function(req, res, next) {
//     // do logging
//     console.log('Something is happening.');
//     next(); // make sure we go to the next routes and don't stop here
// });

// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });   
// });

// // more routes for our API will happen here

// // on routes that end in /bears
// // ----------------------------------------------------
// router.route('/accounts')

//     // create a account (accessed at POST http://localhost:8080/api/bears)
//     .post(function(req, res) {

//         var account = new Account();      // create a new instance of the Bear model
//         account.username = req.body.username;  // set the bears name (comes from the request)
//         account.password = req.body.password;

//         // save the bear and check for errors
//         account.save(function(err) {
//             if (err) {
//                 res.send(err);
//             }
            
//             res.json({ message: 'Account created!' });
//         });

//     })
    
//     // get all the bears (accessed at GET http://localhost:8080/api/bears)
//     .get(function(req, res) {
//         Account.find(function(err, accounts) {
//             if (err) {
//                 res.send(err);
//             }
//             res.json(accounts);
//         });
//     });

// // on routes that end in /bears/:bear_id
// // ----------------------------------------------------
// router.route('/accounts/:username')

//     // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
//     .get(function(req, res) {
//         res.setHeader("Access-Control-Allow-Origin","*");
//         Account.find({username: req.params.username}, function(err, account) {
            
//             if (err) {
//                 res.send(err);
//             }
//             res.json(account);
//         });
//     });
    
    
// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /api
// app.use('/api', router);

// // START THE SERVER
// // =============================================================================
// app.listen(port);
// console.log('Magic happens on port ' + port);
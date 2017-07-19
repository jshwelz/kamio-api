const express = require('express');
const mysql = require('mysql');

var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session')
var env = require('dotenv').load();

var app = express();
app.get('/', (req, res) => {
    res.send('Hello express');
});



var routesUser = require('./routes/user-routes.js');
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(passport.session()); // persistent login sessions
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", routesUser);



var models = require("./models/db");

require('./config/passport')(passport, models.credentials,models.users);
//require('./config/passport')(passport, models.users);

//Sync Database
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});
app.listen(3000);

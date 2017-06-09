var passport = require('passport');
//var Task=require('../models/test-model');
//var User = require('../models/user-model');
var jwt = require('jsonwebtoken');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


/*
module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};
*/


module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM credentials WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

};    



function generateJwt(_user){

 var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: _user.id,
    account: _user.account,
    token: _user.token,      
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NO
};

module.exports.login = function(req, res, next) {
 console.log(req.body.account);
 /*
 console.log(req.body.account);
   res.status(200);
      res.json({
        "token" : 'token'
      }); 
  return res;*/
  //console.log(req.params.account);
  passport.authenticate('local', function(err, user, info){
    var token;
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = generateJwt(user);      
      res.status(200);      
      res.json({
        "token" : token
      });
      //res.status(200).json(user);
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res, next);

};



module.exports.test = function(req, res) {
    //res.json(ex);  
    Task.getAllTasks(function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        } 
    });
};
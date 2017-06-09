
  //load bcrypt
  var bCrypt = require('bcrypt-nodejs');

  module.exports = function(passport,credentials){

  var Creds = credentials;
  var LocalStrategy = require('passport-local').Strategy;


  passport.serializeUser(function(user, done) {
          done(null, user.id);
      });


  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id).then(function(user) {
        if(user){
          done(null, user.get());
        }
        else{
          done(user.errors,null);
        }
      });

  });



    
  //LOCAL SIGNIN
  passport.use('local', new LocalStrategy(    
  {

  // by default, local strategy uses username and password, we will override with email
  usernameField : 'account',
  passwordField : 'token',
  //passReqToCallback : true // allows us to pass back the entire request to the callback
  },

  function(account, token, done) {
 
    var Creds = credentials;
    console.log('here '+account);
    
    var isValidPassword = function(userpass,password)   {
      return bCrypt.compareSync(password, userpass);
    }

    Creds.findOne({ where : { account: account}}).then(function (user) {
       //console.log(user);
      if (!user) {
        return done(null, false, { message: 'Email does not exist' });
      }

      /*
      if (!isValidPassword(user.password,password)) {

        return done(null, false, { message: 'Incorrect password.' });

      }*/

      var userinfo = user.get();

      return done(null,userinfo);

    }).catch(function(err){

      console.log("Error:",err);

      return done(null, false, { message: 'Something went wrong with your Signin' });


    });

  }
  ));

  }


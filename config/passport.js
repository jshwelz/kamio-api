
//load bcrypt
var bCrypt = require('bcrypt-nodejs');
var configAuth = require('./auth');

module.exports = function (passport, credentials, users) {

    var Creds = credentials;
    var User = users;
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });


    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            }
            else {
                done(user.errors, null);
            }
        });

    });


    //LOCAL SIGNIN
    passport.use('local', new LocalStrategy(
        {

            // by default, local strategy uses username and password, we will override with email
            usernameField: 'account',
            passwordField: 'token',
            //passReqToCallback : true // allows us to pass back the entire request to the callback
        },

        function (account, token, done) {

            var Creds = credentials;
            console.log('here ' + account);

            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            Creds.findOne({ where: { account: account } }).then(function (user) {
                //console.log(user);
                if (!user) {
                    return done(null, false, { message: 'Email does not exist' });
                }

                /*
                if (!isValidPassword(user.password,password)) {
          
                  return done(null, false, { message: 'Incorrect password.' });
          
                }*/
                var userinfo = user.get();

                return done(null, userinfo);

            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, { message: 'Something went wrong with your Signin' });


            });

        }
    ));

   
   
   
    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================



    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        enableProof: true,
        profileFields: ['id', 'emails', 'name']
    },
        // facebook will send back the token and profile
        function (token, refreshToken, profile, done) {
            console.log(profile);

            // asynchronous
            process.nextTick(function () {
                // find the user in the database based on their facebook id                

                Creds.findOne({ where: { account: profile.id } }).then(function (user) {
                    if (!user) {


                        var user =
                            {
                                slug: profile.first_name,
                                logins: 0,
                                email: profile.emails[0].value,
                                latest: 0,
                                created: 0,
                                updated: 0,
                                status: "pending"
                            };

                        User.create(user).then(function (newUserID, created) {
                            if (!newUserID) {
                                return done(null, false);
                            }

                            if (newUserID) {                                
                                var _id = newUserID.id;
                                var data =
                                    {
                                        user_id: _id,
                                        account: profile.id,
                                        token: token,
                                        secret: " ",
                                        type: "facebook"
                                    };
                                Creds.create(data).then(function (newUser, created) {
                                    if (!newUser) {
                                        return done(null, false);
                                    }

                                    if (newUser) {
                                        return done(null, newUser);
                                    }
                                });
                            }
                        });


                    } else {
                        var userinfo = user.get();
                        console.log(userinfo);
                        return done(null, userinfo);
                    }
                }).catch(function (err) {
                    console.log("Error:", err);
                    return done(null, false, { message: 'Something went wrong with your Signin' });


                });
            });

        }));






}






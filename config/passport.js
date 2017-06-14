
//load bcrypt
var bCrypt = require('bcrypt-nodejs');
var configAuth = require('./auth');

module.exports = function (passport, credentials) {

    var Creds = credentials;
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
        enableProof: true
    },
        // facebook will send back the token and profile
        function (token, refreshToken, profile, done) {
            console.log(profile);

            // asynchronous
            process.nextTick(function () {
                // find the user in the database based on their facebook id                

                Creds.findOne({ where: { account: profile.id } }).then(function (user) {
                    //console.log(user);
                    if (!user) {
                        var data =
                            {
                                user_id: 16,
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
                        // return done(null, false, { message: 'Email does not exist' });
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






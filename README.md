# kamio-api


Configuration Files
  config/config.json

change this to your environment configuration
"development": {
 
        "username": "root",
 
        "password": "admin11",
 
        "database": "hivestag_kamio_v56_gamma",
 
        "host": "127.0.0.1",

        "server": "localhost",        
 
        "dialect": "mysql"
 
    },


config/auth.json

  change this to your environment 
  var env = process.env.NODE_ENV || "localhost";

  change this to your fb App
	
	
	'facebookAuth': {
		'clientID': '468375303497625', // your App ID
		'clientSecret': '1f426ee239da586f1e63e14508a0b4fb', // your App Secret
		'callbackURL': 'http://' + config.server + ':3000/api/users/auth/facebook/callback'
	},




To run 
npm install 
node server.js


// config/auth.js
var env = process.env.NODE_ENV || "localhost";
var config = require("../config/config.json")[env];

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth': {
		'clientID': '468375303497625', // your App ID
		'clientSecret': '1f426ee239da586f1e63e14508a0b4fb', // your App Secret 
		'callbackURL': 'http://' + config.server + ':3000/api/users/auth/facebook/callback'
	},

	'twitterAuth': {
		'consumerKey': 'your-consumer-key-here',
		'consumerSecret': 'your-client-secret-here',
		'callbackURL': 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth': {
		'clientID': 'your-secret-clientID-here',
		'clientSecret': 'your-client-secret-here',
		'callbackURL': 'http://localhost:8080/auth/google/callback'
	}

};
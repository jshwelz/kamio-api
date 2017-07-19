var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({
	secret: 'MY_SECRET',
	userProperty: 'payload'
});


var ctrlAuth = require('../controllers/user-controller');

router.get('/test', ctrlAuth.test);

router.get('/profile', function (req, res) {
	res.status(200).json("sds");
});



router.get('/auth/facebook/callback', ctrlAuth.loginFb);
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.post('/', ctrlAuth.login);
//router.post('/auth/login', ctrlAuth.login);



module.exports = router;

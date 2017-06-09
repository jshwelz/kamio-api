var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


var ctrlAuth = require('../controllers/user-controller');



// authentication
//router.get('/all',  patientsController.getAll);
//router.get('/profile',  patientsController.getAll);
router.get('/test',ctrlAuth.test);
router.post('/', ctrlAuth.login);
//router.get('/user/:userid', auth, ctrlAuth.User);

/*
router.get('/users/', auth, ctrlAuth.Users);
router.post('/user', ctrlAuth.register);
*/

module.exports = router;

var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/createContact', indexController.createContact);

router.get('/getAllContacts', indexController.getAllContacts);

router.get('/getOneContact/:id', indexController.getOneContact);

router.post('/sendMessage', indexController.sendMessage);

router.get('/getMessageDetails', indexController.getMessageDetails);

module.exports = router;

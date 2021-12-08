var express = require('express');
var router = express.Router();
var Client = require('../model/client');
var LocalStorage = require('node-localstorage').LocalStorage;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("login.twig");
});

/*router.get('/findAll', function (req, res, next) {
  Client.find(function (err, data) {
    res.json(data);
  });
});*/

router.post('/findByFirstLastName', function (req, res, next) {
  Client.find({'login':req.body.login,'password':req.body.password},function (err, data) {
    console.log('JSON',JSON.stringify(data));
    if(JSON.stringify(data) === '[]')
      res.render("login.twig");
    else
      res.redirect("/");
  });
});

module.exports = router;

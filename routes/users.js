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
  localStorage = new LocalStorage('./scratch');
  var login = localStorage.setItem('login',req.body.login);
  Client.find({'login':req.body.login,'password':req.body.password},function (err, data) {
    console.log('JSON',JSON.stringify(data));
    if(JSON.stringify(data) === '[]')
      res.render("login.twig");
    else
      res.redirect("/?role="+data[0].role);
  });
});

router.post('/addUser', function(req, res, next) {
  var client = new Client({
    nom : req.body.nom,
    prenom : req.body.prenom,
    password : req.body.password,
    login : req.body.login,
    role : 'user'
  });
  console.log('client',client);
  client.save().then(function () {
    res.redirect("/?role=user");
  })
});

router.get('/signIn', function(req, res, next) {
  res.render("signIn.twig");
});

module.exports = router;

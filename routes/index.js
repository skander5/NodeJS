var express = require('express');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
var ClientFilm = require('../model/clientFilm');
var Film = require('../model/film');

/* GET home page. */
router.get('/', function(req, res, next) {
  localStorage = new LocalStorage('./scratch');
  var login = localStorage.getItem('login');
  Film.find(function (err, data) {
    res.render("filmList.twig",{data});
    });
});

router.get('/myFilm', function(req, res, next) {
  localStorage = new LocalStorage('./scratch');
  var login = localStorage.getItem('login');
  console.log("LLLOOOGIN",login);
  ClientFilm.find({'client.login': login}, function (err, data) {
    console.log('clienttt', data[0]);
    var dataFilm = data[0];
    res.render("listReservation.twig",{data});
  });
});

module.exports = router;

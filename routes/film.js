var express = require('express');
var router = express.Router();
var Client = require('../model/client');
var Film = require('../model/film');
var FilmClient = require('../model/clientFilm');

/* GET users listing. */
router.get('/reserver/:id', function(req, res, next) {
    console.log(req.params.id);
    var client = new Client();
    var film = new Film();

    Client.find({'login':'skd123'},function (err, dataclient) {
        client = dataclient;
    Film.find({'ref':'flm01'},function (err, data) {
        film = data;
        console.log('d',dataclient[0].login);
        var clientFilm = new FilmClient({
            client : {login:dataclient[0].login,nom:dataclient[0].nom,prenom:dataclient[0].prenom},
            film : {ref:data[0].ref,titre:data[0].titre,description:data[0].description,img:data[0].description}
        });
        console.log('data',clientFilm);
        clientFilm.save().then(function () {
            res.redirect("/myFilm");
        });
    });
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var Client = require('../model/client');
var Film = require('../model/film');
var FilmClient = require('../model/clientFilm');
var LocalStorage = require('node-localstorage').LocalStorage;
let alert = require('alert');

/* GET users listing. */
router.get('/reserver/:id', function(req, res, next) {
    console.log(req.params.id);
    var client = new Client();
    localStorage = new LocalStorage('./scratch');
    var login = localStorage.getItem('login');
    console.log('login from ls : '+login);



        FilmClient.find({'film.ref': req.params.id, 'client.login': login}, function (err, dataFilm) {
            console.log('dataFilmClient', dataFilm);
            if(dataFilm.length == 0) {
                Client.find({'login': login}, function (err, dataclient) {
                    client = dataclient;
                    Film.find({'ref': req.params.id}, function (err, data) {
                        var film = new Film(data[0]);
                        film.nbrRes = data[0].nbrRes + 1;
                        console.log('filmfffff',film);
                        film.save();
                        console.log('dataclient', dataclient[0].login);
                        console.log('dataFilm', data[0]);
                        var clientFilm = new FilmClient({
                            client: {login: dataclient[0].login, nom: dataclient[0].nom, prenom: dataclient[0].prenom},
                            film: {
                                ref: data[0].ref,
                                titre: data[0].titre,
                                description: data[0].description,
                                img: data[0].img
                            }
                        });
                        console.log('data', clientFilm);
                        clientFilm.save().then(function () {
                            res.redirect("/myFilm");
                            alert("Film réservé avec succès");
                        });
                    });
                });
            }
            else {
                alert("Déjà résevé");
                res.redirect("/myFilm");
            }
        });
});

router.get('/add', function(req, res, next) {
    res.render("addFilm.twig");
});

router.post('/save', function(req, res, next) {
    var film = new Film({
        ref:req.body.ref,
        titre:req.body.titre,
        description:req.body.desc,
        img:req.body.file,
        nbrRes:0
    });
    console.log('FILM',film);
    film.save().then(function () {
        res.redirect("/");
    })
});

router.get('/delete/:ref', function(req, res, next) {
    Film.find({'ref':req.params.ref},function (err, data) {
        console.log('delete',req.params.ref);
    }).deleteOne();
    FilmClient.find({'film.ref':req.params.ref},function (err, data) {
        console.log('delete',req.params.ref);
    }).deleteOne();
    res.redirect("/");
});

router.get('/deleteRes/:ref/:login', function(req, res, next) {
    FilmClient.find({'film.ref':req.params.ref,'client.login':req.params.login},function (err, data) {
        console.log('delete',req.params.ref);
        Film.find({'ref': req.params.ref}, function (err, dataFilm) {
            var film = new Film(dataFilm[0]);
            film.nbrRes = dataFilm[0].nbrRes - 1;
            console.log('filmfffff', film);
            film.save();
        });
    }).deleteOne();
    res.redirect("/myFilm");
});

module.exports = router;

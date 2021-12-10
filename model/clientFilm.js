var mongoose = require ("mongoose");
var Client = require('../model/client');
var Film = require('../model/film');
var Schema = mongoose.Schema;

var ClientFilm = new Schema({
    client : {nom:String, prenom:String, password:String, login:String},
    film : {titre:String, nbrRes:Number, description:String, img:String, ref : String}
});

module.exports = mongoose.model("film_client", ClientFilm);
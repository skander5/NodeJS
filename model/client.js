var mongoose = require ("mongoose");

var Schema = mongoose.Schema;

var Client = new Schema({
    nom : String,
    prenom : String,
    password : String,
    login : String,
    role : String
});

module.exports = mongoose.model("clients", Client);
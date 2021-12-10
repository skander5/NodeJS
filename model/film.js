var mongoose = require ("mongoose");

var Schema = mongoose.Schema;

var Film = new Schema({
    titre : String,
    nbrRes : Number,
    description: String,
    img: String,
    ref : String,
});

module.exports = mongoose.model("films", Film);
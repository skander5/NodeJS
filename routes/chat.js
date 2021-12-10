var express = require('express');
var router = express.Router();
var Client = require('../model/client');
var Film = require('../model/film');
var FilmClient = require('../model/clientFilm');
var LocalStorage = require('node-localstorage').LocalStorage;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var data = {name:'test data'}
let alert = require('alert');
router.get('/listContact', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    var login = localStorage.getItem('login');
    console.log('current login : '+login);
    Client.find({ 'login': 'nomen'},function (err, data) {
        res.render("contactList.twig",{data});
    });
});


app.get('/chatPage', function(req, res){
    res.sendFile(__dirname + '/chatTemplate.twig',{data});
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

/*http.listen(port, function(){
    console.log('listening on *:' + port);
});
*/


module.exports = router;

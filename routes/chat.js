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
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

let alert = require('alert');
const path = require("path");
router.get('/listContact', function(req, res, next) {
    localStorage = new LocalStorage('./scratch');
    var login = localStorage.getItem('login');
    console.log('current login : '+login);
    Client.find(function (err, data) {
        var json = JSON.stringify(data);
        var users = json;
       /* console.log("users json = "+users);*/
        console.log("data = "+data);
        users = data.filter((user) => { return user.login !== login });
        console.log(users);
        res.render("contactList.twig",{users});
    });
});


router.get('/chatPage/:login', function(req, res){
    localStorage = new LocalStorage('./scratch');
    var login = localStorage.getItem('login');
    var data = {username:login}

  //  res.render('chatTemplate.twig',{data});
    res.sendFile(__dirname + '/chatTemplate.html');
});

io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('chat message', function(msg,username){
        io.emit('chat message', msg,username);
    });
    socket.on('text typing', function(login){
        io.emit('text typing', login);
    });
    socket.on('exit text typing', function(login){
        io.emit('exit text typing', login);
    });
});
server.listen(3001, () => {  console.log('listening on *:3001');});

//server.listen(PORT, () => console.log(`Server running on port 3000`));

/*
app.get('/chatPage', function(req, res){
    console.log("directory = "+__dirname);
    res.sendFile(__dirname + '/chatTemplate.html');
});
*/




module.exports = router;

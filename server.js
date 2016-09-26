var express = require("express");
var app = express();
var path = require("path");

var mongoose = require("mongoose");
var configDB = require('./server/config/database.js');

mongoose.connect(configDB.url);

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var port = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'client', 'views'));

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/', function(req, res){
    res.render('index.ejs');
});

var api = express.Router();
require("./server/routes/api")(api);
app.use('/api', api);

app.get('/*', function(req, res){
    res.render('index.ejs');
});

app.listen(port, function(){
    console.log('SM OUR SERVER RUNNING. . . . PORT: ' + port);
})
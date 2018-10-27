var app = require('express')();
var http = require('http').Server(app);
var socket = require('./socket')(http);
var mongoose = require('mongoose');

const dbRoute = "mongodb://localhost:27017";

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

http.listen(8000, function(){	
  	console.log('listening on *:8000');
});

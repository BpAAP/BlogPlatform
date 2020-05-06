//IMPORTS & SETUP
const express = require("express");
const app = express();

var https = require('https');
var http = require('http');
var fs = require('fs');
const options={
	key: fs.readFileSync('./certificates/domain.key'),
	cert: fs.readFileSync("./certificates/domain.crt")
};

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));
app.set('view engine','ejs');

var mongoose    = require("mongoose");
mongoose.connect("mongodb://localhost/blog",{useNewUrlParser:true, useUnifiedTopology:true});

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

//ROUTES
app.get("/",function(req,res){
    res.send("This is a message from the server.");
});

https.createServer(options,app).listen(3000,function(){
    console.log("HTTPS server listening on port 3000");
});
http.createServer(app).listen(3001,function(){
    console.log("HTTP server listening on port 3001");
});
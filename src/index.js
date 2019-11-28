var express = require ('express'); 
var ejs = require('ejs');
var app = express(); 
app.get ("/", function (req,res) {
	res.render ( "hello.ejs" );	
	} );
app.listen(3000 , function () {
	console.log ("server is listening!!!");
} );
var express = require("express");
var app = express();

app.get("/", function (req, res) 
{
	res.send("A GET request to the root resource");
});

app.post("/", function (req, res) 
{
	res.send("A POST request to the root resource");
});

app.head("/", function (req, res) 
{
	res.send("A HEAD request to the root resource");
});

var server = app.listen(5000, "127.0.0.1", function()
{
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Listening on http://%s:%s", host, port)
})
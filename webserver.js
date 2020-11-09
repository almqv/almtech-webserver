const http = require("http");
const fs = require("fs");
const express = require("express");

// Webserver stuff
const port = 8080; // port 80 will be routed to this port
const server = express()

const clientdir = __dirname + "/client"

server.use( express.static(clientdir) ); // all of the shared client files

server.get("/", function(req, res) { // root directory for the website
	var curdate = new Date();
	var debug = "[" + curdate.toISOString() + "] HTTP Get: " + req.connection.remoteAddress; // create a string for the debug

	fs.appendFile("logs/connections.log", debug + "\n", function(err){ if(err) throw err; }); // append the logs
	console.log(debug);
	res.sendFile(__dirname + "/index.html"); // load index.html
});

server.get("*", function(req, res) {
	res.sendFile(__dirname + "/404.html");
});

var http_webserver = http.createServer(app);
// TO DO: Add https


http_webserver.listen(port,() => {
	console.log("Server running on port %d", port);
});

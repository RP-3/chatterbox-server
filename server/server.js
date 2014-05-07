var handleRequest = require('./request-handler.js').handleRequest;
var parseUrl = require('url');
var fs = require('fs');
var http = require("http");
var port = process.env.PORT || 3000;
var ip = process.env.IP || "127.0.0.1";

var root = '/client/client/index.html';
var base = '/client/client';

var returnIndex = function(request, response, path){

	if(path === "/"){ path = root; }else
	{ path = base + path; }

	fs.readFile(path, function(err, data){
		if (err){ 
			response.writeHeader(404);
			response.end("file not found");
		}else{
			response.writeHeader(200);
			response.write(data);
		    response.end();
		}
	});
}

var server = http.createServer(function(request, response){
	var path = parseUrl.parse(request.url);

	if(path.pathname === "/messages"){
		handleRequest(request, response);
	}else{
		returnIndex(request, response, path.pathname);
	}
});

server.listen(port, ip);

/* To start this server, run:
     node basic-server.js
 *  on the command line.

 * To connect to the server, load http://127.0.0.1:8080 in your web
 * browser.

 * server.listen() will continue running as long as there is the
 * possibility of serving more requests. To stop your server, hit
 * Ctrl-C on the command line. */

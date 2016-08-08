//First Program - Hello World Server

var http = require('http');
http.createServer(function (req, res) {
	// body...
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
	//res.end('Karthik\n');
}).listen(3000,"127.0.0.1");

console.log('Server running at http://127.0.0.1:3000/');
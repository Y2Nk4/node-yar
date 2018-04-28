var http = require('http');
var protocol = require('./protocol.js');
var YarConfig = require('./config.js');
var ProtocolHandler = new protocol();

module.exports = function(ListenPort = 80,callback){
	var server = http.createServer(function(req, res) {
		req.on('data', function(chunk) {
			
			var YarPackager = ProtocolHandler.unpack(chunk);
			return callback(YarPackager,function(Body){
				console.log(Body);
				var ResponseChunk = ProtocolHandler.pack(Body,YarPackager['Package_Name']);
				res.writeHead(200,{"Content-Type":"application/octet-stream"});
				res.write(ResponseChunk);
				res.end();
				
			});
		});
	});
	server.listen(ListenPort);
};


var randomRangeNumber = function(minNumber, maxNumber) {
      var range = maxNumber - minNumber;
      var random = Math.random();
      return minNumber + Math.round(random * range); 
}

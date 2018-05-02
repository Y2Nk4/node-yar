var http = require('http');
var protocol = require('./protocol.js');
var bufferProcess = require('./bufferProcesser.js');
var YarConfig = require('./config.js');

module.exports = function(ListenPort = 80,callback){
	var server = http.createServer(function(req, res) {
		var bufferProcesser = new bufferProcess();
		req.on('data', function(chunk) {
			bufferProcesser.add(chunk);
		});
		
		req.on('end',function(){
			var data = bufferProcesser.toBuffer();
			
			var YarPackager = protocol.unpack(data);
			return callback(YarPackager,function(Body){
				var ResponseChunk = protocol.pack(Body,YarPackager['Package_Name']);
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

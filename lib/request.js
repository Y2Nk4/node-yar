var http = require("http");
var https = require("https");
var { URL } = require("url");
var bufferProcess = require('./bufferProcesser.js');
var protocol = require('./protocol.js');

module.exports = function(){
	this.request = function(addr, data, callback, header = {}){
		var bufferProcesser = new bufferProcess();
		
		var URLoptions = new URL(addr);
		var defaultHeader = {'Content-Type': 'application/octet-stream', 'Content-Length': Buffer.byteLength(data)};
		var options = {
			hostname: URLoptions.hostname,
			port: URLoptions.port,
			path: URLoptions.pathname,
			protocol: URLoptions.protocol,
			method: 'POST',
		};
		options['headers'] = Object.assign(defaultHeader, header);
		console.log(options);
		if(options.protocol == "http:"){
			var req = http.request(options, function(res){
				res.on('data', (chunk) => {
					bufferProcesser.add(chunk);
				});
				res.on('end', () => {
					var ResData = bufferProcesser.toBuffer();
					console.log(ResData);
					var YarPackage = protocol.unpack(ResData);
					return callback(YarPackage);
				});
			});
			req.on("error",function(err){
				throw new Error("An Error While Request the Server:" + err);
			});
			req.write(data);
			req.end();
		}else if(options.protocol == "https:"){
			var req = https.request(options, function(res){
				res.setEncoding('utf8');
				res.on('data', (chunk) => {
					bufferProcesser.add(chunk);
				});
				res.on('end', () => {
					var ResData = bufferProcesser.toBuffer();
					var YarPackage = protocol.unpack(ResData);
					return callback(YarPackage);
				});
			});
			req.on("error",function(err){
				throw new Error("An Error While Request the Server:" + err);
			});
			req.write(data);
			req.end();
		}else{
			throw new Error("Request HTTP Protocol Error");
		}
	}
};
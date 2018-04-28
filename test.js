//var yar_client = require("./index.js");
//var _ = require('c-struct');
var yar = require("./lib/yar.js");
var ServerObj = function(){
	this.cc = function(){
		return "Hi,cc";
	};
	this.some_method = function(){
		return "I am the callback";
	};
};
var YarService = new yar(ServerObj);
YarService.listen(8001);
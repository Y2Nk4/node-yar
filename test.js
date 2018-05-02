//var yar_client = require("./index.js");
//var _ = require('c-struct');
var yar = require("./index.js");
var ServerObj = function(){
	this.cc = function(){
		return "Hi,cc";
	};
	this.some_method = function(){
		return "I am the callback";
	};
};
//var YarService = new yar.yar_server(ServerObj);
//YarService.listen(8001);
var yar_client = new yar.client("http://192.168.1.16/Yar/server.php");
/*
 * Need to input the callback function first
 */
yar_client.abc(function(err,result){
	console.log(err);
	console.log(result);
},"x",2);
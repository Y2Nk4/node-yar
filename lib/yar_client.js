var requestHandler = require("./request.js");
var protocol = require("./protocol.js");
var request = require("./request.js");
var reqHandler = new request();

var clientObj = function(apiAddr, packager = "JSON"){
	this.apiAddr = apiAddr;
	this.packager = packager;
	this.defaultOpt = {
		YAR_OPT_HEADER: [],
	};
	this.setSetOpt = function(optName,optValue){
		this.defaultOpt[optName] = optValue;
	}
	/*
	 * Use __call function to set methodName in the new function and call it back.
	 */
	this.__call = function(method){
		return (function(callback, ...args){
			this._method = method;
			console.log(...args);
			console.log(args);
			var data = protocol.pack({
				i: (Date.now() / 1000).toFixed(0),
				m: this._method,
				p: args,
			},packager);
			reqHandler.request(this.apiAddr, data, function(YarPackage){
				console.log(YarPackage);
				/*
				 * Use Proxy to catch the undefined items and return null
				 */
				PackageContent = new Proxy(YarPackage['Body'],{
					get: function(target, key, receiver) {
						if(target[key] !== undefined){
							return target[key];
						}else{
							return null;
						}
					}
				});
				/*
				 * callback(Err, result[, id [, status [, output]]])
				 */
				return callback(PackageContent['e'], PackageContent['r'], PackageContent['i'], PackageContent['s'], PackageContent['o']);
			});
		});
	}
}

module.exports = function(apiAddr, packager = "JSON"){
	this.apiAddr = apiAddr;
	this.packager = packager;
	return new Proxy((new clientObj(apiAddr, packager)),{
			get: function(target, key, receiver) {
				if(target[key] !== undefined){
					return target[key];
				}else{
					return target.__call(key);
				}
				
			}
		}
	);
};

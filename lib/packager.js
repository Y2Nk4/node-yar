
var PackagerParses = {
	PackagerInterface: function(){
		this.pack = function(){
			throw new Error("Packager Class is not exist or doesn't provide a pack method");
			return;
		};
		this.unpack = function(){
			throw new Error("Packager Class is not exist or doesn't provide a unpack method");
			return;
		};
	},

	JSONPackager: function(){
		this.unpack = function(pkg){
			if(!Buffer.isBuffer(pkg)){
				throw new Error("Param pkg is not a Buffer Object");
				return;
			}
			try{
				return JSON.parse(pkg.toString("utf-8", 0, pkg.length));
			}catch(err){
				console.log(err);
				throw new Error("Param pkg is invalid to parse in JSONPackager");
				return;
			}
		};
		
		this.pack = function(pkg){
			if(typeof(pkg) != "object"){
				throw new Error("Param pkg is not an Object");
				return;
			}
			try{
				return JSON.stringify(pkg);
			}catch(err){
				console.log(err);
				throw new Error("Param pkg is invalid to parse in JSONPackager");
				return;
			}
		};
	},
	
	MsgPackPackager: function(){
		this.unpack = function(pkg){
			
		};
		this.pack = function(pkg){
			if(typeof(pkg) != "object"){
				throw new Error("Param pkg is not an Object");
				return;
			}
		}
	},
};
PackagerParses.JSONPackager.prototype = new PackagerParses.PackagerInterface();

module.exports = function(Packager_Name){
	var ClassName = Packager_Name.toUpperCase() + "Packager";
	/* global 会造成全局污染 */
	if(PackagerParses[ClassName] === undefined || typeof(PackagerParses[ClassName]) != "function"){
		throw new Error("Packager Parser is not exist");
		return;
	}
	return new Proxy(new PackagerParses[ClassName](),{
			get: function(target, key, receiver) {
				return target[key];
			}
		}
	);
}

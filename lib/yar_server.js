var response = require("./response.js");

module.exports = function(ServiceOBJ){
	var ModuleSelf = this;
	this.ServiceOBJ = ServiceOBJ;
	this.listen = function(Port){
		var res = new response(Port, function(Yar_Packager, callback){
			var Yar_Body = Yar_Packager['Body'];
			//var method = Body.
			try{
				if(typeof(ModuleSelf.ServiceOBJ) == "object"){
					ModuleSelf.ServiceOBJ = ModuleSelf.ServiceOBJ;
				}else if(typeof(ModuleSelf.ServiceOBJ) == "function"){
					ModuleSelf.ServiceOBJ = new (ModuleSelf.ServiceOBJ)();
				}else{
					throw new Error("Method Doesn't Exist");
				}
				var method = Yar_Body['m'];
				var parameter = Yar_Body['p'];
				var result = ((ModuleSelf.ServiceOBJ)[method])(...parameter);
				callback({
					i: (Date.now() / 1000).toFixed(0),
					s: 0,
					r: result,
					e: "",
				});
			}catch(err){
				callback({
					i: (Date.now() / 1000).toFixed(0),
					s: 0,
					r: "",
					e: err.message
				});
			}
		});
	}
}
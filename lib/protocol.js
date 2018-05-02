var Packager = require('./packager.js');
var YarConfig = require("./config.js");

module.exports = {
	Package_Header_Struct: {
		id: null, //unsigned int32 4Bytes
		version: null, //unsigned short 2Bytes
		magic_num: null, //unsigned int32 4Bytes
		reserved: null, //unsigned int32 4Bytes
		provider: null, //unsigned char 32Bytes
		token: null, //unsigned char 32Bytes
		body_len: null, //unsigned int32 4Bytes
	},
	
	pack: function(packageBody,Packager_Name = "JSON"){
		var PackagerBodyBuffer = new Buffer(new Packager(Packager_Name).pack(packageBody));
		var Yar_Body_Len = PackagerBodyBuffer.length;
		var Yar_Packager_Name = new Buffer(8);
		Yar_Packager_Name.write(Packager_Name,0,8,"utf-8");
		var Yar_Header = new Buffer(82);
		
		Yar_Header.writeUInt32BE(randomRangeNumber(0,99999999),0);
		Yar_Header.writeUInt16BE(1,4);
		Yar_Header.writeUInt32BE(0x80DFEC60,6);//Magic_Num
		Yar_Header.writeUInt32BE(0,10);//reserved
		Yar_Header.write(YarConfig['Yar_Provider'],14,32,"utf-8");//provider
		Yar_Header.write("",46,32,"utf-8");//token
		var Response_body_len = Yar_Body_Len + 8;
		Yar_Header.writeUInt32BE(Response_body_len,78);
		
		var Yar_Package = new Buffer(90 + Yar_Body_Len);
		Yar_Header.copy(Yar_Package,0);
		Yar_Packager_Name.copy(Yar_Package,82);
		PackagerBodyBuffer.copy(Yar_Package,90);
		return Yar_Package;
	},
	
	/*
		Params:
			pkg - the Buffer Object of the data
		Callback:
			Obj - the Obj of the Package
	 */
	unpack: function(pkg){
		if(!Buffer.isBuffer(pkg)){
			//to check if the pkg is a Buffer obj.
			throw new Error('Param pkg is not a Buffer Obj');
			return;
		}
		if(pkg.length <= 90){
			//90 is the length of the Yar Protocol.
			throw new Error("Param pkg's length is invalid");
			return;
		}
		
		//some variable
		var Pkg_Len = pkg.length;
		var Pkg_Yar_Header = new Buffer(82);
		
		//get info from the pkg buffer Obj
		pkg.copy(Pkg_Yar_Header,0,0,81);//Yar_Header Starts from 0 to 81, 82 Bytes
		
		var Pkg_Yar_Body_Len = Pkg_Yar_Header.readUInt32BE(78);
		if(Pkg_Yar_Body_Len >= 2*1024*1024){
			throw new Error("The body length of the pkg is too large(More than 2Gb)");  
			return;
		}
		if(Pkg_Yar_Body_Len == 0){
			//Note: In my test, the body_len in the header is empty in the standard Yar-Package from the offical PHP-Module.
			Pkg_Yar_Body_Len = Pkg_Len - 90;
		}
		var Packager_Name = pkg.toString("utf-8",82,90).trim().replace(/\0/g, '');//删除空字节
		Pkg_Yar_Body = new Packager(Packager_Name).unpack(copyBuffer(pkg,90,Pkg_Yar_Body_Len));
		
		
		var Package = {
			Header: {
				id: Pkg_Yar_Header.readUInt32BE(0),
				version: Pkg_Yar_Header.readUInt16BE(4),
				magic_num: Pkg_Yar_Header.readUInt32BE(6),
				provider: Pkg_Yar_Header.toString("utf-8",14,45).trim().replace(/\0/g, ''),
				token: Pkg_Yar_Header.toString("utf-8",46,77).trim().replace(/\0/g, ''),
				body_len: Pkg_Yar_Header.readUInt32LE(78),
			},
			Packager_Name: Packager_Name, //Packager_Name Starts From 82 to 90, Char[8 bytes]
			Body: Pkg_Yar_Body
		};
		return Package;
	}
}

var randomRangeNumber = function(minNumber, maxNumber) {
    var range = maxNumber - minNumber; //取值范围的差
    var random = Math.random(); //小于1的随机数
    return minNumber + Math.round(random * range); //最小数与随机数和取值范围求和，返回想要的随机数字
}

var copyBuffer = function(OriginBuffer,offset = 0,length = 0,targetOffset = 0){
	var tempBuffer = new Buffer(length);
	OriginBuffer.copy(tempBuffer,targetOffset,offset,offset + length);
	return tempBuffer;
}
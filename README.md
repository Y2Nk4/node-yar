# node-yar
**在Node.JS上实现鸟哥的YAR远程调用**

# About
### **本模块尚未完成且未在NPM上发布**

# TODO
- 实现Client功能 √(初步实现)
- 添加MSGPack解码器
- 修复无法读取Yar_Header的Body_Len的问题

# Usage
#### 1.Download the Yar Module and put it to the node_modules folder.
#### 2.Require the Module.
```
  var yar = require("Yar");
```
#### 3.instantiate the Yar_Server or Yar_Client
##### Server
```
  var ServerObj = var ServerObj = function(){
	  this.some_method = function(){
	  	return "call the some_method";
	  };
  };//If it's a class and was not instantiated yet, the Yar_Server will instantiate it for you.
  
  var YarServer = new yar.yar_server(ServerObj);//instantiate the Yar_Server with the service object
  YarServer.handle();//let Yar_Server to handle the request
```
#### Client
```
  var yar_client = new yar.client("http://192.168.1.16/Yar/server.php");//instantiate the Yar_Client with the YAR_Server Address.
  yar_client.some_method(function(err,result){
	  console.log(err);
	  console.log(result);
  },someParams);
  //The Callback function comes first
```

# Detail
## Class
##### 引用Yar后，返回的对象将会提供两个类供实例化，分别是Yar的server和client。
```
  var yar = require("Yar");
  var yar_client = new yar.client("http://192.168.1.16/Yar/server.php");
```
### **client** (Constructor)
#### Method
- `Constructor([Address])` - The Constructor of Yar_Client Class
  - `Address` - The address of the Yar_Server that you want to call.
  
- `setOpt([optionName][optionValue])` - Set Yar Request options
  - `optionName` - The name of option which you want to set.
  - `optionValue` - The value of option which you want to set.
### **server** (Constructor)
#### Method
- `Constructor([ServiceObj])` - The Constructor of Yar_Server Class
  - `ServiceObj` - The Object which is provided to call by the YAR Request

- `handle(port)` - To let YAR_Server handle the Yar Request from the network. **You need to call it to let Yar Module response the Yar Request**
  - `port` Optional, The default value is `80`. If you want to use another port, please make sure that the port is not used by other program. `port` should be an integer.
  
# Other Yar Projects
### PHP
- laruence / yar - https://github.com/laruence/yar
- Yar纯PHP实现 - https://github.com/laruence/yar/pull/20/commits/d45fbd210ba043441fb1b9956383b65cfeb13375

### C
- laruence / yar-c - https://github.com/laruence/yar-c

### Java
- zhoumengkang / yar-java-client - https://github.com/zhoumengkang/yar-java-client

### Go
- gyf19 / yar-go - https://github.com/gyf19/yar-go
- neverlee / goyar https://github.com/neverlee/goyar

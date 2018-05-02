# node-yar
**在Node.JS上实现鸟哥的YAR远程调用**

# 关于
**本模块尚未完成且未在NPM上发布**

# TODO
- 实现Client功能 √(初步实现)
- 添加MSGPack解码器
- 修复无法读取Yar_Header的Body_Len的问题

# 使用方法
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
  
- `setSetOpt([optionName][optionValue])` - Set Yar Request options
  - `optionName` - The name of option which you want to set.
  - `optionValue` - The value of option which you want to set.
### **server** (Constructor)


# 相关项目
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

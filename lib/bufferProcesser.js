module.exports = function(){
	this._data = [];
	this._data_size = 0;
	var _ModuleSelf = this;
	this.add = function(inBuffer){
		_ModuleSelf._data.push(inBuffer);
		_ModuleSelf._data_size += inBuffer.length;
	};
	this.toBuffer = function(){
		var data = null;  
		switch(_ModuleSelf._data.length) {  
			case 0: data = new Buffer(0);  
		break;
			case 1: data = _ModuleSelf._data[0];  
		break;
		default:
			data = new Buffer(_ModuleSelf._data_size);  
			for (var i = 0, pos = 0, l = _ModuleSelf._data.length; i < l; i++) {  
				var chunk = _ModuleSelf._data[i];  
				chunk.copy(data, pos);  
				pos += chunk.length;  
			}
		break;  
		}
		return data;
	}
}
module.exports = function(ErrorContent){
	this.prototype = new Error();
	this.msg = ErrorContent;
	return this;
}
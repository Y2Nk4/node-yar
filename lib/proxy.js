module.exports = function(Class){
	return new Proxy(Class,{
			get: function(target, key, receiver) {
				console.log(target, key, receiver);
				return function(){
					
				};
			}
		}
	);
}
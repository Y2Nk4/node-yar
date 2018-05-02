var newPorxy = new Proxy({
	a: function(a){
		console.log(a);
		return;
	},
},{
	
	apply(target, ctx, args) {
		console.log(ctx);
		return;
        return Reflect.apply(...arguments);  
    }
	
});
newPorxy.b("hi");
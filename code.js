var width=window.innerWidth,
	height=window.innerHeight,
	interval=200;


function init() {
	var canvas = d3.select("body").append("svg").attr("width",width).attr("height",height).style("background","lightblue")
	
	var raindrop = raindropFactory()
		.color("white")
		.backgroundColor(canvas.style("background"))
		.lifeSpan(1000)


	setInterval(()=>{
	// var	a=canvas.selectAll("g").data(raindrop.createRaindropData(5,width,height,5,30))
	// 	a.enter().append("g")
	// 		.merge(a)
	// 			.call(raindrop)
	// 	.exit()
	// 		.remove()

		canvas.call(raindrop)

	},interval)
}




function raindropFactory(){
	var color="blue",
		backgroundColor="white",
		lifeSpan = 500;

	function raindrop(selection){
		var a=selection.selectAll("circle.raindrops").data(raindrop.createRaindropData(20,width,height,5,30))

			a.enter().append("circle").attr("class","raindrops")
				.attr("stroke",color)
				.attr("stroke-width",4)
				.attr("fill","none")
				.attr("cx",(d)=>d.x)
				.attr("cy",(d)=>d.y)
				.attr("r",0)
				.merge(a)
					.transition().duration(lifeSpan).ease(d3.easePolyOut,4)
					.attr("stroke",backgroundColor)
					.attr("r",(d)=>d.size)
			a.exit()
				.remove()

	}

	function raindrop1(selection){
		selection.each((data,i,sel)=>{
			var drops = d3.select(sel[i]).selectAll("circle").data([data],(d)=>d.x);
			drops.enter()
				.append("circle")
				.attr("stroke",color)
				.attr("stroke-width",4)
				.attr("fill","none")
				.attr("cx",(d)=>d.x)
				.attr("cy",(d)=>d.y)
				.attr("r",0)
				.merge(drops)
					.transition().duration(lifeSpan).ease(d3.easePolyOut,4)
					.attr("stroke",backgroundColor)
					.attr("r",(d)=>d.size)

			drops.exit()
				.remove()


		});
	}
	raindrop.color = function(value) {
		if(!arguments.length){return(color);} else{color=value}
		return(raindrop);
	}
	raindrop.backgroundColor = function(value) {
		if(!arguments.length){return(d3.color(backgroundColor));} else{backgroundColor=d3.hsl(value);backgroundColor.opacity=0.0}
		return(raindrop);
	}
	raindrop.lifeSpan = function(value) {
		if(!arguments.length){return(lifeSpan);} else{lifeSpan=value}
		return(raindrop);
	}
	raindrop.createRaindropData = function(n,w,h,sizemin=5,sizemax=30){
		var source=[]
		for(var i=0;i<n;++i){
			source.push({x:Math.random()*w,y:Math.random()*h,size:sizemin+Math.random()*(sizemax-sizemin)})		
				if(Math.random()>0.9){			
					var x=Math.floor(Math.random()*source.length)
					source = source.splice(x)	
				}
		}
		return(source)
	}
	return(raindrop);
}


"use strict"
window.Commando = (function(){
	function Commando(x, y){
		this.x = x;
		this.y = y;
		this.speed = GetRandInt(20, 100);
		this.grabbed = false;
		this.update = function(dt){
			if(!this.grabbed){
				this.x += this.speed * dt;
				if(this.x <= 0 || this.x > PLAYING_WIDTH){
					this.speed *= -1;
				};
			};
		};
		
		this.draw = function(){
			ctx.fillStyle = "blue";
			ctx.fillRect(this.x,this.y,40,90);
		};
	};
	return Commando;
})();

//factory that produces the commandos for the claw machine
function CommandoFactory(){
	var count = 1;
	var units = new Array();
	var rates = [0,0,0,0];
	switch(game.level){
		case 1: 
			rates = [100, 0, 0, 0];
			count = GetRandInt(2, 5);
			break;
		case 2: 
			rates = [100, 40, 20, 0];
			count = GetRandInt(2, 5);
			break;
		case 3: 
			rates = [100, 60, 40, 20];
			count = GetRandInt(2, 5);
			break;
		case 4: 
			rates = [100, 60, 40, 20];
			count = GetRandInt(2, 5);
			break;
	}
	console.log("count - " + count);
	while(units.length < count){
		var chance = GetRandInt(0, 100);
		//make commando add to array
		//select type based on chance starting at the hardest to spawn to the easiest
		for(var i = rates.length - 1; i > -1; i--){
			if(rates[i] >= chance){
				units.push(MakeCommando( i ));
				break;
			};
		};
	};
	return units;
}

//Factory method that creates a commando
function MakeCommando(type){
	console.log("make commando - " + type);
	var unit = new Commando( GetRandInt(10,PLAYING_WIDTH), CANVAS_HEIGHT - 250);
	return unit;
}


"use strict";

//At enemy death, a number pops out of them. This handles that number
window.NumPop = (function(){
	function NumPop(x,y,num,level){
		//vars
		this.x = x;
		this.y = y;
		this.startX = x;
		this.startY = y;
		this.num = num;
		this.alpha = 1;
		this.level = level;
		
		//Updates the possition of the number
		this.update = function(){
			//increments the y and the alpha
			this.y -=1
			if(!level){
				this.alpha -=.02;
			}else{
				this.alpha -=.01;	
			};
			//If the alpha is 0, the number is removed from the array by returning true to the game.update function
			if(this.alpha <= 0){
				return true;	
			};
		};
		
		//Draws the number
		this.draw = function(){
			if(!this.level){
				var textDraw = "$" + this.num;
				ctx.font = '20px Arista Light';
				ctx.fillStyle = "rgba(233,29,196," + this.alpha + ")";
				ctx.fillText(textDraw,this.x,this.y);
			}else{
				var textDraw = "WAVE COMPLETE";
				ctx.font = '100px Arista Light';
				ctx.fillStyle = "rgba(233,29,196," + this.alpha + ")";
				ctx.fillText(textDraw,this.x,this.y);	
			}
			ctx.font = '17px Arista Light';
		};
	}
	return NumPop;
})();
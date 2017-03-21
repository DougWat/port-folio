"use strict";

//Renders the background stuff
window.Background = (function(){
	function Background(){
		
		//The grids (and stars)
		this.grid01 = {x:0,y:0,scale:1.2,turn:false,alpha:1, alphaTurn: false};
		this.grid02 = {x:-10,y:-10,scale:1.2,turn:false,alpha:1,alphaTurn: false};
		this.grid03 = {x:0,y:0,scale:1.2,turn:false,alpha:1,alphaTurn: false};
		this.stars = {x:-5,y:-5,scale:1,turn:false,alpha:1,alphaTurn: false};
		
		//The scanlines
		this.scanlines = {y1:-CANVAS_HEIGHT,y2:0,y3:CANVAS_HEIGHT, y4:-CANVAS_HEIGHT};
		
		//Updates the stuff
		this.update = function(dt){
			//Randomly moves the three grids
			this.randomMove(this.grid01,dt);
			this.randomMove(this.grid02,dt);
			this.randomMove(this.grid03,dt);
			
			//Moves the scanlines
			this.scanlines.y1 += .5;
			this.scanlines.y2 += .5;
			this.scanlines.y3 += .5;
			this.scanlines.y4 += 2;
			
			//If the scanlines are outside a range, they're relocated
			if(this.scanlines.y1 > CANVAS_HEIGHT*2){
				this.scanlines.y1 = -CANVAS_HEIGHT;	
			};
			
			if(this.scanlines.y2 > CANVAS_HEIGHT*2){
				this.scanlines.y2 = -CANVAS_HEIGHT;	
			};
			
			if(this.scanlines.y3 > CANVAS_HEIGHT*2){
				this.scanlines.y3 = -CANVAS_HEIGHT;	
			};
			
			if(this.scanlines.y4 > CANVAS_HEIGHT * 5){
				this.scanlines.y4 = -CANVAS_HEIGHT * 5;
			};
		};
		
		//Moves the background grids around slightly 
		this.randomMove = function(grid,dt){
			if(grid.turn == false){
				grid.x += Math.random() * .05;
				grid.y += Math.random() * .05;
			}else{
				grid.x -= Math.random() * .05;
				grid.y -= Math.random() * .05;
			};
			
			if(grid.alphaTurn == false){
				grid.alpha -= Math.random() * .005;
			}else{
				grid.alpha += Math.random() * .01;	
			}
			
			//Changes the alpha as well
			if(grid.alpha <=.6){
				grid.alphaTurn = true;	
			}else if(grid.alpha >= .8){
				grid.alphaTurn = false;
			};
			
			if(grid.x >=-1 || grid.y >=-1){
				grid.turn = true;
			}else if(grid.x <= -10 || grid.y <= -10){
				grid.turn = false;
			};
		};
		
		//Draws the background background stuff
		this.draw = function(){
			ctx.globalAlpha = 1;
			ctx.drawImage(images["backgroundStars"],this.stars.x,this.stars.y,
							images["backgroundStars"].width * this.stars.scale,images["backgroundStars"].height * this.stars.scale);
						
			ctx.globalAlpha = this.grid02.alpha;
			ctx.drawImage(images["backgroundGrid02"],this.grid02.x,this.grid02.y,
						images["backgroundGrid02"].width * this.grid02.scale,images["backgroundGrid02"].height * this.grid02.scale);
						
			ctx.globalAlpha = 1;
		};
		
		//May not be used. 
		this.drawOverlay = function(){
			
			//ctx.globalAlpha = .8;
			//ctx.drawImage(images["backgroundFloor"],0,0);
//			ctx.globalAlpha = this.grid01.alpha;			
//			ctx.drawImage(images["backgroundGrid01"],this.grid01.x,this.grid01.y,
//						images["backgroundGrid01"].width * this.grid01.scale,images["backgroundGrid01"].height * this.grid01.scale);
//			ctx.globalAlpha = 1;
			
		};
		
		//Draws the junk that appears over eveything else.
		this.drawFullOverlay = function(){
			ctx.globalAlpha = .07;
			//SCANLINES!
			ctx.drawImage(images["scanLines"],0,this.scanlines.y1);
			ctx.drawImage(images["scanLines"],0,this.scanlines.y2);
			ctx.drawImage(images["scanLines"],0,this.scanlines.y3);
			ctx.drawImage(images["scanLines_Short"],0,this.scanlines.y4);
			ctx.globalAlpha = 1;
			ctx.drawImage(images["border"],0,0);
		};
	};
	return Background;
})();
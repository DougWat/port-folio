"use strict";

//Main menu. Sits there and looks pretty
window.Menu = (function(){
	function Menu(){
		
		//Vars
		var btnW = 125;
		var btnH = 65;
		var btnX = CANVAS_WIDTH/2 - btnW/2;
		var btnY = CANVAS_HEIGHT/2 - btnH/2;
		var btnHover = false;
		this.btn = {x:btnX, y:btnY, w:btnW, h:btnH}//The button
		this.scanlines = {y1:-CANVAS_HEIGHT,y2:0,y3:CANVAS_HEIGHT, y4:-CANVAS_HEIGHT};//The scanlines
		this.screenType = 0; // used to select default main menu, or defeat, or win screen to show 
		
		//Variables for things that pulsate ;)
		this.spaceVars ={alpha:1, alTurn:false, x:0};
		this.boltVars ={alpha:1, alTurn:false, x:0};
		this.gridVars ={alpha:1, alTurn:false, x:0};
		
		this.update = function(){
			//Increments the position of the scanlines
			this.scanlines.y1 += .5;
			this.scanlines.y2 += .5;
			this.scanlines.y3 += .5;
			this.scanlines.y4 += 2;
			
			//If any of the scanlines are outside of the range, they get placed back at the top
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
			
			//Runs pulse
			this.pulse(this.spaceVars,.004,.1);
			this.pulse(this.gridVars,.002,.4);
			this.pulse(this.boltVars,.005,.7);
		};
		
		//Makes passed in vars pulse in and out. Looks cool
		this.pulse = function(vars, sp, pMax){
			if(vars.alTurn){
				vars.alpha += sp;
			}else{
				vars.alpha -= sp;
			};
			
			if(vars.alpha <=pMax){
				vars.alTurn = true;	
			}else if(vars.alpha >= 1){
				vars.alTurn = false;
			};
		};
		
		//Draw everything
		this.draw = function(){
			//Clears the canvas
			ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
			
			//And draws multible layers of the background, so they can animate independently if need be
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
			
			ctx.globalAlpha = this.spaceVars.alpha;
			ctx.drawImage(images["ssSpace"],0,0);
			
			ctx.globalAlpha = 1;
			ctx.drawImage(images["ssMountain"],0,0);
			
			ctx.globalAlpha = this.gridVars.alpha;
			ctx.drawImage(images["ssGrid"],0,0);
			
			ctx.globalAlpha = this.boltVars.alpha;
			ctx.drawImage(images["ssBolt"],0,0);
			
			ctx.globalAlpha = .4;
			ctx.drawImage(images["ssColors"],0,0);
			
			ctx.globalAlpha = 1;
			ctx.drawImage(images["ssBorder"],0,0);
			
			ctx.fillStyle = "rgb(200,200,200)";
			//ctx.fillRect(this.btn.x, this.btn.y, this.btn.w, this.btn.h);
			ctx.font = "75px Mistral"
			
			//if the mouse is over the button, it gets a different color
			if(btnHover == true){
				ctx.fillStyle = "#ff00d8";
			}else{
				ctx.fillStyle = "b40098";
			};
			
			//selects which text to print out based on default,defeat,win screen
			switch(this.screenType){
				case 0: 
					ctx.drawImage(images["ssTitle"],0,0);
					ctx.fillText("PLAY",this.btn.x,this.btn.y + this.btn.h - 7); break;
				case 1:
					//draw defeat message
					ctx.fillText("YES!",this.btn.x,this.btn.y + this.btn.h - 7);
					ctx.fillStyle = "#ff00d8";
					ctx.fillText("DEFEAT!",this.btn.x - 40,this.btn.y - 100);
					ctx.fillText("PLAY AGAIN?",this.btn.x - 85,this.btn.y -35);
					break;
				case 2:
					//draw victory message
					ctx.fillText("YES!",this.btn.x,this.btn.y + this.btn.h - 7);
					ctx.fillStyle = "#ff00d8";
					ctx.fillText("VICTORY!",this.btn.x - 44,this.btn.y - 100);
					ctx.fillText("PLAY AGAIN?",this.btn.x - 85,this.btn.y - 35);
					break;
			};
			
			ctx.globalAlpha = .07;
			//The scanlines
			ctx.drawImage(images["scanLines"],0,this.scanlines.y1);
			ctx.drawImage(images["scanLines"],0,this.scanlines.y2);
			ctx.drawImage(images["scanLines"],0,this.scanlines.y3);
			ctx.drawImage(images["scanLines_Short"],0,this.scanlines.y4);
			ctx.globalAlpha = 1;
		};
		//Checks if the mouse moved
		this.mousemove = function(){
			if( mouseX >= this.btn.x && mouseX <= this.btn.x + this.btn.w &&
				mouseY >= this.btn.y && mouseY <= this.btn.y + this.btn.h ){
				btnHover = true;
			}else{
				btnHover = false;	
			};
		};
		//Checks where and if the mouse clicked on somthing
		this.click = function(){
			if( mouseX >= this.btn.x && mouseX <= this.btn.x + this.btn.w &&
				mouseY >= this.btn.y && mouseY <= this.btn.y + this.btn.h ){	
				//clicked!
				audio.playBtnUpgrade(1);
				gameState = GameState.TOWER; // global stored in main
				game = new Game(); // global stored in main
				game.setup();
			};
		};
		

	};
	
	return Menu;
})();
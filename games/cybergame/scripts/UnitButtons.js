"use strict";

//Side Panel of buttons and info
window.ButtonPanel = (function(){
	function ButtonPanel(){
		//vars
		this.sideDist = 10;
		this.btnX = PLAYING_WIDTH + this.sideDist;
		this.btnW = CANVAS_WIDTH - PLAYING_WIDTH - this.sideDist * 2;
		this.btnH = 50;
		this.startingY = 100;
		this.seperateDist = 10;
		this.btnArray = new Array();
		this.playBtn = new PlayButton();
		
		//Calls to play button update
		this.update = function(){
			this.playBtn.update();
		};
		
		//calls to the draw function of all buttons in the btnArray
		//Draws the rest of the panel
		this.draw = function(){
			ctx.drawImage(images["unitSidePanel"],PLAYING_WIDTH,0);
			ctx.drawImage(images["upgradeDisplay"],PLAYING_WIDTH +38,15);
			ctx.fillStyle = "#e927c4";
			ctx.font = "24px Digital";
			//Draws the player money
			if(game.playerMoney.toString().charAt(0) == "1"){
				ctx.fillText(game.playerMoney,PLAYING_WIDTH +61,35);
			}else{
				ctx.fillText(game.playerMoney,PLAYING_WIDTH +53,35);
			};
			
			//Draws the player HP
			ctx.fillStyle = "white";
			ctx.font = '20px Arista Light';
			ctx.fillText("HP:",PLAYING_WIDTH + this.sideDist,60);
			ctx.fillText(game.HP,PLAYING_WIDTH + this.sideDist + 30,60);
			
			for(var i = 0; i < this.btnArray.length; i++){
				this.btnArray[i].draw();
			};
			this.playBtn.draw();
		};
		
		//if mouse is over btn, set hover to true;
		this.checkMouseOver = function(){
			if(mouseX < PLAYING_WIDTH && mouseY < PLAYING_HEIGHT){
				//mouse isn't over panel, reset btns hover
				for(var i = 0; i < this.btnArray.length; i++){
					this.btnArray[i].hover = false;
				};
			} else {
				//mouse is over panels, check for each btn.
				for(var i = 0; i < this.btnArray.length; i++){
					if( mouseOver(mouseX, mouseY, this.btnArray[i].x, this.btnArray[i].y, this.btnW, this.btnH)){
						this.btnArray[i].hover = true;
					} else {
						this.btnArray[i].hover = false;
					};
				};
			};
			this.playBtn.checkMouseOver();
		};
		
		//handle clicks
		this.checkClick = function(){
			for(var i = 0; i < this.btnArray.length; i++){
				if(this.btnArray[i].price <= game.playerMoney && this.btnArray[i].hover == true){
					if( i == game.buttonSelection){
						game.buttonSelection = -1;
						return;
					};
					game.buttonSelection = i;
					return;
				};
			};
			this.playBtn.checkClick();
		};

		//Creates the buttons
		this.populateButtons = function(){
			for(var i = 0; i < game.plyType.length; i++){
				this.btnArray.push( new Button(this.btnX, (this.startingY + this.btnH * i + this.seperateDist * i),
					game.plyType[i].img, game.plyType[i].price, game.plyType[i].type, game.plyType[i].desc, 
					game.plyType[i].upgrades, this.btnArray.length, this.btnW, this.btnH, this.sideDist));
			};
		};
	};
	return ButtonPanel;	
})();

//Button you press to advance a wave
window.PlayButton = (function(){
	function PlayButton(){
		this.padding = 10;
		this.hover = false;
		this.w = images["playButtonOn"].width;
		this.h = images["playButtonOn"].height;
		this.x = CANVAS_WIDTH - this.w - this.padding - 2;
		this.y = CANVAS_HEIGHT - this.h - this.padding - 2;
		
		//
		this.update = function(){};
		
		//Dras different depenending on if it's in the middle of a wave or not.
		//Checks if a wave is going on, and if the player is hovering over it.
		//Changes colors and text accordingly
		this.draw = function(){
			if(!game.endWave){				
				ctx.drawImage(images["playButtonOff"],this.x,this.y);
				ctx.fillStyle = "#e927c4";
				ctx.fillText("WAVE",this.x + this.w/2 - 36,this.y + this.w/3 - 45);
				ctx.fillText(game.level,this.x + this.w/2 + 10,this.y + this.w/3 - 45);	
			} else if(game.endWave && !this.hover){
				ctx.drawImage(images["playButtonOn"],this.x,this.y);
				ctx.fillStyle = "#e927c4";
				ctx.fillText("NEXT WAVE",this.x + this.w/2 - 36,this.y + this.w/3 - 45);
			} else if(game.endWave && this.hover){
				ctx.drawImage(images["playButtonHover"],this.x,this.y);
				ctx.fillStyle = "#e927c4";	
				ctx.fillText("NEXT WAVE",this.x + this.w/2 - 36,this.y + this.w/3 - 45);						
			};
		};
		
		//If the button is clicked, the next wave is began
		this.checkClick = function(){
			if(this.hover && game.endWave != false){
				audio.playWhistle(.5);
				game.endWave = false;
			}
		};
		
		// if the mouse is over it, it's hover state is set to true
		this.checkMouseOver = function(){
			if(mouseOver(mouseX, mouseY, this.x, this.y, this.w, this.h)){
				this.hover = true;
			} else {
				this.hover = false;
			};
		};
	};
	return PlayButton;
})();

//Unit buttons
window.Button = (function(){
	function Button(x, y, img, price, name, desc, upgrades, index, w, h, dist){
		//Size of the box that appears to the side when hovering
		this.infoBoxH = 200;
		this.infoBoxW = 100;
		this.sideDist = dist;
		//Size of the button
		this.btnW = w;
		this.btnH = h;
		this.x = x;
		this.y = y;
		this.price = price;
		this.name = name;
		this.desc = desc;
		this.attack = upgrades.attacks[0];//Default attack power
		this.hover = false;
		this.index = index;
		
		//Draws button
		this.draw = function(){
			//determines what type of button to draw
			//Be it Grayed out, or hovering, or selected
			if(this.price > game.playerMoney){
				ctx.drawImage(images["unitButtonGrayed"],this.x,this.y);
			}else if(game.buttonSelection != this.index){
				if(this.hover){
					ctx.drawImage(images["unitButtonHover"],this.x,this.y);
				}else{
					ctx.drawImage(images["unitButtonUnselected"],this.x,this.y);
				};
			}else if(game.buttonSelection == this.index){
				ctx.drawImage(images["unitButtonSelected"],this.x,this.y);	
			};
			
			//Draws info on the button
			ctx.fillStyle = "black";
			ctx.font = '17px Arista Light';
			ctx.fillText(this.name, this.x + 10, this.y + this.btnH - 10);
			ctx.fillText("$"+this.price, this.x + this.btnW - 45, this.y + 20);
			
			//If the button is hovered over, an infobox appears to the left
			//This handles that
			if(this.hover){
				var infoX = PLAYING_WIDTH - this.infoBoxW;
				
				ctx.drawImage(images["infoBox"],infoX,mouseY - 20);
				
				ctx.fillStyle = "black";
				ctx.fillText(this.name, infoX + 10, mouseY);
				
				var dps = Math.floor(this.attack);
				ctx.fillText("Price: $" + this.price, infoX + 10, mouseY + 30);
				ctx.fillText("DPS: " + dps, infoX + 10, mouseY + 60);
			};
		};
	};
	return Button;
})();
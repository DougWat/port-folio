"use strict";
window.UpgradePanel = (function(){
	function UpgradePanel(){
		// panel dimensions
		this.x = 0;
		this.y = PLAYING_HEIGHT;
		this.panelWidth = PLAYING_WIDTH;
		this.panelHeight = CANVAS_HEIGHT - PLAYING_HEIGHT;
		// panel settings
		this.unitImgDisplay = 10;
		this.maxBars = 4;
		this.selectedUnit;
		
		//Update Area Values
		this.upgradeSecWidth = (this.panelWidth - this.panelHeight - 80)/2;
		this.upgradeSecHeight = this.panelHeight - 40;
		this.barGap = 10;
		this.barWidth = 30;
		this.barHeight = (this.upgradeSecHeight - 10);
		this.barBaseHeight = this.barHeight/2;
		
		//Upgrade Buttons
		this.leftButton = new UpgradeButton((this.panelWidth - this.panelHeight)/2 + 38,
												PLAYING_HEIGHT + 50, 60, 60);
		this.rightButton = new UpgradeButton(this.panelWidth - this.panelHeight + 35,
												PLAYING_HEIGHT + 50, 60, 60);
		this.deleteBtn = new DeleteButton(28,PLAYING_HEIGHT + 55,85,85);
		//Updates selected unit
		this.update = function(){
//			for(var i = 0; i < game.playerUnitArray.length; i++){
//				if(game.playerUnitArray[i].selected == true){
//					this.selectedUnit = game.playerUnitArray[i];
//					this.updateUnit(game.playerUnitArray[i]);
//				};
//			};
			if(game.unitSelection != -1){
				this.selectedUnit = game.playerUnitArray[game.unitSelection];
				this.updateUnit(game.playerUnitArray[game.unitSelection]);
				if(this.deleteBtn.currentUnit != game.unitSelection){
					this.deleteBtn.updateUnit();
				};
			};
			
			this.deleteBtn.update();
		};
		
		//Determines if mouse is over buttons
		this.checkMouseOver = function(){
			this.leftButton.checkMouseOver();
			this.rightButton.checkMouseOver();
			this.deleteBtn.checkHover();
		};
		
		//If buttons have been clicked then upgrade unit if player has the money
		this.checkClick = function(){
			//If left button is clicked
			if( this.leftButton.checkClick() ){
				//If player has enough money, then upgrade unit and subtract the cost
				if( this.selectedUnit.atkPrice[this.selectedUnit.upAtk - 1] <= game.playerMoney ){
					game.playerMoney -= this.selectedUnit.atkPrice[this.selectedUnit.upAtk - 1];
					this.selectedUnit.upAtk++;
					audio.playBtnUpgrade(1);
				};
			//If right button is clicked
			}else if( this.rightButton.checkClick() ){
				//If player has enough money, then upgrade unit and subtract the cost
				if( this.selectedUnit.radPrice[this.selectedUnit.upRad - 1] <= game.playerMoney ){
					game.playerMoney -= this.selectedUnit.radPrice[this.selectedUnit.upRad - 1];
					this.selectedUnit.upRad++;
					audio.playBtnUpgrade(1);
				};
			};
			
			this.deleteBtn.checkClick();
		};
		
		//Updates selected unit
		this.updateUnit = function(choosenUnit){
			this.leftButton.update(choosenUnit.atkPrice[choosenUnit.upAtk - 1]);
			this.rightButton.update(choosenUnit.radPrice[choosenUnit.upRad - 1]);
		};
		
		// Renders the panel
		this.draw = function(){
			ctx.drawImage(images["upgradePanel"],0,PLAYING_HEIGHT);
			
			// Draws selected unit's upgrade info
			for(var i = 0; i < game.playerUnitArray.length; i++){
				if( game.playerUnitArray[i].selected == true ){
					this.drawUnit( game.playerUnitArray[i] );
				};
			};
			if(game.unitSelection == -1){
				this.deleteBtn.draw();
			};
		};
		
		//Draws unit upgrade info
		this.drawUnit = function(unit){
			// draw left upgrade bars
			var upgradeSecLX = this.panelHeight + 10;
			var upgradeSecLY = PLAYING_HEIGHT + 20;

			//Loops through the amount of bars and renders them as active or inactive dependent on the unit
			for(var i = 0; i < this.maxBars; i++){
				var barAddHeight = (this.barHeight/2) * i / this.maxBars;
				ctx.fillStyle = this.barInactiveCol;
				if( i < unit.upAtk ){
					ctx.drawImage(images["upgradeLineOn"],(upgradeSecLX + 10) + (i * (this.barWidth + this.barGap)),
						upgradeSecLY + this.barBaseHeight - barAddHeight, 
						this.barWidth, this.barBaseHeight + barAddHeight);
				}else{
					ctx.drawImage(images["upgradeLineOff"],(upgradeSecLX + 10) + (i * (this.barWidth + this.barGap)),
						upgradeSecLY + this.barBaseHeight - barAddHeight, 
						this.barWidth, this.barBaseHeight + barAddHeight);
				};
			};
			
			//The current value is printed
			ctx.fillStyle = "red";
			ctx.fillText(unit.attack[unit.upAtk - 1],upgradeSecLX + 10,upgradeSecLY + 20);
			
			//and the upgrade value is printed next to it.
			ctx.fillStyle = "green";
			ctx.fillText("->",upgradeSecLX + 40,upgradeSecLY + 20);
			if(unit.attack[unit.upAtk] > -1){
				ctx.fillText(unit.attack[unit.upAtk],upgradeSecLX + 60,upgradeSecLY + 20);
			}else{
				ctx.fillText("MAX",upgradeSecLX + 60,upgradeSecLY + 20);
			};
			
			//draw right upgrade bars
			var upgradeSecRX = (PLAYING_WIDTH - this.panelHeight)/2 + this.panelHeight + 10;
			var upgradeSecRY = PLAYING_HEIGHT + 20;
			
			ctx.fillStyle = "rgb(20,100,20)";
			//Loops through the amount of bars and renders them as active or inactive dependent on the unit
			for(var i = 0; i < this.maxBars; i++){
				var barAddHeight = (this.barHeight/2) * i / this.maxBars;
				ctx.fillStyle = this.barInactiveCol;
				if( i < unit.upRad ){
					ctx.drawImage(images["upgradeLineOn"],(upgradeSecRX + 10) + (i * (this.barWidth + this.barGap)),
							upgradeSecRY + this.barBaseHeight - barAddHeight,
							this.barWidth, this.barBaseHeight + barAddHeight);
				}else{
					ctx.drawImage(images["upgradeLineOff"],(upgradeSecRX + 10) + (i * (this.barWidth + this.barGap)),
							upgradeSecRY + this.barBaseHeight - barAddHeight,
							this.barWidth, this.barBaseHeight + barAddHeight);	
				};

			};
			
			ctx.fillStyle = "red";
			ctx.fillText(unit.radi[unit.upRad - 1],upgradeSecRX + 10,upgradeSecRY + 20);
			
			ctx.fillStyle = "green";
			ctx.fillText("->",upgradeSecRX + 40,upgradeSecRY + 20);
			if(unit.radi[unit.upRad] > -1){
				ctx.fillText(unit.radi[unit.upRad],upgradeSecRX + 60,upgradeSecRY + 20);
			}else{
				ctx.fillText("MAX",upgradeSecRX + 60,upgradeSecRY + 20);
			};
			
			this.leftButton.draw(unit.atkPrice[unit.upAtk - 1]);
			this.rightButton.draw(unit.radPrice[unit.upRad - 1]);
			this.deleteBtn.drawUnit();
		};	
	};
	return UpgradePanel;
})();

//The buttons the player presses to upgrade their unit
window.UpgradeButton = (function(){
	function UpgradeButton(x,y,w,h,img){
		this.x = x;
		this.y = y;
		this.w = w; // width
		this.h = h; // height
		this.img = img; // image
		this.hover = false;
		
		//Updates the button
		this.update = function(price){
			//NEEDS ATTENTION
		};
		
		//Determines if the mouse is hovering over this button
		this.checkMouseOver = function(){
			if( mouseOver(mouseX, mouseY, this.x, this.y, this.w, this.h) ){
				this.hover = true;
			}else{
				this.hover = false;
			};
		};
		
		//Called during click, if mouse is hovering then this button was clicked
		this.checkClick = function(){
			return this.hover;
		};
		
		//renders button
		this.draw = function(price){
			//Determines if the button should be rendered on, off, or hovered over.
			if( price > game.playerMoney || price == null){
				ctx.drawImage(images["upgradeButtonOff"],this.x,this.y);
			}else if(!this.hover ){
				ctx.drawImage(images["upgradeButtonOn"],this.x,this.y);
			}else if(this.hover ){ // hover is false
				ctx.drawImage(images["upgradeButtonHover"],this.x,this.y);		
			};
			
			//Draws the price of the upgrade over the button.
			ctx.fillStyle = "#e927c4";
			ctx.font = '24px Digital';
			ctx.drawImage(images["upgradeDisplay"],this.x - 2,this.y-25);
			//If the price is a number (and not undefined)
			if(price > -1){
				//draw the price, depenent on if the price starts with a 1 or not. Because digital numbers.
				if(price.toString().charAt(0) == "1"){
					ctx.fillText(price,this.x + 22,this.y - 5);
				}else{
					ctx.fillText(price,this.x + 15,this.y - 5);
				};
			}else{
				ctx.fillText("ERROR",this.x + 15,this.y - 5);	
			};
		};
	};
	return UpgradeButton;
})();

window.DeleteButton = (function(){
	function DeleteButton(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.hover = false;
		this.sellAmt;
		this.currentUnit = -1;
		var u = null;
		
		this.update = function(){
			if(u != null){
				this.sellAmt = u.price;
				for(var i = 0; i < u.upAtk - 1;i++){
					this.sellAmt += u.atkPrice[i];
				};
			
				for(var i =0; i < u.upRad - 1;i++){
					this.sellAmt += u.radPrice[i];
				};
			
				this.sellAmt = this.sellAmt/2;
				//console.log(this.sellAmt);
			};
		};
		
		this.draw = function(){
			ctx.drawImage(images["sellButtonOff"],this.x,this.y);
			ctx.drawImage(images["upgradeDisplay"],this.x + 6,this.y-30);
		};
		
		this.drawUnit = function(){
			ctx.fillStyle = "white";
			//ctx.fillText("Sell Unit For:",this.x,this.y - 50);
			ctx.fillStyle = "#e927c4";
			if(this.hover){
				ctx.drawImage(images["sellButtonHover"],this.x,this.y);
			}else{
				ctx.drawImage(images["sellButtonOn"],this.x,this.y);
			};
			ctx.drawImage(images["upgradeDisplay"],this.x + 6,this.y-30);
			if(this.sellAmt.toString().charAt(0) == "1"){
				ctx.fillText(this.sellAmt,this.x + 30, this.y - 10);
			}else{
				ctx.fillText(this.sellAmt,this.x + 23, this.y - 10);
			};
		};
		
		this.updateUnit = function(){
			this.currentUnit = game.unitSelection;
			u = game.playerUnitArray[game.unitSelection];
		};
		
		this.checkHover = function(){
			if(mouseOver(mouseX,mouseY,this.x,this.y,this.w,this.h)){
				this.hover = true;
			}else{
				this.hover = false;
			};
		};
		
		this.checkClick = function(){
			if(this.hover == true)
			{
                if(game.unitSelection == null || game.unitSelection == -1){return;}
				game.playerUnitArray.splice(game.unitSelection,1);
				game.unitSelection = -1;
				this.currentUnit = -1;
				game.playerMoney += this.sellAmt;
				u = null;
				audio.playBtnUpgrade(1);
			}
		};
	};
	return DeleteButton;
})();
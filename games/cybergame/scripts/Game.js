"use strict";

//Main game function
window.Game = (function(){
	function Game(){
		
		//Setup variables
		this.endWave = true;
		
		//Player vars
		this.playerMoney = 150;
		this.HP = 100;
		this.playerUnitArray = new Array();
		this.unitSelection = -1;
		
		this.buttonSelection = -1;
		
		//Enemy vars
		this.enemyUnitArray = new Array();
		
		//Level vars
		this.levelArray = new Array();
		this.level = 1;
		
		//Popoutnumbers Array
		this.numPopArray = new Array();
		
		//subSystems
		this.upgradePanel = new UpgradePanel();
		this.nodeArray = new Array();
		this.topNode = 0; //
		this.plyType = new Array();
		this.buttonPanel = new ButtonPanel();
		this.collisions = new Collisions();
		this.background = new Background();
		
		// Populates arrays
		this.setup = function(){
			populateNodes(this.nodeArray);
			populatePlayerUnits();
			populateLevels();
			this.collisions.populateColArray();
			this.buttonPanel.populateButtons();
			//audio.playBackgroundSound(.2);
		};		
		
		//main update function
		this.update = function(dt){ // delta time
			//If the player HP is at 0, the gamestate changes to GameOver
			if(this.HP <= 0){
				gameState = GameState.MENU; // change state
				menu.screenType = 1; // set screen to display defeat
				return;
			};
			
			if(this.level == this.levelArray.length + 1){
				gameState = GameState.MENU; //change state
				menu.screenType = 2; // set screen to display victory
				return;
			};
			
			//Updates the background images
			this.background.update(dt);
			
			//If it is not the end of the wave, then there are more enemies to spawn. Updates the current level
			if(!this.endWave){
				if(this.levelArray[this.level - 1].enemySpawnBacklog.length > 0){
					this.levelArray[this.level - 1].update(dt);
				} else if (this.enemyUnitArray.length == 0){
					this.level++;
					this.endWave = true;
					this.numPopArray.push(new NumPop(80,400,"false",true));
					this.playerMoney += 50;
					this.numPopArray.push(new NumPop(PLAYING_WIDTH + 10, 30,"50",false));
					audio.playKaching(1);
				};
			};
			//loops through player units and calls their updates
			for (var i = 0; i < this.playerUnitArray.length; i++){
				this.playerUnitArray[i].update(dt);
			};
			//loops through enemies and calls their updates
			for (var i = 0; i < this.enemyUnitArray.length; i++){
				if (this.enemyUnitArray[i].update(dt)){
					//If the update returns true then that means that the current enemy is dead.
					this.enemyUnitArray.splice(i,1);
					i--;
				};
			};
			
			//Loops through the numbers to pop up and 
			for(var i = 0; i < this.numPopArray.length; i++){
				if(this.numPopArray[i].update()){
					//If the update returns true then that means that the current number is dones.
					this.numPopArray.splice(i,1);
					i--;
				};
			};
			//
			this.upgradePanel.update();
			this.buttonPanel.update();
		};
		//
		this.draw = function(){ // canvas 2D context
			// clear screen
			ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
			
			//background
			this.background.draw();
						
			//DEBUG TEMP
			renderNodePath();
			
			//loop thru enemy unit array to call draw methods
			for( var i = 0; i < this.enemyUnitArray.length; i++){
				this.enemyUnitArray[i].draw();
			};
			
			//Loops thru numbers to pop out and draws them
			
			this.background.drawOverlay();
			
			//loop thru player unit array to call draw methods
			for( var i = 0; i < this.playerUnitArray.length; i++){
				this.playerUnitArray[i].draw();
			};
			//Renders the selected unit where the mouse is
			if(this.selection != -1){
				renderSelection();
			};
			
			//Draw other components
			this.buttonPanel.draw();
			
			for(var i = 0; i < this.numPopArray.length; i++){
				this.numPopArray[i].draw();
			};
			
			this.upgradePanel.draw();
			this.background.drawFullOverlay();
			
		};
		
	}; 
	return Game;
})();
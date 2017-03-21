"use strict";

//Set up the event listeners
function RunEventListeners()
{
	//In the event of a click
    canvas.addEventListener("click", function (e) {
        var x = mouseX;
        var y = mouseY;
		
		//Checks the states the game is in
		switch(gameState){
			case GameState.MENU:
				menu.click();
				break;
				
			case GameState.TOWER: 
				if(x < PLAYING_WIDTH && y < PLAYING_HEIGHT){
					//If the player has selected a button, and is on an area of the bored 
					// that they can place a unit, it places a unit
					if(game.buttonSelection != -1 && game.plyType[game.buttonSelection].price <= game.playerMoney &&
						!game.collisions.colliding && !game.collisions.unitColliding){
						game.playerMoney -= game.plyType[game.buttonSelection].price;
						//Pushes the unit into the array
						game.playerUnitArray.push(new PlayerUnit(game.plyType[game.buttonSelection]));
						game.playerUnitArray[game.playerUnitArray.length - 1].selected = true;
						game.unitSelection = game.playerUnitArray.length - 1;
						//set all other units to not selected
						for(var i = 0; i < game.playerUnitArray.length - 1; i++){
							game.playerUnitArray[i].selected = false;
						};
						game.buttonSelection = -1;
						//If the mouse is colliding with a placed unit, it selects that unit
					} else if (game.collisions.unitColliding){
						game.playerUnitArray[game.collisions.unitIndexHover].selected = true;
						game.unitSelection = game.collisions.unitIndexHover;
						game.buttonSelection = -1;
						//set others to false
						for (var i = 0; i < game.playerUnitArray.length; i++){
							if(i != game.collisions.unitIndexHover){
								game.playerUnitArray[i].selected = false;
							};
						};
					};
				} else {
					//Checks if the other places were clicked
					game.buttonPanel.checkClick();
					game.upgradePanel.checkClick();
				};
				
				break;
			
			case GameState.CLAW:
				if(claw.state == claw.ClawState.SELECT){
					claw.state = claw.ClawState.DOWN;
				};
				break;
		}
    }, false);
	
	//Runs on every mouse move
	canvas.addEventListener("mousemove",function(e) {
		
		var x = e.clientX;
        var y = e.clientY;
		var rect = canvas.getBoundingClientRect();
		
        x -= rect.left;
        y -= rect.top
		
		//Updates the mouseX and Y positions
		mouseX = x;
		mouseY = y;
		
		//Checks if the mouse is over various parts
		switch(gameState){
			case GameState.MENU:
				menu.mousemove();
				break;
				
			case GameState.TOWER: 
				game.buttonPanel.checkMouseOver();
				game.upgradePanel.checkMouseOver();
				game.collisions.determineCol();
				game.collisions.unitCol();
				break;
			
			case GameState.CLAW:
				break;
		}
		
	},false);
}
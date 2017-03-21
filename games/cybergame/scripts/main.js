"use strict";
// Globals
var canvas,ctx;
var mouseX, mouseY;
var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 650;
var PLAYING_WIDTH = 750;
var PLAYING_HEIGHT = 500;
var menu, game, claw, clawCtx;

// intro menu, default game, secondary game
var GameState = { MENU : 0, TOWER : 1, CLAW : 2, GAMEOVER : 3} 
var gameState = GameState.MENU;

//Initialises globals, sets event listeners, starts loop, sets up menu 
function init(){
	canvas = document.querySelector("#canvas");
	ctx = canvas.getContext('2d');
	
	ctx.font = '75px Mistral';
	audio.playBackgroundSound(.2);
	//hooks up event listeners
	RunEventListeners();
	//setup menu
	menu = new Menu();
	menu.draw(); // needs to draw only once
	
	//TEMP FOR DEBUGGING PURPOSES
	//TOGGLES CLAW MODE
	
	//jump into loop
	gameLoop();
}


function gameLoop(){
	var dt = calculateDeltaTime();
	switch(gameState){
		case GameState.MENU: // menu logic
			menu.update();
			menu.draw();
			break;
			
		case GameState.TOWER: // game update and draw
			game.update(dt);
			game.draw();
			break;
		
		case GameState.CLAW: // claw update and draw
			clawCtx.update(dt);
			clawCtx.draw();
			break;
			
		case GameState.GAMEOVER:
		
			break;
	}
	
	animFrame(gameLoop); //Waits for animation frame to loop.
};

//Starts the claw game
function startClaw(){
	//Set state
	gameState = GameState.CLAW;
	//create new claw
	claw = new Claw(
		PLAYING_WIDTH/2, 20, // X , Y
		30,60, //WIDTH, HEIGHT
		20, PLAYING_HEIGHT-100 //BOTTOM limit
	);
	clawCtx = new ClawContext(claw);
	
	
};

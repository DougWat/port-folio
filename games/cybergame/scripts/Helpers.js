"use strict";

//global vars
//Animations
var animFrame = window.requestAnimationFrame 
	|| window.webkitRequestAnimationFrame 
	|| window.mozRequestAnimationFrame 
	|| window.oRequestAnimationFrame 
	|| window.msRequestAnimationFrame 
	|| null;

var lastTime = 0; //used in calculate Delta time function
	
//Finds the distance between two points
function lineDistance(x1,x2,y1,y2){
	return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
};

//Determines if the mouse of over an area
function mouseOver(x,y,itemX,itemY,itemWidth,itemHeight){
	if(x >= itemX &&
	x <= itemX + itemWidth &&
	y >= itemY &&
	y <= itemY + itemHeight){
		return true;	
	};
};

//Give him the clamps
function clamp(val, min, max){
    return Math.max(min, Math.min(max, val));
}

//Calculates delta time
function calculateDeltaTime(){
	var now = (+new Date);
	var fps = 1000/(now-lastTime);
	fps=clamp(fps,12,60);
	lastTime=now;
	return 1/fps;
};

//Gets a random int foored
function GetRandInt(min, max){
	return Math.floor((Math.random()*max) + min);
};


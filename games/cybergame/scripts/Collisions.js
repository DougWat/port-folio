"use strict";
//Collision related junk
window.Collisions = (function(){
	function Collisions(){
		this.colArray = new Array();
		this.colliding = false;
		this.unitColliding = false;
		this.collidingUnit;
		this.unitIndexHover = -1;
		
		//Determines if the mouse is colliding with an off limits areas
		this.determineCol = function(){
			for(var i  = 0; i < this.colArray.length; i++){
				//Sets colliding to true or false depending
				if( lineDistance(mouseX, this.colArray[i].x, mouseY, this.colArray[i].y) <= this.colArray[i].radius){
					this.colliding = true;
					return;
				} else {
					this.colliding = false;
				};
			};
		};
		//Determins if the mouse is colliding with a palced unit
		this.unitCol = function(){
			for(var i = 0; i < game.playerUnitArray.length; i++){
				if( lineDistance(mouseX, game.playerUnitArray[i].x, mouseY, game.playerUnitArray[i].y) <= game.playerUnitArray[i].unitWidth/2){
					//If it is, the unit it's colliding with get's it's hover state set to true
					game.playerUnitArray[i].hover = true;
					this.unitIndexHover = i;
					this.unitColliding = true;
					//Loops and turns every other unit to not hovering.
					for(i = i + 1; i < game.playerUnitArray.length; i++){
						game.playerUnitArray[i].hover = false;
					};
					return;
				} else {
					game.playerUnitArray[i].hover = false;
					this.unitColliding = false;
					this.unitIndexHover = -1;
				};
			};
		};
		//populates array with collision points. 
		this.populateColArray = function() {
			this.colArray.push(new ColCircle(32, 46, 24));
			this.colArray.push(new ColCircle(57, 41, 22));
			this.colArray.push(new ColCircle(91, 38, 25));
			this.colArray.push(new ColCircle(126, 38, 28));
			this.colArray.push(new ColCircle(154, 33, 25));
			this.colArray.push(new ColCircle(189, 33, 17));
			this.colArray.push(new ColCircle(219, 35, 18));
			this.colArray.push(new ColCircle(241, 35, 21));
			this.colArray.push(new ColCircle(279, 38, 27));
			this.colArray.push(new ColCircle(324, 38, 27));
			this.colArray.push(new ColCircle(369, 38, 35));
			this.colArray.push(new ColCircle(424, 45, 32));
			this.colArray.push(new ColCircle(469, 45, 35));
			this.colArray.push(new ColCircle(519, 43, 35));
			this.colArray.push(new ColCircle(574, 38, 28));
			this.colArray.push(new ColCircle(619, 38, 27));
			this.colArray.push(new ColCircle(656, 38, 28));
			this.colArray.push(new ColCircle(699, 38, 22));
			this.colArray.push(new ColCircle(729, 60, 17));
			this.colArray.push(new ColCircle(737, 85, 19));
			this.colArray.push(new ColCircle(734, 120, 17));
			this.colArray.push(new ColCircle(722, 145, 19));
			this.colArray.push(new ColCircle(687, 168, 23));
			this.colArray.push(new ColCircle(639, 180, 31));
			this.colArray.push(new ColCircle(591, 185, 23));
			this.colArray.push(new ColCircle(542, 178, 29));
			this.colArray.push(new ColCircle(489, 163, 30));
			this.colArray.push(new ColCircle(449, 153, 22));
			this.colArray.push(new ColCircle(404, 148, 27));
			this.colArray.push(new ColCircle(359, 148, 27));
			this.colArray.push(new ColCircle(309, 146, 30));
			this.colArray.push(new ColCircle(259, 143, 25));
			this.colArray.push(new ColCircle(219, 148, 22));
			this.colArray.push(new ColCircle(176, 156, 29));
			this.colArray.push(new ColCircle(149, 188, 19));
			this.colArray.push(new ColCircle(157, 218, 25));
			this.colArray.push(new ColCircle(196, 225, 19));
			this.colArray.push(new ColCircle(236, 218, 25));
			this.colArray.push(new ColCircle(269, 215, 22));
			this.colArray.push(new ColCircle(301, 211, 15));
			this.colArray.push(new ColCircle(319, 223, 20));
			this.colArray.push(new ColCircle(327, 250, 22));
			this.colArray.push(new ColCircle(327, 280, 21));
			this.colArray.push(new ColCircle(294, 308, 28));
			this.colArray.push(new ColCircle(261, 320, 25));
			this.colArray.push(new ColCircle(217, 318, 26));
			this.colArray.push(new ColCircle(172, 306, 34));
			this.colArray.push(new ColCircle(142, 286, 29));
			this.colArray.push(new ColCircle(114, 283, 25));
			this.colArray.push(new ColCircle(82, 286, 22));
			this.colArray.push(new ColCircle(64, 315, 25));
			this.colArray.push(new ColCircle(67, 350, 25));
			this.colArray.push(new ColCircle(94, 373, 23));
			this.colArray.push(new ColCircle(126, 380, 25));
			this.colArray.push(new ColCircle(161, 388, 30));
			this.colArray.push(new ColCircle(194, 415, 27));
			this.colArray.push(new ColCircle(229, 421, 25));
			this.colArray.push(new ColCircle(274, 425, 31));
			this.colArray.push(new ColCircle(312, 410, 29));
			this.colArray.push(new ColCircle(329, 366, 25));
			this.colArray.push(new ColCircle(349, 343, 25));
			this.colArray.push(new ColCircle(371, 326, 23));
			this.colArray.push(new ColCircle(394, 313, 20));
			this.colArray.push(new ColCircle(416, 303, 19));
			this.colArray.push(new ColCircle(427, 298, 24));
			this.colArray.push(new ColCircle(417, 266, 22));
			this.colArray.push(new ColCircle(401, 240, 24));
			this.colArray.push(new ColCircle(389, 216, 24));
			this.colArray.push(new ColCircle(411, 203, 25));
			this.colArray.push(new ColCircle(436, 198, 18));
			this.colArray.push(new ColCircle(464, 198, 22));
			this.colArray.push(new ColCircle(494, 206, 25));
			this.colArray.push(new ColCircle(531, 208, 19));
			this.colArray.push(new ColCircle(436, 183, 33));
			this.colArray.push(new ColCircle(554, 220, 25));
			this.colArray.push(new ColCircle(596, 235, 28));
			this.colArray.push(new ColCircle(636, 258, 23));
			this.colArray.push(new ColCircle(666, 275, 26));
			this.colArray.push(new ColCircle(679, 310, 28));
			this.colArray.push(new ColCircle(664, 350, 25));
			this.colArray.push(new ColCircle(634, 366, 22));
			this.colArray.push(new ColCircle(597, 358, 22));
			this.colArray.push(new ColCircle(559, 343, 20));
			this.colArray.push(new ColCircle(529, 341, 20));
			this.colArray.push(new ColCircle(492, 358, 24));
			this.colArray.push(new ColCircle(474, 395, 26));
			this.colArray.push(new ColCircle(504, 428, 27));
			this.colArray.push(new ColCircle(544, 443, 21));
			this.colArray.push(new ColCircle(591, 438, 25));
			this.colArray.push(new ColCircle(631, 428, 24));
			this.colArray.push(new ColCircle(679, 433, 30));
			this.colArray.push(new ColCircle(721, 450, 22));
		};
	};
	return Collisions;
})();

//Circle collisions. X y and radius. Easy collision calculations. 
window.ColCircle = (function(){
	function ColCircle(x,y,radius){
		this.x = x;
		this.y = y;
		this.radius = radius;
	};
	return ColCircle;
})();
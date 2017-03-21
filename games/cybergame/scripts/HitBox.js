"use strict";
// Hit box is used to determine collision
window.HitBox = (function(){
	function HitBox(x,y,r){
		this.x = x;
		this.y = y;
		this.r = r;
		this.draw = function(){
			ctx.fillStyle = "red";
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
			ctx.fill();
		}
	};
	return HitBox;
})();

// determines if two boxes are colliding and returns the result
function checkCollision(b1, b2){
	var dist = lineDistance(b1.x, b2.x, b1.y, b2.y);
	return dist < ( b1.r + b2.r );
};
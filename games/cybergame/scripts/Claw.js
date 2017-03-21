"use strict";
window.Claw = (function(){
	function Claw(x, y, w, h, t, b){
		//Info
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		
		//State vars
		this.ClawState = { SELECT : 0, DOWN : 1, UP : 2, RETURN : 3, HOME : 4};
		this.state = this.ClawState.SELECT;

		//Settings
		this.speed = 400;
		this.top = y; //top limit
		this.bottom = b; //bottom limit
		this.open = true; // if claw is open
		
		this.boxX = function(){ return this.x + this.width/2; };
		this.boxY = function(){ return this.y + this.height * 0.75; };
		this.hitBox = new HitBox(this.boxX(), this.boxY(), 50);
		
		//Functions
		this.draw = function(){
			ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
			if(this.open){
				ctx.fillStyle = "black";
			} else {
				ctx.fillStyle = "red";
			};
			ctx.fillRect(this.x,this.y,this.width,this.height);
			
			this.hitBox.draw();
		};
		
		this.update = function(dt){
			switch(this.state){
			
			case this.ClawState.SELECT:
				this.x = clamp( mouseX, 0, PLAYING_WIDTH - this.width );	//move
				break;	//END SELECT
			
			case this.ClawState.DOWN:
				this.y += this.speed*dt*2; //move
				if( this.y >= this.bottom ){
					this.state = this.ClawState.UP;
					//capture
					this.open = false;
				}
				break;	//END DOWN
			
			case this.ClawState.UP:
				this.y -= this.speed*dt;
				if( this.y <= this.top ){
					this.state = this.ClawState.RETURN;
				}
				break;	//END UP
			
			case this.ClawState.RETURN:
				this.x += clamp(this.speed*dt, 0, CANVAS_WIDTH - this.width);
				if(this.x >= CANVAS_WIDTH - this.width - 10){
					this.state = this.ClawState.HOME;
				}
				break;	//END RETURN
				
			case this.ClawState.HOME:
				//DROP!
				this.open = true;
				break; //END HOME
			};
			this.hitBox.x = this.boxX();
			this.hitBox.y = this.boxY();
		};	
	};
	
	return Claw;
})();

//handles the logic and storage for the claw state
window.ClawContext = (function(){
	function ClawContext(claw){
		this.claw = claw
		this.units = CommandoFactory();
		this.update = function(dt){
			claw.update(dt);
			for(var i = 0; i < this.units.length; i++){
				this.units[i].update(dt);
			};
		};
		
		this.draw = function(){
			claw.draw();
			for(var i = 0; i < this.units.length; i++){
				this.units[i].draw();
			};
		};
	}
	return ClawContext;
})();
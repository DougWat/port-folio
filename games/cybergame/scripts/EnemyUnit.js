"use strict";

//The enemy 
window.EnemyUnit = (function(){
	function EnemyUnit(type, image, speed, hp, attack, difficulty, payout,size){
		//Vars
		this.type = type;
		this.speed = speed;
		this.size = size;
		this.hp = hp;
		this.attack = attack;
		this.difficulty = difficulty;
		this.payout = payout;
		this.maxHP = hp;
		this.color = "black";
		this.spawned = false;
		this.dead = false;
		this.x = game.nodeArray[0].x;
		this.y = game.nodeArray[0].y;
		this.currentNode = 0;
		this.nextNodeX = game.nodeArray[1].x;
		this.nextNodeY = game.nodeArray[1].y;
		this.image = image;
		
		//Movement and angles
		this.xMove = 0;
		this.ymove = 0;
		this.angle = 0;
		
		//Enemy update function
		this.update = function(dt){
			//If it's dead, spawned is false
			if(this.dead){
				this.spawned = false;
				return true;//Returning true tells the main update to delete it from the array
			} else if (this.spawned && !this.dead){
				//If it's HP is 0 it dies
				if(this.hp <= 0){
					this.die();
				};
				
				//If it is within a certain amount of the next node, it calls for the next node
				if(this.x >= this.nextNodeX - 2 && this.x <= this.nextNodeX + 2){
					if(this.y >= this.nextNodeY - 2 && this.y <= this.nextNodeY + 2){
						this.newNode();
					};
				};
				
				this.move(dt);//Enemy moves
				//If it wasen't spawned, and it is not dead, it is created.
			} else if (!this.spawned && !this.dead){
				this.spawned = true;
				this.size = this.size + Math.random() * .5;
				this.findMovement();
			};
		};
		// draws the enemy
		this.draw = function(){
			//var mathColor = Math.floor(( (this.hp / this.maxHP) * 255 ));
			ctx.fillStyle = this.color;
			
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.rotate(this.angle);
			ctx.drawImage(images[this.image],-this.size/2, -this.size/2, this.size, this.size);
			ctx.restore();
		};	
		//moves the enemy based on move values
		this.move = function(dt){
			this.x += this.xMove * dt;
			this.y += this.yMove * dt;
			
			if((this.x < -40 || this.x > PLAYING_WIDTH + 40) || (this.y < -40 || this.y > PLAYING_HEIGHT + 40))
			{
				this.dead = true;	
			}
		};
		//called when enemy reaches a new node
		//Recalculates their movements
		this.newNode = function(){
			this.currentNode++;
			this.x = this.nextNodeX;
			this.y = this.nextNodeY;
			
			//If the unit makes it to the end, it damages the player
			if(!game.nodeArray[this.currentNode].ending){
				this.nextNodeX = game.nodeArray[this.currentNode + 1].x;
				this.nextNodeY = game.nodeArray[this.currentNode + 1].y;
			}else{
				this.damagePlayer();
				return;	
			};
			
			//Determines the angle of the unit
			var dx = this.nextNodeX - this.x;
			var dy = this.nextNodeY - this.y;
			this.angle = Math.atan2(dy,dx);
			//figures x/y movement
			this.findMovement();
		};
		// pays player
		this.die = function(){
			game.playerMoney += this.payout;
			this.color = "red";
			this.dead = true;
			game.numPopArray.push(new NumPop(this.x,this.y,this.payout));
			audio.playKaching(.5);
		};
		//damages player removes enemy unit
		this.damagePlayer = function(){
			this.dead = true;
			game.HP -= this.attack;
		};
		//figures x/y movement
		this.findMovement = function(){
			var arX = game.nodeArray[this.currentNode + 1].x - game.nodeArray[this.currentNode].x;
			var arY = game.nodeArray[this.currentNode +1].y - game.nodeArray[this.currentNode].y;
			var arHyp = Math.sqrt(Math.pow(arX,2) + Math.pow(arY,2));
			this.xMove = ((arX * speed) / arHyp);
			this.yMove = Math.sqrt(Math.pow(speed,2) - Math.pow(this.xMove,2));
			
			if( arY < 0 ){
				this.yMove = -this.yMove;
			};			
		};
	};
	return EnemyUnit;
})();
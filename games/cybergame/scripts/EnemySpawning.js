"use strict";

//Runs the logic that spawns enemy waves
window.EnemySpawner = (function(){
	function EnemySpawner(){
		// vars
		this.enemySpawnBacklog = new Array();
		this.currentEnemy = 0;
		this.maxEnemy;
		this.time = 0;
		this.timeToFire = 0;
		this.first = true;
		this.functionFire;
		
		//updates enemy spawner
		this.update = function(dt){
			if(this.first){
				this.recalculate();
				this.first = false;
			};
			this.time += dt;
			//If time is greater than the time between, fire out an enemy
			if(this.time >= this.timeToFire){
				this.time = 0;
				this.functionFire();
				this.currentEnemy++;
				if(this.currentEnemy >= this.maxEnemy){
					this.enemySpawnBacklog.splice(0,1);
					if(this.enemySpawnBacklog.length > 0){
						this.recalculate(); //if theres no other enemys in this round to spawn, it recalculates
					};
				};
			};
		};
		//type, image, frames, speed, hp, attack, difficulty, payout, size
		this.enemy1 = function () {
			game.enemyUnitArray.push(new EnemyUnit(1, "enemyUnit01", 100, 25, 1, 1, 5, 30));
		};
		//
		this.enemy2 = function () {
			game.enemyUnitArray.push(new EnemyUnit(2, "enemyUnit02", 75, 30, 2, 1, 5, 35));
		};
		//
		this.enemy3 = function () {
			game.enemyUnitArray.push(new EnemyUnit(3, "enemyUnit03", 110, 25, 2, 2, 5, 30));
		};
		//
		this.enemy4 = function () {
			game.enemyUnitArray.push(new EnemyUnit(4, "enemyUnit04", 150, 5, 1, 2, 1, 20));
		};
		this.enemy5 = function () {
			game.enemyUnitArray.push(new EnemyUnit(5, "enemyUnit05", 100, 100, 20, 3, 10, 60));
		};
		this.enemy6 = function(){
			game.enemyUnitArray.push(new EnemyUnit(6, "enemyUnit06", 200, 1, 1, 2, 1, 15));
		};
		
		//Finds the current enemy to spawn, as well as the time between spawns, and amount to spawn
		this.recalculate = function(){
			this.currentEnemy = 0;
			this.maxEnemy = this.enemySpawnBacklog[0].amt;
			this.timeToFire = this.enemySpawnBacklog[0].time / this.enemySpawnBacklog[0].amt;
			
			//Pushes the enemy dependent on switch representing type
			switch( this.enemySpawnBacklog[0].type ){
				case 0:
					this.functionFire = function(){};
					break;
				case 1:
					this.functionFire = this.enemy1;
					break;
				case 2:
					this.functionFire = this.enemy2;
					break;
				case 3:
					this.functionFire = this.enemy3;
					break;
				case 4:
					this.functionFire = this.enemy4;
					break;
				case 5:
					this.functionFire = this.enemy5;
					break;
				case 6:
					this.functionFire = this.enemy6;
					break;
			};	
		};
	};
	return EnemySpawner;
})();

//Store the type, amount, and spawn time of an enemy wave
window.EnemyBacklog = (function(){
	function EnemyBacklog(type, amt, time){
		this.type = type;
		this.amt = amt;	
		this.time = time;
	};
	return EnemyBacklog;
})();


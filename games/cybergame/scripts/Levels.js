"use strict";

//Populates an array of all the levels 
function populateLevels(){
	console.log("populate levels");
	var s = new Array();
	var levelIndex = 0;
	var start = true;
	
	//*********************
	//***ADD LEVELS HERE***
	//*********************
	
	//Level 1
	s.push(1);//A push of any single number needed at the start of every level push
	s.push(new EnemyBacklog(1,1,1));//Then push whatever backlogs into s that you want for that level
	
	//Level 2
	s.push(1);
	s.push(new EnemyBacklog(1,3,5));
	
	//Level 3
	s.push(1);
	s.push(new EnemyBacklog(1,10,15));
	
	//So on...
	s.push(1);
	s.push(new EnemyBacklog(1,4,5));
	s.push(new EnemyBacklog(0,1,2));
	s.push(new EnemyBacklog(1,5,5));
	
	s.push(1);
	s.push(new EnemyBacklog(1,6,4));
	s.push(new EnemyBacklog(0,1,2));
	s.push(new EnemyBacklog(1,6,4));
	
	s.push(1);
	s.push(new EnemyBacklog(1,10,5));
	s.push(new EnemyBacklog(0,1,2));
	s.push(new EnemyBacklog(1,10,5));
	
	s.push(1);
	s.push(new EnemyBacklog(1,15,6));
	s.push(new EnemyBacklog(0,1,3));
	s.push(new EnemyBacklog(1,10,5));
	s.push(new EnemyBacklog(1,5,5));
	
	s.push(1);
	s.push(new EnemyBacklog(1,3,2));
	s.push(new EnemyBacklog(2,3,5));
	s.push(new EnemyBacklog(0,1,3));
	s.push(new EnemyBacklog(1,6,3));
	s.push(new EnemyBacklog(2,3,4));
	
	s.push(1);
	s.push(new EnemyBacklog(2,5,3));
	s.push(new EnemyBacklog(1,2,2));
	s.push(new EnemyBacklog(2,2,2));
	s.push(new EnemyBacklog(1,6,3));
	s.push(new EnemyBacklog(0,1,4));
	s.push(new EnemyBacklog(2,3,2));
	
	s.push(1);
	s.push(new EnemyBacklog(2,5,5));
	s.push(new EnemyBacklog(3,6,3));
	s.push(new EnemyBacklog(0,1,5));
	s.push(new EnemyBacklog(3,15,6));
	s.push(new EnemyBacklog(0,1,6));
	
	s.push(1);
	s.push(new EnemyBacklog(2,10,3));
	s.push(new EnemyBacklog(1,20,5));
	s.push(new EnemyBacklog(3,20,12));
	s.push(new EnemyBacklog(0,1,3));
	s.push(new EnemyBacklog(1,15,2));
	s.push(new EnemyBacklog(3,10,5));
	s.push(new EnemyBacklog(1,15,2));
	
	s.push(1);
	s.push(new EnemyBacklog(2,20,4));
	s.push(new EnemyBacklog(1,15,5));
	s.push(new EnemyBacklog(4,25,3));
	
	s.push(1);
	s.push(new EnemyBacklog(1,40,8));
	s.push(new EnemyBacklog(4,50,5));
	s.push(new EnemyBacklog(4,50,5));
	
	s.push(1);
	s.push(new EnemyBacklog(2,15,3));
	s.push(new EnemyBacklog(1,20,5));
	s.push(new EnemyBacklog(4,20,5));
	s.push(new EnemyBacklog(4,10,3));
	s.push(new EnemyBacklog(0,1,3));
	s.push(new EnemyBacklog(2,10,3));
	s.push(new EnemyBacklog(3,10,5));
	s.push(new EnemyBacklog(4,15,5));
	
	s.push(1);
	s.push(new EnemyBacklog(5,5,5));
	
	s.push(1);
	s.push(new EnemyBacklog(5,10,8));
	s.push(new EnemyBacklog(2,20,5));
	s.push(new EnemyBacklog(1,20,5));
	s.push(new EnemyBacklog(3,15,3));
	s.push(new EnemyBacklog(0,1,3));
	s.push(new EnemyBacklog(5,10,3));
	s.push(new EnemyBacklog(3,20,5));
	s.push(new EnemyBacklog(2,15,3));
	s.push(new EnemyBacklog(4,15,5));
	
	s.push(1);
	s.push(new EnemyBacklog(5,3,1));
	s.push(new EnemyBacklog(2,25,5));
	s.push(new EnemyBacklog(5,3,1));
	s.push(new EnemyBacklog(1,25,5));
	s.push(new EnemyBacklog(5,3,1));
	s.push(new EnemyBacklog(4,50,3));
	s.push(new EnemyBacklog(0,1,3));
	s.push(new EnemyBacklog(5,4,2));
	s.push(new EnemyBacklog(3,20,5));
	s.push(new EnemyBacklog(2,20,3));
	s.push(new EnemyBacklog(4,30,4));
	
	s.push(1);
	s.push(new EnemyBacklog(6,30,4));
	s.push(new EnemyBacklog(5,2,1));
	s.push(new EnemyBacklog(4,20,2));
	s.push(new EnemyBacklog(5,3,2));
	s.push(new EnemyBacklog(4,15,2));
	s.push(new EnemyBacklog(6,30,4));
	s.push(new EnemyBacklog(0,1,3));
	s.push(new EnemyBacklog(5,6,3));
	s.push(new EnemyBacklog(2,20,3));
	s.push(new EnemyBacklog(3,25,5));
	s.push(new EnemyBacklog(4,30,5));
	
	s.push(1);
	s.push(new EnemyBacklog(5,5,4));
	s.push(new EnemyBacklog(6,30,4));
	s.push(new EnemyBacklog(4,30,4));
	s.push(new EnemyBacklog(6,30,4));
	
	s.push(1);
	s.push(new EnemyBacklog(6,30,4));
	s.push(new EnemyBacklog(4,20,2));
	s.push(new EnemyBacklog(5,4,1));
	s.push(new EnemyBacklog(4,15,2));
	s.push(new EnemyBacklog(5,10,4));
	s.push(new EnemyBacklog(6,30,4));
	s.push(new EnemyBacklog(2,20,3));
	s.push(new EnemyBacklog(3,30,5));
	s.push(new EnemyBacklog(4,35,5));
	s.push(new EnemyBacklog(6,30,3));
	
	s.push(1);
	s.push(new EnemyBacklog(5,20,3));
	s.push(new EnemyBacklog(5,4,1));
	s.push(new EnemyBacklog(4,25,2));
	s.push(new EnemyBacklog(1,10,4));
	s.push(new EnemyBacklog(2,30,4));
	s.push(new EnemyBacklog(3,30,3));
	s.push(new EnemyBacklog(3,30,5));
	s.push(new EnemyBacklog(4,40,5));
	s.push(new EnemyBacklog(6,30,3));

	
	//Creates the levels from the data above
	for(var i = 0; i < s.length; i++){
		if(!isNaN(s[i])) {
			if(!start) {
				levelIndex++;
				game.levelArray[levelIndex] = new EnemySpawner();
			} else {
				game.levelArray[0] = new EnemySpawner();
				start = false;	
			};
		} else {
			game.levelArray[levelIndex].enemySpawnBacklog.push(s[i]);	
		};
	};
};

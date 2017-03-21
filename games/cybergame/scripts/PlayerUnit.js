"use strict";

//A unit the player palced
window.PlayerUnit = (function(){
	function PlayerUnit(p){
		this.type = p.type;
		this.img = p.img; // path to img for this unit
		this.frames = p.frames; // number of frames in animation
		this.speed = p.upgrades.speeds; // how fast the unit fires
		this.attack = p.upgrades.attacks; // how much each hit does
		this.atkPrice = p.upgrades.atkPrice;
		this.radPrice = p.upgrades.radPrice;
		this.price = p.price;
		this.x = mouseX;
		this.y = mouseY;
		this.radi = p.upgrades.radi; // range of unit
		this.hover = false;
		this.selected = false;
		
		this.clicked = false; // unused currently
		this.target = null; // current target
		this.unitWidth = images[this.img].width * 1.5;
		this.unitHeight = images[this.img].height * 1.5;
		this.angle = Math.random() * 4;
		this.upAtk = 1;
		this.upRad = 1;
		
		this.fireRate = p.upgrades.fireRate;
		this.gunFire = 0;
		this.drawFire = false;
		this.shotSound = p.upgrades.shotSound;
		audio.playDeployClick(.5);
		
		//updates target as well as angle
		this.update = function(mod){
			this.gunFire += mod;
			//If there is a target, then update angle and fire
			if( this.target != null ){
				//Determines the angle of the unit to the target
				var dx = this.target.x - this.x;
				var dy = this.target.y - this.y;
				this.angle = Math.atan2(dy,dx);
				
				//If the cooldown period is over, the unit fires
				if(this.gunFire > this.fireRate){
					//deal dmg to target
					if(this.type != "Sniper Unit" && this.type != "DickShifter"){
						this.target.hp -= this.attack[this.upAtk -1] * this.fireRate;
					}else{
						this.target.hp -= this.attack[this.upAtk -1];
					}
					audio.playGunshot(.1);
					this.gunFire = 0;
					this.drawFire = true;
				};
				// if target is dead
				if( this.target.hp < 1 ){
					this.target = null; // reset target
				} else {
					// if target is out of range, then reset target
					if( lineDistance(this.x, this.target.x, this.y, this.target.y) > this.radi[this.upRad - 1] ){
						this.target = null;
					};
				};
			} else { // no target, find new target
				var lowest = 100000; 
				var strongest = -1;
				for( var i = 0; i < game.enemyUnitArray.length; i++){
					var dist = lineDistance(this.x, game.enemyUnitArray[i].x, this.y, game.enemyUnitArray[i].y);
					var strength = game.enemyUnitArray[i].attack;
					
					if(this.type == "Sniper Unit" || this.type == "DickShifter"){
						if(strongest < strength && dist < lowest && dist <= this.radi[this.upRad - 1]){
							this.target = game.enemyUnitArray[i];
							strongest = strength;
							lowest = dist;
						};
					}else{
						if( dist < lowest && dist <= this.radi[this.upRad - 1]){
							lowest = dist;
							this.target = game.enemyUnitArray[i];
						};	
					};
				};
			};
		};
		
		// Draws unit
		this.draw = function(){
			//If the unit is selected, a radius is drawn around it.
			if(this.selected && this.type != "Sniper Unit"){
				ctx.globalAlpha = .5;
				ctx.drawImage(images["targetRadiImg"],this.x - this.radi[this.upRad - 1],this.y - this.radi[this.upRad - 1],this.radi[this.upRad - 1]*2,this.radi[this.upRad - 1]*2);
				ctx.globalAlpha = 1;
			}else if(this.selected && this.type == "Sniper Unit"){
				ctx.globalAlpha = .3;
				ctx.drawImage(images["targetRadiImg"],this.x - this.radi[this.upRad - 1],this.y - this.radi[this.upRad - 1],this.radi[this.upRad - 1]*2,this.radi[this.upRad - 1]*2);
				ctx.globalAlpha = 1;
			};
			//If the unit has a target, a line is drawn to that target
			
			if(this.target != null){
				if(this.drawFire == true){
					ctx.beginPath();
					ctx.moveTo(this.x,this.y);
					ctx.strokeStyle = "yellow";
					ctx.lineWidth = 1;
					ctx.lineTo(this.target.x,this.target.y);
					ctx.stroke();
					ctx.closePath();
					this.drawFire = false;
				};
			};
			//draws unit
			ctx.save();
			ctx.translate(this.x,this.y);
			if(this.img == "unit04Base"){
				ctx.drawImage(images["unit04Base"],-this.unitWidth/2, -this.unitHeight/2, this.unitWidth, this.unitHeight);
			};
			ctx.rotate(this.angle);
			if(this.img != "unit04Base"){
				ctx.drawImage(images[this.img],-10, -this.unitHeight/2, this.unitWidth, this.unitHeight);
			}else{
				ctx.drawImage(images["unit04Top"],-18, -images["unit04Top"].height*1.5/2, images["unit04Top"].width*1.5, images["unit04Top"].height*1.5);
			};
			ctx.restore();
		};
	};
	return PlayerUnit;
})();

//Holds values related to the unit
window.UnitType = (function(){
	function UnitType( type, img, frames, upgrades, price, radi, desc){
		this.type = type;
		this.img = img;
		this.frames = frames;
		this.upgrades = upgrades;
		this.price = price;
		this.desc = desc;
	};
	return UnitType;
})();

//Holds relevent variables for upgrading
window.UpgradeVals = (function(){
	function UpgradeVals(a, r, ap, rp,fireRate){
		this.attacks = a;
		this.radi = r;
		this.atkPrice = ap;
		this.radPrice = rp;
		this.fireRate = fireRate;
	};
	return UpgradeVals;
})();

//Populates the PlyType array with all possible player types
function populatePlayerUnits(){
	//Ground Unit
	var unit1Upgrades = new UpgradeVals(new Array(20,25,33,50),new Array(110,120,140,170),
										new Array(50,100,200), new Array(100,150,250),.8);
	game.plyType.push(new UnitType("Ground Unit","unit01", 20,unit1Upgrades,150,"THIS IS A DESCRIPTION"));
	
	var unit2Upgrades = new UpgradeVals(new Array(15,17,20,25), new Array(120,130,145,180),
										new Array(200,200,200), new Array(100,200,300),.1);
	game.plyType.push(new UnitType("Rapid Fire","rapidFire",20,unit2Upgrades,250,"ANOTHER GOD DAMN DESCRIPTION"));
	
	//Assault Unit
	var unit3Upgrades = new UpgradeVals(new Array(40,55,70,90),new Array(75,90,100,130),
										new Array(150,200,350), new Array(150,300,500),.5);
	game.plyType.push(new UnitType("Assault Unit","unit02", 20,unit3Upgrades,300,"THIS IS A DESCRIPTION"));
	
	var commandoUnit = new UpgradeVals(new Array(30,35,43,60),new Array(50,60,85,100),
										new Array(150,200,350), new Array(150,300,500),.3);
	game.plyType.push(new UnitType("Commando","commando", 20,commandoUnit,300,"THIS IS A DESCRIPTION"));
	
	var sniperUnitUpgrades = new UpgradeVals(new Array(20,40,60,100), new Array(500,500,500,500),
											new Array(300,400,600), new Array(0,0,0),6);
	game.plyType.push(new UnitType("Sniper Unit","sniper",20,sniperUnitUpgrades,400,"KILLS THINGS"));
	
	//Heavy Unit
	var unit4Upgrades = new UpgradeVals(new Array(50,60,80,120),new Array(40,50,65,80),
										new Array(350,450,600), new Array(200,250,700),.4);
	game.plyType.push(new UnitType("Heavy Unit","unit03",20,unit4Upgrades,600,"THIS IS ANOTHER DESCRIPTION"));
	
	//DickShifter...?
	var unit5Upgrades = new UpgradeVals(new Array(200,300,400,500),new Array(90,100,110,120),
										new Array(1000,1150,1300), new Array(300,400,500),10);
	game.plyType.push(new UnitType("DickShifter","unit04Base",20,unit5Upgrades,1000,"THIS IS ANOTHER DESCRIPTION"));
};

//Draws the preview image of the unit
function renderSelection(){
	if( game.buttonSelection != -1 ){
		//Checks if the unit can be placed. if it can, the radius is green, if not, it is red.
		if(!game.collisions.unitColliding && !game.collisions.colliding){
			ctx.fillStyle = "rgba(0,140,0,.3)";
		} else {
			ctx.fillStyle = "rgba(140,0,0,.3)";
		}
		//Draws the radius
		ctx.beginPath();
		ctx.arc(mouseX, mouseY, game.plyType[game.buttonSelection].upgrades.radi[0], 0 , 2*Math.PI, false);
		ctx.fill();
		ctx.strokeStyle = "rgba(0,0,0.3)";
		//ctx.stroke();
		
		//Draws the unit
		var thisImage = game.plyType[game.buttonSelection].img;
		ctx.drawImage(images[thisImage],mouseX - images[thisImage].width * 1.5/2,mouseY - images[thisImage].height * 1.5/2,images[thisImage].width * 1.5, images[thisImage].height * 1.5);
	};
};

"use strict";

//These be images
 var IMAGE_SOURCES = {
 	unitButtonSelected: "images/buttons/button_selected.png",
 	unitButtonUnselected: "images/buttons/button_unselected.png",
	unitButtonHover: "images/buttons/button_hover.png",
	unitButtonGrayed: "images/buttons/button_grayed.png",
	sellButtonOn: "images/buttons/sellbutton_on.png",
	sellButtonOff: "images/buttons/sellbutton_off.png",
	sellButtonHover: "images/buttons/sellbutton_hover.png",
	
	upgradeButtonOn: "images/buttons/upgradebutton_on.png",
	upgradeButtonOff: "images/buttons/upgradebutton_off.png",
	upgradeButtonHover: "images/buttons/upgradebutton_hover.png",
	
	playButtonOn: "images/buttons/playbutton_on.png",
	playButtonOff: "images/buttons/playbutton_off.png",
	playButtonHover: "images/buttons/playbutton_hover.png",
	
	upgradeLineOn: "images/assets/upgradeline_on.png",
	upgradeLineOff: "images/assets/upgradeline_off.png",
	upgradeDisplay: "images/assets/display.png",
	
	backgroundGrid01: "images/assets/background_grid01.png",
	backgroundGrid02: "images/assets/background_grid02.png",
	backgroundGrid03: "images/assets/background_grid03.png",
	backgroundStars: "images/assets/background_stars.png",
	backgroundFloor: "images/assets/background_floor.png",
	
	unit01: "images/units/player/unit01.png",
	unit02: "images/units/player/unit02.png",
	unit03: "images/units/player/unit03.png",
	unit04Base: "images/units/player/unit04_base.png",
	unit04Top: "images/units/player/unit04_top.png",
	targetRadiImg: "images/assets/targetradi.png",
	rapidFire: "images/units/player/rapidfire.png",
	sniper: "images/units/player/sniper.png",
	commando: "images/units/player/commando.png",
	
	enemyUnit01: "images/units/enemy/normal_unit.png",
	enemyUnit02: "images/units/enemy/medium_unit.png",
	enemyUnit03: "images/units/enemy/large_unit.png",
	enemyUnit04: "images/units/enemy/small_unit.png",
	enemyUnit05: "images/units/enemy/massive_unit.png",
	enemyUnit06: "images/units/enemy/tiny_unit.png",
	
	startScreen: "images/startscreen.png",
	scanLines: "images/assets/scanlines.png",
	scanLines_Short: "images/assets/scanlines_short.png",
	
	ssBorder:"images/startscreen/ssborder.png",
	ssSpace:"images/startscreen/ssspace.png",
	ssGrid:"images/startscreen/ssgrid.png",
	ssMountain:"images/startscreen/ssmountain.png",
	ssTitle:"images/startscreen/sstitle.png",
	ssBolt:"images/startscreen/ssbolt.png",
	ssColors:"images/startscreen/sscolors.png",
	
	border: "images/assets/border.png",
	upgradePanel: "images/assets/upgradepanel.png",
	unitSidePanel: "images/assets/unitsidepanel.png",
	infoBox: "images/assets/infobox.png"
 };
 
 var images = {};

//Loads images
function loadImages(){
	
 	var numLoadedImages = 0;
 	var numImages = 0;

 	for (var imageName in IMAGE_SOURCES) {
		numImages++;
 	}

 	for (var imageName in IMAGE_SOURCES) {
		console.log("Started loading " + imageName);
 		images[imageName] = new Image();
 		images[imageName].src = IMAGE_SOURCES[imageName];
 		images[imageName].onload = function () {

 			console.log(this.src + " load complete");

 			if (++numLoadedImages >= numImages) {
 				console.log("Done loading images");
 				init();
 			}
 		};
 	}
}
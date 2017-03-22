"use strict"

var Interface = function (pTut) {

    this.healthbg = game.add.sprite(20, 20, 'healthbar');
    this.healthbar = game.add.sprite(20, 20, 'healthbar');
    
    this.multibg = game.add.sprite(500, 20, 'healthbar');
    this.multibar = game.add.sprite(500, 20, 'healthbar');
    this.multibar.tint = rgb(255,100,100);

    this.default = true;
    var pDef = game.add.sprite(270, 35, 'uiwepdefault');
    pDef.anchor.set(.5);

    var pkupHalfWidth = pDef.width / 2;
    var pkupSpace = 40;
    var selLine = game.add.sprite(0, 60, 'healthbar');
    selLine.tint = rgb(30, 255, 30);
    selLine.anchor.set(.5);
    selLine.scale.set(.25);
    selLine.width = pDef.width;

    this.spread = false;
    var pSpread = game.add.sprite(pDef.x + pkupHalfWidth + pkupSpace, pDef.y, 'uiwepspread');
    pSpread.anchor.set(.5);
    pSpread.alpha = .5;
    pSpread.tint = rgb(0, 0, 0);

    this.crazy = false;
    var pCrazy = game.add.sprite(pSpread.x + pkupHalfWidth + pkupSpace, pDef.y, 'uiwepcrazy');
    pCrazy.anchor.set(.5);
    pCrazy.alpha = .5;
    pCrazy.tint = rgb(0, 0, 0);

    this.score = game.add.text(game.world.width - 80, 20, "SCORE", {
        font: "20px Arial",
        fill: "#333333"
    });

    this.scoreMulti = game.add.text(20, 70, "x" + game.state.callbackContext.score.multiplyer, {
        font: "20px Arial",
        fill: "#333333"
    });
    this.tutText = null;

    this.score.align = "left";
    this.currentWep = 0;

    this.update = function () {
        var size = game.state.callbackContext.player.health / 100;
        var tint = rgb((255 - (255 * size)), (255 * size), 0);

        this.healthbar.scale = new Phaser.Point(size, 1);
        this.healthbar.tint = tint;
        
        var multiSize = game.state.callbackContext.score.scoreMulti / 5;
        this.multibar.scale = new Phaser.Point(multiSize,1);

        this.score.text = game.state.callbackContext.score.score;
        this.scoreMulti.text = "x" + game.state.callbackContext.score.multiplyer;

        this.currentWep = game.state.callbackContext.currentWeapon;

        if (this.currentWep == 0) {
            selLine.x = pDef.x;
        } else if (this.currentWep == 1) {
            selLine.x = pSpread.x;
            if (!this.spread) {
                this.activateWepon("spread");
            }
        } else if (this.currentWep == 2) {
            selLine.x = pCrazy.x;
            if (!this.crazy) {
                this.activateWepon("crazy");
            }
        }
    }

    this.activateWepon = function (type) {
        if (type == "spread") {
            this.spread = true;
            pSpread.alpha = 1;
            pSpread.tint = rgb(255, 255, 255);
        } else if (type == "crazy") {
            this.crazy = true;
            pCrazy.alpha = 1;
            pCrazy.tint = rgb(255, 255, 255);
        }
    }
}
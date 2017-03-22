'use strict';

/**
 * Based on screenshake plugin
 */
Phaser.Plugin.ScreenVibe = function (game, parent) {
    Phaser.Plugin.call(this, game, parent);

    //settings by default
    this._settings = {
        shakeX: true,
        shakeY: true,
        xVal: 0,
        yVal: 0,
        sensCoef: 1
    };
    this.game.camera.bounds = null;

    /**
     * screen shake FX.
     */
    this._moveCamera = function () {

        var gameSpeed = game.state.callbackContext.speed - 6;
        if(this._settings.xVal == 0)
        {
            this._settings.xVal = game.rnd.between(-gameSpeed/5,gameSpeed/5);   
        }else{this._settings.xVal = 0;}
        
        if(this._settings.yVal == 0)
        {
            this._settings.yVal = game.rnd.between(-gameSpeed/5,gameSpeed/5);   
        }else{this._settings.yVal = 0;}
        
        this.game.camera.x += this._settings.shakeX ? this._settings.xVal : 0;
        this.game.camera.y += this._settings.shakeY ? this._settings.yVal : 0;  
        
        if(this.game.camera.x > 10 || this.game.camera.x < -10)
        {
         this.game.camera.x = 0;
        }
        
        if(this.game.camera.y > 10 || this.game.camera.y < -10)
        {
         this.game.camera.y = 0;
        }
    };
};

Phaser.Plugin.ScreenVibe.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.ScreenVibe.prototype.constructor = Phaser.Plugin.ScreenVibe;

Phaser.Plugin.ScreenVibe.prototype.setup = function (obj) {
    this._settings = Phaser.Utils.extend(false, this._settings, obj);
};


Phaser.Plugin.ScreenVibe.prototype.shake = function () {
        this._moveCamera();
};

Phaser.Plugin.ScreenVibe.prototype.update = function () {
    
};
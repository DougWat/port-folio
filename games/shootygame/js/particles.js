"use strict";

var ParticleHandler = function () {

    var healthAddOrbs = game.add.emitter(0, 0, 100);
    healthAddOrbs.makeParticles('flash');
    healthAddOrbs.gravity = 0;
    healthAddOrbs.setScale(.3, .5, .3, .5);
    healthAddOrbs.setXSpeed(-700, 700);
    healthAddOrbs.setYSpeed(-700, 700);
    healthAddOrbs.setAlpha(.7, 1);

    healthAddOrbs.forEach(function (orb) {
        orb.anchor.setTo(0.5, 0.5);
        orb.body.allowRotation = false;
        orb.tint = rgb(0, game.rnd.between(200,255), 0);
        orb.seeking = false;
        orb.body.drag.setTo(-300, -300);
        game.physics.enable(orb, Phaser.Physics.ARCADE);

        orb.update = function () {

            var plyX = game.state.callbackContext.player.player.body.x;
            var plyY = game.state.callbackContext.player.player.body.y;
            var plyW = game.state.callbackContext.player.player.width;
            var plyH = game.state.callbackContext.player.player.height;
            game.physics.arcade.accelerateToXY(orb, plyX + plyW / 2, plyY + plyH / 2, 4000);
            if (this.lifespan < 6000) {
                game.physics.arcade.moveToXY(orb, plyX + plyW / 2, plyY + plyH / 2, 1000);
            }
            game.physics.arcade.overlap(orb, game.state.callbackContext.player.player, function () {
                orb.kill();
                if (game.state.callbackContext.player.health < 100) {
                    game.state.callbackContext.player.health++;
                }
            }, null, this);
        }
    }, this);
    
    var enemyPointOrbs = game.add.emitter(0, 0, 500);
    enemyPointOrbs.makeParticles('flash');
    enemyPointOrbs.gravity = 0;
    enemyPointOrbs.setXSpeed(-200, 200);
    enemyPointOrbs.setYSpeed(-400, 400);
    enemyPointOrbs.setScale(.2, .4, .2, .4);
    enemyPointOrbs.setAlpha(.7, .9);

    enemyPointOrbs.forEach(function (orb) {
        orb.anchor.setTo(0.5, 0.5);
        orb.body.allowRotation = false;
        orb.tint = rgb(255, game.rnd.between(150, 255), 0);
        orb.seeking = false;
        orb.body.drag.setTo(-300, -300);
        game.physics.enable(orb, Phaser.Physics.ARCADE);

        orb.update = function () {

            var plyX = game.state.callbackContext.player.player.body.x;
            var plyY = game.state.callbackContext.player.player.body.y;
            var plyW = game.state.callbackContext.player.player.width;
            var plyH = game.state.callbackContext.player.player.height;
            game.physics.arcade.accelerateToXY(orb, plyX + plyW / 2, plyY + plyH / 2, 4000);
            if (this.lifespan < 6000) {
                game.physics.arcade.moveToXY(orb, plyX + plyW / 2, plyY + plyH / 2, 1000);
            }
            game.physics.arcade.overlap(orb, game.state.callbackContext.player.player, function () {
                orb.kill();
                game.state.callbackContext.score.addPoints();
            }, null, this);
        }
    }, this);

    var men = game.add.emitter(0, 0, 20);
    men.makeParticles('man');
    men.setRotation(-360, 360);
    men.gravity = 500;
    men.minParticleSpeed.set(-200, -250);
    men.maxParticleSpeed.set(200, -150);

    var clouds = game.add.emitter(game.world.width + 200, game.world.centerY, 20);
    clouds.makeParticles(['cloud1', 'cloud2', 'cloud3']);
    clouds.height = game.world.height;
    clouds.setRotation(0, 0);
    clouds.setAlpha(.05, .3);
    clouds.particleSendToBack = true;

    clouds.setScale(.8, .8, 1.2, 1.2);
    clouds.minParticleSpeed.set(-150, 0);
    clouds.maxParticleSpeed.set(-250, 0);
    clouds.gravity = 0;
    
    clouds.forEach(function (cloud) {
        game.physics.enable(cloud,Phaser.Physics.ARCADE);
        
        cloud.mainSpeed = game.rnd.between(100,200);
        
        cloud.update = function(){
            cloud.body.velocity.x = -cloud.mainSpeed * game.state.callbackContext.speed;
            if(cloud.body.x < -300){cloud.kill();}
        }
    },this);
    
    clouds.start(false, 15000, 2000);

    var explosion = game.add.emitter(0, 0, 50);
    explosion.makeParticles('flash');
    explosion.setScale(3.0, 4.0, 3.0, 4.0);
    explosion.setAlpha(.3, .6);
    explosion.minParticleSpeed.set(-300, -300);
    explosion.maxParticleSpeed.set(300, 300);
    explosion.setRotation(-360, 360);

    var smallExplosion = game.add.emitter(0, 0, 50);
    smallExplosion.makeParticles('flash');
    smallExplosion.setScale(1.0, 2.0, 1.0, 2.0);
    smallExplosion.setAlpha(.3, .6);
    smallExplosion.minParticleSpeed.set(-100, -100);
    smallExplosion.maxParticleSpeed.set(100, 100);
    smallExplosion.setRotation(-360, 360);

    var jetFlame = game.add.emitter(0,0,50);
    jetFlame.makeParticles('flash');
    jetFlame.setScale(.7,1,.7,1);
    jetFlame.setAlpha(.3, .6);
    jetFlame.minParticleSpeed.set(-200,0);
    jetFlame.maxParticleSpeed.set(-150,0);
    jetFlame.gravity = 0;
    jetFlame.forEach(function (flame) {
            flame.tint = rgb(150, 150, 150);
        
        flame.update = function(){
               
        }
    }, this);
    
    
    this.update = function () {

        healthAddOrbs.forEachExists(function (orb) {
            orb.update();
        }, this);

        enemyPointOrbs.forEachExists(function (orb) {
            orb.update();
        }, this);

        explosion.forEachExists(function (p) {
            p.alpha = p.lifespan / explosion.lifespan;
        }, this);

        smallExplosion.forEachExists(function (p) {
            p.alpha = p.lifespan / explosion.lifespan;
        }, this);
        
        clouds.frequency = 2000/game.state.callbackContext.speed;
        
        clouds.forEachExists(function (p) {
            p.update();
        },this);
        
        jetFlame.forEachExists(function (p) {
            p.update();
        },this);
    }

    this.spawnHealthOrbs = function (amt, x, y) {
        healthAddOrbs.x = x;
        healthAddOrbs.y = y;
        healthAddOrbs.start(true, 10000, null, amt);
    }

    this.spawnPointOrbs = function (amt, x, y) {
        enemyPointOrbs.x = x;
        enemyPointOrbs.y = y;
        enemyPointOrbs.start(true, 10000, null, amt);
    }

    this.spawnMen = function (amt, x, y) {
        men.x = x;
        men.y = y;
        men.start(true, 3000, null, amt)
    }

    this.spawnExplosion = function (amt, x, y) {
        explosion.x = x;
        explosion.y = y;
        explosion.start(true, 300, null, amt);
    }

    this.spawnSmallEx = function (amt, x, y) {
        smallExplosion.x = x;
        smallExplosion.y = y;
        smallExplosion.start(true, 300, null, amt);
    }
    

}
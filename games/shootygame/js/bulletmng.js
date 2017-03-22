"use strict";

var Bullet = function (x, y, texture, type, emit, scale) {
    Phaser.Sprite.call(this, game, x, y, texture);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;
    this.anchor.set(.5);

    this.tracking = false;
    this.damage = null;
    this.type = type || "default";
    this.speed = null;
    this.emitter = null;

    this.shootFX = game.add.audio('laser1');

    if (emit) {
        this.emitter = game.add.emitter(game.world.width + 200, 0, 50);
        this.emitter.makeParticles('flash');
        this.emitter.gravity = 0;
        this.emitter.forEach(function (t) {
            t.tint = rgb(150, 150, 150);
        }, this);
        this.emitter.setAlpha(.1, .2);
        this.emitter.setScale(.4, .5, .4, .5);
        this.shootFX = game.add.audio('missle');
    }
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {
    gx = gx || 0;
    gy = gy || 0;

    this.reset(x + 20, y + 15);
    this.scale.set(1);
    this.angle = angle;
    this.speed = speed;

    this.game.physics.arcade.velocityFromAngle(angle, this.speed, this.body.velocity);

    this.body.gravity.set(gx, gy);
    this.shootFX.play("", 0, volume - .2);
};

Bullet.prototype.update = function () {

    if (this.type == "crazy") {
        this.angle += game.rnd.between(-3, 3);
        this.game.physics.arcade.velocityFromAngle(this.angle, this.speed, this.body.velocity);
    }else{
        this.scale.y = 1 + game.state.callbackContext.speed / 20;   
        var p = (Math.abs(this.speed) + (game.state.callbackContext.speed/10) * 200)/Math.abs(this.speed);
        this.game.physics.arcade.velocityFromAngle(this.angle, this.speed * p, this.body.velocity);
        this.damage
    }

    if (this.tracking) {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0) {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }

    if (this.emitter != null) {
        this.emitter.x = this.body.x;
        this.emitter.y = this.body.y + 10;
        this.emitter.start(true, 100, null, 5);
    }
};

Bullet.prototype.makeDead = function () {
    this.kill();
}

var SuperMissle = function (x, y, texture) {
    Phaser.Sprite.call(this, game, x, y, texture);

    this.exists = false;
    this.anchor.set(.5);
    this.moveTween = null;

    this.tracking = false;
    this.damage = null;
    this.type = "supermissle";
    this.speed = null;
    this.emitter = game.add.emitter(game.world.width + 200, 0, 50);
    this.emitter.makeParticles('flash');
    this.emitter.gravity = 0;
    this.emitter.forEach(function (t) {
        t.tint = rgb(150, 150, 150);
    }, this);
    this.emitter.setAlpha(.1, .2);
    this.emitter.setScale(.4, .5, .4, .5);

    this.dropFX = game.add.audio('missle');
    this.fireFX = game.add.audio('supermissle');
};

SuperMissle.prototype = Object.create(Phaser.Sprite.prototype);
SuperMissle.prototype.constructor = SuperMissle;

SuperMissle.prototype.fire = function (x, y, speed) {

    this.dropFX.play("", 0, .3);
    this.reset(x + 20, y + 15);
    this.scale.set(1);
    this.speed = speed;
    var startTween = game.add.tween(this).to({
        y: this.body.y + 50
    }, 200, "Sine.easeIn");
    startTween.onComplete.add(this.nextTweens, this);
    startTween.start();

    //this.game.physics.arcade.velocityFromAngle(angle, this.speed, this.body.velocity);

};

SuperMissle.prototype.nextTweens = function () {
    this.fireFX.play("", 0, volume);
    var moveTween = game.add.tween(this).to({
        x: game.world.width + 100
    }, 1000, "Sine.easeIn");

    moveTween.onComplete.add(function () {
        this.kill();
    }, this);
    moveTween.start();
}
SuperMissle.prototype.update = function () {


    //    if (this.tracking) {
    //        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    //    }

    this.emitter.x = this.body.x;
    this.emitter.y = this.body.y + this.height / 2;
    this.emitter.start(true, 100, null, 5);
};

var BasicWeapon = function () {
    Phaser.Group.call(this, game, game.world, 'Basic Weapon', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 1000 + game.rnd.between(0, 200);
    this.fireRate = 50;
    this.damage = 25;

    for (var i = 0; i < 64; i++) {
        this.add(new Bullet(0, 0, 'bullet-p'), true);
    }

    return this;
};

BasicWeapon.prototype = Object.create(Phaser.Group.prototype);
BasicWeapon.prototype.constructor = BasicWeapon;

BasicWeapon.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) {
        return;
    }
    if (this.getFirstExists(false) == null) {
        return;
    }
    var x = source.x + 10;
    var y = source.y + 10 + this.game.rnd.between(-5, 5);
    
    this.getFirstExists(false).damage = this.damage + game.state.callbackContext.speed/20;
    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

BasicWeapon.prototype.update = function () {
    this.fireRate = 200 - game.state.callbackContext.speed * 3;
    this.callAllExists('update', true);
};

var ScatterWeapon = function () {
    Phaser.Group.call(this, game, game.world, 'Scatter', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 45;
    this.damage = 7;

    for (var i = 0; i < 64; i++) {
        this.add(new Bullet(0, 0, 'bullet2-p'), true);
    }

    return this;
};

ScatterWeapon.prototype = Object.create(Phaser.Group.prototype);
ScatterWeapon.prototype.constructor = ScatterWeapon;

ScatterWeapon.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) {
        return;
    }
    if (this.getFirstExists(false) == null) {
        return;
    }

    var x = source.x + 10;
    var y = source.y + 10 + this.game.rnd.between(-10, 10);
    var distBetween = game.state.callbackContext.speed * 1.3;
    
    this.getFirstExists(false).damage = this.damage;
    this.getFirstExists(false).fire(x, y - 3 - distBetween, 0, this.bulletSpeed, 0, 0);
    
    if (this.getFirstExists(false) == null) {
        return;
    }
    this.getFirstExists(false).damage = this.damage;
    this.getFirstExists(false).fire(x, y + 3 + distBetween, 0, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

ScatterWeapon.prototype.update = function () {
    this.callAllExists('update', true);
};

var CrazySpread = function () {
    Phaser.Group.call(this, game, game.world, 'Crazy', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 275;
    this.damage = 30;

    for (var i = 0; i < 20; i++) {
        this.add(new Bullet(0, 0, 'bullet3-p', 'crazy', true), true);
    }

    return this;
};

CrazySpread.prototype = Object.create(Phaser.Group.prototype);
CrazySpread.prototype.constructor = CrazySpread;

CrazySpread.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) {
        return;
    }
    if (this.getFirstExists(false) == null) {
        return;
    }

    var x = source.x + 10;
    var y = source.y + 10 + this.game.rnd.between(-10, 10);

    this.getFirstExists(false).damage = this.damage;
    this.getFirstExists(false).fire(x, y - 10, 0, this.bulletSpeed, 0, 0);
    if (this.getFirstExists(false) == null) {
        return;
    }
    this.getFirstExists(false).damage = this.damage;
    this.getFirstExists(false).fire(x, y + 10, 0, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
};

CrazySpread.prototype.update = function () {
    this.fireRate = 300 - game.state.callbackContext.speed * 5;
    this.callAllExists('update', true);
};

var SuperMissleWep = function () {
    Phaser.Group.call(this, game, game.world, 'Crazy', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 1000;
    this.fireRate = 700;
    this.damage = 100;

    for (var i = 0; i < 20; i++) {
        this.add(new SuperMissle(0, 0, 'bulletsuper'), true);
    }

    return this;
};

SuperMissleWep.prototype = Object.create(Phaser.Group.prototype);
SuperMissleWep.prototype.constructor = SuperMissleWep;

SuperMissleWep.prototype.fire = function (source) {
    if (this.game.time.time < this.nextFire) {
        return;
    }
    if (this.getFirstExists(false) == null) {
        return;
    }

    var x = source.x + 10;
    var y = source.y;

    this.getFirstExists(false).damage = this.damage;
    this.getFirstExists(false).fire(x, y, this.bulletSpeed);

    this.nextFire = this.game.time.time + this.fireRate;
};

SuperMissleWep.prototype.update = function () {
    this.callAllExists('update', true);
};

var EBasicWeapon = function () {
    Phaser.Group.call(this, game, game.world, 'Basic Weapon', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = -300;
    this.fireRate = 300;
    this.damage = 5;

    for (var i = 0; i < 100; i++) {
        this.add(new Bullet(0, 0, 'bullet-e'), true);
    }

    return this;
};

EBasicWeapon.prototype = Object.create(Phaser.Group.prototype);
EBasicWeapon.prototype.constructor = EBasicWeapon;

EBasicWeapon.prototype.fire = function (source) {

    var x = source.x - 10;
    var y = source.y + 10;

    this.getFirstExists(false).damage = this.damage;;
    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

};

EBasicWeapon.prototype.update = function () {
    this.callAllExists('update', true);
};
"use strict";

var EnemyGroup = function () {
    Phaser.Group.call(this, game, game.world, 'Enemies', false, true, Phaser.Physics.ARCADE);
    this.startTime = game.time.time;
    this.currentTime = game.time.time;
    return this;
};

EnemyGroup.prototype = Object.create(Phaser.Group.prototype);
EnemyGroup.prototype.constructor = EnemyGroup;

EnemyGroup.prototype.update = function () {
    this.currentTime = game.time.time;
    var rand = (this.currentTime - this.startTime)/10000
    var curSpeed = game.state.callbackContext.speed;
    
    if (Math.floor(game.rnd.between(0, 120 - curSpeed - rand) < 7)) {
        this.addEnemy();
    }
    this.callAllExists("update", true);
    CleanUp(this);
};

EnemyGroup.prototype.addEnemy = function () {

    if (this.length > 20) {
        return;
    }

    var randNum = Math.floor(game.rnd.between(0, 10));
    if (randNum == 1) {
        this.add(new EnemyShooter(), true);
    } else if (randNum == 2) {
        this.add(new EnemyCharger(), true);
    } else if (randNum == 3) {
        this.add(new EnemyBasic(), true);
    }
};

var hitFunc = function (dam) {
    var explo = game.add.audio('explo');
    this.health -= dam;
    if (this.health < 0) {
        this.kill();
        game.state.callbackContext.score.changeScoreMulti(1);
        game.state.callbackContext.score.addCombo();
        explo.play("", 0, volume);
        game.plugins.screenShake.shake(10);
        dropPoints(this.body.x + this.width / 2, this.body.y + this.height / 2, 40);
        game.state.callbackContext.partHand.spawnMen(Math.floor(game.rnd.between(1, 4)), this.body.x + this.width / 2, this.body.y + this.height / 2);
        game.state.callbackContext.partHand.spawnExplosion(20, this.body.x + this.width / 2, this.body.y + this.height / 2);
    }
};

var EnemyBasic = function (x, y) {
    x = x || game.world.width + 100;
    y = y || game.rnd.between(-100, game.world.height + 100);
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.damage = 10;

    this.justSpawned = true;

    Phaser.Sprite.call(this, game, x, y, 'enemy1');
    game.physics.arcade.enable(this);
    this.body.velocity.set(-200, 0);
    this.enemyTween = game.add.tween(this).to({
            x: game.rnd.between(game.world.width - 300, game.world.width - 200),
            y: game.rnd.between(100, game.world.height - 100)
        },
        game.rnd.between(1000, 2000), "Sine.easeInOut");

    this.enemyTween.to({
        y: 0
    }, 400, "Sine.easeInOut");
    this.enemyTween.onComplete.add(this.startMainActions, this);
    this.enemyTween.interpolation(Phaser.Math.bezierInterpolation);
    this.enemyTween.start();

};

EnemyBasic.prototype = Object.create(Phaser.Sprite.prototype);
EnemyBasic.prototype.constructor = EnemyBasic;

EnemyBasic.prototype.update = function () {

    if (!this.justSpawned) {}
    var num = Math.floor((this.health / this.maxHealth) * 255);

    this.tint = rgb(255, num, num);
    this.tint = rgb(255, num, num);

    if (this.body.x < -50) {
        this.kill();
    }
}
EnemyBasic.prototype.startMainActions = function () {
    var mainTween = game.add.tween(this).to({
        y: [game.world.height - 50, 0]
    }, 4000, "Sine.easeInOut");
    mainTween.loop();
    //mainTween.interpolation(Phaser.Math.bezierInterpolation);
    mainTween.start();
    this.justSpawned = false;
};
EnemyBasic.prototype.hit = hitFunc;

var EnemyCharger = function (x, y) {
    x = x || game.world.width + 100;
    y = y || game.rnd.between(-100, game.world.height + 100);

    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.time = game.rnd.between(1500, 2000);
    this.justSpawned = true;
    this.checkWorldBounds = true;
    this.damage = 20;

    Phaser.Sprite.call(this, game, x, y, 'enemy2');

    this.enemyTween = game.add.tween(this).to({
            x: game.rnd.between(game.world.width - 200, game.world.width - 100),
            y: game.rnd.between(100, game.world.height - 100)
        },
        game.rnd.between(1000, 2000), "Sine.easeInOut");

    this.enemyTween.to({
            x: -200,
            y: game.state.callbackContext.player.y
        },
        this.speed, "Sine.easeInOut");

    this.enemyTween.interpolation(Phaser.Math.bezierInterpolation);
    this.enemyTween.start();

};

EnemyCharger.prototype = Object.create(Phaser.Sprite.prototype);
EnemyCharger.prototype.constructor = EnemyCharger;

EnemyCharger.prototype.update = function () {

    if (this.body.x < game.world.width) {
        this.outOfBoundsKill = true;
    }
    var num = Math.floor((this.health / this.maxHealth) * 255);

    this.rotation = -game.physics.arcade.angleToXY(this, this.body.acceleration.x, this.body.velocity.y) - 90;
    this.tint = rgb(255, num, num);
};

EnemyCharger.prototype.hit = hitFunc;

var EnemyShooter = function (x, y) {
    x = x || game.world.width + 100;
    y = y || game.rnd.between(-100, game.world.height + 100);

    this.maxHealth = 60;
    this.health = this.maxHealth;
    this.justSpawned = true;
    this.onTarget = false;
    this.checkWorldBounds = true;
    this.speed = 100 + game.rnd.between(0, 100);
    this.fireRate = 700 + game.rnd.between(0, 100);
    this.nextFire = 0;
    this.damage = 5;

    Phaser.Sprite.call(this, game, x, y, 'enemy3');
    game.physics.arcade.enable(this);
    this.body.velocity.set(-game.rnd.between(200, 300), 0);

    this.enemyTween = game.add.tween(this).to({
            x: game.rnd.between(game.world.width - 150, game.world.width - 100),
            y: game.rnd.between(100, game.world.height - 100)
        },
        game.rnd.between(3000, 4000), "Sine.easeInOut");

    this.enemyTween.onComplete.add(function () {
        this.justSpawned = false;
    }, this);
    this.enemyTween.interpolation(Phaser.Math.bezierInterpolation);
    this.enemyTween.start();
};

EnemyShooter.prototype = Object.create(Phaser.Sprite.prototype);
EnemyShooter.prototype.constructor = EnemyBasic;

EnemyShooter.prototype.update = function () {

    var playerY = game.state.callbackContext.player.y;

    if (this.body.x < game.world.width) {
        this.outOfBoundsKill = true;
    }

    if (!this.justSpawned) {
        game.physics.arcade.accelerateToXY(this, this.body.x,
            playerY,
            this.speed, this.speed);
    }

    if (game.time.time > this.nextFire && (this.body.y > playerY - 10 && this.body.y < playerY + 10)) {
        game.state.callbackContext.enemyWeapons[0].fire(this);
        this.nextFire = game.time.time + this.fireRate;
    }

    var num = Math.floor((this.health / this.maxHealth) * 255);
    this.tint = rgb(255, num, num);
}


EnemyShooter.prototype.hit = hitFunc;

var dropPoints = function (x, y, amt) {
    game.state.callbackContext.partHand.spawnPointOrbs(amt, x, y);
}

var EnemyGroupTut = function () {
    Phaser.Group.call(this, game, game.world, 'Enemies', false, true, Phaser.Physics.ARCADE);
    this.go = false;
    this.run = false;
    return this;
};

EnemyGroupTut.prototype = Object.create(Phaser.Group.prototype);
EnemyGroupTut.prototype.constructor = EnemyGroupTut;

EnemyGroupTut.prototype.update = function () {

    if (this.go && !this.run) {
        this.addEnemy();
        this.run = true;
    }

    this.callAllExists("update", true);
    CleanUp(this);
};

EnemyGroupTut.prototype.addEnemy = function () {
    this.add(new EnemyBasic(), true);
};
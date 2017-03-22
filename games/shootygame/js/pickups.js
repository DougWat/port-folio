"use strict";

var Pickup = function (x, y, texture) {
    Phaser.Sprite.call(this, game, x, y, texture);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = false;
    this.exists = false;
    this.name = "default";
    this.value = 0;
};

Pickup.prototype = Object.create(Phaser.Sprite.prototype);
Pickup.prototype.constructor = Pickup;

Pickup.prototype.spawn = function (type, y, speed) {
    this.name = type;
    this.loadTexture(type);
    this.outOfBoundsKill = false;
    this.reset(game.world.width + 100, y, type);
    this.scale.set(1);
    this.body.velocity.x = -speed;
};

Pickup.prototype.update = function () {
    if (this.body.x < game.world.width) {
        this.outOfBoundsKill = true;
    }
};

var PickupManager = function () {
    Phaser.Group.call(this, game, game.world, 'Pickup Manager', false, true, Phaser.Physics.ARCADE);
    this.nextFire = 0;
    this.fireRate = 1000;

    for (var i = 0; i < 20; i++) {
        this.add(new Pickup(0, 0, 'default'), true);
    }

    return this;
};

PickupManager.prototype = Object.create(Phaser.Group.prototype);
PickupManager.prototype.constructor = PickupManager;

PickupManager.prototype.update = function () {
    this.callAllExists("update", true);
    this.spawnPickup();
};

PickupManager.prototype.spawnPickup = function () {
    if (this.game.time.time < this.nextFire || Math.floor(game.rnd.between(0, 400)) != 2) {
        return;
    }

    if (this.getFirstExists(false) == null) {
        return;
    }
    var y = game.rnd.between(30, game.world.height - 30);

    var type = "health";
    var value = 30;
    var rand = Math.floor(game.rnd.between(0, 5));

    var wep = game.state.callbackContext.currentWeapon;

    if (rand == 0) {
        type = "health";
        value = 30
    } else if (rand == 1 && wep != "scatter") {
        type = "scatter";
    } else if (rand == 2 && wep != "crazy") {
        type = "crazy";
    } else if (rand == 3 && wep != "default") {
        type = "default";
    } else {
        return;
    }

    this.getFirstExists(false).name = type;
    this.getFirstExists(false).value = value;
    this.getFirstExists(false).spawn(type, y, 300);

    this.nextFire = this.game.time.time + this.fireRate;

};

var PickupManagerTut = function () {
    Phaser.Group.call(this, game, game.world, 'Pickup Manager', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 20; i++) {
        this.add(new Pickup(0, 0, 'default'), true);
    }
    this.go = false;
    this.got = false;
    this.spawned = false;
    return this;
};

PickupManagerTut.prototype = Object.create(Phaser.Group.prototype);
PickupManagerTut.prototype.constructor = PickupManager;

PickupManagerTut.prototype.update = function () {
    this.callAllExists("update", true);

    if (this.go && !this.spawned && !this.got) {
        this.spawnPickup();
    }
};

PickupManagerTut.prototype.spawnPickup = function () {

    var y = 365;

    this.getFirstExists(false).name = "crazy";
    this.getFirstExists(false).value = 20;
    this.getFirstExists(false).spawn("crazy", y, 600);


};
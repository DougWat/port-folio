"use strict";

var Game = function (game) {
    this.interface = null;
    this.backSprite = null;
    this.partHand = null;
    this.player = null;
    this.score = undefined;
    this.enemies = null;
    this.bulletmng = null;
    this.cursors = null;
    this.weapons = null;
    this.weaponsActive = null;
    this.enemyWeapons = null;
    this.currentWeapon = 0;
    this.pickupmng = null;

    this.cycleWeaponKey = null;
    this.fireKey = null;
    this.altFire = null;
    this.fullKey = null;

    this.kUp = null;
    this.kDown = null;
    this.kLeft = null;
    this.kRight = null;

    this.SMTimer = 0;
    this.SMLength = 500;
    this.SM = false;

    this.hitSound = null;
    this.explo = null;

    this.blurX = null;
    this.blurVal = 0;

    this.speed = 1;
    this.thetime = 0;
}

Game.prototype = {

    init: function () {
        console.log("Game: Init called)");
    },

    preload: function () {
        console.log("Game: Preload called)");
        this.game.load.image('background', ' assets/game/background.png');
        this.game.load.image('player', ' assets/player/player.png');
        this.game.load.image('bullet-p', ' assets/weapons/bullet-player.png');
        this.game.load.image('bullet2-p', ' assets/weapons/bullet2-player.png');
        this.game.load.image('bullet3-p', ' assets/weapons/bullet3-player.png');
        this.game.load.image('bulletsuper', ' assets/weapons/bulletsuper-player.png');
        this.game.load.image('bullet-e', ' assets/weapons/bullet-enemy.png');
        this.game.load.image('flash', ' assets/weapons/flash.png');
        this.game.load.image('enemy1', ' assets/enemies/enemy1.png');
        this.game.load.image('enemy2', ' assets/enemies/enemy2.png');
        this.game.load.image('enemy3', ' assets/enemies/enemy3.png');
        this.game.load.image('health', ' assets/pickups/health.png');
        this.game.load.image('scatter', ' assets/pickups/scatter.png');
        this.game.load.image('default', ' assets/pickups/default.png');
        this.game.load.image('crazy', ' assets/pickups/crazy.png');

        //UI
        this.game.load.image('healthbar', ' assets/ui/healthbar.png');
        this.game.load.image('uiwepdefault', ' assets/ui/pickups_default.png');
        this.game.load.image('uiwepcrazy', ' assets/ui/pickups_crazy.png');
        this.game.load.image('uiwepspread', ' assets/ui/pickups_spread.png');
        //        

        //Detail Particles
        this.game.load.image('cloud1', ' assets/detail/cloud-01.png');
        this.game.load.image('cloud2', ' assets/detail/cloud-02.png');
        this.game.load.image('cloud3', ' assets/detail/cloud-03.png');
        this.game.load.image('man', 'assets/detail/man.png');

        this.game.load.audio('explo', 'assets/sound/Explosion.wav');
        this.game.load.audio('hit1', 'assets/sound/Hit1.wav');
        this.game.load.audio('laser1', 'assets/sound/laser2.wav');
        this.game.load.audio('missle', 'assets/sound/missle.wav');
        this.game.load.audio('supermissle', 'assets/sound/supermisslego.wav');

        game.load.script('filterX', 'js/blurX.js');

    },

    create: function () {
        console.log("Game: Create called)");
        this.time = 0;
        this.score = new ScoreHandler();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.backSprite = game.add.sprite(-20, -20, 'background');
        this.backSprite.scale.set(1.2, 1.2);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.cycleWeaponKey = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        this.cycleWeaponKey.onDown.add(function () {
            this.cycleWep();
        }, this);

        this.hitSound = game.add.audio('hit1');
        this.explo = game.add.audio('explo');

        this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.altFire = game.input.keyboard.addKey(Phaser.Keyboard.ALT);
        this.fullKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
        this.fullKey.onDown.add(gofull, this);

        this.partHand = new ParticleHandler();
        this.player = new Player();
        this.enemies = new EnemyGroup();
        this.weapons = [];

        this.weapons.push(new BasicWeapon());
        this.weapons.push(new ScatterWeapon());
        this.weapons.push(new CrazySpread());
        this.weapons.push(new SuperMissleWep());

        this.weaponsActive = [];
        this.weaponsActive[0] = true;

//        for (var i = 1; i < this.weapons.length; i++) {
//            this.weaponsActive[i] = false;
//        }

        this.enemyWeapons = [];
        this.enemyWeapons.push(new EBasicWeapon());
        this.pickupmng = new PickupManager();

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.blurX = game.add.filter('BlurX');
        this.game.stage.filters = [this.blurX];
        this.interface = new Interface();
    },

    update: function () {

        this.speed = 1 + (speedVal / 10000) * 4;
        //console.log(this.speed);
        //console.log(source);
        if (musicTime >= musicLength) {
            this.endGame();
        }
        if (this.speed < 1) {
            this.speed = 1;
        }
        if (this.weaponsActive[this.currentWeapon] == true) {
            if (this.fireKey.isDown || game.input.mouse.button == 0) {
                this.weapons[this.currentWeapon].fire(this.player);
                this.score.changeScoreMulti(-.01);
            }
            else{ this.score.changeScoreMulti(.02)}

            if (this.altFire.isDown || game.input.mouse.button == 2) {
                this.weapons[3].fire(this.player);
            }
        }

        this.transBackground();
        this.runSM();
        this.player.update();
        if (this.player.health <= 0) {
            finalScore = this.score.score;
            this.endGame();
        }

        this.blurX.blur = this.speed;
        if (this.speed > 6) {
            //game.plugins.screenVibe.shake();   
        }
        this.partHand.update();
        this.score.update();
        this.interface.update();
        //this.bulletmng.update();
        this.checkCollisions();
        //this.text.setAll("setText",this.player.health);

    },

    transBackground: function () {
        var targetG = 150;
        var targetB = 75;
        //rgb(255,150,75);
        if (musicTime < musicLength) {
            var percentDone = (1 - (musicTime / musicLength));
            var g = Math.floor(targetG + (percentDone * (255 - targetG)));
            var b = Math.floor(targetB + (percentDone * (255 - targetB)));
            this.backSprite.tint = rgb(255, g, b);
        }
    },
    cycleWep: function (val) {
        console.log("cycling");
        this.currentWeapon += val;
        this.currentWeapon = this.currentWeapon % this.weapons.length;
        if (this.currentWeapon < 0) {
            this.currentWeapon = this.weapons.length + this.currentWeapon;
        }
        while (this.weaponsActive[this.currentWeapon] == false) {
            this.currentWeapon += val;
            this.currentWeapon = this.currentWeapon % this.weapons.length;
        }
        console.log(this.currentWeapon);
    },

    checkCollisions: function () {
        game.physics.arcade.overlap(this.weapons[this.currentWeapon], this.enemies, this.BulletEnemyHandle, null, this);
        game.physics.arcade.overlap(this.weapons[3], this.enemies, this.BulletEnemyHandle, null, this);
        game.physics.arcade.overlap(this.player.player, this.pickupmng, this.PlayerPickupHandle, null, this)
        game.physics.arcade.overlap(this.player.player, this.enemies, this.PlayerDmgHandle, null, this);

        game.physics.arcade.overlap(this.player.player, this.enemyWeapons[0], this.PlayerDmgBullHandle, null, this);
    },

    BulletEnemyHandle: function (bull, en) {
        en.hit(bull.damage);
        this.hitSound.play("", 0, volume);
        if (bull.type == "crazy") {
            this.partHand.spawnSmallEx(20, bull.body.x + bull.width, bull.body.y + bull.height / 2);
        }
        if (bull.type != "supermissle") {
            bull.kill();
        }
    },

    PlayerDmgHandle: function (ply, en) {
        this.player.hit(en.damage);
        this.explo.play("", 0, volume);
        this.score.changeMultiplyer(-1);
        
        this.partHand.spawnExplosion(20, en.body.x, en.body.y + this.player.player.height / 2);
        en.kill();
        game.plugins.screenShake.shake(10);
    },

    PlayerDmgBullHandle: function (ply, bull) {
        this.player.hit(bull.damage);
        this.score.changeMultiplyer(-1);
        bull.kill();
    },

    PlayerPickupHandle: function (ply, pikp) {
        console.log(pikp.name);
        if (pikp.name == "health") {
            this.partHand.spawnHealthOrbs(pikp.value, pikp.x, pikp.y);
            //this.player.health += pikp.value;   
        } else if (pikp.name == "default") {
            this.currentWeapon = 0;
        } else if (pikp.name == "scatter") {
            this.currentWeapon = 1;
            this.weaponsActive[1] = true;
        } else if (pikp.name == "crazy") {
            this.currentWeapon = 2;
            this.weaponsActive[2] = true;
        }

        pikp.kill();
    },

    activateSM: function () {
        this.SM = true;
        this.SMTimer = game.time.time + this.SMLength;
    },

    runSM: function () {
        if (this.SM) {
            if (game.time.time < this.SMTimer) {
                if (game.time.slowMotion < 3.0) {
                    game.time.slowMotion += .01;
                }
            } else {
                if (game.time.slowMotion > 1) {
                    game.time.slowMotion -= .4;
                    if (game.time.slowMotion < 1) {
                        game.time.slowMotion = 1.0;
                        this.SM = false;
                    }
                }

            }
        }
    },

    endGame: function () {
        game.state.start("Gameover");
    },

    render: function () {
        this.player.render();
    }
}
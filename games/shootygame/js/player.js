"use strict";

var Player = function () {

    this.x = 20;
    this.y = game.world.height / 2;
    var speed = 600;
    var accelSpeed = 200;
    this.health = 100;

    this.player = game.add.sprite(40, game.world.height / 2, 'player');
    this.player.anchor.setTo(.5, .5);
    game.physics.arcade.enable(this.player);

    this.player.body.bounce.y = 0.0;
    this.player.body.gravity.y = 0.0;
    this.player.body.collideWorldBounds = true;

    this.cursors = game.input.keyboard.createCursorKeys();
    this.kUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.kDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.kLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.kRight = game.input.keyboard.addKey(Phaser.Keyboard.D);

    this.update = function () {

        if (this.health > 100) {
            this.health = 100;
        }

        if (this.cursors.up.isDown || this.kUp.isDown) {
            this.player.body.velocity.y -= accelSpeed;
            //this.player.frame(3);
            if (this.player.body.velocity.y < -speed) {
                this.player.body.velocity.y = -speed;
            }
        } else if (this.cursors.down.isDown || this.kDown.isDown) {
            this.player.body.velocity.y += accelSpeed;
            if (this.player.body.velocity.y > speed) {
                this.player.body.velocity.y = speed;
            }
        } else {
            this.player.body.velocity.y = 0;
        }


        if (this.cursors.left.isDown || this.kLeft.isDown) {
            this.player.body.velocity.x -= accelSpeed;
            if (this.player.body.velocity.x < -speed) {
                this.player.body.velocity.x = -speed;
            }
        } else if (this.cursors.right.isDown || this.kRight.isDown) {
            this.player.body.velocity.x += accelSpeed;
            if (this.player.body.velocity.x > speed) {
                this.player.body.velocity.x = speed;
            }

            if (this.player.body.x > 400) {
                this.player.body.x = 400;
            }
        } else {
            this.player.body.velocity.x = 0;
        }

        this.x = this.player.body.x;
        this.y = this.player.body.y;
    }

    this.render = function () {

    }

    this.hit = function (dam) {
        this.health -= dam;

        if (this.health <= 0) {
            //END GAME
        }
    }
}
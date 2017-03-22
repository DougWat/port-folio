"use strict";

var PlayerTut = function () {

    this.x = 75;
    this.y = 200;
    var speed = 600;
    var accelSpeed = 200;
    this.health = 100;

    this.player = game.add.sprite(this.x, this.y, 'player');
    this.player.anchor.setTo(.5, .5);
    game.physics.arcade.enable(this.player);

    this.player.body.bounce.y = 0.0;
    this.player.body.gravity.y = 0.0;
    this.player.body.collideWorldBounds = true;

    this.myTween = game.add.tween(this.player).to({
        x: 300,
        y: 200
    }, 1000);

    this.myTween.to({
        x: 300,
        y: 630
    }, 1000);

    this.myTween.to({
        x: 75,
        y: 630
    }, 1000);

    this.myTween.to({
        x: 75,
        y: 200
    }, 1000);

    this.myTween.loop();
    this.myTween.start();

    this.part2 = function () {
        this.myTween.stop();
        this.player.x = this.x = 100;
        this.player.y = this.y = 390;
        this.y -= 10;
    }

}
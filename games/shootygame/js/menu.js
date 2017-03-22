"use strict";

var MainMenu = function (game) {
    this.startButton = null;
    this.tutButton = null;
    this.partHand = null
}

MainMenu.prototype = {

    init: function () {
        console.log("Main Menu: Init called)");
    },

    preload: function () {
        console.log("Main Menu: Preload called)");

        game.load.image('background', 'assets/game/background.png');
        game.load.image('title', 'assets/mainmenu/title.png');
        game.load.image('start', 'assets/mainmenu/start.png');
        game.load.image('starthover', 'assets/mainmenu/start_hover.png');
        game.load.image('tut', 'assets/mainmenu/tut.png');
        game.load.image('tuthover', 'assets/mainmenu/tut_hover.png');

        game.load.image('cloud1', ' assets/detail/cloud-01.png');
        game.load.image('cloud2', ' assets/detail/cloud-02.png');
        game.load.image('cloud3', ' assets/detail/cloud-03.png');
    },

    create: function () {
        console.log("Main Menu: Create called)");

        game.add.sprite(0, 0, 'background');
        game.add.sprite(0, 0, 'title').tint = rgb(100, 100, 100);
        this.partHand = new ParticleHandler();

        this.startButton = game.add.button(20, 675, 'start', this.startgame, this);
        this.startButton.onInputOver.add(this.startover, this);
        this.startButton.onInputOut.add(this.startout, this);

        this.tutButton = game.add.button(game.world.width - 425, 675, 'tut', this.starttut, this);
        this.tutButton.onInputOver.add(this.tutover, this);
        this.tutButton.onInputOut.add(this.tutout, this);

        game.plugins.screenShake = game.plugins.add(Phaser.Plugin.ScreenShake);
        game.plugins.screenShake.setup({
            shakeX: false,
            shakeY: true
        });
        game.plugins.screenVibe = game.plugins.add(Phaser.Plugin.ScreenVibe);
    },

    startover: function () {
        this.startButton.loadTexture('starthover');
    },

    startout: function () {
        this.startButton.loadTexture('start');
    },

    startgame: function () {
        game.state.start("LoadMusic");
    },

    tutover: function () {
        this.tutButton.loadTexture('tuthover');
    },

    tutout: function () {
        this.tutButton.loadTexture('tut');
    },

    starttut: function () {
        game.state.start('OnBoarding');
    }
}
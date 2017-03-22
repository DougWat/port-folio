"use strict";

var MusicLoadMenu = function (game) {
    this.noteIcon = null;
    this.dragArea = null;
    this.startButton = null;
    
    this.mainText = null;
    this.areaText = null;
}

MusicLoadMenu.prototype = {
    
    init: function(){
        
    },
    
    preload: function(){
        game.load.image('background','assets/game/background.png');
        game.load.image('note','assets/loader/note.png');
        game.load.image('area','assets/loader/area.png');
        game.load.image('start','assets/loader/start.png');
        game.load.image('starthover','assets/loader/starthover.png');
    },
    
    create: function(){
        game.add.sprite(0, 0, 'background');
        this.reset();
    },
    
    update: function(){
    },
    
    showStartButton: function(){
        this.startButton.exists = true;
        var tween = game.add.tween(this.startButton).to({alpha: 1},1000,Phaser.Easing.Quartic.Out, true);
    },
    
    startgame: function(){
        startAudio();
        game.state.start("Game");
    },
    
    startover: function(){
       this.startButton.loadTexture('starthover'); 
    },
    
    startout: function(){
        this.startButton.loadTexture('start');
    },
    
    dragged: function(){
        this.mainText.text = "Loading. This won't take long";
        
        var tween = game.add.tween(this.noteIcon).to({x: game.world.width/2},1000,Phaser.Easing.Quartic.Out, true);
        var tween2 = game.add.tween(this.dragArea).to({alpha:0},1000,Phaser.Easing.Quartic.Out,true);
        var tween3 = game.add.tween(this.areaText).to({alpha:0},500,Phaser.Easing.Quartic.Out,true);
    },
    
    done: function(){
        this.mainText.text = "Done";
        this.showStartButton();
        var tween = game.add.tween(this.noteIcon).to({alpha:0},1000,Phaser.Easing.Quartic.Out, true);
    },
    
    reset: function(){
        loadEnabled = true;
        this.noteIcon = game.add.sprite(0,0,'note');
        this.noteIcon.anchor.x = .5;
        this.noteIcon.anchor.y = .5;
        this.noteIcon.y = game.world.height/2;
        this.noteIcon.x = 940;
        this.noteIcon.tint = rgb(150,150,150);
        this.noteIcon.exists = true;
        this.dragArea = game.add.sprite(0,0,'area');
        this.dragArea.anchor.x = 0.5;
        this.dragArea.anchor.y = 0.5;
        this.dragArea.x = game.world.width/2;
        this.dragArea.y = game.world.height/2;
        this.dragArea.exists = true;
        
        this.mainText = game.add.text(game.world.width/2,50,"Drag and Drop your totally legitimate .mp3 and .wav files",{
           font: "45px Roboto",
            fill:"#565656"
        });
        this.mainText.anchor.x = Math.round(this.mainText.width * 0.5) / this.mainText.width;
        this.mainText.exists = true;
        this.areaText = game.add.text(400,game.world.height/2,"MP3/WAV",{
            font: "90px Roboto",
            fill:"#565656"
        });
        this.areaText.anchor.y = Math.round(this.areaText.height * 0.5) / this.areaText.height; 
        this.areaText.exists = true;
        this.startButton = game.add.button(game.world.width/2,game.world.height/2,'start',this.startgame,this);
        this.startButton.anchor.x = Math.round(this.startButton.width * 0.5) / this.startButton.width;
        this.startButton.anchor.y = Math.round(this.startButton.height * 0.5) / this.startButton.height;
        this.startButton.onInputOver.add(this.startover,this);
        this.startButton.onInputOut.add(this.startout,this);
        
        this.startButton.exists = false;
this.startButton.alpha = 0;
    }
    
}
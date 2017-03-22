var Gameover = function(game){
    this.finishPercent = null;
    
    this.backSprite = null;
    this.score = null;
    this.scoreText = null;
    this.percentText = null;
    
    this.graphDraw = null;
    this.graphComplete = null;
    this.graphLines = null;
    this.markLine = null;
    
    this.graphArea = null;
    this.deadArea = null;
    this.graph = null;
    
    this.maxVal = -0;
    this.minVal = 10000000000;
    this.correctData = [];
    
}

Gameover.prototype = {
    init: function(){
    },
    
    preload: function(){
        this.game.load.image('background', ' assets/game/background.png');
        
    },
    
    create: function(){
        
        for(var i = 0; i< dataPoints.length; i++){
            if(dataPoints[i] < this.minVal && dataPoints[i] != -1){this.minVal = dataPoints[i];}
            else if(dataPoints[i] > this.maxVal){this.maxVal = dataPoints[i];}
        }
        
        for(var i = 0; i< dataPoints.length; i++){
            if(dataPoints[i] == -1){dataPoints[i] = this.minVal;}
            dataPoints[i] -= this.minVal;
            this.correctData[i] = dataPoints[i]/(this.maxVal - this.minVal);
        }
        
        this.graph = {width: 1240,height:350, x:(game.world.width - 1240)/2,y:300};
        this.finishPercent = musicTime/musicLength;
        this.backSprite = game.add.sprite(-20, -20, 'background');
        this.backSprite.scale.set(1.2, 1.2);
        this.score = 1000;
        
        this.graphDraw = game.add.graphics(0,0);
        this.graphDraw.alpha = .8;
        this.graphDraw.beginFill(0x939292,1);
        this.graphDraw.drawRect(0,0,this.graph.width,this.graph.height);
        this.graphDraw.beginFill(0xBE9898,1);
        this.graphDraw.drawRect(0,0,this.graph.width,10);
        
        this.graphDraw.y = this.graph.y;
        this.graphDraw.x = this.graph.x;
        
        this.reset(false);
    },
    
    update: function(){
        this.percentText.text = Math.floor(this.graphComplete.width / this.graph.width * 100) + "%";
        this.percentText.x = this.graph.x + this.graphComplete.width;
        this.percentText.y = this.graph.y - 50;
        
        this.markLine.x = this.percentText.x;
        this.score = finalScore;
    },
    
    reset: function(win){
        if(win){
            var message = game.add.text(0,0,"You Won", {
                font: "400 72px Roboto",
                fill: "#333333"
            });
            
            message.anchor.x = .5;
            message.anchor.y = .5;
            message.x = game.world.width/2;
            message.y = 60;
        }
        else{
            var message = game.add.text(0,0,"You Lost", {
                font: "300 72px Roboto",
                fill: "#333333"
            });
            
            message.anchor.x = .5;
            message.anchor.y = .5;
            message.x = game.world.width/2;
            message.y = 60;

        }
        
            this.scoreText = game.add.text(0,0,this.score,{
                font: "300 60px Roboto",
                fill: "#333333"
            });
            
            this.scoreText.anchor.x = .5;
            this.scoreText.anchor.y = .5;
            this.scoreText.x = game.world.width/2;
            this.scoreText.y = 150;
        
            this.percentText = game.add.text(0,0,"0%", {
                font: "300 30px Roboto",
                fill: "#333333"
            });
            this.percentText.anchor.x = .5;
        
            this.graphComplete = game.add.graphics(0,0);
            this.graphComplete.beginFill(0xc4c3c3,1);
            this.graphComplete.alpha = .8;
            this.graphComplete.x = this.graph.x;
            this.graphComplete.y = this.graph.y;
            this.graphComplete.drawRect(0,0,.1,this.graph.height)
            this.graphComplete.beginFill(0x9EC199,1);
            this.graphComplete.drawRect(0,0,.1,10);
            
            var tween1 = game.add.tween(this.graphComplete).to({width: this.graph.width * this.finishPercent},2000,Phaser.Easing.Cubic.InOut,true);
        
        this.graphLines = game.add.graphics(0,0);
        this.graphLines.moveTo(this.graph.x,this.graph.y + this.graph.height - ((this.graph.height - 100) * this.correctData[0]) - 10);
        
        for(var i = 0; i < this.correctData.length; i++)
        {
            var x = this.graph.x + (this.graph.width/this.correctData.length)*i;
            var y = this.graph.y + this.graph.height - ((this.graph.height - 100) * this.correctData[i]) - 10;
            
            this.graphLines.lineStyle(3, 0x565656, 1);
            this.graphLines.lineTo(x,y);
        }
        
        this.markLine = game.add.graphics(0,0);
        this.markLine.lineStyle(1, 0x969696, 1);
        this.markLine.lineTo(0,-20);
        
        this.markLine.x = this.graph.x;
        this.markLine.y = this.graph.y;
    },
    
    
}
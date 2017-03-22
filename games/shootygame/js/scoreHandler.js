"use strict"

var ScoreHandler = function(){
    this.score = 0;
    this.multiplyer = 1;
    this.scoreMulti = 0;
    this.combo = 0;
    var comboTimer = 0;
    var comboTimerTime = 1500;
    var thisTime = game.time.time;
    var lastTime = game.time.time;
    
    this.update = function(){
        //console.log(this.muliplyer);
        this.comboUpdate();
        if(this.scoreMulti > 5){
            this.scoreMulti %= 5;
            this.multiplyer++;
            console.log(this.multiplyer);
        }else if(this.scoreMulti < 0){
            if(this.multiplyer > 1){
                this.scoreMulti = 5 + this.scoreMulti;   
                this.multiplyer--;
            }else{this.scoreMulti = 0;}
        } 
    }
    
    this.addPoints = function(val){
        this.score += this.multiplyer;
    }
    
    this.changeScoreMulti = function(val){
        this.scoreMulti += val * (1 + this.combo/4);
    }   
    
    this.changeMultiplyer = function(val){
        this.multiplyer += val;  
        if(this.multiplyer < 1){this.multiplyer = 1};
    }
    
    this.killMultiplyer = function(){
        this.multiplyer = 1;
        this.combo = 0;
    }
    
    this.comboUpdate = function(){
        thisTime = game.time.time;
        var elapsed = thisTime - lastTime;
        
        if(comboTimer > 0){
            comboTimer -= elapsed;   
        }
        
        if(comboTimer <= 0)
        {
            this.combo = 0;
            comboTimer = 0;
        }
        lastTime = thisTime;
    }
    
    this.addCombo = function(){
        this.combo++;
        comboTimer = comboTimerTime;
    }
}
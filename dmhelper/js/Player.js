"use strict";
window.Player = (function(){
	function Player(playerName, playerClass, maxHealth){
        
        this.playerName = playerName;
        this.playerClass = playerClass;
        this.maxHealth = maxHealth;
        this.healthBar = new HealthBar(this.maxHealth,this.maxHealth,this.playerName);
        
        const dbRefHealth = firebase.database().ref().child("Groups").child(TESTGROUP).child("Players").child(this.playerName)
        
        var that = this;
        dbRefHealth.on("child_changed",function(snapshot){
            var dmg = that.healthBar.currentHealth - snapshot.val();
            that.damage(dmg)
        });
        
        this.damage = function(amt){
            this.healthBar.changeHealthBy(-amt);  
        };
        
        this.heal = function(amt){
            this.healthBar.changeHealthBy(amt);  
        };
    };
    return Player;
})();
"use strict";

window.HealthBar = (function(){
	function HealthBar(maxHealth, currentHealth, playerName){
        this.playerName = playerName;

        this.maxHealth = maxHealth;
        this.currentHealth = currentHealth;
        this.changeRate = 3; //HP Per Second

        var bar = document.createElement("div");
        bar.id = this.playerName + "_HealthBar";
        bar.className = HealthBar;
        bar.style.width = (((this.currentHealth)/this.maxHealth)*100) + "%";
        bar.style.height = "30px";
        bar.style.background = "red";
        document.getElementById("hBar").appendChild(bar);

        this.changeHealthBy = function(changeAmt){
            var newHealth = Clamp((this.currentHealth + changeAmt),0,this.maxHealth);
            var percentChange = this.calculateHealthPercentage(newHealth);
            this.currentHealth = newHealth
						
            console.log(percentChange);
            $("#" + this.playerName + "_HealthBar").animate({
                width: percentChange+"%"
            },1500);
        };

        this.changeHealthTo = function(change){

        };

        this.calculateHealthPercentage = function(newHealth){
            return ((newHealth)/this.maxHealth)*100;
        }
    };
    return HealthBar;
})();

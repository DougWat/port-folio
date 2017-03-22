"use strict";


var mouseScrollDir = 0;
var finalScore = 0;

document.addEventListener("mousewheel", MouseWheelHandler, false);
window.addEventListener("blur",FocusLostHandler,false);
window.addEventListener('focus',FocusHandler,false);

function MouseWheelHandler(e) {
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    mouseScrollDir = delta;

    if (game.state.current == "Game") {
        if (delta == 1) {
            game.state.callbackContext.cycleWep(1);
            console.log("cycling");
        } else {
            game.state.callbackContext.cycleWep(-1);
        }
    }
    return false;
}

function FocusLostHandler(){
    if(musicPlaying){
        musicPaused = true; 
        pause();
    }
}

function FocusHandler(){
    if(musicPlaying && musicPaused)
    {
        musicPaused = false; 
        continueAudio();
    }
}
var volume = .3;
var game = new Phaser.Game(1422, 800, Phaser.AUTO);
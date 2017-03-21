/*
	Name: 			audio.js
	Author: 		Tony Jefferson
	Last Modified: 	3/23/2013
	Description: 	Quick and dirty audio playing script. Should be re-factored to 
	allow more simultaneous sound channels and the re-use of Audio() objects.
	Dependencies: 	requires HTML5 Audio() object
*/

"use strict";
window.audio = (function(){

	var AUDIO_CHANNEL = {
		CHANNEL_BACKGROUND: "channelBackground",
		CHANNEL_FIRE: "channelFire",
		CHANNEL_DEPLOYCLICK: "channelDeployClick",
		CHANNEL_KACHING: "channelKaching",
		CHANNEL_BTNUPGRADE: "channelBtnUpgrade",
		CHANNEL_WHISTLE: "channelWhistle",
		CHANNEL_GUNSHOT: "channelGunshot",
		CHANNEL_NONE: "channelNone"
	};

	var AUDIO_SOURCES = {
		AUDIO_BACKGROUND: "sounds/background",
		AUDIO_FIRE: "sounds/fire",
		AUDIO_KACHING: "sounds/misc/ka-ching",
		AUDIO_BTNUPGRADE: "sounds/misc/btnupgrade",
		AUDIO_WHISTLE: "sounds/misc/whistle",
		AUDIO_GUNSHOT: "sounds/units/gun",
		AUDIO_DEPLOYCLICK : "sounds/units/deploy_click"
	};
	
	var soundChannels = {};

	function AudioEffect(channel,trackURL,volume,loop){
		/* 
		Kill old channel if we want
		Probably a good idea if you don't like crashes
		*/
		if (soundChannels[channel]) soundChannels[channel].kill(); // kill old AudioEffect
			
		if(channel != AUDIO_CHANNEL.CHANNEL_NONE) soundChannels[channel] = this;
		this.myAudio = new Audio();
		if(this.myAudio.canPlayType("audio/mpeg")){
			trackURL += ".mp3";
		} else {
			trackURL += ".wav";
		}
		this.myAudio.src = trackURL;
		this.myAudio.volume = volume;
		if (loop) this.myAudio.loop = true;
		this.myAudio.play();
			
	}
		
	AudioEffect.prototype.kill = function(){
		if(this.myAudio){
			this.myAudio.pause();
			this.myAudio.src = "";
			this.myAudio = null;
		} 
	}
	// end AudioEffect
	function playBackgroundSound(volume){
		new AudioEffect(AUDIO_CHANNEL.CHANNEL_BACKGROUND,AUDIO_SOURCES.AUDIO_BACKGROUND,volume,true);
	}
	
	// !! be cautious using playBulletSound2() !!
	// it allows unlimited number of new Audio objects to be created.
	// it will crash your browser if over-used
	// try cranking the fire rate up to 100 and calling it - you'll see
	function playFireSound(volume){
		new AudioEffect(AUDIO_CHANNEL.CHANNEL_NONE,AUDIO_SOURCES.AUDIO_FIRE,volume);
	}
	
	function playBtnUpgrade(volume){
		new AudioEffect(AUDIO_CHANNEL.CHANNEL_BTNUPGRADE,AUDIO_SOURCES.AUDIO_BTNUPGRADE,volume);	
	}
	
	function playDeployClick(volume){
		new AudioEffect(AUDIO_CHANNEL.CHANNEL_DEPLOYCLICK,AUDIO_SOURCES.AUDIO_DEPLOYCLICK,volume);	
	}
	
	function playKaching(volume){
		new AudioEffect(AUDIO_CHANNEL.CHANNEL_NONE,AUDIO_SOURCES.AUDIO_KACHING,volume);	
	}
	
	function playWhistle(volume){
		new AudioEffect(AUDIO_CHANNEL.CHANNEL_WHISTLE,AUDIO_SOURCES.AUDIO_WHISTLE,volume);
	}
	
	function playGunshot(volume){
		new AudioEffect(AUDIO_CHANNEL.CHANNEL_NONE,AUDIO_SOURCES.AUDIO_GUNSHOT,volume);	
	}
	
	return{
		playFireSound : playFireSound,
		playBackgroundSound : playBackgroundSound,
		playDeployClick : playDeployClick,
		playKaching : playKaching,
		playBtnUpgrade : playBtnUpgrade,
		playWhistle : playWhistle,
		playGunshot: playGunshot
	};

})();
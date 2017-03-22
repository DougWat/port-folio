"use strict";

var OnBoarding = function(game){
    
    this.partHand = null;
    
    this.player = null;
    this.enemies = null;
    
    this.cursors = null;
    
    this.weapons = null;
    this.currentWeapon = 0;
    
    this.pickupmng = null;

    this.page = 0;
    
    this.tutImage = null;
    
    this.clickText = null;
}

OnBoarding.prototype = {
    
    init: function(){
        console.log("On Boarding: Init called)");
    },
    
    preload: function(){
        console.log("On Boarding: Preload called)");
        
        this.game.load.image('background', ' assets/game/background.png');
        this.game.load.image('player', ' assets/player/player.png');
        this.game.load.image('bullet-p', ' assets/weapons/bullet-player.png');
        this.game.load.image('bullet2-p', ' assets/weapons/bullet2-player.png');
        this.game.load.image('bullet3-p', ' assets/weapons/bullet3-player.png');
        this.game.load.image('bulletsuper', ' assets/weapons/bulletsuper-player.png');
        this.game.load.image('bullet-e', ' assets/weapons/bullet-enemy.png');
        this.game.load.image('flash', ' assets/weapons/flash.png');
        this.game.load.image('enemy1', ' assets/enemies/enemy1.png');
        this.game.load.image('crazy', ' assets/pickups/crazy.png');
  

        //Detail Particles
        this.game.load.image('cloud1', ' assets/detail/cloud-01.png');
        this.game.load.image('cloud2', ' assets/detail/cloud-02.png');
        this.game.load.image('cloud3', ' assets/detail/cloud-03.png');
        this.game.load.image('man','assets/detail/man.png');
        
        //Tut Stuff
        this.game.load.image('tut0','assets/tut/tut-move.png');
        this.game.load.image('tut1','assets/tut/tut-shoot.png');
        this.game.load.image('tut12','assets/tut/tut-shootalt.png');
        this.game.load.image('tut2','assets/tut/tut-enemy.png');
        this.game.load.image('tut3','assets/tut/tut-pickups.png');
    },
    
    create: function(){
        console.log("On Boarding: Create called)");

        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.sprite(0, 0, 'background').width = game.world.width + 10;
        this.game.add.sprite(0, 200, 'background').width = game.world.width + 10;
        
        this.tutImage = game.add.sprite(0,0,'tut0');
        this.clickText = game.add.text(20,70,"(Click to Continue)",{font: "30px Arial",fill:"111111"});
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.partHand = new ParticleHandler();
        this.player = new PlayerTut();

        this.enemies = new EnemyGroupTut();
        this.weapons = [];
        this.weapons.push(new BasicWeapon());
        this.weapons.push(new ScatterWeapon());
        this.weapons.push(new CrazySpread());
        this.weapons.push(new SuperMissleWep());

        this.pickupmng = new PickupManagerTut();
        
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.input.onDown.add(this.next, this);
    },
    
     update: function () {
        
        this.partHand.update();
         if(this.page == 1 || this.page >= 3)
         {
          this.weapons[this.currentWeapon].fire(this.player);   
         }
         
         if(this.page == 2){
            this.weapons[3].fire(this.player);   
         }
         
         if(this.page >= 2 && Math.floor(game.rnd.between(0,100) == 2))
         {
            this.enemies.addEnemy();   
         }
         this.checkCollisions();
    },
    
    next: function(){
        this.page++; 
        
        if(this.page == 1){
            this.player.part2();
            this.tutImage.loadTexture('tut1'); 
        }
        if(this.page == 2){
            this.tutImage.loadTexture('tut12');
        }
        if(this.page == 3){
            this.enemies.addEnemy();
            this.tutImage.loadTexture('tut2');
        }
        if(this.page == 4){
            this.pickupmng.spawnPickup();
            this.tutImage.loadTexture('tut3');   
        }
        
        if(this.page >= 5){
            game.state.start('LoadMusic')  
        }
    },

        checkCollisions: function () {
        game.physics.arcade.overlap(this.weapons[this.currentWeapon], this.enemies, this.BulletEnemyHandle, null, this);
                    game.physics.arcade.overlap(this.weapons[3], this.enemies, this.BulletEnemyHandle, null, this);
        game.physics.arcade.overlap(this.player.player, this.pickupmng, this.PlayerPickupHandle, null, this)

    },
    
    BulletEnemyHandle: function (bull, en) {
        en.hit(bull.damage);
        bull.kill();
    },
    
        PlayerPickupHandle: function (ply, pikp) {
        console.log(pikp.name);
        if (pikp.name == "health") {
            this.partHand.spawnHealthOrbs(pikp.value, pikp.x, pikp.y);
            //this.player.health += pikp.value;   
        } else if (pikp.name == "default") {
            this.currentWeapon = 0;
        } else if (pikp.name == "scatter") {
            this.currentWeapon = 1;
        } else if (pikp.name == "crazy") {
            this.currentWeapon = 2;
        }

        pikp.kill();
    }
}
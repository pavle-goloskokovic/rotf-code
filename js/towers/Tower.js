/**
 * Tower.js
 *
 * Class representing a tower object
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members


    rotf.Tower = rotf.extend(createjs.Container, {

        //static members

    },{

        shootInterval: 0,
        currentInterval: 0,
        shootRange: 0,
        buyPrice: 0,
        sellPrice: 0,
        bulletType: null,
        bulletXOffset: 0,
        bulletYOffset: 0,
        platform: null,
        shootSound: null,

        // Constructor
        initialize: function(shootInterval,shootRange,price,platform,sprite){

            // Call super constructor, necessary for extending createjs.Container class

            this._super();

            this.shootInterval = shootInterval;
            this.shootRange = shootRange;
            this.buyPrice = price;
            this.sellPrice = Math.floor(price * 0.6);
            this.platform = platform;
            this.addChild(sprite);

        },

        update : function(delta){
            if(this.platform !== null) {

                this.currentInterval -= delta;
                if (this.currentInterval <= 0){
                    if(this.shoot()){
                        this.currentInterval += this.shootInterval;
                    }else{
                        this.currentInterval = 0;
                    }
                }
            }
        },
        shoot: function(){

            if(this.platform == null){return;}

            var distance;

            // looping through enemies array trying to
            // find enemy in range to shoot at
            var enemies = rotf.game.enemiesContainer.children;
            for(var i=0; i<enemies.length; i++){

                var enemy = enemies[i];

                distance = rotf.Util.vectorMagnitude(
                    this.platform.x,
                    enemy.x,
                    this.platform.y,
                    enemy.y
                );

                if(distance < this.shootRange){

                    this.playShootSound();

                    rotf.game.bulletsContainer.addChild(
                        new this.bulletType(this.platform.x + this.bulletXOffset, this.platform.y + this.bulletYOffset, enemy)
                    );
                    return true;
                }
            }
            return false;
        },
        playShootSound: function(){}
    });

}());
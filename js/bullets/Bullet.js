/**
 * Bullet.js
 *
 * Class representing a bullet object
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members


    rotf.Bullet = rotf.extend( createjs.Container, {

        //static members
        NEAR_DISTANCE: 15

    },{

        bluntDamage: 0,
        piercingDamage: 0,
        speed: 0,
        velX: 0, velY: 0,
        sprite: null,
        explosion: null,
        
        // Constructor
        initialize: function(bdamage,pdamage,speed,x,y,spriteId,explosion){

            // Call super constructor, necessary for extending createjs.Container class
            this._super();

            this.bluntDamage = bdamage;
            this.piercingDamage = pdamage;
            this.speed = speed;
            this.x = x;
            this.y = y;
            this.sprite = rotf.assetsFactory.getAsset(spriteId);
            this.explosion = explosion;

            this.addChild(this.sprite);
        },

        update : function(delta){}
    });

}());
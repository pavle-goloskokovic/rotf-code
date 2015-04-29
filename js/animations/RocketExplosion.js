/**
 * RocketExplosion.js
 *
 * Bullet explosion animation for RocketBullet
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members


    rotf.RocketExplosion = rotf.extend( rotf.Explosion, {

        //static members

    },{

        // Constructor
        initialize:function(x,y){
            this._super(x,y,"explosions/rocket/rocket-explosion.png");
            createjs.Sound.play("rocket-explode.ogg","none",0,0,0,0.2);
        }
    });

}());
/**
 * JunkExplosion.js
 *
 * Bullet explosion animation for JunkBullet
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members


    rotf.JunkExplosion = rotf.extend( rotf.Explosion, {

        //static members

    },{

        // Constructor
        initialize:function(x,y){
            this._super(x,y,"explosions/junk/junk-explosion.png");
            //createjs.Sound.play("junk-explode.ogg","none",0,0,0,0.1);
        }
    });

}());
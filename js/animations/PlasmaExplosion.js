/**
 * PlasmaExplosion.js
 *
 * Bullet explosion animation for PlasmaBullet
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members


    rotf.PlasmaExplosion = rotf.extend( rotf.Explosion, {

        //static members

    },{

        // Constructor
        initialize:function(x,y){
            this._super(x,y,"explosions/plasma/plasma-explosion.png");
            createjs.Sound.play("plasma-explode.ogg","none",0,0,0,0.3);
        }
    });

}());
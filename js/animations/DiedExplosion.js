/**
 * DiedExplosion.js
 *
 * Enemy disintegration animation
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members


    rotf.DiedExplosion = rotf.extend( rotf.Explosion, {

        //static members

    },{

        // Constructor
        initialize:function(x,y,rot,scale){
            this._super(x,y,'enemies/dead/dead.png',13);
            this.sprite.scaleX = scale;
            this.sprite.scaleY = scale;
            this.sprite.rotation = rot + 15 * (-1 + (Math.random()*3|0));
        }
    });

}());
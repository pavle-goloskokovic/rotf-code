/**
 * Explosion.js
 *
 * Class representing bullet explosion animation
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    var FRAMERATE = 30;


    rotf.Explosion = rotf.extend( createjs.Container, {

        //static members

    },{

        sprite: null,

        // Constructor
        initialize:function(x,y,spriteId,framerate){

            // Call super constructor, necessary for extending createjs.Container class
            this._super();

            this.x = x;
            this.y = y;

            var sprite = rotf.assetsFactory.getAsset(spriteId);
            sprite.stop();
            sprite.framerate = framerate || FRAMERATE;

            sprite.on('animationend',function(evt){
                /*TODO fix bug where this.parent == null, dispatch event*/
                if(this.parent) {
                    this.parent.removeChild(this);
                }
            },this);

            this.sprite = sprite;
            this.addChild(sprite);

        },

        update : function(delta){
            this.sprite.advance(delta);
        }
    });

}());
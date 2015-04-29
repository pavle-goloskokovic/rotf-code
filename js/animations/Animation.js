/**
 * Animation.js
 *
 * Animations superclass
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    rotf.Animation = rotf.extend( createjs.Container, {

        //static members

    },{

        sprite: null,

        // Constructor
        initialize: function(x,y,spriteId){
            // Call super constructor, necessary for extending createjs.Container class
            this._super();

            this.x = x;
            this.y = y;
            this.sprite = rotf.assetsFactory.getAsset(spriteId);

            this.addChild(this.sprite);
        },

        update: function(delta){}
    });

}());
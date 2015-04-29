/**
 * Alien.js
 *
 * Class representing alien observer :)
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    rotf.Alien = rotf.extend( rotf.Animation, {

        //static members

    },{

        // Constructor
        initialize: function(x,y){

            this._super(x,y,"map/alien/alien.png");
            this.sprite.stop();
            this.sprite.framerate = 12;
        },

        update: function(delta){
            this.sprite.advance(delta);
        }
    });

}());
/**
 * Antenna.js
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    rotf.Antenna = rotf.extend( rotf.Animation, {

        //static members

    },{

        // Constructor
        initialize: function(x,y){

            this._super(x,y,"map/antena.png");

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({rotation: 360}, 10968)
                .set({rotation: 0});
        }
    });

}());
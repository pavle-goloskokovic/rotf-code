/**
 * Rock4.js
 *
 * Class representing animated group of rocks
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    rotf.Rock4 = rotf.extend( rotf.Animation, {

        //static members

    },{

        // Constructor
        initialize: function(x,y){

            this._super(x,y,"map/rocks/rocks4.png");

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({rotation: 360}, 22900)
                .set({rotation: 0});
        }
    });

}());
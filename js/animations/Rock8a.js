/**
 * Rock8a.js
 *
 * Class representing animated group of rocks
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    rotf.Rock8a = rotf.extend( rotf.Animation, {

        //static members

    },{

        // Constructor
        initialize: function(x,y){

            this._super(x,y,"map/rocks/rocks8.png");

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({rotation: -360}, 27477)
                .set({rotation: 0});
        }
    });

}());
/**
 * Rock3.js
 *
 * Class representing animated group of rocks
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    rotf.Rock3 = rotf.extend( rotf.Animation, {

        //static members

    },{

        // Constructor
        initialize: function(x,y){

            this._super(x,y,"map/rocks/rocks3.png");

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({rotation: 31.4749}, 5000, createjs.Ease.sineInOut)
                .to({rotation: -24.1905}, 13467, createjs.Ease.sineInOut)
                .to({rotation: 0}, 5800, createjs.Ease.sineInOut);
        }
    });

}());
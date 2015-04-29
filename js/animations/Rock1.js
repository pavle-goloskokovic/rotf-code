/**
 * Rock1.js
 *
 * Class representing animated group of rocks
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    rotf.Rock1 = rotf.extend( rotf.Animation, {

        //static members

    },{

        // Constructor
        initialize: function(x,y){

            this._super(x,y,"map/rocks/rocks1.png");

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({x: -7.2, y: -11.25}, 3967, createjs.Ease.sineInOut)
                .to({x: 10.15, y: -22.7}, 3967, createjs.Ease.sineInOut)
                .to({x: 29.1, y: -1.6}, 3933, createjs.Ease.sineInOut)
                .to({x: 0, y: 0}, 4000, createjs.Ease.sineInOut);

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({rotation: 15}, 6000, createjs.Ease.sineInOut)
                .to({rotation: 0}, 6000, createjs.Ease.sineInOut)
                .to({rotation: -15}, 6000, createjs.Ease.sineInOut)
                .to({rotation: 0}, 6000, createjs.Ease.sineInOut);
        }
    });

}());
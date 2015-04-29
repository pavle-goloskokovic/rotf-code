/**
 * Rock5.js
 *
 * Class representing animated group of rocks
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    rotf.Rock5 = rotf.extend( rotf.Animation, {

        //static members

    },{

        // Constructor
        initialize: function(x,y){

            this._super(x,y,"map/rocks/rocks5.png");

            this.sprite.x = 1.18;
            this.sprite.y = -16;

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({x: -0.41, y: 5.55}, 3781, createjs.Ease.sineInOut)
                .to({x: 1.18, y: -16}, 3781, createjs.Ease.sineInOut);
        }
    });

}());
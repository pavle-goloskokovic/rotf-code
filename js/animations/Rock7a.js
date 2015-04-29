/**
 * Rock7a.js
 *
 * Class representing animated group of rocks
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    rotf.Rock7a = rotf.extend( rotf.Animation, {

        //static members

    },{

        // Constructor
        initialize: function(x,y){

            this._super(x,y,"map/rocks/rocks7.png");

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({rotation: 360}, 70000)
                .set({rotation: 0});

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({x: 20}, 5000, createjs.Ease.sineInOut)
                .to({x: -20}, 10000, createjs.Ease.sineInOut)
                .to({x: 0}, 5000, createjs.Ease.sineInOut);
        },

        update: function(delta){

            this.sprite.y = Math.sin(this.sprite.x/5) * 15;
        }
    });

}());
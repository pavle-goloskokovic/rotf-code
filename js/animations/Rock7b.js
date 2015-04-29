/**
 * Rock7b.js
 *
 * Class representing animated group of rocks
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    rotf.Rock7b = rotf.extend( rotf.Animation, {

        //static members

    },{

        // Constructor
        initialize: function(x,y){

            this._super(x,y,"map/rocks/rocks7.png");

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({scaleX: 0.6}, 10000, createjs.Ease.sineInOut)
                .to({scaleX: 1}, 10000, createjs.Ease.sineInOut);
            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({scaleY: 0.6}, 10000, createjs.Ease.sineInOut)
                .to({scaleY: 1}, 10000, createjs.Ease.sineInOut);

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({y: -10}, 10000, createjs.Ease.sineInOut)
                .to({y: 0}, 10000, createjs.Ease.sineInOut);

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({rotation: -93}, 35000)
                .to({rotation: 67}, 60000)
                .to({rotation: 0}, 25000);
        },

        update: function(delta){

            this.sprite.x = Math.sin(this.sprite.y/2) * 15;
        }
    });

}());
/**
 * Rock8b.js
 *
 * Class representing animated group of rocks
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    rotf.Rock8b = rotf.extend( rotf.Animation, {

        //static members

    },{

        // Constructor
        initialize: function(x,y){

            this._super(x,y,"map/rocks/rocks8.png");

            this.sprite.x = -20;

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({x: 20}, 7477, createjs.Ease.sineInOut)
                .to({x: -20}, 7477, createjs.Ease.sineInOut);

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({rotation: -10}, 2136)
                .to({rotation: 10}, 7477)
                .to({rotation: 0}, 5340);
        },

        update: function(delta){
            this.sprite.y = -this.sprite.x/2;
        }
    });

}());
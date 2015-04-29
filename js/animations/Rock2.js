/**
 * Rock2.js
 *
 * Class representing animated group of rocks
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    var WM_ROTATION_SPEED = 0.0006; // deg/ms

    rotf.Rock2 = rotf.extend( rotf.Animation, {

        //static members

    },{
        washingMachine: null,
        wmRotation: 0,

        // Constructor
        initialize: function(x,y){

            this._super(x,y,"map/rocks/rocks2.png");

            this.sprite.x = 5.65;
            this.sprite.y = -11.8;

            createjs.Tween.get( this.sprite, {
                loop: true
            })
                .to({x: 7.45, y: -18.95}, 3333, createjs.Ease.sineInOut)
                .to({x: 5.65, y: -11.8}, 3300, createjs.Ease.sineInOut);

            this.washingMachine = rotf.assetsFactory.getAsset("map/wm.png");

            this.addChild(this.washingMachine);

        },

        update: function(delta){

            // TODO fix  360 -> 0 snap
            this.wmRotation = (this.wmRotation + WM_ROTATION_SPEED*delta) % 360;

            var wm = this.washingMachine;
            wm.rotation = (this.wmRotation*30)%360;

            var wmCos = Math.cos(this.wmRotation);
            wm.x = Math.sin(this.wmRotation)*75;
            wm.y = wmCos*35 - 10;

            if(wmCos>0){
                this.addChild(wm);
            }else{
                this.addChild(this.sprite);
            }
        }
    });

}());
/**
 * Bear.js
 *
 * Bear enemy class
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {


    rotf.Bear = rotf.extend( rotf.Enemy, {

        //static public members

    },{
        // Constructor
        initialize: function(){
            this._super(0.03,750,1,4,
                rotf.assetsFactory.getAsset("enemies/bear/bear.png"),
                "died-bear.ogg"
            );
            this.jumpInterval = 0.012;
            this.jumpAmp = 3;
            this.deadRot = 0;
            this.deadScale = 1;
            this.worthDead = 100;
            this.worthLive = 2;
            this.diedSoundVolume = 0.5;
        }
    });

}());
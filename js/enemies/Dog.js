/**
 * Dog.js
 *
 * Dog enemy class
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {


    rotf.Dog = rotf.extend( rotf.Enemy, {

        //static public members

    },{
        // Constructor
        initialize: function(){
            this._super(0.09,60,4,1,
                rotf.assetsFactory.getAsset("enemies/dog/dog.png"),
                "died-dog.ogg"
            );
            this.jumpInterval = 0.006;
            this.jumpAmp = 3;
            this.worthDead = 14;
            this.diedSoundVolume = 0.04;
        }
    });

}());
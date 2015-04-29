/**
 * Cat.js
 *
 * Cat enemy class
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {


    rotf.Cat = rotf.extend( rotf.Enemy, {

        //static public members

    },{
        // Constructor
        initialize: function(){
            this._super(0.105,50,1,4,
                rotf.assetsFactory.getAsset("enemies/cat/cat.png"),
                "died-cat.ogg"
            );
            this.jumpInterval = 0.0015;
            this.jumpAmp = 12;
            this.worthDead = 10;
        }
    });

}());
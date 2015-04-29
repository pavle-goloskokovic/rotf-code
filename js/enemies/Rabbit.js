/**
 * Rabbit.js
 *
 * Rabbit enemy class
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {


    rotf.Rabbit = rotf.extend( rotf.Enemy, {

        //static public members

    },{
        // Constructor
        initialize: function(){
            this._super(0.06,25,2,2,
                rotf.assetsFactory.getAsset("enemies/rabbit/rabbit.png"),
                "died-rabbit.ogg"
            );
            this.worthDead = 7;
        }
    });

}());
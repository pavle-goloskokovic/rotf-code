/**
 * JunkTower.js
 *
 * Class representing a tower that shoots JunkBullet objects
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members


    rotf.JunkTower = rotf.extend(rotf.Tower, {

        //static members

    },{
        // Constructor
        initialize: function(platform){
            this._super(500,140,100,platform,
                rotf.assetsFactory.getAsset("towers/junk.png"));
            this.bulletType = rotf.JunkBullet;
            this.y = 2;
            this.bulletYOffset = -25;
        },

        playShootSound: function(){
            createjs.Sound.play("junk-shoot.ogg","none",0,0,0,0.03);
        }
    });

}());
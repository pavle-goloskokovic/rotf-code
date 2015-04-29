/**
 * JunkTower.js
 *
 * Class representing a tower that shoots RocketBullet objects
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members


    rotf.RocketTower = rotf.extend(rotf.Tower, {

        //static members

    },{
        // Constructor
        initialize: function(platform){
            this._super(700,200,200,platform,
                rotf.assetsFactory.getAsset("towers/rocket.png"));
            this.bulletType = rotf.RocketBullet;
            this.y = 11;
            this.bulletYOffset = -10;
        },

        shoot: function(){
            this.bulletXOffset = 9 * (-1 + (Math.random()*3|0));
            return this._super();
        },

        playShootSound: function(){
            createjs.Sound.play("rocket-shoot.ogg","none",0,0,0,0.1);
        }
    });

}());
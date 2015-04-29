/**
 * PlasmaTower.js
 *
 * Class representing a tower that shoots PlasmaBullet objects
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members


    rotf.PlasmaTower = rotf.extend(rotf.Tower, {

        //static members

    },{
        // Constructor
        initialize: function(platform){
            this._super(1200,160,150,platform,
                rotf.assetsFactory.getAsset("towers/plasma.png"));
            this.bulletType = rotf.PlasmaBullet;
            this.y = -6;
            this.bulletYOffset = -37;
        },

        playShootSound: function(){
            createjs.Sound.play("plasma-shoot.ogg","none",0,0,0,0.07);
        }
    });

}());
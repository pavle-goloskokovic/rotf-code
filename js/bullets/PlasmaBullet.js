/**
 * PlasmaBullet.js
 *
 * Bullet used for shooting from PlasmaTower
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members


    rotf.PlasmaBullet =rotf.extend( rotf.Bullet, {

        //static members

    },{

        targetX: 0, targetY: 0,
        g: 0.0025,
        effectArea: 75,

        time: 600,

        // Constructor
        initialize: function(x,y,enemy){

            this._super(15,20,0.3,x,y,"bullets/plasma.png",rotf.PlasmaExplosion);

            this.sprite.stop();
            this.sprite.framerate = 15;

            this.targetX = enemy.x;
            this.targetY = enemy.y;

            var distX = this.targetX - this.x;
            var distY = this.targetY - this.y;

            this.velX = distX / this.time;
            this.velY = distY / this.time - this.g * this.time / 2;

        },

        update : function(delta){

            this.sprite.advance(delta);

            this.move(delta);

            // Checks if bullet reached target coordinate
            // If true decrease energy of all enemies in a certain radius
            if (this.time <= 0) {

                var enemies = rotf.game.enemiesContainer.children;

                for(var i=0; i<enemies.length; i++){
                    var enemy = enemies[i];
                    if(rotf.Util.inCircle(enemy,this.targetX,this.targetY,this.effectArea)){
                        var distance = rotf.Util.vectorMagnitude(this.targetX,enemy.x,this.targetY,enemy.y);
                        enemy.health -= (this.bluntDamage / enemy.bluntArmor + this.piercingDamage / enemy.piercingArmor)*(1-distance/this.effectArea);
                    }
                }
                rotf.game.bulletsContainer.removeChild(this);
                rotf.game.animationsContainer.addChild(new this.explosion(this.targetX, this.targetY));
            }
        },

        // Moves bullet towards target coordinate
        move: function(delta){

            this.x += this.velX * delta;
            this.y += this.velY * delta;

            this.velY += this.g*delta;

            this.time -= delta;

        }

    });

}());
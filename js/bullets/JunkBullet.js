/**
 * JunkBullet.js
 *
 * Bullet used for shooting from JunkTower
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members


    rotf.JunkBullet = rotf.extend( rotf.Bullet, {

        //static members

    },{

        targetEnemy: null,

        // Constructor
        initialize: function(x,y,enemy){
            this._super(15,5,0.3,x,y,"bullets/junk.png",rotf.JunkExplosion);
            this.targetEnemy = enemy;
        },

        update : function(delta){

            var oldX = this.x;
            var oldY = this.y;

            this.move(delta);

            // Checks if bullet collided with target enemy
            // If collision occurred decrease enemy's energy
            if (
                rotf.Util.inCircle(
                    this.targetEnemy,
                    this.x,
                    this.y,
                    rotf.Bullet.NEAR_DISTANCE
                )
                ||
                rotf.Util.between(
                    this.targetEnemy.x, this.targetEnemy.y,
                    oldX, oldY,
                    this.x, this.y
                )

            ) {
                if(Math.random()<=0.85){
                    this.targetEnemy.health -= this.bluntDamage / this.targetEnemy.bluntArmor + this.piercingDamage / this.targetEnemy.piercingArmor;
                }
                this.targetEnemy = null;
                rotf.game.bulletsContainer.removeChild(this);
                rotf.game.animationsContainer.addChild(new this.explosion(this.x, this.y));
            }
        },

        // Moves bullet towards enemy
        move: function(delta){
            var angle = Math.atan2(this.targetEnemy.y - this.y, this.targetEnemy.x - this.x);
            this.velX = Math.cos(angle) * this.speed;
            this.velY = Math.sin(angle) * this.speed;

            this.x += this.velX * delta;
            this.y += this.velY * delta;
        }
    });

}());
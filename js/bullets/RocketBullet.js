/**
 * RocketBullet.js
 *
 * Bullet used for shooting from RocketTower
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members


    var RocketBullet = rotf.extend( rotf.Bullet, {

        //static members
        ROTATION_STEP: 0.0006,
        ROTATION_THRESHOLD: 0.3

    },{

        targetEnemy: null,
        rotation: -90,
        rotationSpeed: 0,

        // Constructor
        initialize: function(x,y,enemy){
            this._super(5,15,0.3,x,y,"bullets/rocket.png", rotf.RocketExplosion);
            this.targetEnemy = enemy;
            this.velY = this.speed;
        },

        update : function(delta){

            // Checks if current target enemy died or left the map
            // If true try to find nearest enemy for new target or explode
            var enemies = rotf.game.enemiesContainer.children;
            if(enemies.indexOf(this.targetEnemy)==-1){
                if(enemies.length>0){

                    var nextTarget = enemies[0];
                    var nextTargetDistance = rotf.Util.vectorMagnitude(nextTarget.x,this.x,nextTarget.y,this.y);

                    for(var i=1; i<enemies.length; i++){

                        var currentEnemy = enemies[i];
                        var currentEnemyDistance = rotf.Util.vectorMagnitude(currentEnemy.x,this.x,currentEnemy.y,this.y);

                        if( currentEnemyDistance < nextTargetDistance
                            ||( currentEnemyDistance == nextTargetDistance
                            && currentEnemy.progress > nextTarget.progress)){

                            nextTarget = currentEnemy;
                            nextTargetDistance = currentEnemyDistance;
                        }
                    }

                    this.targetEnemy = nextTarget;

                }else{
                    rotf.game.bulletsContainer.removeChild(this);
                    rotf.game.animationsContainer.addChild(new this.explosion(this.x, this.y));
                    return;
                }
            }

            // Remember old coordinates for later calculation and move rocket

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
                this.targetEnemy.health -= this.bluntDamage / this.targetEnemy.bluntArmor + this.piercingDamage / this.targetEnemy.piercingArmor;
                this.targetEnemy = null;
                rotf.game.bulletsContainer.removeChild(this);
                rotf.game.animationsContainer.addChild(new this.explosion(this.x, this.y));
            }

        },

        // Moves bullet towards current target enemy
        move: function(delta){

            var wantedAngle = Math.atan2(this.targetEnemy.y - this.y, this.targetEnemy.x - this.x);
            var currentAngle = this.rotation / 180 * Math.PI;

            if(Math.abs(wantedAngle-currentAngle)>Math.PI){
                wantedAngle -= rotf.Util.sign(wantedAngle)*Math.PI*2;
            }
            currentAngle = (1-this.rotationSpeed)*currentAngle + this.rotationSpeed*wantedAngle;

            if(this.rotationSpeed < RocketBullet.ROTATION_THRESHOLD){
                this.rotationSpeed += RocketBullet.ROTATION_STEP * delta;
            }

            this.rotation = currentAngle * 180 / Math.PI;
            this.velX = Math.cos(currentAngle) * this.speed;
            this.velY = Math.sin(currentAngle) * this.speed;

            this.x += this.velX * delta;
            this.y += this.velY * delta;
        }

    });

    rotf.RocketBullet = RocketBullet;

}());
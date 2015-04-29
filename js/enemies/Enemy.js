/**
 * Enemy.js
 *
 * Class representing an enemy object
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {


    var Enemy = rotf.extend(createjs.Container, {

        //static public members

        NEAR_DISTANCE: 10,
        PATH_WIDTH: 45,
        HEALTH_BAR_HEIGHT: 4,
        HEALTH_BAR_WIDTH: 34


    },{

        velX: 0, velY: 0,
        velocity: 0, // px/ms
        currPathIndex: 0, path: null, pathShift: 0,
        currTarget: null,
        currentPathSegmentDistance: 0,
        progress: 0,
        curY: 0, hgt: 0, hgtCounter: 0,
        healthBar: null,
        health: 100, maxHealth: 100, initialHealth: 100,
        bluntArmor: 0, piercingArmor: 0,
        jumpInterval: 0.033, // px/ms
        jumpAmp: 5,
        deadScale: 0.642,
        deadRot: 90,
        worthDead: 0,
        worthLive: 1,
        sprite: null,
        diedSoundID: null,
        diedSoundVolume: 0.1,

        // Constructor
        initialize: function(velocity,health,barmor,parmor,sprite,diedSoundID){

            // Call super constructor, necessary for extending createjs.Container class

            this._super();

            this.path = rotf.game.path;
            this.velocity = velocity;
            this.health = this.maxHealth = this.initialHealth = health;
            this.bluntArmor = barmor;
            this.piercingArmor = parmor;
            this.pathShift = Math.random();
            var curPoint = displacePointOfPath(this.path, 0, this.pathShift, Enemy.PATH_WIDTH);
            this.x = curPoint.x;
            this.y = this.curY = curPoint.y;

            this.findNextTarget();

            this.sprite = sprite;
            sprite.stop();
            this.addChild(sprite);
            this.addHealthBar();

            this.diedSoundID = diedSoundID;
        },

        addHealthBar: function(){

            var hw = Enemy.HEALTH_BAR_WIDTH;
            var hh = Enemy.HEALTH_BAR_HEIGHT;

            var height = this.getBounds().height;
            var yOffset = 5;

            this.addChild(new createjs.Shape(
                new createjs.Graphics()
                    .f("#C03")
                    .r(-hw/2, -height/2-hh-yOffset, hw, hh)
            ));

            this.healthBar = new createjs.Shape(
                new createjs.Graphics()
                    .f("#3C0")
                    .r(0, 0, hw, hh)
            );
            this.healthBar.x = -hw/2;
            this.healthBar.y =  -height/2-hh-yOffset;
            this.addChild(this.healthBar);

            this.addChild(new createjs.Shape(
                new createjs.Graphics()
                    .s("#000")
                    .r(-hw/2, -height/2-hh-yOffset, hw, hh)
            ));

        },

        /**
         * function that calculates next path point for enemy
         */
        findNextTarget: function(){
            this.currPathIndex++;
            if (this.currPathIndex >= this.path.length) {
                this.leaveLevel();
                return;
            }
            this.currTarget = displacePointOfPath(this.path, this.currPathIndex, this.pathShift, Enemy.PATH_WIDTH);
            var lastPoint = this.path[this.currPathIndex-1];
            var nextPoint = this.path[this.currPathIndex];
            this.currentPathSegmentDistance = rotf.Util.vectorMagnitude(lastPoint.x,nextPoint.x,lastPoint.y,nextPoint.y);
        },

        leaveLevel: function(){

            rotf.game.enemiesContainer.removeChild(this);

            rotf.game.status.lives-=this.worthLive;
            if(rotf.game.status.lives<=0){
                rotf.game.endGame();
                return;
            }
            if(rotf.game.enemiesContainer.children.length == 0
                && rotf.game.waveManager.ended
                && rotf.game.status.lives > 0){

                rotf.game.endGame();
            }
        },

        update : function(delta){

            // check if enemy died

            if(this.health<=0){

                rotf.game.enemiesContainer.removeChild(this);
                rotf.game.animationsContainer.addChild(new rotf.DiedExplosion(this.x,this.y,this.deadRot,this.deadScale));

                this.playDiedSound();

                rotf.game.status.money+=this.worthDead;

                if(rotf.game.enemiesContainer.children.length == 0
                    && rotf.game.waveManager.ended
                    && rotf.game.status.lives > 0){

                    rotf.game.endGame();
                }
                return;
            }

            // calculates enemy's velocity
            var angle = Math.atan2(this.currTarget.y - this.y, this.currTarget.x - this.x);
            this.velX = Math.cos(angle) * this.velocity;
            this.velY = Math.sin(angle) * this.velocity;

            // calculate oscillation offset
            this.hgtCounter = (this.hgtCounter + this.jumpInterval * delta) % 360;
            this.hgt = Math.sin(this.hgtCounter) * this.jumpAmp;

            // move enemy

            var oldX = this.x,
                oldY = this.y;

            this.x += this.velX * delta;
            this.curY += this.velY * delta;
            this.y = this.curY + this.hgt;

            var dist = rotf.Util.vectorMagnitude(this.x,this.currTarget.x,this.y,this.currTarget.y);
            if (
                dist < Enemy.NEAR_DISTANCE
                ||
                rotf.Util.between(
                    this.currTarget.x, this.currTarget.y,
                    oldX, oldY,
                    this.x, this.y
                )
            ) {
                this.findNextTarget();
            }

            // calculate enemy's path progress
            this.progress = this.currPathIndex - dist/this.currentPathSegmentDistance;

            // update health bar
            this.healthBar.scaleX = Math.max(this.health/this.maxHealth,0);

            // choosing correct sprite for drawing depending on enemy's rotation
            var xStr,yStr;
            if(this.velX<0){
                xStr = "Left";
            }else{
                xStr = "Right";
            }
            if(this.velY<0){
                yStr = "Top";
            }else{
                yStr = "Down";
            }
            var frame;
            if(Math.abs(this.velX)<0.25*this.velocity){
                frame = yStr
            }else if(Math.abs(this.velX)>0.75*this.velocity){
                frame = xStr;
            }else{
                frame = yStr + xStr;
            }

            this.sprite.currentAnimationFrame = mapFrames(frame);
        },

        playDiedSound: function(){
            if(this.diedSoundID){
                createjs.Sound.play(this.diedSoundID,"none",0,0,0,this.diedSoundVolume);
            }
        }
    });

    rotf.Enemy = Enemy;

    /**
     * A function that shifts the enemies from the original path
     * @param path
     * @param pathIndex
     * @param shift
     * @param pathWidth
     * @returns {{}}
     */
    var displacePointOfPath = function(path, pathIndex, shift, pathWidth)
    {
        var startPoint = (pathIndex == 0) ? null : rotf.game.path[pathIndex-1];
        var endPoint = (pathIndex == path.length - 1) ? null : rotf.game.path[pathIndex+1];

        var points = constructLateralPoints(startPoint, rotf.game.path[pathIndex],endPoint,pathWidth);

        var retPoint = {};
        retPoint.x = points.point1.x + (points.point2.x - points.point1.x) * shift;
        retPoint.y = points.point1.y + (points.point2.y - points.point1.y) * shift;

        return retPoint;
    };

    /**
     * A function for constructing lateral points
     * @param startPoint
     * @param midPoint
     * @param endPoint
     * @param distance
     * @returns {{}}
     */
    var constructLateralPoints = function(startPoint, midPoint, endPoint, distance)
    {
        var targetAngle;

        if (startPoint !== null && endPoint !== null) {
            targetAngle = (lineAngle(startPoint.x, startPoint.y, midPoint.x, midPoint.y) + lineAngle(midPoint.x, midPoint.y, endPoint.x, endPoint.y)) / 2 + Math.PI / 2;
        }
        else if (startPoint == null && endPoint != null)
        {
            targetAngle = lineAngle(midPoint.x, midPoint.y, endPoint.x, endPoint.y) + Math.PI / 2;

        }
        else if (startPoint != null && endPoint == null)
        {
            targetAngle = lineAngle(startPoint.x, startPoint.y, midPoint.x, midPoint.y) + Math.PI / 2;
        }

        var point1 = {};
        var point2 = {};

        point1.x = midPoint.x + Math.cos(targetAngle)*distance;
        point1.y = midPoint.y + Math.sin(targetAngle)*distance;

        point2.x = midPoint.x - Math.cos(targetAngle)*distance;
        point2.y = midPoint.y - Math.sin(targetAngle)*distance;

        var retPair = {};
        retPair.point1 = point1;
        retPair.point2 = point2;

        return retPair;
    };

    /**
     * A function that calculates an angle of line
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @returns {number}
     */
    var lineAngle = function(x1, y1, x2, y2){
        return Math.atan2( (y2-y1) , (x2-x1) );
    };

    /**
     * A function that maps direction represented as a string to animation frame number
     * @param str
     * @returns {number}
     */
    var mapFrames = function(str){
        switch(str){
            case "Top":
                return 0;
                break;
            case "Down":
                return 4;
                break;
            case "Left":
                return 6;
                break;
            case "Right":
                return 2;
                break;
            case "TopLeft":
                return 7;
                break;
            case "TopRight":
                return 1;
                break;
            case "DownLeft":
                return 5;
                break;
            case "DownRight":
                return 3;
                break;
            default:
                return 4;
                break;
        }
    }

}());
/**
 * Util.js
 *
 * Contains common methods
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    Array.prototype.remove = function(item)
    {
        for (var i = this.length; i--; i)
        {
            if (this[i] === item){
                this.splice(i, 1);
                return true;
            }
        }

        return false;
    };

    rotf.Util = {

        /**
         * Function that returns width and height of browser's viewport
         * @returns {{width: *, height: *}}
         */
        viewport: function(){
            var e = window, a = 'inner';
            if (!( 'innerWidth' in window )){a = 'client';e = document.documentElement || document.body;}
            return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
        },

        isMobileViewport: function (viewport) {
            if(!viewport) viewport = this.viewport();
            return viewport.width <= 480 || viewport.height <= 480
        },

        /**
         * Function that examines whether the object is located within a certain radius in relation to our coordinates
         * @param obj - Object
         * @param myX - Our x coordinate
         * @param myY - Our y coordinate
         * @param radius - Radius value
         * @returns {boolean}
         */
        inCircle: function(obj, myX, myY, radius){
            return this.vectorMagnitude(myX,obj.x,myY,obj.y) <= radius;
        },

        between: function (x, y, point1X, point1Y, point2X, point2Y) {
            var topX = point1X > point2X ? point1X : point2X,
                bottomX = point1X < point2X ? point1X : point2X,
                rightY = point1Y > point2Y ? point1Y : point2Y,
                leftY = point1Y < point2Y ? point1Y : point2Y;

            return x <= topX
                && x >= bottomX
                && y <= rightY
                && y >= leftY;
        },

        /**
         * Function that returns the magnitude of a 2D vector
         * @param x1
         * @param x2
         * @param y1
         * @param y2
         * @returns {number}
         */
        vectorMagnitude: function(x1,x2,y1,y2){
            var dx = x1-x2;
            var dy = y1-y2;
            return Math.sqrt(dx*dx + dy*dy);
        },

        /**
         * Sign function
         * @param foo
         * @returns {number}
         */
        sign: function(foo){
            return foo<0?-1:1;
        },

        randomInterval: function(min,max)
        {
            return Math.floor(Math.random()*(max-min)+min);
        }
    }

}());
/**
 * Background.js
 *
 * Class for representing page background
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    var TILE_WIDTH = 50, // px
        TILE_HEIGHT = 50, // px
        TILES_X = 40, // tiles
        TILES_Y = 22, // tiles
        SPACE_TILE = 0,
        STARS_TILE = 1,
        STARS_FILL = .4,
        ROCKS_TILE = 11,
        ROCKS_FILL = .15,
        TOTAL_TILES = 18;


    rotf.Background = rotf.extend( rotf.Class, {

        //static members

    },{

        stage: null,

        // Constructor
        initialize: function(){

            // Ignore background if it is a mobile device
            if(rotf.Util.isMobileViewport()) return;

            var canvas = document.createElement('canvas');
            canvas.height = TILE_HEIGHT * TILES_Y;
            canvas.width = TILE_WIDTH * TILES_X;

            var stage = new createjs.Stage(canvas);
            this.stage = stage;

            for(var x = 0; x < TILE_WIDTH; x++){
                for(var y = 0; y < TILE_HEIGHT; y++){
                    this.setTile(x*TILE_WIDTH, y*TILE_HEIGHT);
                }
            }

            stage.update();

            document.body.style.backgroundImage = "url('" + stage.toDataURL() + "')";

            stage.removeAllChildren();
            this.stage = null;

        },

        setTile: function(x,y){

            this.setSpaceTile(x,y);

            if(Math.random() < STARS_FILL){
                this.setStarsTile(x,y);
            }

            if(Math.random() < ROCKS_FILL){
                this.setRocksTile(x,y);
            }
        },

        setSpaceTile: function(x,y){
            var tile = this.getTile(x,y);
            this.stage.addChild(tile);
        },

        setStarsTile: function(x,y){
            var tile = this.getTile(x,y);
            tile.currentAnimationFrame = rotf.Util.randomInterval(STARS_TILE,ROCKS_TILE);
            this.stage.addChild(tile);
        },

        setRocksTile: function(x,y){
            var tile = this.getTile(x,y);
            tile.currentAnimationFrame = rotf.Util.randomInterval(ROCKS_TILE,TOTAL_TILES);
            this.stage.addChild(tile);
        },

        getTile: function(x,y){

            var tile = rotf.assetsFactory.getAsset("map/tiles/tile.png");
            tile.stop();

            tile.regX = -(TILE_WIDTH/2)|0;
            tile.regY = -(TILE_HEIGHT/2)|0;

            tile.x = x;
            tile.y = y;

            return tile;
        }
    });

}());
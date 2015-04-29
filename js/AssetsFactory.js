/**
 * AssetsFactory.js
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */
(function() {

    // static private members

    var definition = null;
    var spriteSheet = null;
    var animations = null;
    var loaded = false;

    var AssetsFactory = rotf.extend( rotf.Class, {

            // static public members

        },{

            // Constructor
            initialize: function() {

            },

            load: function(data,url,callback,scope){

                if(!data || !url) return false;

                if(loaded) return true;

                loaded = true;

                definition = data;

                var spData = {

                    // DEFINING FRAMERATE:
                    // this specifies the framerate that will be set on the SpriteSheet. See Spritesheet.framerate
                    // for more information.
                    framerate: 30,

                    // DEFINING IMAGES:
                    // list of images or image URIs to use. SpriteSheet can handle preloading.
                    // the order dictates their index value for frame definition.
                    images: [url],

                    // OR, the complex way that defines individual rects for frames.
                    // The 5th value is the image index per the list defined in "images" (defaults to 0).
                    frames: [
                        // x, y, width, height, imageIndex, regX, regY
                        // [0,0,64,64,0,32,64],
                        // [64,0,96,64,0]
                    ],
                    animations: {
                        // start, end, next, speed
                        // run: [0,8],
                        // jump: [9,12,"run",2]
                    }
                };

                var size = data.frames.length;

                for(var i=0; i<size; i++){

                    var image = data.frames[i];
                    var frame = image.frame;

                    spData.frames.push(
                        // x, y, width, height, imageIndex, regX, regY
                        [frame.x, frame.y, frame.w, frame.h, 0, frame.w/2|0, frame.h/2|0]
                    );

                    var filename = this._extractFilename(image.filename);

                    if(spData.animations[filename]){
                        spData.animations[filename].frames.push(i);
                    }else{
                        spData.animations[filename] = {frames: [i]};
                    }
                }

                spriteSheet = new createjs.SpriteSheet(spData);

                animations = spriteSheet.getAnimations();

                if(spriteSheet.complete){
                    callback.call(scope);
                }else{
                    spriteSheet.on("complete", callback, scope);
                }
            },

            getAsset: function(id){

                if(!id || !loaded) return null;

                if(animations.indexOf(id) == -1){
                    console.error("No sprite with id: \"" + id + "\"");
                    return null;
                }

                return new createjs.Sprite(spriteSheet, id);
            },

            _extractFilename: function(filename){
                var arr = filename.split('_');
                if(arr.length>1){
                    var ext = arr.pop().split('.').pop();
                    return arr.concat(['.',ext]).join('');
                }
                return filename;
            }
        }
    );

    // Singleton
    rotf.assetsFactory = new AssetsFactory();

}());